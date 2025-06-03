import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, isLoading, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return isLoading ? (
    <div className="flex items-center justify-center w-screen h-screen">
      <Spinner aria-label="Default status example" />
    </div>
  ) : (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />
    </Routes>
  );
}

export default App;
