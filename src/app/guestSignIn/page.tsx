
import User from "@/app/resources/user";
import "./page.css";
import {ReactNode } from "react";

//this link element will have to be ported over
import Link from 'next/link';

const GuestSignUp = (props: { children?: ReactNode }) => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>User Registration</title>
      <div className="container">
        <h2 className="title">Guest Sign Up</h2>
        <form >
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <br/>
            <label>Guest Stats Do Not Get Tracked</label>
          </div>
          <div className="form-group">
            <input type="submit" defaultValue="Sign Up" />
          </div>
          <div className="form-group">
            <span className="switch-text">
              Already have an account? <Link href="/">Sign In Here</Link>{" "}
              {/* Sign in option */}
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default GuestSignUp;