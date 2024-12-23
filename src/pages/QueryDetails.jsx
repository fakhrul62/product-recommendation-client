import React from "react";
import { useLoaderData } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";

const QueryDetails = () => {
  const query = useLoaderData();
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
    <div className="w-10/12 mx-auto my-5 grid grid-cols-2 gap-10">
      <div className=" p-10 rounded-xl">
        <img
          src={productImageUrl}
          alt={productName}
          className="rounded-lg w-1/2 mx-auto drop-shadow-[15px_15px_10px_rgba(0,0,0,0.25)]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="capitalize font-bold text-3xl text-black">{queryTitle}</h2>
        <p className="font-semibold text-base flex items-center gap-2 mt-5">
          <IoBookOutline /> {productName}
        </p>
        <p className="text-zinc-600 mb-5">
          By: <span>{productBrand}</span>
        </p>
        
        <hr className="mb-5" />
        <p className="text-zinc-800">
          <span className="font-semibold">Review: </span> <span>{reasonDetails}</span>
        </p>
        <hr className="my-5" />
        <div className="grid grid-cols-[30%_70%]">
          <div>
            <p className="text-zinc-700">
              <span>Added By: </span>
            </p>
            <p className="text-zinc-700">
              <span>Date Added: </span>
            </p>
          </div>
          <div>
            <p className="text-zinc-700">
              <span className="text-black font-semibold">
                {user_name}
              </span>
            </p>

            <p className="text-zinc-700">
              <span className="text-black font-semibold">{dateTime}</span>
            </p>
          </div>
        </div>
        <div className="mt-10 flex gap-5">
          <button
            className="bg-white border border-zinc-800 hover:border-zinc-400 px-10 py-3 rounded-xl hover:text-black hover:bg-zinc-300 duration-300"
            type="button"
          >
            Recommend
          </button>

          <button
            className="hover:bg-zinc-600 text-white border border-zinc-800 px-10 py-3 rounded-xl hover:text-zinc-100 bg-zinc-800 duration-300"
            type="button"
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryDetails;
