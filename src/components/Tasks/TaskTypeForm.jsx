import  { useEffect, useState } from "react";
import {
  getAllUserInfo,
  getCurrentUserFromCookies,
  getFirmnameForSetup,
  getUserId,
  getUserSID,
  getEndOfDay,
  getMonthFromDigitWithCurrentYear
} from "../../utils/helpers";
import Dropdown from "react-dropdown";
import TaskSelector from "./TaskSelector";
import axios from "../../utils/axios";
import RadioInput from "../LayoutComponents/RadioInput";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import useQuery from "../../hooks/useQuery";
import CreateTaskForm from "./CreateTaskForm";
import ComplianceSelector from "./ComplianceSelector";
import { useDispatch, useSelector } from "react-redux";
import { matterClientsAction } from "../../actions/matterActions";
import createTaskImage from "../../assets/images/createTaskImage.svg";
import moment from "moment";
import { AUTH_ROUTES } from "../../routes/Routes.types";
import ModalInputCenter from "../ModalInputCenter";
import toast from "react-hot-toast"
import { max } from "date-fns";
import { sl } from "date-fns/locale";

const TaskTypeForm = ({ type }) => {
  const [generalAccountList, setGeneralAccountList] = useState([]);
  const [trustAccountList, setTrustAccountList] = useState([]);

  const [creditAccountList, setCreditAccountList] = useState([]);
  const dispatch = useDispatch();
  const [matterDisplayList, setMatterDisplayList] = useState([]);
  const [AllSelectedFiles , setAllSelectedFiles] = useState([]);

  const { data: matterClients } = useSelector((state) => state.matterClients);
  const history = useHistory();
  const query = useQuery();
  const [isFilled, setIsFilled] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    typeOfTask: "",
    taskSelected: "",
    month: "",
    account: "",
    showError: "",
    clientNo: "",
    clientId: "",
    fileNo: [],
    province_form: "",
    clio_trust_account: "",
    clio_trust_account_id: null,
  });


  const [ComplianceFormData , setComplianceFormData] = useState({
    task_name:''
  })

  
  // Create Task
  const [taskInfo, setTaskInfo] = useState({
    description: "",
    taskType: selectedValues.taskSelected,
    preparer: "",
    approver: "",
    showError: "",
    showAlertTask: "",
    monthChecklist: "",
    isComplianceForm: false,
    loadedPreparer: false,
    loadedReviewer: false,
    province_form: "",
    task_account: selectedValues.taskSelected,
    account_id: "",
    task_type_account: "",
    dueDate: null,
  });

  console.log('check taskType accout',taskInfo)


  const [taskDate, settaskDate] = useState({
    task_from: '',
    task_to: ''
  });


  const [complianceFormMonth , setComplianceFormMonth] = useState({
    month:''
  });

  const [selectedClientinfos, setSelectedClientinfos] = useState([]);
  console.log("selectedClientinfos", selectedClientinfos);

  useEffect(() => {
    const getMonthStartEndDates = (date) => {
      const start = moment(date).startOf('month').format('YYYY-MM-DD');
      const end = moment(date).endOf('month').format('YYYY-MM-DD');
      return { start, end };
    };

    if (selectedValues.month) {


      const [month, year] = selectedValues.month.split(' ');

      const { start, end } = getMonthStartEndDates(`${year}-${month}-01`);


      settaskDate({
        task_from: start,
        task_to: end
      })
    }


  }, [selectedValues.month]);

  
  const [preparerList, setPreparerList] = useState([]);
  const [reviewerList, setReviewerList] = useState([]);
  const [allDataFetched, setAllDataFetched] = useState([]);
  const [showWordCountAlert, setShowWordCountAlert] = useState("");

  useEffect(() => {
    const taskType = selectedValues.taskSelected;
    const month = selectedValues.month;
    const account = selectedValues.taskSelected;
    const checklist = selectedValues.typeOfTask;

    const allUsers = axios.get(`/user/list/${getUserSID()}/${getUserId()}/all`);

    const generalAccountAPI = axios.get(
      `/general/accounts?uid=${getUserId()}&sid=${getUserSID()}`
    );
    const trustAccountAPI = axios.get(
      `/trust/accounts?uid=${getUserId()}&sid=${getUserSID()}`
    );

    const cardAccountAPI = axios.get(
      `/card/accounts?uid=${getUserId()}&sid=${getUserSID()}`
    );



    Promise.all([generalAccountAPI, trustAccountAPI, cardAccountAPI, allUsers])
      .then(([...res]) => {

        console.log("trustAccountAPI cardAccountAPI", res[3].data.data.body)
        console.log("trustAccountAPI 12", res[2].data.data.body)

        const preparerList = res[3].data.data.body.map(
          ({ email, role, username }) => {
            if (role === "PREPARER") {
              return username;
            }
            return null;
          }
        );
        console.log("cardAccountAPI>>", preparerList)
        const reviewerList = res[3].data.data.body.map(
          ({ email, role, username }) => {
            if (role === "REVIEWER") {
              return username;
            }
            return null;
          }
        );

        setPreparerList(preparerList.filter((e) => e !== null));
        setReviewerList(reviewerList.filter((e) => e !== null));
        setTaskInfo({
          ...taskInfo,
          loadedPreparer: true,
          loadedReviewer: true,
          taskType: taskType?.toUpperCase(),
          task_account: account,
          isComplianceForm: checklist === "Compliance Form" ? true : false,
          monthChecklist: month,
        });

        console.log("all users", ...res[3].data.data.body);

        setAllDataFetched([...allDataFetched, ...res[3].data.data.body]);
      })
      .catch((err) => {
        console.log("err all accounts", err);
        setTaskInfo({
          ...taskInfo,
          loadedPreparer: false,
          loadedReviewer: false,
        });

        setAllDataFetched([]);
      });
  }, [
    selectedValues.month,
    selectedValues.taskSelected,
    selectedValues.typeOfTask,
    selectedValues.taskSelected,
  ]);

  //task create function
  const handleSubmit = (e) => {
    e.preventDefault();

    let preparerName = allDataFetched.filter((e) => {
      return e.username.trim() === taskInfo.preparer;
    });

    let approverName = allDataFetched.filter((e) => {
      return e.username.trim() === taskInfo.approver;
    });

    if (
      taskInfo.taskType &&
      taskInfo.monthChecklist &&
      taskInfo.task_account &&
      taskInfo.description &&
      selectedValues.account &&
      preparerName.length &&
      approverName.length &&
      taskDate.task_from &&
      taskDate.task_to &&
      taskInfo.dueDate
    ) {
      const obj = {
        task_created_by: getUserId(),
        sid: getUserSID(),

        task_type: taskInfo.taskType == 'GENERAL ACCOUNT' ? 'General A/C checklist' :
        taskInfo.taskType == 'TRUST ACCOUNT' ? 'Trust A/C checklist' :
        "Credit card checklist",

        task_month: taskInfo.monthChecklist,
        task_from: new Date(taskDate.task_from).toISOString(),
        task_to: getEndOfDay(new Date(taskDate.task_to)),
        task_due_date: new Date(taskInfo.dueDate).toISOString(),
        task_description: `${taskInfo.description.replace(/['"]+/g, "")}`,
        task_preparer: preparerName[0]
          ? preparerName[0].uid
          : getAllUserInfo().id,
        task_approverer: approverName[0]
          ? approverName[0].uid
          : getAllUserInfo().id,
        task_approverer_name: !taskInfo.approver
          ? getAllUserInfo().username
          : taskInfo.approver,
        task_preparer_name: !taskInfo.preparer
          ? getAllUserInfo().username
          : taskInfo.preparer,
        task_type_account: selectedValues.account,
        task_account: selectedValues.account,
        task_version: 1,
        client_id: query.get("clientId") ? parseInt(query.get("clientId")) : "",
        isComplianceForm:
          query.get("checklist") === "Compliance Form" ? true : false,
        province_form: query.get("provinceForm") || '',
        clio_trust_account: query.get("clio_trust_account") || "",
        client_files_details : "",
        client_all_info : "",
        destinationFiles:"",
      };
      axios
        .post("/create/task", obj)
        .then((res) => {
          if (res.data.data.code !== 200) {
            setTaskInfo({
              ...taskInfo,
              showError: res.data.data.message,
              showAlertTask: res.data.data.message,
            });
          } else {
            history?.push(
              type === "MONTHLY_FORM"
                ? AUTH_ROUTES.MONTHLY_CHECKLIST_TABLE
                : AUTH_ROUTES.COMPLIANCE_CHECKLIST_TABLE
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      setTaskInfo({
        ...taskInfo,
        showError: "Please Fill all the Details Above",
      });
    }
  };

  //compliance create function
  const handleComplianceFormSubmit=(e)=>{

    e.preventDefault();


    let preparerName = allDataFetched.filter((e) => {
      return e.username.trim() === taskInfo.preparer;
    });

    let approverName = allDataFetched.filter((e) => {
      return e.username.trim() === taskInfo.approver;
    });

    // in selectedClientinfos have filter those value which exist in 
    // complianceState other are moved 

    const complianceClientIds = complianceState.map(item => Number(item.client.client_id));
  
    let clientAllInfo = selectedClientinfos.filter((e) => {
      return complianceClientIds.includes(e.client_id);
    });

    console.log("AllSelectedFiles",AllSelectedFiles)

   
    if (
      taskInfo.taskType &&
      taskInfo.task_account &&
      taskInfo.description &&
      selectedValues.taskSelected &&
      preparerName.length &&
      approverName.length &&
      taskInfo.dueDate &&
      ComplianceFormData.task_name
    ) {
      const obj = {
        task_created_by: getUserId(),
        sid: getUserSID(),
        task_type: selectedValues.taskSelected.toUpperCase(),
        task_month: getMonthFromDigitWithCurrentYear( new Date().getMonth() + 1) ,
        task_from : new Date(Date.now()).toISOString(),
        task_to: getEndOfDay(new Date(Date.now())),
        task_name:ComplianceFormData.task_name,
        client_matter:selectedValues.clientNo,
        task_description: `${taskInfo.description.replace(/['"]+/g, "")}`,
        task_preparer: preparerName[0]
          ? preparerName[0].uid
          : getAllUserInfo().id,
        task_approverer: approverName[0]
          ? approverName[0].uid
          : getAllUserInfo().id,
        task_approverer_name: !taskInfo.approver
          ? getAllUserInfo().username
          : taskInfo.approver,
        task_preparer_name: !taskInfo.preparer
          ? getAllUserInfo().username
          : taskInfo.preparer,
        task_account: selectedValues.fileNo,
        task_type_account: selectedValues.clio_trust_account,
        task_version: 1,
        client_id: selectedValues.clientId ?  selectedValues.clientId : '00',
        isComplianceForm:true,
        province_form: query.get("provinceForm"),
        clio_trust_account: selectedValues.clio_trust_account_id,
        task_due_date: new Date(taskInfo.dueDate).toISOString(),
        client_files_details : JSON.stringify(complianceState),
        client_all_info : JSON.stringify(clientAllInfo),
        destinationFiles : JSON.stringify(AllSelectedFiles)
      };


      console.log('myobj' , obj)
      axios
        .post("/create/task", obj)
        .then((res) => {
          if (res.data.data.code !== 200) {
            setTaskInfo({
              ...taskInfo,
              showError: res.data.data.message,
              showAlertTask: res.data.data.message,
            });
          } else {
            history.push(
              type === "MONTHLY_FORM"
                ? AUTH_ROUTES.MONTHLY_CHECKLIST_TABLE
                : AUTH_ROUTES.COMPLIANCE_CHECKLIST_TABLE
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }else {
      setTaskInfo({
        ...taskInfo,
        showError: "Please Fill all the Details Above",
      });
    }
  }

  // End of Create Task

  const checkSelection = () => {
    const { typeOfTask, taskSelected, month, account, clientNo, fileNo } =
      selectedValues;
    if (typeOfTask === "Compliance Form") {
      return (
        typeOfTask !== "" &&
        taskSelected !== "" &&
        clientNo !== "" &&
        fileNo !== ""
      );
    } else {
      return (
        typeOfTask !== "" &&
        taskSelected !== "" &&
        month !== "" &&
        account !== ""
      );
    }
  };

  const emptyStateForSelectedValues = {
    taskSelected: "",
    month: "",
    account: "",
    showError: "",
    clientNo: "",
    fileNo: "",
  };

  useEffect(() => {
    if (query.get("checklist") !== null && query.get("month") !== null) {
      console.log("query", query.get("checklist"));
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [query, history?.location?.search]);

  useEffect(() => {
    if (selectedValues.clientNo) {
      const getMatterDisplayNumbers = async () => {
        try {
          const {
            data: {
              data: { body },
            },
          } = await axios.get(
            `/matterdisplayNumber/${getUserSID()}/${selectedValues.clientId}`
          );

          if (body) {
            // setMatterDisplayList(body);
            console.log("before b body", body);


            const uniqueBody = [...new Set(body)];
            console.log("after sort body", uniqueBody);


            setMatterDisplayList(uniqueBody);
            setAllSelectedFiles((prev)=>[...prev , ...uniqueBody])

          }
        } catch (error) {
          console.log("err", error);
          alert("Error fetching matter display Number");
        }
      };
      getMatterDisplayNumbers();

      const getClientInfowithClientID = async () => {
        console.log("client id in new fun", selectedValues.clientId);

        try {
          const myres = await axios.get(
            `/getClientInfowithClientID/${getUserSID()}/${selectedValues.clientId}`
          );

          if(myres?.data?.data?.body.length !== 0){

            setSelectedClientinfos((prev)=>([...prev, myres?.data?.data?.body[0]]))
          }

        } catch (error) {
          console.log("err", error);
          alert("Error fetching getClientInfowithClientID");
        }

        

      };
      getClientInfowithClientID();


    }
  }, [selectedValues.clientNo, selectedValues.clientId]);

  useEffect(() => {
    const getTrustAccountNumbers = async () => {
      try {
        const {
          data: {
            data: { body },
          },
        } = await axios.get(`/clio-accounts/${getUserSID()}/Trust`);

        if (body) {
          console.log("trust account Number", body);
          setAccountsList(body);
        }
      } catch (error) {
        console.log("err", error);
        alert("Error fetching Trust account Number");
      }
    };
    getTrustAccountNumbers();
  }, []);

  useEffect(() => {
    const allUsers = axios.get(`/user/list/${getUserSID()}/${getUserId()}`);

    dispatch(matterClientsAction());
    const generalAccountAPI = axios.get(
      `/general/accounts?uid=${getUserId()}&sid=${getUserSID()}`
    );
    const trustAccountAPI = axios.get(
      `/trust/accounts?uid=${getUserId()}&sid=${getUserSID()}`
    );



    const cardAccountAPI = axios.get(
      `/card/accounts?uid=${getUserId()}&sid=${getUserSID()}`
    );

    Promise.all([generalAccountAPI, trustAccountAPI, cardAccountAPI, allUsers])
      .then(([...res]) => {
        console.log("res all accounts", res);

        const generalAccounts = res[0].data.data.body.map((element) => element);
        const trustAccounts = res[1].data.data.body.map((element) => element);

        const cardAccounts = res[2].data.data.body.map((element) => element);

        setGeneralAccountList(generalAccounts);
        setTrustAccountList(trustAccounts);

        setCreditAccountList(cardAccounts);
      })
      .catch((err) => {
        console.log("err all accounts", err);
        alert("Error fetching all accounts");
      });
  }, [dispatch]);

  const onChangeDropFunc = (param, e) => {

    if (param === "month") {
      setSelectedValues({ ...selectedValues, month: e });
    } else {
      setSelectedValues({ ...selectedValues, account: e });
    }
  };

  console.log("selectedValues", selectedValues)

  const dropdownValue = (param, type) => {
    if (param === "month" && type === selectedValues.taskSelected) {
      return selectedValues.month;
    } else if (param === "account" && type === selectedValues.taskSelected) {
      return selectedValues.account;
    } else {
      return "";
    }
  };

  const changeInputValue = (params, e) => {
    if (params === "ClientNo") {
      return setSelectedValues({
        ...selectedValues,
        clientNo: e?.client_name,
        clientId: e?.client_id,
        fileNo: "",
      });
    } else if (params === "FileNo") {
      console.log("change input value", params, e);
      return setSelectedValues({ ...selectedValues, fileNo: e });
    } else if (params === "cliotrustAccount") {
      console.log("clio trust ", e);
      return setSelectedValues({
        ...selectedValues,
        clio_trust_account: e.account_name,
        clio_trust_account_id: e.bank_account_id,
      });
    } else {
      return "";
    }
  };

  const getInputValue = (params, type) => {
    if (params === "ClientNo" && type) {
      return selectedValues.clientNo;
    } else if (params === "FileNo" && type) {
      return selectedValues.fileNo;
    } else {
      return "";
    }
  };


  let complianceFormParent = {
    month : complianceFormMonth.month,
    task_from : taskDate.task_from ,
    task_to: taskDate.task_to 
  }


  
  const [complianceState , setcomplianceState  ] = useState([{ client: {}, fileNumber: [] }]);
  console.log("complianceFormParent", complianceState)

  return (
    <>
      {!isFilled ? (
        <>
          <div className="outerTitle">
            <div className="pHead p-0" style={{ minHeight: "60px" }}>
              <span className="h5">
                <svg
                  width="36"
                  height="34"
                  viewBox="0 0 36 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    opacity="0.4"
                    d="M5.03711 5.86914V32.922H30.9627C33.4529 32.922 35.4716 30.9033 35.4716 28.4132V5.86914H5.03711Z"
                    fill="#73C3FD"
                  ></path>{" "}
                  <path
                    d="M26.454 28.4131H0.52832C0.52832 30.9032 2.547 32.9219 5.03713 32.9219H30.9628C28.4726 32.9219 26.454 30.9032 26.454 28.4131Z"
                    fill="#73C3FD"
                  ></path>{" "}
                  <path
                    opacity="0.5"
                    d="M13.7731 6.71413C15.3294 6.71413 16.5911 5.45247 16.5911 3.89613C16.5911 2.33979 15.3294 1.07812 13.7731 1.07812C12.2167 1.07812 10.9551 2.33979 10.9551 3.89613C10.9551 5.45247 12.2167 6.71413 13.7731 6.71413Z"
                    fill="#F6BD3D"
                  ></path>{" "}
                  <path
                    d="M15.1821 5.30546C13.6258 5.30546 12.3641 4.04377 12.3641 2.48745C12.3641 2.07405 12.4538 1.68185 12.6138 1.32812C11.6359 1.77027 10.9551 2.75354 10.9551 3.89645C10.9551 5.45277 12.2168 6.71446 13.7731 6.71446C14.916 6.71446 15.8993 6.03363 16.3414 5.05578C15.9877 5.2157 15.5955 5.30546 15.1821 5.30546Z"
                    fill="#F6BD3D"
                  ></path>{" "}
                  <path
                    d="M35.4716 5.34041H31.5203C31.2285 5.34041 30.9919 5.57698 30.9919 5.86879C30.9919 6.16059 31.2285 6.39716 31.5203 6.39716H34.9432V28.4128C34.9432 30.6076 33.1576 32.3932 30.9628 32.3932C28.768 32.3932 26.9824 30.6076 26.9824 28.4128C26.9824 28.121 26.7458 27.8844 26.454 27.8844H13.7669C13.4751 27.8844 13.2385 28.121 13.2385 28.4128C13.2385 28.7046 13.4751 28.9412 13.7669 28.9412H25.9532C26.0997 30.3415 26.8224 31.5727 27.8791 32.3932H5.03718C3.02146 32.3932 1.35088 30.8872 1.09169 28.9412H11.2368C11.5286 28.9412 11.7652 28.7046 11.7652 28.4128C11.7652 28.121 11.5286 27.8844 11.2368 27.8844H5.56556V6.39716H11.553C12.1442 6.92258 12.9217 7.24256 13.773 7.24256C14.5053 7.24256 15.1829 7.0055 15.7345 6.60492L18.7536 9.62399C18.8567 9.72713 18.992 9.77877 19.1272 9.77877C19.2624 9.77877 19.3977 9.7272 19.5008 9.62399C19.7071 9.41764 19.7071 9.08307 19.5008 8.87679L17.0212 6.39716H29.0392C29.331 6.39716 29.5676 6.16059 29.5676 5.86879C29.5676 5.57698 29.331 5.34041 29.0392 5.34041H16.7913C17.0014 4.90292 17.1194 4.41308 17.1194 3.89618C17.1194 2.05103 15.6182 0.549805 13.773 0.549805C11.9278 0.549805 10.4266 2.05103 10.4266 3.89618C10.4266 4.41308 10.5445 4.90292 10.7547 5.34041H5.03718C4.74538 5.34041 4.50881 5.57698 4.50881 5.86879V27.8844H0.528376C0.236571 27.8844 0 28.121 0 28.4128C0 31.1903 2.25969 33.45 5.03718 33.45H30.9628C33.7403 33.45 36 31.1903 36 28.4128V5.86879C36 5.57698 35.7634 5.34041 35.4716 5.34041ZM13.773 1.60656C15.0355 1.60656 16.0626 2.63372 16.0626 3.89618C16.0626 4.47345 15.8474 5.00105 15.4937 5.40424C15.4871 5.40783 15.481 5.41199 15.4746 5.41586C15.4671 5.4203 15.4596 5.42453 15.4523 5.42939C15.4442 5.43481 15.4366 5.4408 15.4288 5.44665C15.4228 5.45116 15.4166 5.45532 15.4107 5.46011C15.3838 5.48223 15.359 5.50696 15.3369 5.53394C15.332 5.54 15.3276 5.54634 15.323 5.55254C15.3173 5.56007 15.3114 5.56747 15.3061 5.57536C15.3011 5.5829 15.2967 5.59079 15.292 5.59854C15.2884 5.60467 15.2844 5.61052 15.281 5.61679C14.8779 5.97066 14.3503 6.18581 13.773 6.18581C12.5105 6.18581 11.4834 5.15865 11.4834 3.89618C11.4834 2.63372 12.5105 1.60656 13.773 1.60656Z"
                    fill="#171D34"
                  ></path>{" "}
                  <path
                    d="M14.0194 14.8868C14.0194 14.595 13.7828 14.3584 13.491 14.3584H10.1094C9.81763 14.3584 9.58105 14.595 9.58105 14.8868C9.58105 15.1786 9.81763 15.4151 10.1094 15.4151H11.2736C11.2728 15.4268 11.2719 15.4385 11.2719 15.4504V19.3956C11.2719 19.6874 11.5084 19.924 11.8002 19.924C12.092 19.924 12.3286 19.6874 12.3286 19.3956V15.4504C12.3286 15.4385 12.3276 15.4268 12.3268 15.4151H13.491C13.7828 15.4151 14.0194 15.1786 14.0194 14.8868Z"
                    fill="#171D34"
                  ></path>{" "}
                  <path
                    d="M16.309 19.924C17.5327 19.924 18.5282 18.6756 18.5282 17.1412C18.5282 15.6068 17.5327 14.3584 16.309 14.3584C15.0854 14.3584 14.0898 15.6068 14.0898 17.1412C14.0898 18.6756 15.0854 19.924 16.309 19.924ZM16.309 15.4151C16.9391 15.4151 17.4714 16.2056 17.4714 17.1412C17.4714 18.0768 16.9391 18.8672 16.309 18.8672C15.6789 18.8672 15.1466 18.0768 15.1466 17.1412C15.1466 16.2056 15.6789 15.4151 16.309 15.4151Z"
                    fill="#171D34"
                  ></path>{" "}
                  <path
                    d="M26.4893 17.1412C26.4893 18.6756 27.4848 19.924 28.7084 19.924C29.9321 19.924 30.9276 18.6756 30.9276 17.1412C30.9276 15.6068 29.9321 14.3584 28.7084 14.3584C27.4848 14.3584 26.4893 15.6068 26.4893 17.1412ZM29.8709 17.1412C29.8709 18.0768 29.3385 18.8672 28.7084 18.8672C28.0783 18.8672 27.546 18.0768 27.546 17.1412C27.546 16.2056 28.0783 15.4151 28.7084 15.4151C29.3385 15.4151 29.8709 16.2056 29.8709 17.1412Z"
                    fill="#171D34"
                  ></path>{" "}
                  <path
                    d="M25.2919 17.1403C25.2919 14.4691 21.6249 13.8271 21.4688 13.8011C21.3156 13.7756 21.1588 13.8187 21.0403 13.9191C20.9219 14.0195 20.8535 14.167 20.8535 14.3223V19.3947C20.8535 19.6865 21.0901 19.9231 21.3819 19.9231C22.7343 19.9231 25.2919 19.3415 25.2919 17.1403ZM21.9103 14.996C22.7726 15.2551 24.2351 15.8803 24.2351 17.1403C24.2351 18.3774 22.7351 18.7281 21.9103 18.8273V14.996Z"
                    fill="#171D34"
                  ></path>{" "}
                  <path
                    d="M26.9821 22.2129C26.9821 21.9211 26.7455 21.6846 26.4537 21.6846H15.1817C14.8899 21.6846 14.6533 21.9211 14.6533 22.2129C14.6533 22.5048 14.8899 22.7413 15.1817 22.7413H26.4537C26.7455 22.7413 26.9821 22.5048 26.9821 22.2129Z"
                    fill="#171D34"
                  ></path>{" "}
                  <path
                    d="M16.3096 24.5029C16.0178 24.5029 15.7812 24.7395 15.7812 25.0313C15.7812 25.3231 16.0178 25.5597 16.3096 25.5597H23.6364C23.9282 25.5597 24.1648 25.3231 24.1648 25.0313C24.1648 24.7395 23.9282 24.5029 23.6364 24.5029H16.3096Z"
                    fill="#171D34"
                  ></path>{" "}
                </svg>{" "}
                Add Task
              </span>
            </div>
          </div>
          <div className="panel Hauto addTaskPanel">
            <div className="pBody">
             
              <div className="row align-items-center">
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="pHead pt-0">
                        <span className="h5">
                          <svg
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <g clip-path="url(#clip0_1081_42459)">
                              {" "}
                              <path
                                d="M16.2184 0.880386C15.8462 0.30999 15.2251 -4.11961e-05 14.5913 4.1058e-09C14.2277 2.06042e-05 13.8598 0.102116 13.5325 0.315656L8.89015 3.34498C7.99252 3.93072 7.73967 5.13323 8.32542 6.03086L9.99923 8.59595L17.8922 3.44547L16.2184 0.880386Z"
                                fill="#73C3FD"
                              />{" "}
                              <path
                                d="M16.3526 7.28929L12.6609 9.69806L11.2988 10.587C11.3223 10.623 11.3602 10.6813 11.4117 10.7604C11.4865 10.8752 11.5895 11.0338 11.7174 11.2305C12.8257 12.9356 15.7981 17.5131 18.3605 21.4574C19.2406 22.8123 20.0724 24.0924 20.7635 25.1556C21.5235 26.3248 22.1135 27.2318 22.4111 27.6879C22.4328 27.7013 27.4668 30.7827 30.1461 32.4226C30.2991 32.5162 30.4619 32.5586 30.6197 32.5586C31.0189 32.5586 31.3878 32.2883 31.4985 31.8965C31.5308 31.7816 31.5409 31.6561 31.523 31.5241C31.5123 31.4454 31.5013 31.3648 31.4902 31.2826C31.3946 30.5775 31.283 29.7537 31.167 28.8984V28.8982C31.153 28.7964 31.1392 28.694 31.1254 28.5912V28.591C30.7319 25.6907 30.3067 22.5558 30.3043 22.5375C30.1432 22.2905 28.1755 19.2623 25.9393 15.8208C25.1497 14.6058 24.3267 13.3391 23.538 12.1252C21.2487 8.60173 19.248 5.52263 19.192 5.43652L18.3426 5.99087L17.8729 6.29719L16.3526 7.28929ZM28.2958 23.8709C28.3236 23.8633 28.3516 23.8592 28.3796 23.858H28.3798C28.3854 23.8577 28.3907 23.8575 28.3963 23.8575C28.5784 23.8575 28.7504 23.9861 28.7834 24.1857L28.792 24.2374L29.4096 27.9646V27.9648L29.5213 28.6372L29.6694 29.5314C29.7116 29.7865 29.507 29.9879 29.2813 29.9879C29.2102 29.9879 29.1371 29.9679 29.0687 29.9234L24.5321 26.9597C24.3315 26.8287 24.301 26.5597 24.4407 26.3866L28.2958 23.8709Z"
                                fill="#73C3FD"
                              />{" "}
                              <path
                                d="M38.7594 36.2985C38.6959 36.1226 38.6125 35.9508 38.5093 35.7843C38.0907 35.1093 37.3474 34.5255 36.2989 34.1351C35.3777 33.7968 34.3334 33.6396 33.304 33.6396C32.7441 33.6396 32.1885 33.6862 31.6593 33.7752C34.9288 34.2974 36.7988 35.5614 37.1085 36.5787C37.1684 36.7754 37.1699 36.9629 37.1118 37.134C37.1066 37.1489 37.1011 37.1635 37.0951 37.1781C36.9513 37.5347 36.5795 37.8293 36.2511 38.0254C35.4778 38.492 34.1142 38.924 32.1976 38.924C32.0474 38.924 31.8938 38.9213 31.7368 38.9157C29.3591 38.8175 27.1733 38.7682 25.2305 38.7528C24.7655 38.7491 24.3144 38.7474 23.8781 38.7474C22.9941 38.7474 22.1703 38.7547 21.4122 38.7672C19.6561 38.7961 18.253 38.8539 17.2745 38.9195C13.6571 39.1613 10.5111 40.8561 10.297 43.3194C10.1998 44.41 10.7074 45.3673 11.5351 46.0765C12.3107 46.7366 13.3172 47.1675 14.374 47.4228C14.8062 47.5276 15.2466 47.6028 15.6831 47.6525C16.0997 47.6998 16.5127 47.7239 16.9113 47.7279C16.9261 47.7279 16.9416 47.7281 16.9577 47.7281C18.2557 47.7281 24.2655 47.2001 27.0002 46.8412C25.9315 46.7104 24.7008 46.5887 23.4366 46.4782C21.5472 46.3132 19.5827 46.174 17.971 46.0685C17.8109 46.0588 17.6537 46.0463 17.4999 46.031C15.8016 45.8629 14.49 45.3728 13.6816 44.844C13.4608 44.6996 13.2777 44.5523 13.1343 44.4079C12.8961 44.1679 12.768 43.9358 12.7612 43.738C12.7528 43.4923 12.9685 43.2475 13.1539 43.0858C13.3104 42.9486 13.4942 42.825 13.6913 42.7152C14.0077 42.5389 14.3588 42.3978 14.6884 42.2913C14.739 42.275 14.7893 42.2596 14.8389 42.2447C15.8067 41.9559 16.4812 41.8778 17.9003 41.8729C18.117 41.8723 18.3239 41.8719 18.5224 41.8719C19.6971 41.8719 20.5841 41.883 21.5245 41.883C22.0205 41.883 22.5312 41.8799 23.1066 41.8704C23.9075 41.857 24.8932 41.8362 25.9189 41.8119C27.5644 41.7728 29.3126 41.7242 30.5634 41.6803C31.3431 41.6529 31.9298 41.6275 32.1778 41.6074C33.3028 41.5161 34.457 41.2765 35.507 40.861C35.8502 40.7253 36.1823 40.5708 36.4985 40.3965C36.9717 40.1344 37.3734 39.8473 37.7053 39.5432C38.8061 38.5355 39.1374 37.346 38.7594 36.2985Z"
                                fill="#73C3FD"
                              />{" "}
                              <path
                                d="M8.579 10.7772C8.67457 10.8896 8.81084 10.9594 8.95788 10.9713C8.99651 10.9744 9.03505 10.9735 9.07289 10.9687C9.17917 10.9552 9.28015 10.9111 9.36303 10.8406L16.5431 4.73545C16.7771 4.53648 16.8055 4.18545 16.6065 3.95143L14.6224 1.61804C14.0739 0.972887 13.2443 0.651567 12.4035 0.758522L12.4385 1.0344L12.4736 1.31028L12.4385 1.0344L12.4034 0.758522C11.9227 0.819684 11.473 1.01843 11.1027 1.33327L6.87966 4.92413C6.37156 5.35618 6.06211 5.96021 6.00832 6.625C5.95453 7.28978 6.16284 7.93572 6.59489 8.44382L8.579 10.7772ZM7.24 5.34785L11.4631 1.75699C11.7607 1.50387 12.1128 1.35619 12.4735 1.31028C13.1023 1.23026 13.7575 1.45946 14.1987 1.97832L16.1828 4.31171L9.00275 10.4169L7.01867 8.0835C6.32435 7.26698 6.42343 6.04218 7.24 5.34785Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M20.7612 25.1568C21.9422 26.551 22.8766 27.6533 23.2999 28.1512C23.3529 28.2137 23.419 28.2635 23.4936 28.2973C23.5169 28.3078 28.3945 30.5023 31.4961 31.8978C31.5878 31.939 31.6776 31.9794 31.766 32.0191C32.0148 32.131 32.2863 32.1724 32.5512 32.1388C32.9717 32.0852 33.3495 31.8508 33.5882 31.4957C33.8256 31.1424 33.895 30.7188 33.7839 30.3031C32.7185 26.3185 31.4471 21.5635 31.4405 21.5394C31.4191 21.4607 31.3803 21.3876 31.3276 21.3254C31.0752 21.0286 27.0522 16.2788 23.5356 12.1264C24.3244 13.3404 25.1474 14.6071 25.937 15.8221C28.501 18.8499 30.7178 21.4671 30.9038 21.6857C30.9104 21.7102 32.4351 27.4123 33.2465 30.4469C33.3983 31.0145 32.9933 31.5218 32.481 31.5869C32.3244 31.6069 32.1578 31.5855 31.9942 31.5117C31.8329 31.4392 31.6638 31.363 31.4879 31.2839C28.5406 29.9581 23.7457 27.8008 23.7237 27.7909C22.993 26.9317 20.7742 24.312 18.3582 21.4587C14.8562 17.323 10.9403 12.6966 10.5425 12.2288L11.7151 11.2318L16.3503 7.29056L17.7227 6.12356C17.7317 6.13407 17.7826 6.19443 17.8706 6.29846L18.3403 5.99213C18.2241 5.85494 18.1569 5.77563 18.1464 5.76327C18.0199 5.61453 17.8321 5.54882 17.6518 5.57189C17.5484 5.58487 17.4477 5.62731 17.3624 5.69982L12.6585 9.69933L11.4094 10.7617L10.1822 11.8051C10.0697 11.9007 9.9999 12.0368 9.98816 12.1839C9.97621 12.331 10.0232 12.4766 10.1188 12.5891C10.374 12.8893 12.0626 14.8838 14.2003 17.4087C16.2854 19.8717 18.8472 22.8976 20.7612 25.1568Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M31.1564 28.7032L31.123 28.5918C31.1368 28.6946 31.1507 28.797 31.1647 28.8987C31.1783 28.8378 31.1768 28.7712 31.1564 28.7032Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M28.7795 24.1866C28.7465 23.9869 28.5745 23.8584 28.3924 23.8584C28.3868 23.8584 28.3815 23.8586 28.3759 23.8588H28.3757L25.5712 26.2435C25.4544 26.4328 25.5187 26.6961 25.7342 26.8005L29.5174 28.638L29.4057 27.9656V27.9654L26.2228 26.4196L28.7881 24.2383L28.7795 24.1866Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M14.6869 42.2908C15.8234 41.0037 17.8057 40.0174 20.046 39.579C21.2029 39.3526 22.9702 39.0595 25.229 38.7523C25.6601 38.6938 26.109 38.6347 26.5752 38.5754C28.8169 38.2903 31.4539 38.0017 34.3923 37.7507C34.5487 37.7363 34.7013 37.7196 34.8505 37.7007C35.7256 37.5894 36.4727 37.4022 37.0936 37.1777C37.8216 36.9146 38.3756 36.6004 38.7579 36.298L38.7581 36.2978C39.0714 36.0523 39.4181 35.6947 39.4993 35.3051C39.7216 34.2125 37.6162 32.7869 33.6668 32.6609C34.1803 32.5058 34.7256 32.3896 35.2812 32.3189C36.3024 32.1891 37.3581 32.2132 38.3146 32.4324C41.7533 33.2371 42.4171 36.3382 39.3026 38.6188C38.8135 38.9756 38.273 39.2832 37.7038 39.5428C37.3719 39.8468 36.9702 40.134 36.497 40.396C36.1808 40.5703 35.8487 40.7248 35.5055 40.8605C36.6614 40.5973 38.2464 40.0779 39.6305 39.0681C40.4693 38.4538 41.0843 37.7652 41.4594 37.0203C41.8285 36.2871 41.946 35.5193 41.7993 34.7998C41.6586 34.1089 41.2767 33.4775 40.6953 32.9742C40.1113 32.4687 39.353 32.1043 38.4413 31.8908C38.4406 31.8908 38.4398 31.8906 38.439 31.8904C37.4597 31.6657 36.3433 31.6233 35.2112 31.7672C34.628 31.8414 34.0543 31.9629 33.5059 32.1286C33.2451 32.2073 33.0797 32.4633 33.1153 32.7334C33.1507 33.0035 33.3767 33.2082 33.6491 33.2169C34.9656 33.2589 36.166 33.4567 37.1204 33.7889C38.184 34.1593 38.6283 34.5757 38.7985 34.7907C38.8689 34.8799 38.9826 35.0503 38.9546 35.1928C38.9196 35.3568 38.7552 35.5731 38.5078 35.7839C38.4781 35.8094 38.4472 35.8347 38.4151 35.8599C38.4143 35.8605 38.4137 35.8611 38.4128 35.8617C38.2099 36.0222 37.7922 36.3073 37.107 36.5782C36.531 36.8058 35.7657 37.0236 34.7802 37.1488C34.637 37.1671 34.49 37.1832 34.3431 37.1966C31.6418 37.4273 29.0048 37.7056 26.505 38.0235C24.6417 38.2604 22.8643 38.5204 21.4108 38.7667C20.8714 38.858 20.377 38.9474 19.9391 39.0331C18.0742 39.3981 16.3722 40.1321 15.1469 41.0997C14.5219 41.5933 14.032 42.1361 13.6898 42.7148C13.6756 42.7382 13.662 42.7617 13.6486 42.7854C13.3508 43.3101 13.1779 43.8539 13.1328 44.4075C13.2762 44.5519 13.4593 44.6992 13.6802 44.8436C13.6797 44.8372 13.6795 44.8306 13.6793 44.8242C13.6429 43.9091 14.0186 43.0481 14.6869 42.2908Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M30.6893 45.6541C28.5407 45.6644 25.4838 45.79 21.6034 46.0278C21.6026 46.0278 21.6017 46.0277 21.6009 46.028C20.2724 46.1155 18.9931 45.9729 17.9988 45.6265C17.5989 45.4872 17.2594 45.3193 17.017 45.1413C16.8297 45.0037 16.7527 44.8976 16.7302 44.8517C16.7438 44.8125 16.7883 44.725 16.8981 44.6016C16.8983 44.6012 16.8987 44.6008 16.8989 44.6006C17.1803 44.2827 17.6681 43.9605 18.2727 43.6938C19.1328 43.3133 19.7426 43.16 21.11 42.9814C21.3129 42.9548 21.5199 42.9283 21.7253 42.9021C22.3386 42.824 22.8674 42.76 23.3789 42.6977C23.8333 42.6427 24.2626 42.5906 24.7047 42.5344C25.2615 42.4635 25.7627 42.3957 26.2817 42.321C27.4493 42.1523 29.0365 41.9145 30.5605 41.6797C29.3097 41.7236 27.5615 41.7722 25.916 41.8113C25.4603 41.8754 25.0426 41.9308 24.6345 41.9825C23.7017 42.1012 22.8202 42.2021 21.6551 42.3502C21.4581 42.3754 21.2528 42.4017 21.0381 42.4299C19.6307 42.6137 18.9715 42.7762 18.048 43.1849C17.5023 43.4258 16.8761 43.7871 16.4824 44.232C16.319 44.4158 16.1359 44.6857 16.1755 44.9285C16.2333 45.2835 16.7018 45.7004 17.497 46.0304C18.4536 46.4276 19.8833 46.6985 21.6376 46.5829C22.1993 46.5485 22.8039 46.5129 23.4337 46.4777C25.8206 46.3446 28.5668 46.2204 30.6919 46.2103C28.0244 46.9113 22.1291 48.1932 20.8418 48.357C20.8257 48.3591 20.8103 48.3609 20.7956 48.3628C19.1334 48.5572 17.1754 48.4326 15.6802 47.6519C15.2437 47.6022 14.8033 47.527 14.3711 47.4222C14.5466 47.581 14.7392 47.7299 14.9485 47.8675C14.9489 47.868 14.9493 47.8682 14.95 47.8686C15.7328 48.3801 16.7034 48.7235 17.835 48.8891C18.7789 49.0273 19.8252 49.0364 20.8603 48.9151C20.8762 48.9132 20.8937 48.9111 20.9118 48.9089C22.236 48.7404 28.1703 47.4481 30.8335 46.7481C31.1043 46.6771 31.2801 46.4154 31.2434 46.1378C31.2069 45.8599 30.9694 45.6528 30.6893 45.6541Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M34.3478 42.9455C34.6261 42.8961 34.8121 42.6297 34.7628 42.3516C34.7135 42.0735 34.447 41.8874 34.1689 41.9366C34.0339 41.9606 33.8968 41.9842 33.7615 42.007C33.7488 42.0091 33.7363 42.0117 33.7239 42.0147C33.6047 42.0439 33.5011 42.114 33.4292 42.215C33.3497 42.3264 33.3185 42.4621 33.3412 42.5971C33.3839 42.8511 33.6099 43.0347 33.867 43.0241C33.8885 43.0232 33.9101 43.021 33.9313 43.0174C34.0703 42.9941 34.2105 42.9698 34.3478 42.9455Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M36.0786 41.4385C36.0728 41.44 36.0671 41.4415 36.0613 41.4431C35.9296 41.4802 35.7956 41.5173 35.663 41.5534C35.3904 41.6276 35.229 41.9097 35.3032 42.1822C35.3691 42.4245 35.598 42.5824 35.8476 42.5577C35.8759 42.5549 35.9044 42.5496 35.932 42.5421C36.069 42.5048 36.206 42.4669 36.3395 42.4292C36.6113 42.3525 36.7702 42.069 36.6935 41.7971C36.6184 41.5311 36.3452 41.3733 36.0786 41.4385Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M37.8226 40.664C37.7917 40.6715 37.7611 40.6821 37.7311 40.6958C37.6149 40.7489 37.492 40.8043 37.3553 40.8649C37.0971 40.9795 36.9802 41.2827 37.0948 41.541C37.1932 41.7627 37.4363 41.8858 37.673 41.8337C37.7063 41.8263 37.7393 41.8155 37.7708 41.8015C37.9117 41.739 38.0381 41.6821 38.1573 41.6276C38.4142 41.5101 38.5276 41.2055 38.4101 40.9486C38.3063 40.7217 38.0565 40.6067 37.8226 40.664Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M39.6936 39.6874C39.6105 39.6659 39.5252 39.6655 39.4441 39.6854C39.396 39.6972 39.3493 39.7161 39.3054 39.742L39.2715 39.7619C39.1643 39.8252 39.0567 39.8874 38.9517 39.9467C38.7057 40.0856 38.6186 40.3987 38.7576 40.6447C38.869 40.8419 39.1006 40.9434 39.3208 40.8916C39.3679 40.8806 39.4132 40.8628 39.4556 40.8388C39.5671 40.7758 39.6804 40.7104 39.7922 40.6444L39.8253 40.6249C39.9432 40.5554 40.027 40.4442 40.0613 40.3118C40.0956 40.1793 40.0762 40.0414 40.0068 39.9235C39.9373 39.8056 39.8261 39.7217 39.6936 39.6874Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M41.1859 38.4692C41.1446 38.4662 41.1037 38.4681 41.0638 38.4747C40.972 38.4899 40.8859 38.5301 40.8138 38.5925C40.725 38.6691 40.6235 38.7544 40.5033 38.8531C40.285 39.0324 40.2533 39.3559 40.4326 39.5742C40.5768 39.7496 40.8145 39.8093 41.0241 39.7226C41.0708 39.7033 41.1144 39.6771 41.1537 39.6448C41.2807 39.5405 41.3887 39.4499 41.4837 39.3678C41.6974 39.1831 41.7211 38.8589 41.5364 38.6452C41.4469 38.5416 41.3224 38.4791 41.1859 38.4692Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M42.9175 37.0868C42.8195 36.9913 42.6901 36.9397 42.5533 36.9415C42.5118 36.942 42.4712 36.9474 42.4321 36.9574C42.342 36.9805 42.2596 37.0279 42.1931 37.0962C42.1112 37.1802 42.0173 37.2738 41.9061 37.3825C41.704 37.5799 41.7001 37.9049 41.8975 38.107C42.0562 38.2694 42.2981 38.3085 42.4995 38.2041C42.5444 38.1809 42.5856 38.1511 42.622 38.1155C42.7396 38.0007 42.8393 37.9011 42.9269 37.8112C43.1241 37.6089 43.1198 37.2839 42.9175 37.0868Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M23.5818 10.6069L23.8699 10.9978C24.0172 11.1975 24.2986 11.2403 24.4985 11.093C24.6984 10.9457 24.741 10.6643 24.5937 10.4644L24.3056 10.0735C24.2889 10.0508 24.2705 10.0301 24.2506 10.0115C24.0955 9.8664 23.8542 9.84776 23.677 9.9783C23.4772 10.1256 23.4345 10.407 23.5818 10.6069Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M25.0652 12.6189C25.2124 12.8187 25.4939 12.8614 25.6938 12.7141C25.8937 12.5668 25.9363 12.2854 25.789 12.0855L25.501 11.6946C25.4842 11.6719 25.4658 11.6512 25.4459 11.6326C25.2908 11.4875 25.0495 11.4689 24.8723 11.5994C24.6725 11.7467 24.6298 12.0281 24.7772 12.228L25.0652 12.6189Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M26.2585 14.2409C26.4059 14.4408 26.6873 14.4834 26.8871 14.3362C27.087 14.1889 27.1296 13.9074 26.9823 13.7075L26.6943 13.3167C26.6776 13.294 26.6591 13.2733 26.6393 13.2547C26.4842 13.1096 26.2429 13.0909 26.0657 13.2215C25.8658 13.3688 25.8232 13.6502 25.9705 13.8501L26.2585 14.2409Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M20.3738 6.1999C20.5211 6.39966 20.8025 6.4424 21.0024 6.29511C21.2023 6.14782 21.2449 5.86638 21.0976 5.66652L20.8096 5.27565C20.7928 5.25295 20.7744 5.23229 20.7545 5.21367C20.5994 5.06856 20.3581 5.0499 20.1809 5.18044C19.9811 5.32773 19.9384 5.60917 20.0857 5.80905L20.3738 6.1999Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M21.2791 7.43113L21.5671 7.82198C21.7144 8.02182 21.9959 8.0645 22.1957 7.91719C22.3956 7.7699 22.4383 7.48846 22.291 7.2886L22.0029 6.89773C21.9862 6.87503 21.9677 6.85437 21.9479 6.83575C21.7928 6.69062 21.5515 6.67198 21.3743 6.80252C21.1744 6.94981 21.1318 7.23127 21.2791 7.43113Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M22.7644 9.44211C22.9118 9.64198 23.1931 9.6846 23.393 9.53733C23.5929 9.39004 23.6355 9.10858 23.4882 8.90872L23.2002 8.51785C23.1834 8.49515 23.165 8.47447 23.1451 8.45586C22.99 8.31074 22.7487 8.29209 22.5716 8.42264C22.3717 8.56993 22.3291 8.85137 22.4764 9.05125L22.7644 9.44211Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M35.0812 29.8433L35.8101 29.1144C35.9636 28.9609 35.9636 28.712 35.8101 28.5585C35.6566 28.405 35.4077 28.405 35.2542 28.5585L34.5253 29.2874C34.3718 29.4409 34.3718 29.6898 34.5253 29.8433C34.6788 29.9968 34.9277 29.9968 35.0812 29.8433Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M38.173 26.7535L38.9019 26.0246C39.0554 25.8711 39.0554 25.6222 38.9019 25.4686C38.7484 25.3151 38.4995 25.3151 38.346 25.4686L37.6171 26.1976C37.4636 26.3511 37.4636 26.6 37.6171 26.7535C37.7706 26.907 38.0195 26.907 38.173 26.7535Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M38.346 29.8433C38.4995 29.9969 38.7484 29.9969 38.9019 29.8433C39.0554 29.6898 39.0554 29.441 38.9019 29.2874L38.173 28.5585C38.0195 28.405 37.7706 28.405 37.6171 28.5585C37.4636 28.712 37.4636 28.9609 37.6171 29.1144L38.346 29.8433Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M35.2542 26.7535C35.4077 26.907 35.6566 26.907 35.8101 26.7535C35.9636 26.6 35.9636 26.3511 35.8101 26.1976L35.0812 25.4686C34.9277 25.3151 34.6788 25.3151 34.5253 25.4686C34.3718 25.6222 34.3718 25.8711 34.5253 26.0245L35.2542 26.7535Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M6.97709 44.7405L6.46219 45.2554C6.35375 45.3638 6.35375 45.5397 6.46219 45.6481C6.57063 45.7565 6.74643 45.7565 6.85487 45.6481L7.36977 45.1332C7.47821 45.0247 7.47821 44.8489 7.36977 44.7405C7.26133 44.6321 7.08553 44.6321 6.97709 44.7405Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M9.16068 42.5579L8.64578 43.0728C8.53734 43.1812 8.53734 43.357 8.64578 43.4655C8.75422 43.5739 8.93002 43.5739 9.03846 43.4655L9.55336 42.9506C9.6618 42.8421 9.6618 42.6663 9.55336 42.5579C9.44492 42.4495 9.26912 42.4495 9.16068 42.5579Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M9.03846 44.7405C8.93002 44.6321 8.75422 44.6321 8.64578 44.7405C8.53734 44.8489 8.53734 45.0247 8.64578 45.1332L9.16068 45.6481C9.26912 45.7565 9.44492 45.7565 9.55336 45.6481C9.6618 45.5397 9.6618 45.3638 9.55336 45.2554L9.03846 44.7405Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M6.85487 42.5579C6.74643 42.4495 6.57063 42.4495 6.46219 42.5579C6.35375 42.6663 6.35375 42.8421 6.46219 42.9506L6.97709 43.4655C7.08553 43.5739 7.26133 43.5739 7.36977 43.4655C7.47821 43.357 7.47821 43.1812 7.36977 43.0728L6.85487 42.5579Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M18.849 3.57289L19.3639 3.05799C19.4723 2.94955 19.4723 2.77375 19.3639 2.66531C19.2554 2.55687 19.0796 2.55687 18.9712 2.66531L18.4563 3.18021C18.3479 3.28865 18.3479 3.46445 18.4563 3.57289C18.5648 3.68131 18.7406 3.68131 18.849 3.57289Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M21.0287 1.3893L21.5436 0.874399C21.652 0.76596 21.652 0.590159 21.5436 0.48172C21.4352 0.373281 21.2594 0.373281 21.1509 0.48172L20.636 0.99662C20.5276 1.10506 20.5276 1.28086 20.636 1.3893C20.7445 1.49774 20.9203 1.49774 21.0287 1.3893Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M21.1509 3.57289C21.2594 3.68133 21.4352 3.68133 21.5436 3.57289C21.652 3.46445 21.652 3.28865 21.5436 3.18021L21.0287 2.66531C20.9203 2.55687 20.7445 2.55687 20.636 2.66531C20.5276 2.77375 20.5276 2.94955 20.636 3.05799L21.1509 3.57289Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M18.9712 1.3893C19.0797 1.49774 19.2555 1.49774 19.3639 1.3893C19.4723 1.28086 19.4723 1.10506 19.3639 0.99662L18.849 0.48172C18.7406 0.373281 18.5648 0.373281 18.4563 0.48172C18.3479 0.590159 18.3479 0.765961 18.4563 0.874379L18.9712 1.3893Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M10.8814 19.4964L10.3665 20.0113C10.258 20.1197 10.258 20.2955 10.3665 20.4039C10.4749 20.5124 10.6507 20.5124 10.7592 20.4039L11.2741 19.889C11.3825 19.7806 11.3825 19.6048 11.2741 19.4964C11.1656 19.3879 10.9898 19.3879 10.8814 19.4964Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M13.063 17.3138L12.5481 17.8287C12.4397 17.9371 12.4397 18.1129 12.5481 18.2213C12.6566 18.3298 12.8324 18.3298 12.9408 18.2213L13.4557 17.7064C13.5641 17.598 13.5641 17.4222 13.4557 17.3138C13.3473 17.2053 13.1715 17.2053 13.063 17.3138Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M13.4557 20.4039C13.5641 20.2955 13.5641 20.1197 13.4557 20.0113L12.9408 19.4964C12.8324 19.3879 12.6566 19.3879 12.5481 19.4964C12.4397 19.6048 12.4397 19.7806 12.5481 19.889L13.063 20.4039C13.1715 20.5124 13.3473 20.5124 13.4557 20.4039Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M10.7592 17.3138C10.6507 17.2053 10.4749 17.2053 10.3665 17.3138C10.258 17.4222 10.258 17.598 10.3665 17.7064L10.8814 18.2213C10.9898 18.3298 11.1656 18.3298 11.2741 18.2213C11.3825 18.1129 11.3825 17.9371 11.2741 17.8287L10.7592 17.3138Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M32.3033 46.9241L31.7884 47.439C31.6799 47.5474 31.6799 47.7232 31.7884 47.8317C31.8968 47.9401 32.0726 47.9401 32.181 47.8317L32.6959 47.3168C32.8044 47.2083 32.8044 47.0325 32.6959 46.9241C32.5875 46.8157 32.4117 46.8157 32.3033 46.9241Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M34.4869 44.7405L33.972 45.2554C33.8635 45.3638 33.8635 45.5396 33.972 45.6481C34.0804 45.7565 34.2562 45.7565 34.3646 45.6481L34.8795 45.1332C34.988 45.0247 34.988 44.8489 34.8795 44.7405C34.7711 44.6321 34.5953 44.6321 34.4869 44.7405Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M34.3646 46.9241C34.2562 46.8157 34.0804 46.8157 33.972 46.9241C33.8635 47.0325 33.8635 47.2083 33.972 47.3168L34.4869 47.8317C34.5953 47.9401 34.7711 47.9401 34.8795 47.8317C34.988 47.7232 34.988 47.5474 34.8795 47.439L34.3646 46.9241Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M32.181 44.7405C32.0726 44.6321 31.8968 44.6321 31.7884 44.7405C31.6799 44.8489 31.6799 45.0247 31.7884 45.1332L32.3033 45.6481C32.4117 45.7565 32.5875 45.7565 32.6959 45.6481C32.8044 45.5396 32.8044 45.3638 32.6959 45.2554L32.181 44.7405Z"
                                fill="#171D34"
                              />{" "}
                            </g>{" "}
                            <defs>
                              {" "}
                              <clipPath id="clip0_1081_42459">
                                {" "}
                                <rect
                                  width="50"
                                  height="50"
                                  fill="white"
                                />{" "}
                              </clipPath>{" "}
                            </defs>{" "}
                          </svg>{" "}
                          Write task name and description
                        </span>
                      </div>
                      {type === "MONTHLY_FORM" && (
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Description</label>
                                <textarea
                                  className="form-control"
                                  onChange={(e) => {
                                    let text = e.target.value;
                                    if (text.length > 255) {
                                      setShowWordCountAlert(
                                        "The maximum character count for description is 255"
                                      );
                                    } else {
                                      setTaskInfo({
                                        ...taskInfo,
                                        description: text,
                                      });
                                      setShowWordCountAlert("");
                                    }
                                  }}
                                  name="taskDesc"
                                  cols="20"
                                  rows="2"
                                  value={taskInfo.description}
                                ></textarea>
                                <span className="text">
                                  {taskInfo.description.length} word count
                                </span>
                                {showWordCountAlert && (
                                  <span className="text text-danger">
                                    {showWordCountAlert}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="pHead pt-0">
                                <span className="h5">
                                  <svg
                                    width="50"
                                    height="50"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M20.3437 6.27384H22.8366H26.3984H31.9594C32.7153 6.27384 33.3304 5.65872 33.3304 4.90297V4.54176C33.3304 3.78584 32.7153 3.1709 31.9594 3.1709H31.558H31.0667H20.3437C19.946 3.1709 19.5872 3.34116 19.3367 3.6126C19.1108 3.85703 18.9727 4.1837 18.9727 4.54176V4.90297C18.9727 5.65872 19.5878 6.27384 20.3437 6.27384Z"
                                      fill="#73C3FD"
                                    />
                                    <path
                                      d="M24.2461 11.2817C24.8757 11.2159 25.5113 11.182 26.1522 11.182C26.793 11.182 27.4287 11.2159 28.0583 11.2817V7.48438H24.2461V11.2817Z"
                                      fill="#73C3FD"
                                    />
                                    <path
                                      d="M38.9625 18.3093L39.7528 17.519L40.0882 17.1836L42.1936 15.0782C42.7123 14.5595 42.7123 13.7186 42.1936 13.1999C42.0582 13.0645 41.9008 12.9644 41.7328 12.8999C41.5792 12.8406 41.4168 12.811 41.2544 12.811C41.2385 12.811 41.2227 12.8113 41.2067 12.8118C40.8829 12.8234 40.5625 12.9526 40.3153 13.1999L37.0842 16.431C34.1394 13.9142 30.32 12.3926 26.1518 12.3926C24.4446 12.3926 22.7959 12.6477 21.2419 13.122C19.0173 13.801 16.9866 14.9288 15.2559 16.3996C11.6159 19.4925 9.30273 24.1021 9.30273 29.2417C9.30273 38.2957 16.4816 45.705 25.4462 46.0758C25.6803 46.0856 25.9154 46.0906 26.1518 46.0906C28.2767 46.0906 30.3109 45.6952 32.1848 44.9741C38.5045 42.5426 43.0009 36.4072 43.0009 29.2417C43.0009 25.0733 41.4792 21.2539 38.9625 18.3093ZM37.2313 29.9625C36.9477 30.6465 36.2728 31.1289 35.4873 31.1289H31.5799H30.8907H30.6903C30.5395 31.4907 30.3454 31.8335 30.1115 32.1514C29.8127 32.5573 29.455 32.9139 29.0484 33.2115C28.6365 33.5131 28.1832 33.7474 27.7012 33.9078C27.2025 34.0739 26.6812 34.1582 26.1518 34.1582C25.7518 34.1582 25.3628 34.1102 24.9903 34.0195C23.9779 33.7735 23.0871 33.2131 22.4276 32.448C21.685 31.5866 21.2353 30.4656 21.2353 29.2417C21.2353 28.7121 21.3194 28.1908 21.4855 27.6921C21.6461 27.2103 21.8804 26.757 22.1818 26.3451C22.4793 25.9385 22.8362 25.5808 23.2421 25.282C23.4934 25.097 23.7601 24.9371 24.0394 24.8038C24.1136 24.7682 24.1886 24.7347 24.2646 24.7032V16.9204C24.2646 16.7492 24.2875 16.5832 24.3305 16.4256C24.3896 16.2081 24.4865 16.0061 24.614 15.8274C24.9565 15.347 25.5181 15.0331 26.1518 15.0331C27.1925 15.0331 28.0391 15.8797 28.0391 16.9204V24.7033C28.6288 24.9499 29.1722 25.3137 29.626 25.7675C29.8992 26.0405 30.1397 26.3462 30.3416 26.6749C30.4752 26.8922 30.5919 27.1196 30.6901 27.3542H35.4873C36.3354 27.3542 37.0545 27.9166 37.2916 28.6879C37.3456 28.8631 37.3745 29.0489 37.3745 29.2417C37.3745 29.4968 37.3237 29.7403 37.2313 29.9625Z"
                                      fill="#73C3FD"
                                    />
                                    <path
                                      d="M16.4728 5.74455C16.6079 6.75245 17.538 7.46243 18.5459 7.32723L21.2133 6.96953L26.4002 6.27393H22.8384L21.1503 6.5003L18.4829 6.85801C17.7337 6.95848 17.0425 6.43069 16.942 5.6816L16.8939 5.32372C16.7935 4.57447 17.3213 3.88325 18.0705 3.78277L19.3384 3.61269L22.632 3.17099L29.5833 2.23867C30.2478 2.14959 30.8672 2.55499 31.0685 3.17099H31.5598C31.3443 2.26076 30.4667 1.64249 29.5203 1.76944L18.0076 3.31355C16.9997 3.44856 16.2895 4.3786 16.4247 5.3865L16.4728 5.74455Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M26.6953 6.50098L26.2261 6.56391L22.4477 7.07063L21.9785 7.13356L22.0414 7.60279L22.5462 11.3664L22.616 11.8872L23.1268 11.7636C23.7297 11.6178 24.3445 11.5023 24.9543 11.4205C25.5641 11.3388 26.1877 11.2881 26.8076 11.27L27.3329 11.2546L27.263 10.7338L26.7583 6.97019L26.6953 6.50098ZM24.8913 10.9513C24.2562 11.0365 23.6307 11.1546 23.0154 11.3035L22.5107 7.53987L26.289 7.03315L26.7938 10.7968C26.161 10.8152 25.5265 10.8661 24.8913 10.9513Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M42.5555 20.6567C41.8782 19.3983 41.0523 18.2354 40.09 17.1838L39.7545 17.5193C41.985 19.965 43.5196 23.0886 43.992 26.6106C45.1046 34.9056 39.9509 42.6224 32.1866 44.9744C31.3319 45.2334 30.4454 45.4273 29.5322 45.5497C20.324 46.7846 11.8279 40.2979 10.593 31.0899C9.53667 23.2135 14.1301 15.858 21.2437 13.1223C22.4464 12.6597 23.7212 12.3293 25.0529 12.1507C29.1841 11.5967 33.1719 12.5971 36.4251 14.7L39.198 11.0683C39.4205 10.7766 39.7402 10.6031 40.077 10.5578C40.414 10.5126 40.7681 10.596 41.0597 10.8186C41.6427 11.2638 41.7544 12.0972 41.3093 12.6802L41.2085 12.8121C41.2245 12.8115 41.2403 12.8112 41.2562 12.8112C41.4186 12.8112 41.581 12.8408 41.7346 12.9001C42.2792 12.1145 42.1144 11.0281 41.3469 10.4423C40.9644 10.1501 40.491 10.0246 40.0141 10.0886C39.5371 10.1526 39.1137 10.3984 38.8217 10.7809L36.3111 14.0691C34.7165 13.0937 32.9907 12.3874 31.1748 11.9678C29.1478 11.4993 27.0668 11.403 24.99 11.6814C21.1815 12.1922 17.8258 13.9111 15.2577 16.3998C11.4422 20.0976 9.365 25.4944 10.1237 31.1528C11.2049 39.2139 17.6985 45.2462 25.448 46.0761C26.7996 46.2209 28.1892 46.2074 29.5951 46.0189C39.0619 44.7494 45.7309 36.0145 44.4612 26.5477C44.1828 24.4707 43.5415 22.4888 42.5555 20.6567Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M36.0664 30.0497L30.9877 30.7309C30.9615 30.8655 30.9293 30.9985 30.8911 31.1291H31.5802L36.1294 30.5189C36.5654 30.4605 36.947 30.2566 37.2316 29.9627C37.6205 29.5617 37.8288 28.9928 37.749 28.3975C37.6107 27.3661 36.6591 26.6395 35.6277 26.7779L31.3292 27.3544L30.873 27.4156C30.8611 27.3951 30.8488 27.3747 30.8365 27.3544C30.6915 27.1147 30.526 26.8871 30.3419 26.6751C30.1216 26.4209 29.8753 26.1887 29.6075 25.9842C29.0974 25.5948 28.5104 25.3065 27.8931 25.1405L26.8586 17.4266C26.7204 16.3952 25.7686 15.6686 24.7373 15.8069C24.6957 15.8125 24.6547 15.8194 24.6143 15.8276C23.6489 16.0219 22.9848 16.9384 23.1176 17.9283L24.0397 24.804L24.1521 25.642C23.8135 25.8396 23.4997 26.0773 23.2156 26.3516C22.853 26.7018 22.547 27.1037 22.3061 27.5462C22.062 27.9944 21.8901 28.4749 21.7951 28.9739C21.6967 29.4903 21.6825 30.0181 21.753 30.5427C21.8465 31.2399 22.0827 31.8836 22.4279 32.4482C23.0874 33.2133 23.9782 33.7737 24.9906 34.0197C23.5458 33.4449 22.4432 32.1275 22.2223 30.4798C21.9622 28.5415 23.0004 26.724 24.6648 25.9034L24.2649 22.9211L23.5868 17.8653C23.5058 17.2616 23.8205 16.6942 24.3308 16.4257C24.4734 16.3505 24.6313 16.2988 24.8002 16.2762C25.573 16.1725 26.2857 16.7168 26.3894 17.4896L27.4674 25.5276C28.8288 25.7914 29.9985 26.6846 30.6117 27.9283L34.8905 27.3544L35.6906 27.2471C36.4632 27.1435 37.1762 27.6877 37.2798 28.4605C37.2902 28.5371 37.294 28.6132 37.2919 28.6881C37.2732 29.3684 36.7624 29.9564 36.0664 30.0497Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M25.4892 1.90379L25.8987 1.84778C26.108 1.81906 26.2546 1.62618 26.226 1.4168C26.1974 1.2074 26.0044 1.06088 25.795 1.08951L25.3855 1.14552C25.3617 1.14878 25.3388 1.15413 25.3168 1.16142C25.1451 1.2182 25.0329 1.39093 25.0583 1.57652C25.0869 1.7859 25.2798 1.93244 25.4892 1.90379Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M27.1885 1.67137L27.5979 1.61538C27.8073 1.58674 27.9539 1.39379 27.9252 1.18438C27.8966 0.974977 27.7036 0.828456 27.4942 0.85709L27.0848 0.913097C27.061 0.916358 27.038 0.921706 27.016 0.929C26.8444 0.985778 26.7321 1.15851 26.7575 1.3441C26.7861 1.55348 26.9791 1.70002 27.1885 1.67137Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M28.8877 1.43894L29.2972 1.38294C29.5066 1.35423 29.6531 1.16132 29.6244 0.951953C29.5958 0.742554 29.4028 0.596034 29.1934 0.624668L28.784 0.680674C28.7602 0.683935 28.7372 0.689283 28.7152 0.696577C28.5436 0.753355 28.4313 0.926089 28.4567 1.11168C28.4853 1.32106 28.6783 1.4676 28.8877 1.43894Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M20.4795 2.56101L20.8889 2.50501C21.0983 2.47629 21.2449 2.28341 21.2162 2.07402C21.1876 1.86462 20.9946 1.7181 20.7852 1.74674L20.3758 1.80274C20.352 1.80601 20.329 1.81135 20.307 1.81863C20.1354 1.87541 20.0231 2.04814 20.0485 2.23373C20.0771 2.44313 20.2701 2.58965 20.4795 2.56101Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M22.1787 2.32859L22.5882 2.27259C22.7975 2.24395 22.9441 2.051 22.9155 1.8416C22.8868 1.63222 22.6939 1.48568 22.4845 1.51432L22.075 1.57032C22.0512 1.57358 22.0283 1.57893 22.0062 1.58621C21.8346 1.64299 21.7223 1.81572 21.7477 2.00131C21.7763 2.21071 21.9693 2.35723 22.1787 2.32859Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M23.876 2.09715L24.2854 2.04114C24.4948 2.01244 24.6413 1.81952 24.6127 1.61016C24.5841 1.40076 24.3911 1.25424 24.1817 1.28287L23.7722 1.33888C23.7485 1.34214 23.7255 1.34749 23.7035 1.35476C23.5319 1.41154 23.4196 1.58428 23.445 1.76986C23.4736 1.97928 23.6666 2.1258 23.876 2.09715Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M12.61 39.9346C12.551 39.8339 12.4916 39.7316 12.4334 39.6303C12.428 39.6208 12.4222 39.6115 12.4161 39.6025C12.3576 39.516 12.271 39.454 12.1691 39.4265C12.0567 39.396 11.9391 39.4112 11.8381 39.4692C11.648 39.5784 11.5682 39.8131 11.6527 40.0152C11.6598 40.0321 11.668 40.0487 11.6771 40.0645C11.7368 40.1686 11.7976 40.2733 11.8576 40.3757C11.9793 40.5832 12.2469 40.653 12.4544 40.5313C12.6617 40.4098 12.7315 40.1421 12.61 39.9346Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M13.5636 41.2987C13.495 41.2046 13.4258 41.1086 13.3578 41.0135C13.218 40.8178 12.9451 40.7724 12.7495 40.9122C12.5755 41.0364 12.5172 41.2658 12.6107 41.4577C12.6213 41.4795 12.634 41.5007 12.6481 41.5205C12.7183 41.6187 12.7892 41.717 12.8587 41.8123C13.0003 42.0067 13.2736 42.0496 13.4679 41.908C13.6581 41.7695 13.7032 41.5047 13.5723 41.3112C13.5695 41.307 13.5666 41.3029 13.5636 41.2987Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M14.6525 42.4109C14.5757 42.3338 14.4952 42.252 14.4064 42.1609C14.2386 41.9887 13.962 41.985 13.7897 42.1528C13.6418 42.2969 13.6154 42.5274 13.727 42.7008C13.7427 42.7253 13.7612 42.7484 13.7817 42.7695C13.8732 42.8634 13.956 42.9475 14.0347 43.0266C14.2045 43.1968 14.4811 43.1973 14.6514 43.0276C14.8019 42.8776 14.8198 42.6443 14.7049 42.4745C14.6898 42.4521 14.6723 42.4307 14.6525 42.4109Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M15.9659 43.4783C15.9422 43.4434 15.9133 43.4117 15.8797 43.3843L15.8538 43.3631C15.7716 43.2963 15.6901 43.2288 15.6117 43.1625C15.4281 43.0072 15.1524 43.0303 14.9972 43.2139C14.8727 43.3611 14.8601 43.576 14.9666 43.7365C14.9893 43.7708 15.0169 43.8017 15.0486 43.8285C15.1319 43.8989 15.2176 43.9699 15.3033 44.0397L15.3287 44.0603C15.4189 44.1339 15.5325 44.1679 15.6484 44.1561C15.7643 44.1443 15.8686 44.0881 15.9422 43.9978C16.0158 43.9075 16.0498 43.794 16.038 43.6781C16.0306 43.6053 16.0057 43.5372 15.9659 43.4783Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M17.4114 44.4115C17.3721 44.3427 17.3146 44.2859 17.2435 44.2467C17.1561 44.1986 17.058 44.1427 16.9436 44.076C16.736 43.9548 16.4684 44.0251 16.3472 44.2328C16.2498 44.3997 16.2724 44.607 16.4036 44.7488C16.4328 44.7803 16.4666 44.8074 16.504 44.8292C16.6248 44.8997 16.729 44.9591 16.8227 45.0106C17.0333 45.1266 17.299 45.0497 17.415 44.8391C17.4712 44.737 17.4843 44.6192 17.4519 44.5073C17.4421 44.4735 17.4285 44.4414 17.4114 44.4115Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M19.0264 45.0568C18.9813 44.9917 18.9191 44.94 18.8449 44.9071C18.7537 44.8666 18.6512 44.8194 18.5315 44.7627C18.3142 44.6597 18.0537 44.7527 17.9507 44.97C17.868 45.1447 17.9084 45.3493 18.0512 45.4793C18.083 45.5082 18.119 45.5323 18.1581 45.5508C18.2845 45.6107 18.3935 45.6609 18.4912 45.7043C18.711 45.8018 18.9692 45.7023 19.0667 45.4825C19.1139 45.376 19.1169 45.2575 19.075 45.1488C19.0623 45.116 19.0459 45.0851 19.0264 45.0568Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M5.71847 30.0101L5.098 30.6306C4.96733 30.7612 4.96733 30.9731 5.098 31.1037C5.22867 31.2344 5.44052 31.2344 5.57119 31.1037L6.19166 30.4833C6.32233 30.3526 6.32233 30.1408 6.19166 30.0101C6.06099 29.8794 5.84913 29.8794 5.71847 30.0101Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M8.34933 27.3792L7.72886 27.9997C7.59819 28.1304 7.59819 28.3422 7.72886 28.4729C7.85953 28.6035 8.07138 28.6035 8.20204 28.4729L8.8225 27.8524C8.95317 27.7217 8.95317 27.5099 8.8225 27.3792C8.69185 27.2486 8.47999 27.2486 8.34933 27.3792Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M8.20204 30.0101C8.07137 29.8794 7.85951 29.8794 7.72886 30.0101C7.59819 30.1408 7.59819 30.3526 7.72886 30.4833L8.34933 31.1038C8.47999 31.2344 8.69185 31.2344 8.8225 31.1038C8.95317 30.9731 8.95317 30.7612 8.8225 30.6306L8.20204 30.0101Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M5.57119 27.3793C5.44052 27.2486 5.22867 27.2486 5.098 27.3793C4.96733 27.5099 4.96733 27.7218 5.098 27.8524L5.71847 28.4729C5.84913 28.6036 6.06099 28.6036 6.19164 28.4729C6.32231 28.3422 6.32231 28.1304 6.19164 27.9997L5.57119 27.3793Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M43.738 38.5692L43.2997 39.0075C43.2074 39.0998 43.2074 39.2495 43.2997 39.3418C43.392 39.4341 43.5416 39.4341 43.6339 39.3418L44.0722 38.9035C44.1645 38.8112 44.1645 38.6615 44.0722 38.5692C43.9799 38.4769 43.8303 38.4769 43.738 38.5692Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M45.4933 37.4834L45.9316 37.0451C46.0239 36.9528 46.0239 36.8031 45.9316 36.7108C45.8393 36.6185 45.6897 36.6185 45.5973 36.7108L45.1591 37.1491C45.0668 37.2414 45.0668 37.3911 45.1591 37.4834C45.2514 37.5757 45.401 37.5757 45.4933 37.4834Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M45.4933 38.5692C45.401 38.4769 45.2514 38.4769 45.1591 38.5692C45.0668 38.6615 45.0668 38.8112 45.1591 38.9035L45.5973 39.3418C45.6897 39.4341 45.8393 39.4341 45.9316 39.3418C46.0239 39.2495 46.0239 39.0998 45.9316 39.0075L45.4933 38.5692Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M43.6339 36.7108C43.5416 36.6185 43.392 36.6185 43.2997 36.7108C43.2074 36.8031 43.2074 36.9528 43.2997 37.0451L43.738 37.4834C43.8303 37.5757 43.9799 37.5757 44.0722 37.4834C44.1645 37.3911 44.1645 37.2414 44.0722 37.1491L43.6339 36.7108Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M42.7043 12.8515L43.1425 12.4132C43.2348 12.3209 43.2348 12.1713 43.1425 12.079C43.0502 11.9867 42.9006 11.9867 42.8083 12.079L42.37 12.5173C42.2777 12.6096 42.2777 12.7592 42.37 12.8515C42.4623 12.9438 42.612 12.9438 42.7043 12.8515Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M44.6677 10.2206L44.2294 10.6589C44.1371 10.7512 44.1371 10.9008 44.2294 10.9931C44.3217 11.0854 44.4713 11.0854 44.5636 10.9931L45.0019 10.5548C45.0942 10.4625 45.0942 10.3129 45.0019 10.2206C44.9096 10.1283 44.76 10.1283 44.6677 10.2206Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M44.5636 12.079C44.4713 11.9867 44.3217 11.9867 44.2294 12.079C44.1371 12.1713 44.1371 12.3209 44.2294 12.4132L44.6677 12.8515C44.76 12.9438 44.9096 12.9438 45.0019 12.8515C45.0942 12.7592 45.0942 12.6096 45.0019 12.5173L44.5636 12.079Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M42.8083 10.9931C42.9006 11.0854 43.0502 11.0854 43.1425 10.9931C43.2348 10.9008 43.2348 10.7512 43.1425 10.6589L42.7043 10.2206C42.612 10.1283 42.4623 10.1283 42.37 10.2206C42.2777 10.3129 42.2777 10.4625 42.37 10.5548L42.8083 10.9931Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M24.2009 48.5448L23.7626 48.9831C23.6703 49.0754 23.6703 49.225 23.7626 49.3173C23.8549 49.4096 24.0045 49.4096 24.0968 49.3173L24.5351 48.8791C24.6274 48.7868 24.6274 48.6371 24.5351 48.5448C24.4428 48.4525 24.2932 48.4525 24.2009 48.5448Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M26.0602 46.6864L25.622 47.1247C25.5297 47.217 25.5297 47.3666 25.622 47.4589C25.7143 47.5512 25.8639 47.5512 25.9562 47.4589L26.3945 47.0206C26.4868 46.9283 26.4868 46.7787 26.3945 46.6864C26.3022 46.5941 26.1525 46.5941 26.0602 46.6864Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M25.9562 48.5448C25.8639 48.4525 25.7143 48.4525 25.622 48.5448C25.5297 48.6371 25.5297 48.7868 25.622 48.8791L26.0602 49.3173C26.1525 49.4096 26.3022 49.4096 26.3945 49.3173C26.4868 49.225 26.4868 49.0754 26.3945 48.9831L25.9562 48.5448Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M24.0968 46.6864C24.0045 46.5941 23.8549 46.5941 23.7626 46.6864C23.6703 46.7787 23.6703 46.9284 23.7626 47.0207L24.2009 47.4589C24.2932 47.5512 24.4428 47.5512 24.5351 47.4589C24.6274 47.3666 24.6274 47.217 24.5351 47.1247L24.0968 46.6864Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M17.1203 2.70015L17.5585 2.26187C17.6509 2.16957 17.6509 2.01993 17.5585 1.92763C17.4662 1.83532 17.3166 1.83532 17.2243 1.92763L16.786 2.3659C16.6937 2.45821 16.6937 2.60785 16.786 2.70015C16.8783 2.79245 17.028 2.79245 17.1203 2.70015Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M18.9777 0.841753L19.416 0.403473C19.5083 0.311171 19.5083 0.16153 19.416 0.0692269C19.3237 -0.0230756 19.174 -0.0230756 19.0817 0.0692269L18.6434 0.507506C18.5511 0.599809 18.5511 0.74945 18.6434 0.841753C18.7357 0.934055 18.8854 0.934055 18.9777 0.841753Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M19.0817 2.70015C19.174 2.79245 19.3237 2.79245 19.416 2.70015C19.5083 2.60785 19.5083 2.45821 19.416 2.3659L18.9777 1.92763C18.8854 1.83532 18.7357 1.83532 18.6434 1.92763C18.5511 2.01993 18.5511 2.16957 18.6434 2.26187L19.0817 2.70015Z"
                                      fill="#171D34"
                                    />
                                    <path
                                      d="M17.2243 0.841753C17.3166 0.934055 17.4662 0.934055 17.5585 0.841753C17.6509 0.74945 17.6509 0.599809 17.5585 0.507506L17.1203 0.0692269C17.028 -0.0230756 16.8783 -0.0230756 16.786 0.0692269C16.6937 0.16153 16.6937 0.311171 16.786 0.403456L17.2243 0.841753Z"
                                      fill="#171D34"
                                    />
                                  </svg>
                                  Choose Due Date
                                </span>
                              </div>
                              <div className="form-group">
                                <input
                                  type="date"
                                  className={`form-control`}
                                  name="start"
                                  value={taskInfo.dueDate}
                                  onChange={(e) => {
                                    setTaskInfo({
                                      ...taskInfo,
                                      dueDate: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {taskInfo.showError && (
                            <Alert variant="info" className="mt-3 heading-5">
                              {taskInfo.showError}
                            </Alert>
                          )}
                        </form>
                      )}

                      {type !== "MONTHLY_FORM" && (
                      <form onSubmit={handleSubmit}>
                      <div className="row">

                      <div className="col-md-12">
                          <div className="form-group">
                            <label>Task Name</label>
                            <input
                              className="form-control"
                              type="text" 
                              name='text_name'
                              onChange={(e)=>{
                                setComplianceFormData((prev)=>({
                                  ...prev,
                                  task_name:e.target.value
                                }))
                              }}
                              value={ComplianceFormData.task_name}
                            ></input>
                         
                           
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              className="form-control"
                              onChange={(e) => {
                                let text = e.target.value;
                                if (text.length > 255) {
                                  setShowWordCountAlert(
                                    "The maximum character count for description is 255"
                                  );
                                } else {
                                  setTaskInfo({
                                    ...taskInfo,
                                    description: text,
                                  });
                                  setShowWordCountAlert("");
                                }
                              }}
                              name="taskDesc"
                              cols="20"
                              rows="2"
                              value={taskInfo.description}
                            ></textarea>
                            <span className="text">
                              {taskInfo.description.length} word count
                            </span>
                            {showWordCountAlert && (
                              <span className="text text-danger">
                                {showWordCountAlert}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="pHead pt-0">
                            <span className="h5">
                              <svg
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.3437 6.27384H22.8366H26.3984H31.9594C32.7153 6.27384 33.3304 5.65872 33.3304 4.90297V4.54176C33.3304 3.78584 32.7153 3.1709 31.9594 3.1709H31.558H31.0667H20.3437C19.946 3.1709 19.5872 3.34116 19.3367 3.6126C19.1108 3.85703 18.9727 4.1837 18.9727 4.54176V4.90297C18.9727 5.65872 19.5878 6.27384 20.3437 6.27384Z"
                                  fill="#73C3FD"
                                />
                                <path
                                  d="M24.2461 11.2817C24.8757 11.2159 25.5113 11.182 26.1522 11.182C26.793 11.182 27.4287 11.2159 28.0583 11.2817V7.48438H24.2461V11.2817Z"
                                  fill="#73C3FD"
                                />
                                <path
                                  d="M38.9625 18.3093L39.7528 17.519L40.0882 17.1836L42.1936 15.0782C42.7123 14.5595 42.7123 13.7186 42.1936 13.1999C42.0582 13.0645 41.9008 12.9644 41.7328 12.8999C41.5792 12.8406 41.4168 12.811 41.2544 12.811C41.2385 12.811 41.2227 12.8113 41.2067 12.8118C40.8829 12.8234 40.5625 12.9526 40.3153 13.1999L37.0842 16.431C34.1394 13.9142 30.32 12.3926 26.1518 12.3926C24.4446 12.3926 22.7959 12.6477 21.2419 13.122C19.0173 13.801 16.9866 14.9288 15.2559 16.3996C11.6159 19.4925 9.30273 24.1021 9.30273 29.2417C9.30273 38.2957 16.4816 45.705 25.4462 46.0758C25.6803 46.0856 25.9154 46.0906 26.1518 46.0906C28.2767 46.0906 30.3109 45.6952 32.1848 44.9741C38.5045 42.5426 43.0009 36.4072 43.0009 29.2417C43.0009 25.0733 41.4792 21.2539 38.9625 18.3093ZM37.2313 29.9625C36.9477 30.6465 36.2728 31.1289 35.4873 31.1289H31.5799H30.8907H30.6903C30.5395 31.4907 30.3454 31.8335 30.1115 32.1514C29.8127 32.5573 29.455 32.9139 29.0484 33.2115C28.6365 33.5131 28.1832 33.7474 27.7012 33.9078C27.2025 34.0739 26.6812 34.1582 26.1518 34.1582C25.7518 34.1582 25.3628 34.1102 24.9903 34.0195C23.9779 33.7735 23.0871 33.2131 22.4276 32.448C21.685 31.5866 21.2353 30.4656 21.2353 29.2417C21.2353 28.7121 21.3194 28.1908 21.4855 27.6921C21.6461 27.2103 21.8804 26.757 22.1818 26.3451C22.4793 25.9385 22.8362 25.5808 23.2421 25.282C23.4934 25.097 23.7601 24.9371 24.0394 24.8038C24.1136 24.7682 24.1886 24.7347 24.2646 24.7032V16.9204C24.2646 16.7492 24.2875 16.5832 24.3305 16.4256C24.3896 16.2081 24.4865 16.0061 24.614 15.8274C24.9565 15.347 25.5181 15.0331 26.1518 15.0331C27.1925 15.0331 28.0391 15.8797 28.0391 16.9204V24.7033C28.6288 24.9499 29.1722 25.3137 29.626 25.7675C29.8992 26.0405 30.1397 26.3462 30.3416 26.6749C30.4752 26.8922 30.5919 27.1196 30.6901 27.3542H35.4873C36.3354 27.3542 37.0545 27.9166 37.2916 28.6879C37.3456 28.8631 37.3745 29.0489 37.3745 29.2417C37.3745 29.4968 37.3237 29.7403 37.2313 29.9625Z"
                                  fill="#73C3FD"
                                />
                                <path
                                  d="M16.4728 5.74455C16.6079 6.75245 17.538 7.46243 18.5459 7.32723L21.2133 6.96953L26.4002 6.27393H22.8384L21.1503 6.5003L18.4829 6.85801C17.7337 6.95848 17.0425 6.43069 16.942 5.6816L16.8939 5.32372C16.7935 4.57447 17.3213 3.88325 18.0705 3.78277L19.3384 3.61269L22.632 3.17099L29.5833 2.23867C30.2478 2.14959 30.8672 2.55499 31.0685 3.17099H31.5598C31.3443 2.26076 30.4667 1.64249 29.5203 1.76944L18.0076 3.31355C16.9997 3.44856 16.2895 4.3786 16.4247 5.3865L16.4728 5.74455Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M26.6953 6.50098L26.2261 6.56391L22.4477 7.07063L21.9785 7.13356L22.0414 7.60279L22.5462 11.3664L22.616 11.8872L23.1268 11.7636C23.7297 11.6178 24.3445 11.5023 24.9543 11.4205C25.5641 11.3388 26.1877 11.2881 26.8076 11.27L27.3329 11.2546L27.263 10.7338L26.7583 6.97019L26.6953 6.50098ZM24.8913 10.9513C24.2562 11.0365 23.6307 11.1546 23.0154 11.3035L22.5107 7.53987L26.289 7.03315L26.7938 10.7968C26.161 10.8152 25.5265 10.8661 24.8913 10.9513Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M42.5555 20.6567C41.8782 19.3983 41.0523 18.2354 40.09 17.1838L39.7545 17.5193C41.985 19.965 43.5196 23.0886 43.992 26.6106C45.1046 34.9056 39.9509 42.6224 32.1866 44.9744C31.3319 45.2334 30.4454 45.4273 29.5322 45.5497C20.324 46.7846 11.8279 40.2979 10.593 31.0899C9.53667 23.2135 14.1301 15.858 21.2437 13.1223C22.4464 12.6597 23.7212 12.3293 25.0529 12.1507C29.1841 11.5967 33.1719 12.5971 36.4251 14.7L39.198 11.0683C39.4205 10.7766 39.7402 10.6031 40.077 10.5578C40.414 10.5126 40.7681 10.596 41.0597 10.8186C41.6427 11.2638 41.7544 12.0972 41.3093 12.6802L41.2085 12.8121C41.2245 12.8115 41.2403 12.8112 41.2562 12.8112C41.4186 12.8112 41.581 12.8408 41.7346 12.9001C42.2792 12.1145 42.1144 11.0281 41.3469 10.4423C40.9644 10.1501 40.491 10.0246 40.0141 10.0886C39.5371 10.1526 39.1137 10.3984 38.8217 10.7809L36.3111 14.0691C34.7165 13.0937 32.9907 12.3874 31.1748 11.9678C29.1478 11.4993 27.0668 11.403 24.99 11.6814C21.1815 12.1922 17.8258 13.9111 15.2577 16.3998C11.4422 20.0976 9.365 25.4944 10.1237 31.1528C11.2049 39.2139 17.6985 45.2462 25.448 46.0761C26.7996 46.2209 28.1892 46.2074 29.5951 46.0189C39.0619 44.7494 45.7309 36.0145 44.4612 26.5477C44.1828 24.4707 43.5415 22.4888 42.5555 20.6567Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M36.0664 30.0497L30.9877 30.7309C30.9615 30.8655 30.9293 30.9985 30.8911 31.1291H31.5802L36.1294 30.5189C36.5654 30.4605 36.947 30.2566 37.2316 29.9627C37.6205 29.5617 37.8288 28.9928 37.749 28.3975C37.6107 27.3661 36.6591 26.6395 35.6277 26.7779L31.3292 27.3544L30.873 27.4156C30.8611 27.3951 30.8488 27.3747 30.8365 27.3544C30.6915 27.1147 30.526 26.8871 30.3419 26.6751C30.1216 26.4209 29.8753 26.1887 29.6075 25.9842C29.0974 25.5948 28.5104 25.3065 27.8931 25.1405L26.8586 17.4266C26.7204 16.3952 25.7686 15.6686 24.7373 15.8069C24.6957 15.8125 24.6547 15.8194 24.6143 15.8276C23.6489 16.0219 22.9848 16.9384 23.1176 17.9283L24.0397 24.804L24.1521 25.642C23.8135 25.8396 23.4997 26.0773 23.2156 26.3516C22.853 26.7018 22.547 27.1037 22.3061 27.5462C22.062 27.9944 21.8901 28.4749 21.7951 28.9739C21.6967 29.4903 21.6825 30.0181 21.753 30.5427C21.8465 31.2399 22.0827 31.8836 22.4279 32.4482C23.0874 33.2133 23.9782 33.7737 24.9906 34.0197C23.5458 33.4449 22.4432 32.1275 22.2223 30.4798C21.9622 28.5415 23.0004 26.724 24.6648 25.9034L24.2649 22.9211L23.5868 17.8653C23.5058 17.2616 23.8205 16.6942 24.3308 16.4257C24.4734 16.3505 24.6313 16.2988 24.8002 16.2762C25.573 16.1725 26.2857 16.7168 26.3894 17.4896L27.4674 25.5276C28.8288 25.7914 29.9985 26.6846 30.6117 27.9283L34.8905 27.3544L35.6906 27.2471C36.4632 27.1435 37.1762 27.6877 37.2798 28.4605C37.2902 28.5371 37.294 28.6132 37.2919 28.6881C37.2732 29.3684 36.7624 29.9564 36.0664 30.0497Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M25.4892 1.90379L25.8987 1.84778C26.108 1.81906 26.2546 1.62618 26.226 1.4168C26.1974 1.2074 26.0044 1.06088 25.795 1.08951L25.3855 1.14552C25.3617 1.14878 25.3388 1.15413 25.3168 1.16142C25.1451 1.2182 25.0329 1.39093 25.0583 1.57652C25.0869 1.7859 25.2798 1.93244 25.4892 1.90379Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M27.1885 1.67137L27.5979 1.61538C27.8073 1.58674 27.9539 1.39379 27.9252 1.18438C27.8966 0.974977 27.7036 0.828456 27.4942 0.85709L27.0848 0.913097C27.061 0.916358 27.038 0.921706 27.016 0.929C26.8444 0.985778 26.7321 1.15851 26.7575 1.3441C26.7861 1.55348 26.9791 1.70002 27.1885 1.67137Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M28.8877 1.43894L29.2972 1.38294C29.5066 1.35423 29.6531 1.16132 29.6244 0.951953C29.5958 0.742554 29.4028 0.596034 29.1934 0.624668L28.784 0.680674C28.7602 0.683935 28.7372 0.689283 28.7152 0.696577C28.5436 0.753355 28.4313 0.926089 28.4567 1.11168C28.4853 1.32106 28.6783 1.4676 28.8877 1.43894Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M20.4795 2.56101L20.8889 2.50501C21.0983 2.47629 21.2449 2.28341 21.2162 2.07402C21.1876 1.86462 20.9946 1.7181 20.7852 1.74674L20.3758 1.80274C20.352 1.80601 20.329 1.81135 20.307 1.81863C20.1354 1.87541 20.0231 2.04814 20.0485 2.23373C20.0771 2.44313 20.2701 2.58965 20.4795 2.56101Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M22.1787 2.32859L22.5882 2.27259C22.7975 2.24395 22.9441 2.051 22.9155 1.8416C22.8868 1.63222 22.6939 1.48568 22.4845 1.51432L22.075 1.57032C22.0512 1.57358 22.0283 1.57893 22.0062 1.58621C21.8346 1.64299 21.7223 1.81572 21.7477 2.00131C21.7763 2.21071 21.9693 2.35723 22.1787 2.32859Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M23.876 2.09715L24.2854 2.04114C24.4948 2.01244 24.6413 1.81952 24.6127 1.61016C24.5841 1.40076 24.3911 1.25424 24.1817 1.28287L23.7722 1.33888C23.7485 1.34214 23.7255 1.34749 23.7035 1.35476C23.5319 1.41154 23.4196 1.58428 23.445 1.76986C23.4736 1.97928 23.6666 2.1258 23.876 2.09715Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M12.61 39.9346C12.551 39.8339 12.4916 39.7316 12.4334 39.6303C12.428 39.6208 12.4222 39.6115 12.4161 39.6025C12.3576 39.516 12.271 39.454 12.1691 39.4265C12.0567 39.396 11.9391 39.4112 11.8381 39.4692C11.648 39.5784 11.5682 39.8131 11.6527 40.0152C11.6598 40.0321 11.668 40.0487 11.6771 40.0645C11.7368 40.1686 11.7976 40.2733 11.8576 40.3757C11.9793 40.5832 12.2469 40.653 12.4544 40.5313C12.6617 40.4098 12.7315 40.1421 12.61 39.9346Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M13.5636 41.2987C13.495 41.2046 13.4258 41.1086 13.3578 41.0135C13.218 40.8178 12.9451 40.7724 12.7495 40.9122C12.5755 41.0364 12.5172 41.2658 12.6107 41.4577C12.6213 41.4795 12.634 41.5007 12.6481 41.5205C12.7183 41.6187 12.7892 41.717 12.8587 41.8123C13.0003 42.0067 13.2736 42.0496 13.4679 41.908C13.6581 41.7695 13.7032 41.5047 13.5723 41.3112C13.5695 41.307 13.5666 41.3029 13.5636 41.2987Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M14.6525 42.4109C14.5757 42.3338 14.4952 42.252 14.4064 42.1609C14.2386 41.9887 13.962 41.985 13.7897 42.1528C13.6418 42.2969 13.6154 42.5274 13.727 42.7008C13.7427 42.7253 13.7612 42.7484 13.7817 42.7695C13.8732 42.8634 13.956 42.9475 14.0347 43.0266C14.2045 43.1968 14.4811 43.1973 14.6514 43.0276C14.8019 42.8776 14.8198 42.6443 14.7049 42.4745C14.6898 42.4521 14.6723 42.4307 14.6525 42.4109Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M15.9659 43.4783C15.9422 43.4434 15.9133 43.4117 15.8797 43.3843L15.8538 43.3631C15.7716 43.2963 15.6901 43.2288 15.6117 43.1625C15.4281 43.0072 15.1524 43.0303 14.9972 43.2139C14.8727 43.3611 14.8601 43.576 14.9666 43.7365C14.9893 43.7708 15.0169 43.8017 15.0486 43.8285C15.1319 43.8989 15.2176 43.9699 15.3033 44.0397L15.3287 44.0603C15.4189 44.1339 15.5325 44.1679 15.6484 44.1561C15.7643 44.1443 15.8686 44.0881 15.9422 43.9978C16.0158 43.9075 16.0498 43.794 16.038 43.6781C16.0306 43.6053 16.0057 43.5372 15.9659 43.4783Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M17.4114 44.4115C17.3721 44.3427 17.3146 44.2859 17.2435 44.2467C17.1561 44.1986 17.058 44.1427 16.9436 44.076C16.736 43.9548 16.4684 44.0251 16.3472 44.2328C16.2498 44.3997 16.2724 44.607 16.4036 44.7488C16.4328 44.7803 16.4666 44.8074 16.504 44.8292C16.6248 44.8997 16.729 44.9591 16.8227 45.0106C17.0333 45.1266 17.299 45.0497 17.415 44.8391C17.4712 44.737 17.4843 44.6192 17.4519 44.5073C17.4421 44.4735 17.4285 44.4414 17.4114 44.4115Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M19.0264 45.0568C18.9813 44.9917 18.9191 44.94 18.8449 44.9071C18.7537 44.8666 18.6512 44.8194 18.5315 44.7627C18.3142 44.6597 18.0537 44.7527 17.9507 44.97C17.868 45.1447 17.9084 45.3493 18.0512 45.4793C18.083 45.5082 18.119 45.5323 18.1581 45.5508C18.2845 45.6107 18.3935 45.6609 18.4912 45.7043C18.711 45.8018 18.9692 45.7023 19.0667 45.4825C19.1139 45.376 19.1169 45.2575 19.075 45.1488C19.0623 45.116 19.0459 45.0851 19.0264 45.0568Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M5.71847 30.0101L5.098 30.6306C4.96733 30.7612 4.96733 30.9731 5.098 31.1037C5.22867 31.2344 5.44052 31.2344 5.57119 31.1037L6.19166 30.4833C6.32233 30.3526 6.32233 30.1408 6.19166 30.0101C6.06099 29.8794 5.84913 29.8794 5.71847 30.0101Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M8.34933 27.3792L7.72886 27.9997C7.59819 28.1304 7.59819 28.3422 7.72886 28.4729C7.85953 28.6035 8.07138 28.6035 8.20204 28.4729L8.8225 27.8524C8.95317 27.7217 8.95317 27.5099 8.8225 27.3792C8.69185 27.2486 8.47999 27.2486 8.34933 27.3792Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M8.20204 30.0101C8.07137 29.8794 7.85951 29.8794 7.72886 30.0101C7.59819 30.1408 7.59819 30.3526 7.72886 30.4833L8.34933 31.1038C8.47999 31.2344 8.69185 31.2344 8.8225 31.1038C8.95317 30.9731 8.95317 30.7612 8.8225 30.6306L8.20204 30.0101Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M5.57119 27.3793C5.44052 27.2486 5.22867 27.2486 5.098 27.3793C4.96733 27.5099 4.96733 27.7218 5.098 27.8524L5.71847 28.4729C5.84913 28.6036 6.06099 28.6036 6.19164 28.4729C6.32231 28.3422 6.32231 28.1304 6.19164 27.9997L5.57119 27.3793Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M43.738 38.5692L43.2997 39.0075C43.2074 39.0998 43.2074 39.2495 43.2997 39.3418C43.392 39.4341 43.5416 39.4341 43.6339 39.3418L44.0722 38.9035C44.1645 38.8112 44.1645 38.6615 44.0722 38.5692C43.9799 38.4769 43.8303 38.4769 43.738 38.5692Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M45.4933 37.4834L45.9316 37.0451C46.0239 36.9528 46.0239 36.8031 45.9316 36.7108C45.8393 36.6185 45.6897 36.6185 45.5973 36.7108L45.1591 37.1491C45.0668 37.2414 45.0668 37.3911 45.1591 37.4834C45.2514 37.5757 45.401 37.5757 45.4933 37.4834Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M45.4933 38.5692C45.401 38.4769 45.2514 38.4769 45.1591 38.5692C45.0668 38.6615 45.0668 38.8112 45.1591 38.9035L45.5973 39.3418C45.6897 39.4341 45.8393 39.4341 45.9316 39.3418C46.0239 39.2495 46.0239 39.0998 45.9316 39.0075L45.4933 38.5692Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M43.6339 36.7108C43.5416 36.6185 43.392 36.6185 43.2997 36.7108C43.2074 36.8031 43.2074 36.9528 43.2997 37.0451L43.738 37.4834C43.8303 37.5757 43.9799 37.5757 44.0722 37.4834C44.1645 37.3911 44.1645 37.2414 44.0722 37.1491L43.6339 36.7108Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M42.7043 12.8515L43.1425 12.4132C43.2348 12.3209 43.2348 12.1713 43.1425 12.079C43.0502 11.9867 42.9006 11.9867 42.8083 12.079L42.37 12.5173C42.2777 12.6096 42.2777 12.7592 42.37 12.8515C42.4623 12.9438 42.612 12.9438 42.7043 12.8515Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M44.6677 10.2206L44.2294 10.6589C44.1371 10.7512 44.1371 10.9008 44.2294 10.9931C44.3217 11.0854 44.4713 11.0854 44.5636 10.9931L45.0019 10.5548C45.0942 10.4625 45.0942 10.3129 45.0019 10.2206C44.9096 10.1283 44.76 10.1283 44.6677 10.2206Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M44.5636 12.079C44.4713 11.9867 44.3217 11.9867 44.2294 12.079C44.1371 12.1713 44.1371 12.3209 44.2294 12.4132L44.6677 12.8515C44.76 12.9438 44.9096 12.9438 45.0019 12.8515C45.0942 12.7592 45.0942 12.6096 45.0019 12.5173L44.5636 12.079Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M42.8083 10.9931C42.9006 11.0854 43.0502 11.0854 43.1425 10.9931C43.2348 10.9008 43.2348 10.7512 43.1425 10.6589L42.7043 10.2206C42.612 10.1283 42.4623 10.1283 42.37 10.2206C42.2777 10.3129 42.2777 10.4625 42.37 10.5548L42.8083 10.9931Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M24.2009 48.5448L23.7626 48.9831C23.6703 49.0754 23.6703 49.225 23.7626 49.3173C23.8549 49.4096 24.0045 49.4096 24.0968 49.3173L24.5351 48.8791C24.6274 48.7868 24.6274 48.6371 24.5351 48.5448C24.4428 48.4525 24.2932 48.4525 24.2009 48.5448Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M26.0602 46.6864L25.622 47.1247C25.5297 47.217 25.5297 47.3666 25.622 47.4589C25.7143 47.5512 25.8639 47.5512 25.9562 47.4589L26.3945 47.0206C26.4868 46.9283 26.4868 46.7787 26.3945 46.6864C26.3022 46.5941 26.1525 46.5941 26.0602 46.6864Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M25.9562 48.5448C25.8639 48.4525 25.7143 48.4525 25.622 48.5448C25.5297 48.6371 25.5297 48.7868 25.622 48.8791L26.0602 49.3173C26.1525 49.4096 26.3022 49.4096 26.3945 49.3173C26.4868 49.225 26.4868 49.0754 26.3945 48.9831L25.9562 48.5448Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M24.0968 46.6864C24.0045 46.5941 23.8549 46.5941 23.7626 46.6864C23.6703 46.7787 23.6703 46.9284 23.7626 47.0207L24.2009 47.4589C24.2932 47.5512 24.4428 47.5512 24.5351 47.4589C24.6274 47.3666 24.6274 47.217 24.5351 47.1247L24.0968 46.6864Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M17.1203 2.70015L17.5585 2.26187C17.6509 2.16957 17.6509 2.01993 17.5585 1.92763C17.4662 1.83532 17.3166 1.83532 17.2243 1.92763L16.786 2.3659C16.6937 2.45821 16.6937 2.60785 16.786 2.70015C16.8783 2.79245 17.028 2.79245 17.1203 2.70015Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M18.9777 0.841753L19.416 0.403473C19.5083 0.311171 19.5083 0.16153 19.416 0.0692269C19.3237 -0.0230756 19.174 -0.0230756 19.0817 0.0692269L18.6434 0.507506C18.5511 0.599809 18.5511 0.74945 18.6434 0.841753C18.7357 0.934055 18.8854 0.934055 18.9777 0.841753Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M19.0817 2.70015C19.174 2.79245 19.3237 2.79245 19.416 2.70015C19.5083 2.60785 19.5083 2.45821 19.416 2.3659L18.9777 1.92763C18.8854 1.83532 18.7357 1.83532 18.6434 1.92763C18.5511 2.01993 18.5511 2.16957 18.6434 2.26187L19.0817 2.70015Z"
                                  fill="#171D34"
                                />
                                <path
                                  d="M17.2243 0.841753C17.3166 0.934055 17.4662 0.934055 17.5585 0.841753C17.6509 0.74945 17.6509 0.599809 17.5585 0.507506L17.1203 0.0692269C17.028 -0.0230756 16.8783 -0.0230756 16.786 0.0692269C16.6937 0.16153 16.6937 0.311171 16.786 0.403456L17.2243 0.841753Z"
                                  fill="#171D34"
                                />
                              </svg>
                              Choose Due Date
                            </span>
                          </div>
                          <div className="form-group">
                            <input
                              type="date"
                              className={`form-control`}
                              name="start"
                              value={taskInfo.dueDate}
                              onChange={(e) => {
                                setTaskInfo({
                                  ...taskInfo,
                                  dueDate: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {taskInfo.showError && (
                        <Alert variant="info" className="mt-3 heading-5">
                          {taskInfo.showError}
                        </Alert>
                      )}
                    </form>

                      )}
                    </div>
                    <div className="col-md-5 offset-md-1 taskAddOpt">
                      <div className="pHead pt-0">
                        <span className="h5">
                          <svg
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <g clip-path="url(#clip0_1081_42777)">
                              {" "}
                              <path
                                d="M8.46712 38.8086H4.44727L4.8059 39.1673C7.41899 41.7803 9.39418 43.7555 12.0678 46.4289V42.4092C12.0678 40.4238 10.4525 38.8086 8.46712 38.8086Z"
                                fill="#73C3FD"
                              />{" "}
                              <path
                                d="M40.181 24.4384C39.1561 25.413 38.2272 26.3997 37.42 27.3712C37.2091 27.625 37.0052 27.8795 36.8085 28.1341C36.1217 29.0228 35.5219 29.9155 35.0172 30.8005C34.9263 30.9597 34.8385 31.1187 34.7538 31.2773C34.6195 31.5292 34.3698 31.6935 34.0855 31.7169C34.0627 31.7189 34.0395 31.7199 34.0165 31.7199C33.7583 31.7199 33.5105 31.5975 33.3535 31.3927C32.3508 30.085 31.1348 28.7573 29.7396 27.4459C28.1424 25.9447 26.2601 24.4191 24.1453 22.9113C23.8046 22.6684 23.6963 22.2067 23.8932 21.8376C24.3195 21.0382 24.8179 20.2334 25.3833 19.4299C25.8022 18.8346 26.258 18.2401 26.7485 17.6497C26.9264 17.4352 27.1937 17.3318 27.456 17.3514C27.456 17.3512 27.456 17.3512 27.4562 17.3514C27.6033 17.3625 27.7488 17.4124 27.8764 17.5031C29.7726 18.8549 31.4956 20.2281 33.0013 21.5878C33.0864 21.4913 33.1724 21.3945 33.2594 21.2977C34.2395 20.2088 35.3534 19.113 36.5783 18.0335C36.6224 17.9946 36.6667 17.9558 36.7112 17.9168C37.915 16.8636 39.2582 15.7957 40.709 14.7388C40.6407 14.6719 40.5715 14.6059 40.5016 14.5413C40.3711 14.4198 40.238 14.3019 40.1022 14.1874C39.3721 13.5716 38.5677 13.0554 37.7 12.6462C37.3371 12.4749 36.9611 12.3223 36.5824 12.1928C35.4396 11.8012 34.243 11.6025 33.0257 11.6025C29.0235 11.6025 25.5136 13.7513 23.5894 16.9559C22.5979 18.6069 22.0273 20.5385 22.0273 22.6007C22.0273 22.7763 22.0314 22.9509 22.0396 23.1246C22.3142 28.9465 27.1368 33.5988 33.0257 33.5988C34.243 33.5988 35.4396 33.4002 36.5824 33.0086C36.9611 32.879 37.3371 32.7263 37.6998 32.5551H37.7C37.9975 32.4149 38.2871 32.2619 38.5679 32.0972C40.47 30.9819 41.9736 29.3268 42.9165 27.3876C43.6312 25.918 44.0238 24.2853 44.0238 22.6007C44.0238 22.1433 43.9953 21.6844 43.9389 21.2314C42.5593 22.3002 41.2969 23.3776 40.181 24.4384Z"
                                fill="#73C3FD"
                              />{" "}
                              <path
                                d="M48.6555 15.2097C48.5415 15.0767 48.4254 14.9434 48.3074 14.8101C47.7392 14.1698 47.1236 13.5275 46.4665 12.8896C45.5969 13.4295 44.7481 13.9768 43.9408 14.5185C43.6233 14.7317 43.2973 14.9541 42.972 15.1797L42.9574 15.1896C42.6403 15.4099 42.325 15.6327 42.0216 15.8511C40.4318 16.9944 38.9716 18.1509 37.6813 19.2878C36.1594 20.6294 34.8245 21.9876 33.7135 23.3247C33.5668 23.5011 33.3514 23.6105 33.1225 23.6248C32.8929 23.6386 32.6656 23.5567 32.4983 23.3994C31.0635 22.0512 29.3968 20.6813 27.5419 19.3253C27.275 19.6655 27.0205 20.007 26.7792 20.3484C26.4276 20.8456 26.1037 21.3429 25.8101 21.8371C25.7798 21.8879 25.7502 21.9384 25.7207 21.9889C27.6512 23.3979 29.3867 24.8233 30.882 26.2289C31.9985 27.2777 33.0117 28.3447 33.8989 29.405C34.0079 29.2267 34.1203 29.0481 34.2364 28.8694C34.334 28.7186 34.4343 28.5678 34.5369 28.4169C34.8198 28.0012 35.1209 27.5854 35.4389 27.1715C35.4391 27.1713 35.4391 27.1711 35.4393 27.1709C35.6621 26.8808 35.8933 26.5917 36.1325 26.3039C36.9813 25.2823 37.9553 24.2474 39.0274 23.2277C39.4834 22.7942 39.9622 22.3587 40.4621 21.9226C41.4209 21.0862 42.4575 20.2478 43.5593 19.4173C43.5958 19.39 43.6321 19.3627 43.6686 19.3354L43.6994 19.3122C44.0237 19.0695 44.3548 18.8264 44.6837 18.5895C46.0302 17.6194 47.4955 16.6382 49.0424 15.6706C48.9163 15.5172 48.7874 15.3635 48.6555 15.2097Z"
                                fill="#73C3FD"
                              />{" "}
                              <path
                                d="M28.0926 34.2744C26.584 33.6366 25.2291 32.7232 24.0657 31.5598C22.9022 30.3959 21.9887 29.0411 21.3509 27.5329C20.6898 25.9698 20.3548 24.3106 20.3548 22.601C20.3548 20.8914 20.6898 19.232 21.3507 17.6691C21.5733 17.1431 21.8293 16.6356 22.1177 16.1486C22.6564 15.2388 23.308 14.3998 24.0657 13.6422C25.0395 12.6686 26.1471 11.87 27.367 11.2614C27.6046 11.1428 27.8466 11.0314 28.0926 10.9272C29.6553 10.2665 31.3145 9.93151 33.0245 9.93151C34.1749 9.93151 35.3096 10.0845 36.4031 10.3865V7.9318C36.4031 7.57864 36.3554 7.23641 36.2661 6.91136C35.8175 5.2767 34.3187 4.07227 32.5435 4.07227H12.0853H7.52574C6.06181 4.07227 4.78557 4.89155 4.13156 6.09559C4.13156 6.09559 4.13155 6.09559 4.13136 6.09578C3.83459 6.6421 3.66602 7.26763 3.66602 7.9318V37.1373H8.64901C9.02811 37.1373 9.39785 37.179 9.75354 37.2581C10.4585 37.4145 11.1088 37.7178 11.6709 38.1337C12.6385 38.8496 13.3444 39.8999 13.6164 41.1123C13.6164 41.1123 13.6164 41.1123 13.6164 41.1125C13.697 41.4715 13.7395 41.8448 13.7395 42.2278V47.2106H14.6786H26.0591H32.5435C33.0933 47.2106 33.6168 47.0949 34.0908 46.8867C34.5249 46.6961 34.9177 46.4276 35.2509 46.099C35.9617 45.3986 36.4031 44.4253 36.4031 43.3509V34.8153C35.3098 35.1175 34.1751 35.2705 33.0245 35.2705C31.3143 35.2705 29.6551 34.9354 28.0926 34.2744ZM7.14429 23.5264H6.63661V21.3281H17.4572V23.5264H12.4717H7.14429ZM6.63661 15.1034H17.4572V17.3015H6.63661V15.1034ZM12.179 8.87868H25.7618H25.8277V11.0768H6.63661V8.87868H12.179ZM6.63661 29.7511V27.5529H12.5558H17.4572V27.8831V29.0284V29.5558V29.7511H6.63661Z"
                                fill="#73C3FD"
                              />{" "}
                              <path
                                d="M9.57645 38.4096L4.28906 38.6223L5.59657 39.8287C8.45814 42.4689 10.5841 44.4304 13.598 47.211L13.6078 47.223L13.6231 47.2341L14.0792 47.655L13.8665 42.3678C13.775 40.0938 11.8505 38.3181 9.57645 38.4096ZM5.95381 39.4415L5.58104 39.0976L9.59764 38.936C11.5815 38.8562 13.2603 40.4052 13.3401 42.389L13.5017 46.4054C10.7228 43.8417 8.66982 41.9475 5.95381 39.4415Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M44.998 21.2913C44.9724 20.657 44.8944 20.0221 44.766 19.4038L44.6772 18.9753L44.3403 19.2545C42.8547 20.4847 41.5047 21.7235 40.3278 22.9363C39.3286 23.9661 38.4264 25.0051 37.6463 26.0244C36.5986 27.3939 35.7364 28.7737 35.0835 30.1257C35.0375 30.2209 34.9477 30.2853 34.8432 30.2979L34.8412 30.2981C34.8334 30.2993 34.8256 30.2999 34.8176 30.3003C34.7224 30.304 34.6291 30.2626 34.568 30.1891C33.4955 28.9011 32.207 27.6026 30.7388 26.3299C29.0645 24.8787 27.1034 23.4155 24.9101 21.981C24.7806 21.8964 24.7338 21.7274 24.8011 21.5881C25.4713 20.1997 26.3557 18.7839 27.4298 17.3797C27.4376 17.3696 27.446 17.36 27.4548 17.351C27.4548 17.3508 27.4548 17.3508 27.455 17.351C27.5565 17.2478 27.7204 17.2279 27.8441 17.3091C29.851 18.6212 31.6724 19.963 33.2582 21.2974C33.267 21.3046 33.2758 21.312 33.2846 21.3194L33.4916 21.494L33.6602 21.2822C34.547 20.169 35.5707 19.0391 36.71 17.9165C36.8751 17.7539 37.0427 17.5914 37.2124 17.4291C38.2087 16.4769 39.3114 15.5084 40.5005 14.541C40.7986 14.2983 41.1022 14.0558 41.4109 13.8136L41.6504 13.6257L41.43 13.4158C40.4136 12.4472 39.2455 11.6799 37.9581 11.1351C37.571 10.971 37.1707 10.827 36.7683 10.7072C35.5551 10.3453 34.2937 10.1876 33.019 10.239C26.6693 10.4944 21.7111 15.8682 21.9665 22.2177C21.9788 22.5233 22.003 22.8255 22.0385 23.1242C22.0303 22.9506 22.0262 22.7759 22.0262 22.6003C22.0262 20.5382 22.5967 18.6066 23.5883 16.9555C25.3051 13.4308 28.8561 10.9336 33.0403 10.7654C34.2566 10.7164 35.4603 10.8666 36.6179 11.212C37.0015 11.3263 37.3833 11.4637 37.7529 11.6202C38.8882 12.1007 39.9266 12.7627 40.8435 13.5902C40.5925 13.789 40.3449 13.988 40.1011 14.1871C38.9267 15.1451 37.836 16.1042 36.8485 17.0482C35.5629 18.2764 34.4098 19.5185 33.4173 20.7434C31.8581 19.4454 30.0814 18.1426 28.1324 16.8681C27.768 16.6299 27.2755 16.7142 27.0113 17.0597C26.4086 17.8476 25.864 18.6399 25.3821 19.4296C24.9878 20.0758 24.6352 20.72 24.3266 21.359C24.1447 21.736 24.2715 22.1927 24.6218 22.4218C26.7953 23.8434 28.7373 25.2921 30.3936 26.728C31.8406 27.9821 33.1088 29.2599 34.1632 30.5262C34.3282 30.7246 34.5809 30.837 34.8389 30.8265C34.8619 30.8257 34.8851 30.8238 34.9077 30.8208C34.9446 30.8164 34.9807 30.8093 35.016 30.8002C35.2521 30.7391 35.45 30.5783 35.5579 30.3547C35.912 29.6215 36.3299 28.8789 36.8074 28.1337C37.189 27.5381 37.6089 26.9404 38.0649 26.3446C38.8324 25.3415 39.721 24.3183 40.7059 23.3031C41.7781 22.1984 42.9961 21.071 44.3317 19.9478C44.4062 20.3983 44.4532 20.8556 44.4716 21.3124C44.5588 23.478 43.9932 25.5838 42.9154 27.3872C41.9724 29.3265 40.4688 30.9816 38.5667 32.0969C38.644 32.0588 38.7204 32.02 38.7965 31.9802C40.7088 30.9828 42.3023 29.472 43.4045 27.6114C44.5364 25.7005 45.0874 23.515 44.998 21.2913Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M49.8042 14.0618C48.9069 13.0339 47.8699 11.9971 46.7218 10.9799L46.5691 10.8447L46.3997 10.9589C45.4879 11.5741 44.5984 12.198 43.7559 12.8138C43.4449 13.0411 43.1261 13.2782 42.8094 13.517L42.795 13.5279C42.4832 13.7636 42.1747 14.0009 41.8782 14.2329C40.3219 15.4498 38.8962 16.6753 37.6401 17.8754C36.1537 19.2959 34.8562 20.727 33.7835 22.1289C33.7318 22.1964 33.6537 22.2401 33.5697 22.2487C33.485 22.2573 33.3999 22.2304 33.3357 22.1747C31.7766 20.8236 29.9667 19.4601 27.9564 18.1222L27.7473 17.9831L27.5984 18.1855C26.809 19.2586 26.1314 20.3411 25.5845 21.4029L25.4766 21.6124L25.6728 21.743C25.7193 21.7738 25.7657 21.8048 25.812 21.8358C27.8021 23.1659 29.5954 24.5202 31.1444 25.863C32.2848 26.8514 33.3242 27.8609 34.2383 28.8681C34.3222 28.9606 34.4049 29.0529 34.4867 29.1452L34.7374 29.4285L34.9161 29.0948C35.5274 27.9526 36.2813 26.7933 37.157 25.6489C37.9515 24.6103 38.8695 23.5528 39.8855 22.5057C40.0741 22.3113 40.2669 22.1164 40.464 21.9213C39.9641 22.3574 39.4853 22.7929 39.0293 23.2264C37.9572 24.2461 36.9832 25.2809 36.1344 26.3026C35.8952 26.5903 35.664 26.8795 35.4412 27.1696C35.441 27.1698 35.441 27.17 35.4408 27.1702C35.1509 27.62 34.8806 28.0697 34.6313 28.5173C34.6004 28.4833 34.5696 28.4496 34.5388 28.4156C33.6323 27.4256 32.6087 26.4348 31.4894 25.4649C29.9388 24.1208 28.1473 22.7659 26.1616 21.4359C26.353 21.0749 26.5598 20.7114 26.7811 20.3471C27.1136 19.7994 27.4788 19.2494 27.8745 18.7011C29.7823 19.9815 31.5028 21.2833 32.9908 22.5728C33.164 22.7232 33.3944 22.796 33.6233 22.7728C33.8514 22.7494 34.0621 22.6315 34.2018 22.4493C35.2582 21.0686 36.5373 19.658 38.0042 18.2563C39.2476 17.0682 40.6603 15.8541 42.2028 14.6479C42.4971 14.4174 42.8032 14.1821 43.1111 13.9494L43.1253 13.9386C43.4412 13.7002 43.7581 13.4649 44.0669 13.2392C44.8517 12.6655 45.6778 12.0845 46.525 11.5101C47.5132 12.3949 48.4148 13.293 49.2107 14.1853C48.9067 14.3929 48.6062 14.6008 48.3093 14.8088C48.4273 14.9421 48.5434 15.0754 48.6574 15.2084C49.0175 14.9561 49.3832 14.7043 49.7537 14.453L49.9999 14.2859L49.8042 14.0618Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M37.8485 33.0952L37.5123 33.2134C36.38 33.6119 35.1889 33.8388 33.9718 33.8878C32.3338 33.9537 30.7319 33.6967 29.2106 33.1241C27.7414 32.5713 26.4086 31.7487 25.2496 30.6793C24.0903 29.6095 23.1633 28.3471 22.4942 26.9273C21.8012 25.4565 21.4164 23.8804 21.3507 22.243C21.2847 20.6054 21.5417 19.0036 22.1142 17.4819C22.6673 16.0125 23.4899 14.6797 24.5593 13.5207C25.3858 12.6249 26.3276 11.8677 27.3684 11.2611C27.6743 11.0826 27.9886 10.9173 28.3111 10.7653C29.7817 10.0725 31.3578 9.68789 32.9956 9.62194C34.1517 9.5755 35.2976 9.69081 36.4044 9.96495C36.4628 9.97919 36.5209 9.99421 36.5789 10.0094L36.9234 10.1004L36.7964 6.9405C36.6992 4.52383 34.6539 2.63689 32.2372 2.73406L7.23972 3.73967C4.82285 3.83684 2.93572 5.88201 3.03289 8.29888L3.66739 24.072L4.19303 37.137L4.22795 38.007L9.73326 37.7855C10.4195 37.758 11.077 37.8841 11.6723 38.1334C11.1102 37.7174 10.4599 37.4142 9.75492 37.2577C9.74068 37.2581 9.72643 37.2585 9.71219 37.2591L4.7333 37.4595L4.72022 37.137L3.66739 10.9645L3.5593 8.27761C3.5273 7.47979 3.74095 6.72783 4.13274 6.09547C4.13293 6.09527 4.13293 6.09527 4.13293 6.09527C4.78695 4.89123 6.06319 4.07195 7.52712 4.07195H12.0867L32.2585 3.26047C34.3678 3.1754 36.1559 4.80889 36.2675 6.91104C36.2684 6.92801 36.2694 6.94479 36.27 6.96177L36.3687 9.41434C35.264 9.15659 34.124 9.04928 32.9745 9.09552C31.2659 9.1644 29.6213 9.56575 28.0866 10.2888C26.6047 10.9871 25.2877 11.9543 24.172 13.1634C23.342 14.0633 22.6542 15.0634 22.119 16.1483C21.9349 16.5211 21.7688 16.9041 21.6211 17.2963C21.0237 18.8845 20.7556 20.5559 20.8243 22.2641C20.893 23.9723 21.2945 25.6169 22.0176 27.1519C22.7157 28.6334 23.6829 29.9504 24.8924 31.0664C26.1015 32.1823 27.4921 33.0404 29.0251 33.6171C30.6127 34.2148 32.2842 34.4829 33.993 34.4142C35.1426 34.3679 36.2704 34.1693 37.3505 33.8236L37.6937 42.3521C37.7612 44.0344 36.7363 45.5122 35.2523 46.0987C34.919 46.4273 34.5263 46.6958 34.0921 46.8864C36.471 46.7486 38.3163 44.7214 38.22 42.3309L37.8485 33.0952Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M14.698 47.6671L26.0602 47.21H14.6797L14.698 47.6671Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M7.38353 29.4336L7.39621 29.7509L7.4046 29.96L7.93101 29.9388L12.602 29.7509L17.4588 29.5556V29.0282L7.90994 29.4124L7.86389 28.2688L17.4588 27.8829V27.5527H12.5573L7.84263 27.7424L7.31641 27.7635L7.33748 28.2899L7.38353 29.4336Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M7.13177 23.2133L7.14425 23.5257H12.4716L17.4384 23.3259L17.4571 23.3251L17.9648 23.3048L17.9436 22.7784L17.8977 21.6346L17.8764 21.1084L17.35 21.1295L12.4316 21.3273L7.59087 21.522L7.06445 21.5433L7.08572 22.0697L7.13177 23.2133ZM17.3713 21.6559L17.4173 22.7996L7.65799 23.1922L7.61213 22.0485L17.3713 21.6559Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M6.88163 16.9936L6.9028 17.52L7.42918 17.4988L17.1884 17.1062L17.7147 17.0851L17.6936 16.5587L17.6476 15.415L17.6264 14.8887L17.1 14.9098L7.34083 15.3024L6.81445 15.3236L6.83562 15.85L6.88163 16.9936ZM17.1212 15.4362L17.1672 16.5799L7.40803 16.9725L7.36202 15.8288L17.1212 15.4362Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M25.3039 10.55L25.8299 10.5288H25.8303L25.8299 10.519L25.8092 10.0026L25.764 8.87793H12.1812L7.09263 9.0826L6.63879 9.10094L6.56641 9.10387L6.58748 9.63029L6.63352 10.7738L6.63879 10.9055L6.64562 11.0761L6.6546 11.3003L7.18101 11.279L12.2259 11.0761L25.3039 10.55ZM7.15994 10.7528L7.11389 9.60902L25.2368 8.88008L25.2828 10.0236L7.15994 10.7528Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M19.4254 47.8208L18.9661 47.8427C18.7312 47.8541 18.5498 48.0535 18.561 48.2884C18.5723 48.5233 18.7718 48.7046 19.0067 48.6934L19.466 48.6714C19.4927 48.6702 19.5187 48.6665 19.5438 48.6606C19.7396 48.6144 19.881 48.434 19.871 48.2258C19.8598 47.9909 19.6603 47.8096 19.4254 47.8208Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M17.5211 47.9116L17.0618 47.9336C16.8269 47.9448 16.6455 48.1443 16.6567 48.3792C16.668 48.6141 16.8675 48.7954 17.1024 48.7842L17.5617 48.7623C17.5884 48.761 17.6144 48.7573 17.6395 48.7514C17.8353 48.7053 17.9767 48.5248 17.9667 48.3166C17.9555 48.0817 17.756 47.9004 17.5211 47.9116Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M15.6148 48.0034L15.1555 48.0254C14.9206 48.0366 14.7393 48.2361 14.7505 48.471C14.7617 48.7059 14.9612 48.8872 15.1961 48.876L15.6554 48.8541C15.6821 48.8528 15.7081 48.8491 15.7332 48.8432C15.9291 48.7971 16.0704 48.6166 16.0605 48.4085C16.0493 48.1735 15.8497 47.9922 15.6148 48.0034Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M25.0426 47.5835L24.5832 47.6054C24.3484 47.6167 24.167 47.8162 24.1782 48.0511C24.1894 48.286 24.3889 48.4673 24.6238 48.4561L25.0832 48.4341C25.1099 48.4329 25.1358 48.4292 25.161 48.4232C25.3568 48.3771 25.4981 48.1967 25.4882 47.9885C25.477 47.7536 25.2775 47.5723 25.0426 47.5835Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M23.1383 47.6743L22.6789 47.6963C22.4441 47.7075 22.2627 47.907 22.2739 48.1419C22.2852 48.3768 22.4847 48.5581 22.7196 48.5469L23.1789 48.525C23.2056 48.5237 23.2316 48.52 23.2567 48.5141C23.4525 48.468 23.5939 48.2875 23.5839 48.0793C23.5727 47.8444 23.3732 47.6631 23.1383 47.6743Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M21.232 47.7651L20.7727 47.7871C20.5378 47.7984 20.3565 47.9978 20.3677 48.2327C20.3789 48.4676 20.5784 48.6489 20.8133 48.6377L21.2727 48.6158C21.2993 48.6145 21.3253 48.6108 21.3504 48.6049C21.5462 48.5588 21.6876 48.3784 21.6777 48.1702C21.6665 47.9352 21.4669 47.7539 21.232 47.7651Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M43.3447 29.4156C43.1385 29.2452 42.8321 29.2744 42.6616 29.4806C42.5789 29.5807 42.4946 29.6819 42.4109 29.7813C42.403 29.7907 42.3956 29.8002 42.3885 29.81C42.3204 29.9042 42.2886 30.0184 42.2987 30.1354C42.3098 30.2645 42.3705 30.3816 42.4697 30.465C42.6564 30.6221 42.9322 30.6159 43.1112 30.4505C43.1261 30.4367 43.1403 30.4217 43.1534 30.4062C43.2394 30.304 43.3257 30.2005 43.4098 30.0987C43.5803 29.8923 43.551 29.586 43.3447 29.4156Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M44.3976 27.8312C44.1802 27.6853 43.8863 27.7391 43.734 27.9498C43.7307 27.9543 43.7274 27.959 43.7243 27.9637C43.6521 28.0713 43.5782 28.1803 43.5046 28.2877C43.3535 28.5085 43.4101 28.811 43.6309 28.9622C43.8271 29.0965 44.0892 29.07 44.254 28.899C44.2728 28.8796 44.2901 28.8583 44.3054 28.836C44.3813 28.725 44.4569 28.6135 44.5301 28.5045C44.6792 28.2823 44.6198 27.9803 44.3976 27.8312Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M45.1162 26.1657C44.9021 26.0657 44.6513 26.136 44.5176 26.3209C44.5 26.3453 44.4844 26.3717 44.4712 26.3999C44.42 26.5096 44.3652 26.625 44.3038 26.7526C44.1878 26.9937 44.2896 27.2842 44.5307 27.4002C44.7377 27.4999 44.9887 27.4394 45.1274 27.2566C45.147 27.2309 45.1642 27.2028 45.1783 27.1733C45.2416 27.0418 45.2979 26.9232 45.3504 26.8107C45.4637 26.5683 45.3586 26.2789 45.1162 26.1657Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M45.6381 24.446C45.5156 24.4035 45.3839 24.4113 45.2673 24.4679C45.1941 24.5033 45.1324 24.5554 45.086 24.6195C45.0585 24.6575 45.0364 24.6998 45.0207 24.7454L45.0085 24.7806C44.9699 24.892 44.9305 25.0029 44.8911 25.1102C44.7989 25.3613 44.9282 25.6407 45.1794 25.7329C45.3807 25.8068 45.6101 25.7379 45.7372 25.5654C45.7645 25.5285 45.7862 25.4879 45.8021 25.4446C45.8439 25.3307 45.8855 25.214 45.9256 25.0978L45.9376 25.0634C45.98 24.9409 45.9723 24.8093 45.9157 24.6926C45.8591 24.576 45.7605 24.4884 45.6381 24.446Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M45.9556 22.5869C45.8275 22.5671 45.6993 22.5983 45.5947 22.6749C45.5631 22.6981 45.5347 22.7246 45.51 22.7538C45.4531 22.8211 45.4157 22.903 45.4019 22.9922C45.3849 23.102 45.3639 23.2258 45.3378 23.3708C45.2904 23.6341 45.466 23.887 45.7293 23.9344C45.941 23.9725 46.1491 23.8697 46.2471 23.6785C46.269 23.636 46.2844 23.5903 46.2929 23.5429C46.3205 23.3897 46.3428 23.2581 46.3609 23.1405C46.4018 22.8762 46.22 22.6278 45.9556 22.5869Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M45.9957 20.6134C45.8663 20.6047 45.7414 20.6468 45.6437 20.7321C45.6141 20.7579 45.5882 20.7867 45.5661 20.818C45.5152 20.8899 45.4849 20.9747 45.4788 21.0648C45.4713 21.1756 45.461 21.3008 45.4474 21.4475C45.4227 21.7139 45.6194 21.9507 45.8858 21.9754C46.0999 21.9953 46.2984 21.875 46.3797 21.6761C46.3979 21.6318 46.4093 21.585 46.4137 21.537C46.4281 21.382 46.439 21.249 46.447 21.1303C46.4651 20.8634 46.2626 20.6315 45.9957 20.6134Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M39.8561 35.3288L39.1657 36.0192C39.0203 36.1646 39.0203 36.4003 39.1657 36.5457C39.3111 36.6911 39.5468 36.6911 39.6922 36.5457L40.3826 35.8553C40.528 35.7099 40.528 35.4742 40.3826 35.3288C40.2372 35.1834 40.0015 35.1834 39.8561 35.3288Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M42.7838 32.401L42.0934 33.0914C41.948 33.2368 41.948 33.4726 42.0934 33.618C42.2388 33.7634 42.4746 33.7634 42.6199 33.618L43.3103 32.9276C43.4557 32.7822 43.4557 32.5464 43.3103 32.401C43.1649 32.2556 42.9292 32.2556 42.7838 32.401Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M42.6199 35.3288C42.4745 35.1834 42.2388 35.1834 42.0934 35.3288C41.948 35.4742 41.948 35.7099 42.0934 35.8553L42.7838 36.5457C42.9292 36.6911 43.1649 36.6911 43.3103 36.5457C43.4557 36.4003 43.4557 36.1646 43.3103 36.0192L42.6199 35.3288Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M39.6922 32.401C39.5468 32.2556 39.3111 32.2556 39.1657 32.401C39.0203 32.5464 39.0203 32.7822 39.1657 32.9276L39.8561 33.618C40.0015 33.7634 40.2372 33.7634 40.3826 33.618C40.528 33.4726 40.528 33.2368 40.3826 33.0914L39.6922 32.401Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M12.4099 3.00402L12.8976 2.51634C13.0003 2.41363 13.0003 2.24712 12.8976 2.14441C12.7949 2.04171 12.6284 2.04171 12.5257 2.14441L12.038 2.6321C11.9353 2.73481 11.9353 2.90132 12.038 3.004C12.1407 3.10673 12.3072 3.10673 12.4099 3.00402Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M14.4783 0.93664L14.9659 0.448955C15.0686 0.346248 15.0686 0.179738 14.9659 0.0770306C14.8632 -0.0256769 14.6967 -0.0256769 14.594 0.0770306L14.1063 0.564716C14.0036 0.667423 14.0036 0.833933 14.1063 0.93664C14.209 1.03933 14.3756 1.03933 14.4783 0.93664Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M14.594 3.00402C14.6967 3.10673 14.8632 3.10673 14.9659 3.00402C15.0686 2.90132 15.0686 2.73481 14.9659 2.6321L14.4782 2.14441C14.3755 2.04171 14.209 2.04171 14.1063 2.14441C14.0036 2.24712 14.0036 2.41363 14.1063 2.51634L14.594 3.00402Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M12.5257 0.93664C12.6284 1.03935 12.7949 1.03935 12.8976 0.93664C13.0003 0.833933 13.0003 0.667423 12.8976 0.564716L12.4099 0.0770306C12.3072 -0.0256769 12.1407 -0.0256769 12.038 0.0770306C11.9353 0.179738 11.9353 0.346248 12.038 0.448955L12.5257 0.93664Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M26.8186 49.7147L26.3309 50.2024C26.2282 50.3051 26.2282 50.4716 26.3309 50.5743C26.4336 50.677 26.6002 50.677 26.7029 50.5743L27.1905 50.0866C27.2933 49.9839 27.2933 49.8174 27.1905 49.7147C27.0878 49.612 26.9213 49.612 26.8186 49.7147Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M28.887 47.6464L28.3993 48.134C28.2966 48.2368 28.2966 48.4033 28.3993 48.506C28.502 48.6087 28.6685 48.6087 28.7712 48.506L29.2589 48.0183C29.3616 47.9156 29.3616 47.7491 29.2589 47.6464C29.1562 47.5437 28.9897 47.5437 28.887 47.6464Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M28.7712 49.7147C28.6685 49.612 28.502 49.612 28.3993 49.7147C28.2966 49.8174 28.2966 49.9839 28.3993 50.0867L28.887 50.5743C28.9897 50.677 29.1562 50.677 29.2589 50.5743C29.3616 50.4716 29.3616 50.3051 29.2589 50.2024L28.7712 49.7147Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M26.7029 47.6464C26.6002 47.5437 26.4336 47.5437 26.3309 47.6464C26.2282 47.7491 26.2282 47.9156 26.3309 48.0183L26.8186 48.506C26.9213 48.6087 27.0878 48.6087 27.1905 48.506C27.2933 48.4033 27.2933 48.2368 27.1905 48.134L26.7029 47.6464Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M37.7693 8.8009L38.257 8.31321C38.3597 8.21051 38.3597 8.044 38.257 7.94129C38.1542 7.83858 37.9877 7.83858 37.885 7.94129L37.3973 8.42897C37.2946 8.53168 37.2946 8.69819 37.3973 8.8009C37.5001 8.90361 37.6666 8.90361 37.7693 8.8009Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M39.8376 6.73352L40.3253 6.24583C40.428 6.14312 40.428 5.97661 40.3253 5.87391C40.2226 5.7712 40.0561 5.7712 39.9534 5.87391L39.4657 6.36159C39.363 6.4643 39.363 6.63081 39.4657 6.73352C39.5684 6.83622 39.7349 6.8362 39.8376 6.73352Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M39.9534 8.8009C40.0561 8.90361 40.2226 8.90361 40.3253 8.8009C40.428 8.69819 40.428 8.53168 40.3253 8.42897L39.8376 7.94129C39.7349 7.83858 39.5684 7.83858 39.4657 7.94129C39.363 8.044 39.363 8.21051 39.4657 8.31321L39.9534 8.8009Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M37.885 6.73352C37.9877 6.83622 38.1542 6.83622 38.257 6.73352C38.3597 6.63081 38.3597 6.4643 38.257 6.36159L37.7693 5.87391C37.6666 5.7712 37.5001 5.7712 37.3973 5.87391C37.2946 5.97661 37.2946 6.14312 37.3973 6.24583L37.885 6.73352Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M0.564716 24.0604L0.0770306 24.5481C-0.0256769 24.6508 -0.0256769 24.8173 0.0770306 24.92C0.179738 25.0227 0.346247 25.0227 0.448954 24.92L0.936639 24.4323C1.03935 24.3296 1.03935 24.1631 0.936639 24.0604C0.833931 23.9577 0.667423 23.9577 0.564716 24.0604Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M2.63307 21.993L2.14539 22.4807C2.04268 22.5834 2.04268 22.7499 2.14539 22.8527C2.2481 22.9554 2.41461 22.9554 2.51731 22.8527L3.005 22.365C3.10771 22.2623 3.10771 22.0958 3.005 21.993C2.90227 21.8903 2.73576 21.8903 2.63307 21.993Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M2.51731 24.0604C2.41461 23.9577 2.2481 23.9577 2.14539 24.0604C2.04268 24.1631 2.04268 24.3296 2.14539 24.4324L2.63307 24.92C2.73578 25.0227 2.90229 25.0227 3.005 24.92C3.10771 24.8173 3.10771 24.6508 3.005 24.5481L2.51731 24.0604Z"
                                fill="#171D34"
                              />{" "}
                              <path
                                d="M0.448954 21.993C0.346247 21.8903 0.179738 21.8903 0.0770306 21.993C-0.0256769 22.0958 -0.0256769 22.2623 0.0770306 22.365L0.564716 22.8527C0.667423 22.9554 0.833931 22.9554 0.936639 22.8527C1.03935 22.7499 1.03935 22.5834 0.936639 22.4807L0.448954 21.993Z"
                                fill="#171D34"
                              />{" "}
                            </g>{" "}
                            <defs>
                              {" "}
                              <clipPath id="clip0_1081_42777">
                                {" "}
                                <rect
                                  width="50"
                                  height="50"
                                  fill="white"
                                />{" "}
                              </clipPath>{" "}
                            </defs>{" "}
                          </svg>{" "}
                          {/* Select monthly review checklist */}
                          {
                            type === "MONTHLY_FORM" ? 
                            "Select monthly review checklist" :
                            "Select compliance form"
                          }
                        </span>
                      </div>
                      {type === "MONTHLY_FORM" && (
                        <>
                          <RadioInput
                            onChangeFunc={() =>
                              setSelectedValues({
                                ...emptyStateForSelectedValues,
                                typeOfTask: "Monthly review checklist",
                              })
                            }
                            checked={
                              selectedValues.typeOfTask ===
                              "Monthly review checklist"
                            }
                            name="TypeOfTask"
                            label="Monthly review checklist"
                          />
                          {[
                            {
                              typeOfTask: "Trust Account",
                              accounts: trustAccountList,
                            },

                            {
                              typeOfTask: "General Account",
                              accounts: generalAccountList,
                            },
                            {
                              typeOfTask: "Credit Card",
                              accounts: creditAccountList,
                            },
                          ].map((e, index) => {
                            return (
                              <TaskSelector
                                key={index}
                                isDisabled={
                                  selectedValues.typeOfTask !==
                                  "Monthly review checklist" &&
                                  selectedValues.taskSelected !== e.typeOfTask
                                }
                                taskType={e.typeOfTask}
                                onChangeFunc={() =>

                                  setSelectedValues({
                                    ...selectedValues,
                                    taskSelected: e.typeOfTask,
                                    month: "",
                                    account: "",

                                  })
                                }
                                value={(param, type) =>
                                  dropdownValue(param, type)
                                }
                                amountValue={taskInfo.task_type_account}
                                onChangeDropFunc={(value, e, type, all) => {
                                  onChangeDropFunc(value, e, type, all);
                                }}
                                checked={
                                  selectedValues.taskSelected === e.typeOfTask
                                }
                                account={e.accounts}
                                onChangeFromToDate={(date) => {

                                  settaskDate((prev) => ({
                                    ...prev,
                                    [date.target.name]: date.target.value
                                  }))



                                }}
                                onChangeGetAccountId={(account_id) => {
                                  console.log("checkchnagefun", account_id)
                                  setTaskInfo((prev) => ({
                                    ...prev,
                                    account_id: account_id
                                  }))
                                }}
                                FromTovalue={taskDate}
                              />
                            );
                          })}



                          <>
                            <div className="pHead">
                              <span className="h5">
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {" "}
                                  <g clip-path="url(#clip0_1081_42844)">
                                    {" "}
                                    <path
                                      d="M44.4731 38.8149C44.4304 38.6235 44.3574 38.4357 44.2515 38.2551C42.9114 35.6028 40.6591 32.4895 38.9071 30.8658C33.7255 26.0634 27.0878 25.0265 21.0356 23.4211C20.9488 23.3983 20.8622 23.3752 20.7757 23.3519C19.8968 23.1155 19.0309 22.8658 18.1844 22.5894C14.4136 21.3581 11.0268 19.596 8.58119 16.1196C6.98511 13.8882 7.10112 10.7734 4.52406 10.7734C4.315 10.7734 4.08812 10.794 3.84114 10.8371C3.07323 10.9728 1.77843 11.6497 1.68507 13.2761C1.67607 13.4317 1.67816 13.5959 1.69278 13.7691C1.71223 14.0024 1.75465 14.2519 1.8231 14.5187C3.81463 22.3185 10.1 23.8553 11.6276 28.4575C11.7414 28.8004 11.8288 29.1605 11.8862 29.5413C11.9631 30.0544 11.9855 30.6052 11.944 31.2034C11.3745 39.0653 10.338 41.8753 14.3197 42.6583C14.5452 42.7028 14.7867 42.7408 15.0452 42.7726C15.8559 42.8727 16.8343 42.9141 18.0113 42.9141C19.4637 42.9141 21.2184 42.8508 23.3332 42.7562H23.3337C24.2872 42.7134 25.3138 42.6643 26.419 42.6117C26.4282 42.6113 26.4373 42.6109 26.4465 42.6104C26.9485 42.5865 27.3703 42.5005 27.7234 42.355C28.0773 42.2094 28.3618 42.0039 28.5887 41.7415C29.9565 40.1594 29.2236 36.5059 28.8495 31.3675C29.447 31.7073 29.9999 32.0406 30.5121 32.3666C30.6943 32.4826 30.8713 32.5978 31.0434 32.7121C32.6218 33.7601 33.7811 34.7321 34.6562 35.6153C38.1561 39.1483 37.7044 42.2038 40.832 42.2038C41.0251 42.2038 41.2316 42.1922 41.4538 42.1682C43.1598 41.9904 44.5084 40.6099 44.5199 39.261C44.5213 39.1114 44.5062 38.9621 44.4731 38.8149Z"
                                      fill="#73C3FD"
                                    />{" "}
                                    <path
                                      d="M20.3881 20.5374C23.5646 20.5374 26.7401 18.4382 26.7401 14.2365C26.7401 10.037 23.5612 7.93555 20.3832 7.93555C17.2068 7.93555 14.0312 10.0347 14.0312 14.2365C14.0312 18.4359 17.2101 20.5374 20.3881 20.5374Z"
                                      fill="#73C3FD"
                                    />{" "}
                                    <path
                                      d="M46.581 34.4087C44.8361 31.9468 42.1133 29.166 40.1025 27.7925C39.4846 27.3705 38.8339 26.9769 38.168 26.6224C37.5347 26.2853 36.8674 25.9729 36.1845 25.6936C34.9295 25.1804 33.5997 24.765 32.1193 24.4241C29.3901 23.7953 26.6012 23.53 23.9041 23.2735C22.9018 23.1783 21.8654 23.0798 20.8653 22.9649C19.9384 22.8583 19.0449 22.7362 18.1836 22.5889C19.0301 22.8652 19.896 23.1149 20.775 23.3513C20.8614 23.3746 20.948 23.3978 21.0348 23.4206C27.2711 24.1202 34.0088 24.1555 39.8578 28.1507C41.8302 29.498 44.5175 32.2446 46.2344 34.67C47.2978 35.9892 46.2937 38.0932 44.4723 38.8144C44.3344 38.869 44.1919 38.9156 44.0452 38.9534C43.8289 39.0098 43.6263 39.0519 43.4354 39.0803C40.3421 39.5421 40.3377 36.4534 36.3545 33.4758C34.9448 32.422 32.946 31.2766 29.9843 30.1317C30.1598 30.9136 30.3386 31.6587 30.5113 32.3661C31.8166 37.7146 32.7672 40.9123 29.2675 41.6061C29.0375 41.6517 28.811 41.6966 28.5879 41.7409C28.3611 42.0033 28.0765 42.2088 27.7227 42.3544C28.1583 42.2683 28.6071 42.1794 29.0694 42.0877L29.3518 42.0318C30.4304 41.8179 31.1726 41.3718 31.6209 40.6682C31.8743 40.2703 32.0287 39.7995 32.093 39.2288C32.1487 38.7329 32.1357 38.1583 32.0531 37.4722C31.9013 36.2105 31.5299 34.6973 31.0998 32.945C31.0808 32.8674 31.0617 32.7896 31.0426 32.7115C30.8944 32.1074 30.7432 31.4881 30.5919 30.8402C32.8386 31.7596 34.6445 32.7392 36.0948 33.8233C37.681 35.009 38.6295 36.2283 39.3918 37.208C39.9672 37.9476 40.4642 38.5864 41.0745 39.0118C41.7675 39.4949 42.538 39.653 43.4994 39.5095C43.7057 39.4786 43.9257 39.4328 44.1533 39.3735C44.2769 39.3417 44.399 39.3038 44.5191 39.2604C45.0349 39.0735 45.5139 38.7817 45.9207 38.4038C46.4025 37.9565 46.7581 37.4154 46.9491 36.8391C47.0903 36.4129 47.1347 35.9908 47.0809 35.5843C47.023 35.1477 46.8549 34.7522 46.581 34.4087Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M23.3321 42.7555C22.4679 42.9121 21.683 43.0452 20.9692 43.1517C17.8163 43.6224 16.0587 43.5766 15.0441 42.7719C13.4543 41.511 13.6897 38.3863 13.2396 32.465C13.104 30.7502 12.5061 29.4982 11.6265 28.4568C8.91705 25.2485 3.5349 24.0389 0.76646 17.4572C-0.071995 15.4723 0.838285 14.2932 1.69168 13.7684C1.67706 13.5952 1.67497 13.4309 1.68397 13.2754C1.48167 13.379 1.28403 13.5081 1.10534 13.6541C0.731912 13.9593 0.446856 14.3263 0.25773 14.7452C0.0793697 15.1403 -0.00723969 15.5729 0.000473197 16.0305C0.00882882 16.5336 0.132075 17.0705 0.366836 17.6259C1.19372 19.5918 2.32157 21.2651 3.81482 22.741C5.1154 24.0263 6.47737 24.9655 7.79466 25.8741C9.50242 27.0517 10.9793 28.0701 11.8851 29.5406C12.3859 30.3536 12.7124 31.3049 12.8069 32.4978C12.855 33.1296 12.8953 33.7317 12.9308 34.3023C12.9663 34.8727 12.997 35.4117 13.0258 35.9169C13.1326 37.7914 13.217 39.272 13.4326 40.4244C13.6189 41.4195 13.8996 42.1343 14.3186 42.6576C14.448 42.8191 14.5905 42.9624 14.7475 43.0902C15.0453 43.3323 15.3894 43.5133 15.7995 43.6429C16.1901 43.7665 16.6344 43.8414 17.1578 43.8719C18.1029 43.9269 19.3344 43.8343 21.0332 43.5807C22.5041 43.3613 24.2863 43.0282 26.4179 42.611C25.3127 42.6636 24.2861 42.7127 23.3326 42.7555H23.3321Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M13.3816 18.2533C13.8595 19.0091 14.4807 19.6373 15.2279 20.1206C15.9264 20.5724 16.7143 20.8853 17.5696 21.0505C18.39 21.2089 19.2354 21.2251 20.0825 21.0987C20.9293 20.9723 21.7327 20.71 22.4704 20.3193C23.2398 19.9117 23.9015 19.3827 24.4371 18.7468C25.01 18.0666 25.4202 17.2844 25.6563 16.422C25.9093 15.4977 25.9575 14.493 25.7997 13.4359C25.642 12.3793 25.3023 11.4328 24.79 10.6228C24.3121 9.86702 23.6909 9.23877 22.9437 8.75548C22.2452 8.30368 21.4574 7.99084 20.602 7.82566C19.7817 7.66722 18.9362 7.65101 18.0892 7.77745C17.2424 7.90385 16.439 8.16607 15.7012 8.55684C14.9319 8.96438 14.2702 9.49342 13.7346 10.1293C13.1616 10.8095 12.7514 11.5917 12.5154 12.4541C12.2624 13.3784 12.2142 14.3831 12.3719 15.4402C12.5297 16.4968 12.8694 17.4433 13.3816 18.2533ZM18.1532 8.20654C21.2964 7.73738 24.7507 9.34651 25.3706 13.5C25.9909 17.6557 23.1601 20.2006 20.0184 20.6696C16.8753 21.1387 13.421 19.5296 12.801 15.3762C12.1807 11.2204 15.0116 8.67547 18.1532 8.20654Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M27.5192 12.8768C27.5564 12.977 27.5938 13.0789 27.6302 13.1795C27.6336 13.189 27.6373 13.1982 27.6414 13.2073C27.6804 13.2947 27.7487 13.3644 27.8363 13.4055C27.9329 13.4508 28.0414 13.4558 28.1418 13.4195C28.3308 13.3512 28.44 13.152 28.3959 12.9562C28.3923 12.9399 28.3875 12.9236 28.3818 12.9078C28.3444 12.8044 28.3062 12.7003 28.2683 12.5983C28.1914 12.3917 27.961 12.2862 27.7545 12.363C27.548 12.4397 27.4425 12.6702 27.5192 12.8768Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M26.8707 11.4816C26.8726 11.4859 26.8745 11.4901 26.8766 11.4943C26.9235 11.5901 26.9707 11.6877 27.017 11.7844C27.112 11.9832 27.3511 12.0676 27.5499 11.9726C27.7266 11.8881 27.8157 11.6903 27.7618 11.5023C27.7557 11.4809 27.7476 11.4598 27.738 11.4397C27.6902 11.3398 27.6419 11.2399 27.5944 11.1428C27.4975 10.9449 27.2576 10.8627 27.0597 10.9596C26.8661 11.0544 26.7833 11.2862 26.8707 11.4816Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M26.0326 10.2519C26.0427 10.2746 26.0551 10.2966 26.0698 10.3177C26.1269 10.3994 26.1865 10.486 26.2522 10.5824C26.3762 10.7645 26.6253 10.8117 26.8074 10.6877C26.9638 10.5812 27.0243 10.3773 26.9511 10.2031C26.9408 10.1785 26.9279 10.1547 26.9127 10.1325C26.8451 10.0331 26.7837 9.94405 26.7252 9.86022C26.5991 9.67954 26.3495 9.63513 26.1688 9.76123C26.0092 9.87265 25.9559 10.0804 26.0326 10.2519Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M25.1168 9.2439L25.1368 9.2671C25.2004 9.34052 25.2632 9.41438 25.3234 9.48667C25.4644 9.65597 25.7169 9.67897 25.8862 9.53795C26.0219 9.42488 26.0674 9.23294 25.9968 9.07119C25.9817 9.03656 25.9618 9.00433 25.9374 8.97512C25.8735 8.89836 25.8074 8.8206 25.7411 8.74405L25.7215 8.72138C25.6518 8.64062 25.5547 8.59185 25.4482 8.58409C25.3418 8.57633 25.2387 8.61049 25.1579 8.68028C25.0771 8.75006 25.0284 8.84713 25.0206 8.95362C25.0157 9.02041 25.0274 9.08589 25.054 9.14535C25.0697 9.18063 25.0908 9.21383 25.1168 9.2439Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M23.8987 8.0734C23.9232 8.14169 23.9661 8.20216 24.0241 8.24879C24.0953 8.30615 24.175 8.37216 24.2675 8.45057C24.4357 8.59297 24.6883 8.57202 24.8308 8.40388C24.9452 8.26871 24.9577 8.07798 24.8618 7.92923C24.8405 7.89611 24.8143 7.86632 24.784 7.84066C24.6862 7.7578 24.6016 7.68767 24.5253 7.62626C24.3536 7.48809 24.1016 7.51529 23.9634 7.68692C23.8964 7.77007 23.8659 7.87431 23.8774 7.98046C23.8809 8.01261 23.888 8.04374 23.8987 8.0734Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M22.5446 7.23409C22.5749 7.30004 22.6228 7.3566 22.6846 7.39809C22.7605 7.44914 22.8455 7.50806 22.9444 7.57825C23.1242 7.70569 23.3741 7.66315 23.5016 7.48341C23.604 7.33892 23.6001 7.14782 23.4919 7.00785C23.4678 6.97668 23.4391 6.94925 23.4067 6.92629C23.3022 6.85213 23.2118 6.78951 23.1305 6.73486C22.9477 6.61192 22.6989 6.66064 22.5759 6.84348C22.5164 6.93207 22.4949 7.03856 22.5154 7.14332C22.5216 7.17504 22.5314 7.20544 22.5446 7.23409Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M22.9421 43.5012L22.5689 43.5651C22.378 43.5979 22.2497 43.7791 22.2824 43.9699C22.3151 44.1608 22.4964 44.2891 22.6873 44.2564L23.0606 44.1924C23.0822 44.1887 23.1031 44.1831 23.123 44.1758C23.2785 44.1185 23.376 43.9568 23.347 43.7876C23.3143 43.5967 23.133 43.4685 22.9421 43.5012Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M21.3953 43.7668L21.022 43.8307C20.8312 43.8634 20.7029 44.0447 20.7356 44.2356C20.7682 44.4265 20.9495 44.5547 21.1404 44.522L21.5137 44.4581C21.5354 44.4543 21.5562 44.4487 21.5761 44.4414C21.7316 44.3841 21.8291 44.2224 21.8001 44.0532C21.7674 43.8624 21.5862 43.7341 21.3953 43.7668Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M19.8464 44.0315L19.4732 44.0954C19.2823 44.1281 19.154 44.3093 19.1867 44.5002C19.2194 44.6911 19.4007 44.8193 19.5916 44.7866L19.9648 44.7227C19.9865 44.719 20.0074 44.7134 20.0273 44.706C20.1828 44.6487 20.2803 44.4871 20.2513 44.3179C20.2186 44.127 20.0373 43.9988 19.8464 44.0315Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M27.5105 42.7443L27.1372 42.8083C26.9464 42.841 26.8181 43.0222 26.8508 43.2131C26.8835 43.404 27.0647 43.5322 27.2556 43.4995L27.6289 43.4356C27.6506 43.4319 27.6714 43.4263 27.6914 43.4189C27.8468 43.3616 27.9443 43.2 27.9153 43.0308C27.8826 42.8399 27.7014 42.7116 27.5105 42.7443Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M25.9617 43.01L25.5884 43.0739C25.3975 43.1066 25.2693 43.2878 25.302 43.4787C25.3346 43.6696 25.5159 43.7979 25.7068 43.7652L26.0801 43.7012C26.1018 43.6975 26.1226 43.6919 26.1426 43.6845C26.298 43.6272 26.3955 43.4656 26.3665 43.2964C26.3338 43.1055 26.1526 42.9773 25.9617 43.01Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M24.4148 43.2746L24.0415 43.3385C23.8506 43.3713 23.7224 43.5525 23.7551 43.7434C23.7878 43.9343 23.969 44.0625 24.1599 44.0298L24.5332 43.9659C24.5549 43.9622 24.5758 43.9565 24.5957 43.9492C24.7511 43.8919 24.8486 43.7302 24.8196 43.561C24.787 43.3702 24.6057 43.2419 24.4148 43.2746Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M8.42011 32.0644L7.85153 32.633C7.73178 32.7527 7.73178 32.9469 7.85153 33.0666C7.97127 33.1863 8.16541 33.1863 8.28515 33.0666L8.85373 32.498C8.97348 32.3783 8.97348 32.1841 8.85373 32.0644C8.73399 31.9447 8.53985 31.9447 8.42011 32.0644Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M10.8342 29.6533L10.2656 30.2219C10.1458 30.3416 10.1458 30.5357 10.2656 30.6555C10.3853 30.7752 10.5795 30.7752 10.6992 30.6555L11.2678 30.0869C11.3875 29.9671 11.3875 29.773 11.2678 29.6533C11.1481 29.5335 10.9539 29.5335 10.8342 29.6533Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M10.6992 32.0644C10.5795 31.9447 10.3853 31.9447 10.2656 32.0644C10.1458 32.1842 10.1458 32.3783 10.2656 32.498L10.8342 33.0666C10.9539 33.1864 11.1481 33.1864 11.2678 33.0666C11.3875 32.9469 11.3875 32.7528 11.2678 32.633L10.6992 32.0644Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M8.28515 29.6533C8.16541 29.5335 7.97127 29.5335 7.85153 29.6533C7.73178 29.773 7.73178 29.9672 7.85153 30.0869L8.42011 30.6555C8.53985 30.7752 8.73399 30.7752 8.85372 30.6555C8.97346 30.5358 8.97346 30.3416 8.85372 30.2219L8.28515 29.6533Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M19.4869 7.47449L19.8886 7.07286C19.9731 6.98828 19.9731 6.85115 19.8886 6.76656C19.804 6.68198 19.6668 6.68198 19.5823 6.76656L19.1806 7.1682C19.096 7.25278 19.096 7.38991 19.1806 7.47449C19.2652 7.55906 19.4024 7.55906 19.4869 7.47449Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M21.19 5.77137L21.5917 5.36974C21.6763 5.28515 21.6763 5.14802 21.5917 5.06344C21.5071 4.97885 21.37 4.97885 21.2854 5.06344L20.8838 5.46507C20.7992 5.54966 20.7992 5.68678 20.8838 5.77137C20.9683 5.85595 21.1055 5.85595 21.19 5.77137Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M21.2854 7.47449C21.37 7.55908 21.5071 7.55908 21.5917 7.47449C21.6763 7.38991 21.6763 7.25278 21.5917 7.1682L21.19 6.76656C21.1055 6.68198 20.9683 6.68198 20.8838 6.76656C20.7992 6.85115 20.7992 6.98828 20.8838 7.07286L21.2854 7.47449Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M19.5823 5.77135C19.6668 5.85594 19.804 5.85594 19.8886 5.77135C19.9731 5.68677 19.9731 5.54964 19.8886 5.46507L19.4869 5.06344C19.4023 4.97885 19.2652 4.97885 19.1806 5.06344C19.096 5.14802 19.096 5.28515 19.1806 5.36974L19.5823 5.77135Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M27.6037 22.6757L27.2021 23.0774C27.1175 23.162 27.1175 23.2991 27.2021 23.3837C27.2867 23.4683 27.4238 23.4683 27.5084 23.3837L27.91 22.982C27.9946 22.8975 27.9946 22.7603 27.91 22.6757C27.8255 22.5912 27.6883 22.5912 27.6037 22.6757Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M29.2115 21.6796L29.6132 21.2779C29.6977 21.1934 29.6977 21.0562 29.6132 20.9716C29.5286 20.8871 29.3915 20.8871 29.3069 20.9716L28.9052 21.3733C28.8207 21.4579 28.8207 21.595 28.9052 21.6796C28.9898 21.7641 29.1269 21.7641 29.2115 21.6796Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M29.3069 23.3837C29.3915 23.4683 29.5286 23.4683 29.6132 23.3837C29.6977 23.2991 29.6977 23.162 29.6132 23.0774L29.2115 22.6757C29.1269 22.5912 28.9898 22.5912 28.9052 22.6757C28.8207 22.7603 28.8207 22.8975 28.9052 22.982L29.3069 23.3837Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M27.91 21.3733L27.5084 20.9716C27.4238 20.8871 27.2867 20.8871 27.2021 20.9716C27.1175 21.0562 27.1175 21.1934 27.2021 21.2779L27.6037 21.6796C27.6883 21.7642 27.8255 21.7642 27.91 21.6796C27.9946 21.595 27.9946 21.4579 27.91 21.3733Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M29.0315 44.0986L28.6298 44.5002C28.5453 44.5848 28.5453 44.7219 28.6298 44.8065C28.7144 44.8911 28.8516 44.8911 28.9361 44.8065L29.3378 44.4049C29.4224 44.3203 29.4224 44.1832 29.3378 44.0986C29.2532 44.014 29.1161 44.014 29.0315 44.0986Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M30.7346 42.3955L30.333 42.7971C30.2484 42.8817 30.2484 43.0188 30.333 43.1034C30.4176 43.188 30.5547 43.188 30.6393 43.1034L31.0409 42.7018C31.1255 42.6172 31.1255 42.4801 31.0409 42.3955C30.9563 42.3109 30.8192 42.3109 30.7346 42.3955Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M30.6393 44.0986C30.5547 44.014 30.4176 44.014 30.333 44.0986C30.2484 44.1832 30.2484 44.3203 30.333 44.4049L30.7346 44.8065C30.8192 44.8911 30.9563 44.8911 31.0409 44.8065C31.1255 44.7219 31.1255 44.5848 31.0409 44.5002L30.6393 44.0986Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M28.9361 42.3955C28.8516 42.3109 28.7144 42.3109 28.6298 42.3955C28.5453 42.4801 28.5453 42.6172 28.6298 42.7018L29.0315 43.1034C29.1161 43.188 29.2532 43.188 29.3378 43.1034C29.4224 43.0188 29.4224 42.8817 29.3378 42.7971L28.9361 42.3955Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M47.926 36.4755L47.5244 36.8772C47.4398 36.9618 47.4398 37.0989 47.5244 37.1835C47.609 37.2681 47.7461 37.2681 47.8307 37.1835L48.2323 36.7818C48.3169 36.6973 48.3169 36.5601 48.2323 36.4755C48.1477 36.391 48.0106 36.391 47.926 36.4755Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M49.5338 35.4813L49.9354 35.0797C50.02 34.9951 50.02 34.858 49.9354 34.7734C49.8508 34.6888 49.7137 34.6888 49.6291 34.7734L49.2275 35.175C49.1429 35.2596 49.1429 35.3967 49.2275 35.4813C49.3121 35.5659 49.4492 35.5659 49.5338 35.4813Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M49.5338 36.4755C49.4492 36.391 49.3121 36.391 49.2275 36.4755C49.1429 36.5601 49.1429 36.6973 49.2275 36.7818L49.6291 37.1835C49.7137 37.2681 49.8508 37.2681 49.9354 37.1835C50.02 37.0989 50.02 36.9618 49.9354 36.8772L49.5338 36.4755Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M47.8307 34.7734C47.7461 34.6888 47.609 34.6888 47.5244 34.7734C47.4398 34.858 47.4398 34.9951 47.5244 35.0797L47.926 35.4813C48.0106 35.5659 48.1477 35.5659 48.2323 35.4813C48.3169 35.3967 48.3169 35.2596 48.2323 35.175L47.8307 34.7734Z"
                                      fill="#171D34"
                                    />{" "}
                                  </g>{" "}
                                  <defs>
                                    {" "}
                                    <clipPath id="clip0_1081_42844">
                                      {" "}
                                      <rect
                                        width="50"
                                        height="50"
                                        fill="white"
                                      />{" "}
                                    </clipPath>{" "}
                                  </defs>{" "}
                                </svg>{" "}
                                Assign preparer and approver
                              </span>
                            </div>
                            <div className="form-group">
                              <label>Assign Preparer: </label>



                              {taskInfo.loadedPreparer &&
                                taskInfo.loadedReviewer && (
                                  <Dropdown
                                    options={preparerList}
                                    placeholder="List of Preparers"
                                    onChange={(e) => {
                                      setTaskInfo({
                                        ...taskInfo,
                                        preparer: e.value,
                                      });
                                    }}
                                  />
                                )}
                            </div>
                            {taskInfo.showAlertTask && (
                              <ModalInputCenter
                                heading="Task Already exists!"
                                cancelOption="Ok"
                                handleClick={() => {
                                  setTaskInfo({
                                    ...taskInfo,
                                    showAlertTask: "",
                                  });
                                }}
                                changeShow={() => {
                                  setTaskInfo({
                                    ...taskInfo,
                                    showAlertTask: "",
                                  });
                                  history.push(
                                    AUTH_ROUTES.MONTHLY_CHECKLIST_TABLE
                                  );
                                }}
                                show={taskInfo.showAlertTask}
                                action=""
                              >
                                Task with the same details already exists.
                                Please complete the task first.
                              </ModalInputCenter>
                            )}
                            <div className="form-group">
                              <label>Assign Approver: </label>
                              {taskInfo.loadedPreparer &&
                                taskInfo.loadedReviewer && (
                                  <Dropdown
                                    options={
                                      reviewerList
                                        ? [...reviewerList]
                                        : getFirmnameForSetup()
                                    }
                                    onChange={(e) => {
                                      setTaskInfo({
                                        ...taskInfo,
                                        approver: e.value,
                                      });
                                    }}
                                    placeholder="List of Approvers"
                                  />
                                )}
                            </div>
                    
                          </>
                        </>
                      )}

                      {type !== "MONTHLY_FORM" && (
                        <>
                          <RadioInput
                            onChangeFunc={() =>
                              setSelectedValues({
                                typeOfTask: "Compliance Form",
                                ...emptyStateForSelectedValues,
                              })
                            }
                            checked={
                              selectedValues.typeOfTask === "Compliance Form"
                            }
                            name="TypeOfTask"
                            label="Compliance Form"
                          />
                          {[
                            {
                              label: "Electronic Trust Transfer Requisition",
                              province: "ON",
                              multiple : true,
                              maxSelection: 100,
                              multiplefile: true,

                            },
                            {
                              province: "ON",
                              label: "Authorization of Withdrawal By Teranet",
                              multiple : true,
                              maxSelection: 100,
                              multiplefile: true,

                            },
                            {
                              province: "ON",
                              label:"Electronic Trust Transfer Requisition: Closing Funds",
                              multiple : true,
                              maxSelection: 100,
                              multiplefile: true,
                            },
                            {
                              province: "ON",
                              label: "Investment Authority",
                              multiple : true,
                              maxSelection: 100,
                              multiplefile: true,
                            },
                            {
                              province: "ON",
                              label: "Report on the Investment",
                              multiple : true,
                              maxSelection: 100,
                              multiplefile: true,
                            },
                          ].map((e, index) => {
                            return (
                              getCurrentUserFromCookies().province === "ON" && (
                                <ComplianceSelector
                                complianceState={complianceState} 
                                setcomplianceState={setcomplianceState}
                                key={index}
                                handleInputChange={(params, e) =>
                                changeInputValue(params, e) }
                                options={matterClients ? matterClients : []}
                                options2={ matterDisplayList ? matterDisplayList: ["Please select the Client First"]}
                                isDisabled={ selectedValues.typeOfTask !== "Compliance Form" }
                                onChangeFunc={() => setSelectedValues({
                                      ...selectedValues,
                                      taskSelected: e.label,
                                      province_form: e.province,
                                      clientNo: "",
                                      fileNo: "",
                                    })
                                  }
                                  state={{ ...selectedValues, accountsList }}
                                  name="complianceType" 
                                  
                                  getInputValue={(params, isSelected) =>
                                    getInputValue(params, isSelected)
                                  }
                                  data={e}
                                />
                              )
                            );
                          })}

                          {[
                            {
                              label:
                                "Financial Institution Authorization Release Form",
                              province: "AB",
                              multiple : false,
                              maxSelection: 0,
                              multiplefile: true,
                            },
                            {
                              province: "AB",
                              label: "Claim to Trust Money",
                              multiple : true,
                              maxSelection: 1,
                              multiplefile: true,
                            },
                            {
                              province: "AB",
                              label:
                                "Trust Account and Client Ledger Shortages",
                                multiple : true,
                                maxSelection: 1,
                                multiplefile: false,
                            },
                            {
                              province: "AB",
                              label: "Undisbursable Trust Money – Long Form",
                              multiple : true,
                              maxSelection: 1,
                              multiplefile: false,
                            },
                            {
                              province: "AB",
                              label: "Undisbursable Trust Money – Short Form",
                              multiple : true,
                              maxSelection: 10,
                              multiplefile: true,
                            },
                            {
                              province: "AB",
                              label: "Bank Drafts and Money Orders",
                              multiple : true,
                              maxSelection: 1,
                              multiplefile: true,
                            },
                            {
                              province: "AB",
                              label: "Electronic Banking Withdrawal",
                              multiple : true,
                              maxSelection: 100,
                              multiplefile: true,
                            },
                            {
                              province: "AB",
                              label: "Matter-Matter Trust Transfers",
                              multiple : true,
                              maxSelection: 100,
                              multiplefile: true,
                            },
                            {
                              province: "AB",
                              label: "Letterhead",
                              multiple : true,
                              maxSelection: 1,
                              multiplefile: true,
                            },
                            {
                              province: "AB",
                              label: "Representative Capacity Undertaking",
                              multiple : true,
                              maxSelection: 100,
                              multiplefile: true,
                            },
                          ].map((e, index) => {
                            return (
                              getCurrentUserFromCookies().province === "AB" && (
                                <ComplianceSelector
                                complianceState={complianceState} 
                                setcomplianceState={setcomplianceState}
                                  key={index}
                                  handleInputChange={(params, e) =>
                                    changeInputValue(params, e)
                                  }
                                  options={matterClients ? matterClients : []}
                                  options2={
                                    matterDisplayList
                                      ? matterDisplayList
                                      : ["Please select the Client First"]
                                  }
                                  isDisabled={
                                    selectedValues.typeOfTask !==
                                    "Compliance Form"
                                  }
                                  onChangeFunc={() =>
                                    setSelectedValues({
                                      ...selectedValues,
                                      taskSelected: e.label,
                                      province_form: e.province,
                                      clientNo: "",
                                      fileNo: "",
                                    })
                                  }
                                  state={{ ...selectedValues, accountsList }}
                                  name="complianceType"
                                 
                                  getInputValue={(params, isSelected) =>
                                    getInputValue(params, isSelected)
                                  }
                                  data={e}
                                />
                              )
                            );
                          })}

                          {[
                            {
                              label:"Confirmation of Law Foundation of BC Interest Remittance",
                              province: "BC",
                              multiple : false,
                              maxSelection: 0,
                              multiplefile: true,
                            },
                            {
                              province: "BC",
                              label: "Electronic Transfer of Trust Funds",
                              multiple : true,
                              maxSelection: 100,
                              multiplefile: true,
                            },
                            {
                              province: "BC",
                              label: "Letter - New Trust Account",
                              multiple : false,
                              maxSelection: 0,
                              multiplefile: true,
                            },
                            {
                              province: "BC",
                              label: "Insolvent Lawyer – Schedule 3",
                              multiple : false,
                              maxSelection: 0,
                              multiplefile: true,
                            },
                            {
                              province: "BC",
                              label:
                                "Payment of Unclaimed Trust Money to the Law Society",
                                multiple : true,
                                maxSelection: 100,
                                multiplefile: true,
                            },
                            {
                              province: "BC",
                              label:"Withdrawal from Trust by Bank Draft",
                              multiple : true,
                              maxSelection: 1,
                              multiplefile: true,

                          
                            }
                          ].map((e, index) => {
                            return (
                              getCurrentUserFromCookies().province === "BC" && (
                                <ComplianceSelector
                                complianceState={complianceState} 
                                setcomplianceState={setcomplianceState}
                                  key={index}
                                  handleInputChange={(params, e) =>
                                    changeInputValue(params, e)
                                  }
                                  options={matterClients ? matterClients : []}
                                  options2={
                                    matterDisplayList
                                      ? matterDisplayList
                                      : ["Please select the Client First"]
                                  }
                                  isDisabled={
                                    selectedValues.typeOfTask !==
                                    "Compliance Form"
                                  }
                                  onChangeFunc={() =>
                                    setSelectedValues({
                                      ...selectedValues,
                                      taskSelected: e.label,
                                      province_form: e.province,
                                      clientNo: "",
                                      fileNo: "",
                                    })
                                  }
                                  state={{ ...selectedValues, accountsList }}
                                  name="complianceType"
                                
                                  getInputValue={(params, isSelected) =>
                                    getInputValue(params, isSelected)
                                  }
                                  data={e}
                                />
                              )
                            );
                          })}

<>
                            <div className="pHead">
                              <span className="h5">
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {" "}
                                  <g clip-path="url(#clip0_1081_42844)">
                                    {" "}
                                    <path
                                      d="M44.4731 38.8149C44.4304 38.6235 44.3574 38.4357 44.2515 38.2551C42.9114 35.6028 40.6591 32.4895 38.9071 30.8658C33.7255 26.0634 27.0878 25.0265 21.0356 23.4211C20.9488 23.3983 20.8622 23.3752 20.7757 23.3519C19.8968 23.1155 19.0309 22.8658 18.1844 22.5894C14.4136 21.3581 11.0268 19.596 8.58119 16.1196C6.98511 13.8882 7.10112 10.7734 4.52406 10.7734C4.315 10.7734 4.08812 10.794 3.84114 10.8371C3.07323 10.9728 1.77843 11.6497 1.68507 13.2761C1.67607 13.4317 1.67816 13.5959 1.69278 13.7691C1.71223 14.0024 1.75465 14.2519 1.8231 14.5187C3.81463 22.3185 10.1 23.8553 11.6276 28.4575C11.7414 28.8004 11.8288 29.1605 11.8862 29.5413C11.9631 30.0544 11.9855 30.6052 11.944 31.2034C11.3745 39.0653 10.338 41.8753 14.3197 42.6583C14.5452 42.7028 14.7867 42.7408 15.0452 42.7726C15.8559 42.8727 16.8343 42.9141 18.0113 42.9141C19.4637 42.9141 21.2184 42.8508 23.3332 42.7562H23.3337C24.2872 42.7134 25.3138 42.6643 26.419 42.6117C26.4282 42.6113 26.4373 42.6109 26.4465 42.6104C26.9485 42.5865 27.3703 42.5005 27.7234 42.355C28.0773 42.2094 28.3618 42.0039 28.5887 41.7415C29.9565 40.1594 29.2236 36.5059 28.8495 31.3675C29.447 31.7073 29.9999 32.0406 30.5121 32.3666C30.6943 32.4826 30.8713 32.5978 31.0434 32.7121C32.6218 33.7601 33.7811 34.7321 34.6562 35.6153C38.1561 39.1483 37.7044 42.2038 40.832 42.2038C41.0251 42.2038 41.2316 42.1922 41.4538 42.1682C43.1598 41.9904 44.5084 40.6099 44.5199 39.261C44.5213 39.1114 44.5062 38.9621 44.4731 38.8149Z"
                                      fill="#73C3FD"
                                    />{" "}
                                    <path
                                      d="M20.3881 20.5374C23.5646 20.5374 26.7401 18.4382 26.7401 14.2365C26.7401 10.037 23.5612 7.93555 20.3832 7.93555C17.2068 7.93555 14.0312 10.0347 14.0312 14.2365C14.0312 18.4359 17.2101 20.5374 20.3881 20.5374Z"
                                      fill="#73C3FD"
                                    />{" "}
                                    <path
                                      d="M46.581 34.4087C44.8361 31.9468 42.1133 29.166 40.1025 27.7925C39.4846 27.3705 38.8339 26.9769 38.168 26.6224C37.5347 26.2853 36.8674 25.9729 36.1845 25.6936C34.9295 25.1804 33.5997 24.765 32.1193 24.4241C29.3901 23.7953 26.6012 23.53 23.9041 23.2735C22.9018 23.1783 21.8654 23.0798 20.8653 22.9649C19.9384 22.8583 19.0449 22.7362 18.1836 22.5889C19.0301 22.8652 19.896 23.1149 20.775 23.3513C20.8614 23.3746 20.948 23.3978 21.0348 23.4206C27.2711 24.1202 34.0088 24.1555 39.8578 28.1507C41.8302 29.498 44.5175 32.2446 46.2344 34.67C47.2978 35.9892 46.2937 38.0932 44.4723 38.8144C44.3344 38.869 44.1919 38.9156 44.0452 38.9534C43.8289 39.0098 43.6263 39.0519 43.4354 39.0803C40.3421 39.5421 40.3377 36.4534 36.3545 33.4758C34.9448 32.422 32.946 31.2766 29.9843 30.1317C30.1598 30.9136 30.3386 31.6587 30.5113 32.3661C31.8166 37.7146 32.7672 40.9123 29.2675 41.6061C29.0375 41.6517 28.811 41.6966 28.5879 41.7409C28.3611 42.0033 28.0765 42.2088 27.7227 42.3544C28.1583 42.2683 28.6071 42.1794 29.0694 42.0877L29.3518 42.0318C30.4304 41.8179 31.1726 41.3718 31.6209 40.6682C31.8743 40.2703 32.0287 39.7995 32.093 39.2288C32.1487 38.7329 32.1357 38.1583 32.0531 37.4722C31.9013 36.2105 31.5299 34.6973 31.0998 32.945C31.0808 32.8674 31.0617 32.7896 31.0426 32.7115C30.8944 32.1074 30.7432 31.4881 30.5919 30.8402C32.8386 31.7596 34.6445 32.7392 36.0948 33.8233C37.681 35.009 38.6295 36.2283 39.3918 37.208C39.9672 37.9476 40.4642 38.5864 41.0745 39.0118C41.7675 39.4949 42.538 39.653 43.4994 39.5095C43.7057 39.4786 43.9257 39.4328 44.1533 39.3735C44.2769 39.3417 44.399 39.3038 44.5191 39.2604C45.0349 39.0735 45.5139 38.7817 45.9207 38.4038C46.4025 37.9565 46.7581 37.4154 46.9491 36.8391C47.0903 36.4129 47.1347 35.9908 47.0809 35.5843C47.023 35.1477 46.8549 34.7522 46.581 34.4087Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M23.3321 42.7555C22.4679 42.9121 21.683 43.0452 20.9692 43.1517C17.8163 43.6224 16.0587 43.5766 15.0441 42.7719C13.4543 41.511 13.6897 38.3863 13.2396 32.465C13.104 30.7502 12.5061 29.4982 11.6265 28.4568C8.91705 25.2485 3.5349 24.0389 0.76646 17.4572C-0.071995 15.4723 0.838285 14.2932 1.69168 13.7684C1.67706 13.5952 1.67497 13.4309 1.68397 13.2754C1.48167 13.379 1.28403 13.5081 1.10534 13.6541C0.731912 13.9593 0.446856 14.3263 0.25773 14.7452C0.0793697 15.1403 -0.00723969 15.5729 0.000473197 16.0305C0.00882882 16.5336 0.132075 17.0705 0.366836 17.6259C1.19372 19.5918 2.32157 21.2651 3.81482 22.741C5.1154 24.0263 6.47737 24.9655 7.79466 25.8741C9.50242 27.0517 10.9793 28.0701 11.8851 29.5406C12.3859 30.3536 12.7124 31.3049 12.8069 32.4978C12.855 33.1296 12.8953 33.7317 12.9308 34.3023C12.9663 34.8727 12.997 35.4117 13.0258 35.9169C13.1326 37.7914 13.217 39.272 13.4326 40.4244C13.6189 41.4195 13.8996 42.1343 14.3186 42.6576C14.448 42.8191 14.5905 42.9624 14.7475 43.0902C15.0453 43.3323 15.3894 43.5133 15.7995 43.6429C16.1901 43.7665 16.6344 43.8414 17.1578 43.8719C18.1029 43.9269 19.3344 43.8343 21.0332 43.5807C22.5041 43.3613 24.2863 43.0282 26.4179 42.611C25.3127 42.6636 24.2861 42.7127 23.3326 42.7555H23.3321Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M13.3816 18.2533C13.8595 19.0091 14.4807 19.6373 15.2279 20.1206C15.9264 20.5724 16.7143 20.8853 17.5696 21.0505C18.39 21.2089 19.2354 21.2251 20.0825 21.0987C20.9293 20.9723 21.7327 20.71 22.4704 20.3193C23.2398 19.9117 23.9015 19.3827 24.4371 18.7468C25.01 18.0666 25.4202 17.2844 25.6563 16.422C25.9093 15.4977 25.9575 14.493 25.7997 13.4359C25.642 12.3793 25.3023 11.4328 24.79 10.6228C24.3121 9.86702 23.6909 9.23877 22.9437 8.75548C22.2452 8.30368 21.4574 7.99084 20.602 7.82566C19.7817 7.66722 18.9362 7.65101 18.0892 7.77745C17.2424 7.90385 16.439 8.16607 15.7012 8.55684C14.9319 8.96438 14.2702 9.49342 13.7346 10.1293C13.1616 10.8095 12.7514 11.5917 12.5154 12.4541C12.2624 13.3784 12.2142 14.3831 12.3719 15.4402C12.5297 16.4968 12.8694 17.4433 13.3816 18.2533ZM18.1532 8.20654C21.2964 7.73738 24.7507 9.34651 25.3706 13.5C25.9909 17.6557 23.1601 20.2006 20.0184 20.6696C16.8753 21.1387 13.421 19.5296 12.801 15.3762C12.1807 11.2204 15.0116 8.67547 18.1532 8.20654Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M27.5192 12.8768C27.5564 12.977 27.5938 13.0789 27.6302 13.1795C27.6336 13.189 27.6373 13.1982 27.6414 13.2073C27.6804 13.2947 27.7487 13.3644 27.8363 13.4055C27.9329 13.4508 28.0414 13.4558 28.1418 13.4195C28.3308 13.3512 28.44 13.152 28.3959 12.9562C28.3923 12.9399 28.3875 12.9236 28.3818 12.9078C28.3444 12.8044 28.3062 12.7003 28.2683 12.5983C28.1914 12.3917 27.961 12.2862 27.7545 12.363C27.548 12.4397 27.4425 12.6702 27.5192 12.8768Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M26.8707 11.4816C26.8726 11.4859 26.8745 11.4901 26.8766 11.4943C26.9235 11.5901 26.9707 11.6877 27.017 11.7844C27.112 11.9832 27.3511 12.0676 27.5499 11.9726C27.7266 11.8881 27.8157 11.6903 27.7618 11.5023C27.7557 11.4809 27.7476 11.4598 27.738 11.4397C27.6902 11.3398 27.6419 11.2399 27.5944 11.1428C27.4975 10.9449 27.2576 10.8627 27.0597 10.9596C26.8661 11.0544 26.7833 11.2862 26.8707 11.4816Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M26.0326 10.2519C26.0427 10.2746 26.0551 10.2966 26.0698 10.3177C26.1269 10.3994 26.1865 10.486 26.2522 10.5824C26.3762 10.7645 26.6253 10.8117 26.8074 10.6877C26.9638 10.5812 27.0243 10.3773 26.9511 10.2031C26.9408 10.1785 26.9279 10.1547 26.9127 10.1325C26.8451 10.0331 26.7837 9.94405 26.7252 9.86022C26.5991 9.67954 26.3495 9.63513 26.1688 9.76123C26.0092 9.87265 25.9559 10.0804 26.0326 10.2519Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M25.1168 9.2439L25.1368 9.2671C25.2004 9.34052 25.2632 9.41438 25.3234 9.48667C25.4644 9.65597 25.7169 9.67897 25.8862 9.53795C26.0219 9.42488 26.0674 9.23294 25.9968 9.07119C25.9817 9.03656 25.9618 9.00433 25.9374 8.97512C25.8735 8.89836 25.8074 8.8206 25.7411 8.74405L25.7215 8.72138C25.6518 8.64062 25.5547 8.59185 25.4482 8.58409C25.3418 8.57633 25.2387 8.61049 25.1579 8.68028C25.0771 8.75006 25.0284 8.84713 25.0206 8.95362C25.0157 9.02041 25.0274 9.08589 25.054 9.14535C25.0697 9.18063 25.0908 9.21383 25.1168 9.2439Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M23.8987 8.0734C23.9232 8.14169 23.9661 8.20216 24.0241 8.24879C24.0953 8.30615 24.175 8.37216 24.2675 8.45057C24.4357 8.59297 24.6883 8.57202 24.8308 8.40388C24.9452 8.26871 24.9577 8.07798 24.8618 7.92923C24.8405 7.89611 24.8143 7.86632 24.784 7.84066C24.6862 7.7578 24.6016 7.68767 24.5253 7.62626C24.3536 7.48809 24.1016 7.51529 23.9634 7.68692C23.8964 7.77007 23.8659 7.87431 23.8774 7.98046C23.8809 8.01261 23.888 8.04374 23.8987 8.0734Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M22.5446 7.23409C22.5749 7.30004 22.6228 7.3566 22.6846 7.39809C22.7605 7.44914 22.8455 7.50806 22.9444 7.57825C23.1242 7.70569 23.3741 7.66315 23.5016 7.48341C23.604 7.33892 23.6001 7.14782 23.4919 7.00785C23.4678 6.97668 23.4391 6.94925 23.4067 6.92629C23.3022 6.85213 23.2118 6.78951 23.1305 6.73486C22.9477 6.61192 22.6989 6.66064 22.5759 6.84348C22.5164 6.93207 22.4949 7.03856 22.5154 7.14332C22.5216 7.17504 22.5314 7.20544 22.5446 7.23409Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M22.9421 43.5012L22.5689 43.5651C22.378 43.5979 22.2497 43.7791 22.2824 43.9699C22.3151 44.1608 22.4964 44.2891 22.6873 44.2564L23.0606 44.1924C23.0822 44.1887 23.1031 44.1831 23.123 44.1758C23.2785 44.1185 23.376 43.9568 23.347 43.7876C23.3143 43.5967 23.133 43.4685 22.9421 43.5012Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M21.3953 43.7668L21.022 43.8307C20.8312 43.8634 20.7029 44.0447 20.7356 44.2356C20.7682 44.4265 20.9495 44.5547 21.1404 44.522L21.5137 44.4581C21.5354 44.4543 21.5562 44.4487 21.5761 44.4414C21.7316 44.3841 21.8291 44.2224 21.8001 44.0532C21.7674 43.8624 21.5862 43.7341 21.3953 43.7668Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M19.8464 44.0315L19.4732 44.0954C19.2823 44.1281 19.154 44.3093 19.1867 44.5002C19.2194 44.6911 19.4007 44.8193 19.5916 44.7866L19.9648 44.7227C19.9865 44.719 20.0074 44.7134 20.0273 44.706C20.1828 44.6487 20.2803 44.4871 20.2513 44.3179C20.2186 44.127 20.0373 43.9988 19.8464 44.0315Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M27.5105 42.7443L27.1372 42.8083C26.9464 42.841 26.8181 43.0222 26.8508 43.2131C26.8835 43.404 27.0647 43.5322 27.2556 43.4995L27.6289 43.4356C27.6506 43.4319 27.6714 43.4263 27.6914 43.4189C27.8468 43.3616 27.9443 43.2 27.9153 43.0308C27.8826 42.8399 27.7014 42.7116 27.5105 42.7443Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M25.9617 43.01L25.5884 43.0739C25.3975 43.1066 25.2693 43.2878 25.302 43.4787C25.3346 43.6696 25.5159 43.7979 25.7068 43.7652L26.0801 43.7012C26.1018 43.6975 26.1226 43.6919 26.1426 43.6845C26.298 43.6272 26.3955 43.4656 26.3665 43.2964C26.3338 43.1055 26.1526 42.9773 25.9617 43.01Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M24.4148 43.2746L24.0415 43.3385C23.8506 43.3713 23.7224 43.5525 23.7551 43.7434C23.7878 43.9343 23.969 44.0625 24.1599 44.0298L24.5332 43.9659C24.5549 43.9622 24.5758 43.9565 24.5957 43.9492C24.7511 43.8919 24.8486 43.7302 24.8196 43.561C24.787 43.3702 24.6057 43.2419 24.4148 43.2746Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M8.42011 32.0644L7.85153 32.633C7.73178 32.7527 7.73178 32.9469 7.85153 33.0666C7.97127 33.1863 8.16541 33.1863 8.28515 33.0666L8.85373 32.498C8.97348 32.3783 8.97348 32.1841 8.85373 32.0644C8.73399 31.9447 8.53985 31.9447 8.42011 32.0644Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M10.8342 29.6533L10.2656 30.2219C10.1458 30.3416 10.1458 30.5357 10.2656 30.6555C10.3853 30.7752 10.5795 30.7752 10.6992 30.6555L11.2678 30.0869C11.3875 29.9671 11.3875 29.773 11.2678 29.6533C11.1481 29.5335 10.9539 29.5335 10.8342 29.6533Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M10.6992 32.0644C10.5795 31.9447 10.3853 31.9447 10.2656 32.0644C10.1458 32.1842 10.1458 32.3783 10.2656 32.498L10.8342 33.0666C10.9539 33.1864 11.1481 33.1864 11.2678 33.0666C11.3875 32.9469 11.3875 32.7528 11.2678 32.633L10.6992 32.0644Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M8.28515 29.6533C8.16541 29.5335 7.97127 29.5335 7.85153 29.6533C7.73178 29.773 7.73178 29.9672 7.85153 30.0869L8.42011 30.6555C8.53985 30.7752 8.73399 30.7752 8.85372 30.6555C8.97346 30.5358 8.97346 30.3416 8.85372 30.2219L8.28515 29.6533Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M19.4869 7.47449L19.8886 7.07286C19.9731 6.98828 19.9731 6.85115 19.8886 6.76656C19.804 6.68198 19.6668 6.68198 19.5823 6.76656L19.1806 7.1682C19.096 7.25278 19.096 7.38991 19.1806 7.47449C19.2652 7.55906 19.4024 7.55906 19.4869 7.47449Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M21.19 5.77137L21.5917 5.36974C21.6763 5.28515 21.6763 5.14802 21.5917 5.06344C21.5071 4.97885 21.37 4.97885 21.2854 5.06344L20.8838 5.46507C20.7992 5.54966 20.7992 5.68678 20.8838 5.77137C20.9683 5.85595 21.1055 5.85595 21.19 5.77137Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M21.2854 7.47449C21.37 7.55908 21.5071 7.55908 21.5917 7.47449C21.6763 7.38991 21.6763 7.25278 21.5917 7.1682L21.19 6.76656C21.1055 6.68198 20.9683 6.68198 20.8838 6.76656C20.7992 6.85115 20.7992 6.98828 20.8838 7.07286L21.2854 7.47449Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M19.5823 5.77135C19.6668 5.85594 19.804 5.85594 19.8886 5.77135C19.9731 5.68677 19.9731 5.54964 19.8886 5.46507L19.4869 5.06344C19.4023 4.97885 19.2652 4.97885 19.1806 5.06344C19.096 5.14802 19.096 5.28515 19.1806 5.36974L19.5823 5.77135Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M27.6037 22.6757L27.2021 23.0774C27.1175 23.162 27.1175 23.2991 27.2021 23.3837C27.2867 23.4683 27.4238 23.4683 27.5084 23.3837L27.91 22.982C27.9946 22.8975 27.9946 22.7603 27.91 22.6757C27.8255 22.5912 27.6883 22.5912 27.6037 22.6757Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M29.2115 21.6796L29.6132 21.2779C29.6977 21.1934 29.6977 21.0562 29.6132 20.9716C29.5286 20.8871 29.3915 20.8871 29.3069 20.9716L28.9052 21.3733C28.8207 21.4579 28.8207 21.595 28.9052 21.6796C28.9898 21.7641 29.1269 21.7641 29.2115 21.6796Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M29.3069 23.3837C29.3915 23.4683 29.5286 23.4683 29.6132 23.3837C29.6977 23.2991 29.6977 23.162 29.6132 23.0774L29.2115 22.6757C29.1269 22.5912 28.9898 22.5912 28.9052 22.6757C28.8207 22.7603 28.8207 22.8975 28.9052 22.982L29.3069 23.3837Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M27.91 21.3733L27.5084 20.9716C27.4238 20.8871 27.2867 20.8871 27.2021 20.9716C27.1175 21.0562 27.1175 21.1934 27.2021 21.2779L27.6037 21.6796C27.6883 21.7642 27.8255 21.7642 27.91 21.6796C27.9946 21.595 27.9946 21.4579 27.91 21.3733Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M29.0315 44.0986L28.6298 44.5002C28.5453 44.5848 28.5453 44.7219 28.6298 44.8065C28.7144 44.8911 28.8516 44.8911 28.9361 44.8065L29.3378 44.4049C29.4224 44.3203 29.4224 44.1832 29.3378 44.0986C29.2532 44.014 29.1161 44.014 29.0315 44.0986Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M30.7346 42.3955L30.333 42.7971C30.2484 42.8817 30.2484 43.0188 30.333 43.1034C30.4176 43.188 30.5547 43.188 30.6393 43.1034L31.0409 42.7018C31.1255 42.6172 31.1255 42.4801 31.0409 42.3955C30.9563 42.3109 30.8192 42.3109 30.7346 42.3955Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M30.6393 44.0986C30.5547 44.014 30.4176 44.014 30.333 44.0986C30.2484 44.1832 30.2484 44.3203 30.333 44.4049L30.7346 44.8065C30.8192 44.8911 30.9563 44.8911 31.0409 44.8065C31.1255 44.7219 31.1255 44.5848 31.0409 44.5002L30.6393 44.0986Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M28.9361 42.3955C28.8516 42.3109 28.7144 42.3109 28.6298 42.3955C28.5453 42.4801 28.5453 42.6172 28.6298 42.7018L29.0315 43.1034C29.1161 43.188 29.2532 43.188 29.3378 43.1034C29.4224 43.0188 29.4224 42.8817 29.3378 42.7971L28.9361 42.3955Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M47.926 36.4755L47.5244 36.8772C47.4398 36.9618 47.4398 37.0989 47.5244 37.1835C47.609 37.2681 47.7461 37.2681 47.8307 37.1835L48.2323 36.7818C48.3169 36.6973 48.3169 36.5601 48.2323 36.4755C48.1477 36.391 48.0106 36.391 47.926 36.4755Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M49.5338 35.4813L49.9354 35.0797C50.02 34.9951 50.02 34.858 49.9354 34.7734C49.8508 34.6888 49.7137 34.6888 49.6291 34.7734L49.2275 35.175C49.1429 35.2596 49.1429 35.3967 49.2275 35.4813C49.3121 35.5659 49.4492 35.5659 49.5338 35.4813Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M49.5338 36.4755C49.4492 36.391 49.3121 36.391 49.2275 36.4755C49.1429 36.5601 49.1429 36.6973 49.2275 36.7818L49.6291 37.1835C49.7137 37.2681 49.8508 37.2681 49.9354 37.1835C50.02 37.0989 50.02 36.9618 49.9354 36.8772L49.5338 36.4755Z"
                                      fill="#171D34"
                                    />{" "}
                                    <path
                                      d="M47.8307 34.7734C47.7461 34.6888 47.609 34.6888 47.5244 34.7734C47.4398 34.858 47.4398 34.9951 47.5244 35.0797L47.926 35.4813C48.0106 35.5659 48.1477 35.5659 48.2323 35.4813C48.3169 35.3967 48.3169 35.2596 48.2323 35.175L47.8307 34.7734Z"
                                      fill="#171D34"
                                    />{" "}
                                  </g>{" "}
                                  <defs>
                                    {" "}
                                    <clipPath id="clip0_1081_42844">
                                      {" "}
                                      <rect
                                        width="50"
                                        height="50"
                                        fill="white"
                                      />{" "}
                                    </clipPath>{" "}
                                  </defs>{" "}
                                </svg>{" "}
                                Assign preparer and approver
                              </span>
                            </div>
                            <div className="form-group">
                              <label>Assign Preparer: </label>

                              {taskInfo.loadedPreparer &&
                                taskInfo.loadedReviewer && (
                                  <Dropdown
                                    options={preparerList}
                                    placeholder="List of Preparers"
                                    onChange={(e) => {
                                      setTaskInfo({
                                        ...taskInfo,
                                        preparer: e.value,
                                      });
                                    }}
                                  />
                                )}
                            </div>
                           
                            <div className="form-group">
                              <label>Assign Approver: </label>
                              {taskInfo.loadedPreparer &&
                                taskInfo.loadedReviewer && (
                                  <Dropdown
                                    options={
                                      reviewerList
                                        ? [...reviewerList]
                                        : getFirmnameForSetup()
                                    }
                                    onChange={(e) => {
                                      setTaskInfo({
                                        ...taskInfo,
                                        approver: e.value,
                                      });
                                    }}
                                    placeholder="List of Approvers"
                                  />
                                )}
                            </div>
                    
                          </>


                          {/* <div className="btnGroup">
                            <button
                              onClick={handleComplienceFormSubmit}
                              className="btn btnPrimary ms-auto"
                            >
                              Next
                            </button>
                          </div> */}
                        </>
                      )}
                    </div>
                    {/*  */}
                  </div>
                </div>
                <div className="col-md-3 text-end">
                  <img src={createTaskImage}></img>
                </div>
              </div>
              {selectedValues.showError && (
                <Alert
                  dismissible
                  className="my-3 heading-5"
                  style={{ textAlign: "left" }}
                  variant="info"
                  onClose={() =>
                    setSelectedValues((prev) => ({ ...prev, showError: "" }))
                  }
                >
                  {selectedValues.showError}
                </Alert>
              )}
              <div className="btnGroup">
                <button
                  onClick={type === "MONTHLY_FORM" ? handleSubmit : handleComplianceFormSubmit}
                  className="btn btnPrimary ms-auto"
                >
                  {/* {type === "MONTHLY_FORM" ? "Add Task" : "Next"} */}
                  Add Task
                </button>
              </div>
            </div>
          </div>
          <div className="pb-4"></div>
        </>
      ) : (
        <CreateTaskForm type={type} data={complianceFormParent} />
      )}
    </>
  );
};

export default TaskTypeForm;
