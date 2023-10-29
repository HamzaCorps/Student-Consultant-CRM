import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const createData = (date, day, totalFollowUps) => {
  return {
    date,
    day,
    totalFollowUps,
    history: [
      {
        leadID: 123,
        status: "Contacted",
        createData: "12/10/2021",
        remarks: "This is a remark",
        followUpDate: "12/10/2021",
      },
      {
        leadID: 123,
        status: "Contacted",
        createData: "12/10/2021",
        remarks: "This is a remark",
        followUpDate: "12/10/2021",
      },
      {
        leadID: 123,
        status: "Contacted",
        createData: "12/10/2021",
        remarks: "This is a remark",
        followUpDate: "12/10/2021",
      },
    ],
  };
};

const Row = (props) => {
  const { row } = props;
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell>
                        <span className="font-primary text-sky-400 cursor-pointer hover:text-sky-500">
                          {historyRow.leadID}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-primary">{historyRow.status}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-primary">{historyRow.createData}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-primary">{historyRow.remarks}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-primary">{historyRow.followUpDate}</span>
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

const rows = [
  createData("29/10/2023", "Sunday", 3),
  createData("30/10/2023", "Monday", 3),
  createData("31/10/2023", "Tuesday", 3),
];

const AllFollowUpsTable = () => {
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
