import "./App.css";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Template from "./components/Template";
import Register from "./components/Register";
import FindLawyer from "./components/FindLawyer";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "flowbite";
import { useEffect } from "react";
import { initFlowbite } from 'flowbite';

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Input />} />
          <Route exact path="/template" element={<Template />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/findLawyer" element={<FindLawyer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;