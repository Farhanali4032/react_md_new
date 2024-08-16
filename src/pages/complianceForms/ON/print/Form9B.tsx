import React, { useState, useEffect, forwardRef } from "react";
//@ts-ignore
import { AuthWithdrawalstate } from "../AuthOfWithdrawByTeranet/AuthOfWithdrawByTeranet";
import { Task } from "../../../../components/Tasks/Task";
//@ts-ignore
import LabelAndInput from "../../../../components/LayoutComponents/LabelAndInput/LabelAndInput.tsx";
import { Container } from "react-bootstrap";
import {
  fetchFormDetails,
  getBodyStatusCode,
  getCurrentUserFromCookies,
  getUserId,
  getUserSID,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
import axios from "../../../../utils/axios";
import Dropdown from "react-dropdown";

type Props = {
  taskData: Task;
};

const AuthOfWithdrawByTeranet = forwardRef(({ taskData }: Props, ref) => {
  const taskState: Task = taskData;
  const [taskStatus, setTaskStatus] = useState(taskState);

  const [sectionA, setSectionA] = useState<AuthWithdrawalstate>({
    authorization: "",
    amountOfFundsToBeWithdrawn: "",
    Re: "",
    client: taskState.task_month,
    fileNo: taskState.clio_trust_account,
    reasonForWithdrawal: "",
    trustAccountToBeDebited: "",
    nameOfFinancialInst: "",
    accountNumber: "",
    personAuthWithdrawal: "",
    date: "",
    signature: "",
  });

  const [listOfUser, setListOfUser] = useState([]);

  useEffect(() => {
    const fetchFormDetailsFunc = async () => {
      const { formDetails, isFormFilled } = await fetchFormDetails(
        taskState.id
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
          `/clio-account-details/${parseInt(taskState.clio_trust_account)}`
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
            console.log("err", err);
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

  const saveDocument = (): void => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };

  const handleInputChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    setSectionA({ ...sectionA, [e.currentTarget.name]: e.currentTarget.value });
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
        <h1 className="text-center heading-5 my-3 fw-bold">Form 9B</h1>
        <h1 className="text-center heading-5 my-3 fw-bold">
          Authorization of Withdrawal by Teranet
        </h1>
        <h1 className="text-center heading-5 my-3 fw-bold">
          {getCurrentUserFromCookies().display_firmname}
        </h1>
        <div>
          <LabelAndInput classes="my-2 mt-5" label="Authorization:">
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.authorization}
              onChange={(e) => handleInputChange(e)}
              name="authorization"
            />
          </LabelAndInput>
          <LabelAndInput
            classes="my-2"
            label="Amount of funds to be withdrawn:"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.amountOfFundsToBeWithdrawn}
              onChange={(e) => handleInputChange(e)}
              name="amountOfFundsToBeWithdrawn"
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

          <LabelAndInput classes="mt-3 my-1" label="Reason for withdrawal:">
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.reasonForWithdrawal}
              onChange={(e) => handleInputChange(e)}
              name="reasonForWithdrawal"
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

          <LabelAndInput
            classes="mt-3 my-1"
            label="Person authorizing withdrawal:"
          >
            <Dropdown
              className="mt-4 heading-5 w-50 htmlText fw-bold"
              options={listOfUser.map(({ username }) => username)}
              value={sectionA.personAuthWithdrawal}
              onChange={(e) => {
                console.log("e", e);
                setSectionA({
                  ...sectionA,
                  personAuthWithdrawal: e.value,
                });
              }}
            ></Dropdown>
          </LabelAndInput>
          <LabelAndInput classes="mt-3 my-1" label="Date:">
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.date || new Date().toISOString().substring(0, 10)}
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
        </div>
      </div>
    </Container>
  );
});

export default AuthOfWithdrawByTeranet;
