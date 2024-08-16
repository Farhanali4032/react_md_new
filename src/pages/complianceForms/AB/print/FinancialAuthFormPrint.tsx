import React, { useEffect, useRef, useState, forwardRef } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { companyInfoAction } from "../../../../actions/companyActions";
import { useHistory } from "react-router";
import {
  fetchFormDetails,
  fetchLawyerResponsible,
  getUserSID,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
import { Task } from "../../../../components/Tasks/Task";

type Props = {
  taskData: Task;
};

const FinacialAuthFormPrint = forwardRef(({ taskData }: Props, ref) => {
  const dispatch = useDispatch();
  const { companyInfo } = useSelector((state) => state.companyInformation);
  const history = useHistory();
  const taskState = taskData;
  const [taskStatus, setTaskStatus] = useState(taskState);
  const handleInputChange = (e) => {
    setSectionA({ ...sectionA, [e.target.name]: e.target.value });
  };

  const saveDocument = () => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };
  const [sectionA, setSectionA] = useState({
    nameOfFirm: "",
    nameOfLawFirm: "",
    signature: "",
    currentDate: "",
  });

  useEffect(() => {
    dispatch(companyInfoAction());
  }, []);

  useEffect(async () => {
    const { formDetails, isFormFilled } = await fetchFormDetails(taskState.id);

    const lawyerInformation = await fetchLawyerResponsible(
      getUserSID(),
      taskState.task_account
    );

    if (isFormFilled) {
      setSectionA({
        ...formDetails,
      });
    } else if (lawyerInformation) {
      setSectionA({
        ...sectionA,
        LawyerResponsibleForFile: lawyerInformation.responsible_attorney_name,
      });
    }
  }, []);

  return (
    <Container ref={ref}>
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '\n  span.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(146,146,146);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  div.cls_004{font-family:"Gill Sans MT Bold",serif;font-size:8.1px;color:rgb(138,34,70);font-weight:bold;font-style:normal;text-decoration: none}\n  span.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_005{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_002{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_007{font-family:Arial,serif;font-size:6.0px;color:rgb(224,224,224);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_007{font-family:Arial,serif;font-size:6.0px;color:rgb(224,224,224);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_008{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_008{font-family:Arial,serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_010{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n  span.cls_011{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  div.cls_011{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:italic;text-decoration: none}\n  span.cls_012{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  div.cls_012{font-family:"Gill Sans MT",serif;font-size:8.1px;color:rgb(53,55,53);font-weight:normal;font-style:normal;text-decoration: none}\n  ',
          }}
        />
        <div
          style={{
            display: "inline",
            height: "auto",
            overflowY: "visible",
            overflowX: "visible",
            background: "white",
            position: "static",
            borderStyle: "outset",
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
            style={{
              position: "absolute",
              left: "54.00px",
              top: "82.60px",
              width: "90%",
              height: "2px",
              backgroundColor: "black",
            }}
          ></div>
          {/* <div
            style={{ position: "absolute", left: "54.00px", top: "72.60px" }}
            className="cls_004"
          >
            <span className="cls_004">
              ______________________________________________________________________________________________________________________________
            </span>
          </div> */}
          <div
            style={{ position: "absolute", left: "54.00px", top: "94.94px" }}
            className="cls_005"
          >
            <span className="cls_005">
              Financial Institution Authorization Release
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "151.46px" }}
            className="cls_002"
          >
            <span className="cls_002">
              I authorize the Law Society of Alberta (“LSA”) to obtain bank
              account records and information regarding
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              left: "54.00px",
              top: "180px",
              backgroundColor: "black",
              height: "1px",
              width: "90%",
            }}
          ></div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "185.78px" }}
            className="cls_007"
          >
            <span className="cls_007">({sectionA.nameOfFirm})</span>
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "198.50px" }}
            className="cls_002"
          >
            <span className="cls_002">
              directly from my Financial Institution when the LSA conducts an
              examination, review, audit or investigation in accordance with the
              Rules of the Law Society of Alberta, as amended from time to time
              (the “Rules”).
            </span>
          </div>
          {/* <div
            style={{ position: "absolute", left: "54.00px", top: "208.82px" }}
            className="cls_002"
          >
            <span className="cls_002">the </span>
            <span className="cls_008">Rules of the Law Society of Alberta</span>
            <span className="cls_002">
              , as amended from time to time (the “Rules”).
            </span>
          </div> */}
          <div
            style={{ position: "absolute", left: "54.00px", top: "241.58px" }}
            className="cls_002"
          >
            <span className="cls_002">
              I authorize my Financial Institution to release such bank account
              records and information to the LSA as and when requested by the
              LSA.
            </span>
          </div>
          {/* <div
            style={{ position: "absolute", left: "54.00px", top: "251.93px" }}
            className="cls_002"
          >
            <span className="cls_002">by the LSA.</span>
          </div> */}
          <div
            style={{ position: "absolute", left: "54.00px", top: "301.01px" }}
            className="cls_002"
          >
            <span className="cls_002">Name:</span>
            <input
              className="htmlInput"
              id="nameOfFirm"
              name="nameOfFirm"
              value={sectionA.nameOfFirm}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "318.89px" }}
            className="cls_002"
          >
            <span className="cls_002">Name of Law Firm:</span>
            <input
              className="htmlInput"
              id="nameOfLawFirm"
              name="nameOfLawFirm"
              value={sectionA.nameOfLawFirm}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "353.09px" }}
            className="cls_006"
          >
            {/* <span className="cls_006">Date</span>{" "} */}
            <input
              id="currentDate"
              type="date"
              name="currentDate"
              className="htmlInput"
              value={sectionA.currentDate}
              onChange={(e) => handleInputChange(e)}
            />{" "}
          </div>
          <div
            style={{ position: "absolute", left: "104.00px", top: "373.09px" }}
            className="cls_006"
          >
            <span className="cls_006">Date</span>
          </div>
          <div
            style={{ position: "absolute", left: "239.45px", top: "353.09px" }}
            className="cls_002"
          >
            {/* <span className="cls_002">Signature</span> */}
            <input
              type="text"
              id="signature"
              name="signature"
              className="htmlInput"
              value={sectionA.signature}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{ position: "absolute", left: "289.45px", top: "373.09px" }}
            className="cls_002"
          >
            <span className="cls_002">Signature</span>
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "656.86px" }}
            className="cls_010"
          >
            <span className="cls_010">
              The information provided in this form will be used by the Law
              Society of Alberta for one or more purposes contemplated by the{" "}
            </span>
            <span className="cls_011">Legal</span>
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "665.98px" }}
            className="cls_011"
          >
            <span className="cls_011">Profession Act</span>
            <span className="cls_010">
              , the Rules of the Law Society, the Code of Conduct, or a
              resolution of the Benchers and will be accessible to all
              departments of
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "675.22px" }}
            className="cls_010"
          >
            <span className="cls_010">
              the Law Society, including the Alberta Lawyers Insurance
              Association. The information may be used or disclosed by the Law
              Society of
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "684.46px" }}
            className="cls_010"
          >
            <span className="cls_010">
              Alberta, now or in the future, for regulatory purposes, including
              Law Society of Alberta investigations and proceedings. We may
              contact you to
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "693.58px" }}
            className="cls_010"
          >
            <span className="cls_010">
              obtain additional information, or to obtain clarification on the
              information you provided. Should you have any questions about
              this, please
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "54.00px", top: "702.94px" }}
            className="cls_010"
          >
            <span className="cls_010">
              contact the Privacy Officer at 403-229-4700.
            </span>
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
            className="cls_012"
          >
            <span className="cls_012">February 2019</span>
          </div>
          <div
            style={{ position: "absolute", left: "290.45px", top: "736.06px" }}
            className="cls_012"
          >
            <span className="cls_012">Page 1 of 1</span>
          </div>
          <div
            style={{ position: "absolute", left: "487.54px", top: "736.06px" }}
            className="cls_012"
          >
            <span className="cls_012"> </span>
            <a href="http://www.lawsociety.ab.ca/">www.lawsociety.ab.ca</a>{" "}
          </div>
        </div>
      </div>
    </Container>
  );

  //   return (
  //     <ComplianceFormLayout title="Financial Institution Authorization Release Form">
  //       <h1>Financial Institution Authorization Release Form</h1>

  //       <div className="heading-5 my-4">
  //         I authorize the Law Society of Alberta (“LSA”) to obtain bank account
  //         records and information regarding
  //       </div>

  //       <InputCustom
  //         label="Name of the Firm"
  //         handleChange={(e) =>
  //           setSectionA({
  //             ...sectionA,
  //             nameOfFirm: e.target.value,
  //           })
  //         }
  //         type="text"
  //         margin="1.8rem 0rem"
  //         value={sectionA.nameOfFirm}
  //       />

  //       <div className="heading-5 my-4">
  //         directly from my Financial Institution when the LSA conducts an
  //         examination, review, audit or investigation in accordance with the Rules
  //         of the Law Society of Alberta, as amended from time to time (the
  //         “Rules”).
  //       </div>

  //       <div className="heading-5 my-4">
  //         I authorize my Financial Institution to release such bank account
  //         records and information to the LSA as and when requested by the LSA.
  //       </div>

  //       <InputCustom
  //         label="Name"
  //         handleChange={(e) =>
  //           setSectionA({
  //             ...sectionA,
  //             name: e.target.value,
  //           })
  //         }
  //         type="text"
  //         margin="1.8rem 0rem"
  //         value={sectionA.name}
  //       />
  //       <InputCustom
  //         label="Name of Law Firm"
  //         handleChange={(e) =>
  //           setSectionA({
  //             ...sectionA,
  //             nameOfLawFirm: e.target.value,
  //           })
  //         }
  //         type="text"
  //         margin="2.2rem 0rem"
  //         value={sectionA.nameOfLawFirm}
  //       />
  //       <InputCustom
  //         handleChange={(e) =>
  //           setSectionA({
  //             ...sectionA,
  //             date: e.target.value,
  //           })
  //         }
  //         type="date"
  //         margin="2.2rem 0rem"
  //         value={sectionA.date}
  //       />
  //       <InputCustom
  //         label="Signature"
  //         handleChange={(e) =>
  //           setSectionA({
  //             ...sectionA,
  //             Signature: e.target.value,
  //           })
  //         }
  //         type="text"
  //         margin="2.2rem 0rem"
  //         value={sectionA.Signature}
  //       />
  //     </ComplianceFormLayout>
  //   );
  // };
});
export default FinacialAuthFormPrint;
