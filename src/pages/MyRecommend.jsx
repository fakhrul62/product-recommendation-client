import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import shape1 from "../assets/shape-1.json";
import shape2 from "../assets/shape-2.json";
import shape3 from "../assets/shape-3.json";
import { AuthContext } from "../Provider/AuthProvider";
import RecommendationCard from "../components/RecommendationCard";
import useAxios from "../hooks/useAxios";

const MyRecommend = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    axiosSecure.get(`https://product-recommendation-system-server-pied.vercel.app/recommendations?email=${user.email}`)
    .then(res=> setRecommendations(res.data))
  }, [user.email]);


  return (
    <div>
      <div className="bg-zinc-100 py-32 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-bold lg:text-4xl md:text-2xl text-xl text-zinc-900 text-center font-head">
            All the Recommendations you made
          </h2> 
          <h2 className="font-semibold lg:text-xl md:text-lg text-base text-zinc-800 mt-10 text-center font-head">
            You made <span className="text-orange-600">{recommendations.length}</span> recommendations so far.
          </h2> 
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
      <div className="my-10 grid md:grid-cols-2 gap-5 w-10/12 mx-auto">
        {
            recommendations.map(recommendation=><RecommendationCard key={recommendation._id} recommendation={recommendation} recommendations={recommendations} setRecommendations={setRecommendations}></RecommendationCard>)
        }
      </div>
    </div>
  );
};

export default MyRecommend;
