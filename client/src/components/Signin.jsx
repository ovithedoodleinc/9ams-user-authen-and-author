import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const userData = {
      username: event.target.username.value,
      password: event.target.password.value,
      rememberMe: event.target.rememberMe.checked,
    };

    fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Signin successful!");

          navigate("/dashboard");
          navigate(0);
        } else {
          alert("Signin failed: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Error during signin:", error);
        alert("An error occurred during signin.");
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
      <h1>Signin</h1>
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
      <div className="flex items-center gap-2">
        <Checkbox id="rememberMe" />
        <Label htmlFor="rememberMe">Remember me</Label>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner /> : "Submit"}
      </Button>
      <p>
        Go to{" "}
        <Link className="underline" to="/signup">
          Signup
        </Link>
      </p>
    </form>
  );
};

export default Signin;
