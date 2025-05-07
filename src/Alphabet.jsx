import React from "react";

const Alphabet = (props) => {
  return (
    <>
      <button
        className="keyboard bg-amber-400 font-bold rounded-sm h-8 md:h-10 w-8 md:w-11 flex items-center justify-center"
        id={props.char}
        onClick={props.click}
        aria-pressed={props.pressed}
      >
        {props.char}
      </button>
    </>
  );
};

export default Alphabet;
