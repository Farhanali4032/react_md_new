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
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import UnclaimedTrustMoneyPayment from "../print/UnclaimedTrustMoneyPayment";
import { formatNumberInThousands } from "../../../../utils/helpers/Formatting";

const UnclaimedTrustFunds = () => {
  const [sectionA, setSectionA] = useState({
    nameOfLawFirm: "",
    date: "",
    responsibleLawyer: "",
    streetAddress: "",
    province: "",
    city: "",
    postal: "",
    telephone: "",
    nameOfCustodian: "",
    streetAddress2: "",
    city2: "",
    province2: "",
    postal2: "",
    telephone2: "",
    forlawSocietyOnly: "",
    approvedBy: "",
    partBNameOfRightfulOwner: "",
    partBamount: "",
    partBlastKnownAddress: "",
    partBprovince: "",
    partBpostal: "",
    partBcity: "",
    partBtelephone: "",
    partBFax: "",
    partBEmail: "",
    partBForCorporateClientsProvideName: "",
    partBEffortsToLocate: "",
    partBUnfulfilledUndertakings: "",
    partBUnfulfilledDetails: "",
    partBDetailsOftransactionWeredeposited: "",
    partBDateOfLastContactWithClient: "",
    partBOtherInformation: "",
    partBclientBNameOfRightfulOwner: "",
    partBclientBamount: "",
    partBclientBlastKnownAddress: "",
    partBclientBprovince: "",
    partBclientBpostal: "",
    partBclientBcity: "",
    partBclientBtelephone: "",
    partBclientBFax: "",
    partBclientBEmail: "",
    partBclientBForCorporateClientsProvideName: "",
    partBclientBEffortsToLocate: "",
    partBclientBUnfulfilledUndertakings: "",
    partBclientBUnfulfilledDetails: "",
    partBclientBDetailsOftransactionWeredeposited: "",
    partBclientBDateOfLastContactWithClient: "",
    partBclientBOtherInformation: "",
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
    setSectionA({
      ...sectionA,
      [e.target.name]:
        e.target.name === "partBamount"
          ? e.target.value.replace(/[$,]/g, "")
          : e.target.name === "partBclientBamount"
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

            setSectionA({
              ...sectionA,
              nameOfLawFirm: getCompanyInfo()?.companyname,
              responsibleLawyer: clioTrustBody[0].responsible_attorney_name,
              streetAddress: getCompanyInfo()?.legaladdress.Line1,
              province: getCompanyInfo()?.legaladdress.CountrySubDivisionCode,
              city: getCompanyInfo()?.legaladdress.CountrySubDivisionCode,
              postal: getCompanyInfo()?.legaladdress.PostalCode,
              date: moment(new Date()).format("YYYY-MM-DD"),
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
      title="Payment of Unclaimed Trust Money to the Law Society"
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
        <UnclaimedTrustMoneyPayment taskData={taskState} ref={compliancePDF} />
      </div>
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "\n<!--\nspan.cls_003{font-family:Arial,serif;font-size:40.0px;color:rgb(127,127,127);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_003{font-family:Arial,serif;font-size:40.0px;color:rgb(127,127,127);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_004{font-family:Arial,serif;font-size:7.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Arial,serif;font-size:7.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_014{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_014{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Arial,serif;font-size:7.0px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}\ndiv.cls_005{font-family:Arial,serif;font-size:7.0px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_016{font-family:Arial,serif;font-size:7.0px;color:rgb(0,0,255);font-weight:bold;font-style:italic;text-decoration: underline}\ndiv.cls_016{font-family:Arial,serif;font-size:7.0px;color:rgb(0,0,255);font-weight:bold;font-style:italic;text-decoration: none}\nspan.cls_007{font-family:Arial,serif;font-size:7.0px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_007{font-family:Arial,serif;font-size:7.0px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_008{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_010{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_010{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_011{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_011{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_012{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\ndiv.cls_012{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\nspan.cls_013{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_013{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n-->\n",
          }}
        />
        <div
          className="page_container"
          id="page_container"
          style={{ marginTop: "2.5rem" }}
        >
          <div
            style={{
              height: "135%",
              overflowY: "hidden",
              overflowX: "hidden",
              background: "white",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -45%) scale(1)",
              width: "612px",
              borderStyle: "outset",
              marginTop: "3rem",
            }}
          >
            <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="/BCForms/UnclaimedTrustFunds/background1.jpg"
                width={612}
                alt="Background 1 for BC Forms"
                height={792}
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.92px", top: "33.48px" }}
              className="cls_003"
            >
              <span className="cls_003">Application</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "374.88px",
                top: "101.52px",
              }}
              className="cls_004"
            >
              <span className="cls_004">
                845 Cambie Street, Vancouver, BC, Canada V6B 4Z9
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "374.88px",
                top: "109.56px",
              }}
              className="cls_004"
            >
              <span className="cls_004">
                t 604.669.2533 | BC toll-free 1.800.903.5300
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "40.92px", top: "103.44px" }}
              className="cls_014"
            >
              <span className="cls_014">Payment of Unclaimed Trust</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "374.88px",
                top: "117.60px",
              }}
              className="cls_004"
            >
              <span className="cls_004">f 604.687.0135 | TTY 604.443.5700</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "374.88px",
                top: "125.64px",
              }}
              className="cls_004"
            >
              <span className="cls_004">Email </span>
              <a href="mailto:unclaimed@lsbc.org">unclaimed@lsbc.org</a> |
              lawsociety.bc.ca
            </div>
            <div
              style={{ position: "absolute", left: "40.92px", top: "126.36px" }}
              className="cls_014"
            >
              <span className="cls_014">Money to the Law Society</span>
            </div>
            <div
              style={{ position: "absolute", left: "40.56px", top: "178.92px" }}
              className="cls_008"
            >
              <span className="cls_008">PART A: Contact information</span>
            </div>
            <div
              style={{ position: "absolute", left: "40.56px", top: "199.44px" }}
              className="cls_009"
            >
              <span className="cls_009">Name of law firm</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_lg"
                value={sectionA.nameOfLawFirm}
                name="nameOfLawFirm"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "422.99px",
                top: "199.44px",
                display: "flex",
              }}
              className="cls_009"
            >
              <span className="cls_009">Date</span>
              <input
                onChange={handleInputChange}
                type="date"
                className="htmlInput htmlInput_ms"
                value={sectionA.date}
                name="date"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "40.56px",
                top: "219.12px",
              }}
            >
              <span className="cls_009">Responsible lawyer</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.responsibleLawyer}
                name="responsibleLawyer"
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.56px", top: "238.92px" }}
              className="cls_009"
            >
              <span className="cls_009">Street address</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_lg"
                value={sectionA.streetAddress}
                name="streetAddress"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "423.00px",
                top: "238.92px",
              }}
              className="cls_009 d-flex"
            >
              <span className="cls_009">City</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput_s htmlInput"
                value={sectionA.city}
                name="city"
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.56px", top: "258.60px" }}
              className="cls_009"
            >
              <span className="cls_009">Province/State</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.province}
                name="province"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "230.04px",
                top: "258.60px",
              }}
              className="cls_009"
            >
              <span className="cls_009">Postal/ZIP code</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.postal}
                name="postal"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "423.00px",
                top: "258.60px",
              }}
              className="cls_009 d-flex"
            >
              <span className="cls_009">Telephone</span>
              <input
                onChange={handleInputChange}
                type="number"
                className="htmlInput htmlInput_s"
                value={sectionA.telephone}
                name="telephone"
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.56px", top: "278.28px" }}
              className="cls_009"
            >
              <span className="cls_009">Name of custodian (if applicable)</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.nameOfCustodian}
                name="nameOfCustodian"
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.56px", top: "298.08px" }}
              className="cls_009"
            >
              <span className="cls_009">Street address</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_lg"
                value={sectionA.streetAddress2}
                name="streetAddress2"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "423.00px",
                top: "298.08px",
              }}
              className="cls_009 d-flex"
            >
              <span className="cls_009">City</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_s"
                value={sectionA.city2}
                name="city2"
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.56px", top: "317.76px" }}
              className="cls_009"
            >
              <span className="cls_009">Province/State</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.province2}
                name="province2"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "230.04px",
                top: "317.76px",
              }}
              className="cls_009"
            >
              <span className="cls_009">Postal/ZIP code</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.postal2}
                name="postal2"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "423.00px",
                top: "317.76px",
              }}
              className="cls_009 d-flex"
            >
              <span className="cls_009">Telephone</span>
              <input
                onChange={handleInputChange}
                type="number"
                className="htmlInput htmlInput_s"
                value={sectionA.telephone2}
                name="telephone2"
              />
            </div>
            <div
              style={{ position: "absolute", left: "40.56px", top: "337.56px" }}
              className="cls_010"
            >
              <span className="cls_010">
                The information on this form is collected under the authority of
                Rule 3-89 (1) and (2) of the Law Society Rules, which is as
                follows:
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "40.55px", top: "360.88px" }}
              className="cls_010"
            >
              <span className="cls_010">follows:</span>
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "71.59px",
                top: "370.08px",
                maxWidth: "85%",
              }}
              className="cls_010"
            >
              <span className="cls_010">
                3-89 (1) A lawyer who has money in trust on behalf of a person
                whom the lawyer has been unable to locate for 2 years may apply
                to the Executive Director to pay those funds to the Society
                under section 34 [Unclaimed trust money]
              </span>
            </div>
            {/* <div
              style={{
                position: "absolute",
                left: "113.02px",
                top: "383.16px",
              }}
              className="cls_010"
            >
              <span className="cls_010">
                years may apply to the Executive Director to pay those funds to
                the Society under section 34{" "}
              </span>
              <span className="cls_011">[Unclaimed</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "113.03px",
                top: "396.35px",
              }}
              className="cls_011"
            >
              <span className="cls_011">trust money]</span>
              <span className="cls_010">.</span>
            </div> */}
            <div
              style={{ position: "absolute", left: "95.03px", top: "415.68px" }}
              className="cls_010"
            >
              <span className="cls_010">
                (2) A lawyer must make the application referred to in subrule
                (1) in writing containing all of the following information that
                is available to the lawyer:
              </span>
            </div>
            {/* <div
              style={{
                position: "absolute",
                left: "113.03px",
                top: "428.99px",
              }}
              className="cls_010"
            >
              <span className="cls_010">
                information that is available to the lawyer:
              </span>
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "113.03px",
                top: "448.20px",
                maxWidth: "80%",
              }}
              className="cls_010"
            >
              <span className="cls_010">
                (a) the full name and last known mailing address of each person
                on whose behalf the funds were held;
              </span>
            </div>
            {/* <div
              style={{
                position: "absolute",
                left: "130.55px",
                top: "461.39px",
              }}
              className="cls_010"
            >
              <span className="cls_010">money;</span>
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "113.02px",
                top: "480.60px",
              }}
              className="cls_010"
            >
              <span className="cls_010">
                (b) the exact amount to be paid to the Society in respect of
                each such person;
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "113.02px",
                top: "499.80px",
              }}
              className="cls_010"
            >
              <span className="cls_010">
                (c) the efforts made by the lawyer to locate each such person;
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "113.01px",
                top: "519.12px",
              }}
              className="cls_010"
            >
              <span className="cls_010">
                (d) any unfulfilled undertakings given by the lawyer in relation
                to the money;
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "113.00px",
                top: "538.32px",
              }}
              className="cls_010"
            >
              <span className="cls_010">
                (e) the details of the transaction in respect of which the money
                was deposited with the lawyer.
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "36.00px",
                top: "569.88px",
                maxWidth: "92%",
              }}
              className="cls_012"
            >
              <span className="cls_012">
                The information on this form is collected under authority of
                section 34 of the Legal Profession Act and Part 3, Division 8 of
                the Law Society Rules. The information provided will be used to
                administer the unclaimed trust money. If you have any questions
                about the collection and use of this information, contact Member
                Services at the Law Society of British Columbia, 845 Cambie
                Street, Vancouver, BC V6B 4Z9, telephone 604.669.2533.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "36.00px", top: "581.76px" }}
              className="cls_012"
            >
              <span className="cls_012">
                Society Rules. The information provided will be used to
                administer the unclaimed trust money. If you have any questions
                about the
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "36.00px", top: "593.76px" }}
              className="cls_012"
            >
              <span className="cls_012">
                collection and use of this information, contact Member Services
                at the Law Society of British Columbia, 845 Cambie Street,
                Vancouver,
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "36.00px", top: "605.64px" }}
              className="cls_012"
            >
              <span className="cls_012">
                BC V6B 4Z9, telephone 604.669.2533.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "41.64px", top: "633.12px" }}
              className="cls_010"
            >
              <span className="cls_010">For Law Society use only</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.forlawSocietyOnly}
                name="forlawSocietyOnly"
              />
            </div>
            <div
              style={{ position: "absolute", left: "41.64px", top: "658.32px" }}
              className="cls_010"
            >
              <span className="cls_010">Approved by:</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.approvedBy}
                name="approvedBy"
              />
            </div>
            <div
              style={{ position: "absolute", left: "36.00px", top: "735.72px" }}
              className="cls_013"
            >
              <span className="cls_013">DM835408</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "570.96px",
                top: "745.08px",
              }}
              className="cls_002"
            >
              <span className="cls_002">1</span>
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
              <img
                src="/BCForms/UnclaimedTrustFunds/background2.jpg"
                width={612}
                alt="Background 2 for BC Forms"
                height={792}
              />
            </div>
            <div
              style={{ position: "absolute", left: "36.00px", top: "35.40px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Society of British Columbia</span>
            </div>
            <div
              style={{ position: "absolute", left: "307.92px", top: "35.40px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Application: Payment of Unclaimed Trust Money to the Law Society
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "63.84px" }}
              className="cls_008"
            >
              <span className="cls_008">PART B: Trust amount information</span>
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "84.48px" }}
              className="cls_009"
            >
              <span className="cls_009">Client A</span>
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "104.28px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Name of rightful owner(s) of funds
              </span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBNameOfRightfulOwner}
                name="partBNameOfRightfulOwner"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "422.75px",
                top: "104.28px",
                display: "flex",
              }}
              className="cls_010"
            >
              <span className="cls_010">Amount</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_ms"
                value={formatNumberInThousands(parseInt(sectionA.partBamount))}
                name="partBamount"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "123.96px" }}
              className="cls_010"
            >
              <span className="cls_010">Last known address</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBlastKnownAddress}
                name="partBlastKnownAddress"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "143.76px" }}
              className="cls_010"
            >
              <span className="cls_010">Province/State</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBprovince}
                name="partBprovince"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "229.44px",
                top: "143.76px",
              }}
              className="cls_010"
            >
              <span className="cls_010">Postal/ZIP code</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBpostal}
                name="partBpostal"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "422.75px",
                top: "143.76px",
                display: "flex",
              }}
              className="cls_010"
            >
              <span className="cls_010">City</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_ms"
                value={sectionA.partBcity}
                name="partBcity"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "163.44px" }}
              className="cls_010"
            >
              <span className="cls_010">Telephone</span>
              <input
                onChange={handleInputChange}
                type="number"
                className="htmlInput htmlInput_m"
                value={sectionA.partBtelephone}
                name="partBtelephone"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "229.44px",
                top: "163.44px",
              }}
              className="cls_010"
            >
              <span className="cls_010">Fax</span>
              <input
                onChange={handleInputChange}
                type="number"
                className="htmlInput htmlInput_m"
                value={sectionA.partBFax}
                name="partBFax"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "422.76px",
                top: "163.44px",
                display: "flex",
              }}
              className="cls_010"
            >
              <span className="cls_010">Email</span>
              <input
                onChange={handleInputChange}
                type="email"
                className="htmlInput htmlInput_ms"
                value={sectionA.partBEmail}
                name="partBEmail"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "183.12px" }}
              className="cls_010"
            >
              <span className="cls_010">
                For corporate clients please provide name, address and telephone
                number for contact person(s), officer(s) and/or directors
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "39.36px",
                top: "215.44px",
              }}
              className="cls_010"
            >
              <span className="cls_010"></span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_lg"
                value={sectionA.partBForCorporateClientsProvideName}
                name="partBForCorporateClientsProvideName"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "249.12px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Efforts to locate client (telephone directory/criss-cross
                searches, internet searches conducted, etc.)
              </span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBEffortsToLocate}
                name="partBEffortsToLocate"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "289.80px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Unfulfilled undertakings in relation to these trust funds
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "315.76px",
                top: "289.80px",
              }}
              className="cls_010"
            >
              <input
                className="radio_box_html"
                type="radio"
                name="didClientApprove"
                onChange={(e) =>
                  setSectionA({
                    ...sectionA,
                    partBUnfulfilledUndertakings: "Yes",
                  })
                }
                checked={sectionA.partBUnfulfilledUndertakings === "Yes"}
                id="didClientApprove"
              />{" "}
              Yes
            </div>
            <div
              style={{
                position: "absolute",
                left: "350.64px",
                top: "289.80px",
              }}
              className="cls_010"
            >
              <input
                className="radio_box_html"
                type="radio"
                name="didClientApprove"
                onChange={(e) =>
                  setSectionA({
                    ...sectionA,
                    partBUnfulfilledUndertakings: "No",
                  })
                }
                checked={sectionA.partBUnfulfilledUndertakings === "No"}
                id="didClientApprove"
              />
              No
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "306.12px" }}
              className="cls_010"
            >
              <span className="cls_010">If ‘yes’ please provide details</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_lg"
                value={sectionA.partBUnfulfilledDetails}
                name="partBUnfulfilledDetails"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "346.80px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Details of the transaction in which the funds were deposited in
                trust
              </span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBDetailsOftransactionWeredeposited}
                name="partBDetailsOftransactionWeredeposited"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "366.48px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Date of last contact with client (must exceed two years)
              </span>
              <input
                onChange={handleInputChange}
                type="date"
                className="htmlInput htmlInput_m"
                value={sectionA.partBDateOfLastContactWithClient}
                name="partBDateOfLastContactWithClient"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "386.28px" }}
              className="cls_010"
            >
              <span className="cls_010">Other information</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBOtherInformation}
                name="partBOtherInformation"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "405.84px" }}
              className="cls_009"
            >
              <span className="cls_009">Client B</span>
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "425.64px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Name of rightful owner(s) of funds
              </span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBNameOfRightfulOwner}
                name="partBclientBNameOfRightfulOwner"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "422.75px",
                top: "425.64px",
                display: "flex",
              }}
              className="cls_010"
            >
              <span className="cls_010">Amount</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_ms"
                value={formatNumberInThousands(
                  parseInt(sectionA.partBclientBamount)
                )}
                name="partBclientBamount"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "445.44px" }}
              className="cls_010"
            >
              <span className="cls_010">Last known address</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBlastKnownAddress}
                name="partBclientBlastKnownAddress"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "465.12px" }}
              className="cls_010"
            >
              <span className="cls_010">Province/State</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBprovince}
                name="partBclientBprovince"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "229.44px",
                top: "465.12px",
              }}
              className="cls_010"
            >
              <span className="cls_010">Postal/ZIP code</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBpostal}
                name="partBclientBpostal"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "422.75px",
                top: "465.12px",
                display: "flex",
              }}
              className="cls_010"
            >
              <span className="cls_010">City</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_ms"
                value={sectionA.partBclientBcity}
                name="partBclientBcity"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "484.80px" }}
              className="cls_010"
            >
              <span className="cls_010">Telephone</span>
              <input
                onChange={handleInputChange}
                type="number"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBtelephone}
                name="partBclientBtelephone"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "229.44px",
                top: "484.80px",
              }}
              className="cls_010"
            >
              <span className="cls_010">Fax</span>
              <input
                onChange={handleInputChange}
                type="number"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBFax}
                name="partBclientBFax"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "422.76px",
                top: "484.80px",
                display: "flex",
              }}
              className="cls_010"
            >
              <span className="cls_010">Email</span>
              <input
                onChange={handleInputChange}
                type="email"
                className="htmlInput htmlInput_ms"
                value={sectionA.partBclientBEmail}
                name="partBclientBEmail"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "504.60px" }}
              className="cls_010"
            >
              <span className="cls_010">
                For corporate clients please provide name, address and telephone
                number for contact person(s), officer(s) and/or directors
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "535.80px" }}
              className="cls_010"
            >
              <span className="cls_010"></span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_lg"
                value={sectionA.partBclientBForCorporateClientsProvideName}
                name="partBclientBForCorporateClientsProvideName"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "570.48px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Efforts to locate client (telephone directory/criss-cross
                searches, internet searches conducted, etc.)
              </span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBEffortsToLocate}
                name="partBclientBEffortsToLocate"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "611.28px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Unfulfilled undertakings in relation to these trust funds
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "315.76px",
                top: "611.28px",
              }}
              className="cls_010"
            >
              <input
                className="radio_box_html"
                type="radio"
                name="didClientApprove2"
                onChange={(e) =>
                  setSectionA({
                    ...sectionA,
                    partBclientBUnfulfilledUndertakings: "Yes",
                  })
                }
                checked={sectionA.partBclientBUnfulfilledUndertakings === "Yes"}
                id="didClientApprove2"
              />{" "}
              Yes
            </div>
            <div
              style={{
                position: "absolute",
                left: "355.64px",
                top: "611.28px",
              }}
              className="cls_010"
            >
              <input
                className="radio_box_html"
                type="radio"
                name="didClientApprove2"
                onChange={(e) =>
                  setSectionA({
                    ...sectionA,
                    partBclientBUnfulfilledUndertakings: "No",
                  })
                }
                checked={sectionA.partBclientBUnfulfilledUndertakings === "No"}
                id="didClientApprove2"
              />{" "}
              No
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "627.48px" }}
              className="cls_010"
            >
              <span className="cls_010">If ‘yes’ please provide details</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBUnfulfilledDetails}
                name="partBclientBUnfulfilledDetails"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "668.16px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Details of the transaction in which the funds were deposited in
                trust
              </span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBDetailsOftransactionWeredeposited}
                name="partBclientBDetailsOftransactionWeredeposited"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "687.96px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Date of last contact with client (must exceed two years)
              </span>
              <input
                onChange={handleInputChange}
                type="date"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBDateOfLastContactWithClient}
                name="partBclientBDateOfLastContactWithClient"
              />
            </div>
            <div
              style={{ position: "absolute", left: "39.36px", top: "707.64px" }}
              className="cls_010"
            >
              <span className="cls_010">Other information</span>
              <input
                onChange={handleInputChange}
                type="text"
                className="htmlInput htmlInput_m"
                value={sectionA.partBclientBOtherInformation}
                name="partBclientBOtherInformation"
              />
            </div>
            <div
              style={{ position: "absolute", left: "36.00px", top: "745.08px" }}
              className="cls_013"
            >
              <span className="cls_013">DM835408</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "570.96px",
                top: "745.08px",
              }}
              className="cls_002"
            >
              <span className="cls_002">2</span>
            </div>
          </div>
        </div>
      </div>
    </ComplianceFormLayout>
  );
};

export default UnclaimedTrustFunds;
