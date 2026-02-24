import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import HERO_IMG from "../assets/hero.png"; // ✅ FIXED (case-sensitive)
import LOGO from "../assets/logo.png";

import { APP_FEATURES } from "../utils/data";
import Modal from "../Components/Modal";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import { UserContext } from "../Context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

function LandingPage() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="w-screen h-auto bg-[#FFFCEF] p-5 md:p-35 md:py-5 flex flex-col gap-15">
        <header className="w-full flex justify-between items-center">
          <img
            src={LOGO}
            alt="Interview Prep AI Logo"
            className="h-16 md:h-20 w-auto object-contain"
          />

          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-3 py-2 md:px-7 md:py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Text */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-10 w-full">
          <div className="flex-col justify-start items-center md:w-1/2">
            <p className="text-amber-600 text-[13px] font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300 w-fit flex items-center gap-1">
              <LuSparkles />
              AI Powered
            </p>

            <h1 className="text-3xl md:text-5xl font-medium leading-tight mt-2">
              Master Every Interview with
              <br />
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                AI-Driven{" "}
              </span>
              Preparation
            </h1>
          </div>

          <div className="flex flex-col justify-start items-start md:w-1/2">
            <p>
              Stop guessing. Start preparing smarter. Get tailored questions,
              refine your answers with AI insights, and gain the confidence to
              impress any recruiter.
            </p>

            <button
              className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border transition-colors cursor-pointer mt-4"
              onClick={handleCTA}
            >
              Start Preparing Now
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-screen h-auto bg-[#FFFCEF] flex justify-center items-center md:pt-20 pt-5 pb-10">
        <div className="border-2 border-amber-200 rounded-2xl md:w-[60vw] w-[80vw] overflow-hidden">
          <img
            src={HERO_IMG}
            alt="Hero"
            className="h-auto w-auto object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Features */}
      <div className="w-screen h-auto py-10 bg-[#FFFCEF] p-5 md:p-10">
        <h1 className="font-medium text-2xl text-center">
          Features That Set You Apart
        </h1>

        <div className="md:px-35 pt-5 flex md:flex-row flex-col gap-2">
          {APP_FEATURES.slice(0, 3).map((feature) => (
            <div
              key={feature.id}
              className="bg-[#FFFEF8] rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100 p-6"
            >
              <h2 className="text-base font-semibold mb-3">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-sm md:text-md">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="md:px-35 pt-2 flex md:flex-row flex-col gap-2">
          {APP_FEATURES.slice(3).map((feature) => (
            <div
              key={feature.id}
              className="bg-[#FFFEF8] rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100 p-6"
            >
              <h2 className="text-base font-semibold mb-3">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-sm md:text-md">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" && (
          <Login setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "signup" && (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </Modal>
    </>
  );
}

export default LandingPage;