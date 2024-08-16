import React from 'react'
import {
    Accordion,
    Button,
    Modal,
    Container,
    Row,
    Col,
    Pagination as PaginationBStrap,
} from "react-bootstrap";
import Complience_Accordion from "../../../assets/images/Complience_Accordion.svg"
import ReportRowProgress from './ReportRowProgress';
import Noreportpage from '../../../pages/Noreportpage';
import { getMonthFromDigit } from '../../../utils/helpers';

const ComplianceReport = ({ data }) => {
    
      const [paginationInfo, setPaginationInfo] = React.useState({
        itemsPerPage: 10,
        currentPage: 1,
        paginatedReports: [],
       });

      const handleSetPagination = (data, updatedPagination) => {
        const indexOfLastReport =
          updatedPagination.currentPage * paginationInfo.itemsPerPage;
        const indexOfFirstReport = indexOfLastReport - paginationInfo.itemsPerPage;
        const currentReports = data.slice(indexOfFirstReport, indexOfLastReport);
    
        setPaginationInfo({
          ...updatedPagination,
          paginatedReports: currentReports,
        });
       };

      const headings = [
        "Compliance form",
        "Month",
        "Progress",
        "Account",
        "Due-Date",
        "Status",
        "Download"
       ];

    return (
        <>

            <Accordion defaultActiveKey="0">
                {
                    data?.reportPeriod.length !== 0 && [...data.reportPeriod, "All Tasks"]?.map((element, index) => {
                        return <Accordion.Item eventKey={index}>
                            <Accordion.Header
                            onClick={() =>
                                setPaginationInfo({
                                  ...paginationInfo,
                                  currentPage: 1,
                                  paginatedReports: [],
                                })
                              }
                            >
                                <img src={Complience_Accordion} alt='month_image' className='pe-2' />
                                {element}
                                <span className="count">
                                    {
                                         element === "All Tasks" ?
                                         data?.complianceFormData?.data?.length :
                                         data?.complianceFormData?.data?.filter((task) => {
                                            return task.task_month === element;
                                          })?.length
                                    }

                                
                                </span>

                            </Accordion.Header>

                            <Accordion.Body>



                            {element === "All Tasks" ||
        data?.complianceFormData.data
        ?.filter((task) => {
          return task.task_month === element;
        }).length >
         0 ? (
        
          <div className="tableOuter">
                                    <table className="table customGrid">
                                        <thead>
                                            <tr>
                                                {headings.map((e, key) => {
                                                    return <th key={key}>{e}</th>;
                                                })}
                                            </tr>
                                        </thead>

                      <tbody>
                      {element === "All Tasks" ? paginationInfo.paginatedReports.length
                          ? paginationInfo.paginatedReports.map((element, index) => (
                            < ReportRowProgress data={element} formsDataWithProgress={data?.formsDataWithProgress}/>
                            ))
                          : data?.complianceFormData.data
                              .slice(0, 10)
                              .map((element, index) => (
                                < ReportRowProgress data={element} formsDataWithProgress={data?.formsDataWithProgress}/>

                              ))
                        : paginationInfo.paginatedReports.length
                        ? paginationInfo.paginatedReports ?.filter((task) => {
                            return task.task_month === element;
                          }).map((element, index) => (
                            < ReportRowProgress data={element} formsDataWithProgress={data?.formsDataWithProgress}/>

                          ))
                        : data?.complianceFormData.data
                            ?.filter((task) => {
                              return task.task_month === element;
                            })
                            .slice(0, 10)
                            .map((element, index) => (
                              <>
                             < ReportRowProgress data={element} formsDataWithProgress={data?.formsDataWithProgress}/>

                              </>
                            ))}
                      {element === "All Tasks"
                        ? PaginationHelper(
                            data?.complianceFormData.data,
                            paginationInfo,
                            handleSetPagination
                          )
                        : PaginationHelper(
                          data?.complianceFormData.data?.filter((task) => {
                              return task.task_month === element;
                            }),
                            paginationInfo,
                            handleSetPagination
                          )}
                    </tbody>


                                    </table>
                                </div>
        
        )
        :
        ( <Noreportpage repeatPeriod={false}/>)}

                              

                            </Accordion.Body>

                        </Accordion.Item>
                    })

                }

            </Accordion>
        </>
    )

    
}


const PaginationHelper = (data, paginationInfo, handleSetPagination) => {


  const totalPages = Math.ceil(data.length / 10);

  
    const handlePaginationClick = async (indexNumber) => {
      handleSetPagination(data, {
        ...paginationInfo,
        currentPage: indexNumber,
      });
    };
  
    const handlePreviousClick = async () => {
      if (paginationInfo.currentPage > 1) {
        await handlePaginationClick(paginationInfo.currentPage - 1);
      }
    };
  
    const handleNextClick = async () => {
      if (paginationInfo.currentPage < totalPages) {
        await handlePaginationClick(paginationInfo.currentPage + 1);
      }
    };
  
    return (
      <tr>
        <td colSpan={5}>
          <Container>
            <Row>
              <Col md={4} className="mx-auto">
                <PaginationBStrap className="justify-content-center mt-3">
                  <PaginationBStrap.Prev onClick={handlePreviousClick} />
                 
                  {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((i) => (
                  <>
                    <PaginationBStrap.Item
                      onClick={() => handlePaginationClick(i)}
                      key={i}
                      active={i === paginationInfo.currentPage}
                    >
                      {i}
                    </PaginationBStrap.Item>
                  </>
                ))}

                  <PaginationBStrap.Next onClick={handleNextClick} />
                </PaginationBStrap>
              </Col>
            </Row>
          </Container>
        </td>
      </tr>
    );
  };

export default ComplianceReport