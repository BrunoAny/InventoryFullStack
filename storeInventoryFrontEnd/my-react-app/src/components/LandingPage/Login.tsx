import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  // useEffect(() => {
  //   window.location.href = "/login";
  // }, []);
  const [email, setEmail] = useState("");
  // const [redirect, setRedirect] = useState(false);

  // if (redirect) {
  //   window.location.href = "/login";
  // }
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling login errors

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(""); // Reset error before submitting

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("User login successful");
        localStorage.setItem("token", response.data.token);
        window.location.href = "/main/products/all";
      }
    } catch (err) {
      setError("Login failed. Please check your email and password.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="container login">
      <form className="form-signin" onSubmit={onSubmit}>
        <h2 className="form-signin-heading">Please sign in</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember_me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
