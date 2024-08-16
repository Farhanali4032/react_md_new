import React, { useEffect, useRef, useState } from "react";
import ComplianceFormLayout from "../ComplianceFormLayout.tsx";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  fetchFormDetails,
  fetchLawyerResponsible,
  getUserSID,
  saveComplianceFormDetails,
} from "../../../utils/helpers";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router";
import ElectronicBankWithdrawalPrint from "./print/ElectronicBankWithdrawalPrint";

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

  const history = useHistory();

  const taskState = history.location.state;
  const [taskStatus, setTaskStatus] = useState(taskState);
  const handleInputChange = (e) => {
    setSectionA({ ...sectionA, [e.target.name]: e.target.value });
  };

  const saveDocument = () => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };

  const printDocument = useReactToPrint({
    content: () => compliancePDF.current,
  });

  useEffect(async () => {
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

  const [sectionA, setSectionA] = useState({
    transferForFees: "",
    transferFor25Million: "",
    transferToClient: "",
    LawFirmName: "",
    LawyerResponsibleForFile: "",
    clientReqInstrucMain: "",
    lawyerApproved: "",
    transferFees: "",
    firmVerifiedPay: "",
    comments: "",
    Date: "",
    Signature: "",
  });

  const headings = [
    "Date Discovered",
    "Date Occured",
    "Date Corrected",
    "Amount",
    "Reason (Select one of the following)",
  ];

  const ref = useRef(null);

  return (
    <ComplianceFormLayout
      title="Electronic Banking Withdrawal"
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
        <ElectronicBankWithdrawalPrint
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
              '\n  <!--\n  span.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_006{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_006{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_007{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_007{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_014{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\n  div.cls_014{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_011{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_011{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_012{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_012{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_013{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_013{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  -->\n  ',
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
              <span className="cls_005">Electronic Banking Withdrawal</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "112.05px" }}
              className="cls_006"
            >
              <span className="cls_006">Rule 119.42</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50.00px",
                top: "137.06px",
                border: "1.5px solid black",
                width: "90%",
                height: "18%",
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
                1. This form must be completed for all electronic payments under
                Rule 119.42.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "170.06px" }}
              className="cls_002"
            >
              <span className="cls_002">
                2. The law firm must obtain written instructions from the payee
                detailing the destination account (account name, account number,
                financial institution and financial institution address) except
                if transferring to another account of the law firm.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "68.42px", top: "180.38px" }}
              className="cls_002"
            >
              <span className="cls_002">
                number, financial institution and financial institution address)
                except if transferring to another account of the law firm.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "206.70px" }}
              className="cls_002"
            >
              <span className="cls_002">
                3. The law firm must obtain within two banking days of the
                withdrawal a hardcopy confirmation from the financial
                institution showing the withdrawal date, source account,
                destination account and amount.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "68.42px", top: "207.02px" }}
              className="cls_002"
            >
              <span className="cls_002">
                showing the withdrawal date, source account, destination account
                and amount.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "232.34px" }}
              className="cls_002"
            >
              <span className="cls_002">
                4. Attach this form to the payee written instructions (if
                applicable), financial institution confirmation and batch
                transfer breakdown (if applicable). Do{" "}
                <span className="cls_014">NOT</span> send this form to the Law
                Society of Alberta.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "68.42px", top: "233.78px" }}
              className="cls_002"
            >
              <span className="cls_002">breakdown (if applicable). Do </span>
              <span className="cls_014">NOT</span>
              <span className="cls_002">
                {" "}
                send this form to the Law Society of Alberta.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "260.10px" }}
              className="cls_002"
            >
              <span className="cls_002">
                5. A member practising as a sole practitioner is a “Law Firm” as
                defined in the Rules.
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "108.86px",
                top: "282.53px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                {" "}
                <input
                  type="checkbox"
                  className="htmlcheckbox"
                  checked={sectionA.transferFor25Million}
                  name="transferFor25Million"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      transferFor25Million: e.target.checked,
                    })
                  }
                />{" "}
                Transfer of $25million or more
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "108.86px",
                top: "298.85px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                {" "}
                <input
                  type="checkbox"
                  className="htmlcheckbox"
                  checked={sectionA.transferForFees}
                  name="transferForFees"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      transferForFees: e.target.checked,
                    })
                  }
                />{" "}
                Transfer for fees
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "108.86px",
                top: "315.17px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  type="checkbox"
                  className="htmlcheckbox"
                  checked={sectionA.transferToClient}
                  name="transferToClient"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      transferToClient: e.target.checked,
                    })
                  }
                />{" "}
                Transfer to client or third party (less than $25million)
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "342.77px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION A - LAW FIRM INFORMATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "369.77px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "369.77px" }}
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
              style={{ position: "absolute", left: "54.00px", top: "387.53px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "387.53px" }}
              className="cls_002"
            >
              <span className="cls_002">Lawyer responsible</span>
              <input
                className="htmlInput"
                id="lawyerResponsibleForFile"
                name="LawyerResponsibleForFile"
                value={sectionA.LawyerResponsibleForFile}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "397.97px" }}
              className="cls_002"
            >
              <span className="cls_002">for file:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "425.59px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION B - WITHDRAWAL CHECKLIST</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "452.47px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "80.66px",
                top: "452.47px",
                maxWidth: "60%",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                Client request instructions are maintained with the law firm
                banking records,including bank account number and name.
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "405.91px",
                top: "452.47px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="clientRequestMaintained"
                  type="radio"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, clientReqInstrucMain: "Yes" })
                  }
                  checked={sectionA.clientReqInstrucMain === "Yes"}
                  className="radio_box_html"
                />
                Yes
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "459.91px",
                top: "452.47px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="clientRequestMaintained"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, clientReqInstrucMain: "No" })
                  }
                  checked={sectionA.clientReqInstrucMain === "No"}
                />
                No
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "513.94px",
                top: "452.47px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="clientRequestMaintained"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, clientReqInstrucMain: "N/A" })
                  }
                  checked={sectionA.clientReqInstrucMain === "N/A"}
                />
                N/A
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "80.66px", top: "462.79px" }}
              className="cls_002"
            >
              <span className="cls_002">
                including bank account number and name.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "479.23px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "479.23px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Lawyer has approved and/or executed this transaction.
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "405.91px",
                top: "479.23px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="lawyerApproved"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, lawyerApproved: "Yes" })
                  }
                  checked={sectionA.lawyerApproved === "Yes"}
                />
                Yes
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "459.91px",
                top: "479.23px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="lawyerApproved"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, lawyerApproved: "No" })
                  }
                  checked={sectionA.lawyerApproved === "No"}
                />
                No
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "513.94px",
                top: "479.23px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="lawyerApproved"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, lawyerApproved: "N/A" })
                  }
                  checked={sectionA.lawyerApproved === "N/A"}
                />
                N/A
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "495.55px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "495.55px" }}
              className="cls_002"
            >
              <span className="cls_002">
                If transfer is for fees, the amounts are itemized as per the
                client files.
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "405.91px",
                top: "495.55px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="transferIsForFees"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, transferFees: "Yes" })
                  }
                  checked={sectionA.transferFees === "Yes"}
                />
                Yes
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "459.91px",
                top: "495.55px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="transferIsForFees"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, transferFees: "No" })
                  }
                  checked={sectionA.transferFees === "No"}
                />
                No
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "513.94px",
                top: "495.55px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="transferIsForFees"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, transferFees: "N/A" })
                  }
                  checked={sectionA.transferFees === "N/A"}
                />
                N/A
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "511.87px" }}
              className="cls_002"
            >
              <span className="cls_002">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "511.87px" }}
              className="cls_002"
            >
              <span className="cls_002">Law firm has verified payment.</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "405.91px",
                top: "511.87px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="LawFirmHasVerifiedPayment"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, firmVerifiedPay: "Yes" })
                  }
                  checked={sectionA.firmVerifiedPay === "Yes"}
                />
                Yes
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "459.91px",
                top: "511.87px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="LawFirmHasVerifiedPayment"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, firmVerifiedPay: "No" })
                  }
                  checked={sectionA.firmVerifiedPay === "No"}
                />
                No
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "513.94px",
                top: "511.87px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  name="LawFirmHasVerifiedPayment"
                  type="radio"
                  className="radio_box_html"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, firmVerifiedPay: "N/A" })
                  }
                  checked={sectionA.firmVerifiedPay === "N/A"}
                />
                N/A
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "528.19px" }}
              className="cls_002"
            >
              <span className="cls_002">5.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "528.19px" }}
              className="cls_002 w-75"
            >
              <span className="cls_002">Comments (if any):</span>
              <textarea
                id="comments"
                value={sectionA.comments}
                onChange={(e) => handleInputChange(e)}
                name="comments"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "621.22px" }}
              className="cls_009"
            >
              <span className="cls_009">SECTION C - LAWYER APPROVAL</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "648.22px" }}
              className="cls_002"
            >
              <span className="cls_002">Dated:</span>
              <input
                className="htmlInput htmlInput_s"
                id="dated"
                value={sectionA.Date}
                onChange={(e) => handleInputChange(e)}
                name="Date"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "329.45px",
                top: "662.98px",
              }}
              className="cls_010"
            >
              <span className="cls_010">Signature</span>
              <input
                className="htmlInput htmlInput_s"
                id="signature"
                value={sectionA.Signature}
                onChange={(e) => handleInputChange(e)}
                name="Signature"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "700.34px" }}
              className="cls_011"
            >
              <span className="cls_011">
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
              <span className="cls_013">December 2015</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_013"
            >
              <span className="cls_013">Page 1 of 1</span>
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
  //   <ComplianceFormLayout title="Electronic Banking Withdrawal">
  //     <h1>Electronic Banking Withdrawal</h1>
  //     <h4>Rules 119.42</h4>

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
  //       label="Law Responsible For File"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, LawyerResponsibleForFile: e.target.value })
  //       }
  //       type="text"
  //       margin="0.9rem 0rem"
  //       value={sectionA.LawyerResponsibleForFile}
  //     />

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION B – WITHDRAWAL CHECKLIST
  //     </h4>

  //     <CheckboxLayoutRight
  //       heading="Client request instructions are maintained with the law firm banking records, including bank account number and name"
  //       options={["Yes", "No", "N/A"]}
  //       sectionB={sectionB}
  //       stateOption={"clientReqInstrucMain"}
  //       setSectionB={setSectionB}
  //     />

  //     <CheckboxLayoutRight
  //       heading="Lawyer has approved and/or executed this transaction."
  //       options={["Yes", "No", "N/A"]}
  //       sectionB={sectionB}
  //       stateOption="lawyerApproved"
  //       setSectionB={setSectionB}
  //     />
  //     <CheckboxLayoutRight
  //       heading="If transfer is for fees, the amounts are itemized as per the client files."
  //       options={["Yes", "No", "N/A"]}
  //       sectionB={sectionB}
  //       stateOption="transferFees"
  //       setSectionB={setSectionB}
  //     />
  //     <CheckboxLayoutRight
  //       heading="Law firm has verified payment."
  //       options={["Yes", "No", "N/A"]}
  //       sectionB={sectionB}
  //       stateOption="firmVerifiedPay"
  //       setSectionB={setSectionB}
  //     />

  //     <div className="heading-5">Comments (if any):</div>

  //     <textarea
  //       name="Comments"
  //       id="comments"
  //       cols="7"
  //       className="heading-5"
  //       rows="7"
  //       onChange={(e) => setSectionB({ ...sectionB, comments: e.target.value })}
  //       value={sectionB.comments}
  //     ></textarea>

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION C – LAWYER APPROVAL
  //     </h4>
  //     <div className="justify-content-between">
  //       <InputCustom
  //         label=""
  //         handleChange={(e) =>
  //           setSectionC({
  //             ...sectionC,
  //             Date: e.target.value,
  //           })
  //         }
  //         type="date"
  //         margin="1.8rem 0rem"
  //         value={sectionC.Date}
  //       />

  //       <InputCustom
  //         label="Signature"
  //         handleChange={(e) =>
  //           setSectionC({
  //             ...sectionC,
  //             Signature: e.target.value,
  //           })
  //         }
  //         type="text"
  //         margin="1.8rem 0rem"
  //         value={sectionC.Signature}
  //       />
  //     </div>
  //   </ComplianceFormLayout>
  // );
};

export default ShortageSelfReportForm;
