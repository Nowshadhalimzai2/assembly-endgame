import React from "react";

const Message = (props) => {
  return (
    <div
      ref={props.ref}
      className="h-[80px] w-full bg-purple-500/40 text-center flex items-center justify-center rounded-md text-white invisible"
    >
      "{props.text}"
    </div>
  );
};

export default Message;
