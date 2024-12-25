import React, { useState } from "react";
import Banner from "../components/Banner";
import Lottie from "lottie-react";
import thumb from "../assets/thumb.json";
import { useLoaderData } from "react-router-dom";
import QueryCard from "../components/QueryCard";

const Home = () => {
  const queries = useLoaderData();
  const [queryCollection, setQueryCollection] = useState(queries);
  return (
    <div>
      <Banner></Banner>
      {/* Recently added queries */}
      <div className="my-20 w-10/12 mx-auto">
        <h2 className="text-center font-semibold font-body text-3xl text-zinc-950 mb-20">
          Recently Added Queries
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {
            queryCollection.map((query) => (
              <QueryCard key={query._id} query={query} queryCollection={queryCollection} setQueryCollection={setQueryCollection}/>
            ))
          }
        </div>
      </div>
      {/* what we do */}
      <div className="w-8/12 mx-auto my-20 bg-orange-200 border border-orange-300 rounded-3xl p-10 grid md:grid-cols-3 gap-5">
        <div className="col-span-2">
          <h2 className="font-semibold text-3xl font-head">What We Do</h2>
          <p className="text-lg mt-5  font-body">
            We help you find the best recommendations for your queries. We have
            a wide range of queries and recommendations that will help you find
            the best solution for your problem. We have a team of experts who
            will help you find the best recommendations for your queries.
          </p>
        </div>
        <div className="flex justify-end">
          <div className="w-52 ">
            <Lottie animationData={thumb} loop={true} />
          </div>
        </div>
      </div>
      {/* Articles */}
      <div className="w-10/12 mx-auto my-20">
        <h2 className="text-center font-semibold text-3xl text-zinc-950 font-head">Latest Articles</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-10">
          <div className=" border border-zinc-200 shadow-xl rounded-3xl p-5">
            <img
              src="https://cdn.prod.website-files.com/6009ec8cda7f305645c9d91b/66e213aee3cdb32f620c6a7f_DESIGN_BlogHeader01_blue_2400x1260-1.jpg"
              className="w-full h-56 object-cover border border-zinc-300 rounded-3xl"
            />
            <h3 className="font-semibold text-xl mt-2 font-body">
              How to prevent my website from being scrolled horizontally?
            </h3>
            <p className="my-5 font-head">
              We can make table scrollable by adding table-responsive class to
              it, but how can we loop it so that once the loop ends..
            </p>
            <a className="py-2 border-b border-b-black font-head text-orange-500" href="https://webflow.com/blog/parallax-scrolling" target="_blank">Read more</a>
          </div>
          <div className=" border border-zinc-200 shadow-xl rounded-3xl p-5">
            <img
              src="https://cdn.educba.com/academy/wp-content/uploads/2020/02/2D-Arrays-in-C.png"
              className="w-full h-56 object-cover border border-zinc-300 rounded-3xl"
            />
            <h3 className="font-semibold text-xl mt-2 font-body">
            What's the best way to implement a 2D interval search in C++?
            </h3>
            <p className="my-5 font-head">
            2D Array is considered to be one of the simplest form under the multidimensional array. You can consider the 2D array to be an array of a 1D ..
            </p>
            <a className="py-2 border-b border-b-black font-head text-orange-500" href="https://www.educba.com/2d-arrays-in-c-plus-plus/" target="_blank">Read more</a>
          </div>
          <div className=" border border-zinc-200 shadow-xl rounded-3xl p-5">
            <img
              src="https://cdn.activestate.com/wp-content/uploads/2020/11/pandas-access-alement.png"
              className="w-full h-56 object-cover border border-zinc-300 rounded-3xl"
            />
            <h3 className="font-semibold text-xl mt-2 font-body">
            Access a list within an element of a Pandas DataFrame
            </h3>
            <p className="my-5 font-head">
            Learn how to access elements in Pandas. We can access individual elements in a Pandas DataFrame by using the iat and at functions..
            </p>
            <a className="py-2 border-b border-b-black font-head text-orange-500" href="https://www.activestate.com/resources/quick-reads/how-to-access-an-element-in-pandas/" target="_blank">Read more</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
