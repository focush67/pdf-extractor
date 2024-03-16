import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login";
import RegisterForm from "./pages/register";
import axios from "axios";
import Dashboard from "./pages/dashboard";
import FullPDFView from "./components/others/full-pdf-viewer";
const App = () => {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pdf/:pdfId" element={<FullPDFView />} />
      </Routes>
    </Router>
  );
};

export default App;
