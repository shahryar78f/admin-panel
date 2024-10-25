import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/queries";
import { Table } from "antd";
import { productsColumns } from "../constants/tableColumns";
import Loder from "./shared/Loder";
import { productsDataSourse } from "../constants/tableDataSourse";
import { BiLayer } from "react-icons/bi";

export default function Products() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    gcTime: 0,
    staleTime: 0,
  });
  console.log(data?.data, isLoading);
  return (
    <div className="contact-page_details">
      {isLoading ? (
        <main>
          <Loder />
        </main>
      ) : (
        <div className="tableContainer">
          <div>
            <p>مدیریت کالا</p>
          </div>
        <Table
          pagination={false}
          scroll={{ x: true }}
          columns={productsColumns}
          dataSource={productsDataSourse(data.data)}
        />
        </div>
      )}
    </div>
  );
}
