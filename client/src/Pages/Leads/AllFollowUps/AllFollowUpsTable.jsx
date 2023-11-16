import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowUpsStats, getEmployeeFollowUpsStats } from "../../../redux/action/followUp";
import Lead from "../Lead";
import moment from 'moment'
import { Table } from "../../../Components";





const AllFollowUpsTable = () => {
  /////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const dispatch = useDispatch()
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const { followUpsStats } = useSelector(state => state.followUp)
  const { loggedUser } = useSelector(state => state.user)

  /////////////////////////////////////////////////// STATES ////////////////////////////////////////////////
  const [showLead, setShowLead] = useState(false)
  const [selectedLeadId, setSelectedLeadId] = useState(false)

  /////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    loggedUser.role == 'employee'
      ?
      dispatch(getEmployeeFollowUpsStats())
      :
      dispatch(getFollowUpsStats())
  }, []);

  /////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////
  const createData = (date, day, followUps = []) => {
    return {
      date,
      day,
      totalFollowUps: followUps.length,
      followUps
    };
  };

  const rows = followUpsStats?.map((stat) => {
    const dateParts = stat.date.split("/");
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[0]) - 1; // Months in JavaScript are zero-based
    const day = parseInt(dateParts[1]);
    const date = new Date(year, month, day);

    return createData(stat.date, DAYS[date.getDay()], stat.followUps)
  })



  const columns = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: (params) => <div className="font-primary font-light">{params.row.uid}</div>,
    },
    {
      field: "leadId",
      headerName: "Lead Id",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light  ">{params.row.leadId?._id}</div>,
    },
    {
      field: "status",
      headerName: "Current Status",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">{params.row.status}</div>,
    },
    {
      field: "followUpDate",
      headerName: "Next Follow Up Date",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">{params.row.followUpDate}</div>,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      width: 400,
      renderCell: (params) => <div className="font-primary font-light">{params.row.remarks}</div>,
    },
    {
      field: "createdat",
      headerName: "Created At",
      headerClassName: "super-app-theme--header",
      width: 180,
      renderCell: (params) => <div className="font-primary font-light">{moment(params.row?.createdAt).format("DD-MM-YYYY")}</div>,
    },
  ];

  return (
    <div className='flex flex-col gap-4' >

      {rows.map((row) => (
        <div className="flex flex-col gap-2 " >
          <h2 className="text-primary-blue text-[24px] capitalize font-light">{row.date} {row.day}</h2>
          <Table
            rows={row.followUps}
            columns={columns}
            rowsPerPage={10}
          />
        </div>
      ))}
    </div>
  );
};

export default AllFollowUpsTable;
