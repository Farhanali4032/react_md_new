import React, { useEffect, useRef, useState } from "react";
import ComplianceFormLayout from "../ComplianceFormLayout.tsx";
import Dropdown from "react-dropdown";
import {
  fetchFormDetails,
  saveComplianceFormDetails,
} from "../../../utils/helpers";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router";
import UndisbursableTrustMoneyPrint from "./print/UndisbursableTrustMoneyPrint";

const UndisbursableTrustMoney = () => {
  const compliancePDF = useRef(null);
  const headings = ["Date", "Method", "Other Details"];
  const method = [
    "Written or email correspondence",
    "Inquiry made of other individual",
    "Internet search",
  ];

  const history = useHistory();
  const taskState = history.location.state;
  const [taskStatus, setTaskStatus] = useState(taskState);
  const htmlTemplate = `<html>
  <head><meta http-equiv=Content-Type content="text/html; charset=UTF-8">
  <style type="text/css">
  <!--
  span.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_004{font-family:Arial,serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}
  div.cls_004{font-family:Arial,serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}
  span.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_006{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_006{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_007{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_007{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_008{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}
  div.cls_008{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}
  span.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}
  div.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}
  span.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_022{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}
  div.cls_022{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_010{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}
  div.cls_010{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}
  span.cls_012{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}
  div.cls_012{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}
  span.cls_014{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_014{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_015{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}
  div.cls_015{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}
  span.cls_016{font-family:Arial,serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_016{font-family:Arial,serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_018{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_018{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_011{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_011{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  div.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
  span.cls_021{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}
  div.cls_021{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}
  -->
  </style>
  <script type="text/javascript" src="9a4325a8-82e8-11ec-a980-0cc47a792c0a_id_9a4325a8-82e8-11ec-a980-0cc47a792c0a_files/wz_jsgraphics.js"></script>
  </head>
  <body>


  <div id="page_container" style="height: 510px; overflow-y:scroll; overflow-x: hidden; background:white; position:absolute;left:50%;top:50%;transform:translate(-50%, -45%) scale(1.2);width:612px;border-style:outset;">

  <div style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden">
  <div style="position:absolute;left:0px;top:0px">
  <img src="https://www.lawsociety.ab.ca/wp-content/themes/law-society/assets/images/lsa-logo.png" className="logo_html"></div>
  <div style="position:absolute;left:371.11px;top:45.12px" className="cls_003"><span className="cls_003">700  333 - 11th Avenue SW Phone: 1.403.229.4700</span></div>
  <div style="position:absolute;left:357.43px;top:54.24px" className="cls_003"><span className="cls_003">Calgary, Alberta T2R 1L9</span></div>
  <div style="position:absolute;left:465.46px;top:54.24px" className="cls_003"><span className="cls_003">Toll Free: 1.800.661.9003</span></div>
  <div style="position:absolute;left:54.00px;top:72.60px" className="cls_004"><span className="cls_004">______________________________________________________________________________________________________________________________</span></div>




  <div style="position:absolute;left:54.00px;top:94.94px" className="cls_005"><span className="cls_005">Undisbursable Trust Money - Long Form</span></div>
  <div style="position:absolute;left:54.00px;top:112.58px" className="cls_006"><span className="cls_006">(For Client Matters Greater than $50 Value)</span></div>
  <div style="position:absolute;left:54.00px;top:128.97px" className="cls_007"><span className="cls_007">Under Section 117 (1) of the </span><span className="cls_008">Legal Profession Act</span></div>
  <div style="position:absolute;left:54.00px;top:141.57px" className="cls_007"><span className="cls_007">Rule 119.27 (1)(b)</span></div>
  <div style="position:absolute;left:54.00px;top:166.58px" className="cls_009"><span className="cls_009">Instructions</span></div>
  <div style="position:absolute;left:54.00px;top:183.26px" className="cls_002"><span className="cls_002">1.  One form must be submitted for each client matter.</span></div>
  <div style="position:absolute;left:54.00px;top:199.58px" className="cls_002"><span className="cls_002">2.  If more than one person is entitled to funds, list names and amount each person is entitled to, and answer all applicable</span></div>
  <div style="position:absolute;left:68.42px;top:209.90px" className="cls_002"><span className="cls_002">questions for each person </span><span className="cls_022">individually</span><span className="cls_002">.</span></div>
  <div style="position:absolute;left:54.00px;top:226.22px" className="cls_002"><span className="cls_002">3.  The Law Society of Alberta reserves the right to request further information or return the money if it appears insufficient or</span></div>
  <div style="position:absolute;left:68.42px;top:236.66px" className="cls_002"><span className="cls_002">no attempts have been made to distribute the trust money to the proper parties.</span></div>
  <div style="position:absolute;left:54.00px;top:252.89px" className="cls_002"><span className="cls_002">4.  Under Section 117(1) of the </span><span className="cls_010">Legal Profession Act</span><span className="cls_002">, the Law Society cannot accept any money unless it has been held in</span></div>
  <div style="position:absolute;left:68.42px;top:263.33px" className="cls_002"><span className="cls_002">trust by the law firm for a period not less than 2 years.</span></div>
  <div style="position:absolute;left:54.00px;top:279.65px" className="cls_002"><span className="cls_002">5.  A member practising as a sole practitioner is a “Law Firm” as defined in the Rules.</span></div>
  <div style="position:absolute;left:54.00px;top:295.85px" className="cls_009"><span className="cls_009">6.  Please make cheque payable to the Law Society of Alberta.</span><span className="cls_002">  Please send this form and the cheque to the Calgary</span></div>
  <div style="position:absolute;left:68.42px;top:306.41px" className="cls_002"><span className="cls_002">office, Attention: Accounting Department.</span></div>
  <div style="position:absolute;left:54.00px;top:322.73px" className="cls_002"><span className="cls_002">Note: All questions on this form must be answered.</span></div>
  <div style="position:absolute;left:54.00px;top:354.89px" className="cls_012"><span className="cls_012">SECTION A - LAW FIRM INFORMATION</span></div>
  <div style="position:absolute;left:54.00px;top:381.77px" className="cls_009"><span className="cls_009">1.</span></div>
  <div style="position:absolute;left:81.26px;top:381.77px" className="cls_002"><span className="cls_002">Law Firm Name:</span>
    <input className="htmlInput" id="lawFirmName"></input>
  </div>
  <div style="position:absolute;left:54.00px;top:399.65px" className="cls_009"><span className="cls_009">2.</span></div>
  <div style="position:absolute;left:81.26px;top:399.65px" className="cls_002"><span className="cls_002">Law Firm Address:</span>
  <input className="htmlInput" id="lawFirmAddress"></input>
  </div>
  <div style="position:absolute;left:81.26px;top:417.53px" className="cls_002"><span className="cls_002">City:</span>
  
  <input className="htmlInput htmlInput_m" id="city"></input>
  </div>
  <div style="position:absolute;left:327.53px;top:417.53px" className="cls_002"><span className="cls_002">Province:</span>
  <input className="htmlInput htmlInput_s" id="sectionAProvince"></input>
  </div>
  <div style="position:absolute;left:432.91px;top:417.53px" className="cls_002"><span className="cls_002">Postal Code:</span>
  <input className="htmlInput htmlInput_s" id="sectionApostalCode"></input>

  </div>
  <div style="position:absolute;left:54.00px;top:435.31px" className="cls_009"><span className="cls_009">3.</span></div>
  <div style="position:absolute;left:81.26px;top:435.31px" className="cls_002"><span className="cls_002">Law Firm Telephone</span>
  <input className="htmlInput htmlInput_s" id="sectionALawFirm"></input>

  </div>
  <div style="position:absolute;left:305.69px;top:435.31px" className="cls_002"><span className="cls_002">Fax Number:</span>
  
  <input className="htmlInput htmlInput_s" id="sectionAFaxNumber"></input>

  </div>
  <div style="position:absolute;left:81.26px;top:445.75px" className="cls_002"><span className="cls_002">Number:</span></div>
  <div style="position:absolute;left:54.00px;top:462.07px" className="cls_009"><span className="cls_009">4.</span></div>
  <div style="position:absolute;left:81.26px;top:462.07px" className="cls_002"><span className="cls_002">Responsible</span>
  <input className="htmlInput " id="sectionAResponsibleLawyer"></input>

  </div>
  <div style="position:absolute;left:81.26px;top:472.39px" className="cls_002"><span className="cls_002">Lawyer:</span>
  
 
  </div>
  <div style="position:absolute;left:54.00px;top:488.71px" className="cls_009"><span className="cls_009">5.</span></div>
  <div style="position:absolute;left:81.26px;top:488.71px" className="cls_002"><span className="cls_002">Law Firm Email:</span>
  
  <input className="htmlInput" id="sectionALawFirmEmail"></input>

  </div>
  <div style="position:absolute;left:54.00px;top:517.87px" className="cls_012"><span className="cls_012">SECTION B - FILE INFORMATION</span></div>
  <div style="position:absolute;left:54.00px;top:544.75px" className="cls_009"><span className="cls_009">1.</span></div>
  <div style="position:absolute;left:81.26px;top:544.75px" className="cls_002"><span className="cls_002">File number and</span>
  
  <input className="htmlInput " id="sectionBFileNumber"></input>

  </div>
  <div style="position:absolute;left:81.26px;top:555.19px" className="cls_002"><span className="cls_002">nature of matter:</span></div>
  <div style="position:absolute;left:54.00px;top:571.51px" className="cls_009"><span className="cls_009">2.</span></div>
  <div style="position:absolute;left:81.26px;top:571.51px" className="cls_002"><span className="cls_002">Name of client:</span>
  
  <input className="htmlInput " id="sectionBNameOfClient"></input>

  </div>
  <div style="position:absolute;left:54.00px;top:589.39px" className="cls_009"><span className="cls_009">3.</span></div>
  <div style="position:absolute;left:81.26px;top:589.39px" className="cls_002"><span className="cls_002">Last known</span>
  <input className="htmlInput " id="sectionBResponsibleLawyer"></input>

  </div>
  <div style="position:absolute;left:81.26px;top:599.74px" className="cls_002"><span className="cls_002">address:</span></div>
  <div style="position:absolute;left:81.26px;top:616.06px" className="cls_002"><span className="cls_002">City:</span>
  
  <input className="htmlInput htmlInput_m" id="sectionBCity"></input>

  </div>
  <div style="position:absolute;left:327.53px;top:616.06px" className="cls_002"><span className="cls_002">Province:</span>
  <input className="htmlInput htmlInput_s" id="sectionBProvince"></input>

  </div>
  <div style="position:absolute;left:432.91px;top:616.06px" className="cls_002"><span className="cls_002">Postal Code:</span>
  <input className="htmlInput htmlInput_s" id="sectionBPostalCode"></input>
  </div>
  <div style="position:absolute;left:81.26px;top:633.94px" className="cls_002"><span className="cls_002">Country:</span>
  
  <input className="htmlInput" id="sectionBCountry"></input>
  </div>
  <div style="position:absolute;left:54.00px;top:651.82px" className="cls_009"><span className="cls_009">4.</span></div>
  <div style="position:absolute;left:81.26px;top:651.82px" className="cls_002"><span className="cls_002">Last known</span>
  


  </div>
  <div style="position:absolute;left:81.26px;top:662.14px" className="cls_002"><span className="cls_002">telephone number:</span>
  <input className="htmlInput" id="sectionBLastTelNum"></input>
  </div>
  <div style="position:absolute;left:54.00px;top:702.34px" className="cls_014"><span className="cls_014">The information provided in this form will be used by the Law Society of Alberta for one or more purposes contemplated by the  </span><span className="cls_015">Legal Profession Act</span><span className="cls_014">, the Rules of the Law Society, the Code of Conduct, or a</span></div>
  <div style="position:absolute;left:54.00px;top:708.82px" className="cls_014"><span className="cls_014">resolution of the Benchers and will be accessible to all departments of the Law Society, including the Alberta Lawyers Insurance Association.  The information may be used or disclosed by the Law Society of</span></div>
  <div style="position:absolute;left:54.00px;top:715.18px" className="cls_014"><span className="cls_014">Alberta, now or in the future, for regulatory purposes, including Law Society of Alberta investigations and proceedings.  We may contact you to o btain additional information, or to obtain clarification on the</span></div>
  <div style="position:absolute;left:54.00px;top:721.42px" className="cls_014"><span className="cls_014">information you provided.  Should you have any questions about this, please contact the Privacy Officer at 403-229-4700.</span></div>
  <div style="position:absolute;left:54.00px;top:726.82px" className="cls_004"><span className="cls_004">______________________________________________________________________________________________________________________________</span></div>
  <div style="position:absolute;left:54.00px;top:736.06px" className="cls_016"><span className="cls_016">December 2015</span></div>
  <div style="position:absolute;left:290.45px;top:736.06px" className="cls_016"><span className="cls_016">Page 1 of 3</span></div>
  <div style="position:absolute;left:487.54px;top:736.06px" className="cls_016"><span className="cls_016"> </span><A HREF="http://www.lawsociety.ab.ca/">www.lawsociety.ab.ca</A> </div>
  </div>
  <div style="position:absolute;left:50%;margin-left:-306px;top:802px;width:612px;height:792px;border-style:outset;overflow:hidden">
  <div style="position:absolute;left:0px;top:0px">
  <img src="9a4325a8-82e8-11ec-a980-0cc47a792c0a_id_9a4325a8-82e8-11ec-a980-0cc47a792c0a_files/background2.jpg" width=612 height=792></div>
  <div style="position:absolute;left:468.10px;top:34.56px" className="cls_016"><span className="cls_016">Undisbursable Trust Money</span></div>
  <div style="position:absolute;left:54.00px;top:39.24px" className="cls_016"><span className="cls_016">Law Society of Alberta</span></div>
  <div style="position:absolute;left:522.58px;top:43.80px" className="cls_016"><span className="cls_016">Long Form</span></div>
  <div style="position:absolute;left:54.00px;top:53.16px" className="cls_004"><span className="cls_004">______________________________________________________________________________________________________________________________</span></div>
  <div style="position:absolute;left:54.00px;top:79.82px" className="cls_012"><span className="cls_012">SECTION C - CLAIMANT INFORMATION (complete if different from Section B)</span></div>
  <div style="position:absolute;left:54.00px;top:106.82px" className="cls_009"><span className="cls_009">1.</span></div>
  <div style="position:absolute;left:81.26px;top:106.82px" className="cls_002"><span className="cls_002">Claimant:</span>
  <input className="htmlInput" id="sectionBLastTelNum"></input>
  </div>
  <div style="position:absolute;left:54.00px;top:124.58px" className="cls_009"><span className="cls_009">2.</span></div>
  <div style="position:absolute;left:81.26px;top:124.58px" className="cls_002"><span className="cls_002">Name of Person /</span></div>
  <div style="position:absolute;left:81.26px;top:135.02px" className="cls_002"><span className="cls_002">Corporation who is</span>
  <input className="htmlInput" id="sectionCClaimant"></input>
  
  
  </div>
  <div style="position:absolute;left:81.26px;top:145.34px" className="cls_002"><span className="cls_002">entitled to the funds:</span></div>
  <div style="position:absolute;left:54.00px;top:161.66px" className="cls_009"><span className="cls_009">3.</span></div>
  <div style="position:absolute;left:81.26px;top:161.66px" className="cls_002"><span className="cls_002">Last known</span>
  
  <input className="htmlInput" id="sectionCLastKnown"></input>
  </div>
  <div style="position:absolute;left:81.26px;top:171.98px" className="cls_002"><span className="cls_002">address:</span></div>
  <div style="position:absolute;left:81.26px;top:188.42px" className="cls_002"><span className="cls_002">City:</span>
  
  <input className="htmlInput" id="sectionCCity"></input>
  </div>
  <div style="position:absolute;left:327.53px;top:188.42px" className="cls_002"><span className="cls_002">Province:</span>
    
  <input className="htmlInput htmlInput_s" id="sectionCProvince"></input>
  
  </div>
  <div style="position:absolute;left:432.91px;top:188.42px" className="cls_002"><span className="cls_002">Postal Code:</span>
     
  <input className="htmlInput htmlInput_s" id="sectionCPostalCode"></input>
  
  
  </div>
  <div style="position:absolute;left:81.26px;top:206.18px" className="cls_002"><span className="cls_002">Country:</span>
  
  <input className="htmlInput " id="sectionCCountry"></input>
  </div>
  <div style="position:absolute;left:54.00px;top:224.06px" className="cls_009"><span className="cls_009">4.</span></div>
  <div style="position:absolute;left:81.26px;top:224.06px" className="cls_002"><span className="cls_002">Last known</span></div>
  <div style="position:absolute;left:81.26px;top:234.38px" className="cls_002"><span className="cls_002">telephone number:</span>
  
  <input className="htmlInput " id="sectionCLastTelNum"></input>
  </div>
  <div style="position:absolute;left:54.00px;top:250.73px" className="cls_009"><span className="cls_009">5.</span></div>
  <div style="position:absolute;left:81.26px;top:250.73px" className="cls_002"><span className="cls_002">If Corporation,</span></div>
  <div style="position:absolute;left:81.26px;top:261.17px" className="cls_002"><span className="cls_002">current status with</span>
  <input className="htmlInput " id="sectionCCurrentStatus"></input>

  
  </div>
  <div style="position:absolute;left:81.26px;top:271.49px" className="cls_002"><span className="cls_002">Corporate Registry</span></div>
  <div style="position:absolute;left:54.00px;top:310.61px" className="cls_012"><span className="cls_012">SECTION D - FINANCIAL DETAILS AND ATTEMPTS TO RETURN THE FUNDS</span></div>
  <div style="position:absolute;left:54.00px;top:337.49px" className="cls_009"><span className="cls_009">1.</span></div>
  <div style="position:absolute;left:80.66px;top:337.49px" className="cls_002"><span className="cls_002">Dollar Amount being referred to the Law Society of Alberta</span>
    
  <input className="htmlInput htmlInput_s" id="sectionDDollarAmount"></input>

  
  </div>
  <div style="position:absolute;left:442.27px;top:337.49px" className="cls_002"><span className="cls_002">Received</span>
  
      
  <input className="htmlInput htmlInput_s" id="sectionDReceived"></input>
  </div>
  <div style="position:absolute;left:80.66px;top:347.93px" className="cls_002"><span className="cls_002">and date funds initially received by the law firm:</span>

  
  </div>
  <div style="position:absolute;left:442.27px;top:345.05px" className="cls_018"><span className="cls_018">(mm/dd/yyyy)</span></div>
  <div style="position:absolute;left:54.00px;top:364.25px" className="cls_009"><span className="cls_009">2.</span></div>
  <div style="position:absolute;left:80.66px;top:364.25px" className="cls_002"><span className="cls_002">Are these funds subject to trust conditions?</span></div>
  <div style="position:absolute;left:508.18px;top:364.25px" className="cls_002"><span className="cls_002"><input type="radio" className="radio_box_html" name="areTheseFunds"></input> Yes</span></div>
  <div style="position:absolute;left:546.46px;top:364.25px" className="cls_002"><span className="cls_002"><input type="radio" className="radio_box_html" name="areTheseFunds"></input> No</span></div>
  <div style="position:absolute;left:80.66px;top:380.57px" className="cls_002"><span className="cls_002">If so, give complete details:</span>
  
    <textarea id="completeDetails"></textarea>
  </div>
  <div style="position:absolute;left:54.00px;top:478.75px" className="cls_009"><span className="cls_009">3.</span></div>
  <div style="position:absolute;left:80.66px;top:478.75px" className="cls_002"><span className="cls_002">Attempts to contact Client/Claimant over the past two years (state dates and methods involved):</span></div>
  <div style="position:absolute;left:129.62px;top:495.07px" className="cls_002"><span className="cls_002">Date</span></div>
  <div style="position:absolute;left:179.90px;top:495.07px" className="cls_002"><span className="cls_002">Method</span></div>
  <div style="position:absolute;left:314.57px;top:495.07px" className="cls_002"><span className="cls_002">Other Details</span></div>
  <div style="position:absolute;left:121.10px;top:502.51px" className="cls_018"><span className="cls_018">(mm/dd/yyyy)</span></div>
  <div style="position:absolute;left:179.90px;top:502.51px" className="cls_018"><span className="cls_018">(Select one of the following)</span></div>
  <div style="position:absolute;left:90.14px;top:518.35px" className="cls_002"><span className="cls_002">a)</span></div>
  <div style="position:absolute;left:90.14px;top:536.11px" className="cls_002"><span className="cls_002">b)</span></div>
  <div style="position:absolute;left:90.74px;top:553.99px" className="cls_002"><span className="cls_002">c)</span></div>
  <div style="position:absolute;left:54.00px;top:571.87px" className="cls_009"><span className="cls_009">4.</span></div>
  <div style="position:absolute;left:80.66px;top:571.87px" className="cls_002"><span className="cls_002">Was there a need to contact the Public Trustee?</span></div>
  <div style="position:absolute;left:508.18px;top:571.87px" className="cls_002"><span className="cls_002"> <input type="radio" className="radio_box_html" name="areTheseFunds2"></input> Yes</span></div>
  <div style="position:absolute;left:546.46px;top:571.87px" className="cls_002"><span className="cls_002"><input type="radio" className="radio_box_html" name="areTheseFunds2"></input> No</span></div>

  <div style="position:absolute;left:80.66px;top:588.19px" className="cls_002"><span className="cls_002">If yes, state the result of contact:</span>
  
  <textarea></textarea>
  </div>
  <div style="position:absolute;left:54.00px;top:726.82px" className="cls_004"><span className="cls_004">______________________________________________________________________________________________________________________________</span></div>
  <div style="position:absolute;left:54.00px;top:736.06px" className="cls_016"><span className="cls_016">December 2015</span></div>
  <div style="position:absolute;left:290.45px;top:736.06px" className="cls_016"><span className="cls_016">Page 2 of 3</span></div>
  <div style="position:absolute;left:487.54px;top:736.06px" className="cls_016"><span className="cls_016"> </span><A HREF="http://www.lawsociety.ab.ca/">www.lawsociety.ab.ca</A> </div>
  </div>
  <div style="position:absolute;left:50%;margin-left:-306px;top:1604px;width:612px;height:792px;border-style:outset;overflow:hidden">
  <div style="position:absolute;left:0px;top:0px">
  <img src="9a4325a8-82e8-11ec-a980-0cc47a792c0a_id_9a4325a8-82e8-11ec-a980-0cc47a792c0a_files/background3.jpg" width=612 height=792></div>
  <div style="position:absolute;left:468.10px;top:34.56px" className="cls_016"><span className="cls_016">Undisbursable Trust Money</span></div>
  <div style="position:absolute;left:54.00px;top:39.24px" className="cls_016"><span className="cls_016">Law Society of Alberta</span></div>
  <div style="position:absolute;left:522.58px;top:43.80px" className="cls_016"><span className="cls_016">Long Form</span></div>
  <div style="position:absolute;left:54.00px;top:53.16px" className="cls_004"><span className="cls_004">______________________________________________________________________________________________________________________________</span></div>
  <div style="position:absolute;left:54.00px;top:81.26px" className="cls_009"><span className="cls_009">5.</span></div>
  <div style="position:absolute;left:80.66px;top:81.26px" className="cls_002"><span className="cls_002">Information useful in confirming validity of client’s claim to these funds including the nature of the engagement by the</span></div>
  <div style="position:absolute;left:80.66px;top:91.58px" className="cls_002"><span className="cls_002">law firm:</span>
  
    <textarea></textarea>
  </div>
  <div style="position:absolute;left:54.00px;top:261.53px" className="cls_012"><span className="cls_012">SECTION E - LAWYER CERTIFICATION</span></div>
  <div style="position:absolute;left:80.18px;top:288.41px" className="cls_002"><span className="cls_002">I,</span>
  <input className="htmlInput" id="certificationName"></input>
  </div>
  <div style="position:absolute;left:321.65px;top:288.41px" className="cls_002"><span className="cls_002">, certify that the foregoing information is complete</span></div>
  <div style="position:absolute;left:80.18px;top:306.29px" className="cls_002"><span className="cls_002">and correct to the best of my knowledge.</span></div>
  <div style="position:absolute;left:80.66px;top:356.69px" className="cls_011"><span className="cls_011">Date </span>
  <input className="htmlInput htmlInput_m" id="certificationDate"></input>
  </div>
  <div style="position:absolute;left:272.09px;top:355.85px" className="cls_002"><span className="cls_002">Signature of Lawyer</span>
  
  
  <input className="htmlInput htmlInput_m" id="certificationSign"></input>
  </div>
  <div style="position:absolute;left:54.00px;top:660.34px" className="cls_020"><span className="cls_020">The information provided in this form will be used by the Law Society of Alberta for one or more purposes contemplated by the </span><span className="cls_021">Legal</span></div>
  <div style="position:absolute;left:54.00px;top:669.46px" className="cls_021"><span className="cls_021">Profession Act</span><span className="cls_020">, the Rules of the Law Society, the Code of Conduct, or a resolution of the Benchers and will be accessible to all departments of</span></div>
  <div style="position:absolute;left:54.00px;top:678.58px" className="cls_020"><span className="cls_020">the Law Society, including the Alberta Lawyers Insurance Association.  The information may be used or disclosed by the Law Society of</span></div>
  <div style="position:absolute;left:54.00px;top:687.82px" className="cls_020"><span className="cls_020">Alberta, now or in the future, for regulatory purposes, including Law Society of Alberta investigations and proceedings.  We may contact you to</span></div>
  <div style="position:absolute;left:54.00px;top:697.06px" className="cls_020"><span className="cls_020">obtain additional information, or to obtain clarification on the information you provided.  Should you have any questions about this, please</span></div>
  <div style="position:absolute;left:54.00px;top:706.30px" className="cls_020"><span className="cls_020">contact the Privacy Officer at 403-229-4700.</span></div>
  <div style="position:absolute;left:54.00px;top:726.82px" className="cls_004"><span className="cls_004">______________________________________________________________________________________________________________________________</span></div>
  <div style="position:absolute;left:54.00px;top:736.06px" className="cls_016"><span className="cls_016">December 2015</span></div>
  <div style="position:absolute;left:290.45px;top:736.06px" className="cls_016"><span className="cls_016">Page 3 of 3</span></div>
  <div style="position:absolute;left:487.54px;top:736.06px" className="cls_016"><span className="cls_016"> </span><A HREF="http://www.lawsociety.ab.ca/">www.lawsociety.ab.ca</A> </div>
  </div>
  
  </div>
  </body>
  </html>
  `;

  const [sectionA, setSectionA] = useState({
    LawFirmName: "",
    LawFirmAddress: "",
    City: "",
    Province: "",
    PostalCode: "",
    FaxNumber: "",
    LawFirmTelNum: "",
    ResponsibleLawyer: "",
    LawFirmEmail: "",
    fileNumberAndMatter: "",
    NameOfClient: "",
    LastKnownAddress: "",
    sectionBCity: "",
    sectionBProvince: "",
    sectionBPostalCode: "",
    sectionBCountry: "",
    sectionBLastKnownTelNum: "",
    Claimant: "",
    NameOfPerson: "",
    sectionBLastKnownAddress: "",
    sectionCCity: "",
    sectionCCountry: "",
    sectionCProvince: "",
    sectionCPostalCode: "",
    sectionCLastTelNum: "",
    CorporationCurrentStatus: "",
    DollarAmountAndDate: "",
    Received: "",
    SubjectToTrust: "",
    SubjectToTrustDetails: "",
    AttemptsToContact: "",
    ContactToPublic: "",
    ContactToPublicDetails: "",
    ValidityClient: "",
    details: [
      {
        date: "",
        Method: "",
        OtherDetails: "",
      },
    ],
    Signature: "",
    Date: "",
    certificationName: "",
  });

  const ref = useRef(null);

  const stylesHTML =
    "\n  <!--\n  span.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_004{font-family:Arial,serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_004{font-family:Arial,serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_006{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_006{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_007{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_007{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_008{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_008{font-family:Arial,serif;font-size:11.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_009{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_022{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\n  div.cls_022{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_010{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_010{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_012{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_012{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_014{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_014{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_015{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_015{font-family:Arial,serif;font-size:5.6px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_016{font-family:Arial,serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_016{font-family:Arial,serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_018{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_018{font-family:Arial,serif;font-size:6.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_011{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_011{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_020{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_021{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_021{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  -->\n  ";

  const handleChangeInput = (e) => {
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

  return (
    <ComplianceFormLayout
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
      title="Undisbursable Trust Money - Long Form"
    >
      <div style={{ display: "none" }}>
        <UndisbursableTrustMoneyPrint
          taskData={taskState}
          ref={compliancePDF}
        />
      </div>
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: stylesHTML }}
        />
        <div
          id="page_container"
          style={{
            height: "510px",
            "overflow-y": "scroll",
            "overflow-x": "hidden",
            background: "white",
            position: "absolute",
            left: "45%",
            top: "50%",
            "-webkit-transform": "translate(-50%, -45%) scale(1.2)",
            "-ms-transform": "translate(-50%, -45%) scale(1.2)",
            transform: "translate(-50%, -45%) scale(1.2)",
            width: "612px",
            "border-style": "outset",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              "margin-left": "-306px",
              top: "0px",
              width: "612px",
              height: "792px",
              "border-style": "outset",
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
              style={{ position: "absolute", left: "371.11px", top: "45.12px" }}
              className="cls_003"
            >
              <span className="cls_003">
                700 333 - 11th Avenue SW Phone: 1.403.229.4700
              </span>
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
                <b>Undisbursable Trust Money - Long Form</b>
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "112.58px" }}
              className="cls_006"
            >
              <span className="cls_006">
                <b>(For Client Matters Greater than $50 Value)</b>
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "128.97px" }}
              className="cls_007"
            >
              <span className="cls_007">Under Section 117 (1) of the </span>
              <span className="cls_008">Legal Profession Act</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "141.57px" }}
              className="cls_007"
            >
              <span className="cls_007">Rule 119.27 (1)(b)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50.00px",
                top: "167.06px",
                border: "1.5px solid black",
                width: "90%",
                height: "20%",
              }}
            ></div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "166.58px" }}
              className="cls_009"
            >
              <span className="cls_009">Instructions</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "183.26px" }}
              className="cls_002"
            >
              <span className="cls_002">
                1. One form must be submitted for each client matter.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "199.58px" }}
              className="cls_002"
            >
              <span className="cls_002">
                2. If more than one person is entitled to funds, list names and
                amount each person is entitled to, and answer all applicable
                questions for each person individually.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "68.42px", top: "209.90px" }}
              className="cls_002"
            >
              <span className="cls_002">questions for each person </span>
              <span className="cls_022">individually</span>
              <span className="cls_002">.</span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "226.22px" }}
              className="cls_002"
            >
              <span className="cls_002">
                3. The Law Society of Alberta reserves the right to request
                further information or return the money if it appears
                insufficient or no attempts have been made to distribute the
                trust money to the proper parties.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "68.42px", top: "236.66px" }}
              className="cls_002"
            >
              <span className="cls_002">
                no attempts have been made to distribute the trust money to the
                proper parties.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "252.89px" }}
              className="cls_002"
            >
              <span className="cls_002">
                4. Under Section 117(1) of the Legal Profession Act, the Law
                Society cannot accept any money unless it has been held in trust
                by the law firm for a period not less than 2 years.
              </span>
              {/* <span className="cls_010">Legal Profession Act</span>
              <span className="cls_002">
                , the Law Society cannot accept any money unless it has been
                held in
              </span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "68.42px", top: "263.33px" }}
              className="cls_002"
            >
              <span className="cls_002">
                trust by the law firm for a period not less than 2 years.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "279.65px" }}
              className="cls_002"
            >
              <span className="cls_002">
                5. A member practising as a sole practitioner is a “Law Firm” as
                defined in the Rules.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "295.85px" }}
              className="cls_009"
            >
              <span className="cls_009">
                6. Please make cheque payable to the Law Society of Alberta.
              </span>
              <span className="cls_002">
                {" "}
                Please send this form and the cheque to the Calgary office,
                Attention: Accounting Department.
              </span>
            </div>
            {/* <div
              style={{ position: "absolute", left: "68.42px", top: "306.41px" }}
              className="cls_002"
            >
              <span className="cls_002">
                office, Attention: Accounting Department.
              </span>
            </div> */}
            <div
              style={{ position: "absolute", left: "54.00px", top: "322.73px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Note: All questions on this form must be answered.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "354.89px" }}
              className="cls_012"
            >
              <span className="cls_012">SECTION A - LAW FIRM INFORMATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "381.77px" }}
              className="cls_009"
            >
              <span className="cls_009">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "381.77px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm Name:</span>
              <input
                className="htmlInput"
                id="lawFirmName"
                name="LawFirmName"
                onChange={(e) => handleChangeInput(e)}
                value={sectionA.LawFirmName}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "399.65px" }}
              className="cls_009"
            >
              <span className="cls_009">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "399.65px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm Address:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput"
                id="lawFirmAddress"
                name="LawFirmAddress"
                value={sectionA.LawFirmAddress}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "417.53px" }}
              className="cls_002"
            >
              <span className="cls_002">City:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_m"
                id="city"
                name="City"
                value={sectionA.City}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "327.53px",
                top: "417.53px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Province:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                id="sectionAProvince"
                name="Province"
                value={sectionA.Province}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "432.91px",
                top: "417.53px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Postal Code:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                id="sectionApostalCode"
                name="PostalCode"
                value={sectionA.PostalCode}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "435.31px" }}
              className="cls_009"
            >
              <span className="cls_009">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "435.31px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm Telephone</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                value={sectionA.LawFirmTelNum}
                name="LawFirmTelNum"
                id="sectionALawFirm"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "305.69px",
                top: "435.31px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Fax Number:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                value={sectionA.FaxNumber}
                name="FaxNumber"
                id="sectionAFaxNumber"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "445.75px" }}
              className="cls_002"
            >
              <span className="cls_002">Number:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "462.07px" }}
              className="cls_009"
            >
              <span className="cls_009">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "462.07px" }}
              className="cls_002"
            >
              <span className="cls_002">Responsible</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput"
                name="ResponsibleLawyer"
                value={sectionA.ResponsibleLawyer}
                id="sectionAResponsibleLawyer"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "472.39px" }}
              className="cls_002"
            >
              <span className="cls_002">Lawyer:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "488.71px" }}
              className="cls_009"
            >
              <span className="cls_009">5.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "488.71px" }}
              className="cls_002"
            >
              <span className="cls_002">Law Firm Email:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                name="LawFirmEmail"
                className="htmlInput"
                value={sectionA.LawFirmEmail}
                id="sectionALawFirmEmail"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "517.87px" }}
              className="cls_012"
            >
              <span className="cls_012">SECTION B - FILE INFORMATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "544.75px" }}
              className="cls_009"
            >
              <span className="cls_009">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "544.75px" }}
              className="cls_002"
            >
              <span className="cls_002">File number and</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput "
                name="fileNumberAndMatter"
                id="sectionBFileNumber"
                value={sectionA.fileNumberAndMatter}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "555.19px" }}
              className="cls_002"
            >
              <span className="cls_002">nature of matter:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "571.51px" }}
              className="cls_009"
            >
              <span className="cls_009">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "571.51px" }}
              className="cls_002"
            >
              <span className="cls_002">Name of client:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput "
                name="NameOfClient"
                id="sectionBNameOfClient"
                value={sectionA.NameOfClient}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "589.39px" }}
              className="cls_009"
            >
              <span className="cls_009">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "589.39px" }}
              className="cls_002"
            >
              <span className="cls_002">Last known</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput "
                name="LastKnownAddress"
                id="sectionBResponsibleLawyer"
                value={sectionA.LastKnownAddress}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "599.74px" }}
              className="cls_002"
            >
              <span className="cls_002">address:</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "616.06px" }}
              className="cls_002"
            >
              <span className="cls_002">City:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_m"
                id="sectionBCity"
                name="sectionBCity"
                value={sectionA.City}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "327.53px",
                top: "616.06px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Province:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                id="sectionBProvince"
                name="sectionBProvince"
                value={sectionA.Province}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "432.91px",
                top: "616.06px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Postal Code:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                id="sectionBPostalCode"
                name="sectionBPostalCode"
                value={sectionA.PostalCode}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "633.94px" }}
              className="cls_002"
            >
              <span className="cls_002">Country:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput"
                id="sectionBCountry"
                name="sectionBCountry"
                value={sectionA.sectionBCountry}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "651.82px" }}
              className="cls_009"
            >
              <span className="cls_009">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "651.82px" }}
              className="cls_002"
            >
              <span className="cls_002">Last known</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "662.14px" }}
              className="cls_002"
            >
              <span className="cls_002">telephone number:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput"
                id="sectionBLastTelNum"
                name="sectionBLastKnownTelNum"
                value={sectionA.sectionBLastKnownTelNum}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "702.34px" }}
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
                investigations and proceedings. We may contact you to o btain
                additional information, or to obtain clarification on the
                information you provided. Should you have any questions about
                this, please contact the Privacy Officer at 403-229-4700.
              </span>
              {/* <span className="cls_015">Legal Profession Act</span>
              <span className="cls_014">
                , the Rules of the Law Society, the Code of Conduct, or a
              </span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "708.82px" }}
              className="cls_014"
            >
              <span className="cls_014">
                resolution of the Benchers and will be accessible to all
                departments of the Law Society, including the Alberta Lawyers
                Insurance Association. The information may be used or disclosed
                by the Law Society of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "715.18px" }}
              className="cls_014"
            >
              <span className="cls_014">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to o btain additional information, or to
                obtain clarification on the
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "721.42px" }}
              className="cls_014"
            >
              <span className="cls_014">
                information you provided. Should you have any questions about
                this, please contact the Privacy Officer at 403-229-4700.
              </span>
            </div> */}
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
              className="cls_016"
            >
              <span className="cls_016">December 2015</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_016"
            >
              <span className="cls_016">Page 1 of 3</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.06px",
              }}
              className="cls_016"
            >
              <span className="cls_016"> </span>
              <a href="http://www.lawsociety.ab.ca/">
                www.lawsociety.ab.ca
              </a>{" "}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              "margin-left": "-306px",
              top: "802px",
              width: "612px",
              height: "792px",
              "border-style": "outset",
              overflow: "hidden",
            }}
          >
            {/* <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="9a4325a8-82e8-11ec-a980-0cc47a792c0a_id_9a4325a8-82e8-11ec-a980-0cc47a792c0a_files/background2.jpg"
                width={612}
                height={792}
              />
            </div> */}
            <div
              style={{ position: "absolute", left: "468.10px", top: "34.56px" }}
              className="cls_016"
            >
              <span className="cls_016">Undisbursable Trust Money</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "39.24px" }}
              className="cls_016"
            >
              <span className="cls_016">Law Society of Alberta</span>
            </div>
            <div
              style={{ position: "absolute", left: "522.58px", top: "43.80px" }}
              className="cls_016"
            >
              <span className="cls_016">Long Form</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "53.16px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "79.82px" }}
              className="cls_012"
            >
              <span className="cls_012">
                SECTION C - CLAIMANT INFORMATION (complete if different from
                Section B)
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "106.82px" }}
              className="cls_009"
            >
              <span className="cls_009">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "106.82px" }}
              className="cls_002"
            >
              <span className="cls_002">Claimant:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput"
                name="Claimant"
                value={sectionA.Claimant}
                id="sectionBLastTelNum"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "124.58px" }}
              className="cls_009"
            >
              <span className="cls_009">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "124.58px" }}
              className="cls_002"
            >
              <span className="cls_002">Name of Person /</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "135.02px" }}
              className="cls_002"
            >
              <span className="cls_002">Corporation who is</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput"
                name="NameOfPerson"
                value={sectionA.NameOfPerson}
                id="sectionCClaimant"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "145.34px" }}
              className="cls_002"
            >
              <span className="cls_002">entitled to the funds:</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "161.66px" }}
              className="cls_009"
            >
              <span className="cls_009">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "161.66px" }}
              className="cls_002"
            >
              <span className="cls_002">Last known</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput"
                id="sectionCLastKnown"
                value={sectionA.sectionBLastKnownAddress}
                name="sectionBLastKnownAddress"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "171.98px" }}
              className="cls_002"
            >
              <span className="cls_002">address:</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "188.42px" }}
              className="cls_002"
            >
              <span className="cls_002">City:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput"
                id="sectionCCity"
                value={sectionA.sectionCCity}
                name="sectionCCity"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "327.53px",
                top: "188.42px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Province:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                id="sectionCProvince"
                value={sectionA.sectionCProvince}
                name="sectionCProvince"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "432.91px",
                top: "188.42px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Postal Code:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                id="sectionCPostalCode"
                name="sectionCPostalCode"
                value={sectionA.sectionCPostalCode}
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "206.18px" }}
              className="cls_002"
            >
              <span className="cls_002">Country:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput "
                id="sectionCCountry"
                value={sectionA.sectionCCountry}
                name="sectionCCountry"
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "224.06px" }}
              className="cls_009"
            >
              <span className="cls_009">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "224.06px" }}
              className="cls_002"
            >
              <span className="cls_002">Last known</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "234.38px" }}
              className="cls_002"
            >
              <span className="cls_002">telephone number:</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput "
                id="sectionCLastTelNum"
                name="sectionCLastTelNum"
                value={sectionA.sectionCLastTelNum}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "250.73px" }}
              className="cls_009"
            >
              <span className="cls_009">5.</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "250.73px" }}
              className="cls_002"
            >
              <span className="cls_002">If Corporation,</span>
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "261.17px" }}
              className="cls_002"
            >
              <span className="cls_002">current status with</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput "
                id="sectionCCurrentStatus"
                value={sectionA.CorporationCurrentStatus}
                name="CorporationCurrentStatus"
              />
            </div>
            <div
              style={{ position: "absolute", left: "81.26px", top: "271.49px" }}
              className="cls_002"
            >
              <span className="cls_002">Corporate Registry</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "310.61px" }}
              className="cls_012"
            >
              <span className="cls_012">
                SECTION D - FINANCIAL DETAILS AND ATTEMPTS TO RETURN THE FUNDS
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "337.49px" }}
              className="cls_009"
            >
              <span className="cls_009">1.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "337.49px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Dollar Amount being referred to the Law Society of Alberta
              </span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                id="sectionDDollarAmount"
                name="DollarAmountAndDate"
                value={sectionA.DollarAmountAndDate}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "442.27px",
                top: "337.49px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Received</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_s"
                id="sectionDReceived"
                name="Received"
                value={sectionA.Received}
              />
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "347.93px" }}
              className="cls_002"
            >
              <span className="cls_002">
                and date funds initially received by the law firm:
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "442.27px",
                top: "345.05px",
              }}
              className="cls_018"
            >
              <span className="cls_018">(mm/dd/yyyy)</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "364.25px" }}
              className="cls_009"
            >
              <span className="cls_009">2.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "364.25px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Are these funds subject to trust conditions?
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "508.18px",
                top: "364.25px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  onChange={(e) =>
                    setSectionA({ ...sectionA, SubjectToTrust: "Yes" })
                  }
                  checked={sectionA.SubjectToTrust === "Yes"}
                  type="radio"
                  className="radio_box_html"
                  name="SubjectToTrust"
                />{" "}
                Yes
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "546.46px",
                top: "364.25px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  type="radio"
                  className="radio_box_html"
                  name="SubjectToTrust"
                  onChange={(e) =>
                    setSectionA({ ...sectionA, SubjectToTrust: "No" })
                  }
                  checked={sectionA.SubjectToTrust === "No"}
                />{" "}
                No
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "380.57px" }}
              className="cls_002 w-75"
            >
              <span className="cls_002">If so, give complete details:</span>
              <textarea
                id="completeDetails"
                value={sectionA.SubjectToTrustDetails}
                name="SubjectToTrustDetails"
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "478.75px" }}
              className="cls_009"
            >
              <span className="cls_009">3.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "478.75px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Attempts to contact Client/Claimant over the past two years
                (state dates and methods involved):
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "129.62px",
                top: "495.07px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Date</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "179.90px",
                top: "495.07px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Method</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "314.57px",
                top: "495.07px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Other Details</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "121.10px",
                top: "502.51px",
              }}
              className="cls_018"
            >
              <span className="cls_018">(mm/dd/yyyy)</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "179.90px",
                top: "502.51px",
              }}
              className="cls_018"
            >
              <span className="cls_018">(Select one of the following)</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.14px", top: "518.35px" }}
              className="cls_002"
            >
              <span className="cls_002">a)</span>
            </div>
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "110.66px",
                  top: "518.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "180.66px",
                  top: "518.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "310.66px",
                  top: "518.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
            </div>
            {/*  */}
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "110.66px",
                  top: "538.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "180.66px",
                  top: "538.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "310.66px",
                  top: "538.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
            </div>
            {/*  */}
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "110.66px",
                  top: "555.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "180.66px",
                  top: "555.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "310.66px",
                  top: "555.98px",
                }}
              >
                <input className="htmlInput htmlInput_s" />
              </div>
            </div>
            <div
              style={{ position: "absolute", left: "90.14px", top: "536.11px" }}
              className="cls_002"
            >
              <span className="cls_002">b)</span>
            </div>
            <div
              style={{ position: "absolute", left: "90.74px", top: "553.99px" }}
              className="cls_002"
            >
              <span className="cls_002">c)</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "571.87px" }}
              className="cls_009"
            >
              <span className="cls_009">4.</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "571.87px" }}
              className="cls_002"
            >
              <span className="cls_002">
                Was there a need to contact the Public Trustee?
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "508.18px",
                top: "571.87px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                {" "}
                <input
                  onChange={(e) =>
                    setSectionA({ ...sectionA, ContactToPublic: "Yes" })
                  }
                  type="radio"
                  checked={sectionA.ContactToPublic === "Yes"}
                  className="radio_box_html"
                  name="ContactToPublic"
                />{" "}
                Yes
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "546.46px",
                top: "571.87px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                <input
                  onChange={(e) =>
                    setSectionA({ ...sectionA, ContactToPublic: "No" })
                  }
                  type="radio"
                  checked={sectionA.ContactToPublic === "No"}
                  className="radio_box_html"
                  name="ContactToPublic"
                />{" "}
                No
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "588.19px" }}
              className="cls_002 w-75"
            >
              <span className="cls_002">
                If yes, state the result of contact:
              </span>
              <textarea
                value={sectionA.ContactToPublicDetails}
                onChange={(e) => handleChangeInput(e)}
                name="ContactToPublicDetails"
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
              className="cls_016"
            >
              <span className="cls_016">December 2015</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_016"
            >
              <span className="cls_016">Page 2 of 3</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.06px",
              }}
              className="cls_016"
            >
              <span className="cls_016"> </span>
              <a href="http://www.lawsociety.ab.ca/">
                www.lawsociety.ab.ca
              </a>{" "}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              "margin-left": "-306px",
              top: "1604px",
              width: "612px",
              height: "792px",
              "border-style": "outset",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", left: "0px", top: "0px" }}>
              <img
                src="9a4325a8-82e8-11ec-a980-0cc47a792c0a_id_9a4325a8-82e8-11ec-a980-0cc47a792c0a_files/background3.jpg"
                width={612}
                height={792}
              />
            </div>
            <div
              style={{ position: "absolute", left: "468.10px", top: "34.56px" }}
              className="cls_016"
            >
              <span className="cls_016">Undisbursable Trust Money</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "39.24px" }}
              className="cls_016"
            >
              <span className="cls_016">Law Society of Alberta</span>
            </div>
            <div
              style={{ position: "absolute", left: "522.58px", top: "43.80px" }}
              className="cls_016"
            >
              <span className="cls_016">Long Form</span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "53.16px" }}
              className="cls_004"
            >
              <span className="cls_004">
                ______________________________________________________________________________________________________________________________
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "81.26px" }}
              className="cls_009"
            >
              <span className="cls_009">5.</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "80.66px",
                top: "81.26px",
                maxWidth: "85%",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                Information useful in confirming validity of client’s claim to
                these funds including the nature of the engagement by the law
                firm:
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "110.58px" }}
              className="cls_002 w-75"
            >
              {/* <span className="cls_002">law firm:</span> */}
              <textarea
                value={sectionA.ValidityClient}
                name="ValidityClient"
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "261.53px" }}
              className="cls_012"
            >
              <span className="cls_012">SECTION E - LAWYER CERTIFICATION</span>
            </div>
            <div
              style={{ position: "absolute", left: "80.18px", top: "288.41px" }}
              className="cls_002"
            >
              <span className="cls_002">I,</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput"
                value={sectionA.certificationName}
                id="certificationName"
                name="certificationName"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: "321.65px",
                top: "288.41px",
              }}
              className="cls_002"
            >
              <span className="cls_002">
                , certify that the foregoing information is complete
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.18px", top: "306.29px" }}
              className="cls_002"
            >
              <span className="cls_002">
                and correct to the best of my knowledge.
              </span>
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "356.69px" }}
              className="cls_011"
            >
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_m"
                id="certificationDate"
                name="Date"
                value={sectionA.Date}
              />
            </div>
            <div
              style={{ position: "absolute", left: "80.66px", top: "376.69px" }}
              className="cls_011"
            >
              <span className="cls_011">Date </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "272.09px",
                top: "355.85px",
              }}
              className="cls_002"
            >
              <span className="cls_002">Signature of Lawyer</span>
              <input
                onChange={(e) => handleChangeInput(e)}
                className="htmlInput htmlInput_m"
                id="certificationSign"
                name="Signature"
                value={sectionA.Signature}
              />
            </div>
            <div
              style={{ position: "absolute", left: "54.00px", top: "660.34px" }}
              className="cls_020"
            >
              <span className="cls_020">
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
              {/* <span className="cls_021">Legal</span> */}
            </div>
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "669.46px" }}
              className="cls_021"
            >
              <span className="cls_021">Profession Act</span>
              <span className="cls_020">
                , the Rules of the Law Society, the Code of Conduct, or a
                resolution of the Benchers and will be accessible to all
                departments of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "678.58px" }}
              className="cls_020"
            >
              <span className="cls_020">
                the Law Society, including the Alberta Lawyers Insurance
                Association. The information may be used or disclosed by the Law
                Society of
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "687.82px" }}
              className="cls_020"
            >
              <span className="cls_020">
                Alberta, now or in the future, for regulatory purposes,
                including Law Society of Alberta investigations and proceedings.
                We may contact you to
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "697.06px" }}
              className="cls_020"
            >
              <span className="cls_020">
                obtain additional information, or to obtain clarification on the
                information you provided. Should you have any questions about
                this, please
              </span>
            </div> */}
            {/* <div
              style={{ position: "absolute", left: "54.00px", top: "706.30px" }}
              className="cls_020"
            >
              <span className="cls_020">
                contact the Privacy Officer at 403-229-4700.
              </span>
            </div> */}
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
              className="cls_016"
            >
              <span className="cls_016">December 2015</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "290.45px",
                top: "736.06px",
              }}
              className="cls_016"
            >
              <span className="cls_016">Page 3 of 3</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "487.54px",
                top: "736.06px",
              }}
              className="cls_016"
            >
              <span className="cls_016"> </span>
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
  //   <ComplianceFormLayout title="Undisbursable Trust Money – Long Form">
  //     <h1>Undisbursable Trust Money – Long Form</h1>
  //     <h4>(For Client Matters Greater than $50 Value)</h4>
  //     <h4>
  //       Under Section 117 (1) of the Legal Profession Act Rule 119.27 (1)(b)
  //     </h4>

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION A – LAW FIRM INFORMATION
  //     </h4>

  //     <InputCustom
  //       label="Law Firm Name"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, LawFirmName: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem"
  //       value={sectionA.LawFirmName}
  //     />

  //     <InputCustom
  //       label="Law Firm Address"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, LawFirmAddress: e.target.value })
  //       }
  //       type="text"
  //       margin="0.9rem 0rem"
  //       value={sectionA.LawFirmAddress}
  //     />

  //     <div className="d-flex">
  //       <InputCustom
  //         label="City"
  //         handleChange={(e) =>
  //           setSectionA({ ...sectionA, City: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.7rem 0.4rem 0"
  //         value={sectionA.City}
  //       />
  //       <InputCustom
  //         label="Province"
  //         handleChange={(e) =>
  //           setSectionA({ ...sectionA, Province: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.7rem 0.4rem 0"
  //         value={sectionA.Province}
  //       />
  //       <InputCustom
  //         label="Postal Code"
  //         handleChange={(e) =>
  //           setSectionA({ ...sectionA, PostalCode: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0rem 0.4rem 0"
  //         value={sectionA.PostalCode}
  //       />
  //     </div>
  //     <InputCustom
  //       label="Law Firm telephone number"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, Country: e.target.value })
  //       }
  //       type="text"
  //       margin="1.3rem 0.4rem 0.7rem 0rem "
  //       value={sectionA.Country}
  //     />

  //     <div className="d-flex">
  //       <InputCustom
  //         label="Law Firm telephone Number"
  //         handleChange={(e) =>
  //           setSectionA({ ...sectionA, LawFirmTelNum: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.4rem 0.7rem 0rem "
  //         value={sectionA.LawFirmTelNum}
  //       />

  //       <InputCustom
  //         label="Fax Number"
  //         handleChange={(e) =>
  //           setSectionA({ ...sectionA, FaxNumber: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.4rem 0.7rem 0rem "
  //         value={sectionA.FaxNumber}
  //       />
  //     </div>

  //     <InputCustom
  //       label="Responsible Lawyer"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, ResponsibleLawyer: e.target.value })
  //       }
  //       type="text"
  //       margin="1rem 0.4rem 0 0rem "
  //       value={sectionA.ResponsibleLawyer}
  //     />

  //     <InputCustom
  //       label="Law Firm Email"
  //       handleChange={(e) =>
  //         setSectionA({ ...sectionA, LawFirmEmail: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionA.LawFirmEmail}
  //     />

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION B – FILE INFORMATION (if shortage is attributed to a client
  //       file)
  //     </h4>

  //     <InputCustom
  //       label="File number and nature of matter"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, fileNumberAndMatter: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionB.fileNumberAndMatter}
  //     />

  //     <InputCustom
  //       label="Name of Client"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, NameOfClient: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionB.NameOfClient}
  //     />

  //     <InputCustom
  //       label="Last Known address"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, LastKnownAddress: e.target.value })
  //       }
  //       type="text"
  //       margin="1rem 0rem "
  //       value={sectionB.LastKnownAddress}
  //     />

  //     <div className="d-flex">
  //       <InputCustom
  //         label="City"
  //         handleChange={(e) =>
  //           setSectionB({ ...sectionB, City: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.7rem 0.4rem 0"
  //         value={sectionB.City}
  //       />
  //       <InputCustom
  //         label="Province"
  //         handleChange={(e) =>
  //           setSectionB({ ...sectionB, Province: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.7rem 0.4rem 0"
  //         value={sectionB.Province}
  //       />
  //       <InputCustom
  //         label="Postal Code"
  //         handleChange={(e) =>
  //           setSectionB({ ...sectionB, PostalCode: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0rem 0.8rem 0"
  //         value={sectionB.PostalCode}
  //       />
  //     </div>
  //     <InputCustom
  //       label="Country"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, Country: e.target.value })
  //       }
  //       type="text"
  //       margin="1rem 0rem 0.8rem 0"
  //       value={sectionB.Country}
  //     />

  //     <InputCustom
  //       label="Last Known Telephone Number"
  //       handleChange={(e) =>
  //         setSectionB({ ...sectionB, LastKnownTelNum: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0rem "
  //       value={sectionB.LastKnownTelNum}
  //     />

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION C – CLAIMANT INFORMATION (complete if different from Section B)
  //     </h4>

  //     <InputCustom
  //       label="Claimant"
  //       handleChange={(e) =>
  //         setSectionC({ ...sectionC, Claimant: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0"
  //       value={sectionC.Claimant}
  //     />

  //     <InputCustom
  //       label="Name of Person/Corporation who is entitled to the funds"
  //       handleChange={(e) =>
  //         setSectionC({ ...sectionC, NameOfPerson: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0"
  //       value={sectionC.NameOfPerson}
  //     />

  //     <InputCustom
  //       label="Last Known Address"
  //       handleChange={(e) =>
  //         setSectionC({ ...sectionC, LastKnownAddress: e.target.value })
  //       }
  //       type="text"
  //       margin="1rem 0.4rem 0.7rem 0"
  //       value={sectionC.LastKnownAddress}
  //     />

  //     <div className="d-flex">
  //       <InputCustom
  //         label="City"
  //         handleChange={(e) =>
  //           setSectionC({ ...sectionC, City: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.4rem 0.7rem 0"
  //         value={sectionC.City}
  //       />

  //       <InputCustom
  //         label="Province"
  //         handleChange={(e) =>
  //           setSectionC({ ...sectionC, Province: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.4rem 0.7rem 0"
  //         value={sectionC.Province}
  //       />

  //       <InputCustom
  //         label="Postal Code"
  //         handleChange={(e) =>
  //           setSectionC({ ...sectionC, PostalCode: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.4rem 0.7rem 0"
  //         value={sectionC.PostalCode}
  //       />
  //     </div>

  //     <InputCustom
  //       label="Country"
  //       handleChange={(e) =>
  //         setSectionC({ ...sectionC, Country: e.target.value })
  //       }
  //       type="text"
  //       margin="1.3rem 0.4rem 1rem 0"
  //       value={sectionC.Country}
  //     />

  //     <InputCustom
  //       label="Last Known Telephone Number"
  //       handleChange={(e) =>
  //         setSectionC({ ...sectionC, LastKnownTelNum: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0"
  //       value={sectionC.LastKnownTelNum}
  //     />

  //     <InputCustom
  //       label="If Corporation, current status with
  //       Corporate Registry"
  //       handleChange={(e) =>
  //         setSectionC({ ...sectionC, CorporationCurrentStatus: e.target.value })
  //       }
  //       type="text"
  //       margin="1.8rem 0"
  //       value={sectionC.CorporationCurrentStatus}
  //     />

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION D – FINANCIAL DETAILS AND ATTEMPTS TO RETURN THE FUNDS
  //     </h4>

  //     <div className="d-flex">
  //       <InputCustom
  //         label="Amount and date funds received by the law firm"
  //         handleChange={(e) =>
  //           setSectionD({ ...sectionD, DollarAmountAndDate: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.4rem 0.7rem 0"
  //         value={sectionD.DollarAmountAndDate}
  //       />

  //       <InputCustom
  //         label="Received"
  //         handleChange={(e) =>
  //           setSectionD({ ...sectionD, Received: e.target.value })
  //         }
  //         type="text"
  //         margin="1rem 0.4rem 0.7rem 0"
  //         value={sectionD.Received}
  //       />
  //     </div>

  //     <div className="heading-5 d-flex justify-content-between my-3">
  //       <span>Are these funds subject to trust conditions?</span>
  //       <div className="d-flex align-items-center">
  //         <input type="radio" name="subjectTrust" className="radio_box" />
  //         Yes <span className="mr-1"></span>
  //         <input type="radio" name="subjectTrust" className="radio_box " />
  //         No
  //       </div>
  //     </div>

  //     <div className="heading-5">If so, give complete details:</div>

  //     <textarea
  //       value={sectionD.SubjectToTrustDetails}
  //       name="subjectTrust"
  //       cols="15"
  //       rows="7"
  //     ></textarea>

  //     <div className="heading-normal">
  //       Attempts to contact Client/Claimant over the past two years (state dates
  //       and methods involved):
  //     </div>

  //     <table>
  //       <thead>
  //         <tr>
  //           <td>Date </td>
  //           <td>Method</td>
  //           <td>Other Details</td>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <td>fakdjls</td>
  //           <td>
  //             <Dropdown
  //               className="my-4 heading-5"
  //               options={method}
  //               onChange={(e) => {
  //                 // console.log("e", e);
  //                 // const sectionCDup = sectionC;
  //                 // sectionCDup.details[0].reason = e;
  //                 // setSectionC(sectionCDup);
  //               }}
  //               value={sectionD.details[0].Method}
  //             ></Dropdown>
  //           </td>
  //           <td>aa</td>
  //         </tr>
  //       </tbody>
  //     </table>

  //     <h4 className="fw-bold section_separator py-3 px-2">
  //       SECTION E – LAWYER CERTIFICATION
  //     </h4>

  //     <Signature
  //       SignatureOf="Signature of Lawyer"
  //       sectionD={sectionE}
  //       setSectionD={setSectionE}
  //     />
  //   </ComplianceFormLayout>
  // );
};

export default UndisbursableTrustMoney;
