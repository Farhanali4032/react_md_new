import Tabs from "../../components/TasksTabs";
import React, { useState, useEffect } from "react";
import FooterDash from "../../components/Dashboard/FooterDash/FooterDash";
import Layout from "../../components/LayoutComponents/Layout";
import {
  getCurrentUserFromCookies,
  getUserId,
  getUserSID,
  getMonthsBetweenDates
} from "../../utils/helpers";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import EachTask from "../../components/Tasks/EachTask";
import ClipLoader from "react-spinners/ClipLoader";
import { Col, Container, Row } from "react-bootstrap";
import TasksParent from "../../components/Tasks/TasksParent";
import Pagination from "../../assets/images/pagination.png";
import { AUTH_ROUTES } from "../../routes/Routes.types";
import { Roles } from "../../routes/Role.types";
import InprogressCompliance from "../../containers/ComplianceFormsTabs/InprogressComplianceForms.cont";
import ApprovedComplianceForm from "../../containers/ComplianceFormsTabs/ApprovedComplianceForms.cont";
import AllComplianceForms from "../../containers/ComplianceFormsTabs/AllComplianceForms.cont";
import ComplianceForm from "../complianceForms/ComplianceForm";
import ComplianceReport from "../../components/Tasks/ComplianceForm/ComplianceReport";
import ComplianceHeader from "../../components/Tasks/ComplianceForm/ComplianceHeader";
import toast from "react-hot-toast";
import { getMonthFromDigit } from "../../utils/helpers";

const ComplianceTable = () => {
  const { response } = useSelector((state) => state.userProfileInfo);
  const currentUserRole = getCurrentUserFromCookies().role;
  const [pageNumber, setPageNumber] = useState(1);
  const [activeTabNumber, setActiveTabNumber] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [allTasks, setAllTasks] = useState({});
  const [notStarted, setNotStarted] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [reportsPerPage, setReportsPerPage] = useState(15);


  // updated fun and states
  const [customYearModal, setCustomYearModal] = useState({
    year:false,
    month :false
  });
  const [headerDateData , setHeaderDateData] = useState({
    month:null,
    year:null,
    search:'',
    status:'All'
  });


  const [complianceFormData , setComplianceFormData] = useState({
    data:[]
  });

  const [reportPeriod, setReportPeriod] = useState([]);
  const [formsDataWithProgress, setFormsDataWithProgress] = useState([]);
  const [filterData , setFilteredData] = useState([]);
  console.log('checkFilteredData',filterData)
  
  const changeReportPeriod = (reports) => {
    if (reports && reports.length) {
      const period = reports
        .map((report) => {
          const [month, year] = report.task_month.split(" ");
          console.log("console.log0",[month, year])
          const monthIndex =
            new Date(Date.parse(`1 ${month} 2000`)).getMonth() + 1;
          return `${year}-${monthIndex.toString().padStart(2, "0")}-15`;
        })
        .sort((a, b) => new Date(b) - new Date(a));
      setReportPeriod(
        getMonthsBetweenDates(period[period.length - 1], period[0]).reverse()
      );
    }
  };

  const headerData = {
    customYearModal,
    setCustomYearModal,
    setHeaderDateData,
    headerDateData,
    title : 'Compliance form'
  }

  useEffect(()=>{

    let result = complianceFormData.data.filter((ele) => {
      return ele.task_type.toLowerCase().includes(headerDateData?.search.toLowerCase());
    });
 
    setComplianceFormData({data:result})

    changeReportPeriod(result)


  },[headerDateData.search ])


  const ComplianceReportData = {
    complianceFormData ,
    reportPeriod,
    formsDataWithProgress,
    filterData,
  }
  useEffect(() => {
    setLoaded(false)
        axios.get(
        `/task/list/${
          getCurrentUserFromCookies().role
        }/${getUserId()}/${getUserSID()}?page=${pageNumber}&isComplianceForm=1&status=${headerDateData?.status == 'All' ? '' : headerDateData?.status }`
      )
      .then((res) => {
        const {
          data: {
            data: { body },
          },
        } = res;

        console.log("check what api gives",body);


        if(body?.data){
          setComplianceFormData((prev)=>({
            ...prev , 
            data: body.data 
            }))
  
            changeReportPeriod(body.data);
        }

    

      })
      .catch((err) => {
        toast.error('Internal Server Error')
      }).finally(()=>{
        setLoaded(true)
      });
  }, [headerDateData.status]);

  useEffect(() => {
    const filtered = complianceFormData.data?.filter((item) => {
      const [month, year] = item.task_month.split(" ");

      if (
        headerDateData.year !== null &&
        !isNaN(headerDateData.year) &&
        parseInt(year) !== headerDateData.year
      ) {
        return false;
      }
      if (
        headerDateData.month !== null &&
        !isNaN(headerDateData.month) &&
        month !== getMonthFromDigit(headerDateData.month)
      ) {
        return false;
      }
      if (
        headerDateData.search !== null &&
        !item.task_type.toLowerCase().includes(headerDateData.search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
    if (filtered && filtered.length) {
      setFilteredData(filtered);
      changeReportPeriod(filtered);
    }
  }, [headerDateData.year , headerDateData.month ,headerDateData.search, complianceFormData.data]);

  function calculateProgress(data) {
    const subForm1 = data


    let filledCount = 0;
    let totalCount = 0;

    function countFilledValues(subform) {
      for (const key in subform) {
        if (subform[key] !== "") {
          filledCount++;
        }
        totalCount++;
      }
    }

    countFilledValues(subForm1);

    const progress = Math.ceil((filledCount / totalCount) * 100);
    return progress;
  }

  // need to know about progress status...
  useEffect(() => {
    const getProgressData = async () => {

      if (complianceFormData && complianceFormData?.data?.length) {
        const updatedDataArray = [];

        await Promise.all(
          complianceFormData?.data?.map(async (data) => {

            const body = await axios.get(`/compliance/${data?.id}`);
                  if (
                    body?.data?.data?.body[0]?.formDetails  && 
                    Object.keys(JSON.parse(body?.data?.data?.body[0]?.formDetails)).length !== 0
                  ) {
                    const formData1 = JSON.parse(body?.data?.data?.body[0]?.formDetails);
                    console.log('formDataa',formData1)
                  
                    updatedDataArray.push({
                      ...data,
                      progress: calculateProgress(formData1),
                    });

                  }
                
              
          })
        );

        setFormsDataWithProgress(updatedDataArray);
      }
    };

    getProgressData();
  }, [complianceFormData]);


  return (
    <Layout title={`Welcome ${response?.username ? response?.username   : "" }`}>
      {!loaded && <div className="loader">Loading...</div>}

      <div className="panel trans">

      <div className="pHead">
        <ComplianceHeader data={headerData}/>
      </div>


      <div className="pBody">
          <ComplianceReport data={ComplianceReportData}/>
       
      </div>


      </div>


      {/* tabs code  */}
     
      {/* <div className="panel">
        <div className="pHead">
          <span className="h5">Compliance form tasks</span>
          <div className="controls">
            {getCurrentUserFromCookies().role === Roles.ADMIN && (
              <Link
                className="btn btnPrimary"
                to={{
                  pathname: AUTH_ROUTES.CREATE_TASKS,
                  search: "type=COMPLIANCE_FORM",
                }}
              >
                Add compliance form
              </Link>
            )}
          </div>
        </div>
        <div className="pBody">


          <Tabs
            activeTabNumber={activeTabNumber}
            changeTabNumber={(e) => setActiveTabNumber(e)}
          >
            <Row>
              <AllComplianceForms />
            </Row>

            <Row>
              <InprogressCompliance />
            </Row>

            <Row>
              <ApprovedComplianceForm />
            </Row>
          </Tabs>
        </div>
      </div> */}
      <FooterDash />
    </Layout>
  );
};

export default ComplianceTable;
