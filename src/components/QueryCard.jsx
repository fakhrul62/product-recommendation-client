import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";


const QueryCard = ({ query, queryCollection, setQueryCollection }) => {
  const location = useLocation();
  const myQueryRoute = "/my-queries";
  const {
    _id,
    productName,
    productBrand,
    productImageUrl,
    queryTitle,
    reasonDetails,
    user_name,
    user_email,
    user_image,
    dateTime
  } = query;
  useEffect(()=>{
    fetch("https://product-recommendation-system-server-pied.vercel.app/recommendations")
    .then(res=>res.json())
    .then(data=>{
      const newRecommendationCount = data.filter(recommendation=>recommendation.query_id===_id);
      setNewRecommendationCount(newRecommendationCount.length);
    })

  }, [])
  const [newRecommendationCount, setNewRecommendationCount] = useState(0);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#848489",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://product-recommendation-system-server-pied.vercel.app/queries/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Query has been deleted.",
                icon: "success",
              });
              const remaining = queryCollection?.filter(
                (que) => que._id !== id
              );
              setQueryCollection(remaining);
            }
          });
      }
    });
  };
  return (
    <div className="border border-gray-300 hover:border-orange-300 shadow-lg hover:shadow duration-150 p-5 rounded-md md:grid grid-cols-4 gap-5">
      <div className="flex col-span-1">
        <img src={productImageUrl} className="w-60 object-contain" />
      </div>
      <div className="col-span-3">
        <h2 className="text-xl text-zinc-950 font-bold mt-5 font-body">{queryTitle}</h2>
        <p className="text-sm text-zinc-800 font-semibold mt-2 font-head">
          Product: {productName}
        </p>
        <p className="text-sm text-zinc-800 font-semibold font-head">
          Company: {productBrand}
        </p>
        <p className="text-sm text-gray-800 mb-2 font-head">Posted on: {dateTime}</p>
        <p className="text-sm text-zinc-800 font-head"><span className="font-semibold">Boycott Reason: </span>{reasonDetails}</p>
      </div>
      {location.pathname === myQueryRoute && (
        <div className="flex md:flex-row flex-col gap-5 col-span-4">
          <Link to={`/query-details/${_id}`}>
            <button type="button" className="btn bg-white hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-zinc-800 hover:text-black duration-300 font-body">
              View Details
            </button>
          </Link>
          <Link to={`/update-query/${_id}`}>
            <button type="button" className="btn bg-white hover:bg-green-300 border border-zinc-300 hover:border-green-400 text-zinc-800 hover:text-green-700 duration-300 font-body">
              Update
            </button>
          </Link>
          <Link>
            <button onClick={()=>handleDelete(_id)} type="button" className="btn bg-white hover:bg-red-300 hover:border-red-600 hover:text-red-700 text-zinc-800 duration-300 font-body">
              Delete
            </button>
          </Link>
        </div>
      )}
      {location.pathname !== myQueryRoute && (
        <div className="flex md:flex-row flex-col gap-5 col-span-4">
          <Link to={`/query-details/${_id}`}>
            <button type="button" className="btn bg-white hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-zinc-800 hover:text-black duration-300 font-body">
              Recommend
            </button>
          </Link>
          <button type="button" className="btn bg-white hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-zinc-800 hover:text-black duration-300 font-body">
            {newRecommendationCount} Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default QueryCard;
