import Login from "./Login";
import Register from "./Register";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    const isLoginSuccessful = true;

    if (isLoginSuccessful) {
      navigate("/products"); // Navigate to Products page
    }
  };
  const [activeTabState, setActiveTabState] = useState("login");
  const LOGIN_PAGE_URL = "/login";
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token && window.location.pathname !== LOGIN_PAGE_URL) {
  //     window.location.href = LOGIN_PAGE_URL;
  //   }
  // }, []);

  return (
    <div className="container">
      <h3>Welcome to the Login Page</h3>
      <hr />
      {activeTabState === "login" && (
        <div>
          <Login />
          <hr />
          <div className="row">
            <div className="col">
              <div>
                <span>Don't have an account? </span>
              </div>
              <button
                className="btn btn-success"
                onClick={() => setActiveTabState("register")}
              >
                Register
              </button>
            </div>
            <div className="col">
              <span>Guest User?</span>
              <div>
                <button className="btn btn-primary">Guest</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTabState === "register" && (
        <div>
          <Register />
          <hr />
          <div>
            <span>Already have an account? </span>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setActiveTabState("login")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Landing;
