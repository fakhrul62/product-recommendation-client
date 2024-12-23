import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from 'sweetalert2'

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
  const { user } = useContext(AuthContext);
  const handleRecommend = (e) => {
    e.preventDefault();
    const form = e.target;
    const recommendationTitle = form.recommendationTitle.value;
    const recommendedProductName = form.recommendedProductName.value;
    const recommendedProductImageUrl = form.recommendedProductImageUrl.value;
    const recommendationReason = form.recommendationReason.value;
    const now = new Date();
    const dateTime = now.toLocaleString();
    const newRecommendation = {
      recommendationTitle,
      recommendedProductName,
      recommendedProductImageUrl,
      recommendationReason,
      queryTitle,
      query_creator_name: user_name,
      query_creator_email: user_email,
      current_user_name: user.displayName,
      current_user_email: user.email,
      dateTime,
    };
    // Send data to the server
    fetch("http://localhost:5000/recommendations", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newRecommendation),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          // Increment recommendationCount for the new query
          fetch(`http://localhost:5000/queries/${_id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ increment: 1 }), // Increment by 1
          })
            .then((res) => res.json())
            .then((updateData) => {
              if (
                updateData.message ===
                "Recommendation count incremented successfully"
              ) {
                Swal.fire({
                  title: "Awesome!",
                  text: "You recommended this Product!",
                  icon: "success"
                });
              }
            })
            .catch((error) =>
              console.error("Error incrementing recommendation count:", error)
            );
        }
      });

    // form.reset();
  };

  return (
    <div className="w-10/12 mx-auto my-5 grid grid-cols-2 gap-10">
      <div className=" p-10 rounded-xl">
        <img
          src={productImageUrl}
          alt={productName}
          className="rounded-lg w-1/2 mx-auto shadow drop-shadow-[15px_15px_10px_rgba(0,0,0,0.25)]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="capitalize font-bold text-3xl text-black">
          {queryTitle}
        </h2>
        <p className="font-semibold text-base flex items-center gap-2 mt-5">
          <IoBookOutline /> {productName}
        </p>
        <p className="text-zinc-600 mb-5">
          By: <span>{productBrand}</span>
        </p>

        <hr className="mb-5" />
        <p className="text-zinc-800">
          <span className="font-semibold">Review: </span>{" "}
          <span>{reasonDetails}</span>
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
              <span className="text-black font-semibold">{user_name}</span>
            </p>

            <p className="text-zinc-700">
              <span className="text-black font-semibold">{dateTime}</span>
            </p>
          </div>
        </div>
        {/* <div className="mt-10 flex gap-5">
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
        </div> */}
      </div>
      <div className="col-span-2 mt-10">
        <h2 className="font-bold text-center text-2xl mb-5">
          Want to Recommend this Product?
        </h2>
        <form
          className="grid grid-cols-2 gap-5 w-7/12 mx-auto"
          onSubmit={handleRecommend}
        >
          {/* Recommendation Title */}
          <label className="form-control col-span-2 w-full">
            <div className="label">
              <span className="label-text">Recommendation Title</span>
            </div>
            <input
              type="text"
              placeholder="Enter the recommendation title"
              name="recommendationTitle"
              className="input input-bordered w-full"
            />
          </label>

          {/* Recommended Product Name */}
          <label className="form-control col-span-2 w-full">
            <div className="label">
              <span className="label-text">Recommended Product Name</span>
            </div>
            <input
              type="text"
              defaultValue={productName}
              placeholder="Enter recommended product name"
              name="recommendedProductName"
              className="input input-bordered w-full"
            />
          </label>

          {/* Recommended Product Image URL */}
          <label className="form-control col-span-2 w-full">
            <div className="label">
              <span className="label-text">Recommended Product Image</span>
            </div>
            <input
              type="url"
              defaultValue={productImageUrl}
              placeholder="Enter the image URL of the recommended product"
              name="recommendedProductImageUrl"
              className="input input-bordered w-full"
            />
          </label>

          {/* Recommendation Reason */}
          <label className="form-control col-span-2 w-full">
            <div className="label">
              <span className="label-text">Recommendation Reason</span>
            </div>
            <textarea
              placeholder="Explain why you recommend this product"
              name="recommendationReason"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </label>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="btn w-full bg-zinc-900 text-white py-3 rounded-md hover:bg-zinc-200 hover:text-black hover:border"
            >
              Add Recommendation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryDetails;
