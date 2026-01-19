import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import HERO_IMG from "../assets/Hero.png";
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

  // Handle CTA button (redirects to dashboard if logged in, else opens modal)
  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* ================= Header Section ================= */}
      <div className="w-screen h-auto bg-[#FFFCEF] p-5 md:p-35 md:py-5 flex flex-col gap-15">
        <header className="w-full flex justify-between items-center">
          {/* Company Logo */}
          <img
            src={LOGO}
            alt="Interview Prep AI Logo"
            className="h-16 md:h-20 w-auto object-contain"
          />

          {/* Profile card if logged in, else Login/Signup button */}
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

        {/* ================= Hero Section ================= */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-10 w-full">
          <div className="flex-col justify-start items-center md:w-1/2">
            {/* Badge */}
            <p className="text-amber-600 text-[13px] font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300 w-fit flex justify-between items-center gap-1">
              <LuSparkles />
              AI Powered
            </p>
            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-medium leading-tight mt-2">
              Master Every Interview with
              <br />
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                AI-Driven{" "}
              </span>
              Preparation
            </h1>
          </div>

          {/* Hero description & CTA */}
          <div className="flex flex-col justify-start items-start md:w-1/2">
            <p>
              Stop guessing. Start preparing smarter. Get tailored questions,
              refine your answers with AI insights, and gain the confidence to
              impress any recruiter. Everything you need to land your dream job,
              in one powerful platform.
            </p>
            <button
              className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border broder-yellow-50 hover:border-yrllow-300 transition-colors cursor-pointer mt-4"
              onClick={handleCTA}
            >
              Start Preparing Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= Hero Image ================= */}
      <div className="w-screen h-auto bg-[#FFFCEF] flex justify-center items-center md:pt-20 pt-5 pb-10">
        <div className="border-2 border-amber-200 rounded-2xl md:w-[60vw] w-[80vw] md:h-2/3 h-fit overflow-hidden">
          <img
            src={HERO_IMG}
            alt="Hero"
            className="h-auto w-auto object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* ================= Features Section ================= */}
      <div className="w-screen h-auto py-10 bg-[#FFFCEF] p-5 md:p-10 ">
        <h1 className="font-medium text-2xl text-center">
          Features That Set You Apart
        </h1>

        {/* First row of features */}
        <div className="md:px-35 pt-5 flex md:flex-row flex-col gap-2">
          {APP_FEATURES.slice(0, 3).map((feature) => (
            <div
              key={feature.id}
              className="bg-[#FFFEF8] rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100 p-6"
            >
              <h2 className="text-base font-semibold mb-3">{feature.title}</h2>
              <p className="text-gray-600 text-sm md:text-md">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Second row of features */}
        <div className="md:px-35 pt-2 flex md:flex-row flex-col gap-2">
          {APP_FEATURES.slice(3).map((feature) => (
            <div
              key={feature.id}
              className="bg-[#FFFEF8] rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100 p-6"
            >
              <h2 className="text-base font-semibold mb-3">{feature.title}</h2>
              <p className="text-gray-600 text-sm md:text-md">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Pricing Section ================= */}
      <div className="w-screen h-auto py-14 bg-[#FFFCEF] px-5 md:px-20">
        <h1 className="font-medium text-2xl text-center mb-6">
          Choose Your Plan
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Use Interview Prep AI completely free, or upgrade for exclusive
          features when you're ready.
        </p>

        {/* Plans */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* Free Plan */}
          <div className="bg-[#FFFEF8] border border-amber-200 rounded-2xl shadow-md hover:shadow-lg transition w-full md:w-1/3 p-6 text-center">
            <h2 className="text-xl font-semibold mb-3 text-amber-700">Free</h2>
            <p className="text-gray-600 mb-4">Get started with all basics:</p>
            <ul className="text-gray-700 text-sm mb-6 space-y-2">
              <li>✔ Role-specific questions</li>
              <li>✔ Basic answer guidance</li>
              <li>✔ Save progress</li>
            </ul>
            <button
              onClick={handleCTA}
              className="bg-black text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-100 hover:text-black transition"
            >
              Start Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#FFF8ED] border-2 border-amber-400 rounded-2xl shadow-lg hover:shadow-xl transition w-full md:w-1/3 p-6 text-center">
            <h2 className="text-xl font-semibold mb-3 text-amber-800">Pro</h2>
            <p className="text-gray-600 mb-4">Unlock your full potential:</p>
            <ul className="text-gray-700 text-sm mb-6 space-y-2">
              <li>✨ AI-generated mock interviews</li>
              <li>✨ Deep-dive feedback & insights</li>
              <li>✨ Priority support & updates</li>
            </ul>
            <button
              onClick={handleCTA}
              className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-white font-semibold px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      {/* ================= Footer Section ================= */}
      <footer className="bg-[#FFFCEF] py-10 px-6 md:px-20 border-t border-amber-200">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div>
            <img
              src={LOGO}
              alt="Interview Prep AI Logo"
              className="h-14 w-auto mb-3"
            />
            <h2 className="font-semibold text-lg">Interview Prep AI</h2>
            <p className="text-gray-600 mt-2">
              Empowering candidates to ace interviews with AI-driven insights
              and personalized preparation tools.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
            <p className="text-gray-600">📍 Jakarta, Indonesia</p>
            <p className="text-gray-600">
              📧 Email:{" "}
              <a
                href="mailto:support@interviewprep.ai"
                className="text-amber-600 hover:underline"
              >
                support@interviewprep.ai
              </a>
            </p>
            <p className="text-gray-600">
              💬 WhatsApp:{" "}
              <a
                href="https://wa.me/6285210598287"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline"
              >
                +62 852-1059-8287
              </a>
            </p>
          </div>

          {/* Embedded Map */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Our Location</h3>
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.1234567890!2d106.845599!3d-6.208763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e123456789%3A0xabcdef123456789!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1694000000000!5m2!1sen!2sid"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center text-gray-600 text-sm mt-8 border-t border-amber-200 pt-4">
          © {new Date().getFullYear()} Interview Prep AI — All Rights Reserved.
        </div>
      </footer>

      {/* ================= Auth Modal ================= */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false); // closes the modal
          setCurrentPage("login"); // resets modal to show login next time it's opened
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
}

export default LandingPage;
