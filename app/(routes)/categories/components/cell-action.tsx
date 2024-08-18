"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button";
  import { MoreHorizontal } from "lucide-react";
import { Category } from "./columns";
import useCategoryModal from "@/hooks/useCategoryModal";
import useConfirmModal from "@/hooks/useConfirmModal";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";


  interface CategoryProps{
    data:Category
  }

  
const CellAction=({data}:CategoryProps)=>{

    const router=useRouter();

    const categoryModal=useCategoryModal()
   
    const handleEdit = () => {
        categoryModal.onOpen(data);
      };
    


      const handleDelete = async () => {
        try {
          await deleteDoc(doc(db, "category", data.id));
          toast({
            title: "Success",
            description: `Category has been deleted successfully.`,
          });
          router.refresh();
        } catch (error: any) {
          toast({
            title: "Error",
            description: error.message || "An unexpected error occurred.",
          });
        }
      };

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
}


export default CellAction