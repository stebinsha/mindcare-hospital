import { useParams, useNavigate } from "react-router-dom";
import { experts } from "../data/expertsData";
import { Calendar, Languages, Video, MapPin, BadgeCheck, Clock } from "lucide-react";

export default function ExpertProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const expert = experts.find((e) => e.id === parseInt(id));

  if (!expert) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        Expert not found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf6f3] via-white to-[#e3f3f7] relative">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl overflow-hidden">

          
          <div className="relative p-12 bg-gradient-to-r from-[#8dc4b6] to-[#5faea0] text-white">
            <div className="flex flex-col lg:flex-row gap-10 items-center">

            
              <img
                src={expert.image || "https://via.placeholder.com/150"}
                alt={expert.name}
                className="w-48 h-48 rounded-full object-cover ring-4 ring-white shadow-xl"
              />

             
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold drop-shadow-md">{expert.name}</h1>
                  <BadgeCheck className="text-white" />
                </div>

                <p className="text-lg font-medium opacity-90 mt-1">{expert.specialty}</p>

                <div className="flex flex-wrap items-center gap-6 mt-4 text-sm opacity-90">
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {expert.experience}+ years experience
                  </span>

                  <span
                    className={`px-4 py-1 rounded-full font-semibold ${
                      expert.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {expert.available ? "Available Now" : "Not Available"}
                  </span>
                </div>

                 
                <button
                  onClick={() => {
                    if (expert.available) navigate(`/booking/${expert.id}`, { state: { expert } });
                  }}
                  disabled={!expert.available}
                  className={`mt-6 inline-flex items-center gap-3 px-12 py-4 rounded-full text-lg font-semibold shadow-lg transition
                    ${expert.available 
                      ? "bg-[#3a7f73] text-white hover:scale-105" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"}`
                  }
                >
                  <Calendar size={20} />
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
 
          <div className="p-12 space-y-12">
           
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Doctor</h2>
              <p className="text-gray-600 leading-relaxed text-lg max-w-4xl">{expert.bio}</p>
            </section>

            
            <div className="grid md:grid-cols-2 gap-10">
             
              <div className="bg-[#e0f3f2] rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Languages size={22} /> Languages Spoken
                </h3>
                <div className="flex flex-wrap gap-3">
                  {expert.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-5 py-2 rounded-full bg-white text-[#2f6f64] font-medium text-sm shadow"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

            
              <div className="bg-[#e4f1fa] rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Consultation Modes</h3>
                <div className="flex flex-wrap gap-4">
                  {expert.consultation.includes("Online") && (
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-teal-100 text-teal-800 font-medium">
                      <Video size={18} /> Online Consultation
                    </div>
                  )}
                  {expert.consultation.includes("In-Person") && (
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-blue-100 text-blue-800 font-medium">
                      <MapPin size={18} /> In-Person Visit
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <button
        onClick={() => {
          if (expert.available) navigate(`/booking/${expert.id}`, { state: { expert } });
        }}
        disabled={!expert.available}
        className={`fixed bottom-6 right-8 flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold shadow-xl transition
          ${expert.available
            ? "bg-[#8dc4b6] text-white hover:scale-105"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`
        }
      >
        <Calendar size={18} /> Book Now
      </button>
    </div>
  );
}
