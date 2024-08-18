"use client";

import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./modal";
import useConfirmModal from "@/hooks/useConfirmModal";
import { Button } from "../ui/button";

const ReceipeModal = () => {
  const confirmModal = useConfirmModal();
  const [isLoading, setIsLoading] = useState(false);



  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  const bodyContent = (
    <>
      <div className="flex justify-center">
        {/* <p>Generate Food Receipe From your Store</p> */}
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div
          className="
                    flex 
                    flex-row 
                    items-end
                    justify-end
                    gap-4 
                    w-full
                  "
        >
          <Button type="button" variant="outline"  onClick={confirmModal.onClose}>
            Cancel
          </Button>
          <Button type="submit">Copy</Button>
        </div>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={confirmModal.isOpen}
      title="Generate Food Receipe From your Store"
      onClose={confirmModal.onClose}
      body={bodyContent}
      actionLabel="Create"
    />
  );
};

export default ReceipeModal;
