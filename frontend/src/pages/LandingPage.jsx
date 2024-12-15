import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import hero from "../assets/landingpage/hero.png";
import logo from "../assets/quizlapLogo.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  // Toggle the nav menu when the hamburger icon is clicked
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="w-full h-screen bg-primary">
      <header className="w-full h-16 px-8">
        <div className="h-full relative flex justify-between items-center px-4 py-1">
          <div className="h-full w-48 flex justify-center">
            <img className="w-full h-full" src={logo} alt="logo" />
          </div>
          {/* Main menu */}
          <nav className="hidden lg:flex">
            <ul className="flex list-none gap-12 text-secondary text-base">
              <Link to="/" className="text-lg text-secondary">Home</Link>
              <Link to="/" className="text-lg text-secondary">Courses</Link>
              <Link to="/" className="text-lg text-secondary">Services</Link>
              <Link to="/" className="text-lg text-secondary">About Us</Link>
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
          <div className="max-w-[50%] h-full flex flex-col px-8 gap-1 mt-8">
            <h2 className="text-5xl font-bold leading-tight">
              Learn a <span className="text-yellow-200 underline">New Skill</span>
              <br />
              Everyday, Anytime,<br />and Anywhere.
            </h2>
            <p className="my-5 text-lg text-secondary">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita tenetur praesentium earum in laborum labore maiores blanditiis sunt repellendus, pariatur quibusdam nam est inventore ducimus omnis libero, distinctio repudiandae optio?
            </p>
            <div className="flex gap-8">
              <button className="px-12 py-2 border-none rounded-3xl text-base cursor-pointer text-primary bg-secondary">Start Trial</button>
              <button className="px-8 py-2 border-2 border-solid border-secondary rounded-3xl text-base cursor-pointer text-secondary bg-transparent">How it Works</button>
            </div>
            <div className="flex gap-20 mt-16">
              <div className="text-center">
                <h3 className="text-2xl text-secondary">1000+</h3>
                <p className="text-secondary">Courses to <br />choose from</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl text-secondary">5000+</h3>
                <p className="text-secondary">Students <br />Trained</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl text-secondary">200+</h3>
                <p className="text-secondary">Professional <br />Trainers</p>
              </div>
            </div>
          </div>
          <div className="max-w-[50%] h-full flex justify-center">
            <img src={hero} alt="Student holding laptop" className="w-full max-h-[90%] h-auto" />
          </div>
        </section>
      </main>

      {/* Mobile menu */}
      <nav className={`lg:hidden ${menuActive ? 'block' : 'hidden'} flex-col bg-primary absolute top-16 right-0 w-full`}>
        <ul className="flex flex-col list-none items-center gap-8 text-secondary text-lg p-4">
          <Link to="/" className="text-lg text-secondary">Home</Link>
          <Link to="/" className="text-lg text-secondary">Courses</Link>
          <Link to="/" className="text-lg text-secondary">Services</Link>
          <Link to="/" className="text-lg text-secondary">About Us</Link>
        </ul>
      </nav>
    </div>
  );
};

export default LandingPage;
