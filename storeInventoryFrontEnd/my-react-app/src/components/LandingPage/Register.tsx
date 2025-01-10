import axios from "axios";
import { useState } from "react";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rePass: ""
  });
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/register", {
        ...formData
      });
      if (response.status === 200) {
        console.log("User registration successful");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="container register ">
      <form className="form-signin ">
        <h2 className="form-signin-heading">Registration</h2>
        <div className="text-start">
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            autoFocus
          />
          <label htmlFor="inputUsername" className="sr-only">
            Username
          </label>
          <input
            type="username"
            id="inputUsername"
            className="form-control"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="inputRePassword" className="sr-only">
            Re-Enter Password
          </label>
          <input
            type="password"
            id="inputRePassword"
            className="form-control"
            placeholder="Re-Enter Password"
            value={formData.rePass}
            onChange={handleChange}
            required
          />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember_me" /> Remember email
          </label>
        </div>
        <br />
        <button
          className="btn btn-lg btn-success btn-block"
          type="submit"
          onClick={onSubmit}
        >
          Register New
        </button>
      </form>
    </div>
  );
};

export default Register;

