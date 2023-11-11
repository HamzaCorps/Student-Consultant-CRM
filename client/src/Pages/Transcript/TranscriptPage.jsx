import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import numberToWords from 'number-to-words';
import { useLocation, useNavigate } from "react-router-dom";

const TranscriptPage = () => {
  ////////////////////////////////////// VARIABLES ///////////////////////////////////

  const { state } = useLocation();
  const navigate = useNavigate();
  const pdfRef = useRef();

  ////////////////////////////////////// USE EFFECTS ///////////////////////////////////
  useEffect(() => {
    const downloadPdf = () => {
      const capture = document.querySelector(".completePdfPage");
      html2canvas(capture)
        .then((canvas) => {
          const imgData = canvas.toDataURL("img/png");
          const pdf = new jsPDF("p", "mm", "a2", true);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 100;
          pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          pdf.save("download.pdf");
          navigate("/transcript");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    downloadPdf();
  });

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////

  return (
    <div ref={pdfRef} className="completePdfPage w-full my-4 font-primary">
      <div className="flex justify-center">
        <img className="h-12" src="/background/A-consultant-logo.png" alt="" />
      </div>
      <div className="my-10 flex justify-center">
        <table className="flex flex-col gap-4">
          <tr>
            <th className="px-10 text-lg">Date Of Issue :</th>
            <td className="w-[18rem] text-lg">00/00/0000</td>
            <th className="px-10 text-lg">Employee Name :</th>
            <td className="px-10 text-lg">Demo</td>
          </tr>
          <tr>
            <th className="px-10 text-lg">Salary Month :</th>
            <td className="w-[18rem] text-lg">January</td>
            <th className="px-10 text-lg">Designation :</th>
            <td className="px-10 text-lg">Demo</td>
          </tr>
        </table>
      </div>
      <div className="my-14 flex justify-center">
        <table className="w-full mx-72">
          <tr className="border-b-2 border-black px-10 flex justify-between">
            <th className="text-xl pb-4">Earnings</th>
            <th className="text-xl pb-4">Amount</th>
          </tr>
          <tr className="border-b-[1px] border-gray-700 px-10 pt-2 flex justify-between">
            <td className="text-lg pb-4">Total Salary</td>
            <td className="text-lg pb-4">40000</td>
          </tr>
          <tr className="border-b-[1px] border-gray-700 px-10 pt-2 flex justify-between">
            <td className="text-lg pb-4">Late Comings</td>
            <td className="text-lg pb-4">-200</td>
          </tr>
          <tr className="border-b-[1px] border-gray-700 px-10 pt-2 flex justify-between">
            <td className="text-lg pb-4">Half Days</td>
            <td className="text-lg pb-4">-200</td>
          </tr>
          <tr className="border-b-[1px] border-gray-700 px-10 pt-2 flex justify-between ">
            <td className="text-lg pb-4">Day Offs</td>
            <td className="text-lg pb-4">-200</td>
          </tr>
          <tr className="border-b-[1px] border-gray-700 px-10 pt-9 flex justify-between pb-4"></tr>
          <tr className="border-b-[1px] border-gray-700 px-10 pt-2 flex justify-between">
            <th className="text-lg pb-4">Net Amount</th>
            <td className="text-lg pb-4">39200</td>
          </tr>
        </table>
      </div>
      <div className="flex justify-center pb-10">
        <div className="flex flex-col items-center">
            <div className="text-lg font-semibold">39200</div>
            <div className="text-lg capitalize">{numberToWords.toWords(39200)}</div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptPage;
