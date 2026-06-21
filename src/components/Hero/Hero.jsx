import { FaSearch } from "react-icons/fa";
import bgLeft from "../../assets/bg-hero-left.png";
import bgRight from "../../assets/bg-hero-right.png";
import { Link } from "react-router"

const Hero = () => {
  return (
    <section className="relative w-full h-125 flex flex-col items-center justify-center bg-hero-gradient overflow-hidden">
      {/* Background Spiral Images */}
      <img
        src={bgLeft}
        alt="spiral"
        className="absolute left-0 top-0 h-full pointer-events-none"
      />
      <img
        src={bgRight}
        alt="spiral"
        className="absolute right-0 top-0 h-full pointer-events-none"
      />

      {/* Hero Content */}
      <div className="text-center z-10 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Deal Your <span className="text-gradient">Products</span> <br />
          In A <span className="text-gradient">Smart</span> Way !
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>

        {/* Search Input */}
        <div className="flex justify-center mb-8">
          <div className="join w-full max-w-lg">
            <input
              className="input input-bordered join-item w-full pl-6 text-base rounded-l-full"
              placeholder="Search For Products, Categories..."
            />
            <button className="btn bg-primary-gradient text-white rounded-r-full join-item">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link to={"/allProducts"} className="btn bg-primary-gradient text-base font-semibold px-6 border-none text-white">
            Watch All Products
          </Link>
          <Link to={"/createProduct"} className="btn border-primary font-semibold px-6 text-base">
            <span className="text-gradient">Post an Product</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
