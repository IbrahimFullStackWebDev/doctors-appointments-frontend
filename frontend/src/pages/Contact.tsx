import { useState } from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  const [showGoogleMap, setShowGoogleMap] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col items-center gap-10 justify-center mt-10">
      <h1 className="text-2xl text-gray-500">
        CONTACT <span className="text-gray-700 font-medium">US</span>
      </h1>
      {/* Container for Map*/}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
        {/* Right Side */}
        <img
          src={assets.contact_image}
          className="w-full sm:max-w-[360px]"
          alt="contact image"
        />
        {/* Left Side */}
        <div className="flex w-full flex-col items-start gap-6">
          <p className="font-bold text-xl text-gray-700">OPERATIONS</p>

          <div className="flex flex-col items-start text-sm text-gray-700">
            <p>Remote Hub - Sana'a, Yemen</p>
            <p>Global Healthcare Solutions Team</p>
            <p
              className="underline cursor-pointer mt-2 hover:text-blue-500 transition-all"
              onClick={() => setShowGoogleMap((prev) => !prev)}
            >
              {showGoogleMap
                ? "Close The Map"
                : "See our Station on Google Map"}
            </p>
          </div>
          <div className="flex flex-col items-start text-sm text-gray-700">
            <a
              href="tel:+967778099847"
              className="hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-lg">📞</span>Tel: +967-778-099-847
            </a>
            <a
              href="mailto:ibrahim.fullstack.dev@gmail.com"
              className="hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-lg">✉️</span>
              Email: ibrahim.fullstack.dev@gmail.com
            </a>
          </div>
          <p className="font-bold text-xl text-gray-700">
            CAREERS AT PRESCRIPTO
          </p>
          <p className="text-sm text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="px-6 py-4 border hover:bg-black hover:text-white cursor-pointer transition-all duration-300">
            Contact the Developer
          </button>
        </div>
      </div>
      {showGoogleMap && (
        <div className="w-full mt-20 overflow-hidden rounded-xl shadow-inner border border-gray-200">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246200.32001064744!2d44.04646724322204!3d15.382983921495974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1603dbd54684f731%3A0xa46b957a1482ac73!2sSanaa%2C%20Yemen!5e0!3m2!1sen!2s!4v1769325785622!5m2!1sen!2sD"
            className="w-full h-[400px] border-0 grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Contact;
