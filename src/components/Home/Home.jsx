import { Suspense } from "react";
import Hero from "../Hero/Hero";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products",
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<p className="text-3xl text-center mt-6"><span className="loading loading-ring loading-xl"></span></p>}>
        <LatestProducts latestProductsPromise={latestProductsPromise} />
      </Suspense>
    </div>
  );
};

export default Home;
