import { Link } from "react-router-dom";
import { e2p } from "../utils/function";
import ProductAction from "../components/module/ProductAction";

export const productsDataSourse = (products) =>
  products?.map((product) => ({
    key: product.id,
    name: (
      <Link to={`/product/${product.id}`} className="productLink">
        <p>{product.name}</p>
      </Link>
    ),
    stock: (
      <p>{product.quantity === e2p(0) ? "هیچی" : e2p(product.quantity)}</p>
    ),
    price: `ريال ${e2p(product.price)}`,
    id: <p>{product.id}</p>,
    action: <ProductAction productId={product.id} />,
  }));
