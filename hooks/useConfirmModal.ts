import { create } from "zustand";

interface ReceipeModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReceipeModal = create<ReceipeModalProps>((set) => ({
  isOpen: false,
  item: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReceipeModal;