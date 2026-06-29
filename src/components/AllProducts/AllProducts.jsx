import { useLoaderData } from "react-router";
import Product from "../Product/Product";

const AllProducts = () => {
  const products = useLoaderData();
  // console.log(products);
  return (
    <div className="bg-[#F2F2F5]">
      <h1 className="text-4xl font-bold text-center pt-20 pb-10">
        All <span className="text-gradient">Products</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
