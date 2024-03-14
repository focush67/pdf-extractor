import { Button } from "@/components/ui/button";
import { useToken } from "@/custom-hooks/useToken";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useToken();
  const handleLogout = async () => {
    await axios.delete("/api/login");
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Logout Button */}

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h1>
        </div>
        <div className="p-8">
          <Button
            color="primary"
            className="bg-red-700 hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
