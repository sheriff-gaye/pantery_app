
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import UploadButton from "./components/add-btn";
import { getCategories, totalCategories } from "@/actions/get-categories";

const Categories = async () => {
  const data = await getCategories();
  const total=await totalCategories();


  return (
    <div className="p-9">
      <div className="flex justify-between  items-center">
        <h1 className="text-2xl font-bold">
          Categories <span>({total})</span>
        </h1>
        <UploadButton />
      </div>

      <div className="mt-8">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Categories;
