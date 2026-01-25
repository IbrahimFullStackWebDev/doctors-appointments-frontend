import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 xl:mt-50 mb-10 flex flex-col items-center gap-10">
      <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-10">
        <div className="flex flex-col items-start gap-8">
          <img src={assets.logo} alt="logo" className="w-45" />
          <p className="text-gray-700 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
            <br />
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever <br />
            since the 1500s, when an unknown printer took a galley of type and{" "}
            <br />
            scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="flex flex-col items-start gap-8">
          <p className="font-medium text-xl">COMPANY</p>
          <div className="flex flex-col items-start gap-2 text-gray-700 text-sm">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-blue-500 transition-all"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-blue-500 transition-all"
            >
              About us
            </Link>
            <p>Delivery</p>
            <p>Privacy policy</p>
          </div>
        </div>
        <div className="flex flex-col items-strat gap-8">
          <p className="font-medium text-xl">GET IN TOUCH</p>
          <div className="flex flex-col items-start gap-2 text-gray-700 text-sm">
            <a
              href="tel:+967778099847"
              className="hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-lg">📞</span> +967-778-099-847
            </a>
            <a
              href="mailto:ibrahim.fullstack.dev@gmail.com"
              className="hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-lg">✉️</span>
              ibrahim.fullstack.dev@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <hr className="w-full text-gray-300" />
        <p className="text-sm text-gray-700">
          Copyright 2024 @ FullStack.dev - All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
