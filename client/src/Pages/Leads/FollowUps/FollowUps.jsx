import React, { useState } from "react";
import Topbar from "./Topbar";
import { Table } from "../../../Components";
import { getFollowUps, getEmployeeFollowUps } from "../../../redux/action/followUp";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import DeleteModal from "./DeleteModal";
import { PiTrashThin } from "react-icons/pi";
import { Tooltip } from "@mui/material";

const FollowUps = () => {
  /////////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const { followUps, currentFollowUp } = useSelector((state) => state.followUp);
  const { loggedUser } = useSelector((state) => state.user);
  const { leadId } = useParams();
  const dispatch = useDispatch();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: (params) => <div className="font-primary font-light">{params.row.uid}</div>,
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
      renderCell: (params) => (
        <div className="font-primary font-light">
          {moment(params.row?.followUpDate).format("DD-MM-YYYY")}
        </div>
      ),
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
      renderCell: (params) => (
        <div className="font-primary font-light">
          {moment(params.row?.createdAt).format("DD-MM-YYYY")}
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 70,
      renderCell: (params) => (
        <div className="flex gap-[4px] ">
          <Tooltip arrow placement="top" title="Delete">
            <PiTrashThin
              onClick={() => handleOpenDeleteModal(params.row._id)}
              className="text-red-500 text-[23px] cursor-pointer"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  /////////////////////////////////////////// STATES ////////////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [followUpId, setFollowUpId] = useState("");

  /////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////
  useEffect(() => {
    loggedUser.role == "employee"
      ? dispatch(getEmployeeFollowUps(leadId))
      : dispatch(getFollowUps(leadId));
  }, []);

  /////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////
  const handleOpenDeleteModal = (followUpId) => {
    setFollowUpId(followUpId);
    setOpenDeleteModal(true);
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">
      <Topbar />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        followUpId={followUpId}
      />
      <Table rows={followUps} columns={columns} rowsPerPage={10} />
    </div>
  );
};

export default FollowUps;
