import React, { useEffect, useRef, useState } from "react";
import ComplianceFormLayout from "../ComplianceFormLayout.tsx";
import useTable from "../../../hooks/useTable";
import { useHistory } from "react-router";
import {
  fetchFormDetails,
  saveComplianceFormDetails,
} from "../../../utils/helpers";
import { useReactToPrint } from "react-to-print";
import RepresentativeCapacityUndertakingPrint from "./print/RepresentativeCapacityUndertakingPrint";

const RepresCapacityUndertaking = () => {
  const compliancePDF = useRef(null);
  const headings = [
    "#",
    "Matter Number",
    "Client Name",
    "Total dollar value of all assets",
  ];

  const data = [
    {
      id: 1,
      matterNum: 10,
      clientName: "John Smith",
      totalDollar: 1000,
    },
    {
      id: 2,
      matterNum: 20,
      clientName: "John Doe",
      totalDollar: 2000,
    },
    {
      id: 3,
      matterNum: 30,
      clientName: "Larry Page",
      totalDollar: 3000,
    },
  ];

  const { headers, rows } = useTable({
    headings: headings,
    data: data,
    isEditable: false,
  });

  const [sectionA, setSectionA] = useState({
    representativeCapacity: "",
    representativeCapacityValue: "",
    totalNumberOfMatters: "",
    table: [
      {
        id: 1,
        matterNum: 2,
        clientName: "safd",
        dollar: 23,
      },
      {
        id: 12,
        matterNum: 4,
        clientName: "dsaf",
        dollar: 1,
      },
    ],
    totalDollarIndicated: "",
    explanationTotalDollar: "",
    booksAndRecordsMaintained: "",
    explanationBooks: "",
    wereBooksAndRecords: "",
    fundsDisbursed: "",
    pooledTrustAccount: "",
    separateInterestBearing: "",
    estateAndPowerAttorney: "",
    otherAccount: "",
    trusteeAccount: "",
    otherNoOptionAccount: "",

    additionalComments: "",
    nameOfUndertaker: "",
    date: "",
    signatureOfMembers: "",
  });

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

    if (isFormFilled) {
      setSectionA({ ...formDetails });
    }
  }, []);

  const ref = useRef(null);

  return (
    <ComplianceFormLayout
      title="Representative Capacity Undertaking"
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
        <RepresentativeCapacityUndertakingPrint
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
              "\n  <!--\n  span.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_004{font-family:Arial,serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_004{font-family:Arial,serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_007{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_007{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_006{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_006{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_008{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,255);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_008{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,255);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_009{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_011{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_011{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_013{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_013{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_014{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_014{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_012{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_012{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  -->\n  ",
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
              style={{ position: "absolute", left: "356.71px", top: "45.12px" }}
              className="cls_003"
            >
              <span className="cls_003">700 333 - 11th Avenue SW</span>
            </div>
            <div
              style={{ position: "absolute", left: "473.98px", top: "45.12px" }}
              className="cls_003"
            >
              <span className="cls_003">Phone: 1.403.229.4700</span>
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
              <span className="cls_005">
                Representative Capacity Undertaking
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "136.94px" }}
              className="cls_007"
            >
              <span className="cls_007">Instructions:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "155.66px" }}
              className="cls_006"
            >
              <span className="cls_006">
                This form must be completed when a lawyer acts in a
                representative capacity during a reporting period, pursuant to
                Rule 119.26.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "168.38px" }}
              className="cls_006"
            >
              <span className="cls_006">pursuant to Rule 119.26.</span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "186.98px" }}
              className="cls_006"
            >
              <span className="cls_006">Please submit this form to </span>
              <a href="mailto:Trust.Safety@lawsociety.ab.ca">
                Trust.Safety@lawsociety.ab.ca
              </a>{" "}
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "219.86px" }}
              className="cls_009"
            >
              <span className="cls_009">
                SECTION A - EXECUTOR / PERSONAL REPRESENTATIVE / POWER OF
                ATTORNEY
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "247.22px" }}
              className="cls_002"
            >
              <span className="cls_002">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "247.22px" }}
              className="cls_002"
            >
              <span className="cls_002">
                The representative capacity I acted under was a:
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "116.42px",
                top: "263.57px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  type="radio"
                  name="representativeCapacity"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      representativeCapacity: "Personal Matter",
                    })
                  }
                  id="personalMatter"
                  checked={
                    sectionA.representativeCapacity === "Personal Matter"
                  }
                  className="radio_box_html"
                />
                Personal Matter
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "116.42px",
                top: "279.89px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                {" "}
                <input
                  name="representativeCapacity"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      representativeCapacity:
                        "Professional Matter (as a Barrister & Solicitor)",
                    })
                  }
                  id="professionalMatter"
                  type="radio"
                  checked={
                    sectionA.representativeCapacity ===
                    "Professional Matter (as a Barrister & Solicitor)"
                  }
                  className="radio_box_html"
                />{" "}
                Professional Matter (as a Barrister & Solicitor)
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "116.42px",
                top: "296.33px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                If “Personal Matter”, please proceed to section B.
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "116.42px",
                top: "312.65px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                If “Professional Matter”, please answer 2 to 6.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "345.29px" }}
              className="cls_002"
            >
              <span className="cls_002">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "345.29px" }}
              className="cls_002"
            >
              <span className="cls_002">
                During the reporting period, the total number of matters in
                which you acted in a representative capacity was:
              </span>
              <input
                id="reportingPeriod"
                name="representativeCapacityValue"
                value={sectionA.representativeCapacityValue}
                onChange={(e) => handleInputChange(e)}
                className="htmlInput htmlInput_s"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "379.49px" }}
              className="cls_002"
            >
              <span className="cls_002">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "379.49px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Please list the individual matters, client names and total
                dollar value of all assets, as of the end of the reporting
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "389.81px" }}
              className="cls_002"
            >
              <span className="cls_002">
                period, in which you acted in representative capacity:
              </span>
            </div>

            <div
              style={{ position: "absolute", left: "90.02px", top: "511.87px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Attach separate schedule to list additional matters.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "544.51px" }}
              className="cls_002"
            >
              <span className="cls_002">4.</span>
            </div>

            <table
              style={{
                position: "absolute",
                left: "68.86px",
                top: "396.25px",
              }}
            >
              <thead>
                <tr>
                  <th className="htmlText">#</th>
                  <th className="htmlText">Matter Number</th>
                  <th className="htmlText">Client Name</th>
                  <th className="htmlText">Total dollar value of all assets</th>
                </tr>
              </thead>

              <tbody>
                {sectionA.table.map((e, index) => {
                  return (
                    <tr>
                      <td className="htmlText">
                        {" "}
                        <input
                          className="htmlInput htmlInput_s"
                          value={e.id}
                          onChange={(event) => {
                            const tableData = sectionA.table;

                            tableData[index].id = event.target.value;

                            setSectionA({ ...sectionA, table: tableData });
                          }}
                        />
                      </td>
                      <td className="htmlText">
                        <input
                          className="htmlInput htmlInput_s"
                          value={e.matterNum}
                          onChange={(event) => {
                            const tableData = sectionA.table;

                            tableData[index].matterNum = event.target.value;

                            setSectionA({ ...sectionA, table: tableData });
                          }}
                        />
                      </td>
                      <td className="htmlText">
                        <input
                          className="htmlInput htmlInput_s"
                          value={e.clientName}
                          onChange={(event) => {
                            const tableData = sectionA.table;

                            tableData[index].clientName = event.target.value;

                            setSectionA({ ...sectionA, table: tableData });
                          }}
                        />
                      </td>
                      <td className="htmlText">
                        <input
                          className="htmlInput htmlInput_s"
                          value={e.dollar}
                          onChange={(event) => {
                            const tableData = sectionA.table;

                            tableData[index].dollar = event.target.value;

                            setSectionA({ ...sectionA, table: tableData });
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div
              style={{ position: "absolute", left: "90.02px", top: "544.51px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Was the total dollar value indicated in (3) recorded in the
                firm’s accounting records?
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "471.10px",
                top: "544.51px",
              }}
              className="cls_002"
            >
              <input
                className="cls_002 radio_box_html"
                name="wasTotalDollar"
                type="radio"
                id="wasTotalDollar"
                checked={sectionA.totalDollarIndicated === "Yes"}
                onChange={(e) =>
                  setSectionA({ ...sectionA, totalDollarIndicated: "Yes" })
                }
              />
              Yes
            </div>
            <div
              style={{
                position: "absolute",
                left: "526.06px",
                top: "544.51px",
              }}
              className="cls_002"
            >
              <input
                className="cls_002 radio_box_html"
                name="wasTotalDollar"
                type="radio"
                checked={sectionA.totalDollarIndicated === "No"}
                onChange={(e) =>
                  setSectionA({ ...sectionA, totalDollarIndicated: "No" })
                }
              />
              No
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "560.83px" }}
              className="cls_002 w-100"
            >
              <span className="cls_002">
                If “No”, provide an explanation below.
              </span>
              <textarea
                value={sectionA.explanationTotalDollar}
                onChange={(e) => handleInputChange(e)}
                name="explanationTotalDollar"
                className="cls_002 w-75"
              />
            </div>
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
              className="cls_010"
            >
              <span className="cls_010">March 2020</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_010"
            >
              <span className="cls_010">Page 1 of 3</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.06px",
              }}
              className="cls_010"
            >
              <span className="cls_010"> </span>
              <a href="http://www.lawsociety.ab.ca/">
                www.lawsociety.ab.ca
              </a>{" "}
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
                src="99b28244-82ea-11ec-a980-0cc47a792c0a_id_99b28244-82ea-11ec-a980-0cc47a792c0a_files/background2.jpg"
                width={612}
                height={792}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "39.12px" }}
              className="cls_010"
            >
              <span className="cls_010">Law Society of Alberta</span>
            </div>
            <div
              style={{ position: "absolute", left: "437.47px", top: "39.12px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Representative Capacity Undertaking
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "52.92px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "87.98px" }}
              className="cls_002"
            >
              <span className="cls_002">5.</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "87.98px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Were books and records maintained in accordance with Rule
                119.36, in a permanent,
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "471.10px", top: "87.98px" }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="radio_box_html"
                  type="radio"
                  id="wereBooksAndRecords"
                  checked={sectionA.wereBooksAndRecords === "Yes"}
                  onChange={(e) =>
                    setSectionA({ ...sectionA, wereBooksAndRecords: "Yes" })
                  }
                />
                Yes
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "526.06px", top: "87.98px" }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="radio_box_html"
                  type="radio"
                  id="wereBooksAndRecords"
                  checked={sectionA.wereBooksAndRecords === "No"}
                  onChange={(e) =>
                    setSectionA({ ...sectionA, wereBooksAndRecords: "No" })
                  }
                />
                No
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "98.42px" }}
              className="cls_002"
            >
              <span className="cls_002">
                easily traceable form together with all supporting documents?
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "114.74px" }}
              className="cls_002 w-75"
            >
              <span className="cls_002">
                If “No”, provide an explanation below.
              </span>
              <textarea
                id="provideExplanation"
                value={sectionA.explanationBooks}
                onChange={(e) => handleInputChange(e)}
                name="explanationBooks"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "212.78px" }}
              className="cls_002"
            >
              <span className="cls_002">6.</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "212.78px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Were the funds held in/disbursed through your law firm’s trust
                account?
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "471.10px",
                top: "212.78px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="radio_box_html"
                  type="radio"
                  name="fundsDisbursed"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, fundsDisbursed: "Yes" })
                  }
                  checked={sectionA.fundsDisbursed === "Yes"}
                />{" "}
                Yes
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "526.06px",
                top: "212.78px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="radio_box_html"
                  type="radio"
                  name="fundsDisbursed"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, fundsDisbursed: "No" })
                  }
                  checked={sectionA.fundsDisbursed === "No"}
                />{" "}
                No
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "229.22px" }}
              className="cls_002"
            >
              <span className="cls_002">
                If Yes, please indicate the type of account (Select all that
                apply):
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "117.86px",
                top: "245.42px",
              }}
              className="cls_011"
            >
              <span className="cls_011">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      pooledTrustAccount: e.target.checked,
                    })
                  }
                  checked={sectionA.pooledTrustAccount}
                  name="pooledTrustAccount"
                  className="htmlcheckbox"
                />{" "}
                Pooled Trust Account
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "117.86px",
                top: "261.89px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      separateInterestBearing: e.target.checked,
                    })
                  }
                  checked={sectionA.separateInterestBearing}
                  name="separateInterestBearing"
                  className="htmlcheckbox"
                  type="checkbox"
                />{" "}
                Separate Interest Bearing Account
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "117.86px",
                top: "278.21px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="htmlcheckbox"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      estateAndPowerAttorney: e.target.checked,
                    })
                  }
                  checked={sectionA.estateAndPowerAttorney}
                  name="estateAndPowerAttorney"
                  type="checkbox"
                />{" "}
                Estate and Power of Attorney Trust Account
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "117.86px",
                top: "294.65px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="htmlcheckbox"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      otherAccount: e.target.checked,
                    })
                  }
                  checked={sectionA.otherAccount}
                  name="otherAccount"
                  type="checkbox"
                />{" "}
                Other (Provide description)
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "90.02px", top: "312.41px" }}
              className="cls_002"
            >
              <span className="cls_002">
                If “No”, please indicate the type of account below:
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "117.86px",
                top: "328.85px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="htmlcheckbox"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      trusteeAccount: e.target.checked,
                    })
                  }
                  checked={sectionA.trusteeAccount}
                  name="trusteeAccount"
                  type="checkbox"
                />{" "}
                Trustee Account
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "117.86px",
                top: "345.17px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  className="htmlcheckbox"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      otherNoOptionAccount: e.target.checked,
                    })
                  }
                  checked={sectionA.otherNoOptionAccount}
                  name="otherNoOptionAccount"
                  type="checkbox"
                />{" "}
                Other (Provide description)
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "369.77px" }}
              className="cls_009"
            >
              <span className="cls_009">END OF SECTION A</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "397.13px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Please use this space to add any additional comments related to
                the above questions
              </span>
              <textarea
                value={sectionA.additionalComments}
                name="additionalComments"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "726.94px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "736.18px" }}
              className="cls_010"
            >
              <span className="cls_010">March 2020</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.18px",
              }}
              className="cls_010"
            >
              <span className="cls_010">Page 2 of 3</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.18px",
              }}
              className="cls_010"
            >
              <span className="cls_010"> </span>
              <a href="http://www.lawsociety.ab.ca/">
                www.lawsociety.ab.ca
              </a>{" "}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              marginLeft: "-306px",
              top: "1604px",
              width: "612px",
              height: "792px",
              borderStyle: "outset",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="99b28244-82ea-11ec-a980-0cc47a792c0a_id_99b28244-82ea-11ec-a980-0cc47a792c0a_files/background3.jpg"
                width={612}
                height={792}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "39.12px" }}
              className="cls_010"
            >
              <span className="cls_010">Law Society of Alberta</span>
            </div>
            <div
              style={{ position: "absolute", left: "437.47px", top: "39.12px" }}
              className="cls_010"
            >
              <span className="cls_010">
                Representative Capacity Undertaking
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "52.92px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "72.00px" }}
              className="cls_007"
            >
              <span className="cls_007">SECTION B - DECLARATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "100.70px" }}
              className="cls_002"
            >
              <span className="cls_002">I,</span>
              <input
                id="signature"
                name="nameOfUndertaker"
                onChange={(e) => handleInputChange(e)}
                value={sectionA.nameOfUndertaker}
                className="htmlInput"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "333.91px",
                top: "100.70px",
              }}
              className="cls_002"
            >
              <span className="cls_002">,undertake to provide, on demand:</span>
            </div>
            <div
              style={{ position: "absolute", left: "72.02px", top: "118.58px" }}
              className="cls_002"
            >
              <span className="cls_002">a)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "108.02px",
                top: "118.58px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                particulars relating to my acting in a representative capacity;
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.02px", top: "134.90px" }}
              className="cls_002"
            >
              <span className="cls_002">b)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "108.02px",
                top: "134.90px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                a list of the beneficiaries of the estate or trust, together
                with their last known address;
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "72.02px", top: "151.22px" }}
              className="cls_002"
            >
              <span className="cls_002">c)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "108.02px",
                top: "151.22px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                to the extent of my lawful ability, the books, records, accounts
                and documents of the estate or trust, in a form sufficient to
                accommodate an examination, review, audit or investigation
                ordered by the Executive Director, and
              </span>
            </div>
            {/* <div
              style={{
                position: "absolute",
                left: "108.02px",
                top: "161.54px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                sufficient to accommodate an examination, review, audit or
                investigation ordered by the Executive Director, and
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "72.02px", top: "187.86px" }}
              className="cls_002"
            >
              <span className="cls_002">d)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "108.02px",
                top: "187.86px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                to cooperate with the Society’s auditor or investigator in the
                conduct of any examination, review, audit or investigation so
                ordered.
              </span>
            </div>
            {/* <div
              style={{
                position: "absolute",
                left: "108.02px",
                top: "188.30px",
              }}
              className="cls_002"
            >
              <span className="cls_002">investigation so ordered.</span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "214.62px" }}
              className="cls_002"
            >
              <span className="cls_002">all pursuant to subrule 119.26.</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "237.14px" }}
              className="cls_013"
            >
              <span className="cls_013"> Date</span>
              <input
                name="date"
                onChange={(e) => handleInputChange(e)}
                value={sectionA.date}
                className="htmlInput htmlInput_m"
                id="date"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "239.45px",
                top: "237.26px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Signature of Member</span>
              <input
                className="htmlInput htmlInput_m"
                id="signatureOfMember"
                name="signatureOfMember"
                value={sectionA.signatureOfMembers}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "644.62px" }}
              className="cls_014"
            >
              <span className="cls_014">
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
              {/* <span className="cls_012">Legal</span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "653.74px" }}
              className="cls_012"
            >
              <span className="cls_012">Profession Act</span>
              <span className="cls_014">
                , the Rules of the Law Society, the Code of Conduct, or a
                resolution of the Benchers and will be accessible to all
                departments of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "662.98px" }}
              className="cls_014"
            >
              <span className="cls_014">
                the Law Society, including the Alberta Lawyers Insurance
                Association. The information may be used or disclosed by the Law
                Society of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "672.22px" }}
              className="cls_014"
            >
              <span className="cls_014">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "681.34px" }}
              className="cls_014"
            >
              <span className="cls_014">
                obtain additional information, or to obtain clarification on the
                information you provided. Should you have any questions about
                this, please
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "690.70px" }}
              className="cls_014"
            >
              <span className="cls_014">
                contact the Privacy Officer at 403-229-4700.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "726.94px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "736.18px" }}
              className="cls_010"
            >
              <span className="cls_010">March 2020</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.18px",
              }}
              className="cls_010"
            >
              <span className="cls_010">Page 3 of 3</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.18px",
              }}
              className="cls_010"
            >
              <span className="cls_010"> </span>
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
  //   <ComplianceFormLayout title="Representative Capacity Undertaking">
  //     <h1>Representative Capacity Undertaking</h1>
  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION A - EXECUTOR / PERSONAL REPRESENTATIVE / POWER OF ATTORNEY
  //     </h4>
  //     <CheckboxLayoutRight
  //       heading="1. The representative capacity I acted under was a"
  //       options={[
  //         "Personal Matter",
  //         "Professional Matter (as a Barrister & Solicitor)",
  //       ]}
  //       sectionB={sectionA}
  //       stateOption="representativeCapacity"
  //       setSectionB={setSectionA}
  //     />
  //     <div className="my-3"></div>

  //     <span className="heading-5">
  //       2. During the reporting period, the total number of matters in which you
  //       acted in a representative capacity was
  //       <input
  //         type="text"
  //         className="heading-5 w-25 my-4"
  //         onChange={(e) =>
  //           setSectionA({ ...sectionA, totalNumberOfMatters: e.target.value })
  //         }
  //         value={sectionA.totalNumberOfMatters}
  //       />
  //     </span>
  //     <div className="heading-5">
  //       3. Please list the individual matters, client names and total dollar
  //       value of all assets, as of the end of the reporting period, in which you
  //       acted in representative capacity:
  //     </div>
  //     <Table headings={headers} data={rows} />
  //     <div className="my-4"></div>
  //     <CheckboxLayoutRight
  //       heading="4. Was the total dollar value indicated in (3) recorded in the firm’s accounting records?"
  //       options={["Yes", "No"]}
  //       sectionB={sectionA}
  //       stateOption="totalDollarIndicated"
  //       setSectionB={setSectionA}
  //     />
  //     <div className="heading-5">If “No”, provide an explanation below.</div>
  //     <textarea
  //       name="Comments"
  //       id="comments"
  //       cols="7"
  //       className="heading-5"
  //       rows="7"
  //       disabled={sectionA.totalDollarIndicated !== "Yes"}
  //       onChange={(e) =>
  //         setSectionA({ ...sectionA, explanationTotalDollar: e.target.value })
  //       }
  //       value={sectionA.explanationTotalDollar}
  //     ></textarea>
  //     <div className="my-4"></div>

  //     <CheckboxLayoutRight
  //       heading="5. Were books and records maintained in accordance with Rule 119.36, in a permanent, easily traceable form together with all supporting documents?
  //       "
  //       options={["Yes", "No"]}
  //       sectionB={sectionA}
  //       stateOption="explanationTotalDollar"
  //       setSectionB={setSectionA}
  //     />
  //     <div className="heading-5">If “No”, provide an explanation below.</div>
  //     <textarea
  //       name="Comments"
  //       id="comments"
  //       cols="7"
  //       className="heading-5"
  //       rows="7"
  //       disabled={sectionA.explanationBooks !== "Yes"}
  //       onChange={(e) =>
  //         setSectionA({
  //           ...sectionA,
  //           explanationBooks: e.target.value,
  //         })
  //       }
  //       value={sectionA.explanationBooks}
  //     ></textarea>
  //     <div className="my-4"></div>

  //     <CheckboxLayoutRight
  //       heading="6.
  //       Were the funds held in/disbursed through your law firm’s trust account?
  //       "
  //       options={["Yes", "No"]}
  //       sectionB={sectionA}
  //       stateOption="fundsDisbursed"
  //       setSectionB={setSectionA}
  //     />
  //     <div className="heading-5">
  //       If Yes, please indicate the type of account (Select all that apply):
  //     </div>
  //     {sectionA.typeOfAccounts.map((e) => {
  //       if (e.hasOwnProperty("value")) {
  //         return (
  //           <div>
  //             <input
  //               onChange={(event) => {
  //                 console.log("event", event.target.checked);
  //                 const isChecked = event.target.checked;
  //                 const typeOfAccounts = sectionA.typeOfAccounts;
  //                 typeOfAccounts[e.id - 1].selected = isChecked;

  //                 if (isChecked) {
  //                   setSectionA({ ...sectionA, typeOfAccounts });
  //                 } else {
  //                   typeOfAccounts[e.id - 1].value = "";
  //                   setSectionA({ ...sectionA, typeOfAccounts });
  //                 }
  //               }}
  //               type="checkbox"
  //               id={e.id}
  //               className="mr-1"
  //               name={e.name}
  //             />
  //             <label className="heading-5" for="scales">
  //               {e.name}
  //             </label>
  //             <InputCustom
  //               label="Description"
  //               disabled={!sectionA.typeOfAccounts[e.id - 1].selected}
  //               handleChange={(event) => {
  //                 const text = event.target.value;
  //                 const typeOfAccounts = sectionA.typeOfAccounts;
  //                 typeOfAccounts[e.id - 1].value = text;
  //                 //   typeOfAccounts[e.id - 1].selected =
  //                 //     !typeOfAccounts[e.id - 1].selected;

  //                 setSectionA({ ...sectionA, typeOfAccounts });
  //               }}
  //               type="text"
  //               margin="1.8rem 0rem "
  //               value={sectionA.typeOfAccounts[e.id - 1].value}
  //             />
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div>
  //             <input type="checkbox" className="mr-1" id={e.id} name={e.name} />
  //             <label className="heading-5" for={e.name}>
  //               {e.name}
  //             </label>
  //           </div>
  //         );
  //       }
  //     })}
  //     <h4 className="fw-bold section_separator py-3 px-2">END OF SECTION A</h4>
  //     <div className="heading-5 my-2">
  //       Please use this space to add any additional comments related to the
  //       above questions
  //     </div>
  //     <textarea
  //       name="comments"
  //       id="comments"
  //       className="heading-5"
  //       cols="7"
  //       rows="7"
  //       onChange={(e) =>
  //         setSectionA({ ...sectionA, additionalComments: e.target.value })
  //       }
  //       value={sectionA.additionalComments}
  //     ></textarea>
  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION B - DECLARATION
  //     </h4>
  //     <span className="heading-5">
  //       I,
  //       <input
  //         type="text"
  //         className="heading-5 w-25 my-4 mx-4"
  //         onChange={(e) =>
  //           setSectionB({ ...sectionB, nameOfUndertaker: e.target.value })
  //         }
  //         value={sectionB.nameOfUndertaker}
  //       />
  //       ,undertake to provide, on demand:
  //     </span>

  //     <div className="mx-5">
  //       <p className="heading-5 my-2">
  //         a) particulars relating to my acting in a representative capacity;
  //       </p>
  //       <p className="heading-5 my-2">
  //         b) a list of the beneficiaries of the estate or trust, together with
  //         their last known address;
  //       </p>

  //       <p className="heading-5 my-2">
  //         c) to the extent of my lawful ability, the books, records, accounts
  //         and documents of the estate or trust, in a form sufficient to
  //         accommodate an examination, review, audit or investigation ordered by
  //         the Executive Director, and
  //       </p>

  //       <p className="heading-5 my-2">
  //         d) to cooperate with the Society's auditor or investigator in the
  //         conduct of any examination, review, audit or investigation so ordered
  //         all pursuant to subrule 119.26.
  //       </p>

  //       <div className="justify-content-between">
  //         <InputCustom
  //           label=""
  //           handleChange={(e) =>
  //             setSectionB({
  //               ...sectionB,
  //               Date: e.target.value,
  //             })
  //           }
  //           type="date"
  //           margin="1.8rem 0rem"
  //           value={sectionB.Date}
  //         />

  //         <InputCustom
  //           label="Signature"
  //           handleChange={(e) =>
  //             setSectionB({
  //               ...sectionB,
  //               Signature: e.target.value,
  //             })
  //           }
  //           type="text"
  //           margin="1.8rem 0rem"
  //           value={sectionB.Signature}
  //         />
  //       </div>
  //     </div>
  //   </ComplianceFormLayout>
  // );
};

export default RepresCapacityUndertaking;
