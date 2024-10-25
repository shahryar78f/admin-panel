import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/queries";
import { Table } from "antd";
import { productsColumns } from "../constants/tableColumns";
import Loder from "./shared/Loder";
import { productsDataSourse } from "../constants/tableDataSourse";
import { useState } from "react";
import AddProduct from "./module/AddProduct";
import CutomButtom from "./shared/CutomButtom";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    gcTime: 0,
    staleTime: 0,
  });

  return (
    <div className="contact-page_details">
      {isLoading ? (
        <main>
          <Loder />
        </main>
      ) : (
        <div className="tableContainer">
          <div className="title-table_container">
            <p>مدیریت کالا</p>
            <CutomButtom
              type="button"
              title="افزودن محصول"
              onClick={handleAdd}
            />
          </div>
          <Table
            pagination={false}
            scroll={{ x: true }}
            columns={productsColumns}
            dataSource={productsDataSourse(data?.data || [])}
          />
        </div>
      )}
      {isModalOpen && (
        <AddProduct isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}
