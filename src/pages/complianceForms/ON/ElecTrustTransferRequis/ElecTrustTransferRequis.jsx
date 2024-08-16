import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Task } from "../../../../components/Tasks/Task";
import Layout from "../../../../components/LayoutComponents/Layout";
import axios from "../../../../utils/axios";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from 'react-to-print';
import Cookies from "js-cookie";


import {
  generateUniqueIdentifier,
  getUserSID,
  getUserId,
  getCurrentDate
} from "../../../../utils/helpers";
import toast from "react-hot-toast";

const ElecTrustTransferRequis: React.FC<{}> = () => {
  const history: any = useHistory();
  const taskState: Task = history.location.state;

  console.log('taskState',taskState)

  const [htmlContent, setHtmlContent] = useState('');
  const [fileNumberValue, setFileNumberValue] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [sectionA, setSectionA] = useState({
    requisition: `${generateUniqueIdentifier()}001`,
    amountOfFunds: "",
    Re: "",
    client_matter: taskState.client_matter,
    task_account: taskState.task_account.split(','),
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
    date: getCurrentDate(),
    signature: "",
    additionalTransactionParticulars: "",
    personEnteringDetailsOfTransfer: "",
    namePreparer: taskState.task_preparer_name,
    personAuthorizingTransferAtComputerTerminal: "",
    nameReviewer: taskState.task_approverer_name,
    persons: [],
    selectedTaskAccount:''
  });

  console.log("sectionAFirst",sectionA)

  const formTarget = useRef();

  useEffect(() => {

    axios.get(`/getcomplienceform/1`).then((res)=>{
     console.log('ressssPPO',res)
    }).catch((err)=>{
      console.log('resss  check res',err)
  
    })

    // fetch(`https://apicloudact.infoset.ca/v1/getcomplienceform/1`)
    //   .then(response => response.text())
    //   .then(data => {
    //     const updatedHtml = replacePlaceholders(data, sectionA);
    //     setHtmlContent(updatedHtml);
    //   }).catch((err) => {
    //     toast.error('something went wrong')
    //   });
  }, [sectionA]);


  useEffect(() => {
    const populateDropdown = (elementId, options) => {
      const selectElement = document.getElementById(elementId);
      console.log("checKelemt",elementId, options , selectElement)
      if (selectElement) {
        selectElement.innerHTML = '';
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Select an option';
        selectElement.appendChild(emptyOption);
        options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option;
          selectElement.appendChild(optionElement);
        });
        selectElement.addEventListener('change', handleChangeDropdown);
      }
    };

    populateDropdown('Person_requisitioning', sectionA.persons);
    populateDropdown('Person_authorizing', sectionA.persons);
    populateDropdown('Selectboxtaskaccount', sectionA.task_account);

    return () => {
      const selectElementRequisitioning = document.getElementById('Person_requisitioning');
      const selectElementAuthorizing = document.getElementById('Person_authorizing');
      if (selectElementRequisitioning) {
        selectElementRequisitioning.removeEventListener('change', handleChangeDropdown);
      }
      if (selectElementAuthorizing) {
        selectElementAuthorizing.removeEventListener('change', handleChangeDropdown);
      }
    };
  }, [htmlContent, sectionA.persons]);

 


  const handleChangeDropdown = (event) => {
    const value = event.target.value;
    if (event.target.id === 'Person_requisitioning') {
      setSectionA((prev) => ({
        ...prev,
        personRequisElecTrustTransfer: value
      }));

      const personAuthorizingElement = document.getElementById('trust_transferName');
      if (personAuthorizingElement) {
        personAuthorizingElement.textContent = value;
      }

      
    } else if (event.target.id === 'Person_authorizing') {
      setSectionA((prev) => ({
        ...prev,
        personAuthorizingTransferAtComputerTerminal: value
      }));
      const personAuthorizingElement = document.getElementById('Person_authorizingvalue');
      if (personAuthorizingElement) {
        personAuthorizingElement.textContent = value;
      }
    } else if (event.target.id === 'Selectboxtaskaccount') {

      console.log("checkID",value)

      // Selectboxtaskaccount

      setSectionA((prev) => ({
        ...prev,
        selectedTaskAccount: value
      }));
      setInputValue(fileNumberValue[value] || '');
      const taskAccountElement = document.getElementById('Selectboxtaskaccount');
      if (taskAccountElement) {
        let inputElement = document.getElementById('taskAccountInput');
        if (!inputElement) {
          inputElement = document.createElement('input');
          inputElement.type = 'text';
          inputElement.id = 'taskAccountInput';
          inputElement.oninput = handleDynamicInputChange;
          taskAccountElement.parentNode.insertBefore(inputElement, taskAccountElement.nextSibling);
        }
        inputElement.value = fileNumberValue[value] || '';
      }

    }
  };


  const handleDynamicInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    setFileNumberValue((prev) => ({
      ...prev,
      [sectionA.selectedTaskAccount]: value
    }));
  };



  const replacePlaceholders = (html, data) => {
    let updatedHtml = html;
    for (const key in data) {
      const regex = new RegExp(`{${key}}`, 'g');
      updatedHtml = updatedHtml.replace(regex, data[key]);
    }
    return updatedHtml;
  };

  useEffect(() => {
    axios.get(`/user/list/${getUserSID()}/${getUserId()}`).then((response) => {
      if (response?.data?.data?.body.length > 0) {
        setSectionA((prev) => ({
          ...prev,
          persons: response?.data?.data?.body.filter((element) => element.username).map(element => element.username)
        }));
      } else {
        toast.error("Something went wrong in user list");
      }
    }).catch((err) => {
      throw err;
    });
  }, []);


  const populateTable = () => {
    const tableElement = document.querySelector('table');

    console.log('tableElement',tableElement)

    if (tableElement) {
      const thead = tableElement.querySelector('thead');
      if (thead) {
        thead.innerHTML = `
          <tr>
            <th>Client</th>
            <th>File Number</th>
            <th>Amount</th>
          </tr>
        `;
      }
      const tbody = tableElement.querySelector('tbody');
      if (tbody) {
        tbody.innerHTML = ''; 
        tableData.forEach((data, index) => {


          

          const row = document.createElement('tr');
          const clientCell = document.createElement('td');
          clientCell.textContent = data.client;
          const fileNumberCell = document.createElement('td');
          fileNumberCell.textContent = data.filenumber;
          const amountCell = document.createElement('td');
          const amountInput = document.createElement('input');
          amountInput.type = 'text';
          amountInput.className = 'form-control';
          amountInput.value = data.amount || '';
          amountInput.onchange = (e) => {
            const newTableData = [...tableData];
            newTableData[index].amount = e.target.value;
            setTableData(newTableData);
            calculateTotal(newTableData);
          };
          amountCell.appendChild(amountInput);
          row.appendChild(clientCell);
          row.appendChild(fileNumberCell);
          row.appendChild(amountCell);
          tbody.appendChild(row);
        });

        const totalRow = document.createElement('tr');
        const totalClientCell = document.createElement('td');
        totalClientCell.colSpan = 2;
        totalClientCell.textContent = 'Total';
        const totalAmountCell = document.createElement('td');
        totalAmountCell.textContent = totalAmount.toFixed(2);
        totalRow.appendChild(totalClientCell);
        totalRow.appendChild(totalAmountCell);
        tbody.appendChild(totalRow);


      }
    }
  };

  useEffect(() => {
    populateTable();

  }, [tableData, htmlContent, totalAmount ]);

  // Sample table data
  useEffect(() => {

   let modifyy =  sectionA.task_account.map((element)=>{
      return { client: taskState.client_matter, filenumber: element, amount: '' }
   });

    setTableData(modifyy);
  }, []);




  const calculateTotal = (newTableData) => {
    const total = newTableData.reduce((acc, item) => {
      const amount = parseFloat(item.amount) || 0;
      return acc + amount;
    }, 0);

    setTotalAmount(total);
  };


  useEffect(()=>{

    let complienceform9a = Cookies.get("complienceform9a");
    let currentDate = getCurrentDate();

    if(complienceform9a){
      let {formid , requisition , formDate , sid} =  JSON.parse( complienceform9a);
      if(formid == taskState.id && currentDate == formDate){
        setSectionA((prev)=>({
          ...prev,
          requisition: requisition ? requisition : `${generateUniqueIdentifier()}001`
        }))
       }else if(formid == taskState.id && currentDate !== formDate){
    
        setSectionA((prev)=>({
          ...prev,
          requisition:`${generateUniqueIdentifier()}001`
        }))
    
       }
    }


  



   const requisitionFilter = sectionA.requisition

   setSectionA((prev)=>({
    ...prev,
    requisition: requisitionFilter.replace(' ','')
   }))

  },[sectionA.requisition])


  const printDocument = useReactToPrint({
    content: () => formTarget.current,
  });


  const handleDownloadClick = () => {
    printDocument();
    const {id} = taskState;

    let formData = Cookies.get("complienceform9a");

    let formCount = 0

    if(formData){
     formCount =  JSON.parse(formData);
      if(!formCount){
        formCount = 1
      }else{
        formCount = formCount+1
      }
    }

   
    Cookies.set("complienceform9a", JSON.stringify(
      {sid:getUserSID(),formid:id,requisition :sectionA.requisition , formDate:getCurrentDate() , formCount:formCount}
    ));
  };

  useEffect(()=>{
    axios.get(
      `/clio-account-details/${parseInt(taskState.clio_trust_account)}`
    ).then((res) => {

      console.log("cehckDeatails",res.data)
      if (res.data.data.body.length > 0) {
        setSectionA((prev) => ({
          ...prev,
          trustAccountToBeDebited: res.data.data.body[0].account_name,
          nameOfFinancialInst: res.data.data.body[0].bank_name,
          accountNumber: res.data.data.body[0].account_number,
        }));
      }
    }).catch((err)=>{
      toast.error('something went wrong')
    })

  },[])


  



  return (
    <Layout title={"Electronic Trust Transfer Requisition"}>
      <button className="btn btnPrimary rounded-pill" onClick={handleDownloadClick} >
      Download
      </button>    
      {htmlContent ? (
        <div
          className="print-container"
          ref={formTarget}
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{
            padding: "0 0 0 100px",
            outline: "none",
            border: "1px solid transparent",
          }}
        />       
      ) : (
        <h1>Loading</h1>
      )}
    </Layout>
  );
};

export default ElecTrustTransferRequis;
