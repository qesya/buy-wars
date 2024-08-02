import { create } from 'zustand';
import { Starship } from '../services/types';

interface CartItem extends Starship {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (starship: Starship, quantity: number) => void;
  removeFromCart: (starshipUrl: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (starship, quantity) => set((state) => {
    const existingStarship = state.cart.find(item => item.url === starship.url);
    if (existingStarship) {
      return {
        cart: state.cart.map(item =>
          item.url === starship.url
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      };
    }
    return {
      cart: [...state.cart, { ...starship, quantity }],
    };
  }),
  removeFromCart: (starshipUrl) => set((state) => ({
    cart: state.cart.filter((item) => item.url !== starshipUrl),
  })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
