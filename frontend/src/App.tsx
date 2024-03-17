import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login";
import RegisterForm from "./pages/register";
import axios from "axios";
import Dashboard from "./pages/dashboard";
import FullPDFView from "./components/others/full-pdf-viewer";
import EditPDFPages from "./components/others/edit-pdf";
import Home from "./pages/home";
const App = () => {
  const mode = import.meta.env.MODE;
  if (mode === "development") {
    axios.defaults.baseURL = "http://localhost:4000";
  } else {
    axios.defaults.baseURL = "https://pdf-extractor-backend.vercel.app";
  }

  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pdf/:pdfId" element={<FullPDFView />} />
        <Route path="/pdf/edit/:pdfId" element={<EditPDFPages />} />
        <Route path="*" element={<h1>Kaha Jaara bhai</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
