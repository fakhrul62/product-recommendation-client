import React from "react";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const UpdateQuery = () => {
  const query = useLoaderData();
  const {
    _id,
    productName,
    productBrand,
    productImageUrl,
    queryTitle,
    reasonDetails
  } = query;
  const handleUpdateQuery = (e) => {
    e.preventDefault();
    const form = e.target;
    const productNameUpdated = form.productName.value;
    const productBrandUpdated = form.productBrand.value;
    const productImageUrlUpdated = form.productImageUrl.value;
    const queryTitleUpdated = form.queryTitle.value;
    const reasonDetailsUpdated = form.reasonDetails.value;

    const updatedQuery = {
        productName: productNameUpdated,
        productBrand: productBrandUpdated,
        productImageUrl: productImageUrlUpdated,
        queryTitle: queryTitleUpdated,
        reasonDetails: reasonDetailsUpdated,
    };

    console.log(updatedQuery);
    //send data to the server
    fetch(`https://product-recommendation-system-server-pied.vercel.app/queries/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Query Updated!",
            icon: "success",
          });
        }
      });
    //form.reset();
  };
  return (
    <div className="w-10/12 mx-auto my-10">
      <h2 className="text-center font-bold text-3xl mb-10 font-body">Update Query</h2>
      <form
        className="grid grid-cols-2 gap-5 md:w-7/12 mx-auto font-body"
        onSubmit={handleUpdateQuery}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Product Name</span>
          </div>
          <input
            type="text"
            placeholder="Product Name"
            name="productName"
            defaultValue={productName}
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
            defaultValue={productBrand}
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
            defaultValue={productImageUrl}
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
            defaultValue={queryTitle}
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
            defaultValue={reasonDetails}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </label>
        <div className="col-span-2">
          <button
            type="submit"
            className="btn w-full bg-orange-500 hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-white hover:text-black duration-300 font-body"
          >
            Update Query
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateQuery;
