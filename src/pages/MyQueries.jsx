import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import shape1 from "../../public/shape-1.json";
import shape2 from "../../public/shape-2.json";
import shape3 from "../../public/shape-3.json";
import { AuthContext } from "../Provider/AuthProvider";
import QueryCard from "../components/QueryCard";

const MyQueries = () => {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/queries?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setQueries(data));
  }, [user.email]);

  return (
    <div>
      <div className="bg-zinc-100 py-32 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-bold text-4xl text-zinc-900 text-center">
            Find All Your Queries Here
          </h2>
          <p className="text-center mt-3">
            Keep track of all the queries you have made. You can view the status
            of your queries and the responses you have received.
          </p>
          <div className="text-center mt-8">
            <Link to="/add-query">
              <button
                type="button"
                className="btn px-20 bg-zinc-900 text-white border hover:border-zinc-900 border-zinc-900 hover:text-zinc-900"
              >
                Add Query
              </button>
            </Link>
          </div>
        </div>
        <div className="w-60 absolute -left-10 z-0">
          <Lottie animationData={shape1} loop={true} />
        </div>
        <div className="w-60 absolute top-10 left-1/2 z-0">
          <Lottie animationData={shape2} loop={true} />
        </div>
        <div className="w-60 absolute right-10 z-0">
          <Lottie animationData={shape3} loop={true} />
        </div>
      </div>
      <div className="w-10/12 mx-auto my-10">
        <div>
        <div className="grid grid-cols-2 gap-5">
          { queries.length>0 ? (
            queries.map((query) => (
              <QueryCard key={query._id} query={query} />
              
            )))
            : (
              <p className="text-center text-2xl text-black">No queries found</p>
            )
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default MyQueries;
