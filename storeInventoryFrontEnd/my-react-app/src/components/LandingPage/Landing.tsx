import Login from "./Login";
import Register from "./Register";
import { useState, useEffect } from "react";

const Landing = () => {
  const [activeTabState, setActiveTabState] = useState("login");

  return (
    <div className="container">
      <h3>Welcome to the Landing Page</h3>
      <hr />
      {activeTabState === "login" && (
        <div>
          <Login />
          <hr />
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
