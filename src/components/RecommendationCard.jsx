import React from 'react';

const RecommendationCard = ({recommendation}) => {
    const {dateTime,query_creator_email,query_creator_name,queryTitle,recommendationReason,recommendedProductImageUrl,recommendedProductName,recommendationTitle} = recommendation;
    return (
        <div className='p-5 border border-gray-200 rounded-md grid grid-cols-5 gap-3'>
            <div className='col-span-4'>
                <h2 className='text-lg font-bold mt-5'>{recommendationTitle}</h2>
                <p className='text-sm text-gray-700 font-semibold mt-2'>Product: {recommendedProductName}</p>
                <p className='text-sm text-gray-700 font-semibold'>Company: {query_creator_name}</p>
                <p className='text-sm text-gray-600 mb-2'>Posted on: {dateTime}</p>
                <p className='text-sm text-zinc-800'>Recommendation Reason: {recommendationReason}</p>
            </div>
            <div>
                <img src={recommendedProductImageUrl} className='w-60 object-contain'/>
            </div>
            <button type="button" className='btn bg-zinc-900 border border-zinc-900 text-white hover:bg-red-300 hover:border-red-600 hover:text-red-700'>Delete</button>
        </div>
    );
};

export default RecommendationCard;