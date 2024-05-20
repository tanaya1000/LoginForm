import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let isvalid = true;
    let validationErrors = {};

    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Email is nor valid";
    }
    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "password is required";
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationErrors.email = "password length at least 6 char";
    }
    setErrors(validationErrors);
    setValid(isvalid);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .get("http://localhost:8000/users")
        .then((res) => {
          res.data.map((user) => {
            if (user.email === formData.email) {
              if (user.password === formData.password) {
                alert("Login Successfully!.");
                navigate("/");
              } else {
                isvalid = false;
                validationErrors.password = "Wrong password;";
              }
            } else if (formData.email !== "") {
              isvalid = false;
              validationErrors.email = "Wrong Email;";
            }
          });
          setErrors(validationErrors);
          setValid(isvalid);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="signup-form">
            <form
              onSubmit={handleSubmit}
              className="mt-5 border p-4 bg-light shadow">
              <h4 className="mb-5 text-secondary">Login Your Account</h4>
              {valid ? (
                <></>
              ) : (
                <span className="text-danger">
                  {errors.password};{errors.email}
                </span>
              )}
              <div className="row">
                <div className="mb-3 col-md-12">
                  <label>
                    Email<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3 col-md-12">
                  <label>
                    Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-12">
                  <button className="btn btn-primary float-end">
                    Login Now
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3 text-secondary">
              If you haven't account, Please{" "}
              <Link to="/signup">Signup Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
