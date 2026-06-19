import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const statusStyles = {
  pending: "bg-[#FFC107] text-black",
  "on sale": "bg-[#FFC107] text-black",
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

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [myBids, setMyBids] = useState([]);
  // console.log(user?.email);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("loading my biding data :", data);
          setMyBids(data);
        });
    }
  }, [user]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after delete", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
            }

            //update UI
            const remainingBids = myBids.filter((bid) => bid._id !== _id);
            setMyBids(remainingBids);
          });
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center pt-20 pb-10">
        My Bids :<span className="text-gradient ml-4">{myBids.length}</span>
      </h1>
      <div className="mt-6 bg-white rounded-lg mb-10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-170">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="px-5 py-5 font-medium">SL No</th>
                <th className="px-6 py-5 font-medium">Product</th>
                <th className="px-6 py-5 font-medium">Seller</th>
                <th className="px-6 py-5 font-medium">Bid Price</th>
                <th className="px-6 py-5 font-medium">Status</th>
                <th className="px-6 py-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBids.map((bid, idx) => (
                <tr key={bid._id} className="border-b border-gray-100">
                  <td className="px-5 py-5 text-slate-700">{idx + 1}</td>

                  {/* Product Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={bid.productDetails.image}
                        alt="product"
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold text-slate-900">
                          {bid.productDetails.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${bid.productDetails.price_max}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Seller Column */}
                  <td className="px-6 py-5">
                    <p className="font-semibold">
                      {bid.productDetails.seller_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {bid.productDetails.email}
                    </p>
                  </td>

                  <td className="px-6 py-5 font-bold text-slate-900">
                    ${bid.bid_price}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={bid.status} />
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-5">
                    <button
                      onClick={() => handleDeleteBid(bid._id)}
                      className="text-xs font-semibold text-red-500 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition"
                    >
                      Remove Bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBids;
