export const getAmountColor = (amount: string) => {
  return amount.startsWith("-") ? "text-primaryColor" : "text-textGreen";
};