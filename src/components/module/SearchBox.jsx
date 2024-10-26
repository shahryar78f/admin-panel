import React, { useEffect, useState } from "react";
import CustomInput from "../shared/CustomInput";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { api } from "../../config/api";
import Loder from "../shared/Loder";
import { Button, Modal } from "antd";
import CutomButtom from "../shared/CutomButtom";
import { sp } from "../../utils/function";

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    name: searchParams.get("name") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const queryClient = useQueryClient();

  const fetchProducts = async () => {
    const params = {
      name: query.name || undefined,
      minPrice: query.minPrice || undefined,
      maxPrice: query.maxPrice || undefined,
    };

    const response = await api.get("/products", {
      params,
    });
    return response.data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products-search", searchParams],
    queryFn: fetchProducts,
    enabled:
      !!searchParams.name || !!searchParams.minPrice || !!searchParams.maxPrice,
  });

  useEffect(() => {
    if (data?.data) {
      setSelectedProduct(data.data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedQuery = { ...query, [name]: value };
    setQuery(updatedQuery);
    setSearchParams(updatedQuery);
  };

  const handleSearch = () => {
    window.history.replaceState({}, document.title, window.location.pathname);

    setIsModalOpen(true);
    refetch().then(() => {
      setSearchParams({ name: "", minPrice: "", maxPrice: "" });
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    queryClient.invalidateQueries(["products", searchParams]);
  };

  return (
    <div className="search-container">
      <CustomInput
        type="text"
        name="name"
        value={query.name}
        onChange={handleChange}
        placeholder="نام محصول"
      />
      <CustomInput
        type="number"
        name="minPrice"
        value={query.minPrice}
        onChange={handleChange}
        placeholder="حداقل قیمت"
      />
      <CustomInput
        type="number"
        name="maxPrice"
        value={query.maxPrice}
        onChange={handleChange}
        placeholder="حداکثر قیمت"
      />
      <CutomButtom
        title="جستجو"
        className="customButton"
        onClick={handleSearch}
      />
      <Modal
        className="modelButtom"
        title="جزئیات محصول"
        open={isModalOpen}
        onCancel={closeModal}
        footer={<Button onClick={closeModal}>بستن</Button>}>
        {isLoading ? (
          <Loder />
        ) : selectedProduct ? (
          selectedProduct?.map((product) => (
            <div key={product.id} className="search-box_container">
              <h3>{product.name}</h3>
              <p>قیمت: {sp(product.price)}</p>
              <p>موجودی: {product.quantity}</p>
            </div>
          ))
        ) : (
          <p>اطلاعاتی برای نمایش موجود نیست</p>
        )}
      </Modal>
    </div>
  );
}
