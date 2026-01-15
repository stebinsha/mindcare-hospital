import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
       
      <div
        className="text-2xl font-bold text-[#3a7f73] cursor-pointer"
        onClick={() => navigate("/")}
      >
        MindCare Hospital
      </div>
 
      <ul className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#3a7f73]" : "hover:text-[#3a7f73]"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/experts"
            className={({ isActive }) =>
              isActive ? "text-[#3a7f73]" : "hover:text-[#3a7f73]"
            }
          >
            Experts
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/services"
            className="hover:text-[#3a7f73]"
          >
            Services
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className="hover:text-[#3a7f73]"
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className="hover:text-[#3a7f73]"
          >
            Contact
          </NavLink>
        </li>
      </ul>
 
      <button
        onClick={() => navigate("/login")}
        className="px-5 py-2 rounded-lg bg-[#018c14] text-white font-medium hover:opacity-80"
      >
        Login
      </button>
    </nav>
  );
}
