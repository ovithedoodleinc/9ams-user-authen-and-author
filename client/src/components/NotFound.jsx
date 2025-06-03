import { useEffect } from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard", {
      replace: true,
    });
  }, [navigate]);

  return <div>NotFound</div>;
};

export default NotFound;
