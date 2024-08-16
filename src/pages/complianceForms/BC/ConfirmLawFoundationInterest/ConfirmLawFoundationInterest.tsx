import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { Task } from "../../../../components/Tasks/Task";
import axios from "../../../../utils/axios";
import {
  fetchFormDetails,
  getBodyStatusCode,
  getCompanyInfo,
  getUserSID,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
import ComplianceFormLayout from "../../ComplianceFormLayout";
import ConfirmInterestRemittance from "../print/ConfirmInterestRemittance";
import { useReactToPrint } from "react-to-print";

const ConfirmLawFoundationInterest = () => {
  const compliancePDF = useRef(null);
  const [sectionA, setSectionA] = useState({
    clioTrustAccountBankNameAccount: "",
    lawFirmNameAddressContact: "",
    clientAuthorizedSignature: "",
    clientAuthorizedSignature2: "",
    pooledTrustAccountNumber: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
    authorizedSignatureOfFinancialInstitution: "",
    date2: "",
    branchContactNameTelNum: "",
    lawFirmNameAddress: "",
  });
  const history: any = useHistory();
  const taskState: Task = history.location.state;

  console.log("taskState", taskState);

  const [taskStatus, setTaskStatus] = useState(taskState);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setSectionA({ ...sectionA, [e.target.name]: e.target.value });
  };
  const saveDocument = (): void => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };

  useEffect(() => {
    const fetchFormDetailsFunc = async () => {
      const { formDetails, isFormFilled } = await fetchFormDetails(
        taskStatus.id
      );

      console.log("form details", formDetails);
      console.log("form details", isFormFilled);

      if (isFormFilled) {
        setSectionA({
          ...formDetails,
        });
      } else {
        const clioTrustAccount = axios.get(
          `/data-matters-info/${getUserSID()}/${taskStatus.client_id}`
        );

        const clioBankAccountDetails = axios.get(
          `/clio-account-details/${parseInt(taskStatus.clio_trust_account)}`
        );

        Promise.all([clioTrustAccount, clioBankAccountDetails])
          .then(([clioBank]) => {
            const { body: clioBankBody } = getBodyStatusCode(clioBank);

            // const { body: clioTrustBody } = getBodyStatusCode(clioTrust);

            setSectionA({
              ...sectionA,
              clioTrustAccountBankNameAccount:
                clioBankBody[0].account_name + clioBankBody[0].bank_name,
              lawFirmNameAddressContact:
                getCompanyInfo()?.companyname +
                " " +
                getCompanyInfo()?.legaladdress.Line1 +
                " " +
                getCompanyInfo()?.legaladdress.CountrySubDivisionCode +
                " " +
                getCompanyInfo()?.legaladdress.PostalCode,

              lawFirmNameAddress:
                getCompanyInfo()?.companyname +
                " " +
                getCompanyInfo()?.legaladdress.Line1 +
                " " +
                getCompanyInfo()?.legaladdress.CountrySubDivisionCode +
                " " +
                getCompanyInfo()?.legaladdress.PostalCode,
            });
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    };

    fetchFormDetailsFunc();

    // const getListofUsers = async () => {
    //   const allUsers = await axios.get(
    //     `/user/list/${getUserSID()}/${getUserId()}`
    //   );

    //   const { body } = getBodyStatusCode(allUsers);

    //   console.log("list of users", body);
    //   setListOfUser(body);
    // };

    // getListofUsers();
  }, []);

  const printDocument = useReactToPrint({
    content: () => compliancePDF.current,
  });

  return (
    <ComplianceFormLayout
      title="Confirm Interest Remittance"
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
        <ConfirmInterestRemittance taskData={taskState} ref={compliancePDF} />
      </div>
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '\n<!--\nspan.cls_003{font-family:Arial,serif;font-size:16.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_003{font-family:Arial,serif;font-size:16.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_004{font-family:Times,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Times,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Times,serif;font-size:8.7px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_005{font-family:Times,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_015{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_015{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_009{font-family:"Calibri",serif;font-size:11.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_009{font-family:"Calibri",serif;font-size:11.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_010{font-family:Times,serif;font-size:14.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_010{font-family:Times,serif;font-size:14.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_011{font-family:Times,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_011{font-family:Times,serif;font-size:11.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_006{font-family:Times,serif;font-size:11.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_006{font-family:Times,serif;font-size:11.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_012{font-family:Times,serif;font-size:11.0px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_012{font-family:Times,serif;font-size:11.0px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_007{font-family:Times,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_007{font-family:Times,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_013{font-family:Times,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_013{font-family:Times,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n-->\n',
          }}
        />
        <div className="page_container" id="page_container">
          <div
            style={{
              position: "absolute",
              left: "47%",
              marginLeft: "-306px",
              top: "0px",
              width: "612px",
              height: "150%",
              borderStyle: "",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="/BCForms/ConfirmLawFoundationInterest/background12.jpg"
                width={612}
                alt="Background 1 for Confirm Law Foundation"
                height={792}
              />
            </div>
            <div
              style={{ position: "absolute", left: "85.56px", top: "34.92px" }}
              className="cls_003"
            >
              <span className="cls_003">Confirm Law Foundation Interest</span>
            </div>
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "77.64px",
                  top: "72.06px",
                }}
                className="cls_004"
              >
                <span className="cls_004">Financial institution</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "293.40px",
                  top: "72.06px",
                }}
                className="cls_004"
              >
                <span className="cls_004">Law firm </span>
                <span className="cls_005">
                  (Name, address &amp; contact information)
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "77.64px",
                  top: "82.86px",
                }}
                className="cls_005"
              >
                <span className="cls_005">(Name, branch &amp; address)</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "83.22px",
                  top: "107.40px",
                }}
                className="cls_015"
              >
                <span className="cls_015"></span>
                <textarea
                  onChange={handleInputChange}
                  style={{
                    marginLeft: "0rem",
                    position: "absolute",
                    right: "-460px",
                    top: "-20px",
                    filter: "none",
                    fontSize: "10px",
                    height: "4rem",
                    border: "none",
                    outline: "none",
                    padding: "0px",
                    resize: "none",
                  }}
                  value={sectionA.lawFirmNameAddressContact}
                  name="lawFirmNameAddressContact"
                  className="htmlInput htmlInput_lg"
                ></textarea>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "293.40px",
                  top: "125.84px",
                  maxWidth: "40%",
                  fontSize: "0.5rem",
                }}
                className="cls_005"
              >
                <span className="cls_005">
                  The financial institution is authorized to provide the details
                  requested herein to the Law Society of British Columbia.
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "83.22px",
                  top: "120.81px",
                }}
                className="cls_015"
              >
                <span className="cls_015"></span>

                <input
                  style={{
                    position: "absolute",
                    left: "-20.22px",
                    top: "30.81px",
                    padding: "0.2rem",
                    height: "1.5rem",
                    fontSize: "10px",
                  }}
                  // rows={10}
                  onChange={handleInputChange}
                  value={sectionA.clioTrustAccountBankNameAccount || ""}
                  name="clioTrustAccountBankNameAccount"
                  className="htmlInput"
                />
              </div>
              {/* <div
              style={{
                position: "absolute",
                left: "293.40px",
                top: "131.22px",
              }}
              className="cls_005"
            >
              <span className="cls_005">
                herein to the Law Society of British Columbia.
              </span>
            </div> */}
              <div
                style={{
                  position: "absolute",
                  left: "293.40px",
                  top: "159.36px",
                }}
                className="cls_009"
              >
                <span className="cls_009">
                  <input
                    onChange={handleInputChange}
                    type="text"
                    style={{ marginLeft: "0rem" }}
                    value={sectionA.clientAuthorizedSignature}
                    name="clientAuthorizedSignature"
                    className="htmlInput"
                  />
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "427.80px",
                  top: "159.36px",
                }}
                className="cls_009"
              >
                <span className="cls_009">
                  <input
                    onChange={handleInputChange}
                    type="text"
                    style={{ marginLeft: "0rem" }}
                    value={sectionA.clientAuthorizedSignature2}
                    name="clientAuthorizedSignature2"
                    className="htmlInput"
                  />
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "293.40px",
                  top: "172.50px",
                }}
                className="cls_005"
              >
                <span className="cls_005">Client’s authorized signature</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "426.66px",
                  top: "172.50px",
                }}
                className="cls_005"
              >
                <span className="cls_005">Client’s authorized signature</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "293.40px",
                  top: "188.82px",
                }}
                className="cls_004"
              >
                <span className="cls_004">Pooled trust account number(s)</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "293.40px",
                  top: "204.54px",
                }}
                className="cls_010"
              >
                <span className="cls_010">
                  <input
                    onChange={handleInputChange}
                    type="text"
                    value={sectionA.pooledTrustAccountNumber}
                    name="pooledTrustAccountNumber"
                    style={{ marginLeft: "0rem" }}
                    className="htmlInput htmlInput_m"
                  />
                </span>
              </div>
            </div>
            <div
              style={{ position: "absolute", left: "72.00px", top: "239.22px" }}
              className="cls_011"
            >
              <span className="cls_011">Date </span>
              <span className="cls_006">
                <input
                  onChange={handleInputChange}
                  type="date"
                  value={sectionA.date}
                  name="date"
                  className="htmlInput"
                />
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.00px", top: "260.80px" }}
              className="cls_006"
            >
              <span className="cls_006">Dear Sir or Madam:</span>
            </div>
            <div
              style={{ position: "absolute", left: "72.00px", top: "280.34px" }}
              className="cls_006"
            >
              <span className="cls_006">
                Our law firm is in the process of updating our records and,
                pursuant to the regulations of the Law Society of British
                Columbia and the <i>Legal Profession Act</i> , a lawyer who
                opens or maintains a pooled trust account must direct the
                savings institution to remit the interest earned on the pooled
                trust account, net of service charges if any, to the Law
                Foundation of British Columbia (Foundation).
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "72.00px", top: "304.86px" }}
              className="cls_006"
            >
              <span className="cls_006">of British Columbia and the </span>
              <span className="cls_012">Legal Profession Act</span>
              <span className="cls_006">
                , a lawyer who opens or maintains a pooled trust
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "72.00px", top: "319.44px" }}
              className="cls_006"
            >
              <span className="cls_006">
                account must direct the savings institution to remit the
                interest earned on the pooled trust account, net of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "72.00px", top: "333.96px" }}
              className="cls_006"
            >
              <span className="cls_006">
                service charges if any, to the Law Foundation of British
                Columbia (Foundation).
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "72.00px", top: "360.50px" }}
              className="cls_006"
            >
              <span className="cls_006">
                Interest rate agreements on pooled trust accounts are negotiated
                between the Foundation and senior executives at your financial
                institution. At the branch level it may not be readily apparent
                that the interest is being calculated and remitted to the
                Foundation as, in some instances, this process may be performed
                at a central administration branch.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "72.00px", top: "373.08px" }}
              className="cls_006"
            >
              <span className="cls_006">
                executives at your financial institution. At the branch level it
                may not be readily apparent that the interest
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.00px", top: "387.60px" }}
              className="cls_006"
            >
              <span className="cls_006">
                is being calculated and remitted to the Foundation as, in some
                instances, this process may be performed at
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.00px", top: "402.12px" }}
              className="cls_006"
            >
              <span className="cls_006">a central administration branch.</span>
            </div> */}
            <div
              style={{ position: "absolute", left: "72.00px", top: "425.72px" }}
              className="cls_006"
            >
              <span className="cls_006">
                As we are updating our records for audit purposes, we require
                written confirmation that interest is being calculated on the
                pooled trust account and that this interest is being remitted to
                the Foundation as required. If you are unable to confirm this is
                being done at the branch level, please contact your central
                administration branch for verification.
              </span>
              {/* <span className="cls_011">is</span>
              <span className="cls_006"> being</span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "72.00px", top: "441.24px" }}
              className="cls_006"
            >
              <span className="cls_006">
                calculated on the pooled trust account{" "}
              </span>
              <span className="cls_011">and</span>
              <span className="cls_006">
                {" "}
                that this interest is being remitted to the Foundation as
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "72.00px", top: "455.76px" }}
              className="cls_006"
            >
              <span className="cls_006">
                required. If you are unable to confirm this is being done at the
                branch level, please contact your central
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.00px", top: "470.34px" }}
              className="cls_006"
            >
              <span className="cls_006">
                administration branch for verification.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "73.92px", top: "497.34px" }}
              className="cls_011"
            >
              <span className="cls_011">
                TO BE COMPLETED BY FINANCIAL INSTITUTION
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "73.92px",
                top: "517.92px",
                maxWidth: "80%",
              }}
              className="cls_011"
            >
              <span className="cls_011">
                We hereby acknowledge and confirm that the interest is being
                calculated on the above-noted pooled trust account and that the
                interest earned has been, and is being, paid to the Law
                Foundation of British Columbia.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "73.92px", top: "532.44px" }}
              className="cls_011"
            >
              <span className="cls_011">
                trust account and that the interest earned has been, and is
                being, paid to the Law Foundation of
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "73.92px", top: "547.02px" }}
              className="cls_011"
            >
              <span className="cls_011">British Columbia.</span>
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "73.92px",
                top: "567.48px",
              }}
              className="cls_006"
            >
              <span
                className="cls_006"
                style={{ display: "flex", fontSize: "1rem" }}
              >
                Authorized signature of financial institution
                <input
                  type="text"
                  value={sectionA.authorizedSignatureOfFinancialInstitution}
                  name="authorizedSignatureOfFinancialInstitution"
                  onChange={handleInputChange}
                  className="htmlInput htmlInput_m"
                />
                <input
                  type="date"
                  value={sectionA.date2}
                  name="date2"
                  onChange={handleInputChange}
                  className="htmlInput htmlInput_s2"
                  style={{ marginLeft: "0.5rem" }}
                />
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "73.92px",
                top: "588.06px",
              }}
              className="cls_006"
            >
              <span className="cls_006" style={{ fontSize: "1rem" }}>
                Branch Contact (Name and telephone number){" "}
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="htmlInput"
                  value={sectionA.branchContactNameTelNum}
                  name="branchContactNameTelNum"
                  style={{ marginLeft: "0rem" }}
                />
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.00px", top: "619.50px" }}
              className="cls_011"
            >
              <span className="cls_011">
                Please mail or fax this form back to our firm with a copy to the
                Law Society of British Columbia.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "77.40px", top: "645.96px" }}
              className="cls_007"
            >
              <span className="cls_007">Law firm name and address</span>

              <textarea
                rows={10}
                cols={10}
                style={{
                  position: "absolute",
                  left: "-20.40px",
                  top: "20.96px",
                  resize: "none",
                  width: "150%",
                  height: "70px",
                  outline: "none",
                  border: "none",
                }}
                value={sectionA.lawFirmNameAddress}
                name="lawFirmNameAddress"
                onChange={handleInputChange}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "311.22px",
                top: "646.08px",
              }}
              className="cls_013"
            >
              <span className="cls_013">
                The Law Society of British Columbia
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "311.22px",
                top: "659.22px",
              }}
              className="cls_007"
            >
              <span className="cls_007">Attention: Trust Assurance </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "311.22px",
                top: "672.42px",
              }}
              className="cls_007"
            >
              <span className="cls_007">845 Cambie Street</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "311.22px",
                top: "685.68px",
              }}
              className="cls_007"
            >
              <span className="cls_007">Vancouver, BC V6B 4Z9</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "311.22px",
                top: "698.87px",
              }}
              className="cls_007"
            >
              <span className="cls_007">Email: trustaccounting@lsbc.org</span>
            </div>
          </div>
        </div>
      </div>
    </ComplianceFormLayout>
  );
};

export default ConfirmLawFoundationInterest;
