import React, { useEffect, useState, useRef } from "react";
import Dropdown from "react-dropdown";
import { useHistory } from "react-router-dom";
import {
  formatNumber,
  formatNumberInThousands,
} from "../../../../utils/helpers/Formatting";
import { Task } from "../../../../components/Tasks/Task";
import axios from "../../../../utils/axios";
import {
  fetchFormDetails,
  generateRandomDigits,
  getBodyStatusCode,
  getCurrentUserFromCookies,
  getUserId,
  getUserSID,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
//@ts-ignore
import ComplianceFormLayout from "../../ComplianceFormLayout.tsx";
import Form9A from "../Form9A/Form9A";
import { useReactToPrint } from "react-to-print";

const ElecTrustTransferRequis: React.FC<{}> = () => {
  const history: any = useHistory();
  const taskState: Task = history.location.state;
  const compliancePDF = useRef(null);

  const [taskStatus, setTaskStatus] = useState(taskState);
  const [sectionA, setSectionA] = useState({
    requisition: generateRandomDigits(),
    amountOfFunds: "",
    Re: "",
    client: taskState.task_month,
    fileNo: taskState.task_account,
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
    additionalTransactionParticulars: "",
    personEnteringDetailsOfTransfer: "",
    namePreparer: taskState.task_preparer_name,
    personAuthorizingTransferAtComputerTerminal: "",
    nameReviewer: taskState.task_approverer_name,
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

            const { body: clioBankBody } = getBodyStatusCode(clioBank);
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
            console.log("Error fetching Data matters info", err);
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

  const printDocument = useReactToPrint({
    content: () => compliancePDF.current,
  });

  const handleInputChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    setSectionA({
      ...sectionA,
      [e.currentTarget.name]: e.currentTarget.value.replace(/[$,]/g, ""),
    });
  };
  return (
    <ComplianceFormLayout
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
      title="Electronic Trust Transfer Requisition"
    >
      <div style={{ display: "none" }}>
        <Form9A taskData={taskState} ref={compliancePDF} />
      </div>
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "\n<!--\nspan.cls_002{font-family:nunito,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_002{font-family:Times,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_004{font-family:Times,serif;font-size:11.3px;color:rgb(45,116,181);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Times,serif;font-size:11.3px;color:rgb(45,116,181);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_003{font-family:Times,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_003{font-family:Times,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n-->\n",
          }}
        />
        <div
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
            style={{ position: "absolute", left: "276.35px", top: "41.33px" }}
            className="cls_002"
          >
            <span className="cls_002">Form 9A</span>
          </div>
          <div
            style={{ position: "absolute", left: "208.00px", top: "66.85px" }}
            className="cls_002"
          >
            <span className="cls_002">
              Electronic Trust Transfer Requisition
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "252.33px", top: "88.60px" }}
            className="cls_004"
          >
            <span className="cls_004">
              {getCurrentUserFromCookies().display_firmname}
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "130.12px",
              width: "500px",
            }}
            className="cls_003  d-flex justify-content-between"
          >
            <span className="cls_003">Requisition</span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="requisition"
              value={sectionA.requisition}
              onChange={(e) => handleInputChange(e)}
            />
            {/* To be autogenerated from platform - e.g #ET001, #ET002, #ET003….. */}
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "148.65px",
              width: "500px",
            }}
            className="cls_003  d-flex justify-content-between"
          >
            <span className="cls_003">Amount of funds to be transferred: </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="amountOfFunds"
              type="text"
              value={formatNumber(sectionA.amountOfFunds)}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "166.20px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between"
          >
            <span className="cls_003">Re: </span>
            <input
              className="cls_004 htmlInput htmlInput_wide"
              name="Re"
              value={sectionA.Re}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "184.17px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">Client: </span>
            <input
              className="cls_004 htmlInput_m htmlInput "
              name="client"
              value={sectionA.client}
              onChange={(e) => handleInputChange(e)}
              // placeholder="Clio - Trust Account - Funds Out"
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "202.95px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">File No.: </span>
            <span className="cls_003"> </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="fileNo"
              value={sectionA.fileNo}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "220.47px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">Reason for payment: </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="reasonForPayment"
              value={sectionA.reasonForPayment}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "238.00px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">Trust account to be debited:</span>
            <input
              className=" htmlInput htmlInput_m "
              name="trustAccountToBeDebited"
              value={sectionA.trustAccountToBeDebited}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "256.75px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">Name of financial institution: </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="nameOfFinancialInst"
              value={sectionA.nameOfFinancialInst}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "274.53px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">Account number: </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="accountNumber"
              value={sectionA.accountNumber}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "292.30px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">Name of recipient: </span>
            <input
              className="cls_004 htmlInput_m htmlInput "
              name="nameOfRecipient"
              value={sectionA.nameOfRecipient}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "310.05px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003 ">Account to be credited: </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="accountToBeCredited"
              value={sectionA.accountToBeCredited}
              onChange={(e) => handleInputChange(e)}
              // placeholder="Clio - Trust Account - Funds Out"
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "328.82px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">Name of financial institution: </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="nameOfFinancialInst2"
              value={sectionA.nameOfFinancialInst2}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "346.58px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">Branch name and address: </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="branchNameAndAddress"
              value={sectionA.branchNameAndAddress}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "364.33px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between "
          >
            <span className="cls_003">Account number: </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="accountNumber2"
              value={sectionA.accountNumber2}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "370.10px",
              width: "500px",
            }}
            className="cls_003 d-flex justify-content-between align-items-center"
          >
            <span className="cls_003">
              Person requisitioning electronic trust transfer:{" "}
            </span>

            {/* <Autocomplete
              id="size-small-outlined-multi"
              size="small"
              className={`htmlText w-50 mx-2`}
              value={userSelected}
              options={listOfUser}
              onChange={(event, value) => {
                console.log(JSON.stringify(value));
                setUserSelected(value);
                setSectionA({
                  ...sectionA,
                  personRequisElecTrustTransfer: value.email,
                });
              }}
              getOptionLabel={(e) => e.email || ""}
              getOptionSelected={(option, value) => option === value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    style: { fontSize: "1.1rem", top: "0px" },
                  }}
                  label="Select User "
                  placeholder="Select User"
                />
              )}
            /> */}

            <Dropdown
              className="mt-4 heading-5 w-25 htmlText fw-bold"
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
          </div>
          {/* <div
            style={{ position: "absolute", left: "52.10px", top: "402.87px" }}
            className="cls_004"
          >
            <span className="cls_004"> </span>
          </div> */}
          {/* <div
            style={{ position: "absolute", left: "52.10px", top: "426.40px" }}
            className="cls_003"
          >
            <span className="cls_003">Date:</span>
          </div> */}
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "425.40px",
              width: "500px",
            }}
            className="cls_004  d-flex justify-content-between"
          >
            <span className="cls_003">Date:</span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="date"
              type="date"
              value={sectionA.date || new Date().toISOString().substring(0, 10)}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "443.15px",
              width: "500px",
            }}
            className="cls_003  d-flex justify-content-between"
          >
            <span className="cls_003">Signature:</span>

            <input
              className="cls_004 htmlInput htmlInput_m  "
              name="signature"
              value={sectionA.signature}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "461.67px",
              width: "500px",
            }}
            className="cls_003  d-flex justify-content-between"
          >
            <span className="cls_003">Additional transaction particulars:</span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="additionalTransactionParticulars"
              value={sectionA.additionalTransactionParticulars}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "479.45px",
              width: "500px",
            }}
            className="cls_003  d-flex justify-content-between"
          >
            <span className="cls_003">
              Person entering details of transfer:
            </span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="personEnteringDetailsOfTransfer"
              value={sectionA.personEnteringDetailsOfTransfer}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "497.97px",
              width: "500px",
            }}
            className="cls_003  d-flex justify-content-between"
          >
            <span className="cls_003">Preparer Name:</span>
            <input
              className="cls_004 htmlInput_m htmlInput "
              name="namePreparer"
              value={sectionA.namePreparer}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{ position: "absolute", left: "105.12px", top: "529.73px" }}
            className="cls_004"
          ></div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "515.25px",
              width: "500px",
            }}
            className="cls_003  d-flex justify-content-between"
          >
            <span className="cls_003">
              Person authorizing transfer at computer terminal:
            </span>
            <input
              className="cls_004 htmlInput_m htmlInput "
              name="personAuthorizingTransferAtComputerTerminal"
              value={sectionA.personRequisElecTrustTransfer}
              // onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "52.10px",
              top: "533.02px",
              width: "500px",
            }}
            className="cls_003  d-flex justify-content-between"
          >
            <span className="cls_003"> Reviewer Name:</span>
            <input
              className="cls_004 htmlInput htmlInput_m "
              name="nameReviewer"
              value={sectionA.nameReviewer}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{ position: "absolute", left: "108.12px", top: "592.80px" }}
            className="cls_004"
          ></div>
        </div>
      </div>
    </ComplianceFormLayout>
  );
};

export default ElecTrustTransferRequis;
