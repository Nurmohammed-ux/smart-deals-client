import { useContext, useEffect, useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const statusStyles = {
  pending: "bg-[#FFC107] text-white",
  "on sale": "bg-[#FFC107] text-white",
  sold: "bg-slate-400 text-white",
  approved: "bg-green-500 text-white",
  accepted: "bg-green-500 text-white",
  rejected: "bg-red-400 text-white",
};

function StatusBadge({ status }) {
  const style = statusStyles[status?.toLowerCase()] || "bg-gray-300 text-white";
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${style}`}
    >
      {status}
    </span>
  );
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

export default function ProductDetailsPage() {
  const product = useLoaderData();
  const bidModalRef = useRef();
  const { user, loading } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  // console.log(user);

  const {
    _id,
    email,
    image,
    title,
    condition,
    usage,
    description,
    category,
    price_min,
    price_max,
    created_at,
    seller_name,
    seller_contact,
    location,
    status,
  } = product;
  //   console.log(product);

  useEffect(() => {
    if (loading || !user || !user.accessToken) {
      return;
    }

    fetch(`http://localhost:3000/products/bids/${_id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("bids for this product", data);
        setBids(data);
      });
  }, [user, _id, loading]);

  if (loading) {
    return <div className="text-center py-20">Loading authentication...</div>;
  }

  // 2. PLACE AUTH GUARD HERE (Optional but recommended)
  if (!user) {
    return (
      <div className="text-center py-20">Please log in to view details.</div>
    );
  }

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bidAmount = e.target.bid.value;
    const contact = e.target.contact.value;
    // console.log(_id, name, email, bidAmount, contact);

    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      bid_price: bidAmount,
      buyer_contact: contact,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("after placing bid", data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            title: "Success!",
            text: "You have successfully placed your bid.",
            icon: "success",
            confirmButtonText: "OK",
          });
          // add new bid to the sate
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid].sort(
            (a, b) => b.bid_price - a.bid_price,
          );
          setBids(newBids);
        } else {
          // Handle logic if the bid wasn't inserted
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while placing your bid.",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="min-h-screen bg-[#F2F2F5] font-sans">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <div className="w-full h-110 rounded-xl bg-gray-200 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                Product Description
              </h2>

              <div className="flex flex-wrap gap-x-30 gap-y-1 text-sm mb-4">
                <p>
                  <span className="text-primary font-semibold">
                    Condition :{" "}
                  </span>
                  <span className="text-slate-900 font-semibold capitalize">
                    {condition}
                  </span>
                </p>
                <p>
                  <span className="text-primary font-semibold">
                    Usage Time :{" "}
                  </span>
                  <span className="text-slate-900 font-semibold">{usage}</span>
                </p>
              </div>
              <hr className="text-gray-300 mt-4 mb-6" />

              <p className="text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <Link
              to={"/"}
              className="inline-flex items-center gap-2 text-base font-medium text-slate-500 hover:text-slate-700 w-fit"
            >
              <BsArrowLeft size={18} />
              Back To Products
            </Link>

            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
                {title}
              </h1>
              <span className="inline-block text-xs font-medium text-primary bg-violet-200 rounded-full px-3 py-1">
                {category}
              </span>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-green-600">
                ${price_min} - {price_max}
              </p>
              <p className="text-sm text-gray-600 mt-1">Price starts from</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-3">
                Product Details
              </h2>
              <p className="text-sm text-slate-700 mb-1">
                <span className="font-semibold">Product ID:</span> {_id}
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Posted:</span>{" "}
                {formatDate(created_at)}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4">
                Seller Information
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-500">
                  {seller_name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {seller_name}
                  </p>
                  <p className="text-xs text-gray-400">{email}</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 mb-1">
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p className="text-sm text-slate-700 mb-3">
                <span className="font-semibold">Contact:</span> {seller_contact}
              </p>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-slate-900">Status:</span>
                <StatusBadge status={status} />
              </div>
            </div>

            <button
              onClick={() => bidModalRef.current.showModal()}
              className="w-full py-4 rounded-xl bg-primary-gradient text-white font-semibold shadow-sm hover:opacity-95 transition-opacity"
            >
              I Want Buy This Product
            </button>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog
              ref={bidModalRef}
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-xl text-center">
                  Give Seller Your Offered Price
                </h3>
                <form onSubmit={handleBidSubmit}>
                  <fieldset className="fieldset">
                    <div className="flex justify-between">
                      <div>
                        <label className="label mb-1 text-black">
                          Buyer Name
                        </label>
                        <br />
                        <input
                          type="text"
                          className="input"
                          name="name"
                          readOnly
                          defaultValue={user?.displayName}
                        />
                      </div>
                      <div>
                        <label className="label mb-1 text-black">
                          Buyer Email
                        </label>
                        <br />
                        <input
                          type="email"
                          className="input"
                          name="email"
                          readOnly
                          defaultValue={user?.email}
                        />
                      </div>
                    </div>
                    <label className="label text-black">Place your Price</label>
                    <input
                      type="text"
                      className="input w-full"
                      name="bid"
                      placeholder="e.g. Artisan Roasters"
                    />
                    <label className="label text-black">Contact Info</label>
                    <input
                      type="text"
                      className="input w-full"
                      name="contact"
                      placeholder="e.g. +1-555-1234"
                    />
                    <button className="btn bg-primary-gradient mt-4 font-medium text-white">
                      Submit Bid
                    </button>
                  </fieldset>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn text-gradient font-semibold border-primary">
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>

        {/* Owner-only bids section */}
        <div className="mt-16">
          <div className="w-10 h-0.5 bg-violet-400 mb-3" />
          <p className="text-4xl font-extrabold text-gray-200 select-none mb-4">
            Only Visible to Owner
          </p>
          <h2 className="text-2xl font-extrabold text-slate-900 -mt-1">
            Bids For This Product:{" "}
            <span className="text-gradient">
              {String(bids.length).padStart(2, "0")}
            </span>
          </h2>

          <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-170">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="px-5 py-5 font-medium">SL No</th>
                    <th className="px-6 py-5 font-medium">Buyer</th>
                    <th className="px-6 py-5 font-medium">Contact</th>
                    <th className="px-6 py-5 font-medium">Bid Price</th>
                    <th className="px-6 py-5 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map((bid, idx) => (
                    <tr
                      key={bid._id}
                      className={
                        idx !== bids.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }
                    >
                      <td className="px-5 py-5 text-slate-700">{idx + 1}</td>
                      <td className="px-6  py-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={"https://i.pravatar.cc/150?u=2"}
                            alt={bid.buyer_name}
                            className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0 object-cover"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {bid.buyer_name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {bid.buyer_email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-700">
                        {bid.buyer_contact}
                      </td>
                      <td className="px-6 py-5 text-slate-700 font-medium">
                        ${bid.bid_price}
                      </td>
                      <td className="px-6 py-5">
                        {bid.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <button className="text-xs font-medium text-green-600 border border-green-200 bg-green-50 rounded-full px-4 py-1.5 hover:bg-green-100 transition-colors">
                              Accept Offer
                            </button>
                            <button className="text-xs font-medium text-orange-500 border border-orange-200 bg-orange-50 rounded-full px-4 py-1.5 hover:bg-orange-100 transition-colors">
                              Reject Offer
                            </button>
                          </div>
                        ) : (
                          <StatusBadge status={bid.status} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
