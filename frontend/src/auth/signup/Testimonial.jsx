import React from "react";
import globe from "../../assets/auth/signup.png";

const Testimonial = () => {
  return (
    <div className="w-full h-full flex flex-col items-center text-center gap-3 mt-3  ">
      <p className="text-4xl font-bold text-secondary mt-10">Challenge Yourself, <br/>Learn More</p>
      <img
        src={globe}
        className="max-w-full max-h-[80%]"
      />
      
    </div>
  );
};

export default Testimonial;
