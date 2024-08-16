import { Modal } from "react-bootstrap";

const GeneralModal = ({
    children,
    heading,
    handleClick,
    show,
    changeShow,
    cancelOption,
    ResetOption,
    size,
    modalSize,
    optionalWidth,
    dialogClassName,
    reset,
    resetAll,
    handleContinue,
    actions,
}) => {

    return (
        <Modal
            show={show}
            keyboard={true}
            onHide={changeShow}
            size={size | "md"}
            dialogClassName={`customModal ${dialogClassName}`}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            rounded="true"
        >
            <Modal.Header closeButton={true} closeVariant={"white"}>
                <Modal.Title id="contained-modal-title-vcenter">{heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {/* <button className="btn btnPrimary blue" onClick={changeShow}>
                    {cancelOption ? cancelOption : "Close"}
                </button>
                <button className="btn btnDefault" onClick={handleContinue}>
                    {cancelOption ? cancelOption : "Save"}
                </button> */}
                {actions ? (
                    actions.map((action, index) => (
                        <button
                            key={index}
                            className={action.class}
                            onClick={action.action}
                        >
                            {action.label}
                        </button>
                    ))
                ) : (
                    <>
                        <button className="btn btnPrimary blue" onClick={changeShow}>
                            {cancelOption ? cancelOption : "Close"}
                        </button>
                        <button className="btn btnDefault" onClick={handleContinue}>
                            {cancelOption ? cancelOption : "Save"}
                        </button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default GeneralModal;
