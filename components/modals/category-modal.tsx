"use client";

import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./modal";
import useCategoryModal from "@/hooks/useCategoryModal";
import { db } from "@/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import useAuth from "@/hooks/auth";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters."
  })
});

const CategoryModal = () => {
  const categoryModal = useCategoryModal();
  const { category } = categoryModal;
  const { user, loading } = useAuth(); 


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.category || ""
    }
  });

  const { reset } = form;

  useEffect(() => {
    if (category) {
      reset({
        name: category.category || ""
      });
    }
  }, [category, reset]);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const userId =user?.uid ;
      if (category?.id && data.name.trim() !== "") {
        const categoryRef = doc(db, "category", category.id);
        await updateDoc(categoryRef, {
          name: data.name.trim(),userId
        });

        toast({
          title: "Success",
          description: `Category has been updated successfully.`
        });
      } else {
        await addDoc(collection(db, "category"), {
          name: data.name.trim(),userId
        });

        toast({
          title: "Success",
          description: `Category has been added successfully.`
        });
      }

      form.reset({
        name: ""
      });

      categoryModal.onClose();

      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <Button
                type="button"
                onClick={categoryModal.onClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={categoryModal.isOpen}
      title={category ? "Update Category" : " Create Category"}
      onClose={categoryModal.onClose}
      body={bodyContent}
      actionLabel={category ? "Update" : "Create"}
    />
  );
};

export default CategoryModal;
