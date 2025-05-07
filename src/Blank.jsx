import React from "react";

const Blank = (props) => {
  return (
    <div className="blank h-10 w-11 bg-gray-500/40 border-b border-white text-white items-center flex flex-col justify-center">
      {props.char}
    </div>
  );
};

export default Blank;
