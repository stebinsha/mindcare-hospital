import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
const scrollToFooter = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      
      navigate("/", { state: { scrollTo: id } });
    }
  };
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between z-50">
      
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
          <NavLink to="/experts" className="hover:text-[#3a7f73]">
            Services
          </NavLink>
        </li>

        <li>
           <li>
          <button onClick={() => scrollToFooter("about")} className="hover:text-[#3a7f73]">About</button>
        </li>

        </li>

        <li>
           <button onClick={() => scrollToFooter("contact")} className="hover:text-[#3a7f73]">Contact</button>
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
