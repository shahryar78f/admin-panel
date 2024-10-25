import { Modal } from "antd";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, editProduct } from "../../services/queries";

export default function ReusableModal({
  modalType,
  isModalOpen,
  onCancel,
  productId,
}) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn:
      modalType === "delete"
        ? () => deleteProduct(productId)
        : (data) => editProduct(productId, data),
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
    } else if (modalType === "edit") {
      mutate({});
    }
  };

  return (
    <Modal
      title={modalType === "delete" ? "حذف محصول" : "ویرایش محصول"}
      open={isModalOpen}
      onCancel={onCancel}
      onOk={handleConfirm}
      okText="تایید"
      cancelText="لغو">
      {modalType === "delete" ? (
        <p>آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟</p>
      ) : (
        <p>فرم ویرایش محصول</p>
      )}
    </Modal>
  );
}
