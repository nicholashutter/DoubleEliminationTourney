"use client"
import Link from "next/link";

import "@/app/page.css"; 

function authenticationFormHandler(): void {
  window.alert("Submission Success");
}

export default function HomePage() {
  return (
    <>
      <div className="container">
        <h2 className="title">Welcome!</h2>

        <div className="form-group">
          <label htmlFor="username">Username:</label>

          <input type="text" id="username" name="username" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>

          <input type="password" id="password" name="password" />

          <span className="switch-text">
            <Link href={"/tourneyMenu"}>
              <Button variant="contained" onClick={authenticationFormHandler}>
                Sign In
              </Button>
            </Link>

            <label className="form-group">Or</label>

            <Link href={"/guestSignIn"}>
              <Button variant="contained">
                Continue As Guest
              </Button>
            </Link>

            <Link href={`/signUp`}>
              <Button variant="contained">
                Sign Up Here
              </Button>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

