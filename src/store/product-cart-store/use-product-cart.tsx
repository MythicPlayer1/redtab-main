import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SupplierProductData } from '../business-type-store/use-supplier-product-list';

interface CartItem {
  product: SupplierProductData;
  count: number;
  itemTotal: number;
}

interface OrderDetail {
  outlet_product: string;
  quantity: number;
  price: number;
  product_rate: number;
}

interface CartStore {
  cart: CartItem[];
  total: number;
  orderDetails: OrderDetail[];
  addToCart: (product: SupplierProductData) => void;
  increaseItemCount: (uuid: string) => void;
  decreaseItemCount: (uuid: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      total: 0,
      orderDetails: [],
      addToCart: (product: SupplierProductData) => {
        const { cart, total } = get();
        const existingItem = cart?.find(item => item.product.uuid === product.uuid);
        if (!existingItem) {
          const initialTotal = product.base_price ?? 0;
          const newCart = [...cart, { product, count: 1, itemTotal: initialTotal }];
          const newOrderDetails = newCart.map(item => ({
            outlet_product: item.product.uuid,
            quantity: item.count,
            price: item.itemTotal,
            product_rate: item.product.base_price ?? 0,
          }));
          set({ 
            cart: newCart,
            total: initialTotal + total,
            orderDetails: newOrderDetails
          });
        }
      },
      increaseItemCount: (uuid: string) => {
        set((state) => {
          const updatedCart = state.cart.map(item =>
            item.product.uuid === uuid
              ? { ...item, count: item.count + 1, itemTotal: item.itemTotal + (item.product.base_price ?? 0) }
              : item
          );
          const newTotal = updatedCart.reduce((acc, item) => acc + item.itemTotal, 0);
          const newOrderDetails = updatedCart.map(item => ({
            outlet_product: item.product.uuid,
            quantity: item.count,
            price: item.itemTotal,
            product_rate: item.product.base_price ?? 0,
          }));
          return { cart: updatedCart, total: newTotal, orderDetails: newOrderDetails };
        });
      },
      decreaseItemCount: (uuid: string) => {
        set((state) => {
          const updatedCart = state.cart
            .map(item =>
              item.product.uuid === uuid && item.count > 0
                ? { ...item, count: item.count - 1, itemTotal: item.itemTotal - (item.product.base_price ?? 0) }
                : item
            )
            .filter(item => item.count > 0); // Remove items with count 0
          const newTotal = updatedCart.reduce((acc, item) => acc + item.itemTotal, 0);
          const newOrderDetails = updatedCart.map(item => ({
            outlet_product: item.product.uuid,
            quantity: item.count,
            price: item.itemTotal,
            product_rate: item.product.base_price ?? 0,
          }));
          return { cart: updatedCart, total: newTotal, orderDetails: newOrderDetails };
        });
      },
      // Clear cart
      clearCart: () => set({ cart: [], total: 0, orderDetails: [] }),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        cart: state.cart,
        total: state.total,
        orderDetails: state.orderDetails,
      }),
    }
  )
);