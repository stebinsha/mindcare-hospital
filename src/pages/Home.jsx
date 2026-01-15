import { Search, Users, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5f2] via-white to-[#e6f4f7]">
 
      <section className="px-10 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Compassionate Mental Healthcare
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Book confidential sessions with licensed psychiatrists, psychologists,
          and wellness specialists — anytime, anywhere.
        </p>

        <div className="flex items-center max-w-xl mx-auto bg-white shadow-md rounded-full px-5 py-3">
          <Search className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search doctors, specialties..."
            className="flex-1 outline-none text-gray-600"
          />
        </div>
      </section>

  
      <section className="px-10 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">

     
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
          <Users className="text-[#5faea0] w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Find Experts</h3>
          <p className="text-gray-600 mb-4">
            Browse verified psychiatrists and psychologists by specialty,
            experience, and availability.
          </p>
          <button
            onClick={() => navigate("/experts")}
            className="flex items-center gap-2 text-[#3a7f73] font-medium"
          >
            Explore Experts <ArrowRight size={18} />
          </button>
        </div>

        
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
          <Calendar className="text-[#4fa3b6] w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Book Appointment
          </h3>
          <p className="text-gray-600 mb-4">
            Choose consultation type, date, and time slot with a smooth,
            step-by-step booking experience.
          </p>
          <button
            onClick={() => navigate("/experts")}
            className="flex items-center gap-2 text-[#3a7f73] font-medium"
          >
            Start Booking <ArrowRight size={18} />
          </button>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
          <ShieldCheck className="text-[#3f8f9f] w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Admin Panel
          </h3>
          <p className="text-gray-600 mb-4">
            Secure dashboard for managing doctors, availability, and platform
            visibility.
          </p>
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 text-[#3a7f73] font-medium"
          >
            Go to Admin <ArrowRight size={18} />
          </button>
        </div>

      </section>
    
    </div>
  );
}
