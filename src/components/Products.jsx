import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/queries";
import { Table } from "antd";
import { productsColumns } from "../constants/tableColumns";
import Loder from "./shared/Loder";
import { productsDataSourse } from "../constants/tableDataSourse";
import { BiLayer } from "react-icons/bi";
import CutomButtom from "./shared/CutomButtom";
import { useState } from "react";
import ReusableModal from "./shared/ReusableModal";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });
  console.log(form)

  const handleAdd = () => {
    setModalType("add");
    setIsModalOpen(true);
  };
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
          <div className="title-table_container">
            <p>مدیریت کالا</p>
            <CutomButtom
              type="button"
              title="افزودن محصول "
              onClick={handleAdd}
            />
          </div>
          <Table
            pagination={false}
            scroll={{ x: true }}
            columns={productsColumns}
            dataSource={productsDataSourse(data.data)}
          />
        </div>
      )}
      <ReusableModal
        modalType={modalType}
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        form={form}
        setForm={setForm}
      />
    </div>
  );
}
