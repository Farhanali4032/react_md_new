import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import {
  fetchFormDetails,
  saveComplianceFormDetails,
} from "../../../utils/helpers";
import ComplianceFormLayout from "../ComplianceFormLayout.tsx";
import BankDraftsAndMoneyOrderPrint from "./print/BankDraftsAndMoneyOrderPrint";

const BankDraftsAndMoneyOrder = ({ hideLayout }) => {
  const compliancePDF = useRef(null);
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
    City: "",
    Province: "",
    PostalCode: "",
    FaxNumber: "",
    LawFirmTelNum: "",
    Country: "",
    ResponsibleLawyer: "",
    LawFirmEmail: "",
    fileNumberAndMatter: "",
    NameOfClient: "",
    AreaOfLaw: "",
    detailsOfPayment: "",
    obtainRecipientAuth: "",
    recipientAcknowledge: "",
    Signature: "",
    Date: "",
    NameOfFirm: "",
  });

  const history = useHistory();

  const taskState = history.location.state;
  const [taskStatus, setTaskStatus] = useState(taskState);
  const handleInputChange = (e) => {
    setSectionA({ ...sectionA, [e.target.name]: e.target.value });
  };

  const saveDocument = () => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };

  useEffect(() => {
    const formDetailsFetching = async () => {
      const { formDetails, isFormFilled } = await fetchFormDetails(
        taskState.id
      );

      if (isFormFilled) {
        setSectionA({ ...formDetails });
      }
    };

    formDetailsFetching();
  }, []);

  const printDocument = useReactToPrint({
    content: () => compliancePDF.current,
  });

  return (
    <ComplianceFormLayout
      title="Bank Drafts and Money Orders"
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
    >
      <div style={{ display: "none" }}>
        <BankDraftsAndMoneyOrderPrint
          taskData={taskState}
          ref={compliancePDF}
        />
      </div>
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '\n  <!--\n  span.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_006{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_006{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_007{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_007{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_011{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_011{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_012{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_012{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_013{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_013{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_016{font-family:Arial,serif;font-size:9.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_016{font-family:Arial,serif;font-size:9.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_008{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_008{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_018{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_018{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_019{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_019{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  -->\n  ',
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
                alt="Law society logo"
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
                <b>Bank Drafts and Money Orders</b>
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "112.05px" }}
              className="cls_006"
            >
              <span className="cls_006">Rule 119.46 (1)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50.00px",
                top: "137.06px",
                border: "1.5px solid black",
                width: "90.5%",
                height: "12%",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "137.06px",
              }}
              className="cls_007"
            >
              <span className="cls_007">Instructions</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "153.62px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                1. Trust withdrawals may be made by a bank draft or money order.
                If a trust withdrawal is to be made by this method, fill out
                this form and maintain a copy in the clients file.
              </span>
            </div>
            {/* <div
              style={{
                position: "absolute",
                left: "68.42px",
                top: "164.06px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                this form and maintain a copy in the clients file.
              </span>
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "180.38px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                2. A member practising as a sole practitioner is a “Law Firm” as
                defined in the Rules.
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "213.02px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                Note: All questions on this form must be answered.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "256.73px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION A - LAW FIRM INFORMATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "283.61px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "283.61px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm name:</span>
              <input
                className="htmlInput"
                value={sectionA.LawFirmName}
                onChange={(e) => handleInputChange(e)}
                name="LawFirmName"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "301.49px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "301.49px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm address:</span>
              <input
                className="htmlInput"
                value={sectionA.LawFirmAddress}
                onChange={(e) => handleInputChange(e)}
                name="LawFirmAddress"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "319.37px" }}
              className="cls_002"
            >
              <span className="cls_002">City:</span>
              <input
                className="htmlInput htmlInput_m"
                value={sectionA.City}
                onChange={(e) => handleInputChange(e)}
                name="City"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "327.53px",
                top: "319.37px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Province:</span>
              <input
                className="htmlInput htmlInput_s"
                value={sectionA.Province}
                onChange={(e) => handleInputChange(e)}
                name="Province"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "432.91px",
                top: "319.37px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Postal Code:</span>
              <input
                className="htmlInput htmlInput_s"
                value={sectionA.PostalCode}
                onChange={(e) => handleInputChange(e)}
                name="PostalCode"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "337.13px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "337.13px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm telephone</span>
              <input
                className="htmlInput "
                value={sectionA.LawFirmTelNum}
                onChange={(e) => handleInputChange(e)}
                name="LawFirmTelNum"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "347.57px" }}
              className="cls_002"
            >
              <span className="cls_002">number:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "363.89px" }}
              className="cls_002"
            >
              <span className="cls_002">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "363.89px" }}
              className="cls_002"
            >
              <span className="cls_002">Lawyer responsible</span>
              <input
                className="htmlInput "
                value={sectionA.ResponsibleLawyer}
                onChange={(e) => handleInputChange(e)}
                name="ResponsibleLawyer"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "374.21px" }}
              className="cls_002"
            >
              <span className="cls_002">for file:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "390.53px" }}
              className="cls_002"
            >
              <span className="cls_002">5.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "390.53px" }}
              className="cls_002"
            >
              <span className="cls_002">Lawyer email:</span>
              <input
                className="htmlInput "
                value={sectionA.LawFirmEmail}
                onChange={(e) => handleInputChange(e)}
                name="LawFirmEmail"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "419.69px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION B - FILE INFORMATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "446.59px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "446.59px" }}
              className="cls_002"
            >
              <span className="cls_002">File number and</span>
              <input
                className="htmlInput "
                value={sectionA.fileNumberAndMatter}
                onChange={(e) => handleInputChange(e)}
                name="fileNumberAndMatter"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "457.03px" }}
              className="cls_002"
            >
              <span className="cls_002">nature of matter:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "473.35px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "473.35px" }}
              className="cls_002"
            >
              <span className="cls_002">Name of client:</span>
              <input
                className="htmlInput "
                value={sectionA.NameOfClient}
                onChange={(e) => handleInputChange(e)}
                name="NameOfClient"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "491.23px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "491.23px" }}
              className="cls_002"
            >
              <span className="cls_002">Area of Law:</span>
              <input
                className="htmlInput "
                value={sectionA.AreaOfLaw}
                onChange={(e) => handleInputChange(e)}
                name="AreaOfLaw"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "520.27px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION C - DETAILS OF PAYMENT</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "547.27px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "547.27px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Please provide all of the details of the payment, including the
                amount, intended payee and any other relevant
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "557.59px" }}
              className="cls_002 w-75"
            >
              <span className="cls_002">information:</span>
              <textarea
                value={sectionA.detailsOfPayment}
                onChange={(e) => handleInputChange(e)}
                name="detailsOfPayment"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "700.34px",
              }}
              className="cls_011"
            >
              <span className="cls_011">
                The information provided in this form will be used by the Law
                Society of Alberta for one or more purposes contemplated by the
                Legal Profession Act , the Rules of the Law Society, the Code of
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
              {/* <span className="cls_012">Legal Profession Act</span>
              <span className="cls_011">
                , the Rules of the Law Society, the Code of Conduct, or a
              </span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "708.82px" }}
              className="cls_011"
            >
              <span className="cls_011">
                resolution of the Benchers and will be accessible to all
                departments of the Law Society, including the Alberta Lawyers
                Insurance Association. The information may be used or disclosed
                by the Law Society of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "715.18px" }}
              className="cls_011"
            >
              <span className="cls_011">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to obtain additional information, or to
                obtain clarification on the
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "721.42px" }}
              className="cls_011"
            >
              <span className="cls_011">
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
              className="cls_013"
            >
              <span className="cls_013">September 2017</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_013"
            >
              <span className="cls_013">Page 1 of 2</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.06px",
              }}
              className="cls_013"
            >
              <span className="cls_013"> </span>
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
                src="79f2f6f6-82e9-11ec-a980-0cc47a792c0a_id_79f2f6f6-82e9-11ec-a980-0cc47a792c0a_files/background2.jpg"
                width={612}
                height={792}
                alt="background2"
              />
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "39.12px" }}
              className="cls_013"
            >
              <span className="cls_013">Law Society of Alberta</span>
            </div>
            <div
              style={{ position: "absolute", left: "455.71px", top: "39.12px" }}
              className="cls_013"
            >
              <span className="cls_013">Bank Drafts and Money Orders</span>
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
              style={{ position: "absolute", left: "54.00px", top: "81.02px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "80.66px",
                top: "81.02px",
                maxWidth: "70%",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                (a) Did you obtain the recipient’s authorization to receive the
                funds in the form of a bank draft or money order in writing?{" "}
                <span className="cls_016">Rule 119.46(2)(a)</span>
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "501.10px", top: "81.02px" }}
              className="cls_002"
            >
              <span className="cls_002">
                {" "}
                <input
                  className="radio_box_html"
                  type="radio"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, obtainRecipientAuth: "Yes" })
                  }
                  checked={sectionA.obtainRecipientAuth === "Yes"}
                />{" "}
                Yes
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "546.58px", top: "81.02px" }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="radio_box_html"
                  type="radio"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, obtainRecipientAuth: "No" })
                  }
                  checked={sectionA.obtainRecipientAuth === "No"}
                />{" "}
                No
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "91.46px" }}
              className="cls_002"
            >
              {/* <span className="cls_002">money order in writing? </span> */}
              {/* <span className="cls_016">Rule 119.46(2)(a)</span> */}
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "107.78px" }}
              className="cls_002"
            >
              <span className="cls_002">
                (b) Please attach a copy of the written authorization.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "140.42px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "80.66px",
                top: "140.42px",
                maxWidth: "70%",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                (a) Did you obtain the recipient’s acknowledgement of receipt of
                the bank draft or money order in writing?{" "}
                <span className="cls_016">Rule 119.46(2)(f)</span>
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "501.10px",
                top: "140.42px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                {" "}
                <input
                  className="radio_box_html"
                  type="radio"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, recipientAcknowledge: "Yes" })
                  }
                  checked={sectionA.recipientAcknowledge === "Yes"}
                />
                Yes
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "546.58px",
                top: "140.42px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="radio_box_html"
                  type="radio"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, recipientAcknowledge: "No" })
                  }
                  checked={sectionA.recipientAcknowledge === "No"}
                />
                No
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "150.86px" }}
              className="cls_002"
            >
              {/* <span className="cls_002">writing?</span> */}
              {/* <span className="cls_016">Rule 119.46(2)(f)</span> */}
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "167.18px" }}
              className="cls_002"
            >
              <span className="cls_002">
                (b) Please attach a copy of the written authorization.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "261.77px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION D - LAWYER CERTIFICATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.18px", top: "288.65px" }}
              className="cls_002"
            >
              <span className="cls_002">
                I,{" "}
                <input
                  className=" htmlInput"
                  value={sectionA.NameOfFirm}
                  onChange={(e) => handleInputChange(e)}
                  name="NameOfFirm"
                />{" "}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "321.65px",
                top: "288.65px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                , certify that the foregoing information is complete
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.18px", top: "306.53px" }}
              className="cls_002"
            >
              <span className="cls_002">
                and correct to the best of my knowledge.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "340px" }}
            >
              <input
                className="htmlInput_ms htmlInput"
                value={sectionA.Date}
                onChange={(e) => handleInputChange(e)}
                name="Date"
              />
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "356.93px" }}
              className="cls_008"
            >
              <span className="cls_008">Date </span>
              <span className="cls_018">(mm/dd/yyyy)</span>
              {/* <input
                className="htmlInput_s htmlInput"
                value={sectionA.Date}
                onChange={(e) => handleInputChange(e)}
                name="Date"
              /> */}
            </div>
            <div
              style={{ position: "absolute", left: "272.09px", top: "340px" }}
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.Signature}
                onChange={(e) => handleInputChange(e)}
                name="Signature"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "272.09px",
                top: "356.09px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Signature of Lawyer</span>
              {/* <input
                className="htmlInput_m htmlInput"
                value={sectionA.Signature}
                onChange={(e) => handleInputChange(e)}
                name="Signature"
              /> */}
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "660.58px" }}
              className="cls_019"
            >
              <span className="cls_019">
                The information provided in this form will be used by the Law
                Society of Alberta for one or more purposes contemplated by the
                Legal Profession Act , the Rules of the Law Society, the Code of
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
              {/* <span className="cls_020">Legal</span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "669.70px" }}
              className="cls_020"
            > */}
            {/* <span className="cls_020">Profession Act</span> */}
            {/* <span className="cls_019">
                , the Rules of the Law Society, the Code of Conduct, or a
                resolution of the Benchers and will be accessible to all
                departments of
              </span> */}
            {/* </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "678.94px" }}
              className="cls_019"
            >
              <span className="cls_019">
                the Law Society, including the Alberta Lawyers Insurance
                Association. The information may be used or disclosed by the Law
                Society of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "688.06px" }}
              className="cls_019"
            >
              <span className="cls_019">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "697.30px" }}
              className="cls_019"
            >
              <span className="cls_019">
                obtain additional information, or to obtain clarification on the
                information you provided. Should you have any questions about
                this, please
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "706.54px" }}
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
              className="cls_013"
            >
              <span className="cls_013">September 2017</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_013"
            >
              <span className="cls_013">Page 2 of 2</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.06px",
              }}
              className="cls_013"
            >
              <span className="cls_013"> </span>
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
  //   <ComplianceFormLayout
  //     hideLayout={hideLayout}
  //     title="Undisbursable Trust Money – Long Form"
  //   >
  //     <h1>Bank Drafts and Money Orders</h1>
  //     <h4>Rule 119.46 (1)</h4>
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

  //     <InputCustom
  //       label="Lawyer Responsible For File"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, ResponsibleLawyer: e.target.value })
  //       }
  //       type="text"
  //       margin="1rem 0.4rem 0 0rem "
  //       value={sectionA.ResponsibleLawyer}
  //     />

  //     <InputCustom
  //       label="Lawyer Email"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, LawFirmEmail: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.LawFirmEmail}
  //     />

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION B – FILE INFORMATION
  //     </h4>

  //     <InputCustom
  //       label="File number and nature of matter"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, fileNumberAndMatter: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionB.fileNumberAndMatter}
  //     />

  //     <InputCustom
  //       label="Name Of Client"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, NameOfClient: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionB.NameOfClient}
  //     />

  //     <InputCustom
  //       label="Area Of Law"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, AreaOfLaw: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionB.AreaOfLaw}
  //     />

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION C – LAWYER CERTIFICATION
  //     </h4>

  //     <div className="heading-5">
  //       Please provide all of the details of the payment, including the amount,
  //       intended payee and any other relevant information
  //     </div>

  //     <textarea
  //       value={sectionC.detailsOfPayment}
  //       name="detail of payment"
  //       id=""
  //       cols="15"
  //       rows="7"
  //     ></textarea>

  //     <div className="heading-5 d-flex justify-content-between my-3">
  //       <span>
  //         Did you obtain the recipient’s authorization to receive the funds in
  //         the form of a bank draft or money order in writing? Rule 119.46(2)(a)
  //       </span>
  //       <div className="d-flex align-items-center">
  //         <input type="radio" name="subjectTrust" className="radio_box" />
  //         Yes <span className="mr-1"></span>
  //         <input type="radio" name="subjectTrust" className="radio_box " />
  //         No
  //       </div>
  //     </div>

  //     <div className="heading-5">
  //       Please attach a copy of the written authorization
  //     </div>

  //     <div className="heading-5 d-flex justify-content-between my-3">
  //       <span>
  //         Did you obtain the recipient’s acknowledgement of receipt of the bank
  //         draft or money order in writing? Rule 119.46(2)(f)
  //       </span>
  //       <div className="d-flex align-items-center">
  //         <input type="radio" name="subjectTrust" className="radio_box" />
  //         Yes <span className="mr-1"></span>
  //         <input type="radio" name="subjectTrust" className="radio_box " />
  //         No
  //       </div>
  //     </div>

  //     <div className="heading-5">
  //       Please attach a copy of the written authorization
  //     </div>

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION D – LAWYER CERTIFICATION
  //     </h4>

  //     <div>
  //       <span className="d-flex justify-content-between align-items-center heading-5">
  //         I,&nbsp;&nbsp;{" "}
  //         <Dropdown
  //           className="my-4 heading-5 w-100"
  //           options={method}
  //           onChange={(e) => {
  //             // console.log("e", e);
  //             // const sectionCDup = sectionC;
  //             // sectionCDup.details[0].reason = e;
  //             // setSectionC(sectionCDup);
  //           }}
  //           value={sectionD.NameOfFirm}
  //         ></Dropdown>
  //       </span>

  //       <span className="heading-5 mt-4">
  //         certify that the foregoing information is complete and correct to the
  //         best of my knowledge.
  //       </span>
  //     </div>
  //     <InputCustom
  //       handleChange={(e) => setSectionD({ ...sectionD, Date: e.target.value })}
  //       type="date"
  //       margin="1.8rem 0rem"
  //       value={sectionD.Date}
  //     />
  //     <InputCustom
  //       label="Signature of Lawyer"
  //       handleChange={(e) =>
  //         setSectionD({ ...sectionD, Signature: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem"
  //       value={sectionD.Signature}
  //     />
  //   </ComplianceFormLayout>
  // );
};

export default BankDraftsAndMoneyOrder;
