import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PosCalculateAmount {
  calculatedAmount: number;
  setCalculatedAmount: (calutatedAmount: number) => void;
  totalDiscountAmount: number;
  setTotalDiscountAmount: (totalAmount: number) => void;
  showAddCustomer: boolean;
  setShowAddCustomer: (showAddCustomer: boolean) => void;
  dropdownVisible: boolean;
  setDropdownVisible: (showDropDownVisible: boolean) => void;
  totalAmount: number;
  setTotalAmount: (totalAmount: number) => void;
  expressions: string;
  setExpressions: (value: string) => void;
  transactionType: string;
  setTransactionType: (transactionType: string) => void;
  itemCounts: number[];
  setItemCounts: (counts: number[]) => void;
  itemPrice: number[];
  setItemPrice: (price: number[]) => void;
  itemTotal: number[];
  setItemTotal: (total: number[]) => void;
  increaseItemCount: (index: number, price: number) => void;
  decreaseItemCount: (index: number, price: number) => void;
  qrAmount:number;
  setQrAmount:(qrAmount:number)=>void;
}

export const usePosCalculateAmount = create<PosCalculateAmount>()(
    
  persist(
    (set) => ({
      qrAmount:0,
      setQrAmount:(qrAmount:number)=>{
        set({qrAmount})
      },
      calculatedAmount: 0,
      setCalculatedAmount: (calculatedAmount: number) => {
        set({ calculatedAmount });
      },
      totalDiscountAmount: 0,
      setTotalDiscountAmount: (totalDiscountAmount: number) => {
        set({ totalDiscountAmount });
      },
      showAddCustomer: false,
      setShowAddCustomer: (showAddCustomer: boolean) => {
        set({ showAddCustomer });
      },
      dropdownVisible: false,
      setDropdownVisible: (dropdownVisible: boolean) => {
        set({ dropdownVisible });
      },
      totalAmount: 0,
      setTotalAmount: (totalAmount: number) => {
        set({ totalAmount });
      },
      expressions: "0",
      setExpressions: (value) => {
        set({ expressions: value });
      },
      transactionType: "sales",
      setTransactionType: (transactionType: string) => {
        set({ transactionType });
      },
      itemCounts: [],
      setItemCounts: (counts) => set({ itemCounts: counts }),
      itemPrice: [],
      setItemPrice: (price) => set({ itemPrice: price }),
      itemTotal: [],
      setItemTotal: (total) => set({ itemTotal: total }),
      increaseItemCount: (index, price) =>
        set((state) => {
          const newCounts = [...state.itemCounts];
          const newTotals = [...state.itemTotal];
          newCounts[index] += 1;
          newTotals[index] += price;
          return {
            itemCounts: newCounts,
            itemTotal: newTotals,
            calculatedAmount: state.calculatedAmount + price,
          };
        }),
      decreaseItemCount: (index, price) =>
        set((state) => {
          const newCounts = [...state.itemCounts];
          const newTotals = [...state.itemTotal];
          if (newCounts[index] > 1) {
            newCounts[index] -= 1;
            newTotals[index] -= price;
            return {
              itemCounts: newCounts,
              itemTotal: newTotals,
              calculatedAmount: state.calculatedAmount - price,
            };
          }
          return state;
        }),
    }),
    {
      name: "total-amount-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({
        totalAmount: state.totalDiscountAmount,
        calculatedAmount: state.calculatedAmount,
        expressions: state.expressions,
        transactionType: state.transactionType,
      }),
    }
  )
);

export interface BillingInfo {
  uuid: string;
  english_date: string;
  nepali_date: string;
  party: string;
  gross_total: number;
  discount_total: number;
  tax_total: number;
  net_total: number;
  print_counter: number;
  print_english_date_time: string | null;
  print_nepali_date_time: string | null;
  paid_amount: number;
  remaining_amount: number;
  is_cancelled: boolean;
  remarks: string | null;
  payment_method: string | null;
  is_ird_sync: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  seller_name: string;
}

export interface Invoice {
  uuid: string;
  invoice_number: string;
  receipt_no: string;
  invoice_english_date: string;
  invoice_nepali_date: string;
  fiscal_year: string;
  buyer_name: string;
  buyer_pan: string | null;
  buyer_uuid: string | null;
  seller_pan: string;
  currency: string;
  total_sales: number;
  hs_code: string | null;
  vat: number;
  taxable_sales_vat: number;
  excise: number;
  excisable_amount: number;
  hst: number;
  esf: number;
  amount_for_esf: number;
  export_sales: number;
  tax_exempted_sales: number;
  is_realtime: boolean;
  merchant_or_customer: string;
  fk_outlet_uuid: string;
  datetime_client: string;
  billing_details: any[]; // Adjust the type if you have a specific structure for billing details
  billing_info: BillingInfo;
  seller_name: string;
}
export interface CustomerOrMerchantIds {
  customerOrMerchantId: string;
  setCustomerOrMerchantId: (outletUUID: string) => void;
  invoiceReview: Invoice;
  setInvoiceReview: (invoiceReview: Invoice) => void;
}

export const UseInvoiceReviewDetailsStore = create<CustomerOrMerchantIds>()(
  persist(
    (set) => ({
      customerOrMerchantId: "" as string,
      setCustomerOrMerchantId: (customerOrMerchantId: string) => {
        set({ customerOrMerchantId });
      },
      invoiceReview: {} as Invoice, // Initialize with a default value
      setInvoiceReview: (invoiceReview: Invoice) => {
        set({ invoiceReview: invoiceReview });
      },
    }),
    {
      name: "billing-invoice-review",
      getStorage: () => localStorage,
      partialize: (state) => ({ outletUUID: state.customerOrMerchantId, invoiceReview: state.invoiceReview }),
    }
  )
);
