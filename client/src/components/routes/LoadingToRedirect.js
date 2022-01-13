import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);

  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      //dicrement count
      setCount((currentCount) => --currentCount);
    }, 1000);

    //redirect once count is equal to 0
    count === 0 && history.push("/");
    //cleanup count
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p-3 text-center ">
      <h3>
        Redirecting you in
        <span className="text-danger font-size:large">{count} </span>
        seconds
      </h3>
    </div>
  );
};
export default LoadingToRedirect;
