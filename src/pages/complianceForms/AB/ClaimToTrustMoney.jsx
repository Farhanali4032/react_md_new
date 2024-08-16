import React, { useEffect, useRef, useState } from "react";
import ComplianceFormLayout from "../ComplianceFormLayout.tsx";
import { useHistory } from "react-router";
import {
  fetchFormDetails,
  getCompanyInfo,
  saveComplianceFormDetails,
} from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { companyInfoAction } from "../../../actions/companyActions";
import ClaimToTrustMoneyPrint from "./print/ClaimToTrustMoneyPrint";

const ClaimToTrustMoney = () => {
  const compliancePDF = useRef(null);
  const history = useHistory();
  const taskState = history.location.state;
  const [taskStatus, setTaskStatus] = useState(taskState);

  const dispatch = useDispatch();

  const [sectionA, setSectionA] = useState({
    ClaimantName: "",
    MailingAddress: "",
    sectionACity: "",
    sectionAProvince: "",
    sectionAPostalCode: "",
    sectionACountry: "",
    sectionAOfficePhone: "",
    sectionAHomePhone: "",
    sectionAOtherPhone: "",
    sectionAFaxNumber: "",
    sectionAEmail: "",

    sectionBClaimantName: getCompanyInfo().companyname,
    sectionBMailingAddress: getCompanyInfo().legaladdress.Line1,
    sectionBCity: getCompanyInfo().legaladdress.CountrySubDivisionCode,
    sectionBProvince: getCompanyInfo().legaladdress.CountrySubDivisionCode,
    sectionBPostalCode: getCompanyInfo().legaladdress.PostalCode,
    sectionBCountry: getCompanyInfo().legaladdress.Country,
    sectionBOfficePhone: "",
    sectionBHomePhone: "",
    sectionBOtherPhone: "",
    sectionBFaxNumber: "",
    sectionBEmail: "",
    sectionBLawyerInCharge: "",
    sectionBFileNumber: "",

    sectionCClaimAmount: 0,
    sectionCCircumstanceClaim: "",
    sectionCVerifyClaim: "",
    sectionCCertifyName: "",
    sectionCDate: "",
    sectionCSignature: "",
  });

  useEffect(() => {
    dispatch(companyInfoAction());
  }, []);

  const saveDocument = () => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };

  const printDocument = useReactToPrint({
    content: () => compliancePDF.current,
  });

  const handleInputChange = (e) => {
    setSectionA({ ...sectionA, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const { formDetails, isFormFilled } = await fetchFormDetails(
        taskState.id
      );

      console.log({ formDetails, isFormFilled });
      if (isFormFilled) {
        setSectionA({ ...formDetails });
      }
    };
    fetchDetails();
  }, []);

  return (
    <ComplianceFormLayout
      title="Claim to Trust Money"
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
        <ClaimToTrustMoneyPrint
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
              '\n  <!--\n  span.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_006{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_006{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_007{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_007{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_013{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_013{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_014{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_014{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_015{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_015{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_017{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_017{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_008{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_008{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_018{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_018{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_019{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_019{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  -->\n  ',
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
            top: "55%",
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
              style={{
                position: "absolute",
                left: "54.00px",
                top: "82.60px",
                width: "90%",
                height: "2px",
                backgroundColor: "black",
              }}
            ></div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "72.60px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "94.94px" }}
              className="cls_005"
            >
              <span className="cls_005">
                <b>Claim to Trust Money</b>
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "112.05px" }}
              className="cls_006"
            >
              <span className="cls_006">Under Section 117 (5) of the </span>
              <span className="cls_007">Legal Profession Act</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "124.65px" }}
              className="cls_006"
            >
              <span className="cls_006">Rule 119.27 (2)</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "197.18px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION A - CLAIMANT INFORMATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "224.18px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "224.18px" }}
              className="cls_002"
            >
              <span className="cls_002">Claimant's Name:</span>
              <input
                onChange={handleInputChange}
                id="claimantName"
                value={sectionA.ClaimantName}
                name="ClaimantName"
                defaultValue
                className="htmlInput"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "241.94px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "241.94px" }}
              className="cls_002"
            >
              <span className="cls_002">Mailing Address:</span>
              <input
                onChange={handleInputChange}
                id="mailingAddress"
                value={sectionA.MailingAddress}
                name="MailingAddress"
                className="htmlInput"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "259.85px" }}
              className="cls_002"
            >
              <span className="cls_002">City:</span>
              <input
                onChange={handleInputChange}
                id="sectionACity"
                value={sectionA.sectionACity}
                name="sectionACity"
                className="htmlInput"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "327.53px",
                top: "259.85px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Province:</span>
              <input
                onChange={handleInputChange}
                id="sectionAprovince"
                value={sectionA.sectionAProvince}
                name="sectionAProvince"
                className="htmlInput htmlInput_s"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "432.91px",
                top: "259.85px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Postal Code:</span>
              <input
                onChange={handleInputChange}
                id="sectionApostalCode"
                value={sectionA.sectionAPostalCode}
                name="sectionAPostalCode"
                className="htmlInput htmlInput_s"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "277.73px" }}
              className="cls_002"
            >
              <span className="cls_002">Country</span>
              <input
                onChange={handleInputChange}
                id="sectionAcountry"
                value={sectionA.sectionACountry}
                name="sectionACountry"
                className="htmlInput"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "295.61px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "295.61px" }}
              className="cls_002"
            >
              <span className="cls_002">Office Phone</span>
              <input
                onChange={handleInputChange}
                id="sectionAofficePhone"
                value={sectionA.sectionAOfficePhone}
                name="sectionAOfficePhone"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "305.69px",
                top: "295.61px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Home Phone</span>
              <input
                onChange={handleInputChange}
                id="sectionAhomePhone"
                value={sectionA.sectionAHomePhone}
                name="sectionAHomePhone"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "305.93px" }}
              className="cls_002"
            >
              <span className="cls_002">Number:</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "305.69px",
                top: "305.93px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Number:</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "322.25px" }}
              className="cls_002"
            >
              <span className="cls_002">Other Phone</span>
              <input
                onChange={handleInputChange}
                id="sectionAotherPhone"
                value={sectionA.sectionAOtherPhone}
                name="sectionAOtherPhone"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "305.69px",
                top: "322.25px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Fax Number:</span>
              <input
                onChange={handleInputChange}
                value={sectionA.sectionAFaxNumber}
                name="sectionAFaxNumber"
                id="sectionAfaxNumber"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "332.57px" }}
              className="cls_002"
            >
              <span className="cls_002">Number:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "349.01px" }}
              className="cls_002"
            >
              <span className="cls_002">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "349.01px" }}
              className="cls_002"
            >
              <span className="cls_002">Email:</span>
              <input
                onChange={handleInputChange}
                id="sectionAemail"
                value={sectionA.sectionAEmail}
                name="sectionAEmail"
                className="htmlInput"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "404.57px" }}
              className="cls_009"
            >
              <span className="cls_009">
                SECTION B - LAW FIRM TO WHOM TRUST MONIES WERE PAID
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "431.47px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "431.47px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm Name:</span>
              <input
                onChange={handleInputChange}
                value={sectionA.sectionBClaimantName}
                name="sectionBClaimantName"
                id="sectionBlawFirmName"
                className="htmlInput"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "449.35px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "449.35px" }}
              className="cls_002"
            >
              <span className="cls_002">Mailing Address:</span>
              <input
                onChange={handleInputChange}
                id="sectionBmailingAddress"
                value={sectionA.sectionBMailingAddress}
                name="sectionBMailingAddress"
                className="htmlInput"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "467.23px" }}
              className="cls_002"
            >
              <span className="cls_002">City:</span>
              <input
                onChange={handleInputChange}
                id="sectionBcity"
                value={sectionA.sectionBCity}
                name="sectionBCity"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "327.53px",
                top: "467.23px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Province:</span>
              <input
                onChange={handleInputChange}
                id="sectionBProvince"
                value={sectionA.sectionBProvince}
                name="sectionBProvince"
                className="htmlInput htmlInput_s"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "432.91px",
                top: "467.23px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Postal Code:</span>
              <input
                onChange={handleInputChange}
                id="sectionBPostalCode"
                value={sectionA.sectionBPostalCode}
                name="sectionBPostalCode"
                className="htmlInput htmlInput_s"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "484.99px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "484.99px" }}
              className="cls_002"
            >
              <span className="cls_002">Office Phone</span>
              <input
                onChange={handleInputChange}
                id="sectionBOfficePhone"
                value={sectionA.sectionBOfficePhone}
                name="sectionBOfficePhone"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "305.69px",
                top: "484.99px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Fax Number:</span>
              <input
                onChange={handleInputChange}
                value={sectionA.sectionBFaxNumber}
                name="sectionBFaxNumber"
                id="sectionBFaxNumber"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "495.43px" }}
              className="cls_002"
            >
              <span className="cls_002">Number:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "511.75px" }}
              className="cls_002"
            >
              <span className="cls_002">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "511.75px" }}
              className="cls_002"
            >
              <span className="cls_002">Email:</span>
              <input
                onChange={handleInputChange}
                value={sectionA.sectionBEmail}
                name="sectionBEmail"
                id="sectionBemail"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "529.63px" }}
              className="cls_002"
            >
              <span className="cls_002">5.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "529.63px" }}
              className="cls_002"
            >
              <span className="cls_002">Lawyer in Charge of</span>
              <input
                onChange={handleInputChange}
                id="sectionBLawyerInCharge"
                value={sectionA.sectionBLawyerInCharge}
                name="sectionBLawyerInCharge"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "539.95px" }}
              className="cls_002"
            >
              <span className="cls_002">File:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "556.27px" }}
              className="cls_002"
            >
              <span className="cls_002">6.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "556.27px" }}
              className="cls_002"
            >
              <span className="cls_002">File Number:</span>
              <input
                onChange={handleInputChange}
                id="sectionBFile"
                value={sectionA.sectionBFileNumber}
                name="sectionBFileNumber"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "700.34px" }}
              className="cls_013"
            >
              <span className="cls_013">
                The information provided in this form will be used by the Law
                Society of Alberta for one or more purposes contemplated by the
                Legal Profession Act ,the Rules of the Law Society, the Code of
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
              style={{
                position: "absolute",
                left: "54.00px",
                top: "735.82px",
                width: "90%",
                height: "1px",
                backgroundColor: "black",
              }}
            ></div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "726.82px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "736.06px" }}
              className="cls_015"
            >
              <span className="cls_015">December 2015</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_015"
            >
              <span className="cls_015">Page 1 of 2</span>
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
            <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img src width={612} height={792} />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "39.12px" }}
              className="cls_015"
            >
              <span className="cls_015">Law Society of Alberta</span>
            </div>
            <div
              style={{ position: "absolute", left: "485.86px", top: "39.12px" }}
              className="cls_015"
            >
              <span className="cls_015">Claim to Trust Money</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "62.92px",
                width: "90%",
                height: "1px",
                backgroundColor: "black",
              }}
            ></div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "52.92px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "79.70px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION C - DETAILS OF CLAIM</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "106.58px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "106.58px" }}
              className="cls_002"
            >
              <span className="cls_002">Claim Amount:</span>
              <input
                onChange={handleInputChange}
                id="sectionCClaimAmount"
                value={sectionA.sectionCClaimAmount}
                name="sectionCClaimAmount"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "124.46px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "124.46px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Please complete the following table showing the amounts paid and
                received in the law firm trust bank account on your behalf:
                (Alternatively you may attach a statement of funds received and
                disbursed or trust ledger card if so provided by the law firm)
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "80.66px", top: "134.78px" }}
              className="cls_002"
            >
              <span className="cls_002">behalf:</span>
            </div> */}
            {/* <div
              style={{
                position: "absolute",
                left: "112.82px",
                top: "134.78px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                (Alternatively you may attach a statement of funds received and
                disbursed or trust ledger card if so provided by
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "80.66px", top: "145.22px" }}
              className="cls_002"
            >
              <span className="cls_002">the law firm)</span>
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "101.18px",
                top: "161.54px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Date</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "151.58px",
                top: "161.54px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Source of Funds</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "265.01px",
                top: "161.54px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Payee</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "381.43px",
                top: "161.54px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Amount Received</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "488.86px",
                top: "161.54px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Amount Paid</span>
            </div>
            <div
              style={{ position: "absolute", left: "92.66px", top: "168.98px" }}
              className="cls_017"
            >
              <span className="cls_017">(mm/dd/yyyy)</span>
            </div>
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "80.66px",
                  top: "176.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "155.66px",
                  top: "176.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "250.66px",
                  top: "176.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "385.66px",
                  top: "176.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "490.66px",
                  top: "176.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
            </div>
            {/*  */}
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "80.66px",
                  top: "196.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "155.66px",
                  top: "196.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "250.66px",
                  top: "196.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "385.66px",
                  top: "196.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "490.66px",
                  top: "196.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
            </div>
            {/*  */}
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "80.66px",
                  top: "216.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "155.66px",
                  top: "216.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "250.66px",
                  top: "216.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "385.66px",
                  top: "216.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "490.66px",
                  top: "216.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
            </div>
            {/*  */}
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "80.66px",
                  top: "236.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "155.66px",
                  top: "236.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "250.66px",
                  top: "236.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "385.66px",
                  top: "236.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "490.66px",
                  top: "236.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
            </div>
            {/*  */}
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "80.66px",
                  top: "256.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "155.66px",
                  top: "256.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "250.66px",
                  top: "256.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "385.66px",
                  top: "256.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "490.66px",
                  top: "256.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
            </div>
            {/*  */}
            <div
              style={{
                position: "absolute",
                left: "338.35px",
                top: "278.01px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Totals</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "385.35px",
                top: "278.01px",
              }}
            >
              <input className="htmlInput htmlInput_s" />
            </div>
            <div
              style={{
                position: "absolute",
                left: "490.35px",
                top: "278.01px",
              }}
            >
              <input className="htmlInput htmlInput_s" />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "291.89px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "291.89px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Description of circumstances that gave rise to the claim:
              </span>
              <textarea
                value={sectionA.sectionCCircumstanceClaim}
                onChange={handleInputChange}
                name="sectionCCircumstanceClaim"
                id="descriptionOfCircumstances"
                defaultValue={""}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "389.93px" }}
              className="cls_002"
            >
              <span className="cls_002">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "389.93px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Other information that may be useful in verifying the claim:
              </span>
              <textarea
                value={sectionA.sectionCVerifyClaim}
                name="sectionCVerifyClaim"
                onChange={handleInputChange}
                id="otherInformation"
                defaultValue={""}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "525.79px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION D - CERTIFICATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.18px", top: "552.79px" }}
              className="cls_002"
            >
              <span className="cls_002">I,</span>
              <input
                onChange={handleInputChange}
                id="certificationName"
                value={sectionA.sectionCCertifyName}
                name="sectionCCertifyName"
                className="htmlInput"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "321.65px",
                top: "552.79px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                , certify that the foregoing information is complete
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.18px", top: "570.55px" }}
              className="cls_002"
            >
              <span className="cls_002">
                and correct to the best of my knowledge.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "621.10px" }}
              className="cls_008"
            >
              <span className="cls_008">Date </span>
              <input
                onChange={handleInputChange}
                id="certificationdate"
                type="date"
                value={sectionA.sectionCDate}
                name="sectionCDate"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "272.09px",
                top: "620.26px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Signature</span>
              <input
                onChange={handleInputChange}
                id="signature"
                value={sectionA.sectionCSignature}
                name="sectionCSignature"
                className="htmlInput htmlInput_m"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "660.10px" }}
              className="cls_018"
            >
              <span className="cls_018">
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
              {/* <span className="cls_019">Legal</span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "669.22px" }}
              className="cls_019"
            >
              <span className="cls_019">Profession Act</span>
              <span className="cls_018">
                , the Rules of the Law Society, the Code of Conduct, or a
                resolution of the Benchers and will be accessible to all
                departments of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "678.46px" }}
              className="cls_018"
            >
              <span className="cls_018">
                the Law Society, including the Alberta Lawyers Insurance
                Association. The information may be used or disclosed by the Law
                Society of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "687.58px" }}
              className="cls_018"
            >
              <span className="cls_018">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "696.82px" }}
              className="cls_018"
            >
              <span className="cls_018">
                obtain additional information, or to obtain clarification on the
                information you provided. Should you have any questions about
                this, please
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "706.18px" }}
              className="cls_018"
            >
              <span className="cls_018">
                contact the Privacy Officer at 403-229-4700.
              </span>
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "54.00px",
                top: "736.82px",
                width: "90%",
                height: "1px",
                backgroundColor: "black",
              }}
            ></div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "726.82px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "736.06px" }}
              className="cls_015"
            >
              <span className="cls_015">December 2015</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_015"
            >
              <span className="cls_015">Page 2 of 2</span>
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
};
export default ClaimToTrustMoney;
