"use client";

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { getCategories } from "@/actions/categories"; 
import { useAuth } from "@/hooks/auth";

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
  const [categories, setCategories] = useState<any | null>([]);
  const { user } = useAuth();

  const router = useRouter();
  const { item } = pantryModal;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      date: "",
      quantity: 1,
    },
  });

  const { reset } = form;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories(); // Fetches all categories
        setCategories(fetchedCategories);
        console.log("Fetched categories:", fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast({
          title: "Error",
          description: "Failed to fetch categories.",
        });
      }
    };
  
    fetchCategories();
  }, [user]);


  useEffect(() => {
    if (item) {
      reset({
        name: item.name || "",
        category: item.category || "",
        date: item.date || "",
        quantity: item.quantity || 1,
      });
    }
  }, [item, reset]);

  const handleClose = () => {
    reset({
      name: "",
      category: "",
      date: "",
      quantity: 1,
    });
    pantryModal.onClose();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action.",
      });
      return;
    }

    try {
      setIsLoading(true);

      const itemData = {
        name: data.name.trim(),
        category: data.category.trim(),
        date: data.date,
        quantity: data.quantity.trim(),
        userId: user.uid,
      };

      if (item) {
        await updateDoc(doc(db, "pantry", item.id), itemData);

        toast({
          title: "Success",
          description: `Pantry item has been updated successfully.`,
        });
      } else {
        await addDoc(collection(db, "pantry"), itemData);

        toast({
          title: "Success",
          description: `Pantry item has been added successfully.`,
        });
      }

      form.reset({
        name: "",
        quantity: 1,
        category: "",
        date: "",
      });

      handleClose();
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
                <FormDescription>Write pantry product name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Category</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {categories.map((category:any) => (
                      <FormItem
                        key={category.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={category.category} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {category.category}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
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
                <FormDescription>Set Product expiry date</FormDescription>
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
                <FormDescription>Set Quantity in stock</FormDescription>
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
      onClose={handleClose}
      body={bodyContent}
      actionLabel={item ? "Update" : "Create"}
    />
  );
};

export default PantryModal;