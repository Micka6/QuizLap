import React from "react";

const Testimonial = ({ profileImage, name, tags, rating, feedback }) => {
  return (
    <div className="text-center bg-gray-100 p-12 rounded-lg shadow-lg max-w-sm">
      <img
        src={profileImage}
        alt={`${name}'s Profile`}
        className="w-20 h-20 rounded-full mx-auto mb-4 shadow-md"
      />
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600">{tags}</p>
      <div className="text-yellow-400 text-lg my-2">{rating}</div>
      <p className="text-gray-700">{feedback}</p>
    </div>
  );
};

export default Testimonial;
