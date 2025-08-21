import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterForm from "./components/Register"; 
import LoginForm from "./components/LoginForm";   // you can create similar to Register
import BookingForm from "./components/BookingForm"; // your booking page
import "./App.css"
import Home  from "./components/Home";
import BookingSuccess from "./components/BookingSuccess";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        {/* Page Content */}
        <main className="flex-grow container mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/book" element={<BookingForm />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
