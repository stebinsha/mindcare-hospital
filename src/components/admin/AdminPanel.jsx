import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, LogOut, Users,
  ArrowUpDown, Search, Plus, Edit, Trash2
} from "lucide-react";
import { expertsData as initialExperts } from "../../data/expertsData";

const users = [
  {
    username: import.meta.env.VITE_ADMIN_USERNAME ?? "admin",
    password: import.meta.env.VITE_ADMIN_PASSWORD ?? "admin123",
    role: "admin",
  },
  {
    username: import.meta.env.VITE_VIEWER_USERNAME ?? "viewer",
    password: import.meta.env.VITE_VIEWER_PASSWORD ?? "viewer123",
    role: "viewer",
  },
];

export default function AdminPanel() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loginError, setLoginError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialty: "",
    experience: "",
    image: "",
    available: true
  });

  useEffect(() => {
    const savedDoctors = JSON.parse(localStorage.getItem("doctors"));
    setDoctors(savedDoctors?.length ? savedDoctors : initialExperts);
  }, []);

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const user = users.find(
      (u) => u.username === loginForm.username && u.password === loginForm.password
    );

    if (!user) return setLoginError("Invalid username or password");

    if (user.role === "viewer") {
      navigate("/viewer");
      return;
    }

    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (!sortConfig.key) return 0;
    return sortConfig.direction === "asc"
      ? a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      : a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    });
  };

  const openAddDoctor = () => {
    setDoctorForm({ name: "", specialty: "", experience: "", image: "", available: true });
    setEditDoctor(null);
    setShowModal(true);
  };

  const openEditDoctor = (doctor) => {
    setDoctorForm({ ...doctor });
    setEditDoctor(doctor);
    setShowModal(true);
  };

  const handleDoctorFormSubmit = (e) => {
    e.preventDefault();
    if (editDoctor) {
      setDoctors((prev) =>
        prev.map((d) => (d.id === editDoctor.id ? doctorForm : d))
      );
    } else {
      const newId = doctors.length ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
      const newDoctor = { ...doctorForm, id: newId };
      setDoctors((prev) => [...prev, newDoctor]);
    }
    setShowModal(false);
  };

  const toggleDoctorStatus = (id) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, available: !d.available } : d
      )
    );
  };

  const deleteDoctor = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    }
  };

  if (!isLoggedIn || currentUser?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5f2] via-white to-[#e6f4f7] px-4">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <Shield className="mx-auto w-14 h-14 text-blue-600 mb-2" /> Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              placeholder="Username"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
            {loginError && <p className="text-red-600">{loginError}</p>}
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Login
            </button>
          </form>
          <button onClick={() => navigate("/")} className="mt-4 w-full border py-2 rounded-xl hover:bg-gray-100 transition">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="text-blue-600" /> Admin Dashboard
        </h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-red-600">
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 sm:p-6 max-w-7xl mx-auto mt-4">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow flex items-center gap-4 hover:shadow-lg transition">
          <Users className="text-teal-600 w-10 h-10 sm:w-12 sm:h-12" />
          <div>
            <p className="text-gray-500 uppercase text-sm">Doctors</p>
            <h2 className="text-2xl sm:text-3xl font-bold">{doctors.length}</h2>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute top-3 left-3 text-gray-400" />
            <input
              placeholder="Search doctors..."
              className="w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-teal-300 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2">
            <button onClick={() => handleSort("name")} className="flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-xl hover:bg-gray-100 transition text-sm sm:text-base">
              Sort <ArrowUpDown size={16} />
            </button>
            <button onClick={openAddDoctor} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-sm sm:text-base">
              <Plus size={16} /> Add Doctor
            </button>
          </div>
        </div>

        {/* Responsive Doctor Cards for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {sortedDoctors.map(d => (
            <div key={d.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={d.image || "https://via.placeholder.com/50"} alt={d.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{d.name}</p>
                  <p className="text-gray-500 text-sm">{d.specialty}</p>
                  <p className="text-gray-500 text-sm">{d.experience} yrs</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer ${d.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  onClick={() => toggleDoctorStatus(d.id)}
                >
                  {d.available ? "Available" : "Not Available"}
                </span>
                <button onClick={() => openEditDoctor(d)} className="flex items-center gap-1 px-3 py-1 bg-yellow-200 text-yellow-800 font-semibold rounded-full hover:bg-yellow-300 transition">
                  <Edit size={16} /> Edit
                </button>
                <button onClick={() => deleteDoctor(d.id)} className="flex items-center gap-1 px-3 py-1 bg-red-200 text-red-800 font-semibold rounded-full hover:bg-red-300 transition">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 sm:p-0">
          <div className="bg-white p-4 sm:p-6 rounded-2xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">{editDoctor ? "Edit Doctor" : "Add New Doctor"}</h2>
            <form className="space-y-3" onSubmit={handleDoctorFormSubmit}>
              <input placeholder="Doctor Name" className="w-full p-3 border rounded-xl" value={doctorForm.name} onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} required />
              <input placeholder="Specialty" className="w-full p-3 border rounded-xl" value={doctorForm.specialty} onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })} required />
              <input type="number" placeholder="Experience (years)" className="w-full p-3 border rounded-xl" value={doctorForm.experience} onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })} required />
              <input placeholder="Image URL" className="w-full p-3 border rounded-xl" value={doctorForm.image} onChange={(e) => setDoctorForm({ ...doctorForm, image: e.target.value })} />
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={doctorForm.available} onChange={(e) => setDoctorForm({ ...doctorForm, available: e.target.checked })} id="availableCheck" />
                <label htmlFor="availableCheck">Available</label>
              </div>
              <div className="flex justify-end gap-2 mt-4 flex-wrap">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">{editDoctor ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}