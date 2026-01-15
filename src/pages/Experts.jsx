import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Stethoscope } from "lucide-react";

export default function Experts() {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); 
  const navigate = useNavigate();

  const options = ["Psychologist", "Psychiatrist", "Therapist"];
 
  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem("doctors"));
    setExperts(storedDoctors || []);
  }, []);

  const filteredExperts = experts.filter(
    (exp) =>
      exp.name.toLowerCase().includes(search.toLowerCase()) &&
      (specialty ? exp.specialty === specialty : true)
  );

  const visibleExperts = filteredExperts.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef7f5] via-white to-[#e8f5f2]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
 
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Meet Our Experts</h1>
          <p className="text-gray-600 mt-3 max-w-2xl leading-relaxed">
            Browse trusted psychiatrists, psychologists, and therapists committed
            to providing compassionate mental healthcare.
          </p>
        </div>

     
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-5 items-center">

          <div className="relative w-full md:w-2/3">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by expert name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8dc4b6] transition"
            />
          </div>

          <div className="relative w-full md:w-1/3">
            <Stethoscope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 cursor-pointer flex justify-between items-center focus:ring-2 focus:ring-[#8dc4b6] transition"
            >
              {specialty || "All Specialties"}
              <span className="text-gray-400">▼</span>
            </div>

            {dropdownOpen && (
              <ul className="absolute z-10 w-full mt-1 bg-[#f1fdfb] rounded-xl shadow-lg max-h-60 overflow-auto">
                {options.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => { setSpecialty(opt); setDropdownOpen(false); }}
                    className="px-4 py-3 cursor-pointer hover:bg-[#d1f0e5] transition"
                  >
                    {opt}
                  </li>
                ))}
                <li
                  onClick={() => { setSpecialty(""); setDropdownOpen(false); }}
                  className="px-4 py-3 cursor-pointer hover:bg-[#d1f0e5] transition"
                >
                  All Specialties
                </li>
              </ul>
            )}
          </div>
        </div>

        
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleExperts.length > 0 ? (
            visibleExperts.map((expert) => (
              <div
                key={expert.id}
                onClick={() => navigate(`/experts/${expert.id}`)}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{expert.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${expert.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                  >
                    {expert.available ? "Available" : "Not Available"}
                  </span>
                </div>

                <p className="text-[#3a7f73] font-medium">{expert.specialty}</p>
                <p className="text-gray-500 mt-2">{expert.experience} years experience</p>
                <p className="text-gray-600 mt-3 text-sm line-clamp-3">{expert.bio}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {expert.consultation.map((mode) => (
                    <span key={mode} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No experts found matching your search.
            </p>
          )}
        </div>

        {visibleCount < filteredExperts.length && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-[#8dc4b6] text-white rounded-xl font-medium hover:opacity-80 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
