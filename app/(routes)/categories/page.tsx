import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { columns, Payment } from "./components/columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      category: "fruits",
      status: "pending"
    },
    {
      id: "728ed52f",
      category: "fruits",
      status: "pending"
    },
    {
      id: "728ed52f",
      category: "fruits",
      status: "pending"
    },
    {
      id: "728ed52f",
      category: "fruits",
      status: "pending"
    }
  ];
}

const Categories = async () => {
  const data = await getData();
  return (
    <div className="p-9">
      <div className="flex justify-between  items-center">
        <h1 className="text-2xl font-bold">
          Pantry Categories <span>(0)</span>
        </h1>
        <Button>Add Category</Button>
      </div>

      <div className="mt-8">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Categories;
