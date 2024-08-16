/* eslint-disable react/no-direct-mutation-state */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/LayoutComponents/Layout";

import profile_summary from "../../assets/images/profile_summary.svg";
import background_information from "../../assets/images/background_information.svg";
import children_information from "../../assets/images/children_information.svg";
import relationship_information from "../../assets/images/relationship_information.svg";
import employment_details from "../../assets/images/employment_details.svg";
import income_and_benefits from "../../assets/images/income_and_benefits.svg";
import expenses from "../../assets/images/expenses.svg";
import assets from "../../assets/images/assets.svg";
import debts_and_liabilities from "../../assets/images/debts_and_liabilities.svg";
import other_persons_in_household from "../../assets/images/other_persons_in_household.svg";
import financial_summary from "../../assets/images/financial_summary.svg";
import court_information from "../../assets/images/court_information.svg";

import GeneralModal from "../../components/Matters/Modals/GeneralModal";
import BackgroundInformationSimple from "../fiveSteps/BackgroundInformationSimple";
import ChildrenInformationSimple from "../fiveSteps/ChildrenInformationSimple";
import RelationshipInformationSimple from "../fiveSteps/RelationshipInformationSimple";
import EmploymentDetailsSimple from "../fiveSteps/EmploymentDetailsSimple";
import IncomeAndBenefitsSimple from "../fiveSteps/IncomeAndBenefitsSimple";
import ExpensesSimple from "../fiveSteps/ExpensesSimple";
import AssetsSimple from "../fiveSteps/AssetsSimple";
import DebtsAndLiabilitiesSimple from "../fiveSteps/DebtsAndLiabilitiesSimple";
import OtherPersonsInHouseholdSimple from "../fiveSteps/OtherPersonsInHouseholdSimple";
import FinancialSummarySimple from "../fiveSteps/FinancialSummarySimple";
import Documents from "../../components/Matters/Documents";
import { useParams } from "react-router";
import { getSingleMatter, getSingleMatterReset } from "../../utils/Apis/matters/getSingleMatter/getSingleMattersActions";
import { selectSingleMatterData, selectSingleMatterError } from "../../utils/Apis/matters/getSingleMatter/getSingleMattersSelectors";
import { selectMatterFoldersData, selectMatterFoldersLoading } from "../../utils/Apis/matters/getMatterFolders/getMattersFoldersSelectors";
import Loader from "../../components/Loader";
import { getMatterFolders } from "../../utils/Apis/matters/getMatterFolders/getMattersFoldersActions";
import { ClipLoader } from "react-spinners";
import { singleMatter } from "../../utils/matterData/sampleData";
import { selectDataSingleMatterData } from "../../utils/Apis/matters/getSingleMatterData/getSingleMattersDataSelectors";
import { getSingleMatterDataReset } from "../../utils/Apis/matters/getSingleMatterData/getSingleMattersDataActions";
import { updateMatterData, updateMatterReset } from "../../utils/Apis/matters/updateMatters/updateMatterDataActions";
import { selectMatterUpdateData, selectMatterUpdateLoading } from "../../utils/Apis/matters/updateMatters/updateMatterDataSelectors";
import FolderStructure from "../../components/Matters/Folders";
import toast from "react-hot-toast";
import CourtInformationSimple from "../fiveSteps/CourtInformationSimple";


const SingleMatter = () => {
  const [modalData, setModalData] = useState(null);
  const [ matterData, setMatterData] = useState(null);
  const [formData, setFormData] = useState({});

  const { id } = useParams();

  const dispatch = useDispatch();

  const { response } = useSelector((state) => state.userProfileInfo);

  useEffect(() => {
    const fetchData = async () => {

      dispatch(getSingleMatter(id))

    }
    fetchData();
  }, [matterData])

  useEffect(() => {
    dispatch(getMatterFolders(id))
  }, [])

  const profileSummaryMenuList = [
    {
      title: "Background Information",
      icon: background_information,
      link: "/matters/background-information",
      component: "BackgroundInformationSimple",
    },
    {
      title: "Court Information",
      icon: court_information,
      link: "/matters/court-information",
      component: "CourtInformationSimple",
    },
    {
      title: "Children Information",
      icon: children_information,
      link: "/matters/children-information",
      component: "ChildrenInformationSimple",
    },
    {
      title: "Relationship Information",
      icon: relationship_information,
      link: "/matters/relationship-information",
      component: "RelationshipInformationSimple",
    },
    {
      title: "Employment Details",
      icon: employment_details,
      link: "/matters/employment-details",
      component: "EmploymentDetailsSimple",
    },
    {
      title: "Income and Benefits",
      icon: income_and_benefits,
      link: "/matters/income-and-benefits",
      component: "IncomeAndBenefitsSimple",
    },
    {
      title: "Expenses",
      icon: expenses,
      link: "/matters/expenses",
      component: "ExpensesSimple",
    },
    {
      title: "Assets",
      icon: assets,
      link: "/matters/assets",
      component: "AssetsSimple",
    },
    {
      title: "Debts and Liabilities",
      icon: debts_and_liabilities,
      link: "/matters/debts-and-liabilities",
      component: "DebtsAndLiabilitiesSimple",
    },
    {
      title: "Other Persons in Household",
      icon: other_persons_in_household,
      link: "/matters/other-persons-in-household",
      component: "OtherPersonsInHouseholdSimple",
    },
    {
      title: "Financial Summary",
      icon: financial_summary,
      link: "/matters/financial-summary",
      component: "FinancialSummarySimple",
    },
  ];

  const onUpdateFormData = (data) => {
    setFormData(data)
  }

  const handleSave = () => {
    const data = {
      type: formData.type,
      matter_id: id,
      data: formData
    }
    console.log("🚀 ~ handleSave ~ data:", data)

    dispatch(updateMatterData(data))

  }

  const selectSingleMatter = useSelector(selectSingleMatterData);
  const selectUpdateMatter = useSelector(selectMatterUpdateData);
  const selectUpdateMatterLoading = useSelector(selectMatterUpdateLoading);

  useEffect(() => {
    if(selectSingleMatter && selectSingleMatter.body[0] && matterData === null){
      setMatterData(selectSingleMatter.body[0])
    }
  },[selectSingleMatter, matterData])

  useEffect(() => {
    if (selectUpdateMatter) {
      toast.success("Data Successfully Saved",
        {
          position: "top-right",
          style: {
            borderRadius: '10px',
            background: '#FFF',
            color: '#000',
          },
        })
        dispatch(updateMatterReset())
    }
  }, [selectUpdateMatterLoading, selectUpdateMatter])

  const matterLoading = useSelector(selectMatterFoldersLoading)

  const openModal = (item) => {
    setModalData(item);
  }

  const handelClose = () => {
    dispatch(getSingleMatterDataReset('relationship'))
    dispatch(getSingleMatterDataReset('employment'))
    dispatch(getSingleMatterDataReset('assets'))
    dispatch(getSingleMatterDataReset('children'))
    dispatch(getSingleMatterDataReset('incomeBenefits'))
    dispatch(getSingleMatterDataReset('expenses'))
    dispatch(getSingleMatterReset())
    setMatterData(null)
    setModalData(null)
  }

  return (
    <Layout title={`Welcome ${response.username ? response.username : ""} `}>
      {matterLoading ? (
        <Loader isLoading={matterLoading} />
      ) : (
        <div className="single-matter panel trans">
          <div className="pHead">
            <div className="info-container">
              <div className="info-row">
                <div className="label">Client Name:</div>
                <div className="value">
                  {selectSingleMatter && selectSingleMatter?.body[0].client_id}
                </div>
              </div>

              <div className="info-row">
                <div className="label">
                  <div className="label-text">Matter Number:</div>
                </div>
                <div className="value">{id}</div>
              </div>
            </div>
          </div>

          <div className="pBody">

            <div className="row matterType">
              <div className="col-12 col-xxl-5">
                <div className="summary-container">

                  <div className="head">
                    <img src={profile_summary} alt="" />
                    <div>Profile Summary</div>
                  </div>

                  <div className="body">

                    {profileSummaryMenuList.map((item, index) => (
                      <div className="profile-menu" key={index}>
                        <div className="info">
                          <img src={item.icon} alt="" />
                          <div>{item.title}</div>
                        </div>
                        <div className="actions">
                          <span className="statusBadge"
                            onClick={() => openModal(item)}
                          >View / Edit</span>
                        </div>
                      </div>
                    ))}

                  </div>

                </div>
              </div>

              <div className="col-12 col-xxl-7">
                {/* <Documents matter_id={id} />  */}
                <FolderStructure matter_id={id} matterData={matterData} />
              </div>

            </div>

            {/* Modals */}
            <GeneralModal
              show={modalData}
              changeShow={() => handelClose()}
              handleClick={() => setModalData(null)}
              action=""
              // handleContinue={(state) => handleContinue(state)}
              handleContinue={handleSave}
              heading={modalData && modalData.title}
              modalWidth="900px"
              dialogClassName="matterModal"
            >
              {modalData && modalData.component === "BackgroundInformationSimple" && <BackgroundInformationSimple matterId={id} onUpdateFormData={onUpdateFormData} />}
              {modalData && modalData.component === "CourtInformationSimple" && <CourtInformationSimple matterId={id} onUpdateFormData={onUpdateFormData} matterData={matterData} />}
              {modalData && modalData.component === "ChildrenInformationSimple" && <ChildrenInformationSimple matterId={id} onUpdateFormData={onUpdateFormData} />}
              {modalData && modalData.component === "RelationshipInformationSimple" && <RelationshipInformationSimple matterId={id} onUpdateFormData={onUpdateFormData} />}
              {modalData && modalData.component === "EmploymentDetailsSimple" && <EmploymentDetailsSimple matterId={id} onUpdateFormData={onUpdateFormData} />}
              {modalData && modalData.component === "IncomeAndBenefitsSimple" && <IncomeAndBenefitsSimple matterId={id} onUpdateFormData={onUpdateFormData} matterData={matterData} />}
              {modalData && modalData.component === "ExpensesSimple" && <ExpensesSimple matterId={id} onUpdateFormData={onUpdateFormData} matterData={matterData} />}
              {modalData && modalData.component === "AssetsSimple" && <AssetsSimple matterId={id} onUpdateFormData={onUpdateFormData} matterData={matterData} />}
              {modalData && modalData.component === "DebtsAndLiabilitiesSimple" && <DebtsAndLiabilitiesSimple matterId={id} onUpdateFormData={onUpdateFormData} />}
              {modalData && modalData.component === "OtherPersonsInHouseholdSimple" && <OtherPersonsInHouseholdSimple matterId={id} onUpdateFormData={onUpdateFormData} />}
              {modalData && modalData.component === "FinancialSummarySimple" && <FinancialSummarySimple matterId={id} />}
            </GeneralModal>

          </div>
        </div>
      )}



    </Layout>
  );
};



export default SingleMatter;
