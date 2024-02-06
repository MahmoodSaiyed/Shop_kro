import { useEffect, useState } from "react"

export default function ProtectedRoute({ component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true);
    } else {
      window.location.href = "/signin"
    }
  }, []); 

  return isAuthenticated ? <Component {...rest} /> : null;
}