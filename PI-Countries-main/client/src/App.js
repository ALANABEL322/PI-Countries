import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CountryDetail from ".//components/CountryDetail/CountryDetail";
import FormCountry from "./components/FormCountry/FormCountry";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/:id" element={<CountryDetail />} />
        <Route exact path="/create" element={<FormCountry />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
