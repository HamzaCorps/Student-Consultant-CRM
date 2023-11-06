import React, { useEffect } from "react";
import { Search } from "@mui/icons-material";
import { Box, CircularProgress, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { Loader } from "../utils";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { IoOpenOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getLeadByPhone } from "../redux/action/lead";

const Table = () => {
  //////////////////////////////////////// VARIABLES ///////////////////////////////////

  const dispatch = useDispatch();
  const { currentLead, isFetching, error } = useSelector((state) => state.lead);
  console.log(currentLead)
  const { loggedUser } = useSelector((state) => state.user);
  const phoneNumber = loggedUser?.phone;

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.currentLead?.uid}>
          <div className="font-primary font-light capitalize">{params.currentLead?.uid}</div>
        </Tooltip>
      ),
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 190,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.currentLead?.allocatedTo?.firstName}>
          <div className="font-primary font-light capitalize">{params.currentLead?.allocatedTo?.firstName}</div>
        </Tooltip>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.currentLead?.createdAt}>
          <div className="font-primary font-light capitalize">{params.currentLead?.createdAt}</div>
        </Tooltip>
      ),
    },
    {
      field: "degree",
      headerName: "Degree",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.currentLead?.degree}>
          <div className="font-primary font-light capitalize">{params.currentLead?.degree}</div>
        </Tooltip>
      ),
    },
    {
      field: "major",
      headerName: "Major",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.value}>
          <div className="font-primary font-light capitalize">{console.log(params.row)}</div>
        </Tooltip>
      ),
    },
    {
      field: "country",
      headerName: "Country",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.value}>
          <div className="font-primary font-light capitalize">{params.country}</div>
        </Tooltip>
      ),
    },
    {
      field: "visa",
      headerName: "Visa",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.value}>
          <div className="font-primary font-light capitalize">{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div
          className={`border-[1px] px-[8px] py-[4px] rounded-full capitalize font-primary font-medium ${
            params.value == "Successful"
              ? "border-green-500 text-green-500"
              : params.value == "Pending"
              ? "border-yellow-500 text-yellow-500"
              : "border-red-500 text-red-500"
          }`}>
          {params.value}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div>
          <Tooltip placement="bottom" arrow title="View Attachments">
            <div className="cursor-pointer">
              <IoOpenOutline className="cursor-pointer text-orange-500 text-[23px] hover:text-orange-400" />
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];

  //////////////////////////////////////// STATES //////////////////////////////////////
  const [searchValue, setSearchValue] = useState("");
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  //////////////////////////////////////// USEEFFECTS //////////////////////////////////

  useEffect(() => {
    dispatch(getLeadByPhone(phoneNumber));
  }, []);

  //////////////////////////////////////// FUNCTIONS ///////////////////////////////////
  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div className="w-full">
      {isFetching && (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <Loader />
        </div>
      )}
      {error && (
        <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={error ? handleClick({ vertical: "bottom", horizontal: "right" }) : error}
            onClose={handleClose}
            message={error == "Request failed with status code 400" ? "No Lead Found" : error}
            key={vertical + horizontal}
          />
        </Box>
      )}
      {!isFetching && (
        <div className="flex flex-col gap-[8px]">
          <Box
            sx={{
              justifyContent: "center",
              boxShadow: "none",
              border: "1px solid #f6f9fa",
              "& .super-app-theme--header": {
                color: "#20aee3",
                fontFamily: "Montserrat, sans-serif",
              },
            }}>
            <DataGrid
              className="bg-white rounded-[6px] p-[15px]"
              rows={currentLead}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              getRowId={(row) => console.log(row)}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
              disableColumnMenu
              disableSelectionOnClick
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default Table;
