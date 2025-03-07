import { TransactionHistoryData } from "../../store/finance-store/use-transaction-history";

export const groupTransactionsByDate = (
  transactions: TransactionHistoryData[]
): Record<string, TransactionHistoryData[]> => {
  return transactions.reduce(
    (groups: Record<string, TransactionHistoryData[]>, transaction) => {
      const date = new Date(transaction.updated_at).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {}
  );
};
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};