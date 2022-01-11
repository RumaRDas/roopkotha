import React, { useState } from "react";
import UserNav from "../components/nav/UserNav";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPassword("");
    //  console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("You successfully reset your Password");
        //console.log(password)
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
        console.log("ERROR reset Password", err);
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label> Your Password</label>

          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Enter new password "
            disabled={loading}
          />
        </div>
        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          block
          shape="round"
          size="large"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </Button>
      </form>
    );
  };
  return (
    <div className="containe-fluid">
      <div className="row">
        <div className="col-md-3">
          <UserNav />
        </div>
        <div className="col-md-6">
          {loading ? (
            <h3 className="text-danger">Loading....</h3>
          ) : (
            <h3> Password Update </h3>
          )}

          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
