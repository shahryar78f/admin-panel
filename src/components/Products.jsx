import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/queries";
import { Table } from "antd";
import { productsColumns } from "../constants/tableColumns";
import Loder from "./shared/Loder";
import { useState } from "react";
import AddProduct from "./module/AddProduct";
import ProductsHeader from "./module/ProductsHeader";
import Pagination from "./module/Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";
import CutomButtom from "./shared/CutomButtom";
import { productsDataSourse } from "../constants/tableDataSourse";

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getProducts(page, limit), 
    keepPreviousData: true, 
  });

  const handlePageChange = (newPage) => {
    navigate(`?page=${newPage}&limit=${limit}`);
  };

  return (
    <div className="products-container">
      <div className="product-page_details">
        <ProductsHeader />
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
                onClick={() => setIsModalOpen(true)}
                className="customButton"
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
          <AddProduct
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>

      <Pagination
        limit={limit}
        page={page}
        totalPages={data?.totalPages || 1}
        totalProducts={data?.totalProducts || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
