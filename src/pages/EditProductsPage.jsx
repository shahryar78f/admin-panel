import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/queries";
import Products from "../components/Products";
import AddProduct from "../components/module/AddProduct";
import { useEffect } from "react";
import ReusableModal from "../components/shared/ReusableModal";

export default function EditProductsPage({ productId, setForm }) {
  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    gcTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (data)
      setForm({
        name: data?.name,
        price: data?.price,
        quantity: data?.quantity,
      });
  }, [data, setForm]);

  return <>{data && <AddProduct product={data} />}</>;
}
