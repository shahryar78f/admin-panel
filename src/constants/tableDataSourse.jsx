import { Link } from "react-router-dom";
import { e2p, sp } from "../utils/function";
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
    price: `${sp(product.price)}  هزار تومان`,
    id: <p>{product.id}</p>,
    action: <ProductAction productId={product.id} />,
  }));
