import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import shape1 from "../../public/shape-1.json";
import shape2 from "../../public/shape-2.json";
import shape3 from "../../public/shape-3.json";
import { AuthContext } from "../Provider/AuthProvider";
import RecommendationCard from "../components/RecommendationCard";

const MyRecommend = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/recommendations?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setRecommendations(data));
  }, [user.email]);
  return (
    <div>
      <div className="bg-zinc-100 py-32 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-bold text-4xl text-zinc-900 text-center">
            All the Recommendations you made: {recommendations.length}
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
      <div className="my-10 grid grid-cols-2 gap-5 w-10/12 mx-auto">
        {
            recommendations.map(recommendation=><RecommendationCard key={recommendation._id} recommendation={recommendation}></RecommendationCard>)
        }
      </div>
    </div>
  );
};

export default MyRecommend;
