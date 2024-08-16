import React, { useEffect, useRef, useState, forwardRef } from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-dropdown";
import {
  fetchFormDetails,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
import { Task } from "../../../../components/Tasks/Task";

type Props = {
  taskData: Task;
};

const UndisbursableTrustMoneyShortPrint = forwardRef(
  ({ taskData }: Props, ref) => {
    const headings = ["Date", "Method", "Other Details"];
    const method = [
      "Written or email correspondence",
      "Inquiry made of other individual",
      "Internet search",
    ];
    const reasons = [
      "Client/payee cannot be located",
      "Client/payee refuses to accept amount",
      "Cheque is stale-dated",
      "Bank error (deposit or cheque cleared at the wrong amount)",
      "Addition/transposition error on trust ledger card",
      "Other",
    ];

    const [sectionA, setSectionA] = useState({
      LawFirmName: "",
      LawFirmAddress: "",
      sectionACity: "",
      sectionAProvince: "",
      sectionAPostalCode: "",
      FaxNumber: "",
      LawFirmTelNum: "",
      Country: "",
      ResponsibleLawyer: "",
      LawFirmEmail: "",
      fileNumberAndMatter: "",
      table: [
        {
          fileNo: 1,
          fileName: "",
          natureOfMatter: "",
          dateReceived: "",
          amount: "",
        },
        {
          fileNo: 1,
          fileName: "",
          natureOfMatter: "",
          dateReceived: "",
          amount: "",
        },
        {
          fileNo: 1,
          fileName: "",
          natureOfMatter: "",
          dateReceived: "",
          amount: "",
        },
        {
          fileNo: 1,
          fileName: "",
          natureOfMatter: "",
          dateReceived: "",
          amount: "",
        },
        {
          fileNo: 1,
          fileName: "",
          natureOfMatter: "",
          dateReceived: "",
          amount: "",
        },
      ],
      NameOfClient: "",
      LastKnownAddress: "",
      City: "",
      Province: "",
      PostalCode: "",
      CorrespondingReasons: [
        {
          reason: "",
          explanation: "",
        },
        {
          reason: "",
          explanation: "",
        },
        {
          reason: "",
          explanation: "",
        },
        {
          reason: "",
          explanation: "",
        },
      ],
      NameOfFirm: "",
      Signature: "",
      Date: "",
    });

    const taskState = taskData;
    const [taskStatus, setTaskStatus] = useState(taskState);
    const handleInputChange = (e) => {
      setSectionA({ ...sectionA, [e.target.name]: e.target.value });
    };

    const saveDocument = () => {
      saveComplianceFormDetails(sectionA, taskState.id);
    };

    useEffect(async () => {
      const { formDetails, isFormFilled } = await fetchFormDetails(
        taskState.id
      );

      if (isFormFilled) {
        setSectionA({ ...formDetails });
      }
    }, []);

    return (
      <Container ref={ref}>
        <div>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html:
                '\n  <!--\n  span.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_006{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_006{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_007{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_007{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_008{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_008{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_010{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_010{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_012{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_012{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_015{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_015{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_016{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_016{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_017{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_017{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_018{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_018{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_011{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_011{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_021{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_021{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  -->\n  ',
            }}
          />
          <div
            id="page_container"
            style={{
              display: "inline",
              height: "auto",
              overflowY: "visible",
              overflowX: "visible",
              background: "white",
              position: "static",
              borderStyle: "outset",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                marginLeft: "-306px",
                top: "0px",
                width: "612px",
                height: "792px",
                borderStyle: "outset",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", left: "0px", top: "0px" }}>
                <img
                  src="https://www.lawsociety.ab.ca/wp-content/themes/law-society/assets/images/lsa-logo.png"
                  className="logo_html"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "371.11px",
                  top: "45.12px",
                }}
                className="cls_003"
              >
                <span className="cls_003">
                  700 333 - 11th Avenue SW Phone: 1.403.229.4700
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "357.43px",
                  top: "54.24px",
                }}
                className="cls_003"
              >
                <span className="cls_003">Calgary, Alberta T2R 1L9</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "465.46px",
                  top: "54.24px",
                }}
                className="cls_003"
              >
                <span className="cls_003">Toll Free: 1.800.661.9003</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "72.60px",
                }}
                className="cls_004"
              >
                <span className="cls_004">
                  ______________________________________________________________________________________________________________________________
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "94.94px",
                }}
                className="cls_005"
              >
                <span className="cls_005">
                  <b>Undisbursable Trust Money - Short Form</b>
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "112.58px",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  <b>(For Client Matters Less than $50 Value)</b>
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "128.97px",
                }}
                className="cls_007"
              >
                <span className="cls_007">Under Section 117 (1) of the </span>
                <span className="cls_008">Legal Profession Act</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "141.57px",
                }}
                className="cls_007"
              >
                <span className="cls_007">Rule 119.27 (1)(a)</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "50.00px",
                  top: "167.06px",
                  border: "1.5px solid black",
                  width: "90%",
                  height: "18%",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "166.58px",
                }}
                className="cls_009"
              >
                <span className="cls_009">Instructions</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "183.26px",
                }}
                className="cls_002"
              >
                <span className="cls_002">
                  1. One form can be used for up to 10 client matters.
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "199.58px",
                }}
                className="cls_002"
              >
                <span className="cls_002">
                  2. The Law Society of Alberta reserves the right to request
                  further information or return the money if it appears
                  insufficient or no attempts have been made to distribute the
                  trust money to the proper parties.
                </span>
              </div>
              {/* <div
              style={{ position: "absolute", left: "68.42px", top: "209.90px" }}
              className="cls_002"
            >
              <span className="cls_002">
                no attempts have been made to distribute the trust money to the
                proper parties.
              </span>
            </div> */}
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "226.10px",
                }}
                className="cls_002"
              >
                <span className="cls_002">
                  3. Under Section 117(1) of the Legal Profession Act, the Law
                  Society cannot accept any money unless it has been held in
                  trust by the law firm for a period not less than 2 years.
                </span>
                {/* <span className="cls_010">Legal Profession Act</span>
              <span className="cls_002">
                , the Law Society cannot accept any money unless it has been
                held in
              </span> */}
              </div>
              {/* <div
              style={{ position: "absolute", left: "68.42px", top: "236.66px" }}
              className="cls_002"
            >
              <span className="cls_002">
                trust by the law firm for a period not less than 2 years.
              </span>
            </div> */}
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "253.01px",
                }}
                className="cls_002"
              >
                <span className="cls_002">
                  4. A member practising as a sole practitioner is a “Law Firm”
                  as defined in the Rules.
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "269.09px",
                }}
                className="cls_009"
              >
                <span className="cls_009">
                  5. Please make cheque payable to the Law Society of Alberta.
                </span>
                <span className="cls_002">
                  {" "}
                  Please send this form and the cheque to the Calgary office,
                  Attention: Accounting Department.
                </span>
              </div>
              {/* <div
              style={{ position: "absolute", left: "68.42px", top: "279.65px" }}
              className="cls_002"
            >
              <span className="cls_002">
                office, Attention: Accounting Department.
              </span>
            </div> */}
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "296.09px",
                }}
                className="cls_002"
              >
                <span className="cls_002">
                  Note: All questions on this form must be answered.
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "339.65px",
                }}
                className="cls_012"
              >
                <span className="cls_012">
                  SECTION A - LAW FIRM INFORMATION
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "366.65px",
                }}
                className="cls_002"
              >
                <span className="cls_002">1.</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "81.26px",
                  top: "366.65px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Law Firm Name:</span>
                <input
                  className="htmlInput"
                  id="lawFirmName"
                  name="LawFirmName"
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.LawFirmName}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "384.41px",
                }}
                className="cls_002"
              >
                <span className="cls_002">2.</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "81.26px",
                  top: "384.41px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Law Firm Address:</span>
                <input
                  className="htmlInput"
                  id="lawFirmAddress"
                  name="LawFirmAddress"
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.LawFirmAddress}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "81.26px",
                  top: "402.29px",
                }}
                className="cls_002"
              >
                <span className="cls_002">City:</span>
                <input
                  className="htmlInput htmlInput_m"
                  id="sectionACity"
                  name="sectionACity"
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.sectionACity}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "327.53px",
                  top: "402.29px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Province:</span>
                <input
                  className="htmlInput htmlInput_s"
                  id="sectionAProvince"
                  name="sectionAProvince"
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.sectionAProvince}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "432.91px",
                  top: "402.29px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Postal Code:</span>
                <input
                  className="htmlInput htmlInput_s"
                  id="sectionAPostal"
                  name="sectionAPostalCode"
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.sectionAPostalCode}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "420.17px",
                }}
                className="cls_002"
              >
                <span className="cls_002">3.</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "81.26px",
                  top: "420.17px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Law Firm Telephone</span>
                <input
                  className="htmlInput htmlInput_s"
                  id="sectionALawFirmTelephone"
                  name="LawFirmTelNum"
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.LawFirmTelNum}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "305.69px",
                  top: "420.17px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Fax Number:</span>
                <input
                  className="htmlInput htmlInput_s"
                  id="sectionALawFirmTelephone"
                  name="FaxNumber"
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.FaxNumber}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "81.26px",
                  top: "430.51px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Number:</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "446.83px",
                }}
                className="cls_002"
              >
                <span className="cls_002">4.</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "81.26px",
                  top: "446.83px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Responsible</span>
                <input
                  className="htmlInput"
                  id="sectionALawyerResponsible"
                  name="ResponsibleLawyer"
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.ResponsibleLawyer}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "81.26px",
                  top: "457.15px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Lawyer:</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "473.59px",
                }}
                className="cls_002"
              >
                <span className="cls_002">5.</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "81.26px",
                  top: "473.59px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Law Firm Email:</span>
                <input
                  className="htmlInput "
                  id="sectionALawFirmEmail"
                  name="LawFirmEmail"
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.LawFirmEmail}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "515.35px",
                }}
                className="cls_012"
              >
                <span className="cls_012">SECTION B - FINANCIAL DETAILS</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "262.85px",
                  top: "541.99px",
                }}
                className="cls_009"
              >
                <span className="cls_009">TABLE OF TRUST MONEY</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "80.66px",
                  top: "558.55px",
                }}
                className="cls_002 w-100"
              >
                <table
                  style={{
                    position: "absolute",
                    left: "-52.34px",
                    top: "-7.75px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "none",
                        position: "relative",
                        left: "-15px",
                      }}
                    >
                      <th className="htmlText">File #</th>
                      <th className="htmlText">File Name</th>
                      <th className="htmlText">Nature of Matter</th>
                      <th className="htmlText">Date Received</th>
                      <th className="htmlText">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sectionA.table.map((e, index) => {
                      return (
                        <tr style={{ border: "none" }}>
                          <td
                            className="htmlText"
                            style={{ padding: "0.3rem 1rem" }}
                          >
                            {" "}
                            {index + 1}{" "}
                            <input
                              className="htmlInput htmlInput_s"
                              value={e.fileNo}
                              onChange={(event) => {
                                const tableData = sectionA.table;

                                tableData[index].fileNo = event.target.value;

                                setSectionA({ ...sectionA, table: tableData });
                              }}
                            />
                          </td>
                          <td
                            className="htmlText"
                            style={{ padding: "0.3rem 1rem" }}
                          >
                            <input
                              className="htmlInput htmlInput_s"
                              value={e.fileName}
                              onChange={(event) => {
                                const tableData = sectionA.table;

                                tableData[index].fileName = event.target.value;

                                setSectionA({ ...sectionA, table: tableData });
                              }}
                            />
                          </td>
                          <td
                            className="htmlText"
                            style={{ padding: "0.3rem 1rem" }}
                          >
                            <input
                              className="htmlInput htmlInput_s"
                              value={e.natureOfMatter}
                              onChange={(event) => {
                                const tableData = sectionA.table;

                                tableData[index].natureOfMatter =
                                  event.target.value;

                                setSectionA({ ...sectionA, table: tableData });
                              }}
                            />
                          </td>
                          <td
                            className="htmlText"
                            style={{ padding: "0.3rem 1rem" }}
                          >
                            <input
                              className="htmlInput htmlInput_s"
                              value={e.dateReceived}
                              onChange={(event) => {
                                const tableData = sectionA.table;

                                tableData[index].dateReceived =
                                  event.target.value;

                                setSectionA({ ...sectionA, table: tableData });
                              }}
                            />
                          </td>
                          <td
                            className="htmlText"
                            style={{ padding: "0.3rem 1rem" }}
                          >
                            <input
                              className="htmlInput htmlInput_s"
                              value={e.amount}
                              onChange={(event) => {
                                const tableData = sectionA.table;

                                tableData[index].amount = event.target.value;

                                setSectionA({ ...sectionA, table: tableData });
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "702.34px",
                }}
                className="cls_016"
              >
                <span className="cls_016">
                  The information provided in this form will be used by the Law
                  Society of Alberta for one or more purposes contemplated by
                  the Legal Profession Act, the Rules of the Law Society, the
                  Code of Conduct, or a resolution of the Benchers and will be
                  accessible to all departments of the Law Society, including
                  the Alberta Lawyers Insurance Association. The information may
                  be used or disclosed by the Law Society of Alberta, now or in
                  the future, for regulatory purposes, including Law Society of
                  Alberta investigations and proceedings. We may contact you to
                  obtain additiona l information, or to obtain clarification on
                  the information you provided. Should you have any questions
                  about this, please contact the Privacy Officer at
                  403-229-4700.
                </span>
                {/* <span className="cls_017">Legal Profession Act</span>
              <span className="cls_016">
                , the Rules of the Law Society, the Code of Conduct, or a
              </span> */}
              </div>
              {/* <div
              style={{ position: "absolute", left: "54.00px", top: "708.82px" }}
              className="cls_016"
            >
              <span className="cls_016">
                resolution of the Benchers and will be accessible to all
                departments of the Law Society, including the Alberta Lawyers
                Insurance Association. The information may be used or disclosed
                by the Law Society of
              </span>
            </div> */}
              {/* <div
              style={{ position: "absolute", left: "54.00px", top: "715.18px" }}
              className="cls_016"
            >
              <span className="cls_016">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to obtain additiona l information, or to
                obtain clarification on the
              </span>
            </div> */}
              {/* <div
              style={{ position: "absolute", left: "54.00px", top: "721.42px" }}
              className="cls_016"
            >
              <span className="cls_016">
                information you provided. Should you have any questions about
                this, please contact the Privacy Officer at 403-229-4700.
              </span>
            </div> */}
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "726.82px",
                }}
                className="cls_004"
              >
                <span className="cls_004">
                  ______________________________________________________________________________________________________________________________
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "736.06px",
                }}
                className="cls_018"
              >
                <span className="cls_018">December 2015</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "290.45px",
                  top: "736.06px",
                }}
                className="cls_018"
              >
                <span className="cls_018">Page 1 of 2</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "487.54px",
                  top: "736.06px",
                }}
                className="cls_018"
              >
                <span className="cls_018"> </span>
                <a href="http://www.lawsociety.ab.ca/">
                  www.lawsociety.ab.ca
                </a>{" "}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                marginLeft: "-306px",
                top: "802px",
                width: "612px",
                height: "792px",
                borderStyle: "outset",
                overflow: "hidden",
              }}
            >
              {/* <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="064fec86-82e9-11ec-a980-0cc47a792c0a_id_064fec86-82e9-11ec-a980-0cc47a792c0a_files/background2.jpg"
                width={612}
                height={792}
              />
            </div> */}
              <div
                style={{
                  position: "absolute",
                  left: "468.10px",
                  top: "34.56px",
                }}
                className="cls_018"
              >
                <span className="cls_018">Undisbursable Trust Money</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "39.24px",
                }}
                className="cls_018"
              >
                <span className="cls_018">Law Society of Alberta</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "520.42px",
                  top: "43.80px",
                }}
                className="cls_018"
              >
                <span className="cls_018">Short Form</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "53.16px",
                }}
                className="cls_004"
              >
                <span className="cls_004">
                  ______________________________________________________________________________________________________________________________
                </span>
              </div>

              <div style={{ position: "relative", top: "-127px" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "255.53px",
                    top: "204.38px",
                  }}
                  className="cls_009"
                >
                  <span className="cls_009">CORRESPONDING REASONS</span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "80.66px",
                    top: "221.06px",
                  }}
                  className="cls_002"
                >
                  <table>
                    <thead>
                      <tr style={{ border: "none", borderBottom: "none" }}>
                        <th className="htmlText">Reason</th>
                        <th className="htmlText">Explanation</th>
                      </tr>
                    </thead>

                    <tbody>
                      {sectionA.CorrespondingReasons.map((e, index) => {
                        return (
                          <tr
                            style={{
                              borderBottom: "none !important",
                            }}
                          >
                            <td
                              style={{
                                width: "25rem",
                                padding: "0.1rem",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <span className="htmlText">{index + 1}. </span>
                              <Dropdown
                                className="htmlText htmlDropdown "
                                options={reasons}
                                onChange={(event) => {
                                  const tableData =
                                    sectionA.CorrespondingReasons;
                                  tableData[index].reason = event.value;
                                  setSectionA({
                                    ...sectionA,
                                    CorrespondingReasons: tableData,
                                  });
                                }}
                                value={e.reason}
                              />
                            </td>
                            <td
                              style={{
                                padding: "0.1rem",
                              }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  fontSize: "9.1px",
                                  left: "250px",
                                  border: "1px solid #ccc",
                                  borderRadius: "2rem",
                                  padding: "1rem",
                                  top: 30 + index * 45 + "px",
                                }}
                              >
                                <input
                                  id="explanation"
                                  type="text"
                                  name="explanation"
                                  className="htmlInput htmlInput_m"
                                  value={e.explanation}
                                />
                              </div>
                              {/* <Dropdown
                              className="htmlText htmlDropdown"
                              options={method}
                              // onChange={(event) => {
                              //   const tableData = sectionA.CorrespondingReasons;
                              //   tableData[index].explanation = event.value;
                              //   setSectionA({
                              //     ...sectionA,
                              //     CorrespondingReasons: tableData,
                              //   });
                              // }}
                              value={e.explanation}
                            /> */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: "54.00px",
                    top: "455.51px",
                  }}
                  className="cls_012"
                >
                  <span className="cls_012">
                    SECTION C - LAWYER CERTIFICATION
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "80.18px",
                    top: "472.51px",
                  }}
                  className="cls_002"
                >
                  <span className="cls_002">I, </span>
                  <input
                    className="htmlInput "
                    id="certificationName"
                    name="NameOfFirm"
                    onChange={(e) => handleInputChange(e)}
                    value={sectionA.NameOfFirm}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "321.65px",
                    top: "472.51px",
                  }}
                  className="cls_002"
                >
                  <span className="cls_002">
                    , certify that the foregoing information is complete
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "80.18px",
                    top: "490.39px",
                  }}
                  className="cls_002"
                >
                  <span className="cls_002">
                    and correct to the best of my knowledge.
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "80.66px",
                    top: "540.79px",
                  }}
                  className="cls_011"
                >
                  {/* <span className="cls_011">Date </span>
                <span className="cls_015">(mm/dd/yyyy)</span> */}
                  <input
                    className="htmlInput htmlInput_s"
                    id="certificationDate"
                    name="Date"
                    onChange={(e) => handleInputChange(e)}
                    value={sectionA.Date}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "80.66px",
                    top: "560.79px",
                  }}
                  className="cls_011"
                >
                  <span className="cls_011">Date </span>
                  <span className="cls_015">(mm/dd/yyyy)</span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "272.09px",
                    top: "539.95px",
                  }}
                  className="cls_002"
                >
                  <span className="cls_002">Signature of Lawyer</span>
                  <input
                    className="htmlInput htmlInput_m"
                    id="certificationSignature"
                    name="Signature"
                    onChange={(e) => handleInputChange(e)}
                    value={sectionA.Signature}
                  />
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "660.34px",
                }}
                className="cls_020"
              >
                <span className="cls_020">
                  The information provided in this form will be used by the Law
                  Society of Alberta for one or more purposes contemplated by
                  the Legal Profession Act, the Rules of the Law Society, the
                  Code of Conduct, or a resolution of the Benchers and will be
                  accessible to all departments of the Law Society, including
                  the Alberta Lawyers Insurance Association. The information may
                  be used or disclosed by the Law Society of Alberta, now or in
                  the future, for regulatory purposes, including Law Society of
                  Alberta investigations and proceedings. We may contact you to
                  obtain additional information, or to obtain clarification on
                  the information you provided. Should you have any questions
                  about this, please contact the Privacy Officer at
                  403-229-4700.
                </span>
                {/* <span className="cls_021">Legal</span> */}
              </div>
              {/* <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "669.46px",
              }}
              className="cls_021"
            >
              <span className="cls_021">Profession Act</span>
              <span className="cls_020">
                , the Rules of the Law Society, the Code of Conduct, or a
                resolution of the Benchers and will be accessible to all
                departments of
              </span>
            </div> */}
              {/* <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "678.70px",
              }}
              className="cls_020"
            >
              <span className="cls_020">
                the Law Society, including the Alberta Lawyers Insurance
                Association. The information may be used or disclosed by the Law
                Society of
              </span>
            </div> */}
              {/* <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "687.94px",
              }}
              className="cls_020"
            >
              <span className="cls_020">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to
              </span>
            </div> */}
              {/* <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "697.06px",
              }}
              className="cls_020"
            >
              <span className="cls_020">
                obtain additional information, or to obtain clarification on the
                information you provided. Should you have any questions about
                this, please
              </span>
            </div> */}
              {/* <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "706.42px",
              }}
              className="cls_020"
            >
              <span className="cls_020">
                contact the Privacy Officer at 403-229-4700.
              </span>
            </div> */}
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "726.82px",
                }}
                className="cls_004"
              >
                <span className="cls_004">
                  ______________________________________________________________________________________________________________________________
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "736.06px",
                }}
                className="cls_018"
              >
                <span className="cls_018">December 2015</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "290.45px",
                  top: "736.06px",
                }}
                className="cls_018"
              >
                <span className="cls_018">Page 2 of 2</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "487.54px",
                  top: "736.06px",
                }}
                className="cls_018"
              >
                <span className="cls_018"> </span>
                <a href="http://www.lawsociety.ab.ca/">
                  www.lawsociety.ab.ca
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </Container>
    );

    // return (
    //   <ComplianceFormLayout title="Undisbursable Trust Money – Long Form">
    //     <h1> Undisbursable Trust Money – Short Form</h1>
    //     <h4>(For Client Matters Less than $50 Value)</h4>
    //     <h4>
    //       Under Section 117 (1) of the Legal Profession Act Rule 119.27 (1)(b)
    //     </h4>

    //     <h4 className="fw-bold section_separator py-3 px-2">
    //       SECTION A – LAW FIRM INFORMATION
    //     </h4>

    //     <InputCustom
    //       label="Law Firm Name"
    //       handleChange={(e) =>
    //         setSectionA({ ...sectionA, LawFirmName: e.target.value })
    //       }
    //       type="text"
    //       margin="1.8rem 0rem"
    //       value={sectionA.LawFirmName}
    //     />

    //     <InputCustom
    //       label="Law Firm Address"
    //       handleChange={(e) =>
    //         setSectionA({ ...sectionA, LawFirmAddress: e.target.value })
    //       }
    //       type="text"
    //       margin="0.9rem 0rem"
    //       value={sectionA.LawFirmAddress}
    //     />

    //     <div className="d-flex">
    //       <InputCustom
    //         label="City"
    //         handleChange={(e) =>
    //           setSectionA({ ...sectionA, City: e.target.value })
    //         }
    //         type="text"
    //         margin="1rem 0.7rem 0.4rem 0"
    //         value={sectionA.City}
    //       />
    //       <InputCustom
    //         label="Province"
    //         handleChange={(e) =>
    //           setSectionA({ ...sectionA, Province: e.target.value })
    //         }
    //         type="text"
    //         margin="1rem 0.7rem 0.4rem 0"
    //         value={sectionA.Province}
    //       />
    //       <InputCustom
    //         label="Postal Code"
    //         handleChange={(e) =>
    //           setSectionA({ ...sectionA, PostalCode: e.target.value })
    //         }
    //         type="text"
    //         margin="1rem 0rem 0.4rem 0"
    //         value={sectionA.PostalCode}
    //       />
    //     </div>
    //     <InputCustom
    //       label="Law Firm telephone number"
    //       handleChange={(e) =>
    //         setSectionA({ ...sectionA, Country: e.target.value })
    //       }
    //       type="text"
    //       margin="1.3rem 0.4rem 0.7rem 0rem "
    //       value={sectionA.Country}
    //     />

    //     <div className="d-flex">
    //       <InputCustom
    //         label="Law Firm telephone Number"
    //         handleChange={(e) =>
    //           setSectionA({ ...sectionA, LawFirmTelNum: e.target.value })
    //         }
    //         type="text"
    //         margin="1rem 0.4rem 0.7rem 0rem "
    //         value={sectionA.LawFirmTelNum}
    //       />

    //       <InputCustom
    //         label="Fax Number"
    //         handleChange={(e) =>
    //           setSectionA({ ...sectionA, FaxNumber: e.target.value })
    //         }
    //         type="text"
    //         margin="1rem 0.4rem 0.7rem 0rem "
    //         value={sectionA.FaxNumber}
    //       />
    //     </div>

    //     <InputCustom
    //       label="Responsible Lawyer"
    //       handleChange={(e) =>
    //         setSectionA({ ...sectionA, ResponsibleLawyer: e.target.value })
    //       }
    //       type="text"
    //       margin="1rem 0.4rem 0 0rem "
    //       value={sectionA.ResponsibleLawyer}
    //     />

    //     <InputCustom
    //       label="Law Firm Email"
    //       handleChange={(e) =>
    //         setSectionA({ ...sectionA, LawFirmEmail: e.target.value })
    //       }
    //       type="text"
    //       margin="1.8rem 0rem "
    //       value={sectionA.LawFirmEmail}
    //     />

    //     <h4 className="fw-bold section_separator py-3 px-2">
    //       SECTION B – FINANCIAL DETAILS
    //     </h4>

    //     <div className="heading-normal section_separator py-3 px-2 text-center">
    //       TABLE OF TRUST MONEY
    //     </div>

    //     <table>
    //       <thead>
    //         <tr>
    //           <td className="fw-bold">File #</td>
    //           <td className="fw-bold">File Name</td>
    //           <td className="fw-bold">Nature of Matter</td>
    //           <td className="fw-bold">Date Received</td>
    //           <td className="fw-bold">Amount</td>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>clio Matter</td>
    //           <td>clio Matter</td>
    //           <td>
    //             <Dropdown
    //               className="my-4 heading-5"
    //               options={method}
    //               onChange={(e) => {
    //                 console.log("e", e);
    //                 // const sectionCDup = sectionC;
    //                 // sectionCDup.details[0].reason = e;
    //                 // setSectionC(sectionCDup);
    //               }}
    //               value={sectionB.TableTrustDetails[0].natureOfMatter}
    //             ></Dropdown>
    //           </td>
    //           <td>Date Received </td>
    //           <td>Amount </td>
    //         </tr>
    //       </tbody>
    //     </table>

    //     <div className="section_separator heading-normal py-3 px-2 text-center">
    //       CORRESPONDING REASONS
    //     </div>

    //     <table>
    //       <thead>
    //         <tr>
    //           <td>Reason</td>
    //           <td>Explanation of Other</td>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>
    //             <Dropdown
    //               className="my-4 heading-5"
    //               options={reasons}
    //               onChange={(e) => {
    //                 console.log("e", e);
    //               }}
    //               value={sectionB.CorrespondingReasons[0].Method}
    //             ></Dropdown>
    //           </td>
    //           <td>Date Received </td>
    //         </tr>
    //       </tbody>
    //     </table>

    //     <h4 className="fw-bold section_separator py-3 px-2">
    //       SECTION C – LAWYER CERTIFICATION
    //     </h4>

    //     <Signature
    //       SignatureOf="Signature of Lawyer"
    //       sectionD={sectionE}
    //       setSectionD={setSectionE}
    //     />
    //   </ComplianceFormLayout>
    // );
  }
);

export default UndisbursableTrustMoneyShortPrint;
