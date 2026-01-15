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
            <>
              <Navbar />
              <Home />
            <Footer/>
            </>
          }
        />

     
        <Route
          path="/experts"
          element={
            <>
              <Navbar />
              <Experts />
              <Footer/>
            </>
          }
        />

        
        <Route
          path="/experts/:id"
          element={
            <>
              <Navbar />
              <ExpertProfile />
              <Footer/>
            </>
          }
        />

     
        <Route
          path="/booking/:id"
          element={
            <>
              <Navbar />
              <BookingFlow />
              <Footer/>
            </>
          }
        />
 
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
