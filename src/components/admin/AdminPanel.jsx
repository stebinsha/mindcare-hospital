import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, LogOut, Users, CalendarCheck, UserCircle,
  ArrowUpDown, Search, Plus, Edit, Trash2
} from "lucide-react";
import { experts as initialExperts } from "../../data/expertsData";

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "viewer", password: "viewer123", role: "viewer" }
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
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
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
  
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="text-blue-600" /> Admin Dashboard
        </h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-red-600">
          <LogOut size={18} /> Logout
        </button>
      </header>

 
      <section className="grid md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4 hover:shadow-lg transition">
          <Users className="text-teal-600 w-12 h-12" />
          <div>
            <p className="text-gray-500 uppercase text-sm">Doctors</p>
            <h2 className="text-3xl font-bold">{doctors.length}</h2>
          </div>
        </div>
      </section>

  
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute top-3 left-3 text-gray-400" />
            <input
              placeholder="Search doctors..."
              className="w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-teal-300 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleSort("name")} className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-100 transition">
              Sort <ArrowUpDown size={16} />
            </button>
            <button onClick={openAddDoctor} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
              <Plus size={16} /> Add Doctor
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Doctor</th>
                <th className="p-4 text-left">Specialty</th>
                <th className="p-4 text-left">Experience</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedDoctors.map((d) => (
                <tr key={d.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={d.image || "https://via.placeholder.com/50"} alt={d.name} className="w-10 h-10 rounded-full" />
                    {d.name}
                  </td>
                  <td className="p-4">{d.specialty}</td>
                  <td className="p-4">{d.experience} yrs</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer ${d.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      onClick={() => toggleDoctorStatus(d.id)}
                      title="Click to toggle availability"
                    >
                      {d.available ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => openEditDoctor(d)} className="flex items-center gap-1 px-3 py-1 bg-yellow-200 text-yellow-800 font-semibold rounded-full hover:bg-yellow-300 shadow-sm transition-all duration-200 cursor-pointer">
                      <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => deleteDoctor(d.id)} className="flex items-center gap-1 px-3 py-1 bg-red-200 text-red-800 font-semibold rounded-full hover:bg-red-300 shadow-sm transition-all duration-200 cursor-pointer">
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
 
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
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
              <div className="flex justify-end gap-2 mt-4">
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
