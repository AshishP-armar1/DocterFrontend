import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BookingForm() {
  const [formData, setFormData] = useState({
    date: "",
    slot_time: "",
    issue: "",
    age: "",
    gender: "male",
    issue_duration: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // ✅ Protect booking page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // ✅ If date changes, fetch available slots
    if (name === "date") {
      fetchSlots(value);
    }
  };

  const fetchSlots = async (date) => {
    if (!date) return;
    setLoadingSlots(true);
    setErrorMsg("");
    setAvailableSlots([]);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://dockterbackend.onrender.com/slots/view/${date}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Failed to fetch slots.");
      }

      const data = await response.json();
      console.log("Slots API Response:", data);

      // ✅ Filter unbooked slots only
      const unbooked = Object.entries(data.slots)
        .filter(([time, status]) => status === "unbooked")
        .map(([time]) => time);

      setAvailableSlots(unbooked);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setErrorMsg(error.message || "Error loading slots.");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.age < 1) {
      setErrorMsg("Age must be greater than 0.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://dockterbackend.onrender.com/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Booking failed");
      }

      console.log("Booking success:", data);

      // ✅ Navigate to success page with booking data
      navigate("/booking-success", { 
        state: { bookingData: data } 
      });

    } catch (error) {
      console.error("Booking error:", error);
      setErrorMsg(error.message || "Booking failed.");
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600">Book a Slot 📅</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Select your date, time, and details to confirm booking
          </p>
        </div>

        {/* Error / Success Message */}
        {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
        {successMsg && (
          <p className="text-green-600 text-sm text-center">{successMsg}</p>
        )}

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Slot */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Slot
          </label>
          <select
            name="slot_time"
            value={formData.slot_time}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            disabled={loadingSlots || availableSlots.length === 0}
          >
            <option value="">
              {loadingSlots ? "Loading slots..." : "Select Slot"}
            </option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            min="1"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Issue */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Issue
          </label>
          <textarea
            name="issue"
            placeholder="Describe your issue"
            value={formData.issue}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="3"
            required
          />
        </div>

        {/* Issue Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Issue Duration (in days)
          </label>
          <input
            type="text"
            name="issue_duration"
            placeholder="e.g. 5 days"
            value={formData.issue_duration}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingForm;