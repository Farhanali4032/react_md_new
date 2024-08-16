import { useEffect, useState, useRef } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import Dropdown from "react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProfilePic from "../../assets/images/profile_pic.jpeg";
import { fullRefreshAction, userChangeAction } from "../../actions/userActions";
import Snackbar from "@mui/material/Snackbar";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { RiLoader3Fill } from "react-icons/ri";


import {
  clioConnectedOrNot,
  getCurrentUserFromCookies,
  getRegionOfUser,
  getUserId,
  getUserSID,
  intuitConnectedOrNot,
  updateInfoInCurrentUser,
} from "../../utils/helpers";
import { fetchRequest } from "../../utils/fetchRequest";
import { momentFunction } from "../../utils/moment";
import ModalInputCenter from "../ModalInputCenter";
import dataLoadApi from "../../utils/Apis/setup/data_load_status";
import moment from "moment";
import { Refresh } from "tabler-icons-react";
import Cookies from "js-cookie";
import { getSvg } from "./SetupAssets/getSvg";
import CookiesParser from "../../utils/cookieParser/Cookies";
import { decrypt } from "../../utils/Encrypted";
import { AUTH_ROUTES } from "../../routes/Routes.types";
import Loader from "../Loader";

const SetupDashboard = () => {

  console.log("getUserSIDIII", getUserSID())

  const [setupDashboardInfo, setSetupDashboardInfo] = useState({
    reviewers: [],
    preparers: [],
    admin: [],
    loadedReviewers: false,
    loadedPreparers: false,
    allUsers: [],
    allTasks: [],
    loadedTasks: false,
    modalUserEmail: "",
    modalUserRole: "PREPARER",
    addUserModalShow: false,
    modalUserName: "",
    editUserModalShow: false,
    newUserAdded: 0,
    uidToChange: 0,
  });
  const [saveLoading, setSaveLoading] = useState(false)

  const [setupDashboardAllData, setSetupDashboardAllData] = useState({
    uid: getUserId(),
    sid: getUserSID(),
    firm_details: {
      areaOfLawPractice: [],
      BusinessNumber: "",
      CorporateTaxNumber: "",
      otherCorporateTaxNumber: [],
      GSTNumber: "",
      otherGSTNumbers: [],
      detailsOfPartners: "",
      partnershipNumber: "",
      otherPartnershipNumber: [],
      PSTNumber: "",
      typeOfPartner: "",
      Signature: "",
      PayrollNumber: "",
      otherPayrollNumber: [],
      selfEmployed: "",
      partnerAccount: [],
      typeFirm: "Limited liability partnership",
      typeFirmList: [
        {
          name: "Professional corporation",
          id: 1,
        },
        {
          name: "Sole proprietor",
          id: 2,
        },
        {
          name: "Limited liability partnership",
          id: 3,
        },
      ],
    },

    financial_text_details: {
      HST: "Monthly",
      PST: "Monthly",
      currency: "Canadian Dollar"
    },

    financial_reporting: {
      indexToChange: 0,
      modalUserName: "",
      modalUserRole: "Preparer",
      form3DataUsers: [
        {
          sid: 1,
          uid: 8,
          role: "PREPARER",
          email: "mailto:test1@yopmail.com",
          username: "Xornor Test 1",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          sid: 1,
          uid: 9,
          role: "ADMIN",
          email: "mailto:test2@yopmail.com",
          username: "Xornor Test 2",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          sid: 1,
          uid: 12,
          role: "ADMIN",
          email: "mailto:test50@yopmail.com",
          username: "test50",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          sid: 1,
          uid: 15,
          role: "REVIEWER",
          email: "mailto:harkiratsinghvirdi1+2@gmail.com",
          username: "Harkirat",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          sid: 1,
          uid: 24,
          role: "PREPARER",
          email: "mailto:harkiratsinghvirdi4+1@gmail.com",
          username: "Harkirat",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          sid: 1,
          uid: 41,
          role: "PREPARER",
          email: "mailto:varinder+1@bivu.ca",
          username: "Varinder",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          sid: 1,
          uid: 16,
          role: "PREPARER",
          email: "mailto:harkiratsinghvirdi1+3@gmail.com",
          username: "Harkirat singh new",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          sid: 1,
          uid: 29,
          role: "REVIEWER",
          email: "mailto:harkiratsinghvirdi1+23@gmail.com",
          username: "Harkirat",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          sid: 1,
          uid: 55,
          role: "PREPARER",
          email: "mailto:harkiratsinghvirdi1+113@gmail.com",
          username: "Harkirat",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          side: 1,
          uid: 57,
          role: "ADMIN",
          email: "mailto:harkiratsinghvirdi1+114@gmail.com",
          username: "harkirat",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          side: 1,
          uid: 59,
          role: "ADMIN",
          email: "mailto:harkiratsinghvirdi1+116@gmail.com",
          username: "sadf",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        },
        {
          side: 1,
          uid: 60,
          role: "REVIEWER",
          email: "mailto:harkiratsinghvirdi1+117@gmail.com",
          username: "Harkirat Test",
          short_firmname: "RPDV",
          display_firmname: "Rodrigues Paiva LLP"
        }
      ],
      modalUserEmail: "",
      addUserModalShow: false,
      editUserShowModal: false,
      userAddedAsSomething: false,
      showLinkConfirmationSend: false
    },
    bank_account_details: {
      trust_bank_accounts: [
        {
          "name": "Not getting data due to query failure",
          "account_id": 78
        },
       
      ],
      credit_card_accounts: [
       
      ],
      general_bank_accounts: [
        
      ]
    },
    billing_info: {
      revenue_allo: "",
      service_fees: "",

      billing_frequency: "",

      revenue_collection: "",

      // billing_arrangement: "",

      disbursement_frequency: "",

      billingArrangement: [
        {
          name: "Time incurred fees",
          id: 1,
        },
        {
          name: "Fixed fee ",
          id: 2,
        },
        {
          name: "Sliding scale fees",
          id: 3,
        },
        {
          name: "Contigency fees",
          id: 4,
        },
        {
          name: "Evergreen retainers",
          id: 5,
        },
        {
          name: "Other",
          id: 6,
        },
      ],
      billingFrequency: [
        {
          name: "Bi-weekly",
          id: 1,
        },
        {
          name: "Bi-monthly",
          id: 2,
        },
        {
          name: "Monthly",
          id: 3,
        },
        {
          name: "Quarterly",
          id: 4,
        },
        {
          name: "Semi-annually",
          id: 5,
        },
        {
          name: "Upon completion",
          id: 6,
        },
        {
          name: "Other",
          id: 7,
        },
      ],
      serviceFeesCharged: [
        { name: "Time incurred fees", id: 1 },
        { name: "Fixed fee", id: 2 },
        { name: "Sliding scale fees", id: 3 },
        { name: "Contigency fees", id: 4 },
        { name: "Evergreen retainers", id: 5 },
        { name: "Other", id: 6 },
      ],
      disbursementFrequency: [
        {
          name: "Bi-weekly",
          id: 1,
        },
        {
          name: "Bi-monthly",
          id: 2,
        },
        {
          name: "Monthly",
          id: 3,
        },
        {
          name: "Quarterly",
          id: 4,
        },
        {
          name: "Semi-annually",
          id: 5,
        },
        {
          name: "Upon completion",
          id: 6,
        },
        {
          name: "Other",
          id: 7,
        },
      ],
      revenueCollection: [
        { name: "LawPay", id: 1 },
        { name: "Square", id: 2 },
        { name: "Stripe", id: 3 },
        { name: "Other", id: 4 },
      ],
      vendorPayments: [
        { name: "Plooto", id: 1 },
        { name: "Paypal", id: 2 },
        { name: "Bill.com", id: 3 },
        { name: "SparcPay.com", id: 4 },
        { name: "Other", id: 5 },
      ],
      vendor_payment: "",

    },
    payroll: {

      vendor_payment: "",
      payroll_frequen: "",
      numberOfEmployeesOnPayroll: 0,
      payrollFrequency: [
        { name: "Weekly", id: 1 },
        { name: "Bi-weekly", id: 2 },
        { name: "Monthly", id: 3 },
        { name: "Other", id: 4 },
      ],
      newHeight: 0,
      third_party: "",
      billing_frequency: "",
      direct_payment: "",
      vendorPayments: [
        { name: "Plooto", id: 1 },
        { name: "Paypal", id: 2 },
        { name: "Bill.com", id: 3 },
        { name: "Other", id: 4 },
      ],

    },
    other_details: {
      photo: "https://cloudact-image.s3.ca-central-1.amazonaws.com/1648492528850.png",
      month_QBO: "2020-01-19",
      month_clio: "2021-01-19",
      formCompleted: false,
      preferred_date: "Canadian (dd/mm/yyyy)",
      revenue_collection: "Yes",
      localDriveSharePoint: "local",

    },
    two_factor_task:"Yes"
  }
  )

  let history = useHistory();
  const [CompanyInfoAll, setCompanyInfoAll] = useState({ loaded: false  , isActive : "No"});

  console.log("CompanyInfoAll0",CompanyInfoAll)
  const [UserUnAuthorized, setUserUnAuthorized] = useState(false)

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    msg: "",
  });


  const roleDropdownList = [
    { value: "Admin", label: "Administrator" },
    {
      value: "Preparer",
      label: "Preparer",
    },
    {
      value: "Reviewer",
      label: "Approver",
    },
  ];

  const [dataLoadBatchesSuccess, setDataLoadBatchesSuccess] = useState({
    show: false,
    status: [],
  });


  // useEffect(() => {
  //   const fetchDataLoadStatus = async () => {
  //     const dataTest = await dataLoadApi();

  //     let currObj;
  //     let prev_batch;
  //     let same_batches = [];
  //     let currTimeDiff = 0;
  //     const nowDate = new Date().getTime();
  //     let currObjDate;

  //     for (let i = 0; i < dataTest?.length; i++) {
  //       currObj = dataTest[i].load_batch_id;
  //       currObjDate = new Date(dataTest[i]["min(load_start)"]).getTime();
  //       currTimeDiff = Math.abs(nowDate - currObjDate) / 3600000;

  //       if (currObj === prev_batch && currTimeDiff > 1) {
  //         console.log("batch_id", currObj, prev_batch);
  //         same_batches.push({
  //           processed: "failed",
  //           date: dataTest[i]["min(load_start)"],
  //         });
  //       } else if (currObj === prev_batch && currTimeDiff < 1) {
  //         same_batches.push({
  //           processed: "pending",
  //           date: dataTest[i]["min(load_start)"],
  //         });
  //       } else {
  //         same_batches.push({
  //           processed: "processed",
  //           date: dataTest[i]["min(load_start)"],
  //         });
  //       }

  //       prev_batch = currObj;
  //     }

  //     for (let i = same_batches?.length - 1; i >= 0; i--) {
  //       if (same_batches[i].processed === "pending") {
  //         same_batches.splice(i - 1, 1);
  //         i--;
  //       }
  //     }

  //     setDataLoadBatchesSuccess((prev) => ({
  //       show: true,
  //       status: same_batches,
  //     }));
  //   };

  //   fetchDataLoadStatus();
  // }, []);

  useEffect(() => {
    const allReviewers = axios.get(`/user/list/${getUserSID()}/${getUserId()}`);

    const allTasks = axios.get(
      `/task/list/${getCurrentUserFromCookies().role
      }/${getUserId()}/${getUserSID()}?page=1&isComplianceForm=0`
    );

    const allUsersAxios = [allReviewers, allTasks];

    Promise.all(allUsersAxios).then(([...res]) => {
      console.log("res of all users", res);
      const allData = res?.map((e) => {
        const {
          data: {
            data: { body },
          },
        } = e;
        console.log("each body", body);
        return body;
      });

      setSetupDashboardInfo({
        ...setupDashboardInfo,
        allUsers: [...allData[0]],
        allTasks: allData[1].data,
        loadedPreparers: true,
        loadedReviewers: true,
        loadedTasks: true,
      });
    });
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`/client/details/${getUserSID()}`)
        .then((res) => {

          const parsingData1 = JSON.parse(res.data.data.body.firm_details);
          const parsingData2 = JSON.parse(res.data.data.body.bank_account_details);
          const parsingData3 = JSON.parse(res.data.data.body.billing_info);
          const parsingData4 = JSON.parse(res.data.data.body.financial_reporting);
          const parsingData5 = JSON.parse(res.data.data.body.financial_text_details);
          const parsingData6 = JSON.parse(res.data.data.body.other_details
          );
          const parsingData7 = JSON.parse(res.data.data.body.payroll);


          setSetupDashboardAllData((prev) => ({
            ...prev,
            firm_details: parsingData1,
            bank_account_details: parsingData2,
            billing_info: parsingData3,
            financial_reporting: parsingData4,
            financial_text_details: parsingData5,
            other_details: parsingData6,
            payroll: parsingData7,
          }))


        })
        .catch((err) => {

          console.log("err", err);
        });
    };

    const fetchCompanyData = async () => {

      const { short_firmname, display_firmname } = getCurrentUserFromCookies();
      axios.get(`/companyinfo/${getUserSID()}`)
        .then((res) => {
          console.log("checkRes", res)
          if (res.data.data.code === 200) {

            setCompanyInfoAll((prev) => ({
              ...prev,
              loaded: true,
              shortName: short_firmname,
              display_firmname,
              ...res.data.data.body,

            }))

          } else if (res.data.data.code === 400) {


            toast.error(res.data.data.message.message)
            setUserUnAuthorized(true)

          } else {
            throw res.data;
          }
        })
        .catch((err) => {
          toast.error('Internal Server Error')
          console.log("errComp", err);

          setCompanyInfoAll((prev) => ({
            ...prev,
            loaded: true,
            companyInfo: {}
          }))

        });
    }

    fetchCompanyData()

    fetchData();
  }, []);

  const handlSubmit = (e) => {
    e.preventDefault();
    setSaveLoading(true)

    axios
      .post(
        "/client/details",
        setupDashboardAllData
      )
      .catch((err) => {
        console.log("err", err);

      }).finally(() => {
        setSaveLoading(false)
      })

  }



  const HighOrderProps = {
    setupDashboardAllData,
    setSetupDashboardAllData,
    handlSubmit,
    saveLoading,
    CompanyInfoAll,
    setCompanyInfoAll,
  }

 



  return (
    <div className="row">
      <div className="col-lg-6">
        {!setupDashboardInfo.loadedReviewers &&
          !setupDashboardInfo.loadedPreparers && (
            <div className="loader">Loading...</div>
          )}
        <div className="panel">
          <div className="pHead">
            <span className="h5">
              {getSvg('Law firm profile')}
              Law firm profile
            </span>
          </div>
          <div className="pBody settingTabs">
            {setupDashboardInfo.addUserModalShow && (
              <ModalInputCenter
                show={setupDashboardInfo.addUserModalShow}
                changeShow={() =>
                  setSetupDashboardInfo({
                    ...setupDashboardInfo,
                    addUserModalShow: false,
                  })
                }
                handleClick={() => {
                  setupDashboardInfo.modalUserEmailError = "";
                  setupDashboardInfo.modalUserNameError = "";

                  if (setupDashboardInfo.modalUserEmail === "") {
                    setupDashboardInfo.modalUserEmailError = "Enter User Email";
                  }
                  if (setupDashboardInfo.modalUserName === "") {
                    setupDashboardInfo.modalUserNameError = "Enter User Name";
                  }

                  setSetupDashboardInfo({
                    ...setupDashboardInfo,
                  });

                  if (
                    setupDashboardInfo.modalUserEmail &&
                    setupDashboardInfo.modalUserName
                  ) {
                    setupDashboardInfo.modalUserEmailError = "";
                    setupDashboardInfo.modalUserNameError = "";
                    const obj = {
                      email: setupDashboardInfo.modalUserEmail
                        .trim()
                        .toLowerCase(),
                      role: setupDashboardInfo.modalUserRole,
                      name: setupDashboardInfo.modalUserName.trim(),
                    };

                    console.log("obj", obj);

                    axios
                      .post("/add/client", {
                        email: setupDashboardInfo.modalUserEmail
                          .trim()
                          .toLowerCase(),
                        role: setupDashboardInfo.modalUserRole.toUpperCase(),
                        uid: getUserId(),
                        sid: getUserSID(),
                        user_name: setupDashboardInfo.modalUserName.trim(),
                      })
                      .then((res) => {
                        console.log("res", res);
                        setupDashboardInfo.showLinkConfirmationSend = true;
                        setupDashboardInfo.userAddedAsSomething =
                          res.data.data.body || res.data.data.message;
                        setSetupDashboardInfo({
                          ...setupDashboardInfo,
                          addUserModalShow: false,
                          allUsers: [...setupDashboardInfo.allUsers],
                        });

                        let allUsers = [];
                        allUsers.push(obj);
                        setSetupDashboardInfo({
                          ...setupDashboardInfo,
                          loadedPreparers: false,
                          addUserModalShow: false,
                          newUserAdded: setupDashboardInfo.newUserAdded + 1,
                        });

                        if (
                          res.data.data.message ===
                          "Client creation link forward to his / her email successfully."
                        ) {
                          setSnackbarState((prev) => ({
                            ...prev,
                            open: true,
                            msg: res.data.data.body || res.data.data.message,
                          }));
                        } else {
                          alert(res.data.data.body || res.data.data.message);
                          window.location.reload();
                        }
                      })
                      .catch((err) => {
                        const error = err.response.data.data;
                        setupDashboardInfo.modalUserEmailError = error.message;
                        setupDashboardInfo.userAddedAsSomething = err.body;
                        setSetupDashboardInfo({
                          ...setupDashboardInfo,
                          newUserAdded: false,
                        });
                      });
                  }
                }}
                action="Add Users"
                heading="Add Users"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    type="text"
                    className={`form-control ${setupDashboardInfo.modalUserNameError && "border_red"
                      }`}
                    value={setupDashboardInfo.modalUserName}
                    onChange={(e) => {
                      setSetupDashboardInfo({
                        ...setupDashboardInfo,
                        modalUserName: e.target.value,
                      });
                    }}
                    required
                    name="modalUserName"
                  />
                </div>
                {setupDashboardInfo.modalUserNameError && (
                  <span className="text-error text">
                    {setupDashboardInfo.modalUserNameError}
                  </span>
                )}
                <div className="form-group">
                  <label>Role</label>
                  <Dropdown
                    options={roleDropdownList}
                    value={
                      setupDashboardInfo.modalUserRole || roleDropdownList[0]
                    }
                    onChange={(e) => {
                      setSetupDashboardInfo({
                        ...setupDashboardInfo,
                        modalUserRole: e.value,
                      });
                    }}
                  ></Dropdown>
                </div>
                <div className="form-group mb-0">
                  <label>User Email</label>
                  <input
                    type="email"
                    required
                    className={`form-control ${setupDashboardInfo.modalUserEmailError && "border_red"
                      }`}
                    value={setupDashboardInfo.modalUserEmail}
                    onChange={(e) => {
                      setSetupDashboardInfo({
                        ...setupDashboardInfo,
                        modalUserEmail: e.target.value,
                      });
                    }}
                    name="modalUserEmail"
                  />
                </div>
                {setupDashboardInfo.modalUserEmailError && (
                  <span className="text-error text">
                    {setupDashboardInfo.modalUserEmailError}
                  </span>
                )}
              </ModalInputCenter>
            )}
            <Snackbar
              open={snackbarState.open}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              className="heading-5"
              onClose={() =>
                setSnackbarState((prev) => ({ ...prev, open: false }))
              }
              message={snackbarState.msg}
              action={() =>
                setSnackbarState((prev) => ({ ...prev, open: false }))
              }
            />

            {/* create modal for unauthorized user  */}
            {/* {
              UserUnAuthorized && <Modal
              className="customModal"
                show={UserUnAuthorized}
                onHide={() =>
                  setUserUnAuthorized(false)
                }
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                 <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Unauthorized User
                  </Modal.Title>
                </Modal.Header>
                
                  <Modal.Body>

                    <div style={{textAlign: 'center'}}>
                      <h3>Unauthorized user</h3>
                      <p>Sorry, your authorized token is expired please login again.</p>
                      </div>
                      <div className="btnGroup" style={{
                            justifyContent: 'center',
                            marginTop: '40px',
                            marginBottom: '10px',

                        
                      }}>

                      <button
                      onClick={()=>
                        setUserUnAuthorized(false)
                      }
                      className="btn btnPrimary"
                        
                      >
                        Cancel
                      </button>

                      <button
                      onClick={()=>
                        history.push(AUTH_ROUTES.SETUPWIZARD)
                      }
                      className="btn btnPrimary"
                        
                      >
                        Go to Connect Again
                      </button>
                    </div>

                  
                   
                  </Modal.Body>
                


              </Modal>
            } */}

            {setupDashboardInfo.editUserModalShow && (
              <Modal
                className="customModal"
                show={setupDashboardInfo.editUserModalShow}
                onHide={() =>
                  setSetupDashboardInfo({
                    ...setupDashboardInfo,
                    editUserModalShow: false,
                  })
                }
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Edit User Role
                  </Modal.Title>
                </Modal.Header>
                <div>
                  <Modal.Body>
                    <div className="form-group">
                      <label>Role</label>
                      <Dropdown
                        options={roleDropdownList}
                        value={
                          setupDashboardInfo.modalUserRole ||
                          roleDropdownList[0]
                        }
                        onChange={(e) => {
                          setSetupDashboardInfo({
                            ...setupDashboardInfo,
                            modalUserRole: e.value,
                          });
                        }}
                      ></Dropdown>
                    </div>
                    <div className="btnGroup">
                      <button
                        onClick={(e) => {
                          const obj = {
                            uid: setupDashboardInfo.uidToChange,
                            role: setupDashboardInfo.modalUserRole.toUpperCase(),
                          };
                          console.log("e", e);
                          console.log("obj", obj);
                          axios
                            .put("/edit/role", obj)
                            .then((res) => {
                              console.log("res", res);
                              setSetupDashboardInfo({
                                ...setupDashboardInfo,
                                editUserModalShow: false,
                              });
                              window.location.reload();
                            })
                            .catch((err) => {
                              console.log("err", err);
                            });
                        }}
                        className="btn btnPrimary"
                      >
                        Edit User
                      </button>
                    </div>
                  </Modal.Body>
                </div>
              </Modal>
            )}
            <Tabs
              defaultActiveKey="accountDetails"
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="accountDetails" title="Account details">
                <AccountDetails props={HighOrderProps} />
              </Tab>
              <Tab eventKey="systemSync" title="System Sync">
                <SystemSync props={HighOrderProps} />
              </Tab>

              {/* commented cause this feature is no yet included */}

              {/* <Tab eventKey="pricingPlan" title="Pricing Plan">
                <GetCompanyDetails props={HighOrderProps} />
                <div className="pricingPlans mt-4">
                  <div className="heading">
                    <span className="h4">Pricing Plan </span>
                    <div className="control">
                      <label className="toggle">
                        Monthly <input type="checkbox"></input> Yearly
                      </label>
                      <span className="badge">20% OFF</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="plan current">
                        <span className="h5">
                        {getSvg('Lite')}

                          
                          Lite
                        </span>
                        <span className="text">Best for personal use</span>
                        <span className="price">
                          <strong>$50</strong>/per Month
                        </span>
                        <button className="btn btnPrimary blue">
                          Current plan
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="plan">
                        <span className="h5">
                          
                        {getSvg('Pro')}

                          
                        </span>
                        <span className="text">
                          For large team & corporation
                        </span>
                        <span className="price">
                          <strong>$50</strong>/per Month
                        </span>
                        <button className="btn btnPrimary blue">
                          Upgrade plan
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="plan">
                        <span className="h5">
                         
                          {getSvg('Ultimate')}
                          Ultimate
                        </span>
                        <span className="text">Best the businesses owners</span>
                        <span className="price">
                          <strong>$50</strong>/per Month
                        </span>
                        <button className="btn btnPrimary blue">
                          Upgrade plan
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul class="nav nav-tabs smallTab mb-0 mt-3" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        type="button"
                        id="billingHistoryTab"
                        role="tab"
                        class="nav-link active"
                      >
                        Billing history
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        type="button"
                        id="featureTab"
                        role="tab"
                        class="nav-link"
                      >
                        Features
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      role="tabpanel"
                      id="billingHistoryTab"
                      class="tab-pane active"
                    >
                      <div className="tableOuter m-0 mt-3">
                        <table className="table customGrid">
                          <thead>
                            <tr>
                              <th>Invoice</th>
                              <th>Amount</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span>Lite Plan - August 2023</span>
                              </td>
                              <td>
                                <span>USD $50.00</span>
                              </td>
                              <td>
                                <span>Aug 1, 2023</span>
                              </td>
                              <td>
                                <span className="greenColor">
                                  <i className="fas fa-check"></i> Paid
                                </span>
                              </td>
                              <td className="actions">
                                <button class="redColor">
                                  <i class="fa-solid fa-file-pdf"></i> PDF
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>Lite Plan - July 2023</span>
                              </td>
                              <td>
                                <span>USD $50.00</span>
                              </td>
                              <td>
                                <span>Aug 1, 2023</span>
                              </td>
                              <td>
                                <span className="greenColor">
                                  <i className="fas fa-check"></i> Paid
                                </span>
                              </td>
                              <td className="actions">
                                <button class="redColor">
                                  <i class="fa-solid fa-file-pdf"></i> PDF
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>Lite Plan - June 2023</span>
                              </td>
                              <td>
                                <span>USD $50.00</span>
                              </td>
                              <td>
                                <span>Aug 1, 2023</span>
                              </td>
                              <td>
                                <span className="greenColor">
                                  <i className="fas fa-check"></i> Paid
                                </span>
                              </td>
                              <td className="actions">
                                <button class="redColor">
                                  <i class="fa-solid fa-file-pdf"></i> PDF
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div role="tabpanel" id="featureTab" class="tab-pane">
                      <div className="tableOuter m-0 mt-3">
                        <table className="table customGrid">
                          <thead>
                            <tr>
                              <th>Overview</th>
                              <th>Lite</th>
                              <th>Pro</th>
                              <th>Ultimate</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span>
                                  Lorem ipsum dolor sit amet consectetur.
                                </span>
                              </td>
                              <td>
                                <span className="blueColor">
                                  <i className="fas fa-check"></i>
                                </span>
                              </td>
                              <td>
                                <span className="blueColor">
                                  <i className="fas fa-check"></i>
                                </span>
                              </td>
                              <td>
                                <span className="blueColor">
                                  <i className="fas fa-check"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>
                                  Lorem ipsum dolor sit amet consectetur.
                                </span>
                              </td>
                              <td>
                                <span className="blueColor">
                                  <i className="fas fa-check"></i>
                                </span>
                              </td>
                              <td>
                                <span className="blueColor">
                                  <i className="fas fa-check"></i>
                                </span>
                              </td>
                              <td>
                                <span className="blueColor">
                                  <i className="fas fa-check"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>
                                  Lorem ipsum dolor sit amet consectetur.
                                </span>
                              </td>
                              <td>
                                <span className="blueColor">
                                  <i className="fas fa-check"></i>
                                </span>
                              </td>
                              <td>
                                <span className="blueColor">
                                  <i className="fas fa-check"></i>
                                </span>
                              </td>
                              <td>
                                <span className="blueColor">
                                  <i className="fas fa-check"></i>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab> */}

              <Tab
                eventKey="taxFinancialAndBank"
                title="Tax, Financial and bank"
              >
                <TaxFinancialAndBank props={HighOrderProps} />
              </Tab>
              <Tab eventKey="payroll" title="Payroll">
                <PayRoll props={HighOrderProps} />
              </Tab>
              <Tab eventKey="invoicing" title="Invoicing">
                <Invoicing props={HighOrderProps} />
              </Tab>
              <Tab eventKey="otherDetails" title="Other Details">
                <OtherDetails props={HighOrderProps} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="panel">
          <div className="pHead">
            <span className="h5">

              {getSvg('Manage users')}
              Manage users
            </span>
            <div className="control">
              {/* comment search user button as per client requirement */}
              {/* <div class="gridSearch">
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  class="form-control rounded-pill"
                  name="search"
                  placeholder="Search"
                  value=""
                ></input>
              </div> */}
              <a
                onClick={(e) => {
                  setSetupDashboardInfo({
                    ...setupDashboardInfo,
                    modalUserEmail: "",
                    addUserModalShow: true,
                    modalUserRole: "Admin",
                    modalUserName: "",
                  });
                }}
                className="btn btnPrimary"
              >
                Add User
              </a>
            </div>
          </div>
          <div className="pBody">
            {setupDashboardInfo?.allUsers?.length >= 1 && (
              <div className="tableOuter">
                <table className="table customGrid">
                  <thead>
                    <tr>
                      <th style={{ width: "180px" }}>User Name</th>
                      <th>Email</th>
                      <th style={{ width: "100px" }}>Role</th>
                      <th style={{ width: "150px" }} className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {setupDashboardInfo?.allUsers?.map((e, index) => {
                      if (e.username && e.email) {
                        return (
                          <tr key={index}>
                            <td>
                              <span>{e.username}</span>
                            </td>
                            <td>
                              <span>{e.email}</span>
                            </td>
                            <td>
                              <span>{e.role}</span>
                            </td>
                            <td className="actions text-center">
                              <button
                                onClick={(elem) => {
                                  setSetupDashboardInfo({
                                    ...setupDashboardInfo,
                                    editUserModalShow: true,
                                    uidToChange: e.uid,
                                  });
                                }}
                                className="blueColor"
                              >
                                <i className="fa-solid fa-edit"></i> Edit
                              </button>
                              <button
                                onClick={(elem) => {
                                  axios
                                    .delete(
                                      `/delete/${e.role}/${e.uid}/${e.sid}`
                                    )
                                    .then((res) => {
                                      console.log("res", res);
                                      setSetupDashboardInfo({
                                        ...setupDashboardInfo,
                                        loadedPreparers: false,
                                      });
                                      window.location.reload();
                                    })
                                    .catch((err) => {
                                      console.log("err", err);
                                    });
                                }}
                                className="redColor"
                              >
                                <i className="fa-solid fa-trash-can"></i> Delete
                              </button>
                            </td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr key={index}>
                            <td>---------</td>
                            <td>---------</td>
                            <td>{e.role}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountDetails = ({ props }) => {

  let { setupDashboardAllData, setSetupDashboardAllData, handlSubmit, saveLoading, CompanyInfoAll, setCompanyInfoAll } = props;


  const dispatch = useDispatch();
  const { userRole } = useSelector((state) => state.userChange);
  const [form7Data, setForm7Data] = useState({
    month_QBO: "",
    formCompleted: false,
  });


  const getCompanyLegalAddress = (type) => {
    try {

      const { legaladdress } = CompanyInfoAll;
      switch (type) {
        case "street":
          return legaladdress?.Line1 + ", " + legaladdress?.PostalCode;

        case "Country":
          return legaladdress?.Country;

        case "Province":
          return legaladdress?.CountrySubDivisionCode;

        default:
          break;
      }
    } catch (error) {
      console.log("err", error);
      return "";
    }
  };

  const onChangeInput = (e) => {
    const name = e.target.name;
    const val = e.target.value;


    setSetupDashboardAllData((prev) => ({
      ...prev, firm_details: {
        ...prev.firm_details,
        [name]: val
      }
    }))

  };

  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };


  return (
    <>
      <div className="userProfilePage pNone">

        {/* compny info component */}
        <div className="userPhoto">
          {userRole.company_profile_pic ? (
            <img
              src={userRole.company_profile_pic}
              alt={userRole.company_profile_pic}
            ></img>
          ) : (
            <img src={ProfilePic} alt="unknown"></img>
          )}
          <div className="controls">
            <a
              onClick={toggleClass}
              href="javascript:void(0)"
              className="profileControlBtn"
            >
              {getSvg('profileControlBtn')}

            </a>
            <div className={isActive ? "open controlsView" : "controlsView"}>
              <span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="profile_pic"
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      form7Data.photo = URL.createObjectURL(
                        event.target.files[0]
                      );
                    }
                    const formData = new FormData();
                    formData.append(
                      "file",
                      event.target.files[0],
                      event.target.files[0].name
                    );
                    console.log("file name", event.target.files[0]);
                    console.log("form data", formData);
                    axios
                      .post(`/file/upload/${getUserId()}`, formData)
                      .then((res) => {
                        const { data } = res;
                        console.log("data file", data);
                        dispatch(
                          userChangeAction({
                            ...userRole,
                            company_profile_pic: data.data.body.file,
                          })
                        );
                        setForm7Data({
                          ...form7Data,
                          photo: data.data.body.file,
                        });
                        updateInfoInCurrentUser({
                          company_profile_pic: data.data.body.file,
                        });
                      })
                      .catch((err) => {
                        console.log("err", err);
                        alert("Photo size should not be greater than 500KB");
                      });
                    setActive(false);
                  }}
                  placeholder="Edit Photo"
                ></input>
                {getSvg('Import Image')}
                Import Image
              </span>
              <span
                onClick={async () => {
                  setForm7Data({ ...form7Data, photo: "" });
                  const {
                    data: { data },
                  } = await fetchRequest(
                    "delete",
                    `company/profile/remove/${getUserSID()}`
                  );
                  if (data.code === 200) {
                    dispatch(
                      userChangeAction({
                        ...userRole,
                        company_profile_pic: null,
                      })
                    );
                    updateInfoInCurrentUser({ company_profile_pic: null });
                  }
                  setActive(false);
                }}
              >


                {getSvg('Delete Image')}
                Delete Image
              </span>
            </div>
          </div>
        </div>
        <div className="userInfo">
          <strong>{CompanyInfoAll.loaded && CompanyInfoAll.companyname}</strong>
          <span>{CompanyInfoAll.loaded && CompanyInfoAll.shortName}</span>
          <span>
            {CompanyInfoAll.loaded && CompanyInfoAll !== {}
              ? getCompanyLegalAddress("Province")
              : ""}{" "}
            ,{" "}
            {CompanyInfoAll.loaded && CompanyInfoAll !== {}
              ? getCompanyLegalAddress("Country")
              : ""}
          </span>
        </div>

      </div>


      <form onSubmit={handlSubmit}>
        <span className="heading mt-4">Law firm details</span>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Law firm name</label>
              <input
                className="form-control"
                type="text"
                placeholder="CRM Company"
                value={
                  CompanyInfoAll.loaded && CompanyInfoAll !== {}
                    ? CompanyInfoAll.companyname
                    : ""
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Type of law firm</label>
              <select
                className="form-select"
                onChange={(e) => {
                  setSetupDashboardAllData((prev) => ({
                    ...prev, firm_details: {
                      ...prev.firm_details,
                      [e.target.name]: e.target.value,
                    }
                  }))


                }}
                name="typeFirm"
                value={setupDashboardAllData?.firm_details?.typeFirm}
              >

                {setupDashboardAllData?.firm_details?.typeFirmList?.map((firm) => (
                  <option
                    key={firm.id}
                    value={firm.name}
                    selected={setupDashboardAllData?.firm_details?.typeFirm === firm.name}
                  >
                    {firm.name}
                  </option>
                ))}

              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Business number</label>
              <input
                className="form-control"
                type="text"
                placeholder="Business number"
                name="BusinessNumber"
                onChange={(e) => {
                  console.log("e", e);
                  const text = e.target.value;
                  if (text?.length <= 9) onChangeInput(e);
                }}

                value={setupDashboardAllData?.firm_details.BusinessNumber}

              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>GST number</label>
              <input
                className="form-control"
                type="text"
                placeholder="GST number"
                name="GSTNumber"
                onChange={(e) => {

                  setSetupDashboardAllData((prev) => ({
                    ...prev, firm_details: {
                      ...prev.firm_details,
                      [e.target.name]: e.target.value,
                    }
                  }))

                }}
                value={setupDashboardAllData?.firm_details.GSTNumber}


              />
            </div>
          </div>
          {CompanyInfoAll?.legaladdress?.CountrySubDivisionCode === "BC" && (
            <div className="col-md-6">
              <div className="form-group">
                <label>PST number</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="PST number"
                  name="PSTNumber"
                  onChange={(e) => {
                    setSetupDashboardAllData((prev) => ({
                      ...prev, firm_details: {
                        ...prev.firm_details,
                        [e.target.name]: e.target.value,
                      }
                    }))

                  }}
                  value={setupDashboardAllData?.firm_details?.PSTNumber}
                />
              </div>
            </div>
          )}
          {setupDashboardAllData?.firm_details?.typeFirm === "Limited liability partnership" && (
            <div className="col-md-6">
              <div className="form-group">
                <label>Partnership number</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Partnership Number"
                  name="partnershipNumber"
                  onChange={(e) => {

                    setSetupDashboardAllData((prev) => ({
                      ...prev, firm_details: {
                        ...prev.firm_details,
                        [e.target.name]: e.target.value,
                      }
                    }))


                  }}
                  value={setupDashboardAllData?.firm_details.partnershipNumber}
                />
              </div>
            </div>
          )}
          <div className="col-md-6">
            <div className="form-group">
              <label>Law firm short name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Law firm short name"
                name="shortName"
                disabled
                onChange={(e) => {

                  setCompanyInfoAll((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))


                }}
                value={CompanyInfoAll.shortName}
              />
            </div>
          </div>

          {setupDashboardAllData?.firm_details?.typeFirm === "Limited liability partnership" && (
            <>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Name of Partner</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name of Partner"
                    value={setupDashboardAllData?.firm_details.detailsOfPartners}
                    onChange={(e) => {

                      setSetupDashboardAllData((prev) => ({
                        ...prev, firm_details: {
                          ...prev.firm_details,
                          [e.target.name]: e.target.value,
                        }
                      }))


                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Partnership Number</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Partnership Number"
                    name="PartnershipNumber"
                    value={
                      setupDashboardAllData?.firm_details.partnershipNumber && setupDashboardAllData?.firm_details.BusinessNumber
                        ? setupDashboardAllData?.firm_details.partnershipNumber
                        : ""
                    }

                    onChange={(e) => {

                      setSetupDashboardAllData((prev) => ({
                        ...prev, firm_details: {
                          ...prev.firm_details,
                          [e.target.name]: e.target.value,
                        }
                      }))


                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Law Firm's short name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Short Name"
                    name="shortName"
                    value={CompanyInfoAll.shortName ? CompanyInfoAll.shortName : ""}

                    onChange={(e) => {

                      setCompanyInfoAll((prev) => ({
                        ...prev,
                        shortName: e.target.value,
                      }))

                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <span className="heading">Further Details</span>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Number of lawyers</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => {
                  onChangeInput(e);
                }}
                name="NumberOfLawyers"
                placeholder="No of lawyers"
                value={setupDashboardAllData?.firm_details.NumberOfLawyers}

              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Paralegals</label>
              <input
                className="form-control"
                type="text"
                name="NumberOfParalegals"
                placeholder="No of paralegals"
                onChange={onChangeInput}
                value={setupDashboardAllData?.firm_details.NumberOfParalegals}

              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Number of office staff</label>
              <input
                className="form-control"
                type="text"
                placeholder="Number of office staff"
                name="NumberOfOfficeStaff"
                onChange={onChangeInput}
                value={setupDashboardAllData?.firm_details.NumberOfOfficeStaff}
              />
            </div>
          </div>
        </div>
        <div className="btnGroup">

          <button class="btn btnPrimary ms-auto" type="submit" >
            {
              saveLoading ?
                <>
                  <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
                : "Save"
            }
          </button>


        </div>
      </form>
    </>
  );
};

const SystemSync = ({ props }) => {

  let { CompanyInfoAll, setCompanyInfoAll } = props;


  const dispatch = useDispatch();
  let history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [dataResetModal, setDataResetModal] = useState(false);
  const [showDataEraseAlert, setshowDataEraseAlert] = useState(false);
  const [isClioConnected, setIsClioConnected] = useState(false);
  const [isQBOConnected, setIsQBOConnected] = useState(false);
  const [popoverState, setPopoverState] = useState({
    open: false,
    index: 0,
  });
  const [dataLoadBatchesSuccess, setDataLoadBatchesSuccess] = useState({
    show: false,
    status: [],
  });
  const [isActive, setActive] = useState(false);
  const [dataloadLoader , setDataloadLoader] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  const handleDataLoad = () => {
    setshowDataEraseAlert(true);
  };

  const deleteDataLoad = () => {
    dispatch(fullRefreshAction());
  };

  const fetchDataLoadStatus = async () => {
    const dataTest = await dataLoadApi();
    setDataLoadBatchesSuccess((prev) => ({
      show: true,
      status: dataTest,
    }));
    setDataloadLoader(false);
  };

  useEffect(() => {
    fetchDataLoadStatus();
  }, []);

  const changeClioConnected = (e) => {
    setIsClioConnected(e);
  };

  const changeQBOConnected = (e) => {
    setIsQBOConnected(e);
  };

  const update = (value) => {
    let prevData = CookiesParser.get("allUserInfo");
    prevData = decrypt(prevData)
    Object.keys(value).forEach(function (val, key) {
      prevData[val] = value[val];
    });
    CookiesParser.set("allUserInfo", prevData, { path: "/" });
  };

  const disconnectService = (type) => {
    axios.get(
      `/disconnect/access?
        uid=${getUserId()}&type=${type}
        &region=
        ${type === "intuit" ? "us" : getRegionOfUser()}
        &sid=${getUserSID()}`
    )
      .then((res) => {
        console.log("res", res);
        if (res.data.data.code === 200) {
          if (type === "clio") {
            changeClioConnected(false);
            update({ authClio: false });
            history.push(`/setupwizard?step=2&connected=${isClioConnected}`);
          } else if (type === "intuit") {
            changeQBOConnected(false);
            update({ authIntuit: false });
            history.push(`/setupwizard?step=2&connected=${isQBOConnected}`);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
        if (type === "clio") {
          history.push(`/setupwizard?step=2&connected=${isClioConnected}`);
          changeClioConnected(true);
        } else if (type === "intuit") {
          changeQBOConnected(true);
          history.push(`/setupwizard?step=2&connected=${isQBOConnected}`);
        }
      });
  };

  return (
    <>
      <GetCompanyDetails />
      <Loader isLoading={dataloadLoader} />
      <ModalInputCenter
        changeShow={() => {
          setDataResetModal(false)
          setDataloadLoader(true)
        }
          
        
        }
        show={dataResetModal}
        cancelOption="Ok"
        heading={"Data Refresh"}
        handleClick={() => { 
        }}
        

      >
        <h4 style={{ fontSize: "16px" }}>
          The process has been initiated and will be completed in some time.
        </h4>
      </ModalInputCenter>
      <ModalInputCenter
        changeShow={() => setshowDataEraseAlert(false)}
        show={showDataEraseAlert}
        action="Yes"
        cancelOption="No"
        handleClick={() => {
          if (getUserSID() && clioConnectedOrNot() && intuitConnectedOrNot()) {

            deleteDataLoad();

            setTimeout(() => {
            fetchDataLoadStatus();

            },2000)
           
    
          }
          setshowDataEraseAlert(false);
          setDataResetModal(true);
        }}
        heading={"Data Refresh"}
      >
        <h4 style={{ fontSize: "16px" }}>
          Are you sure that you want to delete the data and refresh?
        </h4>
      </ModalInputCenter>
      <h6 className="mt-4 mb-3 fw-bold">System Sync</h6>
      <Link to="setupwizard?step=2&redirect=setup" className="syncConnect">
        <span>
          <strong>
            {clioConnectedOrNot() === true ? (
              <>Connected To Clio</>
            ) : (
              <>Clio not Connected</>
            )}
          </strong>
          {momentFunction.formatDate(
            userInfo.updated_at,
            "ddd, D MMM, YYYY - h:mm A"
          )}
        </span>
        {getSvg('Clio Connect')}

        {clioConnectedOrNot() === false ? (
          <span>
            {getSvg('Clio ConnectedOrnot')}

          </span>
        ) : (
          <span onClick={() => disconnectService("clio")}>
            {getSvg('Disconnected Clio')}

          </span>
        )}
      </Link>

      <Link to="setupwizard?step=2&redirect=setup" className="syncConnect QBO">
        <span>
          <strong>
            {intuitConnectedOrNot() === true ? (
              <>Connected To QBO</>
            ) : (
              <>QBO not Connected</>
            )}
          </strong>
          {momentFunction.formatDate(
            userInfo.updated_at,
            "ddd, D MMM, YYYY - h:mm A"
          )}
        </span>
        {getSvg('intuitConnectedOrNot')}

        {intuitConnectedOrNot() === false ? (
          <span>
            {getSvg('intuitConnectedOrNot_false')}

          </span>
        ) : (
          <span onClick={() => disconnectService("intuit")}>
            {getSvg('disconnectService')}

          </span>
        )}
      </Link>
      <div className="syncConnect system">
        <span>
          <strong>System Sync</strong>
          {dataLoadBatchesSuccess.show && (
            <span className="statusIcon">
              {dataLoadBatchesSuccess.status.map((s, index) => {
                return (
                  <span key={Math.random()}>
                    <i
                      aria-describedby={"simple-popover"}
                      onClick={(e) => {
                        setPopoverState((prev) => ({
                          ...prev,
                          open: true,
                          index: index,
                        }));
                        setTimeout(() => {
                          setPopoverState((prev) => ({
                            ...prev,
                            open: false,
                            index: index,
                          }));
                        }, 3500);
                      }}
                      style={{
                        color:
                          s.status === "processed"
                            ? "#0FFF50"
                            : s.status === "failed"
                            ? "#C70039"
                            : "#ffe800",
                      }}
                      className="fas fa-circle"
                    ></i>
                    <span
                      className={`tooltipView ${index === popoverState.index &&
                        popoverState.open === true
                        ? "d-block"
                        : "d-none"
                        }`}
                      id={"simple-popover"}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      onClose={() =>
                        setPopoverState((prev) => ({ ...prev, anchorEl: null }))
                      }
                      anchorEl={popoverState.anchorEl}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                    >
                      Data{" "}
                      {s.status === "processed"
                        ? " successfully loaded "
                        : s.status === "failed"
                        ? "loading failed"
                        : "in progress"}{" "}
                      on: {moment(s.min_load_start).format("lll")}
                    </span>
                  </span>
                );
              })}
            </span>
          )}
        </span>

        {getSvg('refresh')}
        <span onClick={handleDataLoad}>
          <Refresh size={"20"} />
        </span>
      </div>
    </>
  );
};

const TaxFinancialAndBank = ({ props }) => {
  const [companyInfo, setCompanyInfo] = useState({ loaded: false });

  let { setupDashboardAllData, setSetupDashboardAllData, handlSubmit, saveLoading, CompanyInfoAll, setCompanyInfoAll } = props;


  const [form2Data, setForm2Data] = useState({
    HST: "Monthly",
    PST: "Monthly",
    currency: "Canadian Dollar"
  });

  const [form4Data, setForm4Data] = useState({
    trust_bank_accounts: [],
    general_bank_accounts: [],
    credit_card_accounts: [],
  });


  useEffect(() => {
    axios
      .get(`/companyinfo/${getUserSID()}`)
      .then((res) => {
        if (res.data.data.code === 200) {
          setCompanyInfo({
            ...companyInfo,
            loaded: true,
            ...res.data.data.body,
          });
        } else {
          throw res.data.data.status;
        }
      })
      .catch((err) => {
        console.log("err", err);
        setCompanyInfo({ loaded: true, companyInfo: {} });
      });

    const trustAccounts = axios.get(
      `/trust/accounts?uid=${getUserId()}&sid=${getUserSID()}`
    );
    const generalAccounts = axios.get(
      `/general/accounts?uid=${getUserId()}&sid=${getUserSID()}`
    );
    const cardAccounts = axios.get(
      `/card/accounts?uid=${getUserId()}&sid=${getUserSID()}`
    );
    Promise.all([trustAccounts, generalAccounts, cardAccounts])
      .then(([trustAccount, generalAccount, creditAccount]) => {
        const {
          data: {
            data: { body: trustAccountResponse },
          },
        } = trustAccount;
        const {
          data: {
            data: { body: generalAccountResponse },
          },
        } = generalAccount;
        const {
          data: {
            data: { body: creditAccountResponse },
          },
        } = creditAccount;

        setForm4Data({
          trust_bank_accounts: trustAccountResponse,
          general_bank_accounts: generalAccountResponse,
          credit_card_accounts: creditAccountResponse,
        });
      })
      .catch((err) => {
        console.log("err", err);
        alert("Server Error");
      });
  }, []);


  const getCompanyLegalAddress = (type) => {
    try {
      // const { legaladdress } = companyInfo;
      const { legaladdress } = CompanyInfoAll;


      switch (type) {
        case "street":
          return legaladdress?.Line1 + ", " + legaladdress?.PostalCode;

        case "Country":
          return legaladdress?.Country;

        case "Province":
          return legaladdress?.CountrySubDivisionCode;

        default:
          break;
      }
    } catch (error) {
      console.log("err", error);
      return "";
    }
  };

  const showPSTColumns = () => {
    const province = getCompanyLegalAddress("Province");
    if (province) {
      if (
        province === "BC" ||
        province === "SK" ||
        province === "QC" ||
        province === "MB"
      )
        return true;
    }
    return false;
  };

  const refreshAccounts =()=>{

  }

  return (
    <>
      <GetCompanyDetails />
      <form onSubmit={handlSubmit} className="mt-3">
        <strong className="mb-4">Bank Details</strong>
        <div className="tableOuter mt-3">
          <table className="table customGrid">
            <thead className="w-100 heading_row">
              <tr>
                <th>Account type</th>
                <th>Account name</th>
              </tr>
            </thead>
            <tbody>
              {setupDashboardAllData?.bank_account_details?.trust_bank_accounts?.map((e) => {
                if (e.name)
                  return (
                    <tr>
                      <td>Trust Bank</td>
                      <td>{e.name}</td>
                    </tr>
                  );
              })}

              {setupDashboardAllData?.bank_account_details?.general_bank_accounts?.map((e) => {
                if (e.name)
                  return (
                    <tr>
                      <td>General Bank</td>
                      <td>{e.name}</td>
                    </tr>
                  );
              })}

              {setupDashboardAllData?.bank_account_details?.credit_card_accounts?.map((e) => {
                return e.name ? (
                  <tr>
                    <td>Credit Card</td>
                    <td>{e.name}</td>
                  </tr>
                ) : null;
              })}

              {setupDashboardAllData?.bank_account_details?.trust_bank_accounts?.length === 0 && (
                <tr>
                  <td>No Bank Account Yet</td>
                  <td>No Bank Yet</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
        <span className="heading mt-3">Tax & financial Details</span>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Currency</label>
              <select
                className="form-select"
                onChange={(e) => {
                  setForm2Data({
                    ...form2Data,
                    [e.target.name]: e.target.value,
                  });

                  setSetupDashboardAllData((prev) => ({
                    ...prev, financial_text_details: {
                      ...prev.financial_text_details,
                      [e.target.name]: e.target.value,
                    }
                  }))
                }}
                name="currency"
                // value={form2Data.currency}
                value={setupDashboardAllData.financial_text_details.currency}
              >
                <option value="Canadian Dollar">Canadian Dollar</option>
                <option value="USA Dollar">US Dollar</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>HST/GST filing frequency</label>
              <select
                className="form-select"
                onChange={(e) => {
                  setSetupDashboardAllData((prev) => ({
                    ...prev, financial_text_details: {
                      ...prev.financial_text_details,
                      [e.target.name]: e.target.value,
                    }
                  }))

                }}
                name="HST"
                // value={form2Data.HST}
                value={setupDashboardAllData.financial_text_details.HST}
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
          {showPSTColumns() && (
            <div className="col-md-6">
              <div className="form-group">
                <label>Filing frequency for PST</label>
                <div className="d-flex flex-wrap">
                  {["Monthly", "Quarterly", "Semi-annual", "Yearly"].map(
                    (e, index) => {
                      return (
                        <div className="checkboxGroup" key={index}>
                          <label>
                            <input
                              required
                              name="PST"
                              type="radio"
                              checked={setupDashboardAllData?.financial_text_details["PST"] === e}
                              value={e}
                              onChange={(element) => {
                                setSetupDashboardAllData((prev) => ({
                                  ...prev, financial_text_details: {
                                    ...prev.financial_text_details,
                                    [element.target.name]: e,
                                  }
                                }))

                              }}
                            ></input>{" "}
                            {e}
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="col-md-6">
            <div className="form-group">
              <label>Financial year end</label>
              <input
                className="form-control"
                required
                type="text"
                disabled="true"
                value={
                  CompanyInfoAll &&
                  momentFunction.getPreviousMonthFromString(
                    CompanyInfoAll.fiscalstartmonth
                  )
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Annual tax filing date</label>
              <input
                className="form-control"
                required
                type="text"
                disabled="true"
                value={momentFunction.add6Months(CompanyInfoAll.fiscalstartmonth)}
              />
            </div>
          </div>
        </div>
        <div className="btnGroup">

          {/* <button className="btn btnPrimary ms-auto" type="button" onClick={refreshAccounts}>
  <span >
    Refresh
    <Refresh size={"20"} />
  </span>
        </button> */}
          <button class="btn btnPrimary ms-auto" type="submit" >
            {
              saveLoading ?
                <>
                  <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>

                : "Save"
            }

          </button>
        </div>
      </form>
    </>
  );
};

const PayRoll = ({ props }) => {

  let { setupDashboardAllData, setSetupDashboardAllData, handlSubmit, saveLoading } = props;

  const onChangeInput6 = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setSetupDashboardAllData((prev) => ({
      ...prev, payroll: {
        ...prev.payroll,
        [name]: val
      }
    }))
  };

  return (
    <>
      <GetCompanyDetails />
      <form onSubmit={handlSubmit} className="mt-3">
        <strong className="mb-4">Payroll</strong>
        <div className="row mt-3 d-flex align-items-center">
          <div className="col-md-6">
            <div className="form-group">
              <label>What is your payroll frequency?</label>
              <select
                className="form-select"
                onChange={(e) => {
                  if (e.target.value === "Other") {
                    setupDashboardAllData.payroll.payrollFrequency.push({
                      id: 5,
                      name: "Specify",
                    });


                    setSetupDashboardAllData((prev) => ({
                      ...prev, payroll: {
                        ...prev.payroll,

                        [e.target.name]: e.target.value,

                      }
                    }))


                  }
                  else {
                    if (

                      setupDashboardAllData.payroll?.payrollFrequency[
                        setupDashboardAllData?.payroll?.payrollFrequency?.length - 1
                      ].name === "Specify"

                    ) {
                   
                      setupDashboardAllData.payroll.payrollFrequency.pop();
                      

                    }
                  }

                  setSetupDashboardAllData((prev) => ({
                    ...prev, payroll: {
                      ...prev.payroll,
                      [e.target.name]: e.target.value,


                    }
                  }))

                }}
                name="payroll_frequen"
                value={setupDashboardAllData?.payroll?.payroll_frequen}
              >
                <option value="">Choose an option</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-Weekly">Bi-Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Do you pay work insurance for your employees?</label>
              <select
                className="form-select"
                onChange={(e) => {

                  setSetupDashboardAllData((prev) => ({
                    ...prev, payroll: {
                      ...prev.payroll,
                      [e.target.name]: e.target.value,
                    }
                  }))

                }}
                name="billing_frequency"
                value={setupDashboardAllData?.payroll?.billing_frequency}

              >
                <option value="">Choose an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Is a third-party provider engaged in your payroll related work?
              </label>
              <select
                className="form-select"
                onChange={(e) => {

                  setSetupDashboardAllData((prev) => ({
                    ...prev, payroll: {
                      ...prev.payroll,
                      [e.target.name]: e.target.value,
                    }
                  }))

                }}
                name="third_party"
                value={setupDashboardAllData?.payroll?.third_party} >
                <option value="">Choose an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>How are payroll payments made?</label>
                  <select
                    className="form-select"
                    onChange={(e) => {

                      setSetupDashboardAllData((prev) => ({
                        ...prev, payroll:
                        {

                          ...prev.payroll,
                          [e.target.name]: e.target.value,
                        }
                      }))

                    }}
                    value={setupDashboardAllData?.payroll?.direct_payment}
                    name="direct_payment"
                  >
                    <option value="">Choose an option</option>
                    <option value="Direct Debit">Direct Debit</option>
                    <option value="Cheques">Cheques</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Number of Employees on Payroll</label>
                  <input
                    required
                    type="number"
                    className={`form-control ${setupDashboardAllData.payroll.numberOfEmployeesOnPayroll >= 0
                      ? ""
                      : "border_red"
                      }`}
                    min="0"
                    value={setupDashboardAllData.payroll.numberOfEmployeesOnPayroll}
                    onChange={onChangeInput6}
                    name="numberOfEmployeesOnPayroll"
                  />
                  {setupDashboardAllData.payroll.numberOfEmployeesOnPayroll < 0 && (
                    <span className="text-error text">
                      Please enter positive values
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Payroll Number</label>
              <input
                className="form-control"
                required
                type="text"
                value={setupDashboardAllData.firm_details.PayrollNumber}
                onChange={(e) => {
                  setSetupDashboardAllData((prev) => ({
                    ...prev, firm_details: {
                      ...prev.firm_details,
                      PayrollNumber: e.target.value
                    }
                  }))

                }}
              />
            </div>
          </div>
        </div>
        <div className="btnGroup">
          <button class="btn btnPrimary ms-auto" type="submit" >
            {
              saveLoading ?
                <>
                  <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>

                : "Save"
            }


          </button>
        </div>
      </form>
    </>
  );
};

const Invoicing = ({ props }) => {


  let { setupDashboardAllData, setSetupDashboardAllData, handlSubmit, saveLoading } = props;


  return (
    <>
      <GetCompanyDetails />
      <form onSubmit={handlSubmit} className="mt-3">
        <strong className="mb-4">Invoicing</strong>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-group">
              <label>What is your billing arrangement?</label>
              <select
                className="form-select"
                onChange={(e) => {
                  if (e.target.value === "Other") {
                    setupDashboardAllData?.billing_info?.billingArrangement.push({
                      name: "Specify",
                      id: 7,
                    });

                    setSetupDashboardAllData((prev) => ({
                      ...prev,
                      billing_info: {
                        ...prev.billing_info,
                      }
                    }))


                  }
                  else {
                    if (
                      setupDashboardAllData.billing_info.billingArrangement[
                        setupDashboardAllData.billing_info?.billingArrangement?.length - 1
                      ].name === "Specify"
                    ) {
                      setupDashboardAllData?.billing_info?.billingArrangement?.pop();
                      setSetupDashboardAllData((prev) => ({
                        ...prev,
                        billing_info: {
                          ...prev.billing_info,
                        }
                      }))


                    }
                  }

                  setSetupDashboardAllData((prev) => ({
                    ...prev,
                    billing_info: {
                      ...prev.billing_info,
                      [e.target.name]: e.target.value,
                    }
                  }))


                }}
                name="billing_arrangement"
                value={setupDashboardAllData?.billing_info?.billing_arrangement}
              >
                <option value="Choose an option">Choose an option</option>
                {setupDashboardAllData?.billing_info?.billingArrangement?.map((e, index) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>What is your billing frequency?</label>
              <select
                className="form-select"
                onChange={(e) => {
                  if (e.target.value === "Other") {
                    setupDashboardAllData.billing_info.billingFrequency.push({
                      name: "Specify",
                      id: 8,
                    });
                
                    setSetupDashboardAllData((prev) => ({
                      ...prev,
                      billing_info: {
                        ...prev.billing_info,
                        newHeight: prev.billing_info.newHeight + 20
                      }
                    }));



                  } else {
                    if (
                      setupDashboardAllData?.billing_info?.billingFrequency[
                        setupDashboardAllData?.billing_info?.billingFrequency?.length - 1
                      ].name === "Specify"
                    ) {
                      setupDashboardAllData.billing_info.billingFrequency.pop();

                      setSetupDashboardAllData((prev) => ({
                        ...prev,
                        billing_info: {
                          ...prev.billing_info,
                          newHeight: prev.billing_info.newHeight - 20
                        }
                      }));
                    }
                  }
                 

                  setSetupDashboardAllData((prev) => ({
                    ...prev,
                    billing_info: {
                      ...prev.billing_info,

                      [e.target.name]: e.target.value,
                    }
                  }))

                }}
                name="billing_frequency"
                value={setupDashboardAllData?.billing_info?.billing_frequency}
              >
                <option value="Choose an option">Choose an option</option>
                {setupDashboardAllData?.billing_info?.billingArrangement?.map((e, index) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Which application is used for for vendor payments?</label>
              <select
                className="form-select"
                onChange={(e) => {
                  if (e.target.value === "Other") {
                    setupDashboardAllData.billing_info.vendorPayments.push({
                      id: 5,
                      name: "Specify",
                    });
                  
                    setSetupDashboardAllData((prev) => ({
                      ...prev,
                      billing_info: {
                        ...prev.billing_info,
                        newHeight: prev.billing_info.newHeight + 20
                      }
                    }));

                  } else {
                    if (
                      setupDashboardAllData?.billing_info?.vendorPayments[
                        setupDashboardAllData?.billing_info.vendorPayments?.length - 1
                      ].name === "Specify"
                    ) {
                      setupDashboardAllData.billing_info.vendorPayments.pop();

                      setSetupDashboardAllData((prev) => ({
                        ...prev,
                        billing_info: {
                          ...prev.billing_info,
                          vendorPayments: [...prev.billing_info.vendorPayments]
                        }
                      }));

                    }
                  }
                 
                  setSetupDashboardAllData((prev) => ({
                    ...prev, billing_info: {
                      ...prev.billing_info,
                      [e.target.name]: e.target.value,

                    }
                  }));

                }}
                name="vendor_payment"
                value={setupDashboardAllData?.billing_info?.vendor_payment}

              >
                <option value="Choose an option">Choose an option</option>
                {setupDashboardAllData?.billing_info?.vendorPayments?.map((e, index) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Which application is used for revenue collection?</label>
              <select
                className="form-select"
                onChange={(e) => {
                  if (e.target.value === "Other") {
                    setupDashboardAllData.billing_info.revenueCollection.push({
                      id: 5,
                      name: "Specify",
                    });
                    

                    setSetupDashboardAllData((prev) => ({
                      ...prev,
                      billing_info: {
                        ...prev.billing_info,
                        newHeight: prev.billing_info.newHeight + 20
                      }
                    }));

                  } else {
                    if (
                      setupDashboardAllData?.billing_info?.revenueCollection[
                        setupDashboardAllData?.billing_info?.revenueCollection?.length - 1
                      ].name === "Specify"
                    ) {
                      setupDashboardAllData.billing_info.revenueCollection.pop();
                      setupDashboardAllData.billing_info.newHeight = setupDashboardAllData.billing_info.newHeight - 20;

                      setSetupDashboardAllData((prev) => ({
                        ...prev,
                        billing_info: {
                          ...prev.billing_info,
                          newHeight: prev.billing_info.newHeight - 20,
                          revenueCollection: [...prev.billing_info.revenueCollection]
                        }
                      }));

                    }
                  }
                  

                  setSetupDashboardAllData((prev) => ({
                    ...prev,
                    billing_info: {
                      ...prev.billing_info,
                      [e.target.name]: e.target.value
                    }
                  }));

                }}
                name="revenue_collection"
                value={setupDashboardAllData?.billing_info?.revenue_collection}

              >
                <option value="Choose an option">Choose an option</option>
                {setupDashboardAllData?.billing_info?.revenueCollection?.map((e, index) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label>What is the frequency for disbursement recovery?</label>
              <select
                className="form-select"
                onChange={(e) => {
                  if (e.target.value === "Other") {
                    setupDashboardAllData.billing_info.disbursementFrequency.push({
                      name: "Specify",
                      id: 8,
                    });

                    setSetupDashboardAllData((prev) => ({
                      ...prev,
                      billing_info: {
                        ...prev.billing_info,
                        newHeight: prev.billing_info.newHeight + 20
                      }
                    }));

                  } else {
                    if (
                      setupDashboardAllData?.billing_info?.disbursementFrequency[
                        setupDashboardAllData?.billing_info?.disbursementFrequency?.length - 1
                      ].name === "Specify"
                    ) {
                      setupDashboardAllData.billing_info.disbursementFrequency.pop();
                      
                      setSetupDashboardAllData((prev) => ({
                        ...prev,
                        billing_info: {
                          ...prev.billing_info,
                          newHeight: prev.billing_info.newHeight - 20,
                          revenueCollection: [...prev.billing_info.revenueCollection]
                        }
                      }));

                    }
                  }
             

                  setSetupDashboardAllData((prev) => ({
                    ...prev,
                    billing_info: {
                      ...prev.billing_info,
                      [e.target.name]: e.target.value
                    }
                  }));

                }}
                name="disbursement_frequency"
                value={setupDashboardAllData?.billing_info?.disbursement_frequency}

              >
                <option value="Choose an option">Choose an option</option>
                {setupDashboardAllData?.billing_info?.disbursementFrequency?.map((e, index) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="btnGroup">
          <button class="btn btnPrimary ms-auto" type="submit" >
            {
              saveLoading ?
                <>
                  <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>

                : "Save"
            }

          </button>
        </div>
      </form>
    </>
  );
};

const OtherDetails = ({ props }) => {


  let { setCompanyInfoAll , setupDashboardAllData, setSetupDashboardAllData, handlSubmit, saveLoading , CompanyInfoAll  } = props;


  const [form7Data, setForm7Data] = useState({
    month_QBO: "",
    formCompleted: false,
  });

  let fileUploadForm = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`/client/details/${getUserSID()}`)
        .then((res) => {
          const parsingData7 = JSON.parse(res.data.data.body.other_details);
          setForm7Data({ ...form7Data, ...parsingData7 });

          setSetupDashboardAllData((prev) => ({
            ...prev,
            other_details: parsingData7
          }))


        })
        .catch((err) => {
          setForm7Data({ ...form7Data });
          console.log("err", err);
        });
    };

    fetchData();
  }, []);

  const onChangeInput7 = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setSetupDashboardAllData((prev) => ({
      ...prev,
      other_details: {
        ...prev.other_details,
        [name]: val
      }
    }))

  };



  return (
    <>
      <GetCompanyDetails />
      <form
        onSubmit={handlSubmit}
        className="mt-3"
        enctype="multipart/form-data"
        ref={(divElem) => {
          fileUploadForm = divElem;
        }}
      >
        <strong className="mb-4">Other Details</strong>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-group">
              <label>Do you want to receive news from CloudAct?</label>
              <select
                className="form-select"
                value={setupDashboardAllData?.other_details?.revenue_collection}
                onChange={(e) => {

                  setSetupDashboardAllData((prev) => ({
                    ...prev,
                    other_details: {
                      ...prev.other_details,
                      [e.target.name]: e.target.value,
                    }
                  }))

                }}
                name="revenue_collection"
              >
                <option value="">Choose an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Your Preferred Date Format</label>
              <select
                className="form-select"
                onChange={(e) => {
                  setSetupDashboardAllData((prev) => ({
                    ...prev,
                    other_details: {
                      ...prev.other_details,
                      [e.target.name]: e.target.value,
                    }
                  }))

                }}
                name="preferred_date"
                value={setupDashboardAllData?.other_details?.preferred_date}

              >
                <option value="">Choose an option</option>
                <option value="Canadian (mm/dd/yyyy)">
                  Canadian (mm/dd/yyyy)
                </option>
                <option value="USA (mm/dd/yyyy)">USA (mm/dd/yyyy)</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>How long have you been using Quickbooks?</label>
              <input
                required
                type="date"
                name="month_QBO"
                id=""
                value={setupDashboardAllData.other_details.month_QBO}
                onChange={onChangeInput7}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>How long have you been using Clio?</label>
              <input
                className="form-control"
                required
                type="date"
                name="month_clio"
                id=""
                value={setupDashboardAllData.other_details.month_clio}
                onChange={onChangeInput7}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>How are your back-ups being maintained?</label>
              <input
                className="form-control"
                required
                type="text"
                placeholder="eg: local drive, sharepoint"
                value={setupDashboardAllData.other_details.localDriveSharePoint}
                name="localDriveSharePoint"
                onChange={onChangeInput7}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Automated monthly task generation?</label>
              <div >
                <select 
                  onChange={(e)=> {
                      setSetupDashboardAllData((prev)=>({
                        ...prev,
                        two_factor_task : e.target.value
                      })) 

                      setCompanyInfoAll((prev)=>({
                        ...prev,
                        isActive : e.target.value 
                      }))
                    }
                }

                  value={CompanyInfoAll?.isActive}
                  className="form-select"  name="two_factor_task" >
                  <option value="">Choose an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

              </div>
            </div>
          </div>
        </div>

        {setupDashboardAllData?.other_details?.formCompleted && (
          <ModalInputCenter
            heading="Form Saved and Completed!"
            cancelOption="Ok"
            handleClick={
              () => {
                setSetupDashboardAllData((prev) => ({
                  ...prev,
                  other_details: {
                    ...prev.other_details,
                    formCompleted: false
                  }
                }))
              }
            }
            changeShow={() => {

              setSetupDashboardAllData((prev) => ({
                ...prev,
                other_details: {
                  ...prev.other_details,
                  formCompleted: false
                }
              }))
            }}
            show={setupDashboardAllData.other_details.formCompleted}
            action=""
          >
            Onboarding Completed Successfully!
          </ModalInputCenter>
        )}
        <div className="btnGroup">
          <button class="btn btnPrimary ms-auto" type="submit" >
            {
              saveLoading ?
                <>
                  <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>

                : "Save"
            }
          </button>
        </div>
      </form>
    </>
  );
};

const GetCompanyDetails = () => {
  const dispatch = useDispatch();
  const { userRole } = useSelector((state) => state.userChange);
  const [form7Data, setForm7Data] = useState({
    month_QBO: "",
    formCompleted: false,
  });
  const [companyInfo, setCompanyInfo] = useState({});
  const [loading, setloading] = useState(false)
  console.log('companyInfodddf', companyInfo)
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    setloading(false)
    const { short_firmname, display_firmname } = getCurrentUserFromCookies();
    axios
      .get(`/companyinfo/${getUserSID()}`)
      .then((res) => {

        console.log('res.data.data.code', res.data.data)
        if (res.data.data.code === 200) {


          setCompanyInfo((prev) => ({
            ...prev,
            shortName: short_firmname,
            display_firmname,
            ...res.data.data.body,

          }))
        
        }
     
      })
      .catch((err) => {
        console.log("err", err);
        setCompanyInfo({ ...companyInfo, loaded: true, companyInfo: {} });
      }).finally((res) => {
        setloading(true)

      })
  }, []);



  return (
    <div className="userProfilePage pNone">
      <div className="userPhoto">
        {userRole.company_profile_pic ? (
          <img
            src={userRole.company_profile_pic}
            alt={userRole.company_profile_pic}
          ></img>
        ) : (
          <img src={ProfilePic} alt="unknown"></img>
        )}
        <div className="controls">
          <a
            onClick={toggleClass}
            href="javascript:void(0)"
            className="profileControlBtn"
          >
            {getSvg('toggleClass')}

          </a>
          <div className={isActive ? "open controlsView" : "controlsView"}>
            <span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                name="profile_pic"
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    form7Data.photo = URL.createObjectURL(
                      event.target.files[0]
                    );
                  }
                  const formData = new FormData();
                  formData.append(
                    "file",
                    event.target.files[0],
                    event.target.files[0].name
                  );
                  console.log("file name", event.target.files[0]);
                  console.log("form data", formData);
                  axios
                    .post(`/file/upload/${getUserId()}`, formData)
                    .then((res) => {
                      const { data } = res;
                      console.log("data file", data);
                      dispatch(
                        userChangeAction({
                          ...userRole,
                          company_profile_pic: data.data.body.file,
                        })
                      );
                      setForm7Data({
                        ...form7Data,
                        photo: data.data.body.file,
                      });
                      updateInfoInCurrentUser({
                        company_profile_pic: data.data.body.file,
                      });
                    })
                    .catch((err) => {
                      console.log("err", err);
                      alert("Photo size should not be greater than 500KB");
                    });
                }}
                placeholder="Edit Photo"
              ></input>
              {getSvg('Import Image')}

              Import Image
            </span>
            <span
              onClick={async () => {
                setForm7Data({ ...form7Data, photo: "" });
                const {
                  data: { data },
                } = await fetchRequest(
                  "delete",
                  `company/profile/remove/${getUserSID()}`
                );
                if (data.code === 200) {
                  dispatch(
                    userChangeAction({
                      ...userRole,
                      company_profile_pic: null,
                    })
                  );
                  updateInfoInCurrentUser({ company_profile_pic: null });
                }
              }}
            >

              {getSvg('Delete Image')}
              Delete Image
            </span>
          </div>
        </div>
      </div>
      <div className="userInfo">

        <strong>{loading && companyInfo.companyname}</strong>
        <span>{loading && companyInfo.shortName}</span>
        <span>
          {loading && companyInfo.legaladdress?.CountrySubDivisionCode ? companyInfo?.legaladdress?.CountrySubDivisionCode : ""}
          {" "}
          ,{" "}
          {loading && companyInfo.legaladdress?.Country ? companyInfo?.legaladdress.Country : ""}
        </span>
      </div>


    </div>
  );
};

export default SetupDashboard;
