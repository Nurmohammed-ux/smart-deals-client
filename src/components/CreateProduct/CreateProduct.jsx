import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router";
// import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
// import UseAxios from "../../hooks/useAxios";

const categories = [
  "Electronics",
  "Art And Hobbies",
  "Fashion",
  "Home And Garden",
  "Sports",
  "Books",
  "Toys",
  "Vehicles",
  "Apps",
];

export default function CreateProductPage() {
  const [condition, setCondition] = useState("Brand New");
  const [category, setCategory] = useState("");
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  // const axiosInstance = UseAxios();

  const handleCreateAProduct = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // const title = form.title.value;
    // const category = form.category.value;
    // const price_min = parseFloat(form.price_min.value);
    // const price_max = parseFloat(form.price_max.value) || parseFloat(form.price_min.value);
    // const condition = condition;
    // const usage = form.usage.value;
    // const image = form.image.value;
    // const seller_name = form.seller_name.value;
    // const email = form.email.value;
    // const seller_contact = form.seller_contact.value;
    // const seller_image = form.seller_image.value;
    // const location = form.location.value;
    // const description = form.description.value;
    // const status = "pending";
    // const created_at = new Date().toISOString();
    const productData = {
      ...data, // This spreads all your inputs (title, category, etc.)
      price_min: parseFloat(data.price_min),
      price_max: data.price_max
        ? parseFloat(data.price_max)
        : parseFloat(data.price_min),
      condition: condition, // Using your existing state
      status: "pending",
      created_at: new Date(),
    };

    // Now you can log or fetch with productData
    // console.log("Ready to send:", productData);

    // axios
    //   .post(`http://localhost:3000/products`, productData)
    //   .then((product) => {
    //     console.log("after post by axios", product.data);
    //     if (product.data.insertedId) {
    //       Swal.fire({
    //         title: "Success!",
    //         text: "You have successfully created your product.",
    //         icon: "success",
    //         confirmButtonText: "OK",
    //       });
    //     }
    //   });

    // axiosInstance.post("/products", productData).then((product) => {
    //   console.log("after post by axios", product.data);
    //   if (product.data.insertedId) {
    //     Swal.fire({
    //       title: "Success!",
    //       text: "You have successfully created your product.",
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     });
    //   }
    // });

    axiosSecure.post("/products", productData).then((product) => {
      // console.log("after axios secure", product.data);
      if (product.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "You have successfully created your product.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F2F2F5] font-sans py-10 px-4">
      <div className="max-w-xl mx-auto">
        <Link
          to={"/"}
          className="flex items-center justify-center gap-2 text-base font-medium text-slate-600 hover:text-slate-800 mb-2"
        >
          <BsArrowLeft size={18} />
          Back To Products
        </Link>

        <h1 className="text-3xl font-extrabold text-center mb-8">
          <span className="text-slate-900">Create </span>
          <span className="text-gradient">A Product</span>
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleCreateAProduct} className="flex flex-col gap-5">
            {/* Title / Category */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Yamaha Fz Guitar for Sale"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-primary bg-white"
                  >
                    <option value="" disabled hidden>
                      Select a Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="text-slate-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <BiChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Min / Max price */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Min Price You want to Sale ($)
                </label>
                <input
                  type="number"
                  name="price_min"
                  placeholder="e.g. 18.5"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Max Price You want to Sale ($)
                </label>
                <input
                  type="number"
                  name="price_max"
                  placeholder="Optional (default = Min Price)"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-primary"
                />
              </div>
            </div>

            {/* Condition / Usage time */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">
                  Product Condition
                </label>
                <div className="flex items-center gap-6 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        condition === "Brand New"
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {condition === "Brand New" && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </span>
                    <input
                      type="radio"
                      name="condition"
                      value="Brand New"
                      checked={condition === "Brand New"}
                      onChange={() => setCondition("Brand New")}
                      className="hidden"
                    />
                    <span
                      className={`text-sm font-medium ${
                        condition === "Brand New"
                          ? "text-gradient"
                          : "text-gray-500"
                      }`}
                    >
                      Brand New
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        condition === "Used"
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {condition === "Used" && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </span>
                    <input
                      type="radio"
                      name="condition"
                      value="Used"
                      checked={condition === "Used"}
                      onChange={() => setCondition("Used")}
                      className="hidden"
                    />
                    <span
                      className={`text-sm font-medium ${
                        condition === "Used" ? "text-gradient" : "text-gray-500"
                      }`}
                    >
                      Used
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Product Usage time
                </label>
                <input
                  type="text"
                  name="usage"
                  placeholder="e.g. 1 year 3 month"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
                />
              </div>
            </div>

            {/* Product Image URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Your Product Image URL
              </label>
              <input
                type="text"
                name="image"
                placeholder="https://..."
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
              />
            </div>

            {/* Seller Name / Email */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Seller Name
                </label>
                <input
                  type="text"
                  name="seller_name"
                  defaultValue={user?.displayName}
                  placeholder="e.g. Artisan Roasters"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Seller Email
                </label>
                <input
                  type="email"
                  name="seller_email"
                  defaultValue={user?.email}
                  placeholder="leil31955@nrlord.com"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
                />
              </div>
            </div>

            {/* Seller Contact / Image URL */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Seller Contact
                </label>
                <input
                  type="text"
                  name="seller_contact"
                  placeholder="e.g. +1-555-1234"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Seller Image URL
                </label>
                <input
                  type="text"
                  name="seller_image"
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="City, Country"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Simple Description about your Product
              </label>
              <textarea
                rows={3}
                name="description"
                placeholder="e.g. I bought this product 3 month ago, did not used more than 1/2 time, actually learning guitar is so tough...."
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
            >
              Create A Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
