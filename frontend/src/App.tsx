import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import LostItems from "./pages/LostItems/LostItems";
import FoundItems from "./pages/FoundItems/FoundItems";

function App() {
  const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <NavBar />
        <div>{children}</div>
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/lost" element={<Layout><LostItems/></Layout>} />
        <Route path="/found" element={<Layout><FoundItems/></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
