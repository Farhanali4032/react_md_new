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
import { useReactToPrint } from "react-to-print";
import InsolventLawyerSchedule3 from "../print/InsolventLawyerSchedule3";

const Sch3Insolvent = () => {
  const [sectionA, setSectionA] = useState({
    firmname: "",
    firm: "",
    fullNameOfMember: "",
    fullBusinessAddress: "",
    telephone: "",
    reportingPeriod: "",
    monthEnding: "",
    ididnotoperate: "",
    SignLawyer: "",
    date: "",
    period: null,
  });
  const compliancePDF = useRef(null);

  const history: any = useHistory();
  const taskState: Task = history.location.state;

  console.log("taskState", taskState);

  const [taskStatus, setTaskStatus] = useState(taskState);
  const saveDocument = (): void => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setSectionA({ ...sectionA, [e.target.name]: e.target.value });
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
          .then(([clioTrust, clioBank]) => {
            const {
              body: clioBankBody,
              status,
              code,
            } = getBodyStatusCode(clioBank);

            const { body: clioTrustBody } = getBodyStatusCode(clioTrust);

            setSectionA({
              ...sectionA,
              firmname: getCompanyInfo()?.companyname,
            });
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    };

    fetchFormDetailsFunc();
  }, []);

  const printDocument = useReactToPrint({
    content: () => compliancePDF.current,
  });

  return (
    <ComplianceFormLayout
      title="Insolvent Lawyer - Schedule 3"
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
        <InsolventLawyerSchedule3 taskData={taskState} ref={compliancePDF} />
      </div>
      <div>
        {" "}
        <div>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html:
                "\n<!--\nspan.cls_002{font-family:Arial,serif;font-size:26.1px;color:rgb(127,127,127);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_002{font-family:Arial,serif;font-size:26.1px;color:rgb(127,127,127);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_004{font-family:Arial,serif;font-size:18.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Arial,serif;font-size:18.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_005{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_010{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_010{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_006{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_006{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_008{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_009{font-family:Times,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_009{font-family:Times,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_011{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_011{font-family:Times,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_012{font-family:Times,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_012{font-family:Times,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_013{font-family:Times,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_013{font-family:Times,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_014{font-family:Times,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_014{font-family:Times,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n-->\n",
            }}
          />
          <div className="page_container" id="page_container">
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
              <div style={{ position: "absolute", right: "0px", top: "50px" }}>
                <img
                  alt="Law society"
                  src={"/BCForms/UnclaimedTrustFunds/The_Law_Society_Logo.png"}
                  width={250}
                  height={80}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "60.00px",
                }}
                className="cls_002"
              >
                <span className="cls_002">Declaration</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "105.00px",
                }}
                className="cls_004"
              >
                <span className="cls_004">Insolvent Lawyer - Schedule 3</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "53.76px",
                  top: "145.20px",
                }}
                className="cls_005"
              >
                <span className="cls_005">FIRM NAME:</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "125.99px",
                  top: "145.12px",
                }}
                className="cls_010"
              >
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={sectionA.firmname}
                  name="firmname"
                  className="htmlInput htmlInput_lg"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "53.76px",
                  top: "159.72px",
                }}
                className="cls_005"
              >
                <span className="cls_005">FIRM #:</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "98.86px",
                  top: "160.76px",
                }}
                className="cls_010"
              >
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={sectionA.firm}
                  name="firm"
                  className="htmlInput"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "53.76px",
                  top: "174.00px",
                }}
                className="cls_006"
              >
                <span className="cls_006">CANADA</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "322.56px",
                  top: "174.00px",
                }}
                className="cls_006"
              >
                <span className="cls_006">IN THE MATTER OF THE </span>
                <span className="cls_008">LEGAL PROFESSION</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "322.56px",
                  top: "187.20px",
                }}
                className="cls_008"
              >
                <span className="cls_008">ACT S.B.C. 1998 c. 9 as amended</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "198.97px",
                }}
                className="cls_006"
              >
                <span className="cls_006">PROVINCE OF BRITISH COLUMBIA</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "322.56px",
                  top: "199.57px",
                }}
                className="cls_006"
              >
                <span className="cls_006">AND INSOLVENT LAWYERS</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "68.97px",
                  top: "234.34px",
                }}
                className="cls_010"
              ></div>
              <div
                style={{
                  position: "absolute",
                  left: "53.76px",
                  top: "239.64px",
                }}
                className="cls_006"
              >
                <span className="cls_006">I, </span>
                <input
                  onChange={handleInputChange}
                  style={{ position: "absolute", top: "2px", width: "45rem" }}
                  type="text"
                  value={sectionA.fullNameOfMember}
                  name="fullNameOfMember"
                  className="htmlInput"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "544.32px",
                  top: "239.64px",
                }}
                className="cls_006"
              >
                <span className="cls_006"> of</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "265.56px",
                  top: "254.40px",
                }}
                className="cls_009"
              >
                <span className="cls_009">(full name of member)</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "59.31px",
                  top: "272.52px",
                }}
                className="cls_010"
              >
                <input
                  onChange={handleInputChange}
                  type="text"
                  style={{ position: "absolute", top: "3px", width: "45rem" }}
                  value={sectionA.fullBusinessAddress}
                  name="fullBusinessAddress"
                  className="htmlInput"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "266.04px",
                  top: "289.92px",
                }}
                className="cls_009"
              >
                <span className="cls_009">(full business address)</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "79px",
                  top: "310.92px",
                  backgroundColor: "#e4e4eb",
                  width: "74.5%",
                  height: "1px",
                }}
                className="cls_009"
              >
                {/* <span
                  className="cls_009"
                  style={{
                    position: "absolute",
                    top: "12px",
                    width: "100%",
                    height: "0.1rem",
                    backgroundColor: "#e4e4eb",
                  }}
                ></span> */}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "79px",
                  top: "330.92px",
                  backgroundColor: "#e4e4eb",
                  width: "74.5%",
                  height: "1px",
                }}
                className="cls_009"
              >
                {/* <span
                  className="cls_009"
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "-25rem",
                    width: "60rem",
                    height: "0.1rem",
                    backgroundColor: "#e4e4eb",
                  }}
                ></span> */}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "53.76px",
                  top: "338.04px",
                }}
                className="cls_006"
              >
                <span className="cls_006">Telephone:</span>
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={sectionA.telephone}
                  name="telephone"
                  className="htmlInput"
                  style={{ textAlign: "right" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "370.56px",
                }}
                className="cls_006"
              >
                <span className="cls_006">DO SOLEMNLY DECLARE THAT:</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "315.89px",
                  top: "391.18px",
                }}
                className="cls_010"
              ></div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "397.08px",
                }}
                className="cls_006"
              >
                <span className="cls_006">1.</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "75.00px",
                  top: "397.08px",
                }}
                className="cls_006"
              >
                <span className="cls_006">During the reporting period of</span>
                <input
                  onChange={handleInputChange}
                  type="number"
                  value={sectionA.period}
                  name="period"
                  className="htmlInput htmlInput_s"
                />
                <span>month(s) ending</span>
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={sectionA.monthEnding}
                  name="monthEnding"
                  className="htmlInput"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "238.80px",
                  top: "397.08px",
                }}
                className="cls_006"
              >
                <span className="cls_006"></span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "486.01px",
                  top: "396.60px",
                }}
                className="cls_006"
              >
                <span className="cls_006">:</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "423.60px",
                }}
                className="cls_006"
              >
                <span className="cls_006">2.</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "75.00px",
                  top: "423.60px",
                  maxWidth: "87%",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  I did not operate a trust account except with a second
                  signatory who is a practising lawyer (not an insolvent lawyer)
                  as approved by the Executive Director of the Law Society of
                  British Columbia, namely
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "75.06px",
                  top: "438.24px",
                }}
                className="cls_006"
              >
                <span className="cls_006"></span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "185.06px",
                  top: "455.76px",
                }}
                className="cls_006"
              >
                <span className="cls_006"></span>
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={sectionA.ididnotoperate}
                  name="ididnotoperate"
                  className="htmlInput htmlInput_m"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "110.35px",
                  top: "449.13px",
                }}
                className="cls_010"
              ></div>
              <div
                style={{
                  position: "absolute",
                  left: "336.00px",
                  top: "452.76px",
                }}
                className="cls_006"
              >
                <span className="cls_006">;</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "479.28px",
                }}
                className="cls_006"
              >
                <span className="cls_006">3.</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "75.00px",
                  top: "479.28px",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  All withdrawals from trust were made by way of cheque as
                  required by Rule 3-64 (5) (a) of the Law Society Rules as
                  adopted by the Benchers of the Law Society of British Columbia
                  under the authority of the Legal Profession Act, S.B.C. 1998
                  c. 9 as amended
                </span>
                <span className="cls_011"></span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "75.00px",
                  top: "493.80px",
                }}
                className="cls_006"
              >
                <span className="cls_006"></span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "75.00px",
                  top: "508.44px",
                }}
                className="cls_006"
              >
                <span className="cls_006"></span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "534.95px",
                }}
                className="cls_006"
              >
                <span className="cls_006">4.</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "75.00px",
                  top: "534.95px",
                  maxWidth: "87%",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  If an Accountant’s Report is required, I will disclose to my
                  accountant my obligations under Rule 3-51 (3) and my
                  compliance thereby.
                </span>
                <span className="cls_011"></span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "75.00px",
                  top: "549.47px",
                }}
                className="cls_006"
              >
                <span className="cls_006"></span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.00px",
                  top: "575.99px",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  and I make this solemn declaration conscientiously believing
                  it to be true and knowing that it is of the same legal force
                  and effect as if made under oath.
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "54.02px",
                  top: "590.51px",
                }}
                className="cls_006"
              >
                <span className="cls_006"></span>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "54.03px",
                  top: "615.15px",
                }}
                className="cls_006"
              >
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={sectionA.SignLawyer}
                  name="SignLawyer"
                  className="htmlInput"
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "84.03px",
                  top: "641.15px",
                  textAlign: "center",
                }}
                className="cls_006"
              >
                <span className="cls_006">Signature of Lawyer</span>
                {/* <input
                  onChange={handleInputChange}
                  type="text"
                  value={sectionA.SignLawyer}
                  name="SignLawyer"
                  className="htmlInput"
                /> */}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "309.05px",
                  top: "615.15px",
                }}
                className="cls_006"
              >
                <input
                  onChange={handleInputChange}
                  type="date"
                  value={sectionA.date}
                  name="date"
                  className="htmlInput"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "369.05px",
                  top: "640.67px",
                }}
                className="cls_006"
              >
                <span className="cls_006">Date</span>
                {/* <input
                  onChange={handleInputChange}
                  type="date"
                  value={sectionA.date}
                  name="date"
                  className="htmlInput"
                /> */}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "53.76px",
                  top: "679.92px",
                  maxWidth: "90%",
                }}
                className="cls_012"
              >
                <span className="cls_012">
                  The information in this form is collected under section 33 of
                  the Legal Profession Act and Rule 3-51 (3) of the Law Society
                  Rules. The information will be used to process your Trust
                  Report. If you have any questions about the collection of this
                  information, please contact Trust Assurance. The Law Society
                  of British Columbia, 845 Cambie Street, Vancouver, B.C. V6B
                  4Z9, 604.697.5810 or toll free in B.C. 1.800.903.5300 ext 5810
                  or trustaccounting@lsbc.org.
                </span>
              </div>
              {/* <div
                style={{
                  position: "absolute",
                  left: "53.78px",
                  top: "691.80px",
                }}
                className="cls_012"
              >
                <span className="cls_012">
                  information will be used to process your Trust Report. If you
                  have any questions about the collection of this information,
                  please contact
                </span>
              </div> */}
              {/* <div
                style={{
                  position: "absolute",
                  left: "53.82px",
                  top: "703.68px",
                }}
                className="cls_012"
              >
                <span className="cls_012">
                  Trust Assurance. The Law Society of British Columbia, 845
                  Cambie Street, Vancouver, B.C. V6B 4Z9, 604.697.5810 or toll
                  free in B.C.
                </span>
              </div> */}
              {/* <div
                style={{
                  position: "absolute",
                  left: "53.81px",
                  top: "715.56px",
                }}
                className="cls_012"
              >
                <span className="cls_012">
                  1.800.903.5300 ext 5810 or trustaccounting@lsbc.org.
                </span>
              </div> */}
              <div
                style={{
                  position: "absolute",
                  left: "48.00px",
                  top: "743.52px",
                }}
                className="cls_013"
              >
                <span className="cls_013">Updated: </span>
                <span className="cls_014">1-Jul-15</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "505.42px",
                  top: "743.52px",
                }}
                className="cls_014"
              >
                <span className="cls_014">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComplianceFormLayout>
  );
};

export default Sch3Insolvent;
