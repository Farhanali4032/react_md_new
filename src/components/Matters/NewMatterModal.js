import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Dropdown from "./Form/Dropdown";

import CheckboxSvg from "./Form/CheckboxSvg";
import divorce from "../../assets/images/divorce.svg";
import children_implications from "../../assets/images/children_implications.svg";
import support from "../../assets/images/support.svg";
import property_division from "../../assets/images/property_division.svg";
import adoption from "../../assets/images/adoption.svg";
import child_protection from "../../assets/images/child_protection.svg";
import family_responsibility_office_dispute from "../../assets/images/family_responsibility_office_dispute.svg";
import acting_as_mediator from "../../assets/images/acting_as_mediator.svg";
import marriage_and_cohabitation_agreement from "../../assets/images/marriage_and_cohabitation_agreement.svg";
import variation_of_orders from "../../assets/images/variation_of_orders.svg";
import other from "../../assets/images/other.svg";
import InputCustom from "../../components/InputCustom";
import { getUserSID } from "../../utils/helpers";
import { Link } from "react-router-dom";
import CustomDropDown from "./Form/CustomDropdown";

interface INewMatterModal {
  heading: String;
  children: React.ReactChildren;
  handleClick: (e) => void;
  action: String;
  show: Boolean;
  changeShow: (e) => void;
  cancelOption?: String;
  size?: String;
}

const NewMatterModal = ({
  heading,
  children,
  handleClick,
  action,
  show,
  changeShow,
  cancelOption,
  ResetOption,
  size,
  modalSize,
  optionalWidth,
  reset,
  resetAll,
  handleContinue,
}) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [clientName, setClientName] = useState('');
  const [matterNumber, setMatterNumber] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [childrenInvolved, setChildrenInvolved] = useState('');
  const [province, setProvince] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if(checkedItems && clientName && clientRole && childrenInvolved && province){
      setIsValid(true);
    }
  }, [checkedItems,clientName,clientRole,childrenInvolved,province])

  const handleCheckItem = (name) => () => {
    if (checkedItems.includes(name)) {
      setCheckedItems(checkedItems.filter((item) => item !== name));
    } else {
      setCheckedItems([...checkedItems, name]);
    }
  };

  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
  };

  const handleMatterNumberChange = (e) => {
    setMatterNumber(e.target.innerText);
  };

  const handleClientRoleChange = (e) => {
    setClientRole(e.target.innerText);
  };

  const handleChildrenInvolvedChange = (e) => {
    setChildrenInvolved(e.target.innerText);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.innerText);
  };

  const CheckboxItems = [
    {
      title: "Divorce",
      name: "divorce",
      icon: divorce,
    },
    {
      title: "Children Implications",
      name: "children_implications",
      icon: children_implications,
    },
    {
      title: "Support",
      name: "support",
      icon: support,
    },
    {
      title: "Property divisiont",
      name: "property_division",
      icon: property_division,
    },
    {
      title: "Adoption",
      name: "adoption",
      icon: adoption,
    },
    {
      title: "Child Protection",
      name: "child_protection",
      icon: child_protection,
    },
    {
      title: "Family Responsibility Office Dispute",
      name: "family_responsibility_office_dispute",
      icon: family_responsibility_office_dispute,
    },
    {
      title: "Acting as mediator",
      name: "acting_as_mediator",
      icon: acting_as_mediator,
    },
    {
      title: "Marriage and cohabitation Agreement",
      name: "marriage_and_cohabitation_agreement",
      icon: marriage_and_cohabitation_agreement,
    },
    {
      title: "Variation of orders",
      name: "variation_of_orders",
      icon: variation_of_orders,
    },
    {
      title: "Other",
      name: "other",
      icon: other,
    },
  ];

  const clientsNameList = [
    {
      name: "Ahsan Ali Khan",
    },
    {
      name: "Asif Younas",
    },
    {
      name: "Gulzaib",
    },
  ];

  const matterNumbersList = [
    {
      name: "Matter Number 1",
    },
    {
      name: "Matter Number 2",
    },
    {
      name: "Matter Number 3",
    },
  ];

  const clientRoleList = [
    {
      name: "Client",
    },
    {
      name: "Opposing Party",
    },
    {
      name: "Other",
    },
  ];

  const childrenInvolvedList = [
    {
      name: "Yes",
    },
    {
      name: "No",
    },
  ];

  const provinceList = [
    {
      name: "Ontario",
    },
    {
      name: "Quebec",
    },
    {
      name: "British Columbia",
    },
    {
      name: "Alberta",
    },
    {
      name: "Manitoba",
    },
    {
      name: "Saskatchewan",
    },
    {
      name: "Nova Scotia",
    },
    {
      name: "New Brunswick",
    },
    {
      name: "Newfoundland and Labrador",
    },
    {
      name: "Prince Edward Island",
    },
    {
      name: "Northwest Territories",
    },
    {
      name: "Yukon",
    },
    {
      name: "Nunavut",
    },
  ];

  const state = {
    checkedItems,
    clientName,
    matterNumber,
    clientRole,
    childrenInvolved,
    province,
  };

  return (
    <Modal
      show={show}
      keyboard={true}
      onHide={changeShow}
      size={size | "md"}
      dialogClassName={[`customModal matterModal`]}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      rounded="true"
    >
      <Modal.Header closeButton={true} closeVariant={"white"}>
        <Modal.Title id="contained-modal-title-vcenter">{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="pBody">
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="form-group">
                <label>Client Name</label>
                {/* <Dropdown
                  handleChange={handleClientNameChange}
                  list={clientsNameList}
                  curListItem={clientName}
                ></Dropdown> */}
                <InputCustom
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    handleChange={handleClientNameChange}
                />
              </div>
            </div>
          </div>
          <div className="row matterType mb-3">
            <div className="col-md-4">
              <div className="form-group">
                <label>Client Role</label>
                <CustomDropDown
                  handleChange={handleClientRoleChange}
                  list={clientRoleList}
                  curListItem={clientRole}
                ></CustomDropDown>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Are there Children Involved?</label>
                <CustomDropDown
                  handleChange={handleChildrenInvolvedChange}
                  list={childrenInvolvedList}
                  curListItem={childrenInvolved}
                ></CustomDropDown>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Province</label>
                <CustomDropDown
                  handleChange={handleProvinceChange}
                  list={provinceList}
                  curListItem={province}
                ></CustomDropDown>
              </div>
            </div>
          </div>
          <h6 className="fw-bold mt-3">
            Please select the nature of the legal matter that applies.
          </h6>
          <span className="text">
            {"(You may select more than one option)"}
            <br />
            This helps us streamline the process.
          </span>
          <div className="row mb-3">
            {CheckboxItems.map((item, index) => (
              <CheckboxSvg
                key={index + item.title}
                title={item.title}
                icon={item.icon}
                name={item.name}
                checked={checkedItems.includes(item.name)}
                onClick={handleCheckItem(item.name)}
              />
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {action && (
          <button className="btn btnPrimary blue" onClick={handleClick}>
            {action}
          </button>
        )}
        {reset && (
          <button className="btn btnDefault" onClick={resetAll}>
            {ResetOption ? ResetOption : "Reset"}
          </button>
        )}
        <button className="btn btnPrimary blue" onClick={changeShow}>
          {cancelOption ? cancelOption : "Back"}
        </button>
        <button className={isValid ? 'btn btnDefault' : 'btn btnDefault disabled'} onClick={() => {handleContinue(state)}}>Continue</button>
        {/* <Link
          to={`/5-steps/${matterNumber}`}
          className="btn btnDefault"
          onClick={formInformation()}
        >
          {cancelOption ? cancelOption : "Continue"}
        </Link> */}
      </Modal.Footer>
    </Modal>
  );
};

export default NewMatterModal;
