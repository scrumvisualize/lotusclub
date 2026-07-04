import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Members from "./pages/Members"
import BookRummyTable from "./pages/BookRummyTable"

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
        <Route path="/bookrummytable" element={<BookRummyTable />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>

  );
}

