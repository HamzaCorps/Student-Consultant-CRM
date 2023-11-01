import React, { useEffect, useRef, useState } from "react";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import { createVoucher } from "../../redux/action/voucher";
import { getClients } from "../../redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import JsBarcode from "jsbarcode";
import VoucherPage from "./VoucherPage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CreateVoucher = ({ open, setOpen, scroll, downloadPdf, loader }) => {
  ////////////////////////////////////// VARIBALES ///////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clients } = useSelector((state) => state.user);
  const initialVoucherState = {
    branch: "",
    issuingDate: "",
    dueDate: "",
    clientName: "",
    CNIC: "",
    phone: "",
    degree: "",
    project: "Null",
    major: "",
    visa: "",
    type: "",
    total: "",
    paid: "",
    remained: "",
  };

  ////////////////////////////////////// STATES //////////////////////////////////////
  const [modalVisible, setModalVisible] = useState(false);
  const [isVoucherCreated, setIsVoucherCreated] = useState(false);
  const [voucherData, setVoucherData] = useState(initialVoucherState);

  ////////////////////////////////////// Use Effects ///////////////////////////////////////////
  useEffect(() => {
    dispatch(getClients());
  }, [open]);

  ////////////////////////////////////// FUNCTIONS ////////////////////////////////////////
  const handleChange = (field, value) => {
    setVoucherData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleDownloadPDF = (e) => {
    e.preventDefault();
    const {
      branch,
      issuingDate,
      dueDate,
      clientName,
      phone,
      type,
      total,
      paid,
      degree,
      visa,
      remained,
      major,
    } = voucherData;
    if (
      !branch ||
      !visa ||
      !degree ||
      !issuingDate ||
      !dueDate ||
      !clientName ||
      !phone ||
      !type ||
      !total ||
      !paid ||
      !remained ||
      !major
    )
      return alert("Make sure to provide all the fields");

    navigate("/download/voucher", {
      state: { voucher: { ...voucherData, remained: total - paid } },
    });
    dispatch(createVoucher(voucherData, setOpen));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const majorSubjects = [
    "Business and Management",
    "Computer Science",
    "Engineering",
    "Health and Medicine",
    "Social Sciences",
    "Natural Sciences",
    "Arts and Humanities",
    "Law",
    "Education",
    "Environmental Studies",
  ];

  const degrees = ["Bachelors", "Masters", "MPhil", "PhD"];

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
          <div className="text-sky-400 font-primary">Add New Voucher</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 pb-0 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Voucher Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Voucher Number </td>
                <td className="pb-4">
                  <TextField
                    name="branch"
                    value={voucherData.branch}
                    onChange={(e) => handleChange("branch", e.target.value)}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Date of Issue </td>
                <td className="pb-4">
                  <TextField
                    type="date"
                    name="issuingDate"
                    value={voucherData.issuingDate}
                    onChange={(e) => handleChange("issuingDate", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Due Date </td>
                <td className="pb-4">
                  <TextField
                    name="dueDate"
                    value={voucherData.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                    size="small"
                    type="date"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Customer Name </td>
                <td className="pb-4">
                  <TextField
                    name="clientName"
                    onChange={(e) => handleChange("clientName", e.target.value)}
                    value={voucherData.clientName}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">CNIC </td>
                <td className="pb-4">
                  <TextField
                    name="CNIC"
                    value={voucherData.CNIC}
                    onChange={(e) => handleChange("CNIC", e.target.value)}
                    size="small"
                    type="number"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    name="phone"
                    value={voucherData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Degree </td>
                <td className="pb-4">
                  <CFormSelect
                    value={voucherData.degree}
                    onChange={(e) => {
                      handleChange("degree", e.target.value);
                    }}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value={""}>None</option>
                    {degrees.map((project, key) => (
                      <option key={key} value={project}>
                        {project}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Major </td>
                <td className="pb-4">
                  <CFormSelect
                    value={voucherData.major}
                    onChange={(e) => handleChange("major", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value={""}>None</option>
                    {majorSubjects.map((subject, key) => (
                      <option key={key} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Visa </td>
                <td className="pb-4">
                  <CFormSelect
                    value={voucherData.visa}
                    onChange={(e) => handleChange("visa", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value={""}>None</option>
                    <option value="studentVisa">Student Visa</option>
                    <option value="VisitVisa">Visit Visa</option>
                    <option value="WorkVisa">Work Visa</option>
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Payment Type </td>
                <td className="pb-4">
                  <CFormSelect
                    value={voucherData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value={""}>None</option>
                    <option value={"cash"}>Cash</option>
                    <option value={"cheque"}>Cheque</option>
                    <option value={"card"}>Card</option>
                    <option value={"online"}>Online</option>
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Total Amount </td>
                <td className="pb-4">
                  <TextField
                    name="total"
                    value={voucherData.total}
                    onChange={(e) => handleChange("total", e.target.value)}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Amount Paying </td>
                <td className="pb-4">
                  <TextField
                    name="paid"
                    value={voucherData.paid}
                    onChange={(e) => handleChange("paid", e.target.value)}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Remainig Amount </td>
                <td className="pb-4">
                  <TextField
                    disabled
                    name="remained"
                    value={voucherData.remained = voucherData.total - voucherData.paid}
                    onChange={(e) => handleChange("remained", e.target.value)}
                    size="small"
                    type="text"
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
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            // onClick={downloadPdf}
            onClick={handleDownloadPDF}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {loader ? <span>Downloading</span> : <span>Download</span>}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateVoucher;
