import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import AddProduct from "./AddProduct";
import ReusableModal from "../shared/ReusableModal";

export default function ProductAction({ productId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleEdit = () => {
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setModalType("delete");
    setIsModalOpen(true);
  };

  return (
    <div className="action-container">
      <MdEditNote onClick={handleEdit} />
      <FaRegTrashAlt onClick={handleDelete} />
      {modalType === "delete" && (
        <ReusableModal
          modalType={modalType}
          isModalOpen={isModalOpen}
          productId={productId}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      {modalType === "edit" && (
        <AddProduct
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          productId={productId}
          modalType={modalType}
        />
      )}
    </div>
  );
}
