import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Members from "./pages/Members"
import Login from "./pages/Login"
import BookRummyTable from "./pages/BookRummyTable"
import ProtectedRoute from "./components/protectedRoute";
import ChangePassword from "./pages/ChangePassword";


export default function App() {
  return (

    <div
      className="
        min-h-screen
        bg-gray-50
        dark:bg-slate-950
        text-gray-900
        dark:text-white
        transition-colors
        duration-300
        "
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/bookrummytable"
          element={
            <ProtectedRoute>
              <BookRummyTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>

  );
}

