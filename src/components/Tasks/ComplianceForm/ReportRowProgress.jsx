import {
  getColorFromPercentage,
} from "../../../utils/helpers";
import { Link } from "react-router-dom";
import { determineStep, nameOfChecklist } from "../../../utils/helpers";
import { momentFunction } from "../../../utils/moment";
const ReportRowProgress = ({ data, formsDataWithProgress }) => {

  let { isComplianceForm, task_type
    , task_month, task_status, id,pdf_url,
    task_account, task_due_date, report_url, task_type_account, task_preparer_signoff, task_approverer_signoff
  } = data;


  console.log('checkDate', data)

  const getProgress = (preparerSignoff, approvererSignoff) => {


    const progress = (Number(preparerSignoff) + Number(approvererSignoff)) * 50;
    return `${progress}%`;
  };




  return (
    <>
      <tr>
        <td style={{ cursor: "pointer" }}>
          <Link
            style={{ listStyle: "none", color: "black", textDecoration: "none" }}
            to={{
              pathname: isComplianceForm === 1 ? `/compliance/form` : `/tasks/form`,
              state: data, search: `step=${determineStep(task_type)}&form=1`,
            }}>
            {nameOfChecklist(task_type)}
          </Link>
        </td>
        <td>{task_month}</td>

        <td>
          <span>
            <div className="progressBar">
              <div className="inner " style={{ minWidth: '143px' }}>
                <span
                  style={{
                    width: getProgress(task_preparer_signoff, task_approverer_signoff),
                    backgroundColor:
                      getColorFromPercentage(
                      getProgress(task_preparer_signoff, task_approverer_signoff),
                      true)
                  }}
                >
                </span>

              </div>

              {
                getProgress(task_preparer_signoff, task_approverer_signoff)

              }

            </div>
          </span>
        </td>

        <td>{task_type_account}</td>

        <td>  {momentFunction.formatDate(task_due_date, "DD-MM-YYYY")}   </td>
        <td>
          <span
            className={task_status === "INPROGRESS" ? "blueColor" : "greenColor"} >
            {task_status === "INPROGRESS" ? "IN PROGRESS" : task_status === "DONE"
              ? "COMPLETED" : task_status}
          </span>
        </td>

    
        {/* <td>
  {pdf_url 
    ? <a href="#" onClick={(e) => {
        e.preventDefault();
        const printWindow = window.open(pdf_url, '_blank');
        printWindow.onload = function() {
          printWindow.print();
        }
      }}>
        <img src="https://www.istockphoto.com/vector/pdf-download-vector-icon-gm1263032734-369640035" alt="PDF" />
      </a>
    : 'N/A'
  }
</td> */}

<td className="actions">
  {pdf_url ? (
    <a target="_blank" href={pdf_url} download >
      <button className="redColor">
        <i className="fa-solid fa-file-pdf"></i> PDF
      </button>
    </a>
  ) : (
    "Not approved"
  )}
</td>

      </tr>

    </>
  )
}

export default ReportRowProgress