import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log("EMAIL: ", window.localStorage.getItem("emailForRegistration"));
    // console.log("LOCATION: ", window.location.href);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (!email || !password) {
      toast.error("Email and Password required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 character long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //console.log('RESULT: ', result)
      if (result.user.emailVerified) {
        //removed the user from localstorage
        window.localStorage.removeItem("emailForRegistration"); ///later

        //get user id token (json webtoken)
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        // console.log("USER: ", user, "ID_TOKEN_RESULT: ", idTokenResult);
        //redirect
        // history.push("/");

        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const CompleteRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Register Complete</h3>
          {CompleteRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
