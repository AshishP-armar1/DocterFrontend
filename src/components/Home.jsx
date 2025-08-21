import React from "react";
import { Calendar, Stethoscope, Clock, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  const features = [
    {
      icon: <Calendar className="w-10 h-10 text-indigo-600" />,
      title: "Easy Appointment Booking",
      description:
        "Schedule your appointments with just a few clicks. Choose your doctor and book instantly.",
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-green-600" />,
      title: "Qualified Doctors",
      description:
        "Connect with certified and experienced doctors for reliable healthcare services.",
    },
    {
      icon: <Clock className="w-10 h-10 text-yellow-600" />,
      title: "Flexible Timings",
      description:
        "Pick a time that suits you best. No more long waiting queues in hospitals.",
    },
    {
      icon: <UserPlus className="w-10 h-10 text-red-600" />,
      title: "Patient-Friendly System",
      description:
        "A smooth and user-friendly interface designed for all patients, young and old.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Doctor Appointment System
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Book your doctor's appointment anytime, anywhere. A simple, fast, and
          secure way to connect with healthcare professionals.
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition">
            
            <Link
            to="/book"
            
          >
            Book Appointment
          </Link>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            About Our System
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our Doctor Appointment System makes healthcare accessible and
            hassle-free. With a few clicks, you can book appointments, manage
            schedules, and consult with doctors at your convenience. We aim to
            bridge the gap between patients and doctors with technology.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;