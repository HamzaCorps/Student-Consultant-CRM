import {
    Alert,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    Input,
    InputAdornment,
    Snackbar,
  } from "@mui/material";
  import React from "react";
  import { Link } from "react-router-dom";
  import { PiEyeSlashThin, PiEyeThin, PiX } from "react-icons/pi";
  
  const ResetPassword = () => {
    /////////////////////////////////// VARIABLES /////////////////////////////////
  
    /////////////////////////////////// STATES /////////////////////////////////////
  
    /////////////////////////////////// USE EFFECTS ////////////////////////////////
  
    /////////////////////////////////// FUNCTIONS //////////////////////////////////
  
    return (
      <div className="font-primary">
        <div className="md:opacity-100 opacity-0 left-0 bottom-10 absolute h-[53%] w-[28%]">
          <img src="/images/login-1.png" />
        </div>
        <div className="w-full h-screen ">
          <div className="flex justify-center pt-16">
            <img className="h-12" src="/background/A-consultant-logo.png" />
          </div>
          <div className="flex justify-center pt-6 pl-0 ml-0 rounded-lg">
            <div className="w-96 h-auto shadow-xl rounded bg-white">
              <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-6">
                Forgot Password
              </p>
              <p className="flex justify-center text-center pt-2 font-Mulish text-slate-500 text-xs px-10">
                Enter your new password below. Then press the "Reset Password" button. Then you will be able to log in with your new password.
              </p>
              <form className="flex flex-col gap-[10px] w-auto pl-[2rem] pt-[2rem] ">
                <div className="flex flex-col gap-8">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter Your New Password"
                    className="w-[20rem] h-[40px] px-[8px] font-primary"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>
                <br />
                <Link to="/auth/forgot_password/enter_code">
                  <button
                    className={`w-[20rem] bg-[#42acd2] hover:bg-[#45b8e2] p-2 rounded-lg transition-all text-white font-medium tracking-wider `}
                    variant="contained">
                    Reset Password
                  </button>
                </Link>
                <div className="font-primary font-light text-slate-500 flex justify-center p-2 pr-7">
                  <Link to="/auth/login" className="text-sky-400 hover:text-sky-600">
                    Back To Login Page
                  </Link>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ResetPassword;
  