import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
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
      <ReusableModal
        modalType={modalType}
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        productId={productId}
      />
    </div>
  );
}
