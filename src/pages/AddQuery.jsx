import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const AddQuery = () => {
  const { user } = useContext(AuthContext);
  const handleAddQuery = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productBrand = form.productBrand.value;
    const productImageUrl = form.productImageUrl.value;
    const queryTitle = form.queryTitle.value;
    const reasonDetails = form.reasonDetails.value;
    const now = new Date();
    const dateTime = now.toLocaleString();

    const newQuery = {
      productName,
      productBrand,
      productImageUrl,
      queryTitle,
      reasonDetails,
      user_name: user.displayName,
      user_email: user.email,
      user_image: user.photoURL,
      dateTime,
      recommendationCount: 0,
    };

    console.log(newQuery);
    //send data to the server
    fetch("http://localhost:5000/queries", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Query Added!",
            icon: "success",
          });
        }
      });
    //form.reset();
  };
  return (
    <div className="w-10/12 mx-auto my-10">
      <h2 className="text-center font-bold text-3xl mb-10">Add Query</h2>
      <form
        className="grid grid-cols-2 gap-5 w-7/12 mx-auto"
        onSubmit={handleAddQuery}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Product Name</span>
          </div>
          <input
            type="text"
            placeholder="Product Name"
            name="productName"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Product Brand</span>
          </div>
          <input
            type="text"
            placeholder="Product Brand"
            name="productBrand"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control col-span-2 w-full">
          <div className="label">
            <span className="label-text">Product Image-URL</span>
          </div>
          <input
            type="url"
            placeholder="Product Image-URL"
            name="productImageUrl"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control col-span-2 w-full">
          <div className="label">
            <span className="label-text">Query Title</span>
          </div>
          <input
            type="text"
            placeholder="e.g., Is there any better product that gives me the same quality?"
            name="queryTitle"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control col-span-2 w-full">
          <div className="label">
            <span className="label-text">Boycotting Reason Details</span>
          </div>
          <textarea
            placeholder="Explain the reason you don’t want this product"
            name="reasonDetails"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </label>
        <div className="col-span-2">
          <button
            type="submit"
            className="btn w-full bg-zinc-900 text-white py-3 rounded-md hover:bg-zinc-200 hover:text-black hover:border"
          >
            Add Query
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuery;
