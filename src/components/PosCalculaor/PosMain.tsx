import { FC, useCallback } from "react";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary";
import { TabLayout } from "../TabLayout";
import { Numpad } from "./PosHome";
import { usePosCalculateAmount } from "../../store/pos-calculator/pos-cal-store";
import { useCalculationStore } from "../../store/pos-calculator/pos-calculation-store";
import { create, all } from "mathjs";

// Custom hook to manage calculator state
const math = create(all);

export const useCalculator = () => {
  const {
    expression,
    inputValue,
    addToInputValueArray,
    clearStore,
    isOperatorClicked,
    operator,
    previousValue,
    setExpression,
    setInputValue,
    setIsOperatorClicked,
    setOperator,
    setPreviousValue,
  } = useCalculationStore();
  const { setCalculatedAmount, calculatedAmount, setExpressions, setItemCounts, setItemPrice, setItemTotal } =
    usePosCalculateAmount();

  const handleNumberChange = useCallback(
    (action: any) => {
      const actionStr = `${action}`;
      let newExpression = expression === "0" ? "" : expression;
      console.log("new expression", newExpression);

      if ("0123456789.".includes(actionStr)) {
        if (isOperatorClicked) {
          setInputValue(actionStr);
          setIsOperatorClicked(false);
        } else {
          const newValue = inputValue === "0" ? actionStr : inputValue + actionStr;
          setInputValue(newValue);
        }
        newExpression += actionStr;
      } else if (actionStr === "DEL") {
        setInputValue((prev) => prev.slice(0, -1) || "0");
        newExpression = newExpression.slice(0, -1) || "0";
      } else if (["+", "-", "*", "/"].includes(actionStr)) {
        if (!isOperatorClicked) {
          setPreviousValue(inputValue);
          setOperator(actionStr);
          setIsOperatorClicked(true);
        } else {
          setOperator(actionStr);
          newExpression = newExpression.slice(0, -1);
        }
        newExpression += actionStr;
      }

      // Ensure the expression is not empty
      if (newExpression === "") {
        newExpression = "0";
      }

      setExpression(newExpression);
      setExpressions(newExpression);
      const parts = newExpression.split(/(?=[+-])/);
      const numbersArray: number[] = [];
      const countsArray: number[] = [];
      const pricesArray: number[] = [];

      // Iterate over each part
      parts.forEach((part) => {
        const trimmedPart = part.trim();
        try {
          const evaluatedPart = math.evaluate(trimmedPart);
          if (!isNaN(evaluatedPart)) {
            numbersArray.push(evaluatedPart);
          }
        } catch (error) {
          console.error("Error evaluating part:", trimmedPart, error);
        }
      });
      addToInputValueArray(numbersArray);

      // Add the total amount of the items
      setItemTotal(numbersArray);
      // Calculate the expression according to arithmetic precedence
      try {
        const evaluatedExpression = math.evaluate(newExpression);
        setCalculatedAmount(evaluatedExpression);
      } catch (error) {
        console.error("Error evaluating expression:", error);
      }

      // Parse the expression to identify item prices and counts
      const items = newExpression.split("+").map((item) => item.trim());
      items.forEach((item) => {
        // Evaluate the item expression to handle precedence of - and /
        let itemPrice = 0;
        let itemCount = 1;
        const evaluatedItem = math.evaluate(item);
        if (typeof evaluatedItem === "number") {
          itemPrice = evaluatedItem;
        }

        // Check for multiplication to determine item count
        if (item.includes("*")) {
          const [price, count] = item.split("*").map((part) => part.trim());
          itemPrice = math.evaluate(price);
          itemCount = count ? parseInt(count) : 1;
        }
        countsArray.push(itemCount);
        pricesArray.push(itemPrice);
      });
      setItemCounts(countsArray);
      setItemPrice(pricesArray);
    },
    [
      inputValue,
      operator,
      previousValue,
      isOperatorClicked,
      expression,
      setInputValue,
      setIsOperatorClicked,
      setExpression,
      setCalculatedAmount,
      setOperator,
      setPreviousValue,
    ]
  );
  return {
    inputValue: inputValue || "0",
    operator,
    expression: expression || "0",
    calculatedAmount,
    clearStore,
    handleNumberChange,
  };
};

const Calculator: FC = () => {
  const { handleNumberChange, calculatedAmount } = useCalculator();
  const { expressions } = usePosCalculateAmount();
  // Call the clear function when the component on window reload btn is clicked
  return (
    <TabLayout>
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-center flex-col">
          <div className="flex items-center grow my-0 mt-[185px]">
            <div className="text-[#98A2B3] text-wrap text-[24px] font-medium font-inter">{expressions}</div>
          </div>
          <div className="text-[#1D2939] text-wrap text-[48px] flex items-center font-medium font-inter ml-4">
            {calculatedAmount}
            <span className="text-[24px] font-medium font-poppins">रु</span>
          </div>
          <div className="w-full mt-[50px] px-4">
            <ButtonPrimary
              className="text-[14px] w-full max-h-11 font-semibold font-poppins flex items-center justify-center mt-[50px] mb-[20px]"
              size="large"
            >
              Charge {calculatedAmount}
              <span className="text-[14px] font-normal ml-1">रु</span>
            </ButtonPrimary>
          </div>
        </div>
        <div className="px-2 flex flex-col">
          <Numpad onClick={handleNumberChange} />
        </div>
      </div>
    </TabLayout>
  );
};

export default Calculator;