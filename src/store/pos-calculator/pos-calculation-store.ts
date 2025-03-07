import create from "zustand";
import { persist } from "zustand/middleware";
import { usePosCalculateAmount } from "./pos-cal-store";

interface CalculatorState {
  inputValue: string;
  inputValueArray: number[];
  operator: string | null;
  previousValue: string | null;
  isOperatorClicked: boolean;
  expression: string;
  setInputValue: (value: string | ((prev: string) => string)) => void;
  addToInputValueArray: (value: number[]) => void;
  setOperator: (operator: string | null) => void;
  setPreviousValue: (value: string | null) => void;
  setIsOperatorClicked: (value: boolean) => void;
  setExpression: (value: string | ((prev: string) => string)) => void;
  clearStore: () => void;
  
}

export const useCalculationStore = create<CalculatorState>()(
  persist(
    (set) => ({
      inputValue: "0",
      operator: null,
      previousValue: null,
      isOperatorClicked: false,
      expression: "0",

      setInputValue: (value) =>
        set((state) => ({
          inputValue: typeof value === "function" ? value(state.inputValue) : value,
        })),
      inputValueArray: [],
      addToInputValueArray: ( value ) => set({ inputValueArray: value }),
      setOperator: (operator) => set({ operator }),
      setPreviousValue: (value) => set({ previousValue: value }),
      setIsOperatorClicked: (value) => set({ isOperatorClicked: value }),
      setExpression: (value) =>
        set((state) => ({
          expression: typeof value === "function" ? value(state.expression) : value,
        })),
        clearStore: () => {
          usePosCalculateAmount.getState().setCalculatedAmount(0);
          usePosCalculateAmount.getState().setExpressions("0");
          set(() => ({
           inputValue: "0",
           inputValueArray: [],
           operator: null,
           previousValue: null,
           isOperatorClicked: false,
           expression: "",
          }))},
    }),
    {
      name: "items-list-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({ inputValueArray: state.inputValueArray , expression: state.expression }),
    }
  )
);
