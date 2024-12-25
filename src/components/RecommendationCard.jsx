import React from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const RecommendationCard = ({
  recommendation,
  recommendations,
  setRecommendations,
}) => {
  const {
    _id,
    dateTime,
    query_creator_email,
    query_creator_name,
    queryTitle,
    recommendationReason,
    recommendedProductImageUrl,
    recommendedProductName,
    recommendationTitle,
    current_user_name
  } = recommendation;
  const location = useLocation();
  const myRecommendations = "/my-recommendations";
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
        fetch(`https://product-recommendation-system-server-pied.vercel.app/recommendations/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Recommendation has been deleted.",
                icon: "success",
              });
              const remaining = recommendations?.filter(
                (que) => que._id !== id
              );
              setRecommendations(remaining);
              
            }
          });
      }
    });
  };
  return (
    <div className="border border-gray-300 hover:border-orange-300 shadow-lg hover:shadow duration-300 p-5 rounded-md grid md:grid-cols-5 gap-3">
      <div className="md:col-span-4 ">
        <h2 className="md:text-xl text-zinc-900 text-sm font-bold mt-5 font-body">{recommendationTitle}</h2>
        <p className="text-sm text-zinc-900 font-semibold mt-2 font-body">
          Product: {recommendedProductName}
        </p>
        <p className="text-sm text-zinc-800 font-semibold font-body">
          Made by: {current_user_name}
        </p>
        <p className="text-sm text-gray-600 mb-2 font-body">Posted on: {dateTime}</p>
        <p className="text-sm text-zinc-800 font-body">
          Recommendation Reason: {recommendationReason}
        </p>
      </div>
      <div className=" ">
        <img src={recommendedProductImageUrl} className="w-60 object-contain" />
      </div>
      {location.pathname === myRecommendations && (
        <button
          onClick={() => handleDelete(_id)}
          type="button"
          className="btn bg-zinc-900 border border-zinc-900 text-white hover:bg-red-300 hover:border-red-600 hover:text-red-700  font-body uppercase"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default RecommendationCard;
