import { Link } from "react-router";

const Product = ({ product }) => {
  const { _id, title, image, price_min, price_max } = product;

  return (
    // 1. Add 'flex flex-col' and 'h-full' to the parent card
    <div className="p-6 text-left bg-white border border-gray-200 rounded-lg flex flex-col h-full hover:shadow-xl">
      <img
        className="h-75.5 w-full mb-4 rounded-md hover:shadow-lg"
        src={image}
        alt={title}
      />

      {/* 2. This container will 'grow' to fill the available space, pushing the button down */}
      <div className="grow">
        <h2 className="text-2xl font-medium mb-4">{title}</h2>
        <p className="text-xl text-gradient font-medium mb-5">
          $ {price_min} - {price_max}
        </p>
      </div>

      {/* 3. The button stays at the bottom of the card */}
      <Link
        to={`/productDetails/${_id}`}
        className="btn w-full font-semibold pt-1 text-xl text-gradient border border-primary"
      >
        View Details
      </Link>
    </div>
  );
};

export default Product;
