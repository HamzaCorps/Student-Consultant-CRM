import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import AllFollowUpsTable from "./AllFollowUpsTable";

const AllFollowUps = () => {

  ////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////

  ////////////////////////////////////////////// STATES ////////////////////////////////////////////////////

  ////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
 

  ////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////

  return (
    <div className="w-full">
      <Topbar />
      <div className="pt-6">
        <AllFollowUpsTable />
      </div>
    </div>
  );
};

export default AllFollowUps;
