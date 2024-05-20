import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let isvalid = true;
    let validationErrors = {};
    if (formData.fname === "" || formData.fname === null) {
      isvalid = false;
      validationErrors.fname = "First Name required";
    }
    if (formData.lname === "" || formData.lname === null) {
      isvalid = false;
      validationErrors.lname = "Last Name required";
    }
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
    if (formData.cpassword !== formData.password) {
      isvalid = false;
      validationErrors.cpassword = "c password does not match";
    }
    setErrors(validationErrors);
    setValid(isvalid);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8000/users", formData)
        .then((res) => {
          alert("Signup Successfully!.");
          navigate("/login");
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
              <h4 className="mb-5 text-secondary">Create Your Account</h4>
              {valid ? (
                <></>
              ) : (
                <span className="text-danger">
                  {errors.fname};{errors.lname};{errors.password};{errors.email}
                  ;{errors.cpassword}
                </span>
              )}
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label>
                    First Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="fname"
                    className="form-control"
                    placeholder="Enter First Name"
                    onChange={(e) =>
                      setFormData({ ...formData, fname: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label>
                    Last Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Lname"
                    className="form-control"
                    placeholder="Enter Last Name"
                    onChange={(e) =>
                      setFormData({ ...formData, lname: e.target.value })
                    }
                  />
                </div>
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
                <div className="mb-3 col-md-12">
                  <label>
                    Confirm Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(e) =>
                      setFormData({ ...formData, cpassword: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-12">
                  <button className="btn btn-primary float-end">
                    Signup Now
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3 text-secondary">
              If you have account, Please <Link to="/login">Login Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
