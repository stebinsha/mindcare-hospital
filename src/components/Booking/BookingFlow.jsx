import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Clock, Video, MapPin, CheckCircle, X } from "lucide-react";

export default function BookingFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { expert } = location.state;

  const [step, setStep] = useState(1);
  const [consultation, setConsultation] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [patient, setPatient] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const slots = [
    "09:00 AM - 10:00 AM",
    "10:30 AM - 11:30 AM",
    "12:00 PM - 01:00 PM",
    "03:00 PM - 04:00 PM"
  ];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const minDate = formatDate(tomorrow);

  const handleNext = () => {
    setError("");
    if (step === 1 && !consultation) return setError("Please select a consultation type.");
    if (step === 2 && (!date || !timeSlot)) return setError("Please select date and time.");
   if (step === 3) {
  const name = patient.name?.trim();
  const email = patient.email?.trim();

  if (!name || !email) {
    setError("Name and email are required");
    return;
  }

 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Please enter a valid email address");
    return;
  }
}

    setStep(step + 1);
  };

  const handleBack = () => { setError(""); if (step>1) setStep(step-1); };
const handleSubmit = () => {
  setError("");

  const name = patient.name.trim();
  const email = patient.email.trim();

  if (!name || !email) {
    return setError("Name and email are required.");
  }
 
if (email.length < 6) {
  return setError("Email must be at least 6 characters long.");
}
 
if (!email.includes("@")) {
  return setError("Email must contain '@' symbol.");
}

if (email.split("@").length !== 2) {
  return setError("Email must contain only one '@' symbol.");
}
 
const [username, domain] = email.split("@");
if (username.length < 2) {
  return setError("Email name must have at least 2 characters before '@'.");
}
 
if (!domain || domain.length === 0) {
  return setError("Email domain is required (example: gmail.com).");
}

if (!domain.includes(".")) {
  return setError("Email domain must contain a '.' (example: gmail.com).");
}
 
const extension = domain.split(".").pop();
if (extension.length < 2) {
  return setError("Email domain extension must be at least 2 characters.");
}
 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return setError("Please enter a valid email address.");
}
if (!date || !timeSlot) {
  return setError("Please complete all fields before confirming.");
}

setShowModal(true);
};


  const confirmBooking = () => {
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      setShowModal(false);
      setStep(4);
    }, 1000);
  };

  const handleHomeRedirect = () => navigate("/");

  return (
    <div className="min-h-screen bg-[#f0f6f5] flex justify-center py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full p-10 md:p-16 border border-gray-100 relative">
     
        {showModal && (
          <div className="absolute inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center p-6 rounded-3xl">
            <div className="max-w-md w-full transform transition-all">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200">
                
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">Confirm Appointment</h3>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                  >
                    <X size={24} />
                  </button>
                </div>

              
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-700 mb-3">Appointment Summary</h4>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="font-medium">Doctor:</span> {expert.name}</p>
                      <p><span className="font-medium">Date:</span> {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p><span className="font-medium">Time:</span> {timeSlot}</p>
                      <p><span className="font-medium">Consultation:</span> {consultation}</p>
                      <p><span className="font-medium">Patient:</span> {patient.name}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-700 text-sm">
                      <strong>Note:</strong> A confirmation email will be sent to {patient.email}. Please arrive 10 minutes before your scheduled time.
                    </p>
                  </div>
                </div>

         
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmBooking}
                    disabled={loading}
                    className={`px-6 py-2.5 bg-gradient-to-r from-[#8dc4b6] to-[#5faea0] text-white rounded-xl hover:scale-105 transition flex items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : "Confirm & Book"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

       
        <div className={`${showModal ? "filter blur-sm pointer-events-none" : ""}`}>
    
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 p-6 bg-gradient-to-r from-[#e6f4f2] to-[#f0faf9] rounded-2xl shadow-lg border border-gray-200">
            <img src={expert.image} alt={expert.name} className="w-28 h-28 rounded-full object-cover ring-2 ring-[#8dc4b6]" />
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{expert.name}</h1>
              <p className="text-gray-600 text-lg mt-1">{expert.specialty}</p>
              <div className="flex items-center gap-4 mt-3 text-gray-500">
                <Clock size={16} /> <span>{expert.experience}+ yrs experience</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="bg-[#8dc4b6] text-white text-sm px-3 py-1 rounded-full shadow-sm">Top Rated</span>
                <span className="bg-[#5faea0] text-white text-sm px-3 py-1 rounded-full shadow-sm">Verified</span>
              </div>
            </div>
          </div>

    
          <div className="flex items-center justify-between mb-12 relative">
            {["Consultation Type","Appointment Schedule","Patient Information","Confirmation"].map((label,index)=>(
              <div key={index} className="flex-1 flex flex-col items-center relative text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg z-10 ${step>index?"bg-[#8dc4b6]":step===index+1?"bg-[#5faea0]":"bg-gray-300"}`}>{index+1}</div>
                <p className="mt-2 text-xs md:text-sm font-medium">{label}</p>
                {index<3 && <div className={`absolute top-5 left-1/2 w-full h-1 -z-0 ${step>index+1?"bg-[#8dc4b6]":"bg-gray-300"}`}></div>}
              </div>
            ))}
          </div>

         
          <div className="mb-6">
          
            {step===1 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Consultation Type</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <button onClick={()=>setConsultation("Online")} className={`flex-1 flex items-center justify-center gap-3 px-6 py-6 border rounded-2xl shadow-md hover:scale-105 transition ${consultation==="Online"?"bg-teal-100 border-teal-400":"bg-white border-gray-200"}`}><Video size={24}/> Online</button>
                  <button onClick={()=>setConsultation("In-Person")} className={`flex-1 flex items-center justify-center gap-3 px-6 py-6 border rounded-2xl shadow-md hover:scale-105 transition ${consultation==="In-Person"?"bg-blue-100 border-blue-400":"bg-white border-gray-200"}`}><MapPin size={24}/> In-Person</button>
                </div>
              </div>
            )}

       
            {step===2 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Schedule Your Appointment</h2>
                <input type="date" value={date} min={minDate} onChange={(e)=>setDate(e.target.value)} className="w-full mb-6 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#8dc4b6] text-gray-700 shadow-sm" />
                <div className="grid md:grid-cols-2 gap-4">
                  {slots.map(slot=>(
                    <button key={slot} onClick={()=>setTimeSlot(slot)} className={`px-4 py-4 border rounded-xl hover:scale-105 transition shadow ${timeSlot===slot?"bg-[#8dc4b6] text-white":"bg-white border-gray-200 text-gray-700"}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
 
            {step===3 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Patient Information</h2>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Full Name" value={patient.name} onChange={(e)=>setPatient({...patient,name:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#8dc4b6] shadow-sm" />
                  <input type="email" placeholder="Email" value={patient.email} onChange={(e)=>setPatient({...patient,email:e.target.value})} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#8dc4b6] shadow-sm" />
                </div>
              </div>
            )}

        
            {step===4 && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-[#8dc4b6] to-[#5faea0] mx-auto mb-6 shadow-lg animate-pulse">
                  <CheckCircle className="text-white w-16 h-16" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">Appointment Confirmed!</h2>
                <p className="text-gray-600 text-lg mb-8">Your appointment with <span className="font-semibold">{expert.name}</span> is successfully booked.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="bg-[#e0f3f2] rounded-2xl p-6 shadow-lg border-l-4 border-[#5faea0] hover:scale-105 transition transform">
                    <h3 className="text-xl font-semibold mb-4">Doctor Details</h3>
                    <p className="text-gray-700 mb-2"><strong>Name:</strong> {expert.name}</p>
                    <p className="text-gray-700 mb-2"><strong>Specialty:</strong> {expert.specialty}</p>
                    <p className="text-gray-700"><strong>Experience:</strong> {expert.experience}+ yrs</p>
                  </div>
                  <div className="bg-[#f4f9fd] rounded-2xl p-6 shadow-lg border-l-4 border-[#8dc4b6] hover:scale-105 transition transform">
                    <h3 className="text-xl font-semibold mb-4">Appointment Details</h3>
                    <p className="text-gray-700 mb-2"><strong>Consultation:</strong> {consultation}</p>
                    <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-2"><strong>Time Slot:</strong> {timeSlot}</p>
                    <p className="text-gray-700 mb-2"><strong>Patient Name:</strong> {patient.name}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {patient.email}</p>
                  </div>
                </div>

                <button 
                  className="mt-10 px-12 py-4 bg-gradient-to-r from-[#8dc4b6] to-[#5faea0] text-white font-semibold rounded-2xl shadow-xl hover:scale-105 transition transform text-lg"
                  onClick={handleHomeRedirect}
                >
                  Back to Home
                </button>
              </div>
            )}

            {error && <p className="text-red-600 mt-4">{error}</p>}
          </div>

           
          <div className="flex justify-between mt-6">
            {step>1 && step<4 && <button onClick={handleBack} className="px-6 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition shadow-md">Back</button>}
            {step<3 && <button onClick={handleNext} className="ml-auto px-6 py-3 bg-gradient-to-r from-[#8dc4b6] to-[#5faea0] text-white rounded-xl hover:scale-105 transition shadow-md">Next</button>}
            {step===3 && <button onClick={handleSubmit} disabled={loading} className={`ml-auto px-6 py-3 bg-gradient-to-r from-[#8dc4b6] to-[#5faea0] text-white rounded-xl hover:scale-105 transition flex items-center gap-2 shadow-md ${loading?"opacity-70 cursor-not-allowed":""}`}>{loading?"Booking...":"Confirm Booking"}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}