"use client"
import Link from "next/link";
import "./page.css";

interface Props{
  bracketContent: React.ComponentType<any>;
}

export const GenericBracket = (Props) => 
{
  return (
    <>
    <div className="container">
        {Props.children}
      <div className="title"></div>
    </div>
    </>
  ); 
}

export default GenericBracket;