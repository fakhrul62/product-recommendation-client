import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import shape1 from "../assets/shape-1.json";
import shape2 from "../assets/shape-2.json";
import shape3 from "../assets/shape-3.json";
import { AuthContext } from "../Provider/AuthProvider";
import useAxios from "../hooks/useAxios";
import RecommendationCard from "../components/RecommendationCard";

const RecommendForMe = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [recommendations, setRecommendations] = useState([]);
  const [myQueries, setMtQueries] = useState([]);
  const [myRecom, setMyRecom] = useState([]);

  // Fetch data with useEffect
  useEffect(() => {
    axiosSecure
      .get(`https://product-recommendation-system-server-pied.vercel.app/queries?email=${user.email}`)
      .then((res) => setMtQueries(res.data));

    axiosSecure
      .get(`https://product-recommendation-system-server-pied.vercel.app/recommendations?excludeEmail=${user.email}`)
      .then((res) => setRecommendations(res.data));
  }, [user.email]);

  // Compute `myRecom` when `recommendations` or `myQueries` change
  useEffect(() => {
    if (recommendations.length > 0 && myQueries.length > 0) {
      const matchedRecommendations = recommendations.filter((recommendation) =>
        myQueries.some((query) => query._id === recommendation.query_id)
      );
      setMyRecom(matchedRecommendations); // Update `myRecom` once
    }
  }, [recommendations, myQueries]);

  console.log(myRecom);
  console.log("otherQueries", myQueries);

  return (
    <div>
      <div className="bg-zinc-100 py-32 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-bold lg:text-4xl md:text-2xl text-xl text-zinc-900 text-center font-head">
            Recommendations for me
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
        {myRecom ? 
            (myRecom.map(recommendation=><RecommendationCard key={recommendation._id} recommendation={recommendation} recommendations={myRecom} setMyRecom={setRecommendations}></RecommendationCard>)) :
        (
            <p className="text-center text-2xl text-black col-span-2 font-head">No Recommendations for you yet</p>
        )
        }
      </div>
    </div>
  );
};

export default RecommendForMe;
