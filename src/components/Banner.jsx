import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, EffectFade } from "swiper/modules";
import { LuMoveRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import "./Banner.css"

const Banner = () => {
    return (
        <div className="py-20 border-b border-gray-200">
        <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-2 flex flex-col justify-center">
            <h1 className="font-bold lg:text-5xl text-3xl font-head text-zinc-950 mb-5">
              Ask for Recommendations
            </h1>
            <h3 className="font-semibold text-xl font-body text-zinc-950">
              Submit your product queries and get tailored suggestions from the
              community
            </h3>

            <ul className="*:text-zinc-950 *:text-lg *:flex *:items-center *:gap-2 *:font-body *:font-medium mt-7">
              <li>
                <LuMoveRight /> Discover the Best Alternatives
              </li>
              <li>
                <LuMoveRight /> Share Your Expertise
              </li>
              <li>
                <LuMoveRight /> Help others by adding recommendations and
                sharing your knowledge
              </li>
            </ul>
            <div className="mt-10 flex">
              <Link to="/queries"
                className="see-btn flex items-center gap-2 border border-orange-500 bg-white text-orange-500 hover:bg-orange-500 pl-10 pr-16 py-3 hover:text-white font-head font-semibold rounded-full "
              >
                See Our Queries <span className='text-2xl see-arrow'><HiArrowLongRight /></span>
              </Link>
            </div>
          </div>
          <div className="col-span-2 mt-10 md:mt-0">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              autoplay
              loop={true}
            >
              <SwiperSlide>
                <div className="flex justify-center md:justify-end">
                  <img
                    className=" rounded-lg w-10/12"
                    src="https://i.ibb.co.com/f00X0By/DALL-E-2024-12-23-00-56-33-A-vibrant-illustration-showing-a-collaborative-community-scene-for-a-prod.webp"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex  justify-center md:justify-end">
                  <img
                    className="w-10/12 rounded-lg "
                    src="https://i.ibb.co.com/vhrSdRN/DALL-E-2024-12-23-00-56-29-A-dynamic-scene-illustrating-a-product-recommendation-process-A-user-is-s.webp"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex  justify-center md:justify-end">
                  <img
                    className="w-10/12 rounded-lg "
                    src="https://i.ibb.co.com/KNfYp0s/DALL-E-2024-12-23-00-55-46-Three-separate-images-for-a-product-recommendation-platform-1-First-image.webp"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    );
};

export default Banner;