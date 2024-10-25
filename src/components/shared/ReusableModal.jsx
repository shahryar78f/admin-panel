import { Modal } from "antd";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addProducts,
  deleteProduct,
  editProduct,
} from "../../services/queries";
import AddProduct from "../module/AddProduct";

export default function ReusableModal({
  modalType,
  isModalOpen,
  onCancel,
  productId,
  form,
  setForm,
}) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn:
      modalType === "delete"
        ? () => deleteProduct(productId)
        : (data) => addProducts(data),
  });

  const handleConfirm = () => {
    if (modalType === "delete") {
      console.log("deleted");
      mutate(productId, {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
          onCancel();
        },
        onError: (error) => {
          console.log("Error:", error.message);
        },
      });
    } else if (modalType === "add") {
      mutate(form, {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
          onCancel();
        },
        onError: (error) => {
          console.log("Error:", error.message);
        },
      });
    }
  };

  return (
    <Modal
      title={
        modalType === "delete" ? (
          "حذف محصول"
        ) : modalType === "edit" ? (
          <p className="titlte-modal">ویرایش اطلاعات</p>
        ) : (
          modalType === "add" && (
            <p className="titlte-modal">ایجاد محصول جدید</p>
          )
        )
      }
      open={isModalOpen}
      onCancel={onCancel}
      onOk={handleConfirm}
      okText="تایید"
      cancelText="لغو"
      className="custom-modal"
      okButtonProps={{ style: { backgroundColor: "#ff4d4f", color: "#fff" } }}
      cancelButtonProps={{
        style: { backgroundColor: "#d9d9d9", color: "#000" },
      }}>
      {modalType === "delete" ? (
        <p>آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟</p>
      ) : modalType === "edit" ? null : (
        modalType === "add" && <AddProduct form={form} setForm={setForm} />
      )}
    </Modal>
  );
}
