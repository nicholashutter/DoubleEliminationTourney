"use client"
import Link from "next/link";
import "./homePage.css"; 

function authenticationFormHandler(): void {
  alert("Submission Complete");
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
            <Link style={{ color: "white" }}  href={"/menu"}>
              <button onClick={()=>authenticationFormHandler}>
                Sign In
              </button>
            </Link>

            <label className="form-group">Or</label>

            <Link style={{ color: "white" }} href={"/createguest"}>
              <button>
                Continue As Guest
              </button>
            </Link>

            <Link style={{ color: "white" }} href={`/signup`}>
              <button>
                Sign Up Here
              </button>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

