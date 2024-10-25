import { useState, useEffect } from "react";
import { Modal } from "antd";
import CustomInput from "../shared/CustomInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProducts, editProduct, getProduct } from "../../services/queries";

export default function AddProduct({
  isModalOpen,
  setIsModalOpen,
  modalType,
  productId,
}) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    if (modalType === "edit" && productId) {
      const fetchProductData = async () => {
        const productData = await getProduct(productId);
        setForm({
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
        });
      };
      fetchProductData();
    }
  }, [modalType, productId]);

  const addProductMutation = useMutation({
    mutationFn: () => addProducts(form),
  });

  const editProductMutation = useMutation({
    mutationFn: (updatedProduct) => editProduct(productId, updatedProduct),
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    if (modalType === "edit") {
      editProductMutation.mutate(form, {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
          setIsModalOpen(false);
        },
      });
    } else {
      addProductMutation.mutate(form, {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
          setIsModalOpen(false);
        },
      });
    }
  };

  return (
    <Modal
      title={
        <p className="title-modal">
          {modalType === "edit" ? "ویرایش محصول" : "ایجاد محصول جدید"}
        </p>
      }
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleConfirm}
      okText="تایید"
      cancelText="لغو"
      className="custom-modal"
      okButtonProps={{ style: { backgroundColor: "#ff4d4f", color: "#fff" } }}
      cancelButtonProps={{
        style: { backgroundColor: "#d9d9d9", color: "#000" },
      }}>
      <div className="add-product">
        <CustomInput
          label="نام کالا"
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="نام کالا"
        />
        <CustomInput
          label="تعداد موجودی"
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={onChange}
          placeholder="تعداد"
        />
        <CustomInput
          label="قیمت"
          type="number"
          name="price"
          value={form.price}
          onChange={onChange}
          placeholder="قیمت"
        />
      </div>
    </Modal>
  );
}
