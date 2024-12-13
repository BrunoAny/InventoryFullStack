import axios from "axios";
import { useState } from "react";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePass, setRePass] = useState("");
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/register", {
        username,
        email,
        password,
        rePass
      });
      if (response.status === 200) {
        console.log("User registration successful");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };
  return (
    <div className="container register">
      <form className="form-signin">
        <h2 className="form-signin-heading">Registration</h2>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
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
        <label htmlFor="inputUsername" className="sr-only">
          Username
        </label>
        <input
          type="username"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={rePass}
          onChange={(e) => setRePass(e.target.value)}
          required
        />
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
