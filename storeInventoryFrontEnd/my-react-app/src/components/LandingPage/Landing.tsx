import Login from "./Login";
import Register from "./Register";
import { useState, useEffect } from 'react'
import $ from "jquery";


function Landing() {
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    $("#showLogin").on("click", () => setActiveTab("login"));
    $("#showRegister").on("click", () => setActiveTab("register"));

    return () => {
      $("#showLogin").off("click");
      $("#showRegister").off("click");
    };
  }, [activeTab]);

  return (
    <div className="landing">
      {activeTab === "login" && <Login />}
      {activeTab === "register" && <Register />} 
      
    </div>
  );
}


export default Landing