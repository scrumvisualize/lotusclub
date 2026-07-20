import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Members from "./pages/Members"
import Login from "./pages/Login"
import BookRummyTable from "./pages/BookRummyTable"
import ProtectedRoute from "./components/protectedRoute";
import ChangePassword from "./pages/ChangePassword";
import GlobalLoader from "./components/GlobalLoader";
import Requests from "../src/pages/Requests";
import ManageUsers from "./pages/ManageUsers";
import { useState } from "react";
import ManagePartners from "./pages/ManagePartners";


export default function App() {

  const [isLoading, setIsLoading] = useState(false);
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

      {isLoading && <GlobalLoader />}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route
          path="/login"
          element={<Login setIsLoading={setIsLoading} />}
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
        <Route
          path="/requests"
          element={
            <ProtectedRoute
              adminOnly
            >
              <Requests setIsLoading={setIsLoading} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-users"
          element={
            <ProtectedRoute adminOnly>
              <ManageUsers setIsLoading={setIsLoading} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-partners"
          element={
            <ProtectedRoute adminOnly>
              <ManagePartners />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>

  );
}

