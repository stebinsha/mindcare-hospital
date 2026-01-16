import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Experts from "./pages/Experts";
import ExpertProfile from "./pages/ExpertProfile";
import BookingFlow from "./components/Booking/BookingFlow";
import AdminPanel from "./components/admin/AdminPanel";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route
          path="/"
          element={
           <div className="pt-15">
              <Navbar />
              <Home />
            <Footer/>
            </div>
          }
        />

     
        <Route
          path="/experts"
          element={
        <div className="pt-15">
              <Navbar />
              <Experts />
              <Footer/>
          </div>
          }
        />

        
        <Route
          path="/experts/:id"
          element={
              <div className="pt-15">
              <Navbar />
              <ExpertProfile />
              <Footer/>
            </div>
          }
        />

     
        <Route
          path="/booking/:id"
          element={
            <div className="pt-15">
              <Navbar />
              <BookingFlow />
              <Footer/>
            </div>
          }
        />
 
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
