import React from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
 
  } from "reactstrap";
import checkIcon2 from "../../images/confirmIcon.png"

  


const NotificationCard = (props) => {
    return(
        <>
        <Modal isOpen>
            <ModalBody>
    <ModalHeader className="text-secondary">{props.systemNotice ? <span className="badge badge-danger">System Notice!</span> : null}</ModalHeader>
    {props.checkIcon ? <div className="row justify-content-center">
              <img src={checkIcon2} style={{width:"50px"}}/>
              </div>:null}

                    <h3 className="text-center sofia">{props.message}</h3>
                </ModalBody>
                        <ModalFooter>
                                {props.okBtn ? <button className="btn btn-outline-primary" onClick={props.closeCard}>
                                    OK
                                </button> : null}
                                {props.addMoreBtn ? <Button className="ok-btn" color={"success"} onClick={props.confirm}>
                                    Add More
                                </Button> : null}
                                {props.okBtnDanger ? <button className="btn btn-outline-danger" onClick={props.closeCard}>
                                    Close
                                </button> : null}
                                {props.confirmBtn ? <button className="btn btn-outline-primary" onClick={props.confirm}>
                                    Confirm
                                </button> : null}
                                {props.closeBtn ? <button className="btn btn-outline-danger" onClick={props.closeCard}>
                                    Cancel
                                </button>:null}
                               
                        </ModalFooter>
                </Modal>
        </>
    )
}
export default NotificationCard;