import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const userData = {
      username: event.target.username.value,
      password: event.target.password.value,
      shopNames: event.target.shopNames.value
        .split(",")
        .map((name) => name.trim()),
    };

    fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Signup successful!");

          navigate("/signin");
        } else {
          alert("Signup failed: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        alert("An error occurred during signup.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center justify-center w-screen h-screen"
    >
      <h1>Signup</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username">Your username</Label>
        </div>
        <TextInput id="username" type="text" placeholder="username" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Your password</Label>
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="password"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Shop Names</Label>
        </div>
        <TextInput
          id="shopNames"
          type="text"
          placeholder="Abc, Bcd, Cde"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner /> : "Submit"}
      </Button>
      <p>
        Go to{" "}
        <Link className="underline" to="/signin">
          Signin
        </Link>
      </p>
    </form>
  );
};

export default Signup;
