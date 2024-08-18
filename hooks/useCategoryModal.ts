import { create } from "zustand";

interface Category {
  id: string;
  category: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  category: Category | null; // Allow null values
  onOpen: (category?: Category | null) => void; // Adjust to accept null
  onClose: () => void;
}

const useCategoryModal = create<CategoryModalProps>((set) => ({
  isOpen: false,
  category: null,
  onOpen: (category: Category | null = null) => set({ isOpen: true, category }), // Ensure default value is null
  onClose: () => set({ isOpen: false, category: null }),
}));

export default useCategoryModal;