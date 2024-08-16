import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NetFamilyPropertyStatement13B from "../../components/FormPages/forms/NetFamilyPropertyStatement13B";
import CertificateOfFinancialDisclosure13A from "../../components/FormPages/forms/CertificateOfFinancialDisclosure13A";
import FinancialStatement131 from "../../components/FormPages/forms/FinancialStatement131";
import FinancialStatement13 from "../../components/FormPages/forms/FinancialStatement13";
import ApplicationDivorce8A from "../../components/FormPages/forms/ApplicationDivorce8A";
import Layout from "../../components/LayoutComponents/Layout";
import CustomCheckbox from "../../components/Matters/Form/CustomCheckbox";
import { Link, useLocation } from "react-router-dom";
import { Margin, usePDF } from "react-to-pdf";
import { selectSaveFileData, selectSaveFileDataLoading } from "../../utils/Apis/matters/saveFileData/saveFileDataSelector";
import { saveFileData, saveFileDataReset } from "../../utils/Apis/matters/saveFileData/saveFileDataActions";
import toast from "react-hot-toast";
import { getFileData, getFileDataReset } from "../../utils/Apis/matters/getFileData/getFileDataActions";
import { selectGetFileData } from "../../utils/Apis/matters/getFileData/getFileDataSelector";
import FORM10 from "../../components/FormPages/forms/Form10";
import ONTFORM14A from "../../components/FormPages/forms/ontario/ONTFORM14A";
import ONTFORM15B from "../../components/FormPages/forms/ontario/ONTFORM15B";
import ONTFORM15 from "../../components/FormPages/forms/ontario/ONTFORM15";
import ONTFORM15C from "../../components/FormPages/forms/ontario/ONTFORM15C";
import html2pdf from 'html2pdf.js';
import ONTFORM6 from "../../components/FormPages/forms/ontario/ONTFORM6";
import ONTFORM23 from "../../components/FormPages/forms/ontario/ONTFORM23";
import ONTFORM10A from "../../components/FormPages/forms/ontario/ONTFORM10A";
import ONTCOMPONENTS from "../../components/FormPages/forms/ontario/ONTCOMPONENTS";
import ONTFORM25A from "../../components/FormPages/forms/ontario/ONTFORM25A";
import ONTFORM6B from "../../components/FormPages/forms/ontario/ONTFORM6B";
import ONTFORM8 from "../../components/FormPages/forms/ontario/ONTFORM8";
import ONTFORM17A from "../../components/FormPages/forms/ontario/ONTFORM17A";
import ONTFORM17C from "../../components/FormPages/forms/ontario/ONTFORM17C";
import ONTFORM17E from "../../components/FormPages/forms/ontario/ONTFORM17E";
import ONTFORM36 from "../../components/FormPages/forms/ontario/ONTFORM36";
import ONTFORM26B from "../../components/FormPages/forms/ontario/ONTFORM26B";
import ONTFORM25 from "../../components/FormPages/forms/ontario/ONTFORM25";
import ONTFORM14B from "../../components/FormPages/forms/ontario/ONTFORM14B";
import ONTFORM14C from "../../components/FormPages/forms/ontario/ONTFORM14C ";
import ONTFORM14 from "../../components/FormPages/forms/ontario/ONTFORM14";
import GeneralModal from "../../components/Matters/Modals/GeneralModal";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import ONTFORM10 from "../../components/FormPages/forms/ontario/ONTFORM10";
import { selectSingleMatterData } from "../../utils/Apis/matters/getSingleMatter/getSingleMattersSelectors";
import { selectMatterData } from "../../utils/Apis/matters/getMatterData/getMatterDataSelectors";

const FillPdf = ({ currentUserRole }) => {
  const location = useLocation();
  const formData = location.state?.formData;
  
  const { response } = useSelector((state) => state.userProfileInfo);
  const [fileData, setFileData] = useState(null);
  const [matterData, setMatterData] = useState(null);
  
  const [dataCollected, setDataCollected] = useState(false);
  const [courtNumber, setCourtNumber] = useState();
  const dispatch = useDispatch();
  const pdfContentRef = useRef(null); // Use ref instead of getElementById
  const [showAddFolderModal, setShowAddFolderModal] = useState(false)
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleGeneratePdf = () => {
    const fileId = activeForm && activeForm.title ? activeForm.title : 'default';
    // const content = pdfContentRef.current?.innerHTML;
    const content = document.getElementById('pdf-content');
    if (!content) {
      console.error("No content found to generate PDF");
      return;
    }

    const options = {
      margin: [1, 0.1, 1, 0.1],
      filename: `${fileId}.pdf`,
      jsPDF: {
        unit: 'in',
        // format: 'a4',
        putOnlyUsedFonts:true,
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      html2canvas: { scale: 4, useCORS: true, dpi: 192, letterRendering: true },
    };

    html2pdf().from(content).set(options).toPdf().get('pdf').then((pdf) => {
      const totalPages = pdf.internal.getNumberOfPages();
      const pageWidth = pdf.internal.pageSize.width;

      for (let i = 1; i <= totalPages; i++) {
        pdf?.setPage(i);
        pdf?.setFontSize(10);

        if (i > 1) {
          const formNumber = `${activeForm.title}`;
          const pageNumberText = `(Page ${i})`;

          const pageNumberTextWidth = pdf.getStringUnitWidth(pageNumberText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;

          pdf.setDrawColor(0);
          pdf.setLineWidth(0.01);
          pdf.line(0.3, 0.7, pageWidth - 0.3, 0.7);

          const leftMarginSpace = 0.3;

          pdf.text(formNumber, leftMarginSpace, 0.3);
          pdf.text(pageNumberText, (pageWidth - pageNumberTextWidth) / 2, 0.3);

          const boxWidth = 1.5;
          const boxHeight = 0.5;
          const boxX = pageWidth - 0.3 - boxWidth;
          const boxY = 0.1;
          pdf.rect(boxX, boxY, boxWidth, boxHeight);

          const customText = `Court File Number\n${courtNumber}`;
          const customTextLines = customText.split('\n');
          const lineHeight = 0.17; // Adjust the line height if needed

          customTextLines.forEach((line, index) => {
            const customTextWidth = pdf.getStringUnitWidth(line) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
            const textX = boxX + (boxWidth - customTextWidth) / 2;
            const textY = boxY + (index + 1) * lineHeight; // Adjust textY based on line index
            pdf.text(line, textX, textY);
          });
        }

        const footerLeftText = `${activeForm.footer_text}`;
        const footerRightText = `Page ${i} of ${totalPages}`;
        const footerRightTextWidth = pdf.getStringUnitWidth(footerRightText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;

        const footerLeftMarginSpace = 0.3;
        const footerRightMarginSpace = 0.3;

        pdf.text(footerLeftText, footerLeftMarginSpace, pdf.internal.pageSize.height - 0.3);
        pdf.text(footerRightText, pageWidth - footerRightTextWidth - footerRightMarginSpace, pdf.internal.pageSize.height - 0.3);
      }
      const pdfBlob = pdf.output('blob');
      
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);
      setShowAddFolderModal(true)
      setPdfUrl(pdfBlobUrl);
      
      // pdf.save(`${fileId}.pdf`);
    });
  };
  
  const generatePDF = () => {
    const fileId = activeForm && activeForm.title ? activeForm.title : 'default';
    // const content = pdfContentRef.current?.innerHTML;
    const content = document.getElementById('pdf-content');
    if (!content) {
      console.error("No content found to generate PDF");
      return;
    }

    const options = {
      margin: [1, 0.1, 1, 0.1],
      filename: `${fileId}.pdf`,
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      html2canvas: { scale: 1, useCORS: true, dpi: 192, letterRendering: true },
    };

    html2pdf().from(content).set(options).toPdf().get('pdf').then((pdf) => {
      const totalPages = pdf.internal.getNumberOfPages();
      const pageWidth = pdf.internal.pageSize.width;

      for (let i = 1; i <= totalPages; i++) {
        pdf?.setPage(i);
        pdf?.setFontSize(10);

        if (i > 1) {
          const formNumber = `${activeForm.title}`;
          const pageNumberText = `(Page ${i})`;

          const pageNumberTextWidth = pdf.getStringUnitWidth(pageNumberText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;

          pdf.setDrawColor(0);
          pdf.setLineWidth(0.01);
          pdf.line(0.3, 0.7, pageWidth - 0.3, 0.7);

          const leftMarginSpace = 0.3;

          pdf.text(formNumber, leftMarginSpace, 0.3);
          pdf.text(pageNumberText, (pageWidth - pageNumberTextWidth) / 2, 0.3);

          const boxWidth = 1.5;
          const boxHeight = 0.5;
          const boxX = pageWidth - 0.3 - boxWidth;
          const boxY = 0.1;
          pdf.rect(boxX, boxY, boxWidth, boxHeight);

          const customText = `Court File Number\n${courtNumber}`;
          const customTextLines = customText.split('\n');
          const lineHeight = 0.17; // Adjust the line height if needed

          customTextLines.forEach((line, index) => {
            const customTextWidth = pdf.getStringUnitWidth(line) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
            const textX = boxX + (boxWidth - customTextWidth) / 2;
            const textY = boxY + (index + 1) * lineHeight; // Adjust textY based on line index
            pdf.text(line, textX, textY);
          });
        }

        const footerLeftText = `${activeForm.footer_text}`;
        const footerRightText = `Page ${i} of ${totalPages}`;
        const footerRightTextWidth = pdf.getStringUnitWidth(footerRightText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;

        const footerLeftMarginSpace = 0.3;
        const footerRightMarginSpace = 0.3;

        pdf.text(footerLeftText, footerLeftMarginSpace, pdf.internal.pageSize.height - 0.3);
        pdf.text(footerRightText, pageWidth - footerRightTextWidth - footerRightMarginSpace, pdf.internal.pageSize.height - 0.3);
      }

      pdf.save(`${fileId}.pdf`);
    });
  };

  const onFormDataSave = (data) => {
    setFileData(data)
  }

  let selectedForms = useSelector((state) => state.selectedForms);

  if (
    selectedForms === undefined ||
    typeof selectedForms === undefined ||
    selectedForms.length == 0
  ) {
    let serializedCheckedForms = localStorage.getItem("checkedForms");
    selectedForms = JSON.parse(serializedCheckedForms);
  }

  const [forms, setForms] = useState(selectedForms);
  const [activeForm, setActiveForm] = useState(selectedForms[0]);

  const handleCheckboxChange = (formId) => {
    const newForms = forms.map((form) => {
      if (form.id === formId) {
        return { ...form, checked: !form.checked };
      }
      return form;
    });
    setForms(newForms);
  };

  const { toPDF, targetRef } = usePDF({
    method: "open",
    filename: activeForm.title,
    page: { margin: Margin.SMALL },
    format: 'letter',
  });

  const handleDownload = () => {
    toPDF();
  };

  const handleSave = () => {
    let data = {
      matterId: formData.matterNumber,
      active_form: activeForm.id,
      file_id: activeForm.file_id,
      folder_id: activeForm.folder_id,
      doc_id: activeForm.docId,
      data: fileData?.data
    }
    // console.log("🚀 ~ handleSave ~ data:", data.data)
    

    dispatch(saveFileData(data))
  }

  const selectSaveData = useSelector(selectSaveFileData);
  const selectSaveDataLoading = useSelector(selectSaveFileDataLoading);

  useEffect(() => {
    if (selectSaveData) {
      toast.success("Data Successfully Saved",
        {
          position: "top-right",
          style: {
            borderRadius: '10px',
            background: '#FFF',
            color: '#000',
          },
        })
      dispatch(saveFileDataReset())
    }
  }, [selectSaveDataLoading, selectSaveData])

  return (
    <Layout title={`Welcome ${response.first_name} ${response.last_name}`}>
      <div className="fill-information-page panel trans">
        <div className="pBody">
          <div className="row">
            <div className="col-md-9">
              <div className="page-content">
                <div className="head d-flex justify-content-between align-items-center">
                  {activeForm.title}
                  <div className="d-flex justify-content-between align-items-center gap-1">
                    <button className="btn btnPrimary" onClick={generatePDF}>
                      Download
                    </button>
                    <button className="btn btnPrimary" onClick={handleSave}>
                      Save
                    </button>
                    <button className="btn btnPrimary" onClick={handleGeneratePdf}>
                      Preview PDF
                    </button>
                    <button className="btn btnPrimary" onClick={handleDownload}>
                      Open PDF
                    </button>
                  </div>
                </div>
                <div className="body">
                  <div id="pdf-content" ref={pdfContentRef}>
                    {activeForm.id === "FORM_8A" && (
                      <ApplicationDivorce8A targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "FORM_13" && (
                      <FinancialStatement13 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "FORM_13_1" && (
                      <FinancialStatement131 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} />
                    )}
                    {activeForm.id === "FORM_13_A" && (
                      <CertificateOfFinancialDisclosure13A
                        targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber}
                        matterId={formData.matterNumber}
                        onFormDataSave={onFormDataSave}
                      />
                    )}
                    {activeForm.id === "FORM_13_B" && (
                      <NetFamilyPropertyStatement13B targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} />
                    )}
                    {activeForm.id === "ONTFORM6B" && (
                      <ONTFORM6B targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM10" && (
                      <ONTFORM10 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM10A" && (
                      <ONTFORM10A targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM14" && (
                      <ONTFORM14 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData?.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM14A" && (
                      <ONTFORM14A targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData?.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}

                    {activeForm.id === "ONTFORM15" && (
                      <ONTFORM15 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM15B" && (
                      <ONTFORM15B targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM15C" && (
                      <ONTFORM15C targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM6" && (
                      <ONTFORM6 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM23" && (
                      <ONTFORM23 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM25A" && (
                      <ONTFORM25A targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM8" && (
                      <ONTFORM8 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTCOMPONENTS" && (
                      <ONTCOMPONENTS targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM17A" && (
                      <ONTFORM17A targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM17C" && (
                      <ONTFORM17C targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM17E" && (
                      <ONTFORM17E targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}

                    {activeForm.id === "ONTFORM36" && (
                      <ONTFORM36 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM26B" && (
                      <ONTFORM26B targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM25" && (
                      <ONTFORM25 targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}

                    {activeForm.id === "ONTFORM14B" && (
                      <ONTFORM14B targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}
                    {activeForm.id === "ONTFORM14C" && (
                      <ONTFORM14C targetRef={targetRef} setCourtNumber={setCourtNumber} courtNumber={courtNumber} matterId={formData.matterNumber} onFormDataSave={onFormDataSave} savedData={activeForm} />
                    )}




                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="page-sidebar">
                <div className="head">List of Forms</div>
                <div className="body">
                  <div className="content">
                    {forms.map((form, index) => (
                      <div
                        className="form-checkbox"
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          dispatch(getFileDataReset());
                          const newForms = [...forms];
                          newForms[index].checked = !newForms[index].checked;
                          setForms(newForms);
                          setFileData(null);
                          setActiveForm(newForms[index]);
                        }}
                      >
                        <CustomCheckbox
                          label={form.shortTitle}
                          checked={form.checked}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GeneralModal 
        show={showAddFolderModal}
        changeShow={() => setShowAddFolderModal(false)}
        handleClick={() => setShowAddFolderModal(false)}
        heading={`Preview PDF: ${activeForm.title}`}
        size='sm'
        dialogClassName={'matterModal'}
        >
        {pdfUrl && (
        <iframe src={pdfUrl} style={{ width: '100%', height: '500px' }} title="PDF Preview"></iframe>
      )}
      </GeneralModal>
    </Layout>
  );
};

export default FillPdf;

