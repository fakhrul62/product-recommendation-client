import React from "react";
import { Link, useLocation } from "react-router-dom";

const QueryCard = ({ query }) => {
  const location = useLocation();
  const myQueryRoute = "/my-queries";
  const queriesRoute = "/queries";
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
    dateTime,
    recommendationCount,
  } = query;
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
            <button type="button" className="btn">
              Delete
            </button>
          </Link>
        </div>
      )}
      {location.pathname === queriesRoute && (
        <div className="flex gap-5 col-span-4">
          <Link to={`/query-details/${_id}`}>
            <button type="button" className="btn">
              Recommend
            </button>
          </Link>
            <button type="button" className="btn">
              {recommendationCount} Recommendations
            </button>

        </div>
      )}
    </div>
  );
};

export default QueryCard;
