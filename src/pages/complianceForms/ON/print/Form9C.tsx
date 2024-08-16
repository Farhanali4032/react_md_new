import React, { forwardRef, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LabelAndInput from "../../../../components/LayoutComponents/LabelAndInput/LabelAndInput";
import {
  fetchFormDetails,
  generateRandomDigits,
  getBodyStatusCode,
  getCurrentUserFromCookies,
  getUserId,
  getUserSID,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
// import { StateForClosingFunds } from "../ElecTrustTransferRequis/ElecTrustTransferRequis";
import axios from "../../../../utils/axios";
import { Task } from "../../../../components/Tasks/Task";
import Dropdown from "react-dropdown";

type Props = {
  taskData: Task;
};

const Form9C = forwardRef(
  ({ taskData }: Props, ref: React.ForwardedRef<unknown>) => {
    const taskState: Task = taskData;

    const [taskStatus, setTaskStatus] = useState(taskState);

    const [sectionA, setSectionA] = useState({
      requisition: generateRandomDigits(),
      amountOfFunds: "",
      Re: "",
      client: taskState.task_month,
      fileNo: taskState.clio_trust_account,
      reasonForPayment: "",
      trustAccountToBeDebited: "",
      nameOfFinancialInst: "",
      accountNumber: "",
      nameOfRecipient: "",
      accountToBeCredited: "",
      nameOfFinancialInst2: "",
      branchNameAndAddress: "",
      accountNumber2: "",
      personRequisElecTrustTransfer: "",
      date: "",
      signature: "",
      personCarryingOutElectronicTrustTransfer: "",
      nameReviewerAdmin: "",
    });

    const [listOfUser, setListOfUser] = useState([]);

    const saveDocument = (): void => {
      saveComplianceFormDetails(sectionA, taskStatus.id);
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
                Re: clioTrustBody[0].matter_description,
                trustAccountToBeDebited: clioBankBody[0].account_name,
                nameOfFinancialInst: clioBankBody[0].bank_name,
                accountNumber: clioBankBody[0].account_number,
              });
            })
            .catch((err) => {
              console.log("Error fetching", err);
            });
        }
      };

      fetchFormDetailsFunc();

      const getListofUsers = async () => {
        const allUsers = await axios.get(
          `/user/list/${getUserSID()}/${getUserId()}`
        );

        const { body } = getBodyStatusCode(allUsers);

        console.log("list of users", body);
        setListOfUser(body);
      };

      getListofUsers();
    }, []);

    const handleInputChange = (
      e: React.SyntheticEvent<HTMLInputElement>
    ): void => {
      setSectionA({
        ...sectionA,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    };

    return (
      <Container ref={ref}>
        <div
          className="page_container mt-5"
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
          <h1 className="text-center heading-5 my-3 fw-bold">Form 9C</h1>
          <h1 className="text-center heading-5 my-3 fw-bold">
            Electronic Trust Transfer Requisition: Closing Funds
          </h1>
          <h1 className="text-center heading-5 my-3 fw-bold">
            {getCurrentUserFromCookies().display_firmname}
          </h1>
          <div>
            <LabelAndInput classes="my-2 mt-5" label="Requisition:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.requisition}
                onChange={(e) => handleInputChange(e)}
                name="requisition"
              />
            </LabelAndInput>
            <LabelAndInput
              classes="my-2"
              label="Amount of funds to be transferred:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.amountOfFunds}
                onChange={(e) => handleInputChange(e)}
                name="amountOfFunds"
              />
            </LabelAndInput>

            <LabelAndInput classes="mt-3 my-1" label="Re:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.Re}
                onChange={(e) => handleInputChange(e)}
                name="Re"
              />
            </LabelAndInput>
            <LabelAndInput classes="my-1" label="Client:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.client}
                onChange={(e) => handleInputChange(e)}
                name="client"
              />
            </LabelAndInput>
            <LabelAndInput classes="my-1" label="File No:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.fileNo}
                onChange={(e) => handleInputChange(e)}
                name="fileNo"
              />
            </LabelAndInput>

            <LabelAndInput classes="mt-3 my-1" label="Reason for Payment:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.reasonForPayment}
                onChange={(e) => handleInputChange(e)}
                name="reasonForPayment"
              />
            </LabelAndInput>

            <LabelAndInput
              classes="mt-3 my-1"
              label="Trust account to be debited:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.trustAccountToBeDebited}
                onChange={(e) => handleInputChange(e)}
                name="trustAccountToBeDebited"
              />
            </LabelAndInput>

            <LabelAndInput
              classes="mt-3 my-1"
              label="Name of financial Institution:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.nameOfFinancialInst}
                onChange={(e) => handleInputChange(e)}
                name="nameOfFinancialInst"
              />
            </LabelAndInput>

            <LabelAndInput classes="mt-3 my-1" label="Account Number:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.accountNumber}
                onChange={(e) => handleInputChange(e)}
                name="accountNumber"
              />
            </LabelAndInput>

            <LabelAndInput classes="mt-3 my-1" label="Name of Receipient:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.nameOfRecipient}
                onChange={(e) => handleInputChange(e)}
                name="nameOfRecipient"
              />
            </LabelAndInput>
            <LabelAndInput classes="mt-3 my-1" label="Account to be credited:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.accountToBeCredited}
                onChange={(e) => handleInputChange(e)}
                name="accountToBeCredited"
              />
            </LabelAndInput>
            <LabelAndInput
              classes="mt-3 my-1"
              label="Name of financial institution:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.nameOfFinancialInst2}
                onChange={(e) => handleInputChange(e)}
                name="nameOfFinancialInst2"
              />
            </LabelAndInput>
            <LabelAndInput classes="mt-3 my-1" label="Branch name and address:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.branchNameAndAddress}
                onChange={(e) => handleInputChange(e)}
                name="branchNameAndAddress"
              />
            </LabelAndInput>
            <LabelAndInput classes="mt-3 my-1" label="Account Number:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.accountNumber2}
                onChange={(e) => handleInputChange(e)}
                name="accountNumber2"
              />
            </LabelAndInput>
            <LabelAndInput
              classes="mt-3 my-1"
              label="Person Requisitioning electronic trust transfer:"
            >
              <Dropdown
                className="mt-4 heading-5 w-50 htmlText fw-bold"
                options={listOfUser.map(({ username }) => username)}
                value={sectionA.personRequisElecTrustTransfer}
                onChange={(e) => {
                  console.log("e", e);
                  setSectionA({
                    ...sectionA,
                    personRequisElecTrustTransfer: e.value,
                  });
                }}
              ></Dropdown>
            </LabelAndInput>
            <LabelAndInput classes="mt-3 my-1" label="Date:">
              <input
                className="htmlInput_m htmlInput"
                value={
                  sectionA.date || new Date().toISOString().substring(0, 10)
                }
                onChange={(e) => handleInputChange(e)}
                name="date"
                type="date"
              />
            </LabelAndInput>
            <LabelAndInput classes="mt-3 my-1" label="Signature:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.signature}
                onChange={(e) => handleInputChange(e)}
                name="signature"
              />
            </LabelAndInput>
            <LabelAndInput
              classes="mt-3 my-1"
              label="Person carrying out electronic trust transfer:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.personRequisElecTrustTransfer}
                // onChange={(e) => handleInputChange(e)}
                // name="personCarryingOutElectronicTrustTransfer"
              />
            </LabelAndInput>
            <LabelAndInput classes="mt-3 my-1" label="Name:">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.nameReviewerAdmin}
                onChange={(e) => handleInputChange(e)}
                name="nameReviewerAdmin"
              />
            </LabelAndInput>

            <div className="my-5"></div>
          </div>
        </div>
      </Container>
    );
  }
);

export default Form9C;
