import React from "react";
import SignupForm from "./SignupForm";
import Testimonial from "./Testimonial";

const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100 overflow-auto">
      {/* Signup Form Section */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Signup Form Section */}
        <div className="basis-2/5 flex-shrink-0 flex items-center justify-center bg-gray-50">
          <SignupForm />
        </div>

        {/* Testimonial Section */}
        <div className="basis-3/5 flex-grow flex items-center justify-center bg-blue-100 p-6">
          <Testimonial
            profileImage="profile-placeholder.png"
            name="Philip, 29"
            tags="#books #comics #fantasy"
            rating="⭐⭐⭐⭐⭐"
            feedback="This app changed my life! It solved one of my biggest problems: having an endless queue of book recommendations I actually like! Besides, I've met such amazing and like-minded people."
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
