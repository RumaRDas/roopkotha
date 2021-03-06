import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";

const Register = ({history}) => {
  const [email, setEmail] = useState("");

  //const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/")// navigate("/"); //if userlogedin redirectiong to home page
  }, [user,history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is send to ${email}. Click the link to complete your registration`
    );

    //save user email in localstorage
    window.localStorage.setItem("emailForRegistration", email);

    //clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        autoFocus
      />
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        size="large"
      >
        Register
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Register</h3>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
