import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReceiptDetails {
  uuid: string;
  product_name: string;
  product_price:string;
}
export interface RecipientBillingPendingData {
  uuid: string;
  seller_name: string;
  buyer_name: string;
  seller_pan: string;
  receipt_details: ReceiptDetails[];
  total_sales: number; //change by credit_amount
  datetime_client: string;
  buyer_uuid:string;
  fk_outlet_uuid:string;
  receipt_no:string;
}

interface RecipientBillingPendingStoreType {
  count: number;
  recipientBillingPending: RecipientBillingPendingData[];
  setRecipientBillingPending: (data: RecipientBillingPendingData[]) => void;
}

export const useRecipientBillingPendingStore = create<RecipientBillingPendingStoreType>()(
  persist(
    (set) => ({
      count: 0,
      recipientBillingPending: [] as RecipientBillingPendingData[],
      setRecipientBillingPending: (recipientBillingPending: RecipientBillingPendingData[]) => {
        set({ recipientBillingPending, count: recipientBillingPending.length });
      },
    }),

    {
      name: "recipient-billing-pending-info-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        recipientBillingPending: state.recipientBillingPending,
        count: state.count,
      }),
    }
  )
);

//store invoice
interface InvoiceUUID {
  selectedInvoiceUUID: string;
  setSelectedInvoiceUUID: (id: string) => void;
}

//persist selected invoice
export const useInvoiceUUIDStore = create<InvoiceUUID>()(
  persist(
    (set) => ({
      selectedInvoiceUUID: '',
      setSelectedInvoiceUUID: (selectedInvoiceUUID: string) => {
        set({ selectedInvoiceUUID });
      },
    }),

    {
      name: "selected-invoice-uuid-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        selectedInvoiceUUID: state.selectedInvoiceUUID,
      }),
    }
  )
);