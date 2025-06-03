import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Shop = () => {
  const [shopName, setShopName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hostname.includes(import.meta.env.VITE_DOMAIN)) {
      setShopName(window.location.hostname.split(".")[0]);
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <h1 className="text-center">
      This is <span className="font-bold">{shopName}</span> shop
    </h1>
  );
};

export default Shop;
