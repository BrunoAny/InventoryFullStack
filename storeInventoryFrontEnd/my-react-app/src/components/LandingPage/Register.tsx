import axios from "axios";
import $ from "jquery";
const onSubmit = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  axios.post("http://localhost:5000/users/register", {
    username: $("#inputUsername").val(),
    email: $("#inputEmail").val(),
    password: $("#inputPassword").val(),
    rePass: $("#inputRePassword").val(),
  }).then((res) => {
    console.log('new user registered');
  });
}
const Register = () => {
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
        <label htmlFor="inputRePassword" className="sr-only">
          Re-Enter Password
        </label>
        <input
          type="password"
          id="inputRePassword"
          className="form-control"
          placeholder="Re-Enter Password"
          required
        />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember_me" /> Remember email
          </label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          id="showLogin"
          type="button"
        //   onClick={() => window.location.reload()}
        >
          Sign In
        </button>
        <br />
        <button className="btn btn-lg btn-success btn-block" type="submit">
          Register New
        </button>
      </form>
      
    </div>
  );
};

export default Register;
