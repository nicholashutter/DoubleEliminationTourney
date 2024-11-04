"use client"
import Link from "next/link";
import "./page.css";
export const GenericBracket = (props:any) =>
{
  return (
    <>
    <div className="container">
        {props.children}
      <div className="title"></div>
    </div>
    </>
  ); 
}

export default GenericBracket;