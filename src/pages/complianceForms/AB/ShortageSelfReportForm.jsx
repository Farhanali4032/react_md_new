import React, { useEffect, useRef, useState } from "react";
import ComplianceFormLayout from "../ComplianceFormLayout.tsx";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  assignValues,
  fetchFormDetails,
  fetchLawyerResponsible,
  getCompanyInfo,
  getUserSID,
  saveComplianceFormDetails,
  saveValues,
} from "../../../utils/helpers";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router";
import ShortageSelfReportFormPrint from "./print/ShortageSelfReportFormPrint";

const ShortageSelfReportForm = () => {
  const compliancePDF = useRef(null);
  const reasons = [
    "Overpayment",
    "Wrong trust bank Account",
    "Wrong client account",
    "Deposit NSF",
    "Bank error/service charges",
    "Cheque issued before deposit",
    "Deposit made to general",
    "Conterfeit/fradulent cheque",
    "Clerical Error",
    "Others",
  ];

  const headings = [
    "Date Discovered",
    "Date Occured",
    "Date Corrected",
    "Amount",
    "Reason (Select one of the following)",
  ];

  const dispatch = useDispatch();
  const history = useHistory();
  const taskState = history.location.state;
  const [taskStatus, setTaskStatus] = useState(taskState);
  const [sectionA, setSectionA] = useState({
    // LawFirmName: getCompanyInfo().companyname,
    LawFirmName: "",
    // LawFirmAddress: getCompanyInfo().legaladdress.Line1,
    LawFirmAddress: "",
    // City: getCompanyInfo().legaladdress.CountrySubDivisionCode,
    City: "",
    Province: "",
    // Province: getCompanyInfo().legaladdress.CountrySubDivisionCode,
    // PostalCode: getCompanyInfo().legaladdress.PostalCode,
    PostalCode: "",
    // Country: getCompanyInfo().legaladdress.Country,
    sectionACountry: "",
    LawFirmTelNum: "",
    LawyerResponsibleForFile: "",
    LawFirmResponsibleLawyer: "",

    fileNumberAndMatter: "",
    NameOfClient: "",
    LastKnownAddress: "",
    sectionBCity: "",
    sectionBProvince: "",
    sectionBPostalCode: "",
    sectionBCountry: "",

    ClaimAmount: 0,
    furtherExplanation: "",
    details: [
      {
        dateDiscovered: "",
        dateOccured: "",
        dateCorrected: "",
        Amount: 0,
        reason: "",
      },
    ],
    CertifyName: "",
    Date: "",
    Signature: "",
  });

  // const changeInputInDetails = (e, index, key) => {
  //   const details = sectionC.details;
  //   details[index][key] = e.target.value;

  //   setSectionC({
  //     ...sectionC,
  //     details: details,
  //   });
  // };

  // const types = sectionC.details.map((e, index) => {
  //   return (
  //     <tr>
  //       <td style={{ padding: "0.3rem" }}>
  //         <InputCustom
  //           handleChange={(event) => {
  //             changeInputInDetails(event, index, "dateDiscovered");
  //           }}
  //           type="date"
  //           margin="1.8rem 0rem"
  //           value={sectionC.details[index].dateDiscovered}
  //         />
  //       </td>
  //       <td style={{ padding: "0.3rem" }}>
  //         <InputCustom
  //           handleChange={(event) => {
  //             changeInputInDetails(event, index, "dateOccured");
  //           }}
  //           type="date"
  //           margin="1.8rem 0rem"
  //           value={sectionC.details[index].dateOccured}
  //         />
  //       </td>

  //       <td style={{ padding: "0.3rem" }}>
  //         <InputCustom
  //           handleChange={(event) => {
  //             changeInputInDetails(event, index, "dateCorrected");
  //           }}
  //           type="date"
  //           margin="1.8rem 0rem"
  //           value={sectionC.details[index].dateCorrected}
  //         />
  //       </td>

  //       <td style={{ padding: "0.3rem" }}>
  //         <InputCustom
  //           handleChange={(event) => {
  //             changeInputInDetails(event, index, "Amount");
  //           }}
  //           type="number"
  //           margin="1.8rem 0rem"
  //           value={sectionC.details[index].Amount}
  //         />
  //       </td>

  //       <td style={{ padding: "0.3rem" }}>
  //         <Dropdown
  //           className="my-4 heading-5"
  //           options={reasons}
  //           onChange={(e) => {
  //             const details = sectionC.details;
  //             details[index]["reason"] = e.value;

  //             setSectionC({
  //               ...sectionC,
  //               details: details,
  //             });
  //           }}
  //           value={sectionC.details[index].reason}
  //         ></Dropdown>
  //       </td>
  //       <td style={{ padding: "0.3rem" }}>
  //         <img
  //           src={DeleteIcon}
  //           alt=""
  //           onClick={(e) => {
  //             console.log("e", index);
  //             const details = sectionC.details;
  //             const deleteRow = details.splice(index, 1);
  //             console.log("delete", deleteRow);
  //             setSectionC({ ...sectionC, details: details });
  //           }}
  //         />
  //       </td>
  //     </tr>
  //   );
  // });

  // const { headers, rows } = useTable({
  //   headings: headings,
  //   data: sectionC.details,
  //   isEditable: true,
  //   typeOfArray: types,
  // });

  // console.log("headers, ", headers);
  // console.log("rows, ", rows);

  useEffect(async () => {
    console.log("history.location.state", history.location.state);
    const { formDetails, isFormFilled } = await fetchFormDetails(taskState.id);

    const lawyerInformation = await fetchLawyerResponsible(
      getUserSID(),
      taskState.task_account
    );

    if (isFormFilled) {
      setSectionA({
        ...formDetails,
      });
    } else if (lawyerInformation) {
      setSectionA({
        ...sectionA,
        LawyerResponsibleForFile: lawyerInformation.responsible_attorney_name,
      });
    }
  }, []);

  const saveDocument = () => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };

  const printDocument = useReactToPrint({
    content: () => compliancePDF.current,
  });

  // useEffect(async () => {
  //   const clientMatterAPI = axios.get(
  //     `/clientMatter/${getUserSID()}/1355552671`
  //   );
  //   const clientContactAPI = axios.get(
  //     `/clientContact/${getUserSID()}/1355552671`
  //   );

  //   Promise.all([clientMatterAPI, clientContactAPI])
  //     .then(([clientMatter, clientContact]) => {
  //       const {
  //         data: {
  //           data: {
  //             code: clientMatterCode,
  //             status: clientMatterStatus,
  //             body: clientMatterBody,
  //           },
  //         },
  //       } = clientMatter;

  //       const {
  //         data: {
  //           data: {
  //             code: clientContactCode,
  //             status: clientContactStatus,
  //             body: clientContactBody,
  //           },
  //         },
  //       } = clientContact;

  //       if (clientContactCode === 200 && clientMatterCode === 200) {
  //         setSectionA({
  //           ...sectionA,
  //           LawyerResponsibleForFile:
  //             clientMatterBody[0]?.responsible_attorney_name,
  //           LawFirmResponsibleLawyer:
  //             clientMatterBody[0]?.originating_attorney_name,
  //         });

  //         setSectionB({
  //           ...sectionB,
  //           fileNumberAndMatter:
  //             clientMatterBody[0]?.matter_display_nbr +
  //             " " +
  //             clientMatterBody[0]?.matter_description,

  //           NameOfClient: clientContactBody[0]?.client_name,
  //           LastKnownAddress: clientContactBody[0]?.street || "N/A",
  //           City: clientContactBody[0]?.city || "N/A",
  //           Province: clientContactBody[0]?.province || "N/A",
  //           PostalCode: clientContactBody[0]?.postal_code || "N/A",
  //           Country: clientContactBody[0]?.country || "N/A",
  //         });

  //         setSectionD({
  //           ...sectionD,
  //           CertifyName: clientMatterBody[0]?.responsible_attorney_name,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //       alert("Server Error");
  //     });

  // const {
  //   data: {
  //     data: { code, status, body },
  //   },
  // } = await fetchRequest("get", `clientMatter/${getUserSID()}/1355552671`);

  // console.log("data", body);
  // if (code === 200 && status !== "error" && body.length > 0) {
  //   setSectionA({
  //     ...sectionA,
  //     LawyerResponsibleForFile: body[0]?.responsible_attorney_name,
  //     LawFirmResponsibleLawyer: body[0]?.originating_attorney_name,
  //   });

  //   setSectionB({
  //     ...sectionB,
  //     fileNumberAndMatter:
  //       body[0]?.matter_display_nbr + " " + body[0]?.client_name,
  //   });

  //   setSectionD({
  //     ...sectionD,
  //     CertifyName: body[0]?.responsible_attorney_name,
  //   });
  // } else {
  // }
  // }, []);

  const handleInputChange = (e) => {
    setSectionA({ ...sectionA, [e.target.name]: e.target.value });
  };

  return (
    <ComplianceFormLayout
      saveDocument={saveDocument}
      printDocument={printDocument}
      formState={sectionA}
      setFormState={(obj) => {
        setSectionA({ ...sectionA, ...obj });
      }}
      taskStatus={taskStatus}
      setTaskStatus={(obj) => {
        setTaskStatus({ ...taskStatus, ...obj });
      }}
      title="Trust Account and Client Ledger Shortages"
    >
      <div style={{ display: "none" }}>
        <ShortageSelfReportFormPrint taskData={taskState} ref={compliancePDF} />
      </div>
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '\n  <!--\n  span.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_006{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_006{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_007{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_007{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_008{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,255);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_008{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,255);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_010{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_010{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_013{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_013{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_014{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_014{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_015{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_015{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_017{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_017{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_019{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_019{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  -->\n  ',
          }}
        />
        <div
          id="page_container"
          style={{
            height: "510px",
            overflowY: "scroll",
            overflowX: "hidden",
            background: "white",
            position: "absolute",
            left: "45%",
            top: "50%",
            transform: "translate(-50%, -45%) scale(1.2)",
            width: "612px",
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
              style={{ position: "absolute", left: "371.11px", top: "45.12px" }}
              className="cls_003"
            >
              <span className="cls_003">
                700 333 - 11th Avenue SW Phone: 1.403.229.4700
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "357.43px", top: "54.24px" }}
              className="cls_003"
            >
              <span className="cls_003">Calgary, Alberta T2R 1L9</span>
            </div>
            <div
              style={{ position: "absolute", left: "465.46px", top: "54.24px" }}
              className="cls_003"
            >
              <span className="cls_003">Toll Free: 1.800.661.9003</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "72.60px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "94.94px" }}
              className="cls_005"
            >
              <span className="cls_005">
                Trust Account and Client Ledger Shortages
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "112.05px" }}
              className="cls_006"
            >
              <span className="cls_006">Rules 119.24 (1) and (3)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50.00px",
                top: "137.06px",
                border: "1.5px solid black",
                width: "90%",
                height: "21%",
              }}
            ></div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "137.06px" }}
              className="cls_007"
            >
              <span className="cls_007">Instructions</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "153.62px" }}
              className="cls_002"
            >
              <span className="cls_002">
                1. This form must be completed if:
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "68.42px", top: "170.06px" }}
              className="cls_002"
            >
              <span className="cls_002">(a)</span>
            </div>
            <div
              style={{ position: "absolute", left: "97.22px", top: "170.06px" }}
              className="cls_002"
            >
              <span className="cls_002">
                a shortage exists that cannot be attributed to a client file and
                is greater than $50 or not corrected within 30 days, or
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "68.42px", top: "196.38px" }}
              className="cls_002"
            >
              <span className="cls_002">(b)</span>
            </div>
            <div
              style={{ position: "absolute", left: "97.22px", top: "196.38px" }}
              className="cls_002"
            >
              <span className="cls_002">
                a shortage exists on a client file and
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "97.22px", top: "212.70px" }}
              className="cls_002"
            >
              <span className="cls_002">(i)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "118.82px",
                top: "212.70px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                the law firm does not correct the deficiency within 7 days of
                the time the shortage arose, and/or
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "97.22px", top: "229.02px" }}
              className="cls_002"
            >
              <span className="cls_002">(ii)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "118.82px",
                top: "229.02px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                the deficiency is an amount greater than $2,500, regardless of
                when the deficiency is corrected.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "245.34px" }}
              className="cls_002"
            >
              <span className="cls_002">
                2. A member practising as a sole practitioner is a “Law Firm” as
                defined in the Rules.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "261.81px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Note: All questions on this form must be answered. One form must
                be submitted for each client matter shortage/overdraft.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "288.13px" }}
              className="cls_002"
            >
              <span className="cls_002">Please submit this form to </span>
              <span className="cls_008">Trust.Safety@lawsociety.ab.ca</span>
              <span className="cls_002">. We do not require the original.</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "311.69px" }}
              className="cls_010"
            >
              <span className="cls_010">SECTION A - LAW FIRM INFORMATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "338.69px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "338.69px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm name:</span>
              <input
                className="htmlInput"
                id="lawFirmName"
                name="LawFirmName"
                value={sectionA.LawFirmName}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "356.57px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "356.57px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm address:</span>
              <input
                className="htmlInput"
                id="lawFirmAddress"
                name="LawFirmAddress"
                value={sectionA.LawFirmAddress}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "374.33px" }}
              className="cls_002"
            >
              <span className="cls_002">City:</span>
              <input
                className="htmlInput"
                id="sectionAcity"
                name="City"
                value={sectionA.City}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "327.53px",
                top: "374.33px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Province:</span>
              <input
                className="htmlInput htmlInput_s"
                id="sectionAprovince"
                name="Province"
                value={sectionA.Province}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "432.91px",
                top: "374.33px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Postal Code:</span>
              <input
                className="htmlInput htmlInput_s"
                id="sectionApostalCode"
                name="PostalCode"
                value={sectionA.PostalCode}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "392.21px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "392.21px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm telephone</span>
              <input
                className="htmlInput "
                id="sectionALawFirmTel"
                name="LawFirmTelNum"
                value={sectionA.LawFirmTelNum}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "402.53px" }}
              className="cls_002"
            >
              <span className="cls_002">number:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "418.97px" }}
              className="cls_002"
            >
              <span className="cls_002">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "418.97px" }}
              className="cls_002"
            >
              <span className="cls_002">Lawyer responsible</span>
              <input
                className="htmlInput"
                id="sectionALawyerResponsible"
                name="LawyerResponsibleForFile"
                value={sectionA.LawyerResponsibleForFile}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "429.31px" }}
              className="cls_002"
            >
              <span className="cls_002">for file:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "445.63px" }}
              className="cls_002"
            >
              <span className="cls_002">5.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "445.63px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "455.95px" }}
              className="cls_002"
            >
              <span className="cls_002">Responsible</span>
              <input
                className="htmlInput "
                id="sectionALawFirmResponsible"
                name="LawFirmResponsibleLawyer"
                value={sectionA.LawFirmResponsibleLawyer}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "466.39px" }}
              className="cls_002"
            >
              <span className="cls_002">Lawyer:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "506.59px" }}
              className="cls_010"
            >
              <span className="cls_010">
                SECTION B - FILE INFORMATION (if shortage is attributed to a
                client file)
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "533.47px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "533.47px" }}
              className="cls_002"
            >
              <span className="cls_002">File number and</span>
              <input
                className="htmlInput "
                id="fileNumberAndNature"
                name="fileNumberAndMatter"
                value={sectionA.fileNumberAndMatter}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "543.91px" }}
              className="cls_002"
            >
              <span className="cls_002">nature of matter:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "560.23px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "560.23px" }}
              className="cls_002"
            >
              <span className="cls_002">Name of client:</span>
              <input
                className="htmlInput "
                id="NameOfClient"
                name="NameOfClient"
                value={sectionA.NameOfClient}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "578.11px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "578.11px" }}
              className="cls_002"
            >
              <span className="cls_002">Last known</span>
              <input
                className="htmlInput "
                id="lastKnownAddress"
                name="LastKnownAddress"
                value={sectionA.LastKnownAddress}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "588.43px" }}
              className="cls_002"
            >
              <span className="cls_002">address:</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "604.78px" }}
              className="cls_002"
            >
              <span className="cls_002">City:</span>
              <input
                className="htmlInput "
                id="sectionBcity"
                name="sectionBCity"
                value={sectionA.sectionBCity}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "327.53px",
                top: "604.78px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Province:</span>
              <input
                className="htmlInput htmlInput_s"
                id="sectionBProvince"
                name="sectionBProvince"
                value={sectionA.sectionBProvince}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "432.91px",
                top: "604.78px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Postal Code:</span>
              <input
                className="htmlInput htmlInput_s"
                id="sectionBPostalCode"
                name="sectionBPostalCode"
                value={sectionA.sectionBPostalCode}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "622.66px" }}
              className="cls_002"
            >
              <span className="cls_002">Country:</span>
              <input
                className="htmlInput "
                id="sectionBCountry"
                name="sectionBCountry"
                value={sectionA.sectionBCountry}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "702.34px" }}
              className="cls_013"
            >
              <span className="cls_013">
                The information provided in this form will be used by the Law
                Society of Alberta for one or more purposes contemplated by the
                Legal Profession Act, the Rules of the Law Society, the Code of
                Conduct, or a resolution of the Benchers and will be accessible
                to all departments of the Law Society, including the Alberta
                Lawyers Insurance Association. The information may be used or
                disclosed by the Law Society of Alberta, now or in the future,
                for regulatory purposes, including Law Society of Alberta
                investigations and proceedings. We may contact you to obtain
                additional information, or to obtain clarification on the
                information you provided. Should you have any questions about
                this, please contact the Privacy Officer at 403-229-4700.
              </span>
              {/* <span className="cls_014">Legal Profession Act</span>
              <span className="cls_013">
                , the Rules of the Law Society, the Code of Conduct, or a
              </span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "708.82px" }}
              className="cls_013"
            >
              <span className="cls_013">
                resolution of the Benchers and will be accessible to all
                departments of the Law Society, including the Alberta Lawyers
                Insurance Association. The information may be used or disclosed
                by the Law Society of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "715.18px" }}
              className="cls_013"
            >
              <span className="cls_013">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to obtain additional information, or to
                obtain clarification on the
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "721.42px" }}
              className="cls_013"
            >
              <span className="cls_013">
                information you provided. Should you have any questions about
                this, please contact the Privacy Officer at 403-229-4700.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "726.82px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "736.06px" }}
              className="cls_015"
            >
              <span className="cls_015">August 2017</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_015"
            >
              <span className="cls_015">Page 1 of 3</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.06px",
              }}
              className="cls_015"
            >
              <span className="cls_015"> </span>
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
                src="../../assets/images/alberta_Law_photo.png"
                width={612}
                height={792}
              />
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "39.12px" }}
              className="cls_015"
            >
              <span className="cls_015">Law Society of Alberta</span>
            </div>
            <div
              style={{ position: "absolute", left: "416.71px", top: "39.12px" }}
              className="cls_015"
            >
              <span className="cls_015">
                Trust Account and Client Ledger Shortages
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "52.92px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "79.70px" }}
              className="cls_010"
            >
              <span className="cls_010">
                SECTION C - DETAILS OF TRUST ACCOUNT OR CLIENT ACCOUNT SHORTAGE
              </span>
            </div>

            <table>
              <thead>
                <tr
                  className="w-100"
                  style={{
                    position: "absolute",
                    left: "54.00px",
                    top: "106.58px",
                  }}
                >
                  {headings.map((e) => {
                    return <th className="htmlText">{e}</th>;
                  })}
                </tr>
              </thead>

              <tbody
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "146.58px",
                }}
              >
                {sectionA.details.map((e, index) => {
                  return (
                    <tr>
                      <td className="htmlText">
                        <input
                          className="htmlInput htmlInput_s"
                          value={e.dateDiscovered}
                          onChange={(event) => {
                            const tableData = sectionA.details;

                            tableData[index].dateDiscovered =
                              event.target.value;

                            setSectionA({ ...sectionA, details: tableData });
                          }}
                        />
                      </td>
                      <td className="htmlText">
                        <input
                          className="htmlInput htmlInput_s"
                          value={e.dateOccured}
                          onChange={(event) => {
                            const tableData = sectionA.details;

                            tableData[index].dateOccured = event.target.value;

                            setSectionA({ ...sectionA, details: tableData });
                          }}
                        />
                      </td>
                      <td className="htmlText">
                        <input
                          className="htmlInput htmlInput_s"
                          value={e.dateCorrected}
                          onChange={(event) => {
                            const tableData = sectionA.details;

                            tableData[index].dateCorrected = event.target.value;

                            setSectionA({ ...sectionA, details: tableData });
                          }}
                        />
                      </td>
                      <td className="htmlText">
                        <input
                          className="htmlInput htmlInput_s"
                          value={e.Amount}
                          onChange={(event) => {
                            const tableData = sectionA.details;

                            tableData[index].Amount = event.target.value;

                            setSectionA({ ...sectionA, details: tableData });
                          }}
                        />
                      </td>
                      <td
                        style={{ padding: "0rem", width: "10rem" }}
                        className="htmlText"
                      >
                        <Dropdown
                          // className="htmlInput htmlInput_s"
                          value={e.reason}
                          options={reasons}
                          className="w-100"
                          onChange={(event) => {
                            const tableData = sectionA.details;

                            tableData[index].reason = event.value;

                            setSectionA({ ...sectionA, details: tableData });
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div
              style={{ position: "absolute", left: "80.66px", top: "187.74px" }}
              className="cls_002 w-75"
            >
              <span className="cls_002">
                Please provide further explanation:
              </span>
              <textarea
                id="sectionCFurtherExplanation"
                name="furtherExplanation"
                value={sectionA.furtherExplanation}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "278.57px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "278.57px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Please attach the following as proof of correction:
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "116.06px",
                top: "294.89px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                Proof of deposit (including stamp by bank)
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "116.06px",
                top: "311.21px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Bank statement</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "116.06px",
                top: "327.53px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Client ledger card</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "116.06px",
                top: "343.97px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Copy of the cheque</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "384.17px" }}
              className="cls_010"
            >
              <span className="cls_010">SECTION D - LAWYER CERTIFICATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.18px", top: "411.17px" }}
              className="cls_002"
            >
              <span className="cls_002">I,</span>
              <input
                className="htmlInput"
                id="certificationName"
                name="CertifyName"
                value={sectionA.CertifyName}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "321.65px",
                top: "411.17px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                , certify that the foregoing information is complete
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.18px", top: "428.95px" }}
              className="cls_002"
            >
              <span className="cls_002">
                and correct to the best of my knowledge.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "479.47px" }}
              className="cls_009"
            >
              <span className="cls_009">Date </span>
              <span className="cls_017">(mm/dd/yyyy)</span>
              <input
                className="htmlInput htmlInput_s"
                id="certificationdate"
                name="Date"
                value={sectionA.Date}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "272.09px",
                top: "478.63px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Signature of Responsible Lawyer</span>
              <input
                className="htmlInput htmlInput_s"
                id="signature"
                name="Signature"
                value={sectionA.Signature}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "668.02px" }}
              className="cls_019"
            >
              <span className="cls_019">
                The information provided in this form will be used by the Law
                Society of Alberta for one or more purposes contemplated by the
                Legal Profession Act, the Rules of the Law Society, the Code of
                Conduct, or a resolution of the Benchers and will be accessible
                to all departments of the Law Society, including the Alberta
                Lawyers Insurance Association. The information may be used or
                disclosed by the Law Society of Alberta, now or in the future,
                for regulatory purposes, including Law Society of Alberta
                investigations and proceedings. We may contact you to
              </span>
              {/* <span className="cls_020">Legal</span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "677.14px" }}
              className="cls_020"
            >
              <span className="cls_020">Profession Act</span>
              <span className="cls_019">
                , the Rules of the Law Society, the Code of Conduct, or a
                resolution of the Benchers and will be accessible to all
                departments of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "686.38px" }}
              className="cls_019"
            >
              <span className="cls_019">
                the Law Society, including the Alberta Lawyers Insurance
                Association. The information may be used or disclosed by the Law
                Society of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "695.50px" }}
              className="cls_019"
            >
              <span className="cls_019">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "726.82px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "736.06px" }}
              className="cls_015"
            >
              <span className="cls_015">August 2017</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_015"
            >
              <span className="cls_015">Page 2 of 3</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.06px",
              }}
              className="cls_015"
            >
              <span className="cls_015"> </span>
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
              top: "1604px",
              width: "612px",
              height: "792px",
              borderStyle: "outset",
              overflow: "hidden",
            }}
          >
            {/* <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="50819d4c-82e7-11ec-a980-0cc47a792c0a_id_50819d4c-82e7-11ec-a980-0cc47a792c0a_files/background3.jpg"
                width={612}
                height={792}
              />
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "39.12px" }}
              className="cls_015"
            >
              <span className="cls_015">Law Society of Alberta</span>
            </div>
            <div
              style={{ position: "absolute", left: "416.71px", top: "39.12px" }}
              className="cls_015"
            >
              <span className="cls_015">
                Trust Account and Client Ledger Shortages
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "52.92px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "65.28px" }}
              className="cls_019"
            >
              <span className="cls_019">
                obtain additional information, or to obtain clarification on the
                information you provided. Should you have any questions about
                this, please contact the Privacy Officer at 403-229-4700.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "74.64px" }}
              className="cls_019"
            >
              <span className="cls_019">
                contact the Privacy Officer at 403-229-4700.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "726.82px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "736.06px" }}
              className="cls_015"
            >
              <span className="cls_015">August 2017</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_015"
            >
              <span className="cls_015">Page 3 of 3</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.06px",
              }}
              className="cls_015"
            >
              <span className="cls_015"> </span>
              <a href="http://www.lawsociety.ab.ca/">
                www.lawsociety.ab.ca
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </ComplianceFormLayout>
  );

  // return (
  //   <ComplianceFormLayout title="Trust Account and Client Ledger Shortages">
  //     <h1>Trust Account and Client Ledger Shortages</h1>
  //     <h4>Rules 119.24 (1) and (3)</h4>
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
  //       label="Law Firm telephone Number"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, LawFirmTelNum: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem"
  //       value={sectionA.LawFirmTelNum}
  //     />
  //     <InputCustom
  //       label="Lawyer responsible for file"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, LawyerResponsibleForFile: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem"
  //       value={sectionA.LawyerResponsibleForFile}
  //     />

  //     <InputCustom
  //       label="Law Firm responsible Lawyer"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, LawFirmResponsibleLawyer: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem"
  //       value={sectionA.LawFirmResponsibleLawyer}
  //     />
  //     {/* sid uid updated_date creation_date json signOff completed_date */}

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION B – FILE INFORMATION (if shortage is attributed to a client
  //       file)
  //     </h4>
  //     <InputCustom
  //       label="File number and nature of matter"
  //       //file
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, fileNumberAndMatter: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionB.fileNumberAndMatter}
  //     />
  //     <InputCustom
  //       label="Name of Client"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, NameOfClient: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionB.NameOfClient}
  //     />
  //     <InputCustom
  //       label="Last Known address"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, LastKnownAddress: e.target.value })
  //       }
  //       type="text"
  //       margin="1rem 0rem "
  //       value={sectionB.LastKnownAddress}
  //     />
  //     <div className="d-flex">
  //       <InputCustom
  //         label="City"
  //         handleChange={(e) =>
  //           setSectionB({ ...sectionB, City: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.7rem 0.4rem 0"
  //         value={sectionB.City}
  //       />
  //       <InputCustom
  //         label="Province"
  //         handleChange={(e) =>
  //           setSectionB({ ...sectionB, Province: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.7rem 0.4rem 0"
  //         value={sectionB.Province}
  //       />
  //       <InputCustom
  //         label="Postal Code"
  //         handleChange={(e) =>
  //           setSectionB({ ...sectionB, PostalCode: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0rem 0.8rem 0"
  //         value={sectionB.PostalCode}
  //       />
  //     </div>
  //     <InputCustom
  //       label="Country"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, Country: e.target.value })
  //       }
  //       type="text"
  //       margin="1rem 0rem 0.8rem 0"
  //       value={sectionB.Country}
  //     />
  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION C – DETAILS OF TRUST ACCOUNT OR CLIENT ACCOUNT SHORTAGE
  //     </h4>

  //     <Table headings={headers} data={rows} />

  //     <div style={{ textAlign: "right", marginTop: "1rem" }}>
  //       <span
  //         className="heading-5 mt-3 d-inline-block text-primary-color cursor_pointer"
  //         onClick={(e) => {
  //           const details = sectionC.details;
  //           const obj = {
  //             dateCorrected: "",
  //             dateDiscovered: "",
  //             dateOccured: "",
  //             Amount: 0,
  //             reason: "",
  //           };
  //           details.push(obj);
  //           setSectionC({ ...sectionC, details: details });
  //         }}
  //       >
  //         + Add Rows
  //       </span>
  //     </div>

  //     <div className="heading-5 mt-3">Please provide further explanation</div>
  //     <textarea
  //       className="py-4 heading-5"
  //       onChange={(e) =>
  //         setSectionC({ ...sectionC, furtherExplanation: e.target.value })
  //       }
  //       value={sectionC.furtherExplanation}
  //       name="detailsOfTrust"
  //       cols="15"
  //       rows="6"
  //     ></textarea>
  //     <div className="heading-5 my-4">
  //       <span className="text-danger">
  //         Please attach the following as proof of correction.
  //       </span>
  //       <ul className="text-danger">
  //         <li>Proof of deposit(including stamp by bank)</li>
  //         <li>Bank Statement</li>
  //         <li>Client ledger card</li>
  //         <li>Copy of the cheque</li>
  //       </ul>
  //     </div>
  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION D - LAWYER CERTIFICATION
  //     </h4>
  //     <Signature
  //       SignatureOf="Signature of Lawyer"
  //       sectionD={sectionD}
  //       setSectionD={setSectionD}
  //     />
  //   </ComplianceFormLayout>
  // );
};

export default ShortageSelfReportForm;
