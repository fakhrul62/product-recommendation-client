import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import shape1 from "../assets/shape-1.json";
import shape2 from "../assets/shape-2.json";
import shape3 from "../assets/shape-3.json";
import QueryCard from "../components/QueryCard";
import { FiGrid } from "react-icons/fi";
import useAxios from "../hooks/useAxios";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [grid, setGrid] = useState(2);
  const axiosSecure = useAxios();
  useEffect(() => {
    // fetch(`https://product-recommendation-system-server-pied.vercel.app/queries`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setQueries(data);
    //     setFilteredQueries(data);
    //   });
    axiosSecure
      .get(`https://product-recommendation-system-server-pied.vercel.app/queries`)
      .then((res) => {
        setQueries(res.data);
        setFilteredQueries(res.data);
      });
  }, []);
  // Update filtered queries when searchTerm changes
  useEffect(() => {
    setFilteredQueries(
      queries.filter((query) =>
        (query.queryTitle || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, queries]);
  return (
    <div>
      <div className="bg-zinc-100 py-32 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-bold lg:text-4xl md:text-2xl text-xl text-zinc-900 text-center font-head">
            Search Your Queries Here
          </h2>
          <p className="text-center mt-3 font-head">
            Keep track of all the queries you have made. You can add your
            queries and see the responses you have received.
          </p>
          <div className="text-center mt-8">
            <input
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-10 py-2 border rounded-full w-1/2 focus:border-orange-500 focus:ring-orange-500 h-[50px] font-head"
            />
          </div>
          <div className="text-center mt-8 gap-5 flex justify-center">
            <Link to="/add-query">
              <button
                type="button"
                className="btn px-24 rounded-full font-head bg-zinc-900 text-white border hover:border-zinc-900 border-zinc-900 hover:text-zinc-900"
              >
                Add Query
              </button>
            </Link>
          </div>
          <div className="flex gap-4 justify-center items-center mt-5">
            <h3 className="flex items-center justify-center border border-orange-600 p-[15px] rounded-md text-orange-600"><FiGrid /></h3>
            <div className="gap-4 flex">
              <button className="btn py-3 px-5 border border-orange-400 rounded-md hover:bg-orange-600 hover:text-white font-head" onClick={()=> setGrid(1)}>1</button>
              <button className="btn py-3 px-5 border border-orange-400 rounded-md hover:bg-orange-600 hover:text-white font-head" onClick={()=> setGrid(2)}>2</button>
              <button className="btn py-3 px-5 border border-orange-400 rounded-md hover:bg-orange-600 hover:text-white font-head" onClick={()=> setGrid(3)}>3</button>
            </div>
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
          <div className={`grid md:grid-cols-${grid} gap-5`}>
            {filteredQueries.map((query) => (
              <QueryCard key={query._id} query={query} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queries;
