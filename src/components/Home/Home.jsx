import { Suspense } from "react";
import Hero from "../Hero/Hero";
import LatestProducts from "../LatestProducts/LatestProducts";
import { Link } from "react-router";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products",
).then((res) => res.json());

const Home = () => {
  return (
    <div className="bg-[#F2F2F5]">
      <Hero />
      <Suspense
        fallback={
          <p className="text-3xl text-center mt-6">
            <span className="loading loading-ring loading-xl"></span>
          </p>
        }
      >
        <LatestProducts latestProductsPromise={latestProductsPromise} />
      </Suspense>
      <div className="flex justify-center">
        <Link to={"/allProducts"} className="btn bg-primary-gradient text-white font-semibold px-6 mb-10 w-fit">
          View All
        </Link>
      </div>
    </div>
  );
};

export default Home;
