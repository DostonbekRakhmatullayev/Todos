import "./register.css";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../hook/UseAuth";
import axios from "axios";
export const Registers = () => {
  let [_, setToken] = UseAuth();
  let navigate = useNavigate();

  const Regestr = (evt) => {
    evt.preventDefault();

    let { first_name, last_name, email, password } = evt.target.elements;

    console.log(first_name.value, last_name.value, email.value, password.value);
    axios
      .post("https://todo.mquvonchbek.uz/user/create", {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        setToken(res?.data.token);
        res?.data.token && navigate("/");
      })
      .catch((error) => {
        alert(error?.message);
        console.log(error);
      });

    first_name.value = null;
    last_name.value = null;
    email.value = null;
    password.value = null;
  };
  return (
    <div className="registr">
      <div>
        <h2 className="">Registration</h2>
      </div>
      <form onSubmit={Regestr} className="" action="#" method="POST">
        <div className="">
          <div>
            <label htmlFor="first_name" className="">
              First name
            </label>
            <input
              className="form-control"
              id="first_name"
              name="first_name"
              type="text"
              required
              placeholder="First Name"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="sr-only">
              Last name
            </label>
            <input
              className="form-control"
              id="last_name"
              name="last_name"
              type="text"
              required
              placeholder="Last Name"
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              className="form-control"
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
            />
          </div>
        </div>
        <div>
          <div className="">
            <a href="/login" className="mt-2">
              Go to Login page
            </a>
          </div>
          <button className="btn btn-primary mt-1" type="submit">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};
