import React from "react";

const Blank = (props) => {
  return (
    <div className="blank md:h-10 md:w-11 h-8 w-9  bg-gray-500/40 border-b border-white text-white items-center flex flex-col justify-center">
      {props.char}
    </div>
  );
};

export default Blank;
