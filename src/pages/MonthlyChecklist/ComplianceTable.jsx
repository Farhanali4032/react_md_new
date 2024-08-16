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
import Noreportpage from "../Noreportpage";

const ComplianceTable = () => {
  const { response } = useSelector((state) => state.userProfileInfo);
  const [loaded, setLoaded] = useState(false);


  // updated fun and states
  const [customYearModal, setCustomYearModal] = useState({
    year:false,
    month :false
  });
  const [headerDateData , setHeaderDateData] = useState({
    month:'',
    year:'',
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
    }else{
      setReportPeriod([])
    }
  };


  const handleSearchButton=()=>{

    setLoaded(false)
      let month = headerDateData.month ? getMonthFromDigit(headerDateData.month) : ''

      axios.get(
        `/task/list/${
          getCurrentUserFromCookies().role
        }/${getUserId()}/${getUserSID()}?search=${headerDateData.search}&month=${month}&year=${headerDateData.year}&status=${headerDateData?.status == 'All' ? '' : headerDateData?.status }&isComplianceForm=1`
      )
      .then((res) => {
        console.log('checkBodyFRES',res.data.data.body)
        const {
          data: {
            data: { body },
          },
        } = res;
        
        if(body){  setComplianceFormData({ data: body   })
                   changeReportPeriod(body);
        }
      })
      .catch((err) => {
        toast.error('Internal Server Error')
      }).finally(()=>{
        setLoaded(true)
      });

      
    
  }

  const headerData = {
    customYearModal,
    setCustomYearModal,
    setHeaderDateData,
    headerDateData,
    handleSearchButton,
    title : 'Compliance form'
  }



  const ComplianceReportData = {
    complianceFormData ,
    reportPeriod,
    formsDataWithProgress,
    filterData,
  }

  useEffect(() => {
    setLoaded(false)
      let month = headerDateData.month ? getMonthFromDigit(headerDateData.month) : ''

      axios.get(
        `/task/list/${
          getCurrentUserFromCookies().role
        }/${getUserId()}/${getUserSID()}?search=${headerDateData.search}&month=${month}&year=${headerDateData.year}&status=${headerDateData?.status == 'All' ? '' : headerDateData?.status }&isComplianceForm=1`
      )
      .then((res) => {
        const {
          data: {
            data: { body },
          },
        } = res;

    
        if(body){
  
            setComplianceFormData({ data: body 
            })

            changeReportPeriod(body);
        }

    

      })
      .catch((err) => {
        toast.error('Internal Server Error')
      }).finally(()=>{
        setLoaded(true)
      });
  }, [headerDateData.month , headerDateData.year , headerDateData.status]);

  
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
    <Layout title={`Welcome ${response?.username ? response?.username : "" }`}>
      {!loaded && <div className="loader">Loading...</div>}

      <div className="panel trans">

      <div className="pHead">
        <ComplianceHeader data={headerData}/>
      </div>

      {
        reportPeriod.length === 0 ?
        <Noreportpage />
        :
        <div className="pBody">
        <ComplianceReport data={ComplianceReportData}/>
    </div>
      }
      </div>

      <FooterDash />
    </Layout>
  );
};

export default ComplianceTable;
