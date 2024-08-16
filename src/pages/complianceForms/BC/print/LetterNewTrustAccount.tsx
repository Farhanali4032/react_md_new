import React, { useEffect, useState, forwardRef } from "react";
import { useHistory } from "react-router";
import { Task } from "../../../../components/Tasks/Task";
import {
  fetchFormDetails,
  getAllUserInfo,
  getBodyStatusCode,
  getCompanyInfo,
  getCurrentUserFromCookies,
  getUserSID,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
import axios from "../../../../utils/axios";
import { Container } from "react-bootstrap";
import moment from "moment";

type Props = {
  taskData: Task;
  userInput: {
    name: String;
    title: String;
    image: string | ArrayBuffer | null;
  };
};

const LetterNewTrustAccount = forwardRef(
  ({ taskData, userInput }: Props, ref) => {
    const [sectionA, setSectionA] = useState({
      name: "",
      confidential: "",
      date: "",
      address: "",
      reTrustAccount: "",
      advisingInstitution: "",
      myInstructions: "",
      adviceOfTheAmount: "",
      nameOfUser: "",
      titleOfUser: "",
    });

    const taskState: Task = taskData;

    console.log("taskState", taskState);

    const [taskStatus, setTaskStatus] = useState(taskState);
    const saveDocument = (): void => {
      saveComplianceFormDetails(sectionA, taskState.id);
    };

    const handleUserInputChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
      setUserInput({ ...userInput, [e.target.name]: e.target.value });
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
              console.log("clio Trust", clioTrust);
              console.log("clio Bank", clioBank);

              const {
                body: clioBankBody,
                status,
                code,
              } = getBodyStatusCode(clioBank);

              const { body: clioTrustBody } = getBodyStatusCode(clioTrust);

              setSectionA({
                ...sectionA,
                name: getCompanyInfo()?.companyname,
                address: clioBankBody[0].bank_name,
                date: moment(new Date()).format("YYYY-MM-DD"),
                reTrustAccount: clioBankBody[0].account_number,
                nameOfUser:
                  getAllUserInfo().username +
                  " " +
                  getCurrentUserFromCookies().role,
              });
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      };

      fetchFormDetailsFunc();
    }, []);

    const handleInputChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
      setSectionA({ ...sectionA, [e.target.name]: e.target.value });
    };

    return (
      <Container ref={ref}>
        <div className="page_containers mt-5" id="page_container">
          <div
            style={{
              display: "inline",
              height: "auto",
              overflowY: "visible",
              overflowX: "visible",
              background: "white",
              position: "static",
              borderStyle: "",
            }}
          >
            <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="/BCForms/LtrNewTrustAcct/background1.jpg"
                width={612}
                height={792}
                alt="background 1 for LtrNewTrustAccount"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "89.94px",
              }}
              className="cls_003"
            >
              {userInput.image ? (
                <img
                  src={userInput.image}
                  alt="preview-img"
                  className="previewImg"
                />
              ) : (
                <span className="cls_003">
                  Law firm Name / On Letterhead of Law Firm
                </span>
              )}
              <input
                onChange={handleInputChange}
                type="file"
                // value={sectionA.name}
                // name="name"
                className="ms-3"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "128.10px",
              }}
              className="cls_003"
            >
              <span className="cls_003">[CONFIDENTIAL]</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50.00px",
                top: "160.68px",
              }}
              className="cls_003"
            >
              {/* <span className="cls_003">Date</span> */}
              <input
                onChange={handleInputChange}
                type="date"
                value={sectionA.date}
                name="date"
                className="htmlInput"
              />
            </div>

            {/* <div
                style={{
                  position: "absolute",
                  left: "72.00px",
                  top: "196.02px",
                }}
                className="cls_003"
              >
                <span className="cls_003">[Addressee]</span>
              </div> */}
            <div
              style={{
                position: "absolute",
                left: "50.38px",
                top: "201.23px",
              }}
              className="cls_009"
            >
              {/* <span className="cls_009">
                  Clio - Trust Bank Name &amp; Address
                </span> */}
              <input
                onChange={handleInputChange}
                type="text"
                value={sectionA.address}
                name="address"
                className="htmlInput"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "200.88px",
              }}
              className="cls_003"
            >
              {/* <span className="cls_003">[Address]</span> */}
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "247.68px",
              }}
              className="cls_006"
            >
              <span className="cls_006">Dear Sir/Madam:</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "273.18px",
              }}
              className="cls_003"
            >
              <span className="cls_003">Re: Trust Account</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "176.80px",
                top: "274.82px",
              }}
              className="cls_009 d-flex"
            >
              {/* <span className="cls_009">
                  Clio - Trust Bank Account Number
                </span> */}
              <input
                onChange={handleInputChange}
                type="number"
                value={sectionA.reTrustAccount}
                name="reTrustAccount"
                className="htmlInput"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "301.38px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                By this letter, I am{" "}
                <i>
                  <b>(we are)</b>
                </i>{" "}
              </span>
              {/* <span className="cls_008">
                {" "}
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={sectionA.advisingInstitution}
                  name="advisingInstitution"
                  className="htmlInput htmlInput_s"
                />{" "}
              </span> */}
              <span className="cls_006">
                advising your institution that the above account is a pooled
                trust account that will contain the funds of more than one
                client.
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "345.12px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                The Law Society of British Columbia requires that a pooled trust
                account shall:
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "126.00px",
                top: "366.96px",
              }}
              className="cls_006"
            >
              <span className="cls_006">◉. be interest bearing;</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "126.00px",
                top: "386.76px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                ◉. provide monthly cancelled cheques and bank statements to the
                lawyer;
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "126.00px",
                top: "406.56px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                ◉. be readily available to be drawn upon by the lawyer;
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "126.00px",
                top: "426.36px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                ◉. be designated as a “trust” account on the records of the
                savings institution (and the lawyer); and
              </span>
            </div>
            {/* <div
                style={{
                  position: "absolute",
                  left: "144.00px",
                  top: "440.16px",
                }}
                className="cls_006"
              >
                <span className="cls_006">lawyer); and</span>
              </div> */}
            <div
              style={{
                position: "absolute",
                left: "126.00px",
                top: "459.96px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                ◉. be an account in respect of which the savings institution has
                agreed with the lawyer to pay interest to the Law Foundation
              </span>
            </div>
            {/* <div
                style={{
                  position: "absolute",
                  left: "144.00px",
                  top: "473.70px",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  to pay interest to the Law Foundation
                </span>
              </div> */}
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "499.56px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                Law Society Rule 3-60 (3) (a) requires that every lawyer who
                opens or maintains a pooled trust account “instruct the savings
                institution, in writing, to remit the net interest earned on the
                account, directly to the Law Foundation of British Columbia.”
              </span>
            </div>
            {/* <div
                style={{
                  position: "absolute",
                  left: "72.00px",
                  top: "515.46px",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  account “instruct the savings institution, in writing, to
                  remit the net interest earned on the
                </span>
              </div> */}
            {/* <div
                style={{
                  position: "absolute",
                  left: "72.00px",
                  top: "531.30px",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  account, directly to the Law Foundation of British Columbia.”
                </span>
              </div> */}
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "559.20px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                This letter is my{" "}
                <i>
                  <b>(our)</b>
                </i>{" "}
              </span>
              {/* <span className="cls_008">
                {" "}
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={sectionA.myInstructions}
                  name="myInstructions"
                  className="htmlInput"
                  style={{ marginLeft: "0rem" }}
                />{" "}
              </span> */}
              <span className="cls_006">
                instruction to you to calculate the interest on the above
                account at the rate and in the manner agreed upon between your
                institution and the Law Foundation of British Columbia, and to
                remit such interest directly to the Law Foundation according to
                the terms of that agreement (in the event that there is no
                agreement in place, please contact The Executive Director of the
                Law Foundation). This letter authorizes and directs you to
                provide the Law Foundation with such information and
                explanation, as it requires verifying the calculation of the
                interest remitted, including:
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "575.04px",
              }}
              className="cls_006"
            >
              <span className="cls_006"></span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "590.94px",
              }}
              className="cls_006"
            >
              <span className="cls_006"></span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "606.78px",
              }}
              className="cls_006"
            >
              <span className="cls_006"></span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "622.68px",
              }}
              className="cls_006"
            >
              <span className="cls_006"></span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "638.52px",
              }}
              className="cls_006"
            >
              <span className="cls_006"></span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "654.42px",
              }}
              className="cls_006"
            >
              <span className="cls_006"></span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "135.00px",
                top: "682.20px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                ◉. account balance information during the reporting period;
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "135.00px",
                top: "700.00px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                ◉. the interest rate and the gross interest earned;
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "535.50px",
                top: "718.00px",
              }}
              className="cls_002"
            >
              <span className="cls_002">2</span>
            </div>
          </div>
          <div style={{}}>
            <div
              style={{
                position: "absolute",
                left: "135.00px",
                top: "718.00px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                ◉. service charges deducted (if service charges are deducted,
                they are limited to the routine processing of transaction items
                for: deposits; cheques; return of cancelled (cleared) cheques;
                stop payment orders; and a reasonable fee for Law Foundation
                payment processing; and
              </span>
            </div>
            {/* <div
                style={{
                  position: "absolute",
                  left: "144.00px",
                  top: "89.82px",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  routine processing of transaction items for: deposits;
                  cheques; return of cancelled
                </span>
              </div> */}
            {/* <div
                style={{
                  position: "absolute",
                  left: "144.00px",
                  top: "103.62px",
                }}
                className="cls_006"
              >
                <span className="cls_006">
                  (cleared) cheques; stop payment orders; and a reasonable fee
                  for Law Foundation
                </span>
              </div> */}
            {/* <div
                style={{
                  position: "absolute",
                  left: "144.00px",
                  top: "117.42px",
                }}
                className="cls_006"
              >
                <span className="cls_006">payment processing; and</span>
              </div> */}
            <div
              style={{
                position: "absolute",
                left: "135.00px",
                top: "772px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                ◉. the net interest earned after deduction of service charges.
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "790.00px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                A standard form remittance report that should accompany that
                remittance can be obtained from the Law Foundation.
              </span>
            </div>
            {/* <div
                style={{
                  position: "absolute",
                  left: "72.00px",
                  top: "178.98px",
                }}
                className="cls_006"
              >
                <span className="cls_006">the Law Foundation.</span>
              </div> */}
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "808.002px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                Please forward the interest directly to:
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "90.00px",
                top: "826.00px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                <b>The Law Foundation of British Columbia</b>
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "90.00px",
                top: "844.00px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                <b>1340 - 605 Robson Street</b>
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "90.00px",
                top: "862px",
              }}
              className="cls_006"
            >
              <span className="cls_006">
                <b>Vancouver BC V6B 5J3</b>
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "880px",
              }}
              className="cls_006"
            >
              <span className="cls_006">As well, please advise me </span>
              {/* <span className="cls_008">
                  {" "}
                  <input
                    onChange={handleInputChange}
                    type="text"
                    value={sectionA.adviceOfTheAmount}
                    name="adviceOfTheAmount"
                    className="htmlInput"
                  />{" "}
                </span> */}
              <span className="cls_006">
                of the amount of each transmittal.
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "910.96px",
              }}
              className="cls_006"
            >
              <span className="cls_006">Yours truly,</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.06px",
                top: "930.90px",
              }}
              className="cls_009"
            >
              <span className="cls_009">Name</span>
              <input
                onChange={handleUserInputChange}
                type="text"
                value={userInput.name}
                name="name"
                className="htmlInput"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.06px",
                top: "950.90px",
              }}
              className="cls_009"
            >
              <span className="cls_009">Title</span>
              <input
                onChange={handleUserInputChange}
                type="text"
                value={userInput.title}
                name="title"
                className="htmlInput"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "72.00px",
                top: "1000px",
              }}
              className="cls_010"
            >
              <span className="cls_010">cc: Law Foundation</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "532.74px",
                top: "741.84px",
              }}
              className="cls_002"
            >
              <span className="cls_002">3</span>
            </div>
          </div>
        </div>
      </Container>
    );
  }
);

export default LetterNewTrustAccount;
