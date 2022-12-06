import React, { useEffect } from "react";

const Square = ({ value , squareClick}) => {
  
 // console.log("value", value);
  return (
    <>
      <button className="btn" onClick={squareClick}>{value}</button>
    </>
  );
};

export default Square;

// onClick={()=>console.log(value,'i')}
