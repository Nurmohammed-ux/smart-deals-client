import { use } from "react";
import Product from "../Product/Product";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);
//   console.log(products);
  return (
    <div className="mt-20">
      <h1 className="text-5xl font-bold text-center mb-10">
        Recent <span className="text-gradient">Products</span>
      </h1>
      <div className="grid grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
