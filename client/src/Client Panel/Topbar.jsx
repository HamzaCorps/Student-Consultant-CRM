import React from "react";
import { FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiArchive, PiMagnifyingGlass } from "react-icons/pi";

const Topbar = () => {

  ////////////////////////////////////////// VARIABLES //////////////////////////////////////

  ////////////////////////////////////////// STATES //////////////////////////////////////

  ////////////////////////////////////////// USE EFFECTS //////////////////////////////////

  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////

  return (
    <div className="flex flex-col tracking-wide pb-8 font-primary">
      <div className="md:flex justify-end items-center flex-none">
        <div className="flex items-center justify-end gap-2 md:mt-0 mt-4">
          <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
            <FormControl>
              <Input
                name="search"
                placeholder="Search Leads"
                startAdornment={
                  <InputAdornment position="start">
                    <PiMagnifyingGlass className="text-[25px]" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <Tooltip title="Archived" arrow placement="top">
            <div className={` p-2 rounded-md cursor-pointer bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd] `}>
              <PiArchive className="text-[25px]" />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
