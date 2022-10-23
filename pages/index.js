import { useState, useEffect } from "react";
import Home from "./home";
import Login from "./login";
import UserService from "../services/UserService";

const userService = new UserService();
export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(
      userService.isAuthenticated()
    );
  }, []);

  // if (isAuthenticated === null) {
  //   return null;
  // }

  if (isAuthenticated) {
    return <Home />;
  }

  return <Login />;
}
