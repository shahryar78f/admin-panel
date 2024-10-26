import  { useEffect, useState } from "react";

export default function Pagination({ limit, page, totalPages, totalProducts, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage); 
    }
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        قبلی
      </button>

      <span className="pagination-info">
        صفحه {currentPage} از {totalPages} (تعداد کل محصولات: {totalProducts})
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        بعدی
      </button>
    </div>
  );
}