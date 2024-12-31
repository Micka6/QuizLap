import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import clock from "../assets/landingpage/clock.png";
import logo from "../assets/quizlapLogo.png";
import starImage from "../assets/QUIZLAP.png"; // Assuming you have a star image for "What is QUIZLAP?"
import jj from "../assets/landingpage/quizlap_jj.png"
import iver from "../assets/landingpage/quizlap_iver.png"
import ivan from "../assets/landingpage/quizlap_ivan.png"
import cherold from "../assets/landingpage/quizlap_cherold.png"
import elijah from "../assets/landingpage/quizlap_elijah.png"
import tarre from "../assets/landingpage/quizlap_tarre.png"

const LandingPage = () => {
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  // Ref for the About Us and Our Spark sections
  const aboutUsRef = useRef(null);
  const ourSparkRef = useRef(null);

  // Toggle the nav menu when the hamburger icon is clicked
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Scroll to About Us section
  const scrollToAboutUs = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to Our Spark section
  const scrollToOurSpark = () => {
    if (ourSparkRef.current) {
      ourSparkRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to the top of the page (Home)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const teamMembers = [
    { name: "Member 1", role: "Frontend Developer", description: "Specializes in building responsive UIs." },
    { name: "Member 2", role: "Backend Developer", description: "Handles server-side logic and APIs." },
    { name: "Member 3", role: "UI/UX Designer", description: "Focuses on user-centric design." },
    { name: "Member 4", role: "Full Stack Developer", description: "Manages both frontend and backend tasks." },
    { name: "Member 5", role: "Project Manager", description: "Ensures timely delivery of projects." },
    { name: "Member 6", role: "Quality Assurance", description: "Maintains application quality." },
  ];

  return (
    <div className="w-full h-screen bg-landingw">
      <header className="w-full h-16 px-8">
        <div className="h-full relative flex justify-between items-center px-4 py-1">
          <div className="h-full w-48 flex justify-center">
            <img className="w-full h-full" src={logo} alt="logo" />
          </div>
          {/* Main menu */}
          <nav className="hidden lg:flex">
            <ul className="flex list-none gap-12 text-secondary text-base">
              <li>
                <button onClick={scrollToTop} className="text-lg text-secondary">Home</button>
              </li>
              <li>
                <button onClick={scrollToAboutUs} className="text-lg text-secondary">About Us</button>
              </li>
              <li>
                <button onClick={scrollToOurSpark} className="text-lg text-secondary">Our Spark</button>
              </li>
            </ul>
          </nav>

          {/* Auth buttons */}
          <div className="hidden lg:flex w-72 h-full px-4 py-2 gap-4">
            <button className="w-1/2 h-full text-sm border-2 border-solid border-secondary cursor-pointer rounded-2xl" onClick={() => navigate("/login")}>Login</button>
            <button className="w-1/2 h-full text-sm cursor-pointer rounded-2xl text-primary bg-secondary" onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
          {/* Hamburger menu (visible only on smaller screens) */}
          <div className="flex lg:hidden w-6 h-6 flex-col justify-between cursor-pointer" onClick={toggleMenu}>
            <span className="h-1 block bg-secondary rounded-sm"></span>
            <span className="h-1 block bg-secondary rounded-sm"></span>
            <span className="h-1 block bg-secondary rounded-sm"></span>
          </div>
        </div>
      </header>

      <main className="h-[90%] w-full overflow-y-auto">
        <section className="h-full w-full flex justify-between items-center p-6">
          <div className="max-w-[45%] w-1/2 h-full flex flex-col px-12 mt-10">
            <p className="text-5xl font-semibold leading-tight text-secondary mt-6">
              Spark Learning with
            </p>
            <span className="text-8xl font-bold text-secondary px-2">QUIZLAP</span>
            <span className="text-3xl font-medium mt-3 px-2 text-secondary">Where Knowledge Meets <br />Sparkle, and Anywhere.</span>

            <p className="px-1 mt-6 text-gray-500">Spark your knowledge with QUIZLAP, where learning shines 
              <br/>brighter. Whether you're a teacher crafting meaningful quizzes 
              <br/>or a student mastering new topics, our platform is designed to 
              <br/>ignite your curiosity and success.
            </p>

            <p className="px-2 mt-10 text-gray-500">Stay ahead, embrace growth, and unlock your potential—one <br></br>quiz at a time.</p>
          </div>
          <div className="max-w-[55%] h-full w-full flex justify-center items-center">
            <img src={clock} alt="clock" className="w-full h-full max-h-[90%] max-w-[90%] mr-9" />
          </div>
        </section>

        {/* "What is QUIZLAP?" section */}
        <section ref={aboutUsRef} id="about-us" className="w-full bg-white py-20">
          <div className="flex flex-col items-center text-center px-6">
            <h2 className="text-5xl font-bold text-secondary mb-6">What is QUIZLAP?</h2>
            <div className="flex justify-evenly gap-6 mr-24">
              {/* Star/Shape Image */}
              <div className="w-[35%] flex justify-center">
                <img src={starImage} alt="Star" className="w-[90%]" />
              </div>

              {/* Description */}
              <div className="max-w-2xl mx-6 mt-36 ">
                <p className="text-xl text-gray-600 leading-relaxed text-justify">
                  QUIZLAP is a dynamic and user-friendly quiz application designed to
                  transform learning and teaching into an engaging and efficient experience.
                  Inspired by the Filipino word "kislap," meaning sparkle, QUIZLAP aims to
                  ignite curiosity, enhance knowledge retention, and foster creativity in
                  education.
                </p>
              </div>
            </div>
          </div>
        </section>

                {/* Meet the Team */}
        <section ref={ourSparkRef} id="about-us" className="w-full py-20 bg-white">
          <div className="flex flex-col items-center text-center px-6">
            <h2 className="text-5xl font-bold text-secondary mb-12">Meet the Team</h2>
            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-20 max-w-5xl mx-auto">
              {/* Team Member Card */}
              {[
                { name: "Elijah Raphael M. Yasa", role: "Member", image: elijah },
                { name: "Justine James D. Medina", role: "Leader", image: jj },
                { name: "Justine Charles N. Tarre", role: "Member", image: tarre },
                { name: "Ivan Paul L. Santiago", role: "Member", image: ivan },
                { name: "Allan Iverson A. Reyes", role: "Member", image: iver },
                { name: "Cherold V. Lomaton", role: "Member", image: cherold },
              ].map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  {/* Image */}
                  <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  {/* Role */}
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


      </main>

      {/* Mobile menu */}
      <nav className={`lg:hidden ${menuActive ? 'block' : 'hidden'} flex-col bg-primary absolute top-16 right-0 w-full`}>
        <ul className="flex flex-col list-none items-center gap-8 text-secondary text-lg p-4">
          <li>
            <button onClick={scrollToTop} className="text-lg text-secondary">Home</button>
          </li>
          <li>
            <button onClick={scrollToAboutUs} className="text-lg text-secondary">About Us</button>
          </li>
          <li>
            <button onClick={scrollToOurSpark} className="text-lg text-secondary">Our Spark</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LandingPage;
