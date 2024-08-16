import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { Task } from "../../../../components/Tasks/Task";
import {
  fetchFormDetails,
  getBodyStatusCode,
  getCompanyInfo,
  getUserSID,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
import ComplianceFormLayout from "../../ComplianceFormLayout";
import axios from "../../../../utils/axios";
import { useReactToPrint } from "react-to-print";
import ElectronicTransferOfTrustFunds from "../print/ElectronicTransferOfTrustFunds";
import { formatNumberInThousands } from "../../../../utils/helpers/Formatting";

const ElecTransferofTrustFundsRequisition = () => {
  const history: any = useHistory();
  const compliancePDF = useRef(null);
  const [sectionA, setSectionA] = useState({
    amount: "",
    recipient: "",
    sourFinancialInstitution: "",
    sourAccountNumber: "",
    destFinancialInstitution: "",
    destAccountNumber: "",
    branchAddress: "",
    clientName: "",
    clientFileNumber: "",
    clientFileSubject: "",
    reasonForTransfer: "",
    name: "",
    position: "",
    lawyer: "",
    lawyerSign: "",
    lawyerDate: "",
    secondlawyer: "",
    secondlawyerSign: "",
    secondlawyerDate: "",
  });
  const taskState: Task = history.location.state;

  const [taskStatus, setTaskStatus] = useState(taskState);
  const saveDocument = (): void => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setSectionA({
      ...sectionA,
      [e.target.name]:
        e.target.name === "amount"
          ? e.target.value.replace(/[$,]/g, "")
          : e.target.value,
    });
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

        const clientContact = axios.get(
          `/data-client-contact/${getUserSID()}/${taskState.client_id}`
        );

        Promise.all([clioTrustAccount, clioBankAccountDetails, clientContact])
          .then(([clioTrust, clioBank, clientCont]) => {
            console.log("clio Trust", clioTrust);
            console.log("clio Bank", clioBank);
            console.log("client Contact", clientCont);

            const {
              body: clioBankBody,
              status,
              code,
            } = getBodyStatusCode(clioBank);

            const { body: clientContactBody } = getBodyStatusCode(clientCont);

            const { body: clioTrustBody } = getBodyStatusCode(clioTrust);

            console.log(
              "clioTR",
              clioTrustBody,
              clientContactBody,
              clioBankBody
            );

            setSectionA({
              ...sectionA,
              nameOfLawFirm: getCompanyInfo()?.companyname,
              clientName: clioTrustBody[0]?.client_name,
              clientFileSubject: clioTrustBody[0]?.matter_display_nbr,
              responsibleLawyer: clioTrustBody[0]?.responsible_attorney_name,
              streetAddress: getCompanyInfo()?.legaladdress.Line1,
              province: getCompanyInfo()?.legaladdress.CountrySubDivisionCode,
              city: getCompanyInfo()?.legaladdress.CountrySubDivisionCode,
              postal: getCompanyInfo()?.legaladdress.PostalCode,
              partBNameOfRightfulOwner: clientContactBody[0].name,
              partBlastKnownAddress: clientContactBody[0].street || "",
              partBprovince: clientContactBody[0].province || "",
              partBpostal: clientContactBody[0].postal_code || "",
              partBcity: clientContactBody[0].city || "",
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
      title="Electronic Transfer of Trust Funds Requisition"
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
        <ElectronicTransferOfTrustFunds
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
              "\n<!--\nspan.cls_004{font-family:Arial,serif;font-size:40.1px;color:rgb(144,144,144);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Arial,serif;font-size:40.1px;color:rgb(144,144,144);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Arial,serif;font-size:7.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_005{font-family:Arial,serif;font-size:7.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_006{font-family:Arial,serif;font-size:19.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_006{font-family:Arial,serif;font-size:19.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_009{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_009{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_010{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_010{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_007{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_007{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_011{font-family:Arial,serif;font-size:11.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_011{font-family:Arial,serif;font-size:11.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_012{font-family:Arial,serif;font-size:11.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_012{font-family:Arial,serif;font-size:11.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_003{font-family:Arial,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_003{font-family:Arial,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n-->\n",
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
            <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="/BCForms/ElecTransferOfTrustFundsRequisition/background1.jpg"
                width={612}
                height={792}
                alt="Background 1 for Electronic Transfer Of Trust"
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.92px", top: "51.00px" }}
              className="cls_004"
            >
              <span className="cls_004">Requisition</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "405.40px",
                top: "123.78px",
              }}
              className="cls_005"
            >
              <span className="cls_005">
                845 Cambie Street, Vancouver, BC, Canada V6B 4Z9
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "405.40px",
                top: "131.82px",
              }}
              className="cls_005"
            >
              <span className="cls_005">
                t 604.669.2533 | BC toll-free 1.800.903.5300
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "40.92px", top: "121.14px" }}
              className="cls_006"
            >
              <span className="cls_006">
                Electronic Transfer of Trust Funds
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "405.40px",
                top: "139.86px",
              }}
              className="cls_005"
            >
              <span className="cls_005">f 604.646.5917 | TTY 604.443.5700</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "405.40px",
                top: "147.92px",
              }}
              className="cls_005"
            >
              <span className="cls_005">
                Email trustaccounting@lsbc.org | lawsociety.bc.ca
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "40.92px", top: "146.28px" }}
              className="cls_009"
            >
              <span className="cls_009">Rule 3-64.1 </span>
              <span className="cls_010">
                Requires dual password/access code system
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "177.18px" }}
              className="cls_007"
            >
              <span className="cls_007">PART A: Details of transfer</span>
            </div>
            <div
              style={{ position: "absolute", left: "38.68px", top: "210.54px" }}
              className="cls_011"
            >
              <span className="cls_011">Amount</span>

              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_s"
                value={formatNumberInThousands(parseInt(sectionA.amount))}
                name="amount"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "215.14px",
                top: "210.54px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Recipient</span>
              <input
                onChange={handleInputChange}
                type="text"
                value={sectionA.recipient}
                name="recipient"
                className="htmlInput"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "269.76px",
                top: "231.60px",
              }}
              className="cls_012"
            >
              <span className="cls_012">Source account</span>
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "250.74px" }}
              className="cls_011"
            >
              <span className="cls_011">Financial institution</span>
              <input
                onChange={handleInputChange}
                type="text"
                value={sectionA.sourFinancialInstitution}
                name="sourFinancialInstitution"
                className="htmlInput"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "363.58px",
                top: "249.72px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Account number</span>
              <input
                onChange={handleInputChange}
                type="text"
                value={sectionA.sourAccountNumber}
                name="sourAccountNumber"
                className="htmlInput htmlInput_s"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "258.48px",
                top: "271.80px",
              }}
              className="cls_012"
            >
              <span className="cls_012">Destination account</span>
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "290.88px" }}
              className="cls_011"
            >
              <span className="cls_011">Financial institution</span>
              <input
                onChange={handleInputChange}
                type="text"
                value={sectionA.destFinancialInstitution}
                name="destFinancialInstitution"
                className="htmlInput"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "363.60px",
                top: "290.88px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Account number</span>
              <input
                onChange={handleInputChange}
                type="text"
                value={sectionA.destAccountNumber}
                name="destAccountNumber"
                className="htmlInput htmlInput_s"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "311.94px" }}
              className="cls_011"
            >
              <span className="cls_011">Branch address</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_lg"
                value={sectionA.branchAddress}
                name="branchAddress"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "352.38px" }}
              className="cls_007"
            >
              <span className="cls_007">PART B: Client matter</span>
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "385.32px" }}
              className="cls_011"
            >
              <span className="cls_011">Client name</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput"
                value={sectionA.clientName}
                name="clientName"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "363.61px",
                top: "385.32px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Client file number </span>
              <span className="cls_003">
                (May be entered into transfer system as customer reference)
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "363.60px",
                top: "420.84px",
              }}
              className="cls_003"
            >
              <span className="cls_003"></span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.clientFileNumber}
                name="clientFileNumber"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "446.04px" }}
              className="cls_011"
            >
              <span className="cls_011">Client file subject matter</span>
              {/* <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput"
                value={sectionA.clientFileSubject}
                name="clientFileSubject"
                style={{ marginLeft: "0.2rem" }}
              /> */}
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "465.04px" }}
              className="cls_011"
            >
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_lg"
                value={sectionA.clientFileSubject}
                name="clientFileSubject"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "314.63px",
                top: "446.04px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Reason for transfer</span>
              {/* <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput"
                value={sectionA.reasonForTransfer}
                name="reasonForTransfer"
                style={{ marginLeft: "0.2rem" }}
              /> */}
            </div>
            <div
              style={{
                position: "absolute",
                left: "314.63px",
                top: "460.04px",
              }}
              className="cls_011"
            >
              <span className="cls_011"></span>
              <textarea
                rows={10}
                cols={10}
                onChange={handleInputChange}
                className="htmlInput"
                value={sectionA.reasonForTransfer}
                name="reasonForTransfer"
                style={{
                  marginLeft: "0.2rem",
                  resize: "none",
                  border: "none",
                  outline: "none",
                  height: "45px",
                  width: "300%",
                  padding: "5px",
                }}
              ></textarea>
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "513.96px" }}
              className="cls_007"
            >
              <span className="cls_007">
                PART C: Person entering details of transfer
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "323.80px",
                top: "515.94px",
              }}
              className="cls_003"
            >
              <span className="cls_003" style={{ fontSize: "0.925rem" }}>
                Must be someone other than the lawyer authorizing the
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "40.68px",
                top: "527.82px",
              }}
              className="cls_003"
            >
              <span className="cls_003" style={{ fontSize: "0.925rem" }}>
                transfer in Part D unless the lawyer is the only lawyer in the
                firm and has no non-lawyer staff. (Rule 3-64.1(2) (a) &amp; (3))
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "547.32px" }}
              className="cls_011"
            >
              <span className="cls_011">Name</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput"
                value={sectionA.name}
                name="name"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "314.10px",
                top: "547.32px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Position</span>
              <input
                onChange={handleInputChange}
                type="text"
                value={sectionA.position}
                name="position"
                className="htmlInput"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "585.84px" }}
              className="cls_007"
            >
              <span className="cls_007">
                PART D: Lawyer(s) authorizing transfer
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "621.00px" }}
              className="cls_011"
            >
              <span className="cls_011">Lawyer (required)</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput"
                value={sectionA.lawyer}
                name="lawyer"
                style={{
                  marginLeft: "0.2rem",
                  top: "20px",
                  left: "0",
                  position: "absolute",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "215.10px",
                top: "621.00px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Signature</span>
              <input
                onChange={handleInputChange}
                type="text"
                value={sectionA.lawyerSign}
                name="lawyerSign"
                className="htmlInput htmlInput_s"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "408.18px",
                top: "621.00px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Date</span>
              <input
                onChange={handleInputChange}
                type="date"
                value={sectionA.lawyerDate}
                name="lawyerDate"
                className="htmlInput"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.68px", top: "659.58px" }}
              className="cls_011"
            >
              <span className="cls_011">Second lawyer (optional)</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput"
                value={sectionA.secondlawyer}
                name="secondlawyer"
                style={{
                  marginLeft: "0.2rem",
                  top: "20px",
                  left: "0",
                  position: "absolute",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "215.08px",
                top: "659.58px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Signature</span>
              <input
                onChange={handleInputChange}
                type="text"
                value={sectionA.secondlawyerSign}
                name="secondlawyerSign"
                className="htmlInput htmlInput_s"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "408.18px",
                top: "659.58px",
              }}
              className="cls_011"
            >
              <span className="cls_011">Date</span>
              <input
                onChange={handleInputChange}
                type="date"
                className="htmlInput"
                value={sectionA.secondlawyerDate}
                name="secondlawyerDate"
                style={{ marginLeft: "0.2rem" }}
              />
            </div>
            <div
              style={{ position: "absolute", left: "36.00px", top: "698.16px" }}
              className="cls_003"
            >
              <span className="cls_003">
                After transfer, obtain written confirmation from financial
                institution (Rule 3-64.1(2) (c) (d) &amp; (g)) and complete
                steps under Rule 3-64.1 (4). File the requisition and
                confirmation together in a centralized location with your
                accounting records.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "36.00px", top: "709.68px" }}
              className="cls_003"
            >
              <span className="cls_003">
                Rule 3-64.1 (4). File the requisition and confirmation together
                in a centralized location with your accounting records.
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </ComplianceFormLayout>
  );
};

export default ElecTransferofTrustFundsRequisition;
