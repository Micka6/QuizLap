import React from "react";
import SignupForm from "./SignupForm";
import Testimonial from "./Testimonial";

const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100 overflow-auto">
      {/* Signup Form Section */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Signup Form Section */}
        <div className="basis-5/12 flex-shrink-0 flex items-center justify-center bg-gray-50">
          <SignupForm />
        </div>

        {/* Testimonial Section */}
        <div className="basis-7/12 flex-grow flex items-center justify-center bg-logsign p-6">
          <Testimonial/>
        </div>
      </div>
    </div>
  );
};

export default Signup;
