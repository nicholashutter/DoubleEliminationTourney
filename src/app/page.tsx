"use client"
import Link from "next/link";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme"
import "@/app/page.css"; 

function authenticationFormHandler(): void {
  window.alert("Submission Success");
}

export default function HomePage() {
  return (
    <ThemeProvider theme ={theme}>
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
            <Link href={"/menu"}>
              <Button variant="contained" onClick={authenticationFormHandler}>
                Sign In
              </Button>
            </Link>

            <label className="form-group">Or</label>

            <Link href={"/createguest"}>
              <Button variant="contained">
                Continue As Guest
              </Button>
            </Link>

            <Link href={`/signup`}>
              <Button variant="contained">
                Sign Up Here
              </Button>
            </Link>
          </span>
        </div>
      </div>
    </ThemeProvider>
  );
};

