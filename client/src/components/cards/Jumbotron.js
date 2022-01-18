import React from "react";
import { Typewriter } from "typewriter-effect";

const Jumbotron = ({ text }) => {
  <Typewriter
    option={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />;
};
export default Jumbotron;
