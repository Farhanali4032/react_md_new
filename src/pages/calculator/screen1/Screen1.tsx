import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import InputCustom from "../../../components/InputCustom";
import ReuseAbleCheckboxLayoutRight from "../../../components/LayoutComponents/ReuseAbleCheckboxLayoutRight/ReuseAbleCheckboxLayoutRight";
import Dropdown from "react-dropdown";
import useTable from "../../../hooks/useTable";
import ModalInputCenter from "../../../components/ModalInputCenter";
import InfoIcon from "@mui/icons-material/Info";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  aboutTheRelationshipState,
  aboutYourChildrenState,
  findNumberOfYearsOfFinishing,
  findNumberOfYearsOfStarting,
  showMoreOptionsState,
} from "./Screen1";
import { useHistory } from "react-router-dom";
import {
  backgroundState,
  getCalculatorIdFromQuery,
  SPOUSAL_SUPPORT_CAL,
} from "../Calculator";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import useQuery from "../../../hooks/useQuery";
import DatePicker from "react-date-picker";
import { DatePicker as DatePickerInput } from "@mui/x-date-pickers/DatePicker";
import OverviewCal from "../Overview_Cal";
import {
  mapAmountFieldAndTotal,
  partyIncomeAndAmount,
} from "../screen2/Screen2";
import moment from "moment";
import { isENVPROD } from "../../../utils/helpers";
import { AUTH_ROUTES } from "../../../routes/Routes.types";
import CONSTANTS from "../TollTipConstants";
import CustomCheckbox from "../../../components/LayoutComponents/CustomCheckbox/CustomCheckbox";

type Props = {
  background: backgroundState;
  aboutTheChildren: aboutYourChildrenState;
  aboutTheRelationship: aboutTheRelationshipState;
  setAboutTheChildren: any;
  setBackground: any;
  setAboutTheRelationship: any;
  setBackgroundStateByObj: any;
  typeOfCalculatorSelected: string;
  setAboutTheChildrenDetails: any;
  setAboutTheChildrenStateByObj: any;
  // calpercentageRef: any;
  // setCalPercentage: any;
  specificamount: any;
  setspecificamount: any;
  editingPercentage: any;
  setEditingPercentage: any;
  editingSpecificAmount: any;
  setEditingSpecificAmount: any;
  specialExpensePercentage: any;
  setspecialExpensePercentage: any;
  incomeDetails: { party1: partyIncomeAndAmount; party2: partyIncomeAndAmount };
  lumpsum: any;
  setLumpsum: any;
  includeLumpsum: any;
  setIncludeLumpsum: any;
  lifeInsurence: any;
  setLifeInsurence: any;
  includeLifeInsurence: any;
  setIncludeLifeInsurence: any;
  updateCalPercentage:any,
  calpercentageRef:any,
};

const Screen1 = ({
  background,
  setBackground,
  aboutTheChildren,
  setAboutTheChildren,
  aboutTheRelationship,
  setAboutTheRelationship,
  setBackgroundStateByObj,
  typeOfCalculatorSelected,
  setAboutTheChildrenDetails,
  setAboutTheChildrenStateByObj,
  // calpercentageRef,
  // setCalPercentage,
  specificamount,
  setspecificamount,
  editingPercentage,
  setEditingPercentage,
  editingSpecificAmount,
  setEditingSpecificAmount,
  specialExpensePercentage,
  setspecialExpensePercentage,
  incomeDetails,
  lumpsum,
  setLumpsum,
  includeLumpsum,
  setIncludeLumpsum,
  lifeInsurence,
  setLifeInsurence,
  includeLifeInsurence,
  setIncludeLifeInsurence,
  updateCalPercentage,
  calpercentageRef,
}: Props) => {
  const headings = ["#", "Name", `Birthdate`, "Lives With*", "More Options"];
  const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d\d\d)Z$/g;
  const history = useHistory();
  const calculatorId = useQuery();

  const [showMoreOptions, setShowMoreOptions] = useState<showMoreOptionsState>({
    party1: false,
    party2: false,
    aboutTheChildrenInfo: false,
    aboutTheChildrenNumberInfo: -1,
  });
  console.log("calpercentageupper",calpercentageRef)
  console.log("calpercentageNew",calpercentageRef)
  

  const [showAlertFillAllDetails, setShowAlertFillAllDetails] = useState(false);
  const [showsettingModal, setShowsettingModal] = useState(false);

  const aboutYourChildrenInput = [
    {
      type: "number",
      label: "Number of Children",
      margin: "",
      name: "numberOfChildrenWithAdultChild",
      value: aboutTheChildren.numberOfChildrenWithAdultChild,
    },
  ];

  const types = aboutTheChildren.childrenInfo.map((e, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td className="form-group td">
          <InputCustom
            handleChange={(event) => {
              setAboutTheChildrenDetails(event, index, "name");
            }}
            type="text"
            classNames="form-control"
            value={aboutTheChildren.childrenInfo[index].name}
          />
        </td>
        <td className="form-group td">
          <div className="tooltipInclude">
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip id="tooltip-left">{CONSTANTS.birth_date}</Tooltip>
              }
            >
              <InfoIcon fontSize="small" style={{ color: "grey" }} />
            </OverlayTrigger>
            <DatePickerInput
              value={
                aboutTheChildren.childrenInfo[index].dateOfBirth
                  ? moment(aboutTheChildren.childrenInfo[index].dateOfBirth)
                  : null
              }
              onChange={(newValue) => {
                const makeEvent = (val) => {
                  return { target: { value: val } };
                };
                const getBirth = moment(newValue).valueOf();
                setAboutTheChildrenDetails(
                  makeEvent(getBirth),
                  index,
                  "dateOfBirth"
                );
                setAboutTheChildrenDetails(
                  makeEvent(findNumberOfYearsOfStarting(getBirth)),
                  index,
                  "numberOfYearsOfStartingSchool"
                );
                setAboutTheChildrenDetails(
                  makeEvent(findNumberOfYearsOfFinishing(getBirth)),
                  index,
                  "numberOfYearsOfFinishingSchool"
                );
              }}
            />
          </div>
        </td>
        <td className="form-group td">
          <div className="tooltipInclude">
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip id="tooltip-left">{CONSTANTS.live_with}</Tooltip>
              }
            >
              <InfoIcon fontSize="small" style={{ color: "grey" }} />
            </OverlayTrigger>

            <Dropdown
              onChange={(event) => {
                const details = aboutTheChildren.childrenInfo;
                details[index]["custodyArrangement"] = event.value;
                setAboutTheChildrenStateByObj({ childrenInfo: details });
              }}
              options={[
                background.party1FirstName
                  ? background.party1FirstName
                  : "Party 1",
                background.party2FirstName
                  ? background.party2FirstName
                  : "Party 2",
                "Shared",
              ]}
              value={aboutTheChildren.childrenInfo[index].custodyArrangement}
            />
          </div>
        </td>
        <td>
          <span>
            <a
              href="javascript:void(0)"
              onClick={() => {
                setShowMoreOptions({
                  ...showMoreOptions,
                  aboutTheChildrenInfo: !showMoreOptions.aboutTheChildrenInfo,
                  aboutTheChildrenNumberInfo: index,
                });
              }}
            >
              + More options
            </a>
          </span>
        </td>
      </tr>
    );
  });

  const { headers, rows } = useTable({
    headings: headings,
    data: aboutTheChildren.childrenInfo,
    isEditable: true,
    typeOfArray: types,
  });

  const aboutTheRelationshipInput = [
    {
      type: "date",
      label: "Date of Marriage/start of cohabitation*",
      tooltip: CONSTANTS.Date_of_marriage,
      margin: "1.9rem 1rem",
      name: "dateOfMarriage",
      value: aboutTheRelationship.dateOfMarriage,
    },

    {
      type: "date",
      label: "Date of Separation*",
      tooltip: CONSTANTS.Date_of_separation,
      margin: "1.9rem 1rem",
      name: "dateOfSeparation",
      value: aboutTheRelationship.dateOfSeparation,
    },
  ];

  const inputValuesParty2 = [
    {
      type: "text",
      name: "party2FirstName",
      label: "First Name",
      value: background.party2FirstName,
      margin: "1.9rem 0",
    },
    {
      type: "checkbox",
      margin: "0rem 0",
      label: "Eligible for disability tax credit",
      name: "party2eligibleForDisability",
      checked: background.party2eligibleForDisability,
    },

    // {
    //   type: "text",
    //   margin: "1.9rem 0",
    //   label: "Last Name",
    //   value: background.party2LastName,
    //   name: "party2LastName",
    // },
    {
      type: "date",
      margin: "0rem 0",
      label: "Date of Birth*",
      value: background.party2DateOfBirth,
      name: "party2DateOfBirth",
    },
  ];

  const inputValuesParty1 = [
    {
      type: "text",
      name: "party1FirstName",
      label: "First Name",
      value: background.party1FirstName,
      margin: "1.9rem 0",
    },
    {
      type: "checkbox",
      margin: "0rem 0",
      label: "Eligible for disability tax credit",
      name: "party1eligibleForDisability",
      checked: background.party1eligibleForDisability,
    },

    // },
    // {
    //   type: "text",
    //   margin: "1.9rem 0",
    //   label: "Last Name",
    //   value: background.party1LastName,
    //   name: "party1LastName",
    // },
    {
      type: "date",
      margin: "0rem 0",
      label: "Date of Birth*",
      value: background.party1DateOfBirth,
      name: "party1DateOfBirth",
    },
  ];

  const inputYesOrNoParty2 = [
    {
      heading: "Do you live in Northern Ontario",
      stateOption: "party2LiveInOntario",
      checked: background.party2LiveInOntario,
    },
    {
      heading: "Do you live in a rural or small community?",
      stateOption: "party2LiveInRural",
      checked: background.party2LiveInRural,
    },
    {
      heading:
        "Are you eligible for disability tax credit and other disability- related benefits or credit ",
      stateOption: "party2eligibleForDisability",
      checked: background.party2eligibleForDisability,
    },
    {
      heading: "Are you exempt from Canada Pension Plan?",
      stateOption: "party2ExemptFromCanadaPension",
      checked: background.party2ExemptFromCanadaPension,
    },

    {
      heading: "Are you exempt from Employment Premium?",
      stateOption: "party2ExemptFromEmploymentPremium",
      checked: background.party2ExemptFromEmploymentPremium,
    },
  ];

  const inputYesOrNoParty1 = [
    {
      heading: "Do you live in Northern Ontario",
      stateOption: "party1LiveInOntario",
      checked: background.party1LiveInOntario,
    },
    {
      heading: "Do you live in a rural or small community?",
      stateOption: "party1LiveInRural",
      checked: background.party1LiveInRural,
    },
    {
      heading:
        "Are you eligible for disability tax credit and other disability- related benefits or credit ",
      stateOption: "party1eligibleForDisability",
      checked: background.party1eligibleForDisability,
    },
    {
      heading: "Are you exempt from Canada Pension Plan?",
      stateOption: "party1ExemptFromCanadaPension",
      checked: background.party1ExemptFromCanadaPension,
    },

    {
      heading: "Are you exempt from Employment Premium?",
      stateOption: "party1ExemptFromEmploymentPremium",
      checked: background.party1ExemptFromEmploymentPremium,
    },
  ];

  const renderAllInputsParty1 = () => {
    return [
      renderInputs(inputValuesParty1, setBackground),
      provinceOfResidence(1),
      // showMoreOptions.party1 && renderYesOrNo(1, inputYesOrNoParty1),

      <p
        className="text-primary-color cursor_pointer"
        onClick={() =>
          setShowMoreOptions({
            ...showMoreOptions,
            party1: !showMoreOptions.party1,
          })
        }
      ></p>,
    ];
  };

  const renderAllInputsParty2 = () => {
    return [
      renderInputs(inputValuesParty2, setBackground),
      provinceOfResidence(2),
      // showMoreOptions.party2 && renderYesOrNo(2, inputYesOrNoParty2),
      <p
        className="text-primary-color cursor_pointer"
        onClick={() => {
          setShowMoreOptions({
            ...showMoreOptions,
            party2: !showMoreOptions.party2,
          });
        }}
      ></p>,
    ];
  };

  const numberOfChildrenLivingWithParties = () => {
    const liveWithDetails: string[] = readDropdownValues();

    const count = {
      party1: 0,
      party2: 0,
      shared: 0,
      party1WithAdultChild: 0,
      party2WithAdultChild: 0,
      sharedWithAdultChild: 0,
    };

    for (let i = 0; i < liveWithDetails.length; i++) {
      if (
        liveWithDetails[i] === "Party 1" ||
        liveWithDetails[i] === background.party1FirstName
      ) {
        count.party1++;
        count.party1WithAdultChild++;
      } else if (
        liveWithDetails[i] === "Party 2" ||
        liveWithDetails[i] === background.party2FirstName
      ) {
        count.party2++;
        count.party2WithAdultChild++;
      } else if (liveWithDetails[i] === "Shared") {
        count.shared++;
        count.sharedWithAdultChild++;
      }
    }

    return count;
  };

  const readDropdownValues = (): string[] => {
    return aboutTheChildren.childrenInfo.map(
      ({ custodyArrangement }) => custodyArrangement
    );
  };

  const areAllParty1DetailsFilled = () => {
    return (
      background.party1DateOfBirth !== "" &&
      background.party1province !== "" &&
      Boolean(background.party1DateOfBirth)
    );
  };

  const areAllParty2DetailsFilled = () => {
    const { party2DateOfBirth, party2province } = background;

    return (
      party2DateOfBirth &&
      party2province &&
      Boolean(background.party2DateOfBirth)
    );
  };

  const isLivingArrangementOfEachChild = () => {
    return aboutTheChildren.childrenInfo.every(
      (e) => e.custodyArrangement !== "" && Boolean(e.dateOfBirth)
    );
  };

  const areAllRelationshipDatesFilled = () => {
    const { dateOfMarriage, dateOfSeparation } = aboutTheRelationship;
    return dateOfMarriage && dateOfSeparation;
  };

  const allMandatoryFields = () => {
    return (
      !areAllParty1DetailsFilled() ||
      !areAllParty2DetailsFilled() ||
      !isLivingArrangementOfEachChild() ||
      !areAllRelationshipDatesFilled()
    );
  };

  const checkIfAllMandatoryValuesAreFilled = () => {
    let areDetailsFilled = true;

    if (allMandatoryFields()) {
      areDetailsFilled = false;
      setShowAlertFillAllDetails(true);
    }

    return areDetailsFilled;
  };

  const determineTypeOfSplittingAndNext = () => {
    setAboutTheChildrenStateByObj({
      count: numberOfChildrenLivingWithParties(),
    });

    if (checkIfAllMandatoryValuesAreFilled()) {
      history.push(
        `${
          isENVPROD() ? AUTH_ROUTES.PROD_CALCULATOR : AUTH_ROUTES.CALCULATOR
        }?id=${getCalculatorIdFromQuery(calculatorId)}&step=2`
      );
    }
  };

  const renderInputs = (fields: any, state: any): ReactJSXElement[] => {
    return fields.map((e) => {
      if (e.type === "checkbox") {
        return (
          <CustomCheckbox
            ChangeFun={ParentDisability}
            label={e.label}
            checked={e.checked === "Yes"}
            name={e.name}
          />
          // <div style={{ margin: "0px 0px 8px 0px" }}>
          //   <label style={{
          //     fontSize: "14px",
          //     fontWeight: 700,
          //     minHeight: "20px"
          //   }}>
          //     <input type={e.type}
          //       checked={e.checked === "Yes"}
          //       onChange={ParentDisability}
          //       name={e.name}
          //       style={{ margin: "0px 5px 0px 0px" }}
          //     />
          //     {" "}
          //     {/* Eligible for Disability */}
          //     {e.label}
          //   </label>
          // </div>
        );
      } else if (e.type === "date") {
        return (
          <div className="form-group">
            {e.tooltip ? (
              // <label data-toggle="tooltip" data-placement="left" title={e.tooltip} style={{cursor:"pointer" , justifyContent:"start"}}><InfoIcon fontSize='small' style={{color:"grey"}} /> {e.label}</label>

              <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="tooltip-left">{e.tooltip}</Tooltip>}
              >
                <p>
                  <InfoIcon fontSize="small" style={{ color: "grey" }} />
                  {e.label}
                </p>
              </OverlayTrigger>
            ) : (
              <label>{e.label}</label>
            )}

            <DatePickerInput
              value={e.value ? moment(e.value) : null}
              onChange={(newValue) => {
                const eventTarget = {
                  target: {
                    value: newValue?.valueOf(),
                    name: e.name,
                  },
                };
                state(eventTarget);
              }}
            />
          </div>
        );
      } else {
        return (
          <InputCustom
            type={e.type}
            label={e.label}
            name={e.name}
            handleChange={(event: any) => {
              state(event);
            }}
            value={e.value}
          />
        );
      }
    });
  };

  const provinceOfResidence = (partyNumber: number) => {
    return (
      <div className="form-group">
        {/* <label data-toggle="tooltip" title={CONSTANTS.province} style={{cursor:"pointer" , justifyContent:"start"}}><InfoIcon customClass='mb-4' fontSize='small' style={{color:"grey"}}/> Province*</label> */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="tooltip-left">{CONSTANTS.province}</Tooltip>}
        >
          <p>
            <InfoIcon fontSize="small" style={{ color: "grey" }} />
            Province*
          </p>
        </OverlayTrigger>

        <Dropdown
          disabled={partyNumber === 2}
          value={
            partyNumber === 1
              ? background.party1province
              : background.party2province
          }
          onChange={(event) => {
            // if (partyNumber === 1) {
            //   setBackgroundStateByObj({ party1province: event.value });
            // } else {
            //   setBackgroundStateByObj({ party2province: event.value });
            // }

            if (partyNumber === 1) {
              setBackgroundStateByObj({
                party1province: event.value,
                party2province: event.value, // Set the same value for party2province
              });
            } else {
              setBackgroundStateByObj({
                party1province: event.value, // Set the same value for party1province
                party2province: event.value,
              });
            }
          }}
          options={["ON", "AB", "BC"]}
        />
      </div>
    );
  };

  const renderYesOrNo = (
    partyNumber: number,
    fields: any
  ): ReactJSXElement[] => {
    return fields.map((e) => {
      return (
        <ReuseAbleCheckboxLayoutRight
          options={["Yes", "No"]}
          heading={e.heading}
          checked={e.checked}
          handleOnChangeEvent={(e) => setBackground(e)}
          stateOption={e.stateOption}
        />
      );
    });
  };

  const AlertFillAllDetails = () => {
    return (
      <ModalInputCenter
        heading="Please fill all details"
        handleClick={() => {
          setShowAlertFillAllDetails(false);
        }}
        changeShow={() => setShowAlertFillAllDetails(false)}
        show={showAlertFillAllDetails}
        action="Ok"
        cancelOption="Cancel"
      >
        <span className="text">
          Please fill all the details to proceed further!
        </span>
      </ModalInputCenter>
    );
  };

  const calChange = (e: any) => {
    const { name, value } = e.target;
    const value1 = parseFloat(value);

    // setCalPercentage((prev) => ({
    //   ...prev,
    //   [name]: isNaN(value1) ? 0 : value1,
    // }));

    updateCalPercentage({
      [name]: isNaN(value1) ? 0 : value1,
    });




    // const newValue = parseFloat(e.target.value);

    setEditingPercentage((prevEditingPercentage) => ({
      ...prevEditingPercentage,
      [name]: true,
    }));
    setEditingSpecificAmount((prevEditingSpecificAmount) => ({
      ...prevEditingSpecificAmount,
      [name]: false,
    }));
  };

  const calValChange = (e: any) => {
    const { name, value } = e.target;
    const value1 = parseFloat(value);

    setspecificamount((prev) => ({
      ...prev,
      [name]: isNaN(value1) ? 0 : value1,
    }));

    setEditingPercentage((prevEditingPercentage) => ({
      ...prevEditingPercentage,
      [name]: false,
    }));
    setEditingSpecificAmount((prevEditingSpecificAmount) => ({
      ...prevEditingSpecificAmount,
      [name]: true,
    }));
  };

  const SplValChange = (e) => {
    const { name, value } = e.target;

    const value1 = parseFloat(value);

    setspecialExpensePercentage((prev) => ({
      ...prev,
      [name]: isNaN(value1) ? 0 : value1,
    }));
  };

  const resetAllChanges = () => {
    // setCalPercentage({
    //   low: 40,
    //   mid: 43,
    //   high: 46,
    // });

  
    updateCalPercentage({
      low: 40,
      mid: 43,
      high: 46,
    });


    setspecificamount({
      low: 0,
      mid: 0,
      high: 0,
    });

    setspecialExpensePercentage({
      low: 0,
      mid: 0,
      high: 0,
    });

    setEditingPercentage({
      low: false,
      mid: false,
      high: false,
    });

    setEditingSpecificAmount({
      low: false,
      mid: false,
      high: false,
    });
  };

  const handleLumpsumChange = (e: any) => {
    const { name, value } = e.target;

    setLumpsum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLumpSumInput = (e: any) => {
    const { checked } = e.target;
    setIncludeLumpsum(checked);
  };

  const handlelifeInsurenceInput = (e: any) => {
    const { checked } = e.target;
    setIncludeLifeInsurence(checked);
  };

  const handlelifeinsurenceChange = (e: any) => {
    const { name, value } = e.target;

    setLifeInsurence((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const OverWriteValuesModal = () => {
    return (
      <ModalInputCenter
        heading="Settings"
        handleClick={() => {
          setShowsettingModal(false);
        }}
        modalSize="modal-lg"
        changeShow={() => setShowsettingModal(false)}
        show={showsettingModal}
        action="Ok"
        cancelOption="Cancel"
        ResetOption="Reset"
        reset={true}
        resetAll={resetAllChanges}
      >
        <div className="row">
          <div className="tableOuter m-0">
            <table className="table customGrid">
              <thead>
                <tr>
                  <th>Type</th>
                  <th colSpan={1}>Recipient NDI %</th>
                  <th style={{ width: "180px" }} className="text-center">
                    Spousal Support Amount
                  </th>
                  <th style={{ width: "180px" }} className="text-center">
                    Special Expense %
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Low</td>
                  <td>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        value={calpercentageRef.low}
                        onChange={calChange}
                        readOnly={editingSpecificAmount.low}
                        placeholder="low"
                        name="low"
                      />
                      {/* <p style={{color:"red"}}>this is warning</p> */}
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        value={specificamount.low}
                        onChange={calValChange}
                        placeholder="enter-amount"
                        readOnly={editingPercentage.low}
                        name="low"
                      />
                    </div>
                  </td>

                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        value={specialExpensePercentage.low}
                        onChange={SplValChange}
                        placeholder="enter-amount"
                        name="low"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Medium</td>
                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        readOnly={editingSpecificAmount.mid}
                        value={calpercentageRef.mid}
                        onChange={calChange}
                        placeholder="mid"
                        name="mid"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        readOnly={editingPercentage.mid}
                        value={specificamount.mid}
                        onChange={calValChange}
                        placeholder="enter-amount"
                        name="mid"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        value={specialExpensePercentage.mid}
                        onChange={SplValChange}
                        placeholder="enter-amount"
                        name="mid"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>High</td>
                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        readOnly={editingSpecificAmount.high}
                        value={calpercentageRef.high}
                        onChange={calChange}
                        placeholder="high"
                        name="high"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        value={specificamount.high}
                        onChange={calValChange}
                        placeholder="enter-amount"
                        name="high"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        readOnly={editingPercentage.high}
                        value={specialExpensePercentage.high}
                        onChange={SplValChange}
                        placeholder="enter-amount"
                        name="high"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <div className="col-4"></div>
          </div>

          <div className="col-4"></div>

          <div className="col-4"></div>

          <div className="row mt-4">
            <div className="col-4 d-flex align-items-center">
              <CustomCheckbox
                checked={includeLumpsum}
                label={"Include Lump Sum(NPV)"}
                ChangeFun={handleLumpSumInput}
              />
              {/* <input type="checkbox"></input> */}
              {/* <h6>Include Lump Sum(NPV)</h6> */}
            </div>
            <div className="col-4">
              <div className="form-group">
                <input
                  className="form-control"
                  value={lumpsum.duration}
                  onChange={handleLumpsumChange}
                  name="duration"
                  type="text"
                  placeholder="Automatic calculated"
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <input
                  className="form-control"
                  value={lumpsum.discount_rate}
                  onChange={handleLumpsumChange}
                  name="discount_rate"
                  type="text"
                  placeholder="Discount rate"
                />
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-4 d-flex align-items-center">
              <CustomCheckbox
                checked={includeLifeInsurence}
                label={"Include Life Insurance"}
                ChangeFun={handlelifeInsurenceInput}
              />
              {/* <input type="checkbox"></input> */}
              {/* <h6>Include Lump Sum(NPV)</h6> */}
            </div>
            <div className="col-4">
              <div className="form-group">
                <input
                  className="form-control"
                  value={lifeInsurence.duration}
                  onChange={handlelifeinsurenceChange}
                  name="duration"
                  type="text"
                  placeholder="Automatic calculated"
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <input
                  className="form-control"
                  value={lifeInsurence.discount_rate}
                  onChange={handlelifeinsurenceChange}
                  name="discount_rate"
                  type="text"
                  placeholder="Discount rate"
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <input
                  className="form-control"
                  value={lifeInsurence.age_till_child_support_pay}
                  onChange={handlelifeinsurenceChange}
                  name="age_till_child_support_pay"
                  type="text"
                  placeholder="Age till child support pay"
                />
              </div>
            </div>
          </div>
        </div>
      </ModalInputCenter>
    );
  };

  const ParentDisability = (event: any) => {
    setBackground(event);
  };

  return (
    <>
      <span
        style={{ marginTop: "-30px" }}
        className="text ms-auto d-flex align-items-center cursor-pointer"
        onClick={() => setShowsettingModal(true)}
      >
        <SettingsIcon />
        &nbsp; Setting
      </span>

      {/* overWrite modal is used to overwrite values like specific amount , percentage  and specialexpense percentage . */}
      {showsettingModal && OverWriteValuesModal()}

      <div className="panel">
        {/* <OverviewCal screen1={{background, aboutTheChildren, aboutTheRelationship,}} incomeDetails={{party1: mapAmountFieldAndTotal(incomeDetails.party1), party2: mapAmountFieldAndTotal(incomeDetails.party2), }} taxDetails={{ party1: 0, party2: 0 }}/> */}
        <div className="pHead">
          <span className="h5">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7196 20.2985C18.9528 20.2985 21.5739 17.6775 21.5739 14.4442C21.5739 11.2109 18.9528 8.58984 15.7196 8.58984C12.4863 8.58984 9.86523 11.2109 9.86523 14.4442C9.86523 17.6775 12.4863 20.2985 15.7196 20.2985Z"
                fill="#73C3FD"
              />
              <path
                d="M17.6186 33.8581H19.2071V32.2695C19.2071 31.9964 19.2579 31.7289 19.353 31.4797C19.3662 31.421 19.3826 31.3629 19.4021 31.3057C19.4601 31.1359 19.5444 30.9772 19.6528 30.8338C19.7596 30.6927 19.8873 30.5696 20.0323 30.4681C20.18 30.3649 20.3423 30.2863 20.5146 30.2346L20.5204 30.2329C20.5667 30.2189 20.6093 30.2078 20.6511 30.1988C20.8978 30.1089 21.1701 30.059 21.4633 30.059C21.4821 29.9781 21.5021 29.8976 21.523 29.8175C21.517 29.7055 21.5291 29.5909 21.5612 29.4774C21.7407 28.8428 21.9956 28.2291 22.319 27.6533C22.6368 27.0872 23.0211 26.5572 23.461 26.0778C23.5686 25.9606 23.6795 25.8465 23.7935 25.7355C24.0878 25.4252 24.404 25.1343 24.7401 24.8654C24.7402 24.8653 24.7402 24.8653 24.7403 24.8652C25.0847 24.5895 25.45 24.3367 25.8344 24.1095C25.1743 22.2095 23.6985 20.6965 21.8309 19.9824C21.762 20.2122 21.6835 20.4294 21.5959 20.6344C21.3425 21.2277 21.0129 21.7193 20.6203 22.1229L20.6202 22.123C19.7396 23.029 18.5426 23.4921 17.1806 23.67H17.1805C16.711 23.7313 16.2217 23.7588 15.7191 23.7588C13.4848 23.7588 11.5154 23.2168 10.3558 21.5642C10.0445 21.1206 9.79141 20.597 9.60734 19.9824C9.38224 20.0684 9.16289 20.1662 8.94993 20.2748C7.3979 21.0657 6.18753 22.4349 5.606 24.1028V24.103C5.38164 24.7463 5.25093 25.4343 5.23031 26.1506L4.96671 33.3922V33.3925L4.87891 35.8059H5.22247H6.27481H15.4237C15.4456 35.6215 15.4901 35.4442 15.5543 35.2769C15.5761 35.181 15.6063 35.0871 15.6449 34.9953C15.7295 34.7947 15.8503 34.6146 16.0041 34.46C16.1586 34.3046 16.3389 34.1825 16.5401 34.0969C16.6335 34.0572 16.7294 34.0262 16.8272 34.0041C17.0732 33.9098 17.34 33.8581 17.6186 33.8581Z"
                fill="#73C3FD"
              />
              <path
                d="M45.3531 40.3726L45.3148 39.321L45.0326 31.5658C44.9442 28.4996 42.9958 25.9145 40.2874 24.8789C39.3443 28.0275 36.7342 28.9729 33.6618 28.9729C30.4783 28.9729 27.9571 27.9536 27.0361 24.8789C26.4776 25.0925 25.9516 25.3719 25.4676 25.7076C25.1526 25.9262 24.8553 26.1687 24.5785 26.4325C24.5784 26.4327 24.5783 26.4328 24.5781 26.433C23.6363 27.3306 22.931 28.4749 22.5664 29.7641C22.584 29.7702 22.6014 29.7765 22.6187 29.783C22.8198 29.119 23.1039 28.4849 23.4601 27.8952C23.1039 28.4849 22.8199 29.119 22.6187 29.7831C23.4784 30.1059 24.0531 30.9271 24.0531 31.8528V33.4414H25.6415C25.666 33.4414 25.6903 33.4418 25.7146 33.4426C26.5879 33.471 27.3355 34.007 27.668 34.7671C27.7864 35.0379 27.8521 35.3371 27.8521 35.6518V37.0099C27.8521 37.1409 27.8407 37.2692 27.8189 37.3939C27.6371 38.4314 26.7315 39.2203 25.6415 39.2203H24.9616H24.0531V40.8089C24.0531 41.1066 23.9944 41.3963 23.8786 41.6698C23.8595 41.7152 23.8389 41.7597 23.8168 41.8035C23.7768 41.8828 23.7322 41.9594 23.6833 42.0331H26.0812H45.4135L45.3531 40.3726Z"
                fill="#73C3FD"
              />
              <path
                d="M26.7963 37.0079V35.65C26.7963 35.2961 26.5094 35.0092 26.1555 35.0092H22.9972V31.8509C22.9972 31.4977 22.7108 31.2101 22.3564 31.2101C21.8466 31.2101 21.5195 31.209 21.3047 31.209C21.09 31.209 20.9876 31.2101 20.9273 31.2147C20.8725 31.2188 20.8524 31.2257 20.8143 31.2371C20.5727 31.3095 20.3912 31.5204 20.3619 31.7777C20.3591 31.8017 20.3576 31.8261 20.3576 31.8509V35.0092H17.1994C17.1744 35.0092 17.1498 35.0107 17.1256 35.0135C16.8297 35.0474 16.5975 35.2825 16.5632 35.5749C16.5603 35.5995 16.5586 35.6246 16.5586 35.65V37.008C16.5586 37.3619 16.8455 37.6488 17.1994 37.6488H20.3576V40.807C20.3576 41.1609 20.6445 41.4478 20.9984 41.4478C21.5409 41.4478 21.8715 41.4482 22.0759 41.4482C22.4291 41.4482 22.4051 41.4471 22.4454 41.4415C22.7572 41.3982 22.9972 41.1307 22.9972 40.807V37.6488H26.1555C26.5094 37.6488 26.7963 37.3619 26.7963 37.0079Z"
                fill="#73C3FD"
              />
              <path
                d="M32.5722 25.2059C32.9266 25.267 33.2906 25.2988 33.6621 25.2988C37.1859 25.2988 40.0527 22.4321 40.0527 18.9082C40.0527 18.8432 40.0518 18.7784 40.0498 18.7137C39.996 16.9216 39.2006 15.3125 37.9609 14.1836C36.825 13.149 35.3159 12.5176 33.6621 12.5176C30.1383 12.5176 27.2715 15.3844 27.2715 18.9082C27.2715 20.2378 27.6796 21.4738 28.3772 22.4976C29.3335 23.9011 30.8338 24.9058 32.5722 25.2059Z"
                fill="#73C3FD"
              />
              <path
                d="M8.3627 19.4432C8.82307 20.2075 9.41999 20.8677 10.1369 21.4053C10.8537 21.9428 11.6546 22.3309 12.5173 22.5588C13.4108 22.7947 14.3312 22.8476 15.2531 22.7159C16.1752 22.5841 17.0442 22.2755 17.8358 21.7987C18.6002 21.3383 19.2603 20.7414 19.7979 20.0245C20.3355 19.3076 20.7236 18.5067 20.9514 17.644C21.1873 16.7506 21.2402 15.8302 21.1085 14.9083C20.9767 13.9863 20.6682 13.1174 20.1914 12.3258C19.7311 11.5614 19.1342 10.9013 18.4174 10.3637C17.7005 9.82608 16.8996 9.43796 16.0369 9.2101C15.1435 8.97412 14.2229 8.92126 13.3009 9.053C12.3789 9.18474 11.51 9.49328 10.7184 9.97003C9.95402 10.4304 9.29386 11.0272 8.75626 11.7441C8.21866 12.4609 7.83054 13.2618 7.60268 14.1245C7.3667 15.018 7.31384 15.9385 7.44558 16.8605C7.57731 17.7826 7.88588 18.6515 8.3627 19.4432ZM13.4489 10.0889C16.6446 9.63235 19.6159 11.8607 20.0725 15.0563C20.5291 18.252 18.3007 21.2233 15.1051 21.6799C11.9094 22.1365 8.93814 19.9081 8.48153 16.7125C8.02493 13.5169 10.2533 10.5456 13.4489 10.0889Z"
                fill="#171D34"
              />
              <path
                d="M26.2982 21.6009C26.7943 22.4247 27.4373 23.1362 28.2097 23.7157C28.9823 24.2952 29.8454 24.7137 30.7751 24.9594C31.366 25.1155 31.9678 25.1973 32.5742 25.2044C30.8358 24.9044 29.3355 23.8997 28.3792 22.4961C27.3134 21.5304 26.5652 20.2022 26.3464 18.6705C25.8479 15.182 28.2805 11.9386 31.7688 11.4401C34.2636 11.0837 36.6331 12.2263 37.9629 14.1821C39.2026 15.3111 39.998 16.9202 40.0518 18.7123C40.1362 18.0529 40.1308 17.3842 40.0351 16.7145C39.8931 15.7209 39.5606 14.7845 39.0468 13.9314C38.5507 13.1076 37.9074 12.3961 37.1349 11.8167C36.3623 11.2373 35.4991 10.819 34.5694 10.5734C33.6066 10.3191 32.6145 10.2622 31.6208 10.4042C30.6271 10.5461 29.6907 10.8787 28.8376 11.3924C28.0139 11.8886 27.3024 12.5318 26.7229 13.3044C26.1436 14.077 25.7253 14.9401 25.4797 15.8699C25.2254 16.8328 25.1685 17.8248 25.3105 18.8185C25.4524 19.8118 25.7847 20.7479 26.2982 21.6009Z"
                fill="#171D34"
              />
              <path
                d="M26.4201 37.5929L26.0253 37.6493L24.7656 37.8293L24.9642 39.219H25.6441C26.7341 39.219 27.6397 38.4301 27.8215 37.3926L26.4202 37.5929H26.4201Z"
                fill="#171D34"
              />
              <path
                d="M48.6068 38.811L46.7497 28.5068C46.4611 26.8368 45.6886 25.3114 44.5158 24.0951C43.9499 23.5081 43.3029 23.0066 42.593 22.6046C41.8767 22.199 41.1078 21.9012 40.3077 21.7196C40.1818 21.6909 40.0531 21.6862 39.9279 21.7041C39.7709 21.7265 39.6195 21.7846 39.4858 21.8759C39.2454 22.04 39.0844 22.2968 39.0411 22.5846C38.6869 24.9423 37.0685 26.2481 33.948 26.694C30.8274 27.1398 28.9081 26.3396 27.9078 24.1754C27.7857 23.9111 27.5591 23.7098 27.2824 23.6196C27.1285 23.5693 26.9668 23.556 26.8098 23.5784C26.7468 23.5874 26.6847 23.6022 26.624 23.6226C26.6131 23.5964 26.6012 23.5705 26.588 23.545C26.3248 23.0349 26.0042 22.5527 25.6353 22.1116C25.2715 21.6767 24.8591 21.2801 24.4097 20.9328C23.961 20.586 23.474 20.2874 22.9621 20.045C22.4445 19.7999 21.8996 19.6114 21.3426 19.4849C21.2167 19.4563 21.088 19.4516 20.9628 19.4695C20.8058 19.4919 20.6543 19.55 20.5207 19.6413C20.2803 19.8055 20.1192 20.0622 20.0759 20.35C19.8286 21.9964 18.8966 23.0766 17.1808 23.6704C18.5428 23.4925 19.7398 23.0295 20.6204 22.1234L20.6205 22.1233C20.8521 21.6529 21.019 21.1165 21.1108 20.5054C21.2746 20.5426 21.4363 20.5858 21.596 20.6348C23.3368 21.1683 24.8131 22.3874 25.658 24.0248C25.3321 24.286 25.0258 24.5671 24.7405 24.8656C24.7404 24.8657 24.7404 24.8657 24.7403 24.8658C24.4229 25.1978 24.1314 25.5513 23.8675 25.9231C23.7703 26.0491 23.6767 26.1777 23.5868 26.3089C23.219 26.8458 22.9137 27.4248 22.679 28.0302C22.4404 28.6459 22.2749 29.2895 22.187 29.9431C22.1712 30.0601 22.1756 30.1752 22.1972 30.2851C22.1878 30.3674 22.1795 30.45 22.1722 30.5327C21.8821 30.5742 21.6196 30.6621 21.388 30.786C21.348 30.8007 21.3074 30.8179 21.2635 30.8382L21.2579 30.8408C21.0947 30.9163 20.9451 31.0171 20.8136 31.1401C20.7563 31.1937 20.7031 31.2509 20.654 31.3116L20.6539 31.3117C20.5924 31.388 20.5373 31.4696 20.4896 31.5559C20.4829 31.5679 20.4764 31.5801 20.47 31.5923C20.4699 31.5924 20.4699 31.5925 20.4698 31.5926C20.4249 31.6786 20.3878 31.7681 20.3585 31.8602C20.3377 31.925 20.3209 31.9912 20.3082 32.0584C20.2969 32.1178 20.289 32.1777 20.2842 32.2377C20.2253 32.4978 20.2129 32.7697 20.2515 33.0401L20.3585 33.7887L20.4762 34.6127L20.3585 34.6295L18.9036 34.8373C18.6931 34.8675 18.4937 34.9264 18.3088 35.0096C18.2514 35.0354 18.1954 35.0636 18.1409 35.0939C18.0471 35.1297 17.9566 35.1739 17.8697 35.2264C17.6827 35.3396 17.5215 35.486 17.3904 35.6617C17.2601 35.8364 17.166 36.0318 17.1107 36.2424C17.0854 36.3386 17.0687 36.436 17.0608 36.5339C17.0209 36.7087 17.0019 36.8904 17.0063 37.0761L16.5725 37.138L6.56749 38.5676L6.275 35.8063H5.22266L5.52687 38.6779C5.5568 38.9605 5.70027 39.2187 5.92453 39.3933C6.14869 39.5679 6.43428 39.6438 6.71557 39.6037L17.1543 38.1121C17.184 38.1078 17.2132 38.1022 17.2419 38.0956L17.2644 38.2535C17.2967 38.4785 17.3722 38.691 17.4891 38.8852C17.6017 39.0722 17.7475 39.2335 17.9225 39.3646C18.0974 39.4959 18.2931 39.5907 18.5042 39.6464C18.7232 39.7042 18.9484 39.7173 19.1734 39.6852L20.3585 39.5159L21.264 39.3864L21.5586 41.4483L21.5627 41.477C21.5949 41.702 21.6704 41.9145 21.7873 42.1086C21.8999 42.2956 22.0457 42.457 22.2207 42.5881C22.3957 42.7194 22.5913 42.8142 22.8024 42.8698C23.0215 42.9277 23.2467 42.9408 23.4717 42.9087C23.8042 42.8612 24.0562 42.8253 24.248 42.798C24.366 42.7811 24.4612 42.7676 24.5383 42.7566C24.8911 42.7062 24.9365 42.6997 25.0456 42.6671L25.0462 42.667C25.0905 42.6542 25.1341 42.6395 25.1769 42.6233C25.191 42.6459 25.2059 42.6682 25.2219 42.69C25.4503 43.0008 25.8313 43.1608 26.2132 43.1062L33.7341 42.0316L45.3551 40.3712L47.725 40.0325C48.0062 39.9923 48.2591 39.8395 48.4254 39.6091C48.5918 39.3788 48.6572 39.0906 48.6068 38.811ZM45.3168 39.3195L26.3355 42.0316L26.0652 42.0702C26.0713 42.0575 26.0773 42.0446 26.0832 42.0316H23.6852C23.7342 41.9579 23.7788 41.8813 23.8188 41.802C23.6775 41.8221 23.5138 41.8455 23.3237 41.8727C22.996 41.9195 22.6908 41.7095 22.6118 41.3956C22.6063 41.3739 22.6019 41.3517 22.5987 41.329L22.1519 38.2024L20.3585 38.4587L19.0255 38.6492C18.6751 38.6993 18.3505 38.4558 18.3005 38.1055L18.2353 37.6492L18.1083 36.7611C18.1048 36.736 18.1029 36.711 18.1023 36.6862C18.0949 36.3918 18.2916 36.1263 18.5796 36.0509C18.6032 36.0447 18.6274 36.0397 18.6521 36.0361L21.7785 35.5895L21.3318 32.4629C21.3284 32.4384 21.3264 32.414 21.3257 32.3898C21.3183 32.131 21.4683 31.8965 21.6971 31.7907C21.7332 31.774 21.7522 31.7642 21.8059 31.7524C21.8649 31.7394 21.966 31.7239 22.1786 31.6935C22.349 31.6691 22.5911 31.6353 22.9406 31.5856C23.0269 31.5734 23.1198 31.5602 23.2199 31.5458C23.5708 31.4957 23.895 31.74 23.9449 32.0896L24.0551 32.8608L24.1378 33.4399L24.3621 35.0096L24.3916 35.2161L25.8366 35.0096L27.5181 34.7693C27.5696 34.762 27.6204 34.761 27.6699 34.7657C27.3375 34.0055 26.5899 33.4695 25.7166 33.4411L25.2159 33.5126L25.2056 33.4399L24.9913 31.9401C24.8602 31.0235 24.1752 30.292 23.2785 30.094C23.2605 30.09 23.2424 30.0862 23.2241 30.0827C23.4027 28.7547 23.9392 27.5219 24.7448 26.4999C24.9666 26.2185 25.2088 25.9531 25.4696 25.7062C25.9147 25.2846 26.4137 24.9166 26.9578 24.6144C28.3044 27.5279 30.9445 28.1803 34.096 27.7299C37.1375 27.2953 39.5877 25.9903 40.076 22.74C42.9036 23.382 45.198 25.6657 45.7192 28.6885L47.5769 38.9966L45.3168 39.3195Z"
                fill="#171D34"
              />
              <path
                d="M5.60618 24.1055C5.51849 24.2494 5.43529 24.3961 5.35681 24.5456C4.625 25.94 4.33198 27.5062 4.50936 29.0755L4.96689 33.3947L5.2305 26.1531C5.25111 25.4368 5.38182 24.7488 5.60618 24.1055Z"
                fill="#171D34"
              />
              <path
                d="M47.9104 27.6862C47.9786 27.8366 48.047 27.9895 48.1138 28.1407C48.1201 28.1549 48.1269 28.1687 48.1341 28.1823C48.2036 28.3127 48.3164 28.4128 48.4556 28.4666C48.6094 28.5261 48.7771 28.5221 48.9278 28.4554C49.2116 28.3299 49.3585 28.0114 49.2696 27.7146V27.7145C49.2621 27.6898 49.253 27.6652 49.2426 27.6415C49.1739 27.4862 49.1039 27.3299 49.0346 27.1768C48.894 26.8668 48.5277 26.729 48.2178 26.8695C47.908 27.0098 47.7701 27.3762 47.9104 27.6862Z"
                fill="#171D34"
              />
              <path
                d="M46.7599 25.6085C46.7633 25.6148 46.7668 25.6211 46.7704 25.6274C46.8529 25.77 46.9362 25.9153 47.0178 26.0593C47.1855 26.3554 47.5628 26.4597 47.8589 26.292C48.122 26.1429 48.2381 25.8286 48.1349 25.5448C48.1232 25.5125 48.1085 25.4808 48.0915 25.4509C48.0073 25.3021 47.9221 25.1535 47.8384 25.0089C47.6679 24.7145 47.2897 24.6136 46.9952 24.7841C46.7071 24.9509 46.6043 25.3168 46.7599 25.6085Z"
                fill="#171D34"
              />
              <path
                d="M45.3378 23.8016C45.3558 23.8354 45.3773 23.868 45.4022 23.8988C45.4988 24.0186 45.6 24.1456 45.7115 24.2871C45.9221 24.5543 46.3109 24.6004 46.5781 24.3898C46.8077 24.2089 46.8789 23.8884 46.7475 23.6278C46.729 23.5911 46.7065 23.5558 46.6808 23.5231C46.5659 23.3773 46.4618 23.2467 46.3627 23.1239C46.1491 22.8591 45.7598 22.8174 45.495 23.0311C45.2611 23.2198 45.2013 23.5456 45.3378 23.8016Z"
                fill="#171D34"
              />
              <path
                d="M43.8199 22.3469L43.8533 22.3805C43.9591 22.4867 44.0637 22.5938 44.1642 22.6987C44.3996 22.9444 44.791 22.9527 45.0367 22.7173C45.2336 22.5286 45.2831 22.228 45.1571 21.9864C45.1301 21.9347 45.0959 21.8872 45.0553 21.8448C44.9485 21.7334 44.8384 21.6207 44.7281 21.5099L44.6955 21.4771C44.5793 21.3602 44.4246 21.2955 44.2597 21.2949C44.0949 21.2944 43.9397 21.3581 43.8228 21.4742C43.7059 21.5904 43.6412 21.7452 43.6406 21.91C43.6403 22.0135 43.6652 22.1131 43.7126 22.2018C43.7407 22.2545 43.7766 22.3034 43.8199 22.3469Z"
                fill="#171D34"
              />
              <path
                d="M41.8745 20.0728C41.7803 20.2081 41.7444 20.3719 41.7735 20.5342C41.7823 20.5834 41.7967 20.6305 41.8163 20.6751C41.8614 20.7777 41.934 20.8662 42.0283 20.9318C42.1442 21.0126 42.2739 21.1057 42.425 21.2166C42.6993 21.4179 43.0862 21.3585 43.2876 21.0842C43.4494 20.8637 43.4482 20.5686 43.2846 20.3497C43.2481 20.301 43.2046 20.2579 43.1552 20.2216C42.9956 20.1045 42.8577 20.0055 42.7336 19.9191C42.4544 19.7246 42.069 19.7936 41.8745 20.0728Z"
                fill="#171D34"
              />
              <path
                d="M9.44478 40.9018L9.44677 40.9015L9.8009 40.8478C9.83539 40.8426 9.86943 40.8342 9.90212 40.8228C10.1598 40.7334 10.3172 40.4725 10.2763 40.2026C10.2536 40.0532 10.1742 39.9215 10.0528 39.8318C9.93133 39.742 9.78218 39.7048 9.63283 39.727L9.63084 39.7273L9.27672 39.7809C8.96775 39.8279 8.75456 40.1173 8.80137 40.4261C8.824 40.5755 8.90337 40.7072 9.02484 40.7969C9.14629 40.8867 9.29542 40.9239 9.44478 40.9018Z"
                fill="#171D34"
              />
              <path
                d="M8.17785 40.115C8.0564 40.0252 7.90727 39.988 7.75792 40.0102L7.75592 40.0105L7.4018 40.0641C7.25215 40.0868 7.12028 40.1664 7.0305 40.2883C6.94071 40.4101 6.90375 40.5597 6.92644 40.7093C6.97312 41.0173 7.26176 41.2307 7.56985 41.185L7.57184 41.1847L7.92597 41.131C7.96041 41.1257 7.99445 41.1173 8.02714 41.106C8.28488 41.0166 8.44224 40.7557 8.40131 40.4858C8.37869 40.3364 8.29932 40.2048 8.17785 40.115Z"
                fill="#171D34"
              />
              <path
                d="M15.6836 39.0056C15.5622 38.9158 15.413 38.8786 15.2637 38.9008L15.2617 38.9011L14.9076 38.9547C14.5986 39.0017 14.3854 39.2912 14.4322 39.6C14.4789 39.9079 14.7675 40.1213 15.0756 40.0756L15.0776 40.0753L15.4317 40.0216C15.4662 40.0164 15.5003 40.008 15.533 39.9966C15.7907 39.9072 15.948 39.6464 15.9071 39.3764C15.8845 39.2271 15.8051 39.0954 15.6836 39.0056Z"
                fill="#171D34"
              />
              <path
                d="M13.8068 39.2888C13.6853 39.199 13.5362 39.1618 13.3868 39.184L13.3848 39.1843L13.0307 39.238C12.8811 39.2606 12.7492 39.3403 12.6594 39.4621C12.5696 39.584 12.5327 39.7335 12.5553 39.8832C12.602 40.1912 12.8907 40.4045 13.1988 40.3588L13.2007 40.3585L13.5549 40.3048C13.5894 40.2996 13.6234 40.2912 13.6561 40.2799C13.9138 40.1904 14.0711 39.9296 14.0302 39.6596C14.0076 39.5103 13.9282 39.3786 13.8068 39.2888Z"
                fill="#171D34"
              />
              <path
                d="M11.781 40.563C12.0387 40.4735 12.1961 40.2127 12.1552 39.9427C12.1085 39.6348 11.8198 39.4214 11.5117 39.4671L11.5097 39.4674L11.1556 39.5211C10.8467 39.568 10.6335 39.8574 10.6803 40.1663C10.727 40.4743 11.0156 40.6876 11.3237 40.6419L11.3257 40.6416L11.6798 40.5879C11.7143 40.5827 11.7483 40.5743 11.781 40.563Z"
                fill="#171D34"
              />
              <path
                d="M41.8529 17.6576L42.5482 16.9623C42.6946 16.8159 42.6946 16.5785 42.5482 16.4321C42.4018 16.2857 42.1644 16.2857 42.018 16.4321L41.3227 17.1273C41.1763 17.2738 41.1763 17.5111 41.3227 17.6576C41.4691 17.804 41.7065 17.804 41.8529 17.6576Z"
                fill="#171D34"
              />
              <path
                d="M44.8002 14.7083L45.4955 14.0131C45.6419 13.8667 45.6419 13.6293 45.4955 13.4829C45.349 13.3364 45.1117 13.3364 44.9652 13.4829L44.27 14.1781C44.1236 14.3245 44.1236 14.5619 44.27 14.7083C44.4164 14.8548 44.6538 14.8548 44.8002 14.7083Z"
                fill="#171D34"
              />
              <path
                d="M44.9652 17.6576C45.1116 17.804 45.349 17.804 45.4955 17.6576C45.6419 17.5111 45.6419 17.2738 45.4955 17.1273L44.8002 16.4321C44.6538 16.2857 44.4164 16.2857 44.27 16.4321C44.1235 16.5785 44.1236 16.8159 44.27 16.9623L44.9652 17.6576Z"
                fill="#171D34"
              />
              <path
                d="M42.018 14.7083C42.1644 14.8548 42.4018 14.8548 42.5482 14.7083C42.6946 14.5619 42.6946 14.3245 42.5482 14.1781L41.8529 13.4829C41.7065 13.3364 41.4691 13.3364 41.3227 13.4829C41.1763 13.6293 41.1763 13.8667 41.3227 14.0131L42.018 14.7083Z"
                fill="#171D34"
              />
              <path
                d="M47.0862 43.4116L46.5951 43.9027C46.4917 44.0061 46.4917 44.1738 46.5951 44.2772C46.6986 44.3806 46.8662 44.3806 46.9697 44.2772L47.4608 43.7861C47.5642 43.6827 47.5642 43.515 47.4608 43.4116C47.3573 43.3081 47.1897 43.3081 47.0862 43.4116Z"
                fill="#171D34"
              />
              <path
                d="M48.6772 41.8206C48.5738 41.9241 48.5738 42.0917 48.6772 42.1952C48.7806 42.2986 48.9483 42.2986 49.0517 42.1952L49.5428 41.704C49.6462 41.6006 49.6462 41.4329 49.5428 41.3295C49.4394 41.2261 49.2717 41.2261 49.1683 41.3295L48.6772 41.8206Z"
                fill="#171D34"
              />
              <path
                d="M49.0517 43.4116C48.9483 43.3081 48.7806 43.3081 48.6772 43.4116C48.5738 43.515 48.5738 43.6827 48.6772 43.7861L49.1683 44.2772C49.2717 44.3806 49.4394 44.3806 49.5428 44.2772C49.6462 44.1738 49.6462 44.0061 49.5428 43.9027L49.0517 43.4116Z"
                fill="#171D34"
              />
              <path
                d="M46.9697 41.3295C46.8662 41.2261 46.6986 41.2261 46.5951 41.3295C46.4917 41.4329 46.4917 41.6006 46.5951 41.704L47.0862 42.1952C47.1897 42.2986 47.3573 42.2986 47.4608 42.1952C47.5642 42.0917 47.5642 41.9241 47.4608 41.8206L46.9697 41.3295Z"
                fill="#171D34"
              />
              <path
                d="M0.947589 26.4623L0.456474 26.9534C0.35305 27.0569 0.35305 27.2245 0.456474 27.328C0.559898 27.4314 0.727576 27.4314 0.83101 27.328L1.32211 26.8369C1.42554 26.7334 1.42554 26.5658 1.32211 26.4623C1.21869 26.3589 1.051 26.3589 0.947589 26.4623Z"
                fill="#171D34"
              />
              <path
                d="M3.03157 24.3783L2.54046 24.8695C2.43703 24.9729 2.43703 25.1406 2.54046 25.244C2.64388 25.3474 2.81156 25.3474 2.915 25.244L3.4061 24.7529C3.50952 24.6495 3.50952 24.4818 3.4061 24.3783C3.30268 24.2749 3.135 24.2749 3.03157 24.3783Z"
                fill="#171D34"
              />
              <path
                d="M2.915 26.4623C2.81157 26.3589 2.64389 26.3589 2.54046 26.4623C2.43703 26.5658 2.43703 26.7334 2.54046 26.8369L3.03157 27.328C3.135 27.4314 3.30268 27.4314 3.4061 27.328C3.50952 27.2245 3.50952 27.0569 3.4061 26.9534L2.915 26.4623Z"
                fill="#171D34"
              />
              <path
                d="M0.83101 24.3783C0.727587 24.2749 0.559909 24.2749 0.456474 24.3783C0.35305 24.4818 0.35305 24.6495 0.456474 24.7529L0.947589 25.244C1.05101 25.3474 1.21869 25.3474 1.32211 25.244C1.42554 25.1406 1.42554 24.9729 1.32211 24.8695L0.83101 24.3783Z"
                fill="#171D34"
              />
              <path
                d="M18.4482 8.32796L18.9393 7.83686C19.0427 7.73343 19.0427 7.56576 18.9393 7.46233C18.8359 7.35891 18.6682 7.35891 18.5648 7.46233L18.0737 7.95344C17.9702 8.05686 17.9702 8.22454 18.0737 8.32796C18.1771 8.43139 18.3448 8.43139 18.4482 8.32796Z"
                fill="#171D34"
              />
              <path
                d="M20.5302 6.24593L21.0213 5.75483C21.1248 5.6514 21.1248 5.48373 21.0213 5.3803C20.9179 5.27688 20.7502 5.27688 20.6468 5.3803L20.1557 5.87141C20.0523 5.97483 20.0523 6.14251 20.1557 6.24593C20.2591 6.34936 20.4268 6.34936 20.5302 6.24593Z"
                fill="#171D34"
              />
              <path
                d="M20.6468 8.32797C20.7502 8.4314 20.9179 8.4314 21.0213 8.32797C21.1248 8.22455 21.1248 8.05687 21.0213 7.95345L20.5302 7.46233C20.4268 7.35891 20.2591 7.35891 20.1557 7.46233C20.0523 7.56576 20.0523 7.73343 20.1557 7.83686L20.6468 8.32797Z"
                fill="#171D34"
              />
              <path
                d="M18.5648 6.24594C18.6682 6.34937 18.8359 6.34937 18.9393 6.24594C19.0427 6.14252 19.0427 5.97484 18.9393 5.87142L18.4482 5.3803C18.3448 5.27688 18.1771 5.27688 18.0737 5.3803C17.9702 5.48373 17.9702 5.6514 18.0737 5.75483L18.5648 6.24594Z"
                fill="#171D34"
              />
              <path
                d="M9.89875 43.726L9.40765 44.2171C9.30422 44.3205 9.30422 44.4882 9.40765 44.5916C9.51107 44.6951 9.67875 44.6951 9.78217 44.5916L10.2733 44.1005C10.3767 43.9971 10.3767 43.8294 10.2733 43.726C10.1699 43.6226 10.0022 43.6226 9.89875 43.726Z"
                fill="#171D34"
              />
              <path
                d="M11.9808 41.642L11.4897 42.1331C11.3863 42.2366 11.3863 42.4042 11.4897 42.5077C11.5931 42.6111 11.7608 42.6111 11.8642 42.5077L12.3553 42.0165C12.4587 41.9131 12.4587 41.7454 12.3553 41.642C12.2519 41.5386 12.0842 41.5386 11.9808 41.642Z"
                fill="#171D34"
              />
              <path
                d="M11.8642 43.726C11.7608 43.6226 11.5931 43.6226 11.4897 43.726C11.3863 43.8294 11.3863 43.9971 11.4897 44.1005L11.9808 44.5916C12.0842 44.6951 12.2519 44.6951 12.3553 44.5916C12.4587 44.4882 12.4587 44.3205 12.3553 44.2171L11.8642 43.726Z"
                fill="#171D34"
              />
              <path
                d="M9.78217 41.642C9.67875 41.5386 9.51107 41.5386 9.40765 41.642C9.30422 41.7454 9.30422 41.9131 9.40765 42.0165L9.89875 42.5077C10.0022 42.6111 10.1699 42.6111 10.2733 42.5077C10.3767 42.4042 10.3767 42.2366 10.2733 42.1331L9.78217 41.642Z"
                fill="#171D34"
              />
            </svg>{" "}
            Background
          </span>
        </div>
        <div className="pBody">
          <div className="row">
            <div className="col-md-6">
              {/* {background.party1FirstName ? background.party1FirstName : "Party 1"} */}
              {renderAllInputsParty1().map((e) => {
                return e;
              })}
            </div>
            <div className="col-md-6">
              {/* {background.party2FirstName ? background.party2FirstName : "Party 2"} */}
              {renderAllInputsParty2().map((e) => {
                return e;
              })}
            </div>
          </div>

          {showAlertFillAllDetails && AlertFillAllDetails()}

          {showMoreOptions.aboutTheChildrenInfo && (
            <ModalInputCenter
              heading="More Options"
              modalSize="modal-lg"
              show={showMoreOptions.aboutTheChildrenInfo}
              handleClick={() => {}}
              changeShow={() =>
                setShowMoreOptions({
                  ...showMoreOptions,
                  aboutTheChildrenInfo: !showMoreOptions.aboutTheChildrenInfo,
                })
              }
              cancelOption="Ok"
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Child Income</label>
                    <input
                      className="form-control"
                      onChange={(event) => {
                        setAboutTheChildrenDetails(
                          event,
                          showMoreOptions.aboutTheChildrenNumberInfo,
                          "childIncome"
                        );
                      }}
                      type="number"
                      max="17"
                      value={
                        aboutTheChildren.childrenInfo[
                          showMoreOptions.aboutTheChildrenNumberInfo
                        ].childIncome
                      }
                    />
                  </div>
                  {aboutTheChildren.childrenInfo[
                    showMoreOptions.aboutTheChildrenNumberInfo
                  ].CSGTable === "Yes" && (
                    <div className="form-group">
                      <label>
                        <span>
                          Child Support Override{" "}
                          <span className="fw-bold">(Per Month)</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        onChange={(event) =>
                          setAboutTheChildrenDetails(
                            event,
                            showMoreOptions.aboutTheChildrenNumberInfo,
                            "ChildSupportOverride"
                          )
                        }
                        className="form-control"
                        value={
                          aboutTheChildren.childrenInfo[
                            showMoreOptions.aboutTheChildrenNumberInfo
                          ].ChildSupportOverride
                        }
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label>Number of years Of Starting School</label>
                    <input
                      type="number"
                      onChange={(event) =>
                        setAboutTheChildrenDetails(
                          event,
                          showMoreOptions.aboutTheChildrenNumberInfo,
                          "numberOfYearsOfStartingSchool"
                        )
                      }
                      value={
                        aboutTheChildren.childrenInfo[
                          showMoreOptions.aboutTheChildrenNumberInfo
                        ].numberOfYearsOfStartingSchool
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Number of years Of Finishing School</label>
                    <input
                      onChange={(event) =>
                        setAboutTheChildrenDetails(
                          event,
                          showMoreOptions.aboutTheChildrenNumberInfo,
                          "numberOfYearsOfFinishingSchool"
                        )
                      }
                      type="number"
                      max="17"
                      value={
                        aboutTheChildren.childrenInfo[
                          showMoreOptions.aboutTheChildrenNumberInfo
                        ].numberOfYearsOfFinishingSchool
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <ReuseAbleCheckboxLayoutRight
                    handleOnChangeEvent={(e) => {
                      setAboutTheChildrenDetails(
                        e,
                        showMoreOptions.aboutTheChildrenNumberInfo,
                        "childOfRelationship"
                      );
                    }}
                    stateOption="childOfRelationship"
                    options={["Yes", "No"]}
                    heading="Child of relationship"
                    checked={
                      aboutTheChildren.childrenInfo[
                        showMoreOptions.aboutTheChildrenNumberInfo
                      ].childOfRelationship
                    }
                  ></ReuseAbleCheckboxLayoutRight>
                  <ReuseAbleCheckboxLayoutRight
                    options={["Yes", "No"]}
                    handleOnChangeEvent={(e) => {
                      setAboutTheChildrenDetails(
                        e,
                        showMoreOptions.aboutTheChildrenNumberInfo,
                        "childHasDisability"
                      );
                    }}
                    label="childHasDisability"
                    heading="Child is eligible to disability benefit"
                    checked={
                      aboutTheChildren.childrenInfo[
                        showMoreOptions.aboutTheChildrenNumberInfo
                      ].childHasDisability
                    }
                  ></ReuseAbleCheckboxLayoutRight>
                  <ReuseAbleCheckboxLayoutRight
                    options={["Yes", "No"]}
                    label="adultChildStillALegalDependant"
                    handleOnChangeEvent={(e) => {
                      setAboutTheChildrenDetails(
                        e,
                        showMoreOptions.aboutTheChildrenNumberInfo,
                        "adultChildStillALegalDependant"
                      );
                    }}
                    checked={
                      aboutTheChildren.childrenInfo[
                        showMoreOptions.aboutTheChildrenNumberInfo
                      ].adultChildStillALegalDependant
                    }
                    heading="Adult Child is Still a legal Dependant ?"
                  ></ReuseAbleCheckboxLayoutRight>
                  <ReuseAbleCheckboxLayoutRight
                    options={["Yes", "No"]}
                    label="CSGTable"
                    handleOnChangeEvent={(e) => {
                      setAboutTheChildrenDetails(
                        e,
                        showMoreOptions.aboutTheChildrenNumberInfo,
                        "CSGTable"
                      );
                    }}
                    checked={
                      aboutTheChildren.childrenInfo[
                        showMoreOptions.aboutTheChildrenNumberInfo
                      ].CSGTable
                    }
                    heading="Override CSG table for Adult Child"
                  ></ReuseAbleCheckboxLayoutRight>
                </div>
              </div>
            </ModalInputCenter>
          )}
          <div className="pHead">
            <span className="h5">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.97024 14.0665C7.06519 14.1725 7.1659 14.2731 7.27165 14.3679C7.28803 14.3827 7.30457 14.3972 7.3213 14.4117C8.00757 15.0066 8.90292 15.3668 9.8826 15.3668C12.0428 15.3668 13.7943 13.6153 13.7943 11.4549C13.7943 10.4912 13.4459 9.60894 12.868 8.92702C12.8443 8.89915 12.8202 8.87144 12.7958 8.84426C12.7007 8.73816 12.5998 8.63728 12.4939 8.54232C12.4667 8.51794 12.439 8.49389 12.4111 8.4702C11.7292 7.89194 10.8466 7.54297 9.8826 7.54297C7.72202 7.54297 5.9707 9.29429 5.9707 11.4549C5.9707 12.4347 6.331 13.3302 6.92651 14.0169C6.9408 14.0336 6.95544 14.0501 6.97024 14.0665Z"
                  fill="#73C3FD"
                />
                <path
                  d="M15.361 17.8253C15.3527 17.8142 15.3441 17.8032 15.3354 17.7925C15.1626 17.5723 14.9637 17.3733 14.7434 17.2005C14.7326 17.1918 14.7217 17.1832 14.7106 17.1749C14.123 16.7246 13.3882 16.457 12.5905 16.457H12.1762H10.5906H7.20724C6.98836 16.457 6.7742 16.4772 6.56658 16.5157C6.15002 16.5931 5.75947 16.7444 5.40904 16.9557C5.13775 17.1191 4.89062 17.3183 4.674 17.547C4.50488 17.7255 4.35449 17.9219 4.22591 18.1331C3.95493 18.5779 3.78069 19.088 3.73247 19.6345C3.72346 19.737 3.71875 19.8407 3.71875 19.9454V20.1717V28.0859C3.71875 28.3103 3.79747 28.5165 3.92882 28.6781C3.93445 28.6851 3.94018 28.692 3.94612 28.699C3.96301 28.7186 3.98083 28.7377 3.99936 28.7558C4.01451 28.7709 4.03007 28.7853 4.04624 28.7992C4.05321 28.8052 4.06027 28.8109 4.06723 28.8164C4.22888 28.9478 4.43485 29.0266 4.65936 29.0266C4.91918 29.0266 5.15434 28.9211 5.32438 28.7509C5.49463 28.5808 5.59987 28.3455 5.59987 28.0859V20.6532C5.59987 20.6207 5.61123 20.5888 5.63191 20.5631L6.02687 20.0763C6.0541 20.0426 6.09485 20.0232 6.13784 20.0232H6.16364C6.24257 20.0232 6.30666 20.0874 6.30666 20.1663V25.9871V35.6406V41.1008C6.30666 41.3659 6.38354 41.6136 6.51611 41.8221C6.52113 41.8301 6.52635 41.8383 6.53178 41.8462C6.63077 41.9951 6.75864 42.123 6.90739 42.222C6.91547 42.2272 6.92325 42.2324 6.93144 42.2374C6.95878 42.2548 6.98683 42.2713 7.01549 42.2867C7.20519 42.389 7.42243 42.447 7.65297 42.447C7.79323 42.447 7.92846 42.4256 8.05561 42.3858C8.26548 42.3201 8.45323 42.2046 8.60495 42.0527C8.8487 41.8092 8.99919 41.4724 8.99919 41.1008V31.9588C8.99919 31.4723 9.39343 31.0783 9.87971 31.0783C10.1138 31.0783 10.327 31.1699 10.4846 31.319C10.4906 31.3246 10.4965 31.3303 10.5022 31.3361C10.6614 31.4953 10.7601 31.7155 10.7601 31.9588V41.1008C10.7601 41.8442 11.3629 42.447 12.1065 42.447C12.2557 42.447 12.3993 42.4227 12.5334 42.378C12.7335 42.3111 12.9126 42.1986 13.0585 42.0527C13.3023 41.8092 13.4528 41.4724 13.4528 41.1008V20.1663C13.4528 20.0874 13.5168 20.0232 13.5958 20.0232C13.6174 20.0232 13.6385 20.0281 13.6575 20.0372C13.6764 20.0463 13.6933 20.0595 13.7072 20.0763L14.1659 20.6421C14.1866 20.6676 14.1977 20.6993 14.1977 20.7322V28.0717C14.1977 28.3671 14.332 28.6344 14.5436 28.8106C14.7021 28.9426 14.9043 29.0235 15.1259 29.0264C15.1299 29.0265 15.1341 29.0265 15.1383 29.0265C15.6578 29.0265 16.0789 28.6053 16.0789 28.0859V25.4678V19.9454C16.0789 19.5399 16.0097 19.1507 15.8825 18.7887C15.7595 18.4386 15.5823 18.1142 15.361 17.8253Z"
                  fill="#73C3FD"
                />
                <path
                  d="M45.6173 17.943C45.5893 17.9031 45.5605 17.8639 45.5309 17.8253C45.5226 17.8142 45.514 17.8032 45.5053 17.7925C45.3325 17.5723 45.1336 17.3733 44.9133 17.2005C44.9026 17.1918 44.8916 17.1832 44.8806 17.1749C44.2929 16.7246 43.5581 16.457 42.7604 16.457H37.3772C36.3795 16.457 35.4799 16.8757 34.8439 17.547C34.3186 18.1018 33.9735 18.8287 33.9024 19.6345C33.8934 19.737 33.8887 19.8407 33.8887 19.9454V28.0859C33.8887 28.3103 33.9674 28.5165 34.0987 28.6781C34.1044 28.6851 34.1101 28.692 34.116 28.699C34.131 28.7164 34.1467 28.7333 34.1629 28.7496C34.1799 28.7668 34.1977 28.7833 34.2162 28.7992C34.2231 28.8052 34.2302 28.8109 34.2372 28.8164C34.3988 28.9478 34.6048 29.0266 34.8293 29.0266C34.9212 29.0266 35.0102 29.0134 35.0941 28.9887C35.0942 28.9887 35.0942 28.9887 35.0943 28.9887C35.2476 28.9438 35.3845 28.8608 35.4943 28.7509C35.6646 28.5808 35.7698 28.3455 35.7698 28.0859V20.6532C35.7698 20.6207 35.7811 20.5888 35.8018 20.5631L36.0381 20.2719V20.2718L36.1968 20.0763C36.224 20.0426 36.2648 20.0232 36.3078 20.0232H36.3336C36.4125 20.0232 36.4766 20.0874 36.4766 20.1663V41.1008C36.4766 41.3659 36.5535 41.6136 36.686 41.8221C36.6911 41.8301 36.6963 41.8383 36.7017 41.8462C36.8007 41.9951 36.9286 42.123 37.0773 42.222C37.0854 42.2272 37.0932 42.2324 37.1014 42.2374C37.3098 42.3702 37.5575 42.447 37.8229 42.447C38.1946 42.447 38.5312 42.2965 38.7749 42.0527C38.8092 42.0185 38.8415 41.9825 38.8717 41.9447C39.0579 41.7139 39.1691 41.4202 39.1691 41.1008V31.9588C39.1691 31.5234 39.4848 31.1621 39.8998 31.091C39.9484 31.0827 39.9985 31.0783 40.0496 31.0783C40.2838 31.0783 40.4969 31.1699 40.6546 31.319C40.6605 31.3246 40.6664 31.3303 40.6722 31.3361C40.8314 31.4953 40.93 31.7155 40.93 31.9588V41.1008C40.93 41.2273 40.9474 41.3496 40.9802 41.4657C41.1392 42.0319 41.6594 42.447 42.2765 42.447C42.6481 42.447 42.9848 42.2965 43.2284 42.0527C43.3755 41.9058 43.4886 41.7249 43.5551 41.523C43.5989 41.3902 43.6227 41.2482 43.6227 41.1008V40.4962V20.1663C43.6227 20.0874 43.6868 20.0232 43.7657 20.0232C43.7873 20.0232 43.8084 20.0281 43.8274 20.0372C43.8464 20.0463 43.8633 20.0595 43.8771 20.0763L43.9646 20.1842V20.1843L44.3358 20.6421C44.3565 20.6676 44.3677 20.6993 44.3677 20.7322V28.0717C44.3677 28.552 44.7225 28.9579 45.1872 29.0185C45.2228 29.0233 45.259 29.0259 45.2958 29.0264C45.2999 29.0265 45.3041 29.0265 45.3083 29.0265C45.8277 29.0265 46.2488 28.6053 46.2488 28.0859V19.9454C46.2488 19.2001 46.0152 18.5097 45.6173 17.943Z"
                  fill="#73C3FD"
                />
                <path
                  d="M26.9054 21.6576C26.7815 21.5336 26.6295 21.4548 26.4699 21.4212C26.4104 21.4086 26.3499 21.4023 26.2894 21.4023C26.0666 21.4023 25.8436 21.4874 25.6734 21.6576C25.3333 21.9977 25.3333 22.5492 25.6734 22.8895L26.9077 24.1237H20.3691C19.8881 24.1237 19.498 24.5137 19.498 24.9948C19.498 25.0962 19.5153 25.1934 19.5472 25.2838C19.6663 25.6229 19.9894 25.8659 20.3691 25.8659H26.9077L26.4563 26.3173L25.6734 27.1002C25.3333 27.4405 25.3333 27.9919 25.6734 28.3321C25.8436 28.5023 26.0666 28.5873 26.2894 28.5873C26.4852 28.5873 26.6809 28.5218 26.8408 28.3906C26.863 28.3725 26.8846 28.3529 26.9054 28.3321L27.7539 27.4837L30.2428 24.9948L29.9772 24.7294L26.9054 21.6576Z"
                  fill="#73C3FD"
                />
                <path
                  d="M26.6238 33.2287C26.5171 33.1842 26.4033 33.1621 26.2894 33.1621C26.0666 33.1621 25.8436 33.2471 25.6734 33.4172C25.3333 33.7574 25.3333 34.309 25.6734 34.6492L26.9077 35.8834H25.5633H20.3691C20.329 35.8834 20.2894 35.8862 20.2507 35.8914C19.8256 35.9492 19.498 36.3136 19.498 36.7545C19.498 36.9973 19.5974 37.2169 19.7576 37.3749C19.9148 37.53 20.1308 37.6257 20.3691 37.6257H20.8948H26.9077L25.9046 38.6288L25.6734 38.8599C25.3333 39.2001 25.3333 39.7517 25.6734 40.0919C25.8382 40.2565 26.0523 40.3415 26.268 40.3468C26.2752 40.3469 26.2823 40.347 26.2894 40.347C26.5124 40.347 26.7354 40.2619 26.9054 40.0919L30.2428 36.7545L26.9054 33.4172C26.8221 33.3339 26.7263 33.271 26.6238 33.2287Z"
                  fill="#73C3FD"
                />
                <path
                  d="M37.0964 14.0168C37.1107 14.0336 37.1254 14.0501 37.1402 14.0664C37.2351 14.1724 37.3358 14.2731 37.4416 14.3679C37.458 14.3827 37.4745 14.3971 37.4912 14.4116C37.7533 14.6389 38.0459 14.8318 38.362 14.9835C38.8737 15.2291 39.447 15.3667 40.0525 15.3667C40.9182 15.3667 41.7182 15.0855 42.3661 14.6093C42.7041 14.361 43.0009 14.0596 43.2438 13.7173C43.6976 13.0786 43.9642 12.2978 43.9642 11.4548C43.9642 10.7482 43.7769 10.0853 43.4491 9.51315C43.3298 9.30503 43.192 9.10888 43.0379 8.92696C43.0142 8.89911 42.9901 8.87137 42.9658 8.84424C42.8706 8.73808 42.7697 8.63724 42.6638 8.54224C42.6367 8.51787 42.6089 8.49382 42.5811 8.47017C42.3871 8.30565 42.1767 8.15957 41.9529 8.03498C41.3901 7.72151 40.7421 7.54297 40.0525 7.54297C37.8919 7.54297 36.1406 9.29428 36.1406 11.4548C36.1406 12.1435 36.3187 12.7906 36.6311 13.3528C36.7633 13.5904 36.9195 13.8128 37.0964 14.0168Z"
                  fill="#73C3FD"
                />
                <path
                  d="M29.967 12.9632L26.9054 9.9016C26.7354 9.73156 26.5124 9.64648 26.2894 9.64648C26.0666 9.64648 25.8436 9.73156 25.6734 9.9016C25.6383 9.93671 25.6068 9.97408 25.5789 10.0133C25.3368 10.3534 25.3684 10.8285 25.6734 11.1336L26.9077 12.3678H20.3691C20.0189 12.3678 19.7169 12.5746 19.5786 12.8727C19.5269 12.984 19.498 13.1082 19.498 13.239C19.498 13.72 19.8881 14.1101 20.3691 14.1101H26.9078L25.6734 15.3443C25.3333 15.6845 25.3333 16.2361 25.6734 16.5763C25.6952 16.5981 25.718 16.6185 25.7414 16.6375C25.9008 16.7668 26.0951 16.8314 26.2894 16.8314C26.5124 16.8314 26.7354 16.7464 26.9054 16.5763L28.3879 15.0939L30.2428 13.239L29.967 12.9633C29.967 12.9633 29.967 12.9633 29.967 12.9632Z"
                  fill="#73C3FD"
                />
                <path
                  d="M5.74267 22.051L5.71708 22.0536C5.67429 22.0582 5.63579 22.0818 5.61235 22.1181L5.59996 22.1373L5.27124 22.6442C5.25333 22.6719 5.24544 22.7047 5.24892 22.7372L5.59996 26.0289L6.0371 30.128C6.06464 30.3861 5.98499 30.6311 5.83379 30.8184C5.68278 31.0057 5.46002 31.1354 5.20173 31.163C4.97845 31.1868 4.76531 31.1303 4.59056 31.0169C4.58308 31.0121 4.57551 31.0071 4.56793 31.0019C4.52903 30.9751 4.49218 30.9452 4.45778 30.913C4.45113 30.9066 4.44468 30.9004 4.43833 30.894C4.2906 30.7471 4.19048 30.5506 4.16663 30.3274L3.99945 28.7594L3.71885 26.1289L3.30331 22.2328C3.29225 22.1287 3.28591 22.0251 3.28406 21.9223C3.2726 21.2941 3.43056 20.6958 3.71885 20.1753V19.949C3.71885 19.8443 3.72355 19.7406 3.73256 19.6381C3.78078 19.0917 3.95502 18.5815 4.22601 18.1367C3.8292 18.4077 3.48001 18.7392 3.18517 19.1253C2.88225 19.5222 2.64883 19.9627 2.49118 20.4344C2.32871 20.9205 2.25111 21.4273 2.26053 21.9409C2.26289 22.0743 2.27128 22.2091 2.28541 22.3413L3.14873 30.436C3.17299 30.6636 3.23585 30.8829 3.33576 31.0878C3.43148 31.2843 3.55863 31.4623 3.71362 31.617C3.72622 31.6296 3.73922 31.6424 3.75232 31.6549C3.75427 31.6567 3.75621 31.6586 3.75826 31.6604C3.83013 31.7278 3.90711 31.7897 3.98686 31.8448C3.9884 31.8458 3.98993 31.8469 3.99157 31.848C4.00611 31.8579 4.02095 31.8677 4.03579 31.8772C4.21997 31.9964 4.42103 32.0833 4.63356 32.1355C4.85499 32.19 5.08267 32.2052 5.31035 32.181C5.52298 32.1582 5.72732 32.1022 5.91958 32.0141L6.30675 35.6442V25.9907L5.90012 22.178C5.89173 22.0995 5.82119 22.0426 5.74267 22.051Z"
                  fill="#171D34"
                />
                <path
                  d="M16.6117 20.8101C16.5583 20.3088 16.4234 19.8249 16.2108 19.3718C16.1158 19.1692 16.0062 18.9746 15.8826 18.7891C16.0099 19.1511 16.079 19.5403 16.079 19.9458V25.4681L16.4571 29.0133C16.5122 29.5298 16.1381 29.9933 15.6216 30.0483C15.6175 30.0487 15.6133 30.0493 15.6092 30.0496C15.0947 30.0977 14.6399 29.7129 14.585 29.1988L14.5437 28.8109L14.1979 25.5685L13.8067 21.9006C13.8032 21.8679 13.7888 21.8374 13.7654 21.8144L13.4529 21.5032L13.2493 21.3004C13.2338 21.2851 13.2156 21.2738 13.1958 21.2668C13.176 21.2599 13.1545 21.2572 13.133 21.2595C13.0546 21.2678 12.9975 21.3385 13.0059 21.4169L13.4529 25.6079L15.226 42.2334C15.2654 42.6028 15.1515 42.9537 14.935 43.2217C14.7185 43.4899 14.3996 43.6753 14.0302 43.7147C13.2907 43.7937 12.6273 43.2581 12.5485 42.5189L12.5336 42.3783L11.579 33.4284C11.5532 33.1866 11.4318 32.9781 11.2566 32.8366C11.2503 32.8315 11.2438 32.8265 11.2373 32.8215C11.1023 32.7186 10.9373 32.6543 10.7603 32.643C10.7111 32.6398 10.661 32.6409 10.6103 32.6463C10.1268 32.6978 9.77644 33.1315 9.82804 33.6152L10.7976 42.7056C10.8369 43.0752 10.723 43.426 10.5065 43.694C10.2902 43.9623 9.97136 44.1477 9.60169 44.1871C9.33787 44.2152 9.08337 44.1651 8.86204 44.0551C8.85334 44.051 8.84504 44.0466 8.83655 44.0423C8.67807 43.9597 8.53731 43.8461 8.42316 43.7086C8.41692 43.7012 8.41088 43.6936 8.40504 43.6862C8.25107 43.4929 8.14839 43.2549 8.12024 42.9911L8.05574 42.3861C7.92859 42.4259 7.79336 42.4473 7.65311 42.4473C7.42256 42.4473 7.20532 42.3894 7.01562 42.287L7.10234 43.0998C7.15004 43.5472 7.32285 43.9695 7.60202 44.3212C7.61113 44.3328 7.62352 44.3483 7.63826 44.3659C7.83994 44.6078 8.08379 44.8044 8.36317 44.95C8.36583 44.9514 8.3686 44.9528 8.37136 44.9543L8.37494 44.9561C8.38313 44.9603 8.39603 44.9669 8.41159 44.9744C8.81372 45.173 9.26263 45.2528 9.71021 45.205C10.028 45.1711 10.33 45.0758 10.608 44.9217C10.8761 44.7731 11.1099 44.5764 11.3028 44.3374C11.3995 44.2178 11.4834 44.0904 11.5545 43.9562C11.6255 43.8221 11.6835 43.681 11.7279 43.5342C11.7394 43.4965 11.7498 43.4586 11.7593 43.4204C11.7766 43.4557 11.7949 43.4907 11.8141 43.5253C11.9628 43.7934 12.1595 44.0272 12.3986 44.2202C12.6378 44.4132 12.9079 44.5561 13.2013 44.645C13.5056 44.737 13.821 44.7666 14.1387 44.7327C14.4564 44.6988 14.7584 44.6035 15.0363 44.4494C15.3045 44.3007 15.5383 44.1042 15.7313 43.865C15.7313 43.865 15.7314 43.8649 15.7315 43.8648C15.7316 43.8647 15.7316 43.8646 15.7317 43.8645C15.9247 43.6255 16.0676 43.3554 16.1564 43.062C16.2484 42.7577 16.2779 42.4424 16.244 42.1248L15.0599 31.0216C15.2702 31.0733 15.4864 31.0893 15.7044 31.0689C15.7046 31.0689 15.7049 31.0689 15.7051 31.0688C15.7135 31.0681 15.7219 31.0672 15.7302 31.0663C15.9934 31.0383 16.2438 30.9592 16.4744 30.8313C16.6965 30.708 16.8903 30.5451 17.0503 30.347C17.2102 30.1488 17.3287 29.925 17.4023 29.6818C17.4786 29.4295 17.5031 29.168 17.4751 28.9048L16.6117 20.8101Z"
                  fill="#171D34"
                />
                <path
                  d="M6.24846 16.3107C6.13329 16.2277 6.02242 16.1383 5.91677 16.043C5.90029 16.0283 5.88401 16.0134 5.86804 15.9983C5.20312 15.3787 4.74981 14.5264 4.6459 13.5521C4.49009 12.0908 5.16003 10.7319 6.28051 9.9401C6.80732 9.56766 7.43385 9.32074 8.12088 9.24744C9.07951 9.14517 9.99412 9.39854 10.7336 9.9013C10.7638 9.92188 10.7939 9.94286 10.8234 9.96416C10.9389 10.0474 11.0499 10.137 11.1558 10.2324C11.1829 10.2568 11.2097 10.2818 11.2362 10.307C11.8832 10.9238 12.3232 11.7642 12.4254 12.7224C12.4982 13.4049 12.3908 14.0653 12.1414 14.6558C11.8269 15.4007 11.2866 16.0347 10.5973 16.4627H12.1829C12.2493 16.3899 12.3137 16.3147 12.376 16.2374C12.7784 15.739 13.0762 15.1765 13.2611 14.5657C13.4126 14.0653 13.4826 13.5501 13.4704 13.0291V13.029C13.4671 12.8909 13.4582 12.7525 13.4434 12.6138C13.3804 12.0231 13.2146 11.456 12.9506 10.9285C12.6957 10.4191 12.3565 9.96068 11.9426 9.56613C11.9423 9.56572 11.9419 9.56541 11.9415 9.565C11.9059 9.53122 11.873 9.50071 11.8408 9.47174C11.7084 9.35227 11.5675 9.23853 11.4225 9.13411C11.3875 9.10872 11.3508 9.08303 11.3101 9.05528C11.3098 9.05508 11.3094 9.05487 11.3091 9.05467C10.836 8.73301 10.3163 8.49796 9.76439 8.35607C9.19284 8.20896 8.60337 8.16637 8.01236 8.22943C7.86945 8.24469 7.72807 8.26588 7.58843 8.29301H7.58833C7.08097 8.39139 6.59633 8.56768 6.14281 8.81931C5.58467 9.12889 5.09768 9.53859 4.69525 10.0369C4.29292 10.5354 3.99511 11.0978 3.81023 11.7088C3.61869 12.3419 3.55736 12.9985 3.628 13.6607C3.69199 14.2614 3.86223 14.837 4.13383 15.3718C4.3955 15.887 4.74316 16.3488 5.16729 16.7446C5.18808 16.7642 5.20957 16.784 5.23302 16.8049C5.2925 16.8584 5.35351 16.9107 5.41576 16.9614C5.76618 16.7501 6.15674 16.5988 6.5733 16.5214C6.48065 16.4677 6.39025 16.4101 6.30252 16.349C6.28429 16.3364 6.26638 16.3237 6.24846 16.3107Z"
                  fill="#171D34"
                />
                <path
                  d="M42.6692 8.54501C42.7752 8.64001 42.876 8.74085 42.9712 8.84701C42.9956 8.87414 43.0196 8.90188 43.0433 8.92973C43.1975 9.11165 43.3353 9.3078 43.4545 9.51592C43.4516 9.48152 43.4483 9.44702 43.4446 9.41263C43.3816 8.82183 43.2158 8.25488 42.9518 7.72735C42.6969 7.21784 42.3577 6.75951 41.9438 6.36486C41.9435 6.36455 41.9431 6.36414 41.9427 6.36373C41.9071 6.33005 41.8744 6.29964 41.8423 6.27088C41.7759 6.21099 41.7075 6.15264 41.6376 6.09613C41.5677 6.03972 41.4962 5.98505 41.4237 5.93284C41.3886 5.90755 41.3518 5.88175 41.3112 5.85411C41.3109 5.85391 41.3106 5.8537 41.3103 5.8534C40.8372 5.53184 40.3175 5.29679 39.7656 5.1548C39.194 5.00779 38.6046 4.9652 38.0136 5.02826C37.3514 5.0989 36.7224 5.2973 36.144 5.61814C35.5859 5.92772 35.0988 6.33732 34.6964 6.83578C34.2941 7.33423 33.9963 7.89668 33.8114 8.50764C33.6199 9.14062 33.5586 9.79735 33.6292 10.4595C33.6932 11.0601 33.8634 11.6359 34.135 12.1706C34.3966 12.6856 34.7443 13.1474 35.1682 13.5431C35.189 13.5628 35.2106 13.5825 35.2341 13.6036C35.3658 13.7223 35.5052 13.8348 35.6487 13.9384C35.6757 13.9579 35.7009 13.9755 35.72 13.9888C35.8324 14.0671 35.9478 14.1401 36.0654 14.2084C35.5255 14.2943 35.0126 14.475 34.5379 14.747C34.0135 15.0475 33.561 15.4443 33.193 15.9263C32.8901 16.3232 32.6566 16.7635 32.499 17.2353C32.3365 17.7214 32.2589 18.2282 32.2683 18.7418C32.2707 18.8754 32.2791 19.0102 32.2932 19.1422L33.1564 27.2368C33.1808 27.4645 33.2437 27.6838 33.3436 27.8886C33.4393 28.0852 33.5664 28.2632 33.7214 28.4179C33.734 28.4306 33.747 28.4433 33.7601 28.4558C33.7621 28.4576 33.764 28.4595 33.766 28.4612C33.8379 28.5286 33.9148 28.5906 33.9947 28.6457C33.9963 28.6468 33.9981 28.6479 33.9997 28.6491C34.0141 28.6589 34.0289 28.6686 34.0433 28.6779C34.0851 28.705 34.1277 28.7304 34.1711 28.7539C34.3193 28.8349 34.4769 28.8961 34.6414 28.9364C34.7926 28.9736 34.9471 28.9925 35.1023 28.993C35.1024 28.993 35.1024 28.993 35.1025 28.993C35.1742 28.9933 35.2462 28.9896 35.3182 28.9819C35.5308 28.9592 35.7351 28.9032 35.9274 28.815L36.4847 34.0403L37.1101 39.9038C37.1578 40.3514 37.3305 40.7737 37.6098 41.1254C37.619 41.137 37.6313 41.1525 37.646 41.17C37.8477 41.4119 38.0916 41.6085 38.3709 41.7542C38.3737 41.7557 38.3766 41.7571 38.3793 41.7585L38.383 41.7604C38.3911 41.7646 38.404 41.7711 38.4196 41.7787C38.5675 41.8517 38.7217 41.9087 38.8798 41.9491C39.1516 42.0186 39.4351 42.0394 39.718 42.0092C40.0357 41.9753 40.3378 41.88 40.6158 41.7258C40.7487 41.6521 40.8731 41.5666 40.9883 41.4701C40.9556 41.354 40.9382 41.2316 40.9382 41.1051V31.9631C40.9382 31.7199 40.8395 31.4997 40.6803 31.3405C40.6746 31.3346 40.6686 31.3289 40.6627 31.3234C40.505 31.1742 40.2919 31.0826 40.0578 31.0826C40.0067 31.0826 39.9565 31.087 39.9079 31.0953L40.8053 39.5098C40.8447 39.8793 40.7308 40.2301 40.5142 40.4982C40.2979 40.7663 39.9791 40.9517 39.6095 40.9912C39.461 41.007 39.3156 40.9981 39.1772 40.9676C39.0698 40.944 38.9667 40.9074 38.8698 40.8593C38.8611 40.8551 38.8528 40.8508 38.8443 40.8464C38.6859 40.7638 38.5451 40.6503 38.4309 40.5128C38.4247 40.5054 38.4187 40.4978 38.4128 40.4903C38.2589 40.2971 38.1562 40.059 38.128 39.7953L36.4847 24.3869L36.0462 20.2762V20.2761L35.9079 18.9788C35.8995 18.9004 35.829 18.8435 35.7505 18.8518L35.7249 18.8546C35.6821 18.8592 35.6436 18.8827 35.6202 18.919L35.2791 19.4451C35.2611 19.4728 35.2533 19.5057 35.2567 19.5381L35.7779 24.4252L36.0449 26.9288C36.0724 27.187 35.9928 27.432 35.8416 27.6193C35.8216 27.6441 35.8003 27.6678 35.7779 27.6905C35.631 27.8391 35.4336 27.94 35.2095 27.9639C34.9863 27.9877 34.7731 27.9312 34.5984 27.8178C34.5909 27.813 34.5833 27.808 34.5757 27.8029C34.5368 27.7759 34.5 27.746 34.4656 27.7138C34.4589 27.7075 34.4525 27.7012 34.4461 27.6948C34.2984 27.548 34.1983 27.3515 34.1744 27.1283L33.8968 24.5251L33.3111 19.0337C33.3001 18.9296 33.2937 18.826 33.2919 18.7231C33.2771 17.9144 33.5432 17.1549 34.0066 16.5475C34.5679 15.8125 35.4181 15.3009 36.4101 15.195L38.3675 14.9863C38.0513 14.8345 37.7588 14.6417 37.4967 14.4144C37.4799 14.3999 37.4634 14.3854 37.447 14.3707C37.3413 14.2759 37.2405 14.1752 37.1456 14.0692C37.1308 14.0528 37.1162 14.0363 37.1018 14.0196C36.9249 13.8155 36.7687 13.5932 36.6365 13.3556C36.5221 13.2918 36.411 13.2224 36.3037 13.1477C36.2855 13.1351 36.2675 13.1226 36.2497 13.1095C36.1345 13.0265 36.0236 12.937 35.918 12.8418C35.9015 12.8271 35.8852 12.8122 35.8692 12.7971C35.2043 12.1774 34.751 11.3252 34.6471 10.3509C34.418 8.20247 35.9737 6.27538 38.1221 6.04617C39.0807 5.944 39.9953 6.19737 40.7348 6.70003C40.765 6.72071 40.7951 6.74159 40.8246 6.76299C40.94 6.84622 41.0511 6.9358 41.1569 7.03121C41.1841 7.05568 41.2109 7.08065 41.2374 7.10584C41.5213 7.37641 41.7653 7.69008 41.9583 8.03775C42.1821 8.16234 42.3925 8.30842 42.5865 8.47294C42.6143 8.49659 42.6421 8.52064 42.6692 8.54501Z"
                  fill="#171D34"
                />
                <path
                  d="M45.1968 29.0215L45.0692 27.8244C45.2795 27.8761 45.4958 27.892 45.7137 27.8717C45.7139 27.8716 45.7142 27.8716 45.7144 27.8716C45.7227 27.8708 45.7312 27.87 45.7395 27.8691C45.9192 27.8499 46.0929 27.807 46.2584 27.7409C46.3353 27.7103 46.4106 27.6747 46.4837 27.6341C46.7058 27.5109 46.8996 27.3479 47.0596 27.1497C47.2195 26.9516 47.338 26.7278 47.4116 26.4846C47.4879 26.2322 47.5124 25.9708 47.4844 25.7075L46.621 17.6129C46.5676 17.1116 46.4327 16.6277 46.2202 16.1745C46.015 15.7372 45.7417 15.3371 45.4079 14.9856C45.393 14.9699 45.3788 14.9552 45.3648 14.9411C45.1152 14.6854 44.8353 14.4593 44.5326 14.2693C44.5161 14.2588 44.499 14.2481 44.4804 14.2369C44.097 14.0032 43.6838 13.8291 43.2508 13.7188C43.0079 14.061 42.7111 14.3624 42.373 14.6107C42.9429 14.649 43.4807 14.8262 43.9488 15.1116C43.9606 15.1188 43.9724 15.1262 43.9841 15.1337C44.2214 15.2822 44.4403 15.4589 44.6355 15.6596C44.6453 15.6694 44.6551 15.6794 44.6645 15.6894C45.1745 16.2261 45.5185 16.9284 45.603 17.7216L45.627 17.946L46.2584 23.8667L46.4664 25.8162C46.4942 26.0769 46.4126 26.3241 46.2584 26.5122C46.1074 26.6965 45.8866 26.8238 45.6309 26.8512C45.6268 26.8516 45.6226 26.852 45.6185 26.8524C45.104 26.9004 44.6492 26.5157 44.5944 26.0017L44.3773 23.9666L43.9743 20.1872V20.1871L43.816 18.7033C43.8125 18.6707 43.7981 18.6403 43.7747 18.6172L43.2586 18.1031C43.2431 18.088 43.2249 18.0766 43.205 18.0696C43.1853 18.0626 43.1638 18.06 43.1423 18.0623C43.0638 18.0707 43.0068 18.1412 43.0152 18.2197L43.6323 24.006L45.2353 39.0361C45.2747 39.4057 45.1608 39.7565 44.9443 40.0245C44.7278 40.2927 44.409 40.4781 44.0395 40.5175C43.8999 40.5324 43.7631 40.5254 43.6323 40.4992V41.1037C43.6323 41.2512 43.6086 41.3932 43.5648 41.5259C43.7569 41.5532 43.9521 41.5564 44.148 41.5356C44.4657 41.5017 44.7677 41.4062 45.0456 41.2522C45.3138 41.1035 45.5477 40.9069 45.7406 40.6678C45.7406 40.6677 45.7407 40.6676 45.7408 40.6676C45.7408 40.6675 45.7409 40.6674 45.741 40.6673C45.934 40.4283 46.0769 40.1582 46.1657 39.8648C46.2577 39.5605 46.2872 39.2451 46.2533 38.9276L45.1968 29.0215Z"
                  fill="#171D34"
                />
                <path
                  d="M19.3577 15.6794L23.5488 15.2324C23.5348 15.2714 23.5221 15.311 23.5105 15.3512C23.443 15.5867 23.4221 15.8301 23.4481 16.0743C23.4742 16.3186 23.546 16.552 23.6617 16.7681C23.7817 16.9924 23.9433 17.1875 24.142 17.3478C24.3408 17.5082 24.5655 17.6251 24.8099 17.6951C25.0456 17.7626 25.2889 17.7837 25.5332 17.7576C25.7775 17.7316 26.0109 17.6597 26.227 17.5439C26.4512 17.4239 26.6462 17.2623 26.8066 17.0637L28.3964 15.0944L26.9139 16.5768C26.7439 16.7469 26.5209 16.8319 26.2979 16.8319C26.1036 16.8319 25.9093 16.7673 25.7499 16.638C25.6485 16.6935 25.5377 16.7276 25.4246 16.7396C25.2029 16.7632 24.9723 16.7023 24.7851 16.5512C24.4107 16.249 24.3522 15.7006 24.6544 15.3262L25.6357 14.1106L25.7507 13.968L24.4137 14.1106L19.2492 14.6615C18.7708 14.7125 18.3415 14.366 18.2906 13.8876C18.2395 13.4093 18.586 12.98 19.0644 12.929L19.5871 12.8732L24.322 12.3683L25.5661 12.2356L24.2079 11.1392C23.8335 10.837 23.775 10.2886 24.0772 9.91421C24.2283 9.72707 24.441 9.61886 24.6626 9.59521C24.8844 9.57157 25.115 9.63248 25.3022 9.78358L25.5875 10.0138C25.6153 9.97461 25.6468 9.93725 25.682 9.90213C25.8521 9.73209 26.0751 9.64702 26.2979 9.64702C26.5209 9.64702 26.7439 9.73209 26.9139 9.90213L29.9755 12.9637C29.9982 12.8583 30.0043 12.7489 29.9926 12.6396C29.9638 12.3696 29.829 12.1221 29.6177 11.9516L25.9453 8.98701C25.7466 8.82659 25.5218 8.70978 25.2774 8.63966C25.0417 8.57219 24.7984 8.55121 24.5541 8.57721C24.3098 8.60321 24.0764 8.67508 23.8603 8.79076C23.6361 8.91085 23.4411 9.07249 23.2807 9.2712C23.1203 9.46991 23.0033 9.69462 22.9333 9.93909C22.8659 10.1748 22.8448 10.4181 22.8709 10.6624C22.8969 10.9066 22.9687 11.14 23.0844 11.3561C23.1042 11.3929 23.125 11.4289 23.1469 11.464L18.9558 11.911C18.7019 11.9381 18.4604 12.0144 18.2379 12.1378C18.0236 12.2567 17.8366 12.4139 17.6824 12.605C17.5281 12.7961 17.4138 13.012 17.3428 13.2467C17.2691 13.4901 17.2455 13.7423 17.2726 13.9962C17.2997 14.2502 17.376 14.4916 17.4993 14.7141C17.6182 14.9285 17.7754 15.1153 17.9666 15.2697C18.1577 15.424 18.3736 15.5382 18.6081 15.6092C18.8516 15.6829 19.1038 15.7065 19.3577 15.6794Z"
                  fill="#171D34"
                />
                <path
                  d="M20.598 27.3728L24.789 26.9258C24.775 26.9648 24.7622 27.0044 24.7508 27.0445C24.6832 27.2801 24.6622 27.5235 24.6883 27.7678C24.7143 28.012 24.7862 28.2454 24.9019 28.4615C25.022 28.6857 25.1835 28.8808 25.3822 29.0412C25.5809 29.2016 25.8057 29.3184 26.0502 29.3884C26.2859 29.456 26.5292 29.477 26.7734 29.451C27.0176 29.4249 27.2511 29.353 27.4672 29.2373C27.6915 29.1173 27.8865 28.9557 28.0469 28.757L31.0114 25.0845C31.182 24.8733 31.2616 24.603 31.2329 24.3329C31.2041 24.0629 31.0692 23.8155 30.8579 23.645L27.1855 20.6803C26.9868 20.52 26.7621 20.4031 26.5175 20.3331C26.2819 20.2656 26.0385 20.2445 25.7943 20.2706C25.5501 20.2966 25.3167 20.3685 25.1006 20.4842C24.8763 20.6042 24.6813 20.7658 24.5208 20.9645C24.3604 21.1632 24.2436 21.388 24.1736 21.6325C24.106 21.8682 24.085 22.1115 24.111 22.3558C24.1371 22.5999 24.209 22.8334 24.3247 23.0495C24.3444 23.0863 24.3651 23.1222 24.387 23.1575L20.1961 23.6044C19.9421 23.6315 19.7006 23.7078 19.4781 23.8312C19.2639 23.95 19.0769 24.1073 18.9225 24.2984C18.7683 24.4895 18.654 24.7053 18.5831 24.94C18.5094 25.1834 18.4857 25.4357 18.5128 25.6896C18.5399 25.9435 18.6161 26.1851 18.7396 26.4074C18.8585 26.6218 19.0156 26.8087 19.2067 26.963C19.3979 27.1173 19.6138 27.2315 19.8484 27.3026C20.0919 27.3763 20.344 27.3999 20.598 27.3728ZM19.5307 25.581C19.52 25.4802 19.527 25.3815 19.549 25.2882C19.6317 24.9384 19.927 24.6627 20.3046 24.6224L24.9395 24.1281L26.7195 23.9382L26.8062 23.9289L26.3087 23.5273L25.448 22.8326C25.0738 22.5304 25.0152 21.982 25.3174 21.6076C25.4685 21.4204 25.6813 21.3122 25.9029 21.2885C26.0974 21.2677 26.2989 21.3122 26.4717 21.4255C26.4958 21.4413 26.5195 21.4585 26.5424 21.477L27.4757 22.2304L30.2149 24.4415L29.979 24.7337L30.2446 24.9992L27.7557 27.488L27.2503 28.114C27.1403 28.2502 26.9977 28.3446 26.8426 28.3949C26.7847 28.4138 26.7252 28.4265 26.6649 28.433C26.4432 28.4566 26.2125 28.3957 26.0253 28.2446C25.651 27.9424 25.5924 27.394 25.8946 27.0196L26.4581 26.3216L26.8224 25.8703L26.991 25.6614L25.0327 25.8703L20.4894 26.3548C20.011 26.4059 19.5818 26.0594 19.5307 25.581Z"
                  fill="#171D34"
                />
                <path
                  d="M32.1112 35.3364L28.4387 32.3717C28.24 32.2113 28.0153 32.0945 27.7707 32.0245C27.5352 31.9569 27.2918 31.9359 27.0476 31.962C26.8033 31.988 26.5699 32.0599 26.3538 32.1756C26.1296 32.2956 25.9346 32.4572 25.7741 32.6559C25.6137 32.8546 25.4969 33.0793 25.4268 33.3239C25.3593 33.5596 25.3383 33.8028 25.3643 34.0471C25.3903 34.2913 25.4622 34.5248 25.5779 34.7409C25.5977 34.7776 25.6184 34.8137 25.6403 34.8489L21.4493 35.2958C21.1954 35.3229 20.9539 35.3992 20.7314 35.5226C20.5541 35.6209 20.3956 35.7455 20.2588 35.8937C20.2975 35.8885 20.3371 35.8857 20.3772 35.8857H25.5713L26.7862 35.7562L28.0595 35.6204L26.7013 34.524C26.327 34.2218 26.2685 33.6733 26.5707 33.2989C26.5901 33.275 26.6105 33.2523 26.6318 33.231C26.7765 33.0854 26.9629 33.0005 27.1562 32.9799C27.3778 32.9563 27.6085 33.0172 27.7957 33.1683L31.4682 36.1329L28.5035 39.8053C28.3524 39.9925 28.1398 40.1008 27.9181 40.1244C27.6964 40.148 27.4658 40.0871 27.2785 39.936C27.2398 39.9048 27.2046 39.871 27.1727 39.835C26.896 39.5224 26.8769 39.0467 27.1479 38.711L28.2442 37.3528L25.664 37.628L21.7427 38.0462C21.3944 38.0834 21.0721 37.9099 20.9029 37.628H20.3772C20.1389 37.628 19.9229 37.5323 19.7656 37.3772C19.7657 37.3784 19.7659 37.3798 19.766 37.381C19.7932 37.6349 19.8694 37.8764 19.9928 38.0988C20.1116 38.3132 20.2689 38.5001 20.46 38.6544C20.6512 38.8087 20.8671 38.9229 21.1016 38.994C21.345 39.0676 21.5973 39.0912 21.8512 39.0642L25.9127 38.6311L26.0423 38.6173C26.0282 38.6563 26.0155 38.6958 26.004 38.7359C25.9365 38.9716 25.9155 39.2149 25.9415 39.4591C25.9676 39.7033 26.0395 39.9367 26.1552 40.1529C26.1916 40.221 26.232 40.2866 26.2761 40.3491C26.3769 40.4925 26.4972 40.6209 26.6355 40.7326C26.8342 40.893 27.0589 41.0098 27.3034 41.0799C27.5391 41.1474 27.7824 41.1684 28.0267 41.1423C28.2709 41.1163 28.5044 41.0444 28.7205 40.9288C28.9447 40.8087 29.1397 40.6471 29.3001 40.4484L32.2647 36.776C32.4353 36.5647 32.515 36.2943 32.4861 36.0243C32.4573 35.7544 32.3225 35.5068 32.1112 35.3364Z"
                  fill="#171D34"
                />
                <path
                  d="M47.0513 32.4677C47.241 32.4455 47.4108 32.3509 47.5294 32.2014C47.6481 32.0518 47.7015 31.865 47.68 31.6753L47.6797 31.6728L47.6272 31.2231C47.5812 30.8307 47.2247 30.5489 46.8325 30.5947C46.6429 30.6169 46.4731 30.7115 46.3544 30.861C46.2358 31.0106 46.1823 31.1974 46.2039 31.3871L46.2042 31.3896L46.2567 31.8393C46.2618 31.8831 46.271 31.9265 46.2839 31.9683C46.3857 32.2977 46.7085 32.5077 47.0513 32.4677Z"
                  fill="#171D34"
                />
                <path
                  d="M47.3458 28.8404C47.3236 28.6503 47.2288 28.4803 47.0787 28.3616C46.9286 28.2429 46.7413 28.1898 46.5512 28.212C46.1601 28.2577 45.8781 28.6131 45.9226 29.0043L45.9229 29.0068L45.9754 29.4565C45.9805 29.5003 45.9897 29.5436 46.0026 29.5854C46.1044 29.9149 46.4272 30.125 46.77 30.0849C46.9597 30.0628 47.1295 29.9682 47.2481 29.8186C47.3667 29.6691 47.4202 29.4822 47.3987 29.2926L47.3984 29.2901L47.3458 28.8404Z"
                  fill="#171D34"
                />
                <path
                  d="M48.4824 38.8213L48.4298 38.3716C48.3838 37.9792 48.0274 37.6973 47.6352 37.7432C47.2441 37.7888 46.9621 38.1443 47.0066 38.5355L47.0069 38.538L47.0594 38.9877C47.0645 39.0315 47.0737 39.0749 47.0866 39.1167C47.1884 39.4461 47.5112 39.6562 47.854 39.6161C48.0436 39.594 48.2134 39.4994 48.3321 39.3498C48.4507 39.2002 48.5042 39.0134 48.4827 38.8238L48.4824 38.8213Z"
                  fill="#171D34"
                />
                <path
                  d="M47.3559 35.3643C46.9648 35.41 46.6828 35.7654 46.7273 36.1566L46.7276 36.1592L46.7801 36.6089C46.7852 36.6527 46.7944 36.696 46.8073 36.7378C46.9091 37.0673 47.2319 37.2773 47.5747 37.2373C47.7643 37.2151 47.9341 37.1205 48.0528 36.9709C48.1714 36.8214 48.2249 36.6346 48.2033 36.4449L48.2031 36.4424L48.1505 35.9927C48.1283 35.8027 48.0335 35.6326 47.8834 35.5139C47.7333 35.3952 47.546 35.3421 47.3559 35.3643Z"
                  fill="#171D34"
                />
                <path
                  d="M47.2993 34.8563C47.6904 34.8107 47.9724 34.4552 47.928 34.064L47.9277 34.0615L47.8751 33.6118C47.8292 33.2194 47.4727 32.9376 47.0805 32.9834C46.6894 33.0291 46.4074 33.3845 46.4519 33.7757L46.4522 33.7783L46.5047 34.228C46.5098 34.2717 46.519 34.3151 46.5319 34.3569C46.6337 34.6863 46.9565 34.8964 47.2993 34.8563Z"
                  fill="#171D34"
                />
                <path
                  d="M1.12361 25.0556C1.31324 25.0334 1.48304 24.9388 1.6017 24.7892C1.72033 24.6397 1.7738 24.4529 1.75225 24.2632L1.75196 24.2607L1.69943 23.811C1.65342 23.4186 1.29697 23.1368 0.904805 23.1826C0.715157 23.2048 0.54537 23.2994 0.426708 23.4489C0.308077 23.5985 0.254607 23.7853 0.276157 23.9749L0.276454 23.9775L0.328982 24.4272C0.334101 24.471 0.343253 24.5144 0.356172 24.5561C0.458014 24.8856 0.780768 25.0956 1.12361 25.0556Z"
                  fill="#171D34"
                />
                <path
                  d="M0.852061 22.6767C1.04171 22.6546 1.2115 22.56 1.33016 22.4104C1.44879 22.2609 1.50226 22.0741 1.48071 21.8844L1.48041 21.8819L1.42789 21.4322C1.40569 21.2421 1.31082 21.0721 1.16074 20.9534C1.01065 20.8347 0.823324 20.7816 0.633257 20.8038C0.242179 20.8495 -0.0398405 21.2049 0.0046102 21.5961L0.00489763 21.5986L0.0574254 22.0483C0.0625441 22.0921 0.0716752 22.1354 0.0845947 22.1772C0.186467 22.5067 0.509221 22.7168 0.852061 22.6767Z"
                  fill="#171D34"
                />
                <path
                  d="M1.92822 32.2021C2.11787 32.1799 2.28766 32.0853 2.40632 31.9357C2.52495 31.7862 2.57842 31.5994 2.55687 31.4097L2.55657 31.4072L2.50404 30.9575C2.45805 30.5651 2.10159 30.2833 1.70942 30.3291C1.31834 30.3748 1.03633 30.7302 1.08078 31.1214L1.08108 31.124L1.13361 31.5737C1.13873 31.6175 1.14788 31.6608 1.1608 31.7026C1.26264 32.032 1.58539 32.2421 1.92822 32.2021Z"
                  fill="#171D34"
                />
                <path
                  d="M1.64893 29.8252C1.83857 29.803 2.00836 29.7084 2.12702 29.5588C2.24565 29.4093 2.29912 29.2225 2.27757 29.0328L2.27728 29.0303L2.22476 28.5806C2.20255 28.3906 2.10767 28.2205 1.9576 28.1019C1.80751 27.9831 1.62018 27.93 1.43012 27.9522C1.03904 27.9979 0.757035 28.3533 0.801485 28.7445L0.801772 28.7471L0.854301 29.1968C0.85944 29.2406 0.868571 29.2839 0.88148 29.3257C0.983332 29.6552 1.30609 29.8652 1.64893 29.8252Z"
                  fill="#171D34"
                />
                <path
                  d="M1.37354 27.4403C1.76463 27.3947 2.04664 27.0392 2.00219 26.648L2.00189 26.6455L1.94937 26.1958C1.90343 25.8034 1.54697 25.5216 1.15474 25.5674C0.763653 25.6131 0.481644 25.9685 0.526095 26.3597L0.526381 26.3622L0.578909 26.812C0.584027 26.8557 0.59317 26.8991 0.606089 26.9409C0.707951 27.2703 1.0307 27.4804 1.37354 27.4403Z"
                  fill="#171D34"
                />
                <path
                  d="M16.3683 10.9196L17.0485 10.2394C17.1917 10.0962 17.1917 9.86395 17.0485 9.7207C16.9052 9.57747 16.673 9.57747 16.5298 9.7207L15.8496 10.4009C15.7064 10.5441 15.7064 10.7763 15.8496 10.9196C15.9929 11.0628 16.2251 11.0628 16.3683 10.9196Z"
                  fill="#171D34"
                />
                <path
                  d="M19.2511 8.03088L19.9313 7.35073C20.0745 7.2075 20.0745 6.97528 19.9313 6.83204C19.788 6.6888 19.5558 6.68881 19.4126 6.83204L18.7324 7.51219C18.5892 7.65542 18.5892 7.88764 18.7324 8.03088C18.8757 8.17413 19.1079 8.17412 19.2511 8.03088Z"
                  fill="#171D34"
                />
                <path
                  d="M19.4126 10.9196C19.5558 11.0628 19.788 11.0628 19.9313 10.9196C20.0745 10.7763 20.0745 10.5441 19.9313 10.4009L19.2511 9.7207C19.1079 9.57747 18.8757 9.57747 18.7324 9.7207C18.5892 9.86394 18.5892 10.0962 18.7324 10.2394L19.4126 10.9196Z"
                  fill="#171D34"
                />
                <path
                  d="M16.5298 8.03088C16.673 8.17411 16.9052 8.17411 17.0485 8.03088C17.1917 7.88765 17.1917 7.65543 17.0485 7.51218L16.3683 6.83203C16.2251 6.6888 15.9929 6.6888 15.8496 6.83203C15.7064 6.97526 15.7064 7.20749 15.8496 7.35073L16.5298 8.03088Z"
                  fill="#171D34"
                />
                <path
                  d="M2.21451 35.5563L1.73409 36.0368C1.63291 36.138 1.63291 36.302 1.73409 36.4032C1.83526 36.5043 1.99929 36.5043 2.10047 36.4032L2.58091 35.9227C2.68209 35.8216 2.68209 35.6575 2.58091 35.5563C2.47973 35.4552 2.31569 35.4552 2.21451 35.5563Z"
                  fill="#171D34"
                />
                <path
                  d="M4.25163 33.5192L3.77119 33.9997C3.67002 34.1009 3.67002 34.2649 3.77119 34.3661C3.87237 34.4672 4.0364 34.4672 4.13758 34.3661L4.61802 33.8856C4.7192 33.7845 4.7192 33.6204 4.61802 33.5192C4.51684 33.4181 4.3528 33.4181 4.25163 33.5192Z"
                  fill="#171D34"
                />
                <path
                  d="M4.13758 35.5564C4.0364 35.4552 3.87237 35.4552 3.77119 35.5564C3.67002 35.6575 3.67002 35.8216 3.77119 35.9227L4.25163 36.4032C4.3528 36.5043 4.51683 36.5043 4.61801 36.4032C4.71919 36.302 4.71919 36.138 4.61801 36.0368L4.13758 35.5564Z"
                  fill="#171D34"
                />
                <path
                  d="M2.10047 33.5192C1.99929 33.4181 1.83526 33.4181 1.73409 33.5192C1.63291 33.6204 1.63291 33.7845 1.73409 33.8856L2.21451 34.3661C2.31569 34.4672 2.47972 34.4672 2.5809 34.3661C2.68208 34.2649 2.68208 34.1008 2.5809 33.9997L2.10047 33.5192Z"
                  fill="#171D34"
                />
                <path
                  d="M20.8083 42.6189L20.3278 43.0993C20.2267 43.2005 20.2267 43.3645 20.3278 43.4657C20.429 43.5668 20.593 43.5668 20.6942 43.4657L21.1747 42.9852C21.2758 42.8841 21.2758 42.72 21.1747 42.6189C21.0735 42.5177 20.9095 42.5177 20.8083 42.6189Z"
                  fill="#171D34"
                />
                <path
                  d="M22.8493 40.5817L22.3689 41.0622C22.2677 41.1634 22.2677 41.3274 22.3689 41.4286C22.47 41.5297 22.6341 41.5297 22.7352 41.4286L23.2157 40.9481C23.3169 40.847 23.3169 40.6829 23.2157 40.5817C23.1145 40.4806 22.9505 40.4806 22.8493 40.5817Z"
                  fill="#171D34"
                />
                <path
                  d="M22.7352 42.6189C22.6341 42.5177 22.47 42.5177 22.3689 42.6189C22.2677 42.72 22.2677 42.8841 22.3689 42.9852L22.8493 43.4657C22.9505 43.5669 23.1145 43.5669 23.2157 43.4657C23.3169 43.3645 23.3169 43.2005 23.2157 43.0993L22.7352 42.6189Z"
                  fill="#171D34"
                />
                <path
                  d="M20.6942 40.5817C20.5931 40.4806 20.429 40.4806 20.3278 40.5817C20.2267 40.6829 20.2267 40.8469 20.3278 40.9481L20.8083 41.4286C20.9095 41.5297 21.0735 41.5297 21.1747 41.4286C21.2758 41.3274 21.2758 41.1634 21.1747 41.0622L20.6942 40.5817Z"
                  fill="#171D34"
                />
                <path
                  d="M45.1825 12.4637L45.6629 11.9833C45.7641 11.8821 45.7641 11.7181 45.6629 11.6169C45.5618 11.5157 45.3977 11.5157 45.2966 11.6169L44.8161 12.0973C44.7149 12.1985 44.7149 12.3625 44.8161 12.4637C44.9173 12.5649 45.0813 12.5649 45.1825 12.4637Z"
                  fill="#171D34"
                />
                <path
                  d="M47.2157 10.4247L47.6961 9.94422C47.7973 9.84305 47.7973 9.67901 47.6961 9.57784C47.595 9.47666 47.4309 9.47666 47.3298 9.57784L46.8493 10.0583C46.7481 10.1594 46.7481 10.3235 46.8493 10.4247C46.9505 10.5258 47.1145 10.5258 47.2157 10.4247Z"
                  fill="#171D34"
                />
                <path
                  d="M47.3298 12.4637C47.4309 12.5649 47.595 12.5649 47.6961 12.4637C47.7973 12.3625 47.7973 12.1985 47.6961 12.0973L47.2157 11.6169C47.1145 11.5157 46.9505 11.5157 46.8493 11.6169C46.7481 11.7181 46.7481 11.8821 46.8493 11.9833L47.3298 12.4637Z"
                  fill="#171D34"
                />
                <path
                  d="M45.2966 10.4247C45.3977 10.5258 45.5618 10.5258 45.6629 10.4247C45.7641 10.3235 45.7641 10.1595 45.6629 10.0583L45.1825 9.57784C45.0813 9.47666 44.9173 9.47666 44.8161 9.57784C44.7149 9.67901 44.7149 9.84305 44.8161 9.94422L45.2966 10.4247Z"
                  fill="#171D34"
                />
                <path
                  d="M47.1755 42.7243L46.695 43.2048C46.5938 43.3059 46.5938 43.47 46.695 43.5711C46.7962 43.6723 46.9602 43.6723 47.0614 43.5711L47.5418 43.0907C47.643 42.9895 47.643 42.8255 47.5418 42.7243C47.4407 42.6231 47.2766 42.6231 47.1755 42.7243Z"
                  fill="#171D34"
                />
                <path
                  d="M49.0946 41.5379L49.575 41.0575C49.6762 40.9563 49.6762 40.7923 49.575 40.6911C49.4739 40.5899 49.3098 40.5899 49.2087 40.6911L48.7282 41.1716C48.627 41.2727 48.627 41.4368 48.7282 41.5379C48.8294 41.6391 48.9934 41.6391 49.0946 41.5379Z"
                  fill="#171D34"
                />
                <path
                  d="M49.0946 42.7243C48.9934 42.6231 48.8294 42.6231 48.7282 42.7243C48.627 42.8255 48.627 42.9895 48.7282 43.0907L49.2087 43.5711C49.3098 43.6723 49.4739 43.6723 49.575 43.5711C49.6762 43.47 49.6762 43.3059 49.575 43.2047L49.0946 42.7243Z"
                  fill="#171D34"
                />
                <path
                  d="M47.0614 40.6911C46.9602 40.5899 46.7962 40.5899 46.695 40.6911C46.5938 40.7923 46.5938 40.9563 46.695 41.0575L47.1755 41.5379C47.2766 41.6391 47.4407 41.6391 47.5418 41.5379C47.643 41.4368 47.643 41.2727 47.5418 41.1715L47.0614 40.6911Z"
                  fill="#171D34"
                />
              </svg>{" "}
              About Your Relationship
            </span>
          </div>
          <div className="doubleForm">
            {/* <p data-toggle="tooltip" data-placement="left" title={CONSTANTS.Date_of_marriage} style={{cursor:"pointer"}}><InfoIcon fontSize='small' style={{color:"grey"}} /></p> */}

            {renderInputs(aboutTheRelationshipInput, setAboutTheRelationship)}
            {/* <p data-toggle="tooltip" data-placement="left" title={CONSTANTS.Date_of_separation} style={{cursor:"pointer"}}><InfoIcon fontSize='small' style={{color:"grey"}}/></p> */}
          </div>
          {typeOfCalculatorSelected !== SPOUSAL_SUPPORT_CAL && (
            <>
              <div className="pHead">
                <span className="h5">
                  {/* <p data-toggle="tooltip" data-placement="left" title={CONSTANTS.About_child} style={{cursor:"pointer"}}><InfoIcon fontSize='small' style={{color:"grey"}}/></p> */}
                  <OverlayTrigger
                    placement="left"
                    overlay={
                      <Tooltip id="tooltip-left">
                        {CONSTANTS.About_child}
                      </Tooltip>
                    }
                  >
                    <InfoIcon fontSize="small" style={{ color: "grey" }} />
                  </OverlayTrigger>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49.1085 16.2961V16.2959C49.0591 15.8136 48.8258 15.3739 48.4983 15.0588C48.3112 14.8784 48.0933 14.7389 47.8615 14.6551C47.722 14.6048 47.6164 14.5705 47.4424 14.5407C47.3002 14.5198 47.1815 14.5137 47.0711 14.5137C47.025 14.5137 46.9803 14.5147 46.9359 14.5162C45.6785 14.5586 45.3475 16.0966 44.2337 17.6961C43.6308 18.5622 41.5053 20.4433 41.5156 20.4433C41.5157 20.4433 41.5161 20.4429 41.517 20.4423C40.8924 20.9246 39.8239 21.5068 39.8532 21.5068C39.8543 21.5068 39.857 21.506 39.8614 21.5043C38.7163 21.9854 36.5585 22.337 34.133 23.0762C33.6558 23.2217 33.1681 23.3821 32.6758 23.5616C33.7764 24.5749 34.7421 25.7137 35.562 26.985C36.7602 28.8432 37.6472 30.9847 38.1894 33.4323C38.1955 33.4561 38.2014 33.4801 38.2071 33.5039V33.504C38.3513 34.1111 38.3433 34.7251 38.209 35.305C38.1302 35.6449 38.0094 35.9679 37.855 36.2681C37.8023 36.3707 37.7457 36.4707 37.6852 36.5677C37.6156 36.68 37.5412 36.7882 37.4624 36.8923H40.9445V28.6937C40.9445 27.5301 41.2864 26.4111 41.9035 25.4621V25.462C42.2932 24.8629 42.7928 24.3314 43.3853 23.8995C43.4147 23.878 43.4444 23.8567 43.4743 23.8358C44.5008 23.1158 45.551 22.1668 46.6364 20.884C47.4946 19.8695 48.2689 18.7754 48.8068 17.5563C48.8215 17.5231 48.8871 17.3907 48.9039 17.3579C49.0861 17.002 49.1437 16.6383 49.1085 16.2961Z"
                      fill="#73C3FD"
                    />
                    <path
                      d="M36.6308 33.8081C35.6289 29.2536 33.4223 26.1785 30.7642 24.0282C29.9341 23.3565 29.0597 22.7751 28.1643 22.267C25.4518 20.7279 22.5457 19.8617 20.0841 19.199C17.9552 18.6259 16.1587 18.2047 15.1073 17.6318C14.3442 17.2161 13.6694 16.8145 12.9717 16.2758C12.9722 16.2762 12.9724 16.2763 12.9725 16.2763C12.9821 16.2763 11.1611 14.6602 10.1058 13.4913C9.88441 13.2462 9.69684 13.0208 9.56678 12.8341C8.171 10.8294 7.75617 8.90197 6.18027 8.84881C6.12079 8.84674 6.06431 8.8457 6.01042 8.8457C5.62357 8.8457 5.3645 8.89855 5.02034 9.02291C4.76977 9.11338 4.53225 9.25587 4.32126 9.43826C3.83306 9.86003 3.48673 10.4948 3.4488 11.1907C3.42714 11.5867 3.50528 12.0025 3.71399 12.4101C4.00716 12.9828 4.52271 14.426 6.55582 16.8292C7.91586 18.4369 9.23216 19.6262 10.5185 20.5284C11.4964 21.2142 12.2801 22.113 12.8237 23.1383C13.3838 24.1949 13.689 25.3858 13.689 26.6166V28.701V36.8915H14.5124H15.5539H20.6284V36.4523C20.6284 35.5855 20.2033 34.7698 19.4914 34.2704C18.0784 33.2795 16.7661 31.8284 15.9354 30.5811C15.3849 29.7543 15.1645 29.1974 15.0778 29.0264C14.0751 27.0652 15.4705 24.6472 17.8247 24.6472C18.2404 24.6472 18.594 24.7222 18.8992 24.8502C20.0262 25.3223 20.4925 26.5159 20.9827 27.3174C21.0076 26.9238 21.0763 26.5478 21.1833 26.1927C21.5871 24.8506 22.5351 23.8044 23.7122 23.2175C24.3946 22.8771 25.154 22.691 25.9292 22.691C26.8554 22.691 27.8036 22.9565 28.6701 23.5418C31.3476 25.3508 31.6204 29.2563 29.1065 31.3949C29.8691 31.6909 30.5947 32.0316 31.2767 32.4236C33.0163 33.4236 34.4718 34.7576 35.5312 36.5352C35.7504 36.393 35.9493 36.2136 36.1187 36.0071C36.5298 35.5062 36.7669 34.8458 36.6972 34.1688C36.685 34.0489 36.6631 33.9283 36.6308 33.8081Z"
                      fill="#73C3FD"
                    />
                    <path
                      d="M20.0944 16.2318C20.1278 16.2318 20.161 16.2314 20.1942 16.2309C23.3544 16.1777 25.8997 13.5993 25.8997 10.4264C25.8997 7.22023 23.3006 4.62109 20.0944 4.62109C19.802 4.62109 19.5146 4.64275 19.2338 4.68452C16.4356 5.10028 14.2891 7.51267 14.2891 10.4264C14.2891 13.6326 16.8882 16.2318 20.0944 16.2318Z"
                      fill="#73C3FD"
                    />
                    <path
                      d="M35.8354 19.825C38.3937 19.825 40.4676 17.7511 40.4676 15.1928C40.4676 12.6345 38.3937 10.5605 35.8354 10.5605C33.277 10.5605 31.2031 12.6345 31.2031 15.1928C31.2031 17.7511 33.277 19.825 35.8354 19.825Z"
                      fill="#73C3FD"
                    />
                    <path
                      d="M24.4907 30.6512C24.8908 30.8394 25.326 30.9469 25.7698 30.9658C25.8168 30.9678 25.8638 30.9688 25.9109 30.9688C26.3176 30.9688 26.729 30.8941 27.1257 30.7384C27.5104 30.5875 27.8601 30.367 28.1595 30.0926H28.1596C28.8244 29.4833 29.2411 28.6079 29.2411 27.6353C29.2411 25.7948 27.7491 24.3027 25.9087 24.3027C25.4411 24.3027 24.9959 24.3991 24.5921 24.573C23.4062 25.0835 22.5762 26.2624 22.5762 27.6353C22.5762 28.3152 22.7799 28.9476 23.1296 29.4748C23.4774 29.9994 23.9525 30.3981 24.4907 30.6512Z"
                      fill="#73C3FD"
                    />
                    <path
                      d="M35.3814 40.4889L35.3813 40.4888C34.41 36.2218 31.5864 33.8297 27.4124 32.4985C26.7827 32.2977 26.1751 32.1352 25.613 31.9939C25.1084 31.9591 24.6106 31.8361 24.1472 31.6322C23.697 31.5168 23.3137 31.4063 23.0203 31.2841C23.0205 31.2843 23.0205 31.2843 23.0203 31.2843C23.0198 31.2843 23.0169 31.2831 23.0116 31.2805C23.0145 31.2816 23.0174 31.2829 23.0203 31.2841C23.0084 31.2716 22.2208 30.8254 21.8229 30.5182C21.8225 30.5178 21.8212 30.5166 21.8195 30.5151C21.8031 30.5 21.7235 30.4283 21.6041 30.319C21.1647 29.9164 20.1891 29.0048 19.866 28.5408C19.2431 27.6463 18.9886 26.8566 18.5175 26.4815H18.5174C18.3316 26.3334 18.1121 26.25 17.8231 26.25C17.7405 26.25 17.6524 26.2568 17.5577 26.2708C16.5829 26.4369 16.0799 27.4645 16.5062 28.2975C16.5184 28.3211 16.5656 28.4163 16.5762 28.4403C17.2911 30.061 18.9185 31.91 20.4124 32.9577C21.1614 33.483 21.712 34.226 22.0014 35.0687C22.1524 35.5085 22.2324 35.9753 22.2324 36.4526V42.3508H29.586V36.5405C29.6007 36.5484 30.3951 37.2062 30.4027 37.2142C30.9735 37.8203 31.3145 38.2139 31.3845 38.2912C31.4664 38.3818 31.5931 38.573 31.7206 38.7786V38.7787C31.9326 39.1201 32.1466 39.5009 32.1615 39.525C32.5941 40.2228 32.6469 41.3164 33.0769 41.9086V41.9087C33.2324 42.1228 33.4372 42.2713 33.727 42.3119C33.7722 42.3183 33.9744 42.3444 34.0269 42.3484C34.054 42.3503 34.0811 42.3514 34.1081 42.3514C34.5606 42.3514 34.9839 42.072 35.229 41.6734C35.4233 41.3574 35.5057 40.9667 35.402 40.5809C35.3952 40.5501 35.3884 40.5195 35.3814 40.4889Z"
                      fill="#73C3FD"
                    />
                    <path
                      d="M49.8593 13.6024C49.8318 13.2027 49.7231 12.816 49.5363 12.4533C49.1425 11.689 48.4334 11.1136 47.6395 10.9139C47.4701 10.8713 47.2959 10.8315 47.0295 10.8132L47.018 10.8124L47.0066 10.8119C46.8281 10.8036 46.6616 10.8081 46.4825 10.8261C46.4306 10.8313 46.3769 10.8377 46.3137 10.8462C45.9468 10.8957 45.6091 11.022 45.3098 11.2215C45.0518 11.3937 44.8254 11.616 44.6179 11.9011C44.2969 12.3422 44.0661 12.8766 43.8217 13.4424C43.6309 13.8839 43.4337 14.3406 43.176 14.8035C43.0891 14.9595 42.8362 15.349 42.1185 16.2047C41.6563 16.7557 41.1896 17.2751 40.9904 17.4969C40.954 17.5373 40.9255 17.5691 40.9061 17.5909C40.9049 17.5922 40.9037 17.5934 40.9026 17.5948C40.5337 17.9353 39.9583 18.3555 39.6767 18.5611C39.6159 18.6055 39.568 18.6405 39.5313 18.6679C39.5302 18.6688 39.5291 18.6696 39.5279 18.6706C39.1487 18.8644 38.6118 19.0702 37.9852 19.2955H37.9851C37.985 19.2956 37.985 19.2956 37.9849 19.2956C37.7489 19.3805 37.5001 19.4682 37.2424 19.5591C37.0809 19.616 36.9145 19.6746 36.7437 19.7353C36.7436 19.7353 36.7435 19.7354 36.7434 19.7354H36.7433C36.7432 19.7354 36.7432 19.7354 36.7431 19.7355C35.5504 20.1589 34.1443 20.6779 32.7177 21.3665L31.5964 21.9077C31.1151 21.6047 30.614 21.319 30.0962 21.0533C28.4499 20.2087 26.6079 19.5402 24.4646 19.0096C22.6386 18.5577 20.9069 18.281 19.3791 18.0369C17.734 17.774 16.3131 17.547 15.4963 17.2029C14.7464 16.887 14.1054 16.5894 13.4276 16.1715C13.4239 16.1686 13.4198 16.1656 13.4154 16.1623C13.3884 16.142 13.3486 16.1125 13.2977 16.0748C12.9981 15.8523 12.2962 15.3313 11.583 14.7636C10.7921 14.1341 10.3493 13.7348 10.1038 13.492C10.0011 13.3905 9.93294 13.3163 9.88828 13.2642C9.44764 12.7499 9.08774 12.2328 8.73954 11.7327C8.30689 11.1112 7.89828 10.5241 7.41536 10.0821C7.11266 9.80495 6.80477 9.60453 6.47399 9.4694C6.09398 9.31416 5.68692 9.24981 5.26432 9.27789C5.19302 9.28266 5.12442 9.28836 5.06017 9.29478C4.81643 9.31934 4.60254 9.35758 4.39269 9.41717C4.36823 9.42411 4.34378 9.43136 4.31932 9.43893C4.13445 9.49582 3.95019 9.57002 3.74874 9.6666C2.89037 10.0778 2.21512 10.8997 1.94247 11.8651C1.81314 12.3226 1.77874 12.7889 1.83998 13.2511C1.90631 13.7522 2.08289 14.2277 2.36487 14.6642C2.40528 14.7268 2.45886 14.817 2.52083 14.9215C2.72736 15.2692 3.0395 15.795 3.55599 16.479C4.16139 17.2808 4.91136 18.1154 5.78485 18.9598C6.54705 19.6967 7.32303 20.3643 8.09092 20.9443C8.81809 21.4934 9.56495 21.9841 10.3108 22.4027C12.131 23.4244 13.3421 25.2713 13.5504 27.3431L13.687 28.7017V26.6173C13.687 25.3865 13.3818 24.1956 12.8217 23.139C12.2621 22.4881 11.5869 21.9306 10.818 21.499C9.44774 20.73 8.01911 19.6784 6.50508 18.2147C4.24181 16.027 3.58448 14.6426 3.23546 14.1022C2.5827 13.0912 2.82073 11.9341 3.44686 11.1914C3.65868 10.94 3.91506 10.736 4.19642 10.6011C4.52648 10.4431 4.77892 10.3646 5.1638 10.3259C5.21748 10.3205 5.27375 10.3158 5.33313 10.3119C6.90644 10.2071 7.51194 12.0835 9.10131 13.9384C9.95553 14.9353 12.8459 17.0216 12.8343 17.0228C12.8342 17.0228 12.8339 17.0227 12.8335 17.0224C13.5815 17.4886 14.2933 17.8206 15.094 18.1579C16.1769 18.6141 17.9595 18.8531 20.0821 19.1997C24.8896 19.9846 31.4417 21.3215 35.5608 26.985C36.5901 28.4003 37.4674 30.0856 38.1278 32.1C38.3044 32.5655 38.3165 33.0519 38.2059 33.5039V33.504C38.0687 34.0657 37.7421 34.5742 37.3064 34.9235C37.1114 34.6602 36.9075 34.409 36.6953 34.1694C35.0421 32.3023 32.8807 31.1384 30.3997 30.4516C32.1714 28.6086 32.1736 25.8781 30.7623 24.0288C30.3516 23.4906 29.8212 23.027 29.1799 22.6817C28.8457 22.5016 28.5048 22.3648 28.1623 22.2677C27.5613 22.0975 26.9547 22.0503 26.3677 22.1093C25.3869 22.2079 24.4614 22.6033 23.7103 23.2181C22.5823 24.1411 21.8474 25.5583 21.9088 27.2072C21.681 26.907 21.4509 26.5438 21.1813 26.1933C20.6579 25.5124 19.9865 24.8794 18.8972 24.8508C18.7705 24.8475 18.638 24.8524 18.4995 24.8663C16.1571 25.1017 15.0106 27.6471 16.2044 29.4983C16.3079 29.6599 16.5828 30.1918 17.2133 30.9594C18.1646 32.1173 19.6155 33.4299 21.1205 34.2746C21.4743 34.4732 21.7728 34.7464 21.9994 35.069C22.2587 35.438 22.4238 35.8715 22.4701 36.3316L22.514 36.7687L22.2304 36.7971L15.6094 37.4629L15.5519 36.8922H14.5105L14.5782 37.5665L14.682 38.5976L15.713 38.494L22.2304 37.8387L22.6177 37.7998L23.1823 37.743L23.6247 42.1435L23.6456 42.3512L23.7284 43.1746L24.7595 43.071L32.0762 42.3353L33.1073 42.2317L33.0749 41.909V41.9089C32.6448 41.3167 32.5921 40.2232 32.1594 39.5253C32.1445 39.5013 31.9305 39.1204 31.7186 38.7791C31.8475 40.06 31.9665 41.2439 31.9726 41.3043L29.5839 41.5444L24.6558 42.0399C24.6503 41.9851 24.1159 36.6697 24.1098 36.6082L24.0658 36.1712C23.9266 34.7861 23.1194 33.5573 21.9054 32.876C20.3142 31.9829 18.5101 30.306 17.6366 28.7649C17.6236 28.7421 17.5671 28.6522 17.5527 28.6299C17.0451 27.8438 17.4428 26.771 18.3962 26.5082C18.437 26.4979 18.4767 26.4891 18.5153 26.4819H18.5154C18.5647 26.4724 18.612 26.4655 18.658 26.4609C19.6751 26.3588 19.931 27.3817 20.92 28.5359C21.2878 28.9652 22.3497 29.7747 22.8272 30.1313C22.9569 30.2282 23.0432 30.2915 23.0611 30.3049C23.0631 30.3064 23.0645 30.3073 23.0647 30.3077C23.4914 30.5735 24.3197 30.9386 24.3328 30.9499C24.6369 31.0421 25.0294 31.1137 25.4888 31.1834C25.9704 31.3401 26.4779 31.4126 26.9835 31.3968C27.5569 31.4812 28.1777 31.5821 28.8244 31.7189C28.8244 31.7188 28.8244 31.7188 28.8244 31.7188C29.6932 31.9026 30.5111 32.1354 31.2747 32.4243C33.2873 33.1855 34.9226 34.3363 36.1167 36.0078C36.721 36.8534 37.2122 37.8323 37.5823 38.9615C37.9029 39.8063 37.2794 40.7713 36.472 40.8524C36.4452 40.8551 36.4181 40.8569 36.3909 40.8576C36.3383 40.8589 36.1346 40.8531 36.0889 40.8514C35.7838 40.8395 35.5592 40.7014 35.3793 40.4893C35.3863 40.5199 35.3932 40.5504 35.3999 40.5812C35.5037 40.967 35.4213 41.3578 35.227 41.6738C35.5225 41.8257 35.8123 41.8776 36.0484 41.8868C36.0508 41.887 36.3145 41.8962 36.418 41.8935C36.4702 41.8921 36.5234 41.8888 36.5757 41.8835C36.9393 41.847 37.2971 41.7147 37.6101 41.501C37.8928 41.3082 38.1399 41.0482 38.3248 40.7493C38.515 40.4417 38.6395 40.0927 38.6847 39.7401C38.7333 39.3605 38.6904 38.9735 38.5605 38.619C38.3771 38.062 38.1614 37.5267 37.9196 37.0276C37.8976 36.9824 37.8754 36.9373 37.8528 36.8923C37.7982 36.783 37.7419 36.6748 37.684 36.5677C37.6352 36.4777 37.5854 36.3885 37.5346 36.3003L37.8538 36.2681L39.368 36.1159L40.9433 35.9576L42.8326 35.7676L43.8637 35.664L43.76 34.6329L42.9399 26.4753C42.8501 25.5811 43.0103 24.692 43.3841 23.8995C42.7916 24.3315 42.292 24.8629 41.9023 25.4621V25.4622C41.8695 25.8305 41.8711 26.2041 41.9088 26.579L42.7289 34.7365L40.9433 34.9161L39.2643 35.0849C39.5629 34.595 39.7712 34.0319 39.8483 33.4308C39.9269 32.8172 39.8661 32.1804 39.6415 31.5695C38.469 28.0094 36.5977 25.2071 34.1318 23.0762C33.82 22.8066 33.4987 22.548 33.1682 22.2998C36.0368 20.9152 38.8032 20.2445 40.11 19.5351C40.107 19.5365 40.1049 19.5373 40.104 19.5374C40.075 19.5403 41.0782 18.8553 41.6517 18.3129C41.6414 18.3139 43.5681 16.2296 44.0814 15.3076C45.0296 13.6046 45.2051 12.0413 46.4519 11.8733C46.496 11.8674 46.5403 11.8618 46.5861 11.8572C46.6961 11.8462 46.8147 11.8404 46.9584 11.8471C47.1344 11.8592 47.2428 11.8827 47.3868 11.9189C48.3413 12.159 49.1627 13.3069 48.6943 14.5039C48.6809 14.5382 48.6288 14.6765 48.6175 14.7111C48.5794 14.8278 48.5392 14.9437 48.4971 15.0588C48.8246 15.3739 49.0579 15.8136 49.1073 16.2959C49.3005 15.874 49.4636 15.4581 49.6008 15.0383C49.6114 15.0083 49.6487 14.9088 49.6594 14.8816C49.8219 14.4662 49.8891 14.0358 49.8593 13.6024ZM28.3635 29.9954C28.2957 30.0303 28.2273 30.0625 28.1581 30.0922H28.158C27.8586 30.3666 27.5089 30.587 27.1242 30.738C26.7275 30.8937 26.3161 30.9684 25.9093 30.9684C25.8623 30.9684 25.8152 30.9674 25.7683 30.9654C25.3244 30.9465 24.8893 30.839 24.4892 30.6508C23.9509 30.3977 23.4759 29.999 23.128 29.4744C22.7784 28.9472 22.5746 28.3148 22.5746 27.6348C22.5746 26.262 23.4047 25.0831 24.5905 24.5726C25.1023 24.1028 25.7645 23.7886 26.5087 23.7138C28.34 23.5297 29.9738 24.865 30.1578 26.6962C30.299 28.1001 29.5471 29.3878 28.3635 29.9954Z"
                      fill="#171D34"
                    />
                    <path
                      d="M13.331 13.7693C13.5422 14.1558 13.7926 14.5238 14.0751 14.8629C14.3547 15.1987 14.6682 15.5094 15.0069 15.7862C15.3457 16.0631 15.7125 16.3085 16.0972 16.5156C16.4858 16.7248 16.8963 16.897 17.3171 17.0271C18.1926 17.2979 19.1024 17.3884 20.0209 17.2961C20.9394 17.2037 21.8129 16.934 22.6171 16.4943C23.0035 16.283 23.3714 16.0326 23.7107 15.7502C24.0465 15.4706 24.357 15.157 24.6339 14.8184C24.9107 14.4796 25.1561 14.1128 25.3633 13.7281C25.5726 13.3394 25.7447 12.929 25.8748 12.5083C26.1457 11.6326 26.2361 10.7229 26.1438 9.80436C26.0515 8.88589 25.7816 8.01239 25.3419 7.20823C25.1307 6.82179 24.8804 6.4538 24.5979 6.11462C24.3183 5.77886 24.0048 5.46818 23.666 5.19139C23.3273 4.91449 22.9605 4.66909 22.5757 4.46194C22.1871 4.25271 21.7767 4.08058 21.3559 3.95042C20.4804 3.67964 19.5706 3.58917 18.6521 3.6815C17.7335 3.77384 16.86 4.04359 16.0559 4.48329C15.6694 4.69459 15.3016 4.94496 14.9623 5.22735C14.6265 5.50694 14.3159 5.82052 14.039 6.15918C13.7622 6.49795 13.5169 6.8648 13.3097 7.24947C13.1004 7.63819 12.9282 8.04856 12.7982 8.4693C12.5273 9.34497 12.4368 10.2546 12.5292 11.1732C12.6215 12.0917 12.8913 12.9652 13.331 13.7693ZM18.7557 4.71262C18.9159 4.69645 19.075 4.68713 19.2331 4.68412C19.5139 4.64236 19.8013 4.6207 20.0937 4.6207C23.2999 4.6207 25.899 7.21983 25.899 10.426C25.899 13.5989 23.3537 16.1773 20.1935 16.2305C20.1022 16.2441 20.0101 16.2556 19.9172 16.2649C16.7271 16.5857 13.881 14.2596 13.5603 11.0695C13.2395 7.87945 15.5656 5.03336 18.7557 4.71262Z"
                      fill="#171D34"
                    />
                    <path
                      d="M24.3333 30.9503C24.3335 30.9503 24.3335 30.9502 24.3333 30.95C24.3302 30.9491 24.3272 30.9482 24.3242 30.9473C24.3298 30.9494 24.3328 30.9503 24.3333 30.9503Z"
                      fill="#171D34"
                    />
                    <path
                      d="M30.4981 16.3736C30.6732 16.6938 30.8806 16.9986 31.1147 17.2797C31.3463 17.5579 31.606 17.8152 31.8866 18.0445C32.1672 18.2739 32.4711 18.4772 32.7898 18.6488C33.1118 18.8222 33.4519 18.9648 33.8005 19.0726C34.5261 19.297 35.2799 19.372 36.0408 19.2955C36.8018 19.219 37.5255 18.9955 38.1919 18.6311C38.5121 18.4561 38.817 18.2486 39.0981 18.0146C39.3763 17.7829 39.6336 17.5232 39.8629 17.2426C40.0922 16.962 40.2955 16.6581 40.4672 16.3394C40.6406 16.0174 40.7832 15.6773 40.891 15.3287C41.1154 14.6031 41.1904 13.8493 41.1139 13.0884C41.0374 12.3274 40.8139 11.6037 40.4495 10.9373C40.2744 10.6171 40.067 10.3122 39.8329 10.0311C39.6013 9.75298 39.3416 9.49566 39.061 9.26633C38.7804 9.03699 38.4765 8.83369 38.1578 8.66208C37.8358 8.48867 37.4957 8.34606 37.1471 8.23824C36.4215 8.01383 35.6677 7.93883 34.9068 8.01534C34.1458 8.09185 33.4221 8.31538 32.7557 8.67974C32.4355 8.85481 32.1306 9.06226 31.8495 9.2963C31.5713 9.52793 31.314 9.78765 31.0847 10.0682C30.8554 10.3489 30.6521 10.6527 30.4804 10.9714C30.307 11.2935 30.1644 11.6335 30.0566 11.9822C29.8322 12.7078 29.7572 13.4615 29.8337 14.2225C29.9102 14.9834 30.1337 15.7071 30.4981 16.3736ZM35.0104 9.04642C37.5559 8.79051 39.8269 10.6466 40.0828 13.1921C40.3387 15.7375 38.4826 18.0085 35.9372 18.2644C33.3917 18.5203 31.1207 16.6643 30.8648 14.1188C30.6089 11.5733 32.4649 9.30234 35.0104 9.04642Z"
                      fill="#171D34"
                    />
                    <path
                      d="M1.70843 15.1628C1.62207 14.9975 1.53523 14.8295 1.4503 14.6633C1.44232 14.6477 1.43382 14.6325 1.42482 14.6177C1.33816 14.475 1.20474 14.3693 1.04433 14.3174C0.867219 14.2601 0.678405 14.2752 0.51266 14.3599C0.200641 14.5193 0.0551242 14.8878 0.174195 15.2169V15.2169C0.184143 15.2444 0.195947 15.2715 0.209253 15.2975C0.296509 15.4683 0.385309 15.6401 0.473156 15.8083C0.651264 16.149 1.07297 16.2811 1.41351 16.1031C1.75397 15.9253 1.88626 15.5034 1.70843 15.1628Z"
                      fill="#171D34"
                    />
                    <path
                      d="M3.13613 17.4347C3.13194 17.4278 3.12759 17.4209 3.12313 17.4141C3.02102 17.2585 2.91798 17.0999 2.81687 16.9427C2.60899 16.6196 2.17697 16.5258 1.85379 16.7336C1.56654 16.9184 1.45555 17.28 1.58987 17.5935C1.60514 17.6292 1.62368 17.664 1.64468 17.6967C1.74912 17.859 1.85454 18.0213 1.95802 18.1789C2.16889 18.5002 2.60176 18.5899 2.92297 18.3791C3.23727 18.1728 3.32999 17.7537 3.13613 17.4347Z"
                      fill="#171D34"
                    />
                    <path
                      d="M4.77569 19.2725C4.65913 19.1436 4.53701 19.0068 4.40238 18.8543C4.148 18.5664 3.70676 18.539 3.41876 18.7934C3.17141 19.0119 3.11138 19.3777 3.27598 19.6632C3.29915 19.7035 3.32674 19.7418 3.35781 19.777C3.49661 19.9341 3.6222 20.0748 3.74171 20.2071C3.99935 20.4921 4.44088 20.5144 4.72596 20.2568C4.97775 20.0292 5.02454 19.6581 4.85441 19.3781C4.83198 19.3412 4.80572 19.3058 4.77569 19.2725Z"
                      fill="#171D34"
                    />
                    <path
                      d="M6.79031 21.08C6.7553 21.0224 6.71162 20.9695 6.66007 20.9232L6.62034 20.8874C6.49432 20.7743 6.36962 20.6602 6.24965 20.5483C5.96867 20.2862 5.52686 20.3016 5.26474 20.5825C5.05464 20.8078 5.01784 21.1498 5.17526 21.4142C5.20889 21.4708 5.2505 21.5222 5.29898 21.5674C5.42637 21.6863 5.55764 21.8064 5.68905 21.9243L5.7279 21.9593C5.86628 22.0838 6.04485 22.1469 6.23073 22.1371C6.41661 22.1273 6.58754 22.0457 6.71202 21.9073C6.83653 21.7689 6.89968 21.5903 6.88986 21.4044C6.88371 21.2878 6.84929 21.1771 6.79031 21.08Z"
                      fill="#171D34"
                    />
                    <path
                      d="M8.99566 23.3655C9.09331 23.207 9.12339 23.02 9.08037 22.8388C9.06734 22.784 9.0481 22.7317 9.02319 22.6827C8.96583 22.5699 8.87843 22.4747 8.76798 22.4066C8.6322 22.3229 8.48 22.2261 8.30268 22.1107C7.98067 21.9011 7.54812 21.9925 7.33846 22.3145C7.17 22.5733 7.19003 22.9061 7.38831 23.1425C7.43247 23.1951 7.48428 23.2409 7.54229 23.2787C7.72964 23.4007 7.89141 23.5035 8.03681 23.5931C8.36394 23.7947 8.79409 23.6926 8.99566 23.3655Z"
                      fill="#171D34"
                    />
                    <path
                      d="M45.0923 33.1347C45.2683 33.1162 45.4267 33.0303 45.5383 32.8928C45.6498 32.7554 45.7013 32.5828 45.6833 32.4068L45.683 32.4045L45.639 31.987C45.6347 31.9464 45.6267 31.9061 45.6152 31.8672C45.5242 31.5608 45.2272 31.3627 44.9089 31.3963C44.7329 31.4148 44.5745 31.5008 44.463 31.6382C44.3515 31.7756 44.3 31.9482 44.318 32.1242L44.3182 32.1266L44.3622 32.544C44.4008 32.9082 44.7283 33.1731 45.0923 33.1347Z"
                      fill="#171D34"
                    />
                    <path
                      d="M45.9135 34.6154L45.8695 34.198C45.8652 34.1574 45.8572 34.1171 45.8456 34.0782C45.7546 33.7717 45.4576 33.5736 45.1394 33.6072C44.9634 33.6258 44.805 33.7117 44.6935 33.8491C44.5819 33.9865 44.5304 34.1591 44.5484 34.3352L44.5487 34.3375L44.5927 34.7549C44.6113 34.9313 44.6975 35.0899 44.8354 35.2015C44.9733 35.3131 45.1464 35.3643 45.3228 35.3457C45.6858 35.3074 45.9509 34.9808 45.9138 34.6177L45.9135 34.6154Z"
                      fill="#171D34"
                    />
                    <path
                      d="M44.4243 26.5C44.7873 26.4617 45.0525 26.1352 45.0153 25.772L45.0151 25.7697L44.971 25.3523C44.9667 25.3116 44.9587 25.2713 44.9472 25.2324C44.8562 24.926 44.5592 24.7279 44.241 24.7615C44.065 24.7801 43.9066 24.866 43.795 25.0034C43.6835 25.1408 43.632 25.3134 43.65 25.4895L43.6502 25.4918L43.6943 25.9092C43.7328 26.2734 44.0603 26.5384 44.4243 26.5Z"
                      fill="#171D34"
                    />
                    <path
                      d="M44.1694 28.5667C44.3073 28.6783 44.4804 28.7295 44.6568 28.7109C45.0198 28.6726 45.2849 28.3461 45.2477 27.983L45.2475 27.9806L45.2035 27.5632C45.1992 27.5225 45.1912 27.4823 45.1796 27.4434C45.0886 27.137 44.7916 26.9389 44.4734 26.9724C44.2974 26.991 44.139 27.0769 44.0274 27.2144C43.9159 27.3518 43.8644 27.5244 43.8824 27.7004L43.8827 27.7027L43.9267 28.1202C43.9453 28.2966 44.0315 28.4552 44.1694 28.5667Z"
                      fill="#171D34"
                    />
                    <path
                      d="M44.8872 30.9219C45.2502 30.8836 45.5153 30.557 45.4781 30.1939L45.4779 30.1916L45.4339 29.7741C45.4296 29.7335 45.4216 29.6932 45.41 29.6544C45.319 29.3479 45.022 29.1498 44.7038 29.1834C44.3408 29.2217 44.0757 29.5482 44.1128 29.9113L44.1131 29.9137L44.1571 30.3311C44.1956 30.6953 44.5231 30.9603 44.8872 30.9219Z"
                      fill="#171D34"
                    />
                    <path
                      d="M8.7406 33.9916L8.0521 34.68C7.90711 34.825 7.90711 35.0601 8.0521 35.2051C8.19709 35.3501 8.43216 35.3501 8.57716 35.2051L9.26566 34.5166C9.41064 34.3716 9.41064 34.1366 9.26566 33.9916C9.12066 33.8466 8.88558 33.8466 8.7406 33.9916Z"
                      fill="#171D34"
                    />
                    <path
                      d="M11.6586 31.0716L10.9701 31.7601C10.8251 31.9051 10.8251 32.1402 10.9701 32.2852C11.1151 32.4302 11.3501 32.4302 11.4951 32.2852L12.1836 31.5967C12.3286 31.4517 12.3286 31.2166 12.1836 31.0716C12.0386 30.9266 11.8036 30.9266 11.6586 31.0716Z"
                      fill="#171D34"
                    />
                    <path
                      d="M11.4951 33.9916C11.3501 33.8466 11.1151 33.8466 10.9701 33.9916C10.8251 34.1365 10.8251 34.3716 10.9701 34.5166L11.6586 35.2051C11.8036 35.3501 12.0386 35.3501 12.1836 35.2051C12.3286 35.0601 12.3286 34.825 12.1836 34.68L11.4951 33.9916Z"
                      fill="#171D34"
                    />
                    <path
                      d="M8.57716 31.0716C8.43218 30.9266 8.1971 30.9266 8.0521 31.0716C7.90711 31.2166 7.90712 31.4517 8.0521 31.5967L8.7406 32.2852C8.88559 32.4302 9.12066 32.4302 9.26566 32.2852C9.41066 32.1402 9.41065 31.9051 9.26566 31.7601L8.57716 31.0716Z"
                      fill="#171D34"
                    />
                    <path
                      d="M46.4928 25.4518L46.0065 25.9381C45.9041 26.0406 45.9041 26.2066 46.0065 26.309C46.1089 26.4114 46.275 26.4114 46.3774 26.309L46.8637 25.8227C46.9661 25.7203 46.9661 25.5542 46.8637 25.4518C46.7613 25.3494 46.5953 25.3494 46.4928 25.4518Z"
                      fill="#171D34"
                    />
                    <path
                      d="M48.5553 23.3913L48.069 23.8776C47.9666 23.98 47.9666 24.1461 48.069 24.2485C48.1714 24.3509 48.3375 24.3509 48.4399 24.2485L48.9262 23.7621C49.0286 23.6597 49.0286 23.4937 48.9262 23.3913C48.8238 23.2888 48.6577 23.2888 48.5553 23.3913Z"
                      fill="#171D34"
                    />
                    <path
                      d="M48.4399 25.4518C48.3375 25.3494 48.1714 25.3494 48.069 25.4518C47.9666 25.5542 47.9666 25.7203 48.069 25.8227L48.5553 26.309C48.6577 26.4114 48.8238 26.4114 48.9262 26.309C49.0286 26.2066 49.0286 26.0406 48.9262 25.9381L48.4399 25.4518Z"
                      fill="#171D34"
                    />
                    <path
                      d="M46.3774 23.3913C46.275 23.2888 46.1089 23.2888 46.0065 23.3913C45.9041 23.4937 45.9041 23.6597 46.0065 23.7621L46.4928 24.2485C46.5953 24.3509 46.7613 24.3509 46.8637 24.2485C46.9661 24.1461 46.9661 23.98 46.8637 23.8776L46.3774 23.3913Z"
                      fill="#171D34"
                    />
                    <path
                      d="M8.29731 8.01995L8.78364 7.53363C8.88605 7.43121 8.88605 7.26517 8.78364 7.16275C8.68122 7.06033 8.51517 7.06033 8.41276 7.16275L7.92642 7.64907C7.82401 7.75149 7.82401 7.91754 7.92642 8.01995C8.02885 8.12237 8.1949 8.12237 8.29731 8.01995Z"
                      fill="#171D34"
                    />
                    <path
                      d="M10.3579 5.95745L10.8442 5.47113C10.9466 5.36871 10.9466 5.20267 10.8442 5.10025C10.7418 4.99783 10.5757 4.99783 10.4733 5.10025L9.98697 5.58657C9.88455 5.68899 9.88455 5.85504 9.98697 5.95745C10.0894 6.05987 10.2554 6.05987 10.3579 5.95745Z"
                      fill="#171D34"
                    />
                    <path
                      d="M10.4733 8.01995C10.5757 8.12237 10.7418 8.12237 10.8442 8.01995C10.9466 7.91754 10.9466 7.75149 10.8442 7.64907L10.3579 7.16275C10.2554 7.06033 10.0894 7.06033 9.98697 7.16275C9.88455 7.26517 9.88455 7.43121 9.98697 7.53363L10.4733 8.01995Z"
                      fill="#171D34"
                    />
                    <path
                      d="M8.41276 5.95745C8.51517 6.05987 8.68122 6.05987 8.78364 5.95745C8.88605 5.85504 8.88605 5.68899 8.78364 5.58657L8.29731 5.10025C8.1949 4.99783 8.02885 4.99783 7.92642 5.10025C7.82401 5.20267 7.82401 5.36871 7.92642 5.47113L8.41276 5.95745Z"
                      fill="#171D34"
                    />
                    <path
                      d="M40.8149 9.44769L41.3012 8.96137C41.4036 8.85895 41.4036 8.6929 41.3012 8.59048C41.1988 8.48807 41.0327 8.48807 40.9303 8.59048L40.444 9.07681C40.3416 9.17923 40.3416 9.34527 40.444 9.44769C40.5464 9.55011 40.7125 9.55011 40.8149 9.44769Z"
                      fill="#171D34"
                    />
                    <path
                      d="M42.8774 7.38519L43.3637 6.89887C43.4661 6.79645 43.4661 6.6304 43.3637 6.52798C43.2613 6.42557 43.0953 6.42557 42.9928 6.52798L42.5065 7.01431C42.4041 7.11673 42.4041 7.28277 42.5065 7.38519C42.6089 7.48761 42.775 7.48761 42.8774 7.38519Z"
                      fill="#171D34"
                    />
                    <path
                      d="M42.9928 9.4477C43.0953 9.55012 43.2613 9.55012 43.3637 9.4477C43.4661 9.34528 43.4661 9.17924 43.3637 9.07682L42.8774 8.59048C42.775 8.48807 42.6089 8.48807 42.5065 8.59048C42.4041 8.6929 42.4041 8.85895 42.5065 8.96137L42.9928 9.4477Z"
                      fill="#171D34"
                    />
                    <path
                      d="M40.9303 7.3852C41.0327 7.48762 41.1988 7.48762 41.3012 7.3852C41.4036 7.28278 41.4036 7.11674 41.3012 7.01432L40.8149 6.52798C40.7125 6.42557 40.5464 6.42557 40.444 6.52798C40.3416 6.6304 40.3416 6.79645 40.444 6.89887L40.9303 7.3852Z"
                      fill="#171D34"
                    />
                    <path
                      d="M25.7799 45.4362L25.2936 45.9225C25.1912 46.0249 25.1912 46.191 25.2936 46.2934C25.396 46.3958 25.5621 46.3958 25.6645 46.2934L26.1508 45.8071C26.2532 45.7047 26.2532 45.5386 26.1508 45.4362C26.0484 45.3338 25.8824 45.3338 25.7799 45.4362Z"
                      fill="#171D34"
                    />
                    <path
                      d="M27.8424 43.3737L27.3561 43.86C27.2537 43.9624 27.2537 44.1285 27.3561 44.2309C27.4585 44.3333 27.6246 44.3333 27.727 44.2309L28.2133 43.7446C28.3157 43.6421 28.3157 43.4761 28.2133 43.3737C28.1109 43.2713 27.9449 43.2713 27.8424 43.3737Z"
                      fill="#171D34"
                    />
                    <path
                      d="M27.727 45.4362C27.6246 45.3338 27.4585 45.3338 27.3561 45.4362C27.2537 45.5386 27.2537 45.7047 27.3561 45.8071L27.8424 46.2934C27.9449 46.3958 28.1109 46.3958 28.2133 46.2934C28.3157 46.191 28.3157 46.0249 28.2133 45.9225L27.727 45.4362Z"
                      fill="#171D34"
                    />
                    <path
                      d="M25.6645 43.3737C25.5621 43.2713 25.396 43.2713 25.2936 43.3737C25.1912 43.4761 25.1912 43.6421 25.2936 43.7446L25.7799 44.2309C25.8824 44.3333 26.0484 44.3333 26.1508 44.2309C26.2532 44.1285 26.2532 43.9624 26.1508 43.86L25.6645 43.3737Z"
                      fill="#171D34"
                    />
                  </svg>
                  About Your Children
                </span>
              </div>
              <div className="doubleForm">
                {renderInputs(aboutYourChildrenInput, setAboutTheChildren)}
              </div>
              {aboutTheChildren.numberOfChildrenWithAdultChild > 0 && (
                <div className="tableOuter noScroll secondary">
                  <table className="table customGrid">
                    <thead>
                      <tr>
                        {/* <p data-toggle="tooltip" data-placement="left" title={CONSTANTS.birth_date} style={{cursor:"pointer"}}><InfoIcon/></p> */}
                        {headers.map((e) => {
                          return e;
                        })}
                      </tr>
                    </thead>
                    <tbody>{rows.map((e) => e)}</tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="btnGroup">
        <button
          className="btn btnPrimary rounded-pill"
          onClick={() =>
            history.push(
              isENVPROD()
                ? AUTH_ROUTES.PROD_SUPPORT_CALCULATOR
                : AUTH_ROUTES.SUPPORT_CALCULATOR
            )
          }
        >
          Back
        </button>
        <button
          onClick={determineTypeOfSplittingAndNext}
          className="btn btnPrimary rounded-pill"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Screen1;
