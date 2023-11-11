import React, { useEffect, useState } from "react";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SetDeductions = ({ open, setOpen, scroll }) => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////

  const initialState = {
    halfDays: "",
    dayOffs: "",
    NSalary: "",
  };

  ////////////////////////////////////////// STATES /////////////////////////////////////
  const [deductions, setDeductions] = useState(initialState);

  ////////////////////////////////////////// USE EFFECTS /////////////////////////////////

  ////////////////////////////////////////// FUNCTIONS ///////////////////////////////////

  const handleChange = (field, value) => {
    setDeductions({ ...deductions, [field]: value });
  };

  const handleClose = () => {
    setDeductions(initialState);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Set Deduction Amounts</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 pb-0 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Late Arrivals </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("lateArrivals", e.target.value)}
                    value={deductions.lateArrivals}
                    name="lateArrivals"
                    size="small"
                    type="number"
                    placeholder="Enter Amount per Late Arrival"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Half Days </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("halfDays", e.target.value)}
                    value={deductions.halfDays}
                    name="halfDays"
                    size="small"
                    type="number"
                    placeholder="Enter Amount per Half Day"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Day Offs </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("dayOffs", e.target.value)}
                    value={deductions.dayOffs}
                    name="dayOffs"
                    size="small"
                    type="number"
                    placeholder="Enter Amount per Day Off"
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions className="mb-4 mr-7">
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 font-primary py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] transition-all">
            Cancel
          </button>
          <button
            variant="contained"
            className="bg-primary-red px-4 py-2 font-primary rounded-lg text-white mt-4 hover:bg-red-400">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SetDeductions;
