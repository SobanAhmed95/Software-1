import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../basicpage/Dashboard";

export default function rou() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
