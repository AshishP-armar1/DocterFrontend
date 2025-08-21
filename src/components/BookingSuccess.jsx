import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  // ✅ Protect success page and redirect if no booking data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    // If no booking data, redirect to booking page
    if (!bookingData) {
      navigate("/booking");
    }
  }, [navigate, bookingData]);

  if (!bookingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500">No booking data found.</p>
          <Link to="/booking" className="text-blue-500 hover:underline mt-2 inline-block">
            Go back to booking
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = timeString.split(':');
    const hour12 = ((parseInt(hours) + 11) % 12) + 1;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Successful! 🎉</h1>
          <p className="text-gray-500">Your appointment has been confirmed</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Appointment Details
          </h2>

          {/* Booking ID */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Booking ID:</span>
            <span className="font-semibold text-gray-800">#{bookingData.id}</span>
          </div>

          {/* Date */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Date:</span>
            <span className="font-semibold text-gray-800">{formatDate(bookingData.date)}</span>
          </div>

          {/* Time */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Time:</span>
            <span className="font-semibold text-gray-800">{formatTime(bookingData.slot_time)}</span>
          </div>

          {/* Age */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Age:</span>
            <span className="font-semibold text-gray-800">{bookingData.age} years</span>
          </div>

          {/* Gender */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Gender:</span>
            <span className="font-semibold text-gray-800 capitalize">{bookingData.gender}</span>
          </div>

          {/* Issue Duration */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Issue Duration:</span>
            <span className="font-semibold text-gray-800">{bookingData.issue_duration}</span>
          </div>

          {/* Issue Description */}
          <div className="py-2">
            <span className="text-gray-600 font-medium block mb-2">Issue Description:</span>
            <p className="text-gray-800 bg-white p-3 rounded-lg border">{bookingData.issue}</p>
          </div>

          {/* User ID (if needed for reference) */}
          <div className="flex justify-between items-center py-2 border-t border-gray-200 pt-4">
            <span className="text-gray-600 font-medium">Patient ID:</span>
            <span className="font-semibold text-gray-800">{bookingData.user_id}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-blue-800 text-sm">
              📱 Please save this confirmation for your records. 
              You'll need your Booking ID: <strong>#{bookingData.id}</strong>
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link 
              to="/book" 
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition text-center"
            >
              Book Another Slot
            </Link>
            <Link 
              to="/" 
              className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition text-center"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess;
