"use client"

import { totalCategories } from "@/actions/categories";
import { Button } from "@/components/ui/button";

const UploadButton= ()=>{

      const categoryModel = useCategoryModal();
      
    return(
       
        <Button onClick={() => categoryModel.onOpen()}>Add Category</Button>
    )
}

export default UploadButton