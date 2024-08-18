"use client"

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./modal";
import usePantryModal from "@/hooks/usePantryModal";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { addDoc, updateDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { allCatgeories } from "@/actions/get-categories";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  date: z.string().nonempty({
    message: "Date is required.",
  }),
  quantity: z.number().min(1, {
    message: "Quantity must be at least 1.",
  }),
});

const PantryModal = () => {
  const pantryModal = usePantryModal();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const router = useRouter();
  const { item } = pantryModal; 

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:  item?.name || "",
      category:item?.category || "",
      date:item?.date || "",
      quantity:item?.quantity || 1,
    },
  });

  const { reset } = form;

  useEffect(() => {
    const fetchCategories = async () => {
      const   Totalcategories=await allCatgeories()
      setCategories(Totalcategories);
    };

    fetchCategories();
  }, [categories]);


  useEffect(() => {
    if (item) {
      // Reset form with item data if editing
      reset({
        name: item.name || "",
        category: item.category || "",
        date: item.date || "",
        quantity: item.quantity || 1,
      });
    }
  }, [item, reset]);


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      if (item) {
            
        await updateDoc(doc(db, "pantry", item.id), {
          name: data.name.trim(),
          category: data.category.trim(),
          date: data.date,
          quantity: data.quantity,
        });

        toast({
          title: "Success",
          description: `Pantry item has been updated successfully.`,
        });
      } else {
        
        await addDoc(collection(db, "pantry"), {
          name: data.name.trim(),
          category: data.category.trim(),
          date: data.date,
          quantity: data.quantity,
        });

        toast({
          title: "Success",
          description: `Pantry item has been added successfully.`,
        });
      }

      form.reset({
        name:"",
        quantity:1,
        category:"",
        date:""
      });

      pantryModal.onClose();
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Pantry name" {...field} />
                </FormControl>
                <FormDescription>
                    Write pantry product name
                  </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                    set product category
                  </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="date" placeholder="Select a date" {...field} />
                 
                </FormControl>
                <FormDescription>
                    Set Product expiry date
                  </FormDescription>
                <FormMessage />
              
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    min={1}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                    Set Quantity in stcok
                  </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {item ? "Update" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={pantryModal.isOpen}
      title={item ? "Edit Pantry Item" : "Create Pantry Item"}
      onClose={pantryModal.onClose}
      body={bodyContent}
      actionLabel={item ? "Update" : "Create"}
    />
  );
};

export default PantryModal;