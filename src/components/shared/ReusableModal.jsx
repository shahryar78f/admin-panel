import { Modal } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../services/queries";

export default function ReusableModal({
  modalType,
  isModalOpen,
  onCancel,
  productId,
}) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteProduct(productId),
  });

  const handleConfirm = () => {
    mutate(productId, {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        onCancel();
      },
      onError: (error) => {
        console.log("Error:", error.message);
      },
    });
  };

  return (
    <Modal
      title={<p>حذف محصول</p>}
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
      ) : null}
    </Modal>
  );
}
