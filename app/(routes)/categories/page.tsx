
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { getCategories, totalCategories } from "@/actions/categories";

const Categories = async () => {

  const data = await getCategories();
  const total=await totalCategories();


  return (
    <div className="p-7">
      <div className="flex justify-between  items-center px-7">
        <h1 className="text-2xl font-bold">
          Categories <span>({total})</span>
        </h1>
      </div>

      <div className="mt-8 p-7">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Categories;
