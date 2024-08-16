import React, { useEffect, useRef, useState, forwardRef } from "react";
import { Container } from "react-bootstrap";
import moment from "moment";
import {
  fetchFormDetails,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
import { Task } from "../../../../components/Tasks/Task";

type Props = {
  taskData: Task;
};

const LetterHeadPrint = forwardRef(({ taskData }: Props, ref) => {
  const [sectionA, setSectionA] = useState({
    dateAutoPopulated: moment().format("YYYY-MM-DD"),
    domicileBranch: "",
    address: "",
    lawyerFirm: "",
    accountName: "",
    transitNo: "",
    accountNo: "",
    dateAccountOpened: "",
    confirmResponsibleLawyer: "",
    accountDetailsAccountNumber: "",
    perSign: "",
    perAddress: "",
    nameOfFinancialInstitution: "",
    allbankServiceCharges: "",
    clioAccountGeneral: "",
    date: "",
    authSignature: "",
    printedTitle: "",
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
    const { formDetails, isFormFilled } = await fetchFormDetails(taskState.id);

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
              "\n  <!--\n  span.cls_003{font-family:Times,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_003{font-family:Times,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_004{font-family:Times,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_004{font-family:Times,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_013{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_013{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_002{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_002{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_025{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\n  div.cls_025{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_006{font-family:Times,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_006{font-family:Times,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_009{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_009{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_010{font-family:Times,serif;font-size:7.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_010{font-family:Times,serif;font-size:7.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_011{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_011{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_012{font-family:Times,serif;font-size:6.5px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_012{font-family:Times,serif;font-size:6.5px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_020{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\n  div.cls_020{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_019{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_019{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_026{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\n  div.cls_026{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_021{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_021{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_022{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_022{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_027{font-family:Times,serif;font-size:9.7px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: underline}\n  div.cls_027{font-family:Times,serif;font-size:9.7px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_028{font-family:Times,serif;font-size:9.7px;color:rgb(0,0,255);font-weight:normal;font-style:normal;text-decoration: underline}\n  div.cls_028{font-family:Times,serif;font-size:9.7px;color:rgb(0,0,255);font-weight:normal;font-style:normal;text-decoration: none}\n  -->\n  ",
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
            {/* <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="https://www.lawsociety.ab.ca/wp-content/themes/law-society/assets/images/lsa-logo.png"
                className="logo_html"
              />
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "268.61px",
                top: "131.14px",
              }}
              className="cls_003"
            >
              <span className="cls_003">(LETTERHEAD)</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.30px", top: "144.94px" }}
              className="cls_004"
            >
              <span className="cls_004">To the Manager</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "397.27px",
                top: "144.20px",
              }}
              className="cls_013"
            >
              <input
                onChange={(e) => handleInputChange(e)}
                className="htmlInput"
                name="dateAutoPopulated"
                style={{ width: "9rem" }}
                value={sectionA.dateAutoPopulated}
              />{" "}
              <span className="cls_002"> (Date)</span>
            </div>
            <div
              style={{ position: "absolute", left: "74.88px", top: "193.49px" }}
              className="cls_025"
            >
              <span className="cls_025">
                {" "}
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  name="nameOfFinancialInstitution"
                  value={sectionA.nameOfFinancialInstitution}
                />{" "}
              </span>
              {/* <span className="cls_013">Institution</span> */}
            </div>
            <div
              style={{ position: "absolute", left: "78.02px", top: "214.58px" }}
              className="cls_006"
            >
              <span className="cls_006">
                (Name of Chartered Bank, Trust Company Credit
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "78.02px", top: "226.10px" }}
              className="cls_006"
            >
              <span className="cls_006">Union, Financial Institution)</span>
            </div>
            <div
              style={{ position: "absolute", left: "60.20px", top: "240.74px" }}
              className="cls_025"
            >
              <span className="cls_025">
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput"
                  name="domicileBranch"
                  value={sectionA.domicileBranch}
                />
              </span>
              {/* <span className="cls_013"> domicile branch</span> */}
            </div>
            <div
              style={{ position: "absolute", left: "78.02px", top: "265.01px" }}
              className="cls_006"
            >
              <span className="cls_006">(Branch)</span>
            </div>
            <div
              style={{ position: "absolute", left: "78.63px", top: "279.88px" }}
              className="cls_013"
            >
              <span className="cls_013">
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  name="address"
                  value={sectionA.address}
                />
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "78.02px", top: "303.73px" }}
              className="cls_006"
            >
              <span className="cls_006">(Address)</span>
            </div>
            <div
              style={{ position: "absolute", left: "78.02px", top: "338.93px" }}
              className="cls_009"
            >
              <span className="cls_009">Re:</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "113.90px",
                top: "338.93px",
              }}
              className="cls_009"
            >
              <span className="cls_009">
                Interest on Lawyers’ Pooled Trust Account
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "372.43px",
              }}
              className="cls_009"
            >
              <span className="cls_009">Lawyer/Firm</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "184.03px",
                top: "369.55px",
              }}
              className="cls_025"
            >
              <span className="cls_025">
                {" "}
                <input
                  onChange={(e) => handleInputChange(e)}
                  value={sectionA.lawyerFirm}
                  name="lawyerFirm"
                  className="htmlInput htmlInput_m"
                />{" "}
              </span>
              <span className="cls_013" />
            </div>
            <div
              style={{
                position: "absolute",
                left: "192.66px",
                top: "391.64px",
              }}
              className="cls_013"
            >
              <span className="cls_013">
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  value={sectionA.accountName}
                  name="accountName"
                />
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "396.91px",
              }}
              className="cls_009"
            >
              <span className="cls_009">Account Name</span>
              <span className="cls_010">
                <sup>1</sup>
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "171.97px",
                top: "417.40px",
              }}
              className="cls_013"
            >
              <span className="cls_013">
                {" "}
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput"
                  name="transitNo"
                  value={sectionA.transitNo}
                />{" "}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "421.41px",
              }}
              className="cls_009"
            >
              <span className="cls_009">Transit No.</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "445.89px",
              }}
              className="cls_009"
            >
              <span className="cls_009">Account No.</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "177.30px",
                top: "443.09px",
              }}
              className="cls_025"
            >
              <span className="cls_025">
                {" "}
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput"
                  name="accountNo"
                  value={sectionA.accountNo}
                />{" "}
              </span>
              <span className="cls_013" />
            </div>
            <div
              style={{
                position: "absolute",
                left: "223.01px",
                top: "466.15px",
              }}
              className="cls_013"
            >
              <span className="cls_013">
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput"
                  value={sectionA.dateAccountOpened}
                  name="dateAccountOpened"
                />{" "}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "470.25px",
              }}
              className="cls_009"
            >
              <span className="cls_009">Date Account Opened</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "506.97px",
              }}
              className="cls_009"
            >
              <span className="cls_009">
                I confirm that the designation of a Responsible Lawyer and
                authorization to maintain a
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "519.45px",
              }}
              className="cls_009"
            >
              <span className="cls_009">
                trust account has been approved by the Law Society of Alberta
                for this law firm, in
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "531.93px",
              }}
              className="cls_009"
            >
              <span className="cls_009">
                accordance with Law Society Rule 119.1
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "545.25px",
              }}
              className="cls_011"
            >
              <span className="cls_011" />
              <span className="cls_002">
                <input
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      confirmResponsibleLawyer: "Yes",
                    })
                  }
                  className="radio_box_html"
                  type="radio"
                  checked={sectionA.confirmResponsibleLawyer === "Yes"}
                />{" "}
                Yes
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "114.02px",
                top: "558.57px",
              }}
              className="cls_011"
            >
              <span className="cls_011" />
              <span className="cls_002">
                <input
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      confirmResponsibleLawyer: "No",
                    })
                  }
                  className="radio_box_html"
                  type="radio"
                  checked={sectionA.confirmResponsibleLawyer === "No"}
                />{" "}
                No
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.02px",
                top: "674.94px",
                width: "90%",
                height: "1px",
                backgroundColor: "black",
              }}
            ></div>
            <div
              style={{ position: "absolute", left: "72.02px", top: "680.94px" }}
              className="cls_012"
            >
              <span className="cls_012">
                <sup>1</sup>
              </span>
              <span className="cls_006">
                {" "}
                This is the name that will appear on the monthly bank statement.
                It must include the name of the law firm as well as the type of
                account. Type of account should be a “pooled trust account’.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "72.02px", top: "696.46px" }}
              className="cls_006"
            >
              <span className="cls_006">
                as the type of account. Type of account should be a “pooled
                trust account’.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "72.02px", top: "707.98px" }}
              className="cls_006"
            >
              <span className="cls_006">November 2020</span>
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
                src="3931c420-82ea-11ec-a980-0cc47a792c0a_id_3931c420-82ea-11ec-a980-0cc47a792c0a_files/background2.jpg"
                width={612}
                height={792}
              />
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "72.02px",
                top: "30.18px",
                maxWidth: "87%",
              }}
              className="cls_004"
            >
              <span className="cls_004">
                In accordance with Section 126(1) of The Legal Profession Act,
                you are hereby authorized and directed, until further notice, to
                remit interest on the above noted trust account to The Alberta
                Law Foundation. Remittances must be made in accordance with your
                agreement with the Foundation. In the event that there is no
                agreement in place, please contact the Executive Director of the
                Law Foundation. As the above-named account is a lawyers’ pooled
                trust account, no service or other charges are to be charged to
                the account. Those charges are to be charged to the general
                account that we hold at your branch, Account #
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "72.02px", top: "84.98px" }}
              className="cls_004"
            >
              <span className="cls_004">
                directed, until further notice, to remit interest on the above
                noted trust account to The Alberta
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "72.02px", top: "98.78px" }}
              className="cls_004"
            >
              <span className="cls_004">
                Law Foundation. Remittances must be made in accordance with your
                agreement with the
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "72.02px", top: "112.58px" }}
              className="cls_004"
            >
              <span className="cls_004">
                Foundation. In the event that there is no agreement in place,
                please contact the Executive
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "72.02px", top: "126.38px" }}
              className="cls_004"
            >
              <span className="cls_004">
                Director of the Law Foundation. As the above-named account is a
                lawyers’ pooled trust account,
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "72.02px", top: "140.18px" }}
              className="cls_004"
            >
              <span className="cls_004">
                no service or other charges are to be charged to the account.
                Those charges are to be charged to
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "72.02px", top: "153.98px" }}
              className="cls_004"
            >
              <span className="cls_004">
                the general account that we hold at your branch, Account #
              </span>
              <span className="cls_020"></span>
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "320.60px",
                top: "157.44px",
              }}
              className="cls_019"
            >
              <span className="cls_019">
                {" "}
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  value={sectionA.accountDetailsAccountNumber}
                  name="accountDetailsAccountNumber"
                />{" "}
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.02px", top: "182.86px" }}
              className="cls_002"
            >
              <span className="cls_002">Per:</span>
              <span className="cls_026">
                {" "}
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  value={sectionA.perSign}
                  name="perSign"
                />{" "}
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.02px", top: "206.54px" }}
              className="cls_006"
            >
              <span className="cls_006">(Lawyer Signature)</span>
            </div>
            <div
              style={{ position: "absolute", left: "72.02px", top: "230.54px" }}
              className="cls_006"
            >
              <span className="cls_006">
                <input
                  onChange={(e) => handleInputChange(e)}
                  id="Lawyeraddress"
                  value={sectionA.perAddress}
                  name="perAddress"
                  className="htmlInput htmlInput_m"
                />
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.02px", top: "251.17px" }}
              className="cls_002"
            >
              <span className="cls_002">(Address)</span>
            </div>
            <div
              style={{ position: "absolute", left: "72.02px", top: "313.37px" }}
              className="cls_002"
            >
              <span className="cls_002">I accept that:</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "325.97px" }}
              className="cls_004"
            >
              <span className="cls_004">a)</span>
              <span className="cls_013"> </span>
              <span className="cls_002">
                {" "}
                interest earned on the above-named account will be submitted the
                Alberta Law Foundation in accordance with the agreement between
                the
              </span>
            </div>
            {/* <div
              style={{
                position: "absolute",
                left: "108.02px",
                top: "339.65px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                accordance with the agreement between the
              </span>
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "430.78px",
                top: "343.68px",
              }}
              className="cls_021"
            >
              <span className="cls_021" />{" "}
              <input
                onChange={(e) => handleInputChange(e)}
                className="htmlInput htmlInput_m"
                value={sectionA.nameOfFinancialInstitution}
                name="nameOfFinancialInstitution"
                id="accordanceAgreement"
              />{" "}
            </div>
            <div
              style={{
                position: "absolute",
                left: "90.02px",
                top: "360.25px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Foundation, and;</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "430.67px",
                top: "359.25px",
              }}
              className="cls_006"
            >
              <span className="cls_006">(Name of Financial Institution)</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "389.57px" }}
              className="cls_004"
            >
              <span className="cls_004">b)</span>
              <span className="cls_013"> </span>
              <span className="cls_002">
                {" "}
                all bank service charges in connection with the trust account
                referenced in this letter will be debited from Account #
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "245.71px",
                top: "409.00px",
              }}
              className="cls_022"
            >
              <span className="cls_022">
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  value={sectionA.allbankServiceCharges}
                  name="allbankServiceCharges"
                />
              </span>
            </div>
            {/* <div
              style={{
                position: "absolute",
                left: "108.02px",
                top: "403.15px",
              }}
              className="cls_002"
            >
              <span className="cls_002">from Account #</span>
            </div> */}
            <div
              style={{ position: "absolute", left: "90.02px", top: "453.79px" }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  value={sectionA.nameOfFinancialInstitution}
                  name="nameOfFinancialInstitution"
                />
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "410.07px",
                top: "453.79px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  value={sectionA.date}
                  name="date"
                />
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "476.39px" }}
              className="cls_002"
            >
              <span className="cls_002">Name of Financial Institution</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "550.10px",
                top: "476.39px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Date</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "496.39px" }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  value={sectionA.authSignature}
                  name="authSignature"
                />
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "514.31px" }}
              className="cls_002"
            >
              <span className="cls_002">Authorized Signature</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "536.39px" }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="htmlInput htmlInput_m"
                  value={sectionA.printedTitle}
                  name="printedTitle"
                />
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "559.35px" }}
              className="cls_002"
            >
              <span className="cls_002">Printed Title/Printed Name</span>
            </div>
            <div
              style={{ position: "absolute", left: "78.02px", top: "596.91px" }}
              className="cls_027"
            >
              <span className="cls_027">c.c.</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "159.62px",
                top: "596.62px",
              }}
              className="cls_006"
            >
              <span className="cls_006">The Alberta Law Foundation</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "378.07px",
                top: "596.62px",
              }}
              className="cls_006"
            >
              <span className="cls_006">The Law Society of</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "165.62px",
                top: "608.14px",
              }}
              className="cls_006"
            >
              <span className="cls_006">Alberta 105 12 Ave SE #980</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "389.71px",
                top: "608.14px",
              }}
              className="cls_006"
            >
              <span className="cls_006">333 11Ave SW Suite</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "165.62px",
                top: "619.66px",
              }}
              className="cls_006"
            >
              <span className="cls_006">700</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "180.62px",
                top: "631.18px",
              }}
              className="cls_006"
            >
              <span className="cls_006">Calgary, Alberta</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "396.67px",
                top: "631.18px",
              }}
              className="cls_006"
            >
              <span className="cls_006">Calgary, Alberta</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "201.89px",
                top: "642.58px",
              }}
              className="cls_006"
            >
              <span className="cls_006">T2G 1A1</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "417.07px",
                top: "642.58px",
              }}
              className="cls_006"
            >
              <span className="cls_006">T2R 1L9</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "183.14px",
                top: "653.86px",
              }}
              className="cls_006"
            >
              <span className="cls_006">ph: (403) 264-4701</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "399.19px",
                top: "653.86px",
              }}
              className="cls_006"
            >
              <span className="cls_006">ph: (403) 229-4700</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "153.98px",
                top: "665.69px",
              }}
              className="cls_028"
            >
              <span className="cls_028"> </span>
              <a href="mailto:info@albertalawfoundation.org">
                info@albertalawfoundation.org
              </a>{" "}
            </div>
            <div
              style={{
                position: "absolute",
                left: "388.75px",
                top: "665.69px",
              }}
              className="cls_028"
            >
              <span className="cls_028"> </span>
              <a href="mailto:Trust.Safety@lawsociety.ab.ca">
                Trust.Safety@lawsociety.ab.ca
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );

  // return (
  //   <ComplianceFormLayout title="Matter-Matter Trust Transfers">
  //     <h1 className="text-center">(LETTERHEAD)</h1>

  //     <div className="d-flex justify-content-between align-items-center">
  //       <span className="heading-5">To the Manager</span>
  //       <div className="w-25">
  //         <InputCustom
  //           label=""
  //           handleChange={(e) =>
  //             setSectionA({
  //               ...sectionA,
  //               Date: e.target.value,
  //             })
  //           }
  //           type="date"
  //           margin="1.8rem 0rem"
  //           value={sectionA.Date}
  //         />
  //       </div>
  //     </div>

  //     <InputCustom
  //       label="Name of Chartered Bank, Trust Company Credit Union, Financial Institution"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, nameOfTrust: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem"
  //       value={sectionA.nameOfTrust}
  //     />

  //     <InputCustom
  //       label="Branch"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, domicileBranch: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.domicileBranch}
  //     />

  //     <InputCustom
  //       label="Address"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, address: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.address}
  //     />

  //     <InputCustom
  //       label="Lawyer/Firm"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, lawyerFirm: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.lawyerFirm}
  //     />

  //     <InputCustom
  //       label="Account Name"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, accountName: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.accountName}
  //     />

  //     <InputCustom
  //       label="Transit Name"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, transitNo: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.transitNo}
  //     />

  //     <InputCustom
  //       label="Account Number"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, accountNo: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.accountNo}
  //     />

  //     <InputCustom
  //       label="Date Account Opened"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, dateAccountOpened: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.dateAccountOpened}
  //     />

  //     <CheckboxLayoutRight
  //       heading="
  //       I confirm that the designation of a Responsible Lawyer and authorization to maintain a trust account has been approved by the Law Society of Alberta for this law firm, in accordance with Law Society Rule 119.1"
  //       options={["Yes", "No"]}
  //       sectionB={sectionA}
  //       stateOption="confirmResponsibleLawyer"
  //       setSectionB={setSectionA}
  //     />

  //     <div className="heading-5 mt-5">
  //       In accordance with Section 126(1) of The Legal Profession Act, you are
  //       hereby authorized and directed, until further notice, to remit interest
  //       on the above noted trust account to The Alberta Law Foundation.
  //       Remittances must be made in accordance with your agreement with the
  //       Foundation. In the event that there is no agreement in place, please
  //       contact the Executive Director of the Law Foundation. As the above-named
  //       account is a lawyers’ pooled trust account, no service or other charges
  //       are to be charged to the account. Those charges are to be charged to the
  //       general account that we hold at your branch, Account #
  //       <input
  //         type="text"
  //         onChange={(e) =>
  //           setSectionA({
  //             ...sectionA,
  //             accountDetailsAccountNumber: e.target.value,
  //           })
  //         }
  //         value={sectionA.accountDetailsAccountNumber}
  //         className="heading-5 w-25"
  //       />
  //     </div>

  //     <InputCustom
  //       label="Per Lawyer Signature"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, perSign: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.perSign}
  //     />

  //     <InputCustom
  //       label="Per Lawyer Address"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, perAddress: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.perAddress}
  //     />

  //     <div className="heading-5">
  //       <p>I accept that:</p>
  //       <span className=" my-4 heading-5">
  //         a) Interest earned on the above-named account will be submitted the
  //         Alberta Law Foundation in accordance with the agreement between the{" "}
  //         <input
  //           type="text"
  //           className="w-25"
  //           onChange={(e) =>
  //             setSectionA({
  //               ...sectionA,
  //               nameOfFinancialInstitution: e.target.value,
  //             })
  //           }
  //           value={sectionA.nameOfFinancialInstitution}
  //         />{" "}
  //         and the Foundation, and;
  //       </span>

  //       <p className=" my-5">
  //         b) All bank service charges in connection with the trust account
  //         referenced in this letter will be debited from Account #
  //         <input
  //           type="text"
  //           className="w-25"
  //           onChange={(e) =>
  //             setSectionA({
  //               ...sectionA,
  //               clioAccountGeneral: e.target.value,
  //             })
  //           }
  //           value={sectionA.clioAccountGeneral}
  //         />{" "}
  //       </p>
  //     </div>

  //     <InputCustom
  //       label="Name of Financial Institution"
  //       handleChange={(e) =>
  //         setSectionA({
  //           ...sectionA,
  //           nameOfFinancialInstitution: e.target.value,
  //         })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.nameOfFinancialInstitution}
  //     />

  //     <InputCustom
  //       label=""
  //       handleChange={(e) =>
  //         setSectionA({
  //           ...sectionA,
  //           nameOfFinancialInstitution: e.target.value,
  //         })
  //       }
  //       type="date"
  //       margin="1.8rem 0rem "
  //       value={sectionA.date}
  //     />

  //     <InputCustom
  //       label="Authorized Signature"
  //       handleChange={(e) =>
  //         setSectionA({
  //           ...sectionA,
  //           authSignature: e.target.value,
  //         })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.authSignature}
  //     />

  //     <InputCustom
  //       label="Printed Title/Printed Name"
  //       handleChange={(e) =>
  //         setSectionA({
  //           ...sectionA,
  //           printedTitle: e.target.value,
  //         })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.printedTitle}
  //     />
  //   </ComplianceFormLayout>
  // );
});

export default LetterHeadPrint;
