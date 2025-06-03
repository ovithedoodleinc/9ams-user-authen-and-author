import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Spinner,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Header = ({ user }) => {
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/shops`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch shops");
        }
        const data = await response.json();

        setShops(data.shops);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setIsLoading(false);
      }
    };

    isActive && fetchShops();
  }, [isActive]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      alert("Logout successful!");
      navigate("/signin");
      navigate(0);
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout.");
    }
  };

  return (
    <Navbar fluid rounded>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              onClick={() => setIsActive(true)}
              alt="User settings"
              img="/default-avatar-image.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user.username}</span>
          </DropdownHeader>
          <DropdownDivider />
          {isLoading ? (
            <Spinner />
          ) : (
            shops.map((shop) => (
              <DropdownItem key={shop._id}>{shop.name}</DropdownItem>
            ))
          )}
          <DropdownDivider />
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" className="font-bold">
          <Button size="xl" color="dark" outline>
            Simple Dashboard
          </Button>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
