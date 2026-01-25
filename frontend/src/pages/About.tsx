import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="w-full flex flex-col items-center gap-15 mt-15">
      <h1 className="text-2xl text-gray-500">
        ABOUT <span className="text-gray-900">US</span>
      </h1>
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Right Side */}
        <img
          src={assets.about_image}
          className="w-full md:max-w-[360px]"
          alt="about image"
        />
        <div className="flex flex-col items-start gap-8">
          <p className="text-gray-700 text-sm max-w-2/3">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-gray-700 text-sm max-w-2/3">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <p className="text-gray-900 font-medium">Our Vision</p>
          <p className="text-gray-700 text-sm max-w-2/3">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10">
        <p className="text-2xl text-gray-700">
          WHY <span className="text-gray-900 font-medium">CHOOSE US</span>
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center mb-20">
          <div className="flex w-full flex-col items-start gap-4 border border-gray-300 text-gray-700 p-10 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-500">
            <p className="text-lg font-medium">EFFICIENCY:</p>
            <p className="text-sm">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-4 border border-gray-300 cursor-pointer p-10 hover:bg-blue-500 hover:text-white transition-all duration-500">
            <p className="text-lg font-medium">CONVENIENCE:</p>
            <p className="text-sm">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-4 border border-gray-300 cursor-pointer p-10 hover:bg-blue-500 hover:text-white transition-all duration-500">
            <p className="text-lg font-medium">PERSONALIZATION:</p>
            <p className="text-sm">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
