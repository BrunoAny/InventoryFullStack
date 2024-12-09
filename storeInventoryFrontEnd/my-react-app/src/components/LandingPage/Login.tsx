import axios from "axios";
import $ from "jquery";

const Login = () => {
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", {
        email: $("#inputEmail").val(),
        password: $("#inputPassword").val(),
      })
      .then((res) => {
        console.log("user login");
      });
  };
  return (
    <div className="container login" onSubmit={onSubmit}>
      <form className="form-signin">
        <h2 className="form-signin-heading">Please sign in</h2>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember_me" /> Remember email
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <br />
      </form>
      <button
        className="btn btn-lg btn-success btn-block"
        id="showRegister"
        type="button"
      >
        Register New
      </button>
    </div>
  );
};

export default Login;
