import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import Shop from "./components/Shop";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, isLoading, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return isLoading ? (
    <div className="flex items-center justify-center w-screen h-screen">
      <Spinner aria-label="Default status example" />
    </div>
  ) : (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />
      <Route exact path="/" element={<Shop />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
