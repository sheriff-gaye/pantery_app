"use client"

import { totalCategories } from "@/actions/get-categories";
import { Button } from "@/components/ui/button";
import useCategoryModal from "@/hooks/useCategoryModal";

const UploadButton= ()=>{

      const categoryModel = useCategoryModal();
      
    return(
       
        <Button onClick={() => categoryModel.onOpen()}>Add Category</Button>
    )
}

export default UploadButton