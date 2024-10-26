import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/queries";
import AddProduct from "../components/module/AddProduct";
import { useEffect } from "react";

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
