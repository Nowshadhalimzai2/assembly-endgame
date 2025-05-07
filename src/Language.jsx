import React from "react";

const Language = (props) => {
  return (
    <>
      <div className={props.design} id={props.id}>
        {props.language}
      </div>
    </>
  );
};

export default Language;
