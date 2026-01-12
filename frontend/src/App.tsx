import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Loign from "./pages/Loign";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-full px-4 sm:px-10 md:px-20 lg:px-30">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors/:speciality?" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/login" element={<Loign />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
