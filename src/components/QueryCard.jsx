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
    fetch("http://localhost:5000/recommendations")
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
        fetch(`http://localhost:5000/queries/${id}`, {
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
    <div className="border border-gray-200 p-5 rounded-md grid grid-cols-4 gap-5">
      <div className="flex col-span-1">
        <img src={productImageUrl} className="w-60 object-contain" />
      </div>
      <div className="col-span-3">
        <h2 className="text-lg font-bold mt-5">{queryTitle}</h2>
        <p className="text-sm text-gray-700 font-semibold mt-2">
          Product: {productName}
        </p>
        <p className="text-sm text-gray-700 font-semibold">
          Company: {productBrand}
        </p>
        <p className="text-sm text-gray-600 mb-2">Posted on: {dateTime}</p>
        <p className="text-sm text-zinc-800">{reasonDetails}</p>
      </div>
      {location.pathname === myQueryRoute && (
        <div className="flex gap-5 col-span-4">
          <Link to={`/query-details/${_id}`}>
            <button type="button" className="btn">
              View Details
            </button>
          </Link>
          <Link to="/query-update">
            <button type="button" className="btn">
              Update
            </button>
          </Link>
          <Link>
            <button onClick={()=>handleDelete(_id)} type="button" className="btn">
              Delete
            </button>
          </Link>
        </div>
      )}
      {location.pathname !== myQueryRoute && (
        <div className="flex gap-5 col-span-4">
          <Link to={`/query-details/${_id}`}>
            <button type="button" className="btn">
              Recommend
            </button>
          </Link>
          <button type="button" className="btn">
            {newRecommendationCount} Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default QueryCard;
