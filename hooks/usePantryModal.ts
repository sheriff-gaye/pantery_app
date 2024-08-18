import { create } from "zustand";

interface PantryModalProps {
  isOpen: boolean;
  item: any | null; 
  onOpen: (item?: any) => void;
  onClose: () => void;
}

const usePantryModal = create<PantryModalProps>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item = null) => set({ isOpen: true, item }), 
  onClose: () => set({ isOpen: false, item: null }),
}));

export default usePantryModal;