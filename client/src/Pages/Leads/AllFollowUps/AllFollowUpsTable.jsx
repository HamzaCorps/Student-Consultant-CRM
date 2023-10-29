import * as React from "react";
import { useEffect } from 'react'
import PropTypes from "prop-types";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getFollowUpsStats } from "../../../redux/action/followUp";

const createData = (date, day, followUps = []) => {
  return {
    date,
    day,
    totalFollowUps: followUps.length,
    history: followUps
  };
};

const Row = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <span className="font-primary">{row.date}</span>
        </TableCell>
        <TableCell>
          <span className="font-primary">{row.day}</span>
        </TableCell>
        <TableCell>
          <span className="font-primary">{row.totalFollowUps}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <span className="font-primary text-sky-400">Lead ID</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-primary text-sky-400">Status</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-primary text-sky-400">Created</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-primary text-sky-400">Remarks</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-primary text-sky-400">Next Follow Up</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.history?.map((followUp) => (
                    <TableRow key={followUp.date}>
                      <TableCell>
                        <span className="font-primary text-sky-400 cursor-pointer hover:text-sky-500">
                          {followUp.leadId?.uid || followUp.leadId}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-primary">{followUp.status}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-primary">{new Date(followUp.createdAt).toLocaleDateString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-primary">{followUp.remarks}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-primary">{new Date(followUp.followUpDate).toLocaleDateString()}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    Date: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    totalFollowUps: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        createdDate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        followUpDate: PropTypes.string.isRequired,
        leadId: PropTypes.number.isRequired,
        remarks: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};





const AllFollowUpsTable = () => {

  /////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const dispatch = useDispatch()
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const { followUpsStats } = useSelector(state => state.followUp)
  const rows = followUpsStats?.map((stat) => {
    const dateParts = stat.date.split("/");
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[0]) - 1; // Months in JavaScript are zero-based
    const day = parseInt(dateParts[1]);
    const date = new Date(year, month, day);

    return createData(stat.date, DAYS[date.getDay()], stat.followUps)
  })
  /////////////////////////////////////////////////// STATES ////////////////////////////////////////////////

  /////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getFollowUpsStats())
  }, [])

  /////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////



  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <span className="text-sky-400 font-primary text-lg font-medium">Date</span>
            </TableCell>
            <TableCell>
              <span className="text-sky-400 font-primary text-lg font-medium">Day</span>
            </TableCell>
            <TableCell>
              <span className="text-sky-400 font-primary text-lg font-medium">
                Total Follow Ups
              </span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllFollowUpsTable;
