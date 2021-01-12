import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Fade } from "reactstrap";
import _ from "lodash";
import { postData, editData, fetchData } from "../../../utils/crud";
import { codeGreen } from "../../Barn";
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner";
import logobg from "../../../images/smalllogo.png"


class ViewLeaveRequest extends Component {
  state = {
    leaveInfo: this.props.location.state.data,
    staffRoleId: JSON.parse(localStorage.getItem("DTO")),
    payLoad: JSON.parse(localStorage.getItem("userData")),

    // confirmCard: true,
  };

  leaveAction = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    let actOnLeave = {
    //   leaveResponseId: this.state.leaveInfo.leaveResponseId,
      leaveRequestId: this.state.leaveInfo.leaveRequestId,
      remarks: this.state.comments,
    };
  

    editData(
      `/LeaveRequestManagement/LeaveAction?roleId=${this.state.payLoad.roleId}`,
      actOnLeave,
      (data) => {
        console.log(data);
        if (data.status == codeGreen) {
          this.setState({
            notificationCard: true,
            loading: false,
          });
        } else {
          alert("Error Submitting Request");
          this.setState({ loading: false });
        }
      }
    );
  };

  declineLeaveRequest = (e) => {
    e.preventDefault();
    this.setState({ loading: true, 
      confirmCard:false

    
    });

    
    let declinePayload = {
      leaveRequestId: this.state.leaveInfo.leaveRequestId,
      remarks: this.state.comments
    }

    editData(`/LeaveRequestManagement/DeclineRequest?roleId=${this.state.payLoad.roleId}`, declinePayload, data => {
      console.log(data)
      if(data.status == codeGreen){
      this.setState({declineCard:true, loading:false})

      }else{
      this.setState({loading:false})
      alert("Error sending Request")

      }
    })
  }

  closeNotification = () => {
   
      this.setState({
        notificationCard: false,
        declineCard:false,
        confirmCard:false
      });
    
  
  };


 

  componentDidMount() {
    console.log(this.state.leaveInfo, "Leave Obj");

    fetchData(`/LeaveRequestManagement/GetActionComments?leaveRequestId=${this.state.leaveInfo?.leaveRequestId}`, data => {
      console.log(data, "CommentList")
      this.setState({remarkList:data})
    })
    
  }
  render() {
    return (
      <>
        {this.state.loading ? <Spinner msg={"Saving Request.."} /> : null}
        
                {this.state.notificationCard ? <NotificationCard
                message={"Leave Request Was Succesfully Approved!"}
                okBtn={true}
                closeCard={this.closeNotification}
                />: null}

            {this.state.declineCard ? <NotificationCard
                message={"The Selected Staff has been denied Leave Approval by you!"}
                okBtn={true}
                closeCard={this.closeNotification}
                />: null}


              {this.state.confirmCard ? <NotificationCard
                message={"Are you sure of this action?"}
               confirmBtn={true}
               confirm={(e) => {this.declineLeaveRequest(e)}}
               closeBtn={true}
                closeCard={this.closeNotification}
                />: null}
            {/* <NotificationCard message={"This Leave Request has previously been approved by you."}/> */}

        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Leave Request{" "}
                  <span className="h3 text-muted">
                    /Staff Leave Request Details &nbsp;{" "}
                  </span>
                </h6>
                <Link
                  to={{ pathname: "/LeaveRequest" }}
                  className="btn btn-outline-primary"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Back"
                >
                  <i className="fa fa-arrow-circle-left fa-2x" />
                </Link>
              </div>
              <div className="col-lg-6 col-5 text-right"></div>
            </div>

            <div className="container-fluid mt--6">
              <div
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-lg"
                  style={{ marginTop: "80px" }}
                >
                  <div className="modal-content" style={{borderLeft:"4px solid darkorange"}}>
                    <div className="modal-header border-bottom" style={{textAlign:"center"}}>
                      <h2 className="mb-0"  id="exampleModalScrollableTitle" style={{textAlign:"center", width:"100%"}}>
                      <div className="col-12 text-center">
                        <img
                          src={logobg}
                          style={{ width:"50px" }}
                          
                        />
                      </div>
                       <b>FEDERAL UNIVERSITY OF TECHNOLOGY AKURE</b> 
                     
                      </h2>

                     
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <p
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              The Human Resource Manager,
                            </p>
                            <p
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Nnamdi Azikiwe University,
                            </p>
                            <p
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              {this.state.leaveInfo.enteredDate.substring(0, 10)}
                            </p>
                           <br/>
                           <br/>
                           <p
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Dear Sir/Ma,
                            </p>
                          </div>
                        </div>

                       

                        
                        <div className="col-md-12">
                          <div className="form-group">
                            <h3
                            style={{textAlign:"center"}}
                             
                              
                            >
                              <b>
                              APPLICATION FOR {_.upperCase(this.state.leaveInfo.leaveType)}
                              </b>
                            </h3>
                          
                          </div>
                        </div>

                  

                        <div className="col-md-12">
                          <div className="form-group">
                            <p
                            style={{lineHeight:"30px", textAlign:"center"}}
                            
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              I,  <b>{_.upperCase(this.state.leaveInfo.staffName)},</b> with Staff Number <b>{this.state.leaveInfo.staffNumber}, </b> from the department of <b>{_.upperCase(this.state.leaveInfo.departmentName)},</b> do hereby make a humble and an official leave request for due processing. It is a kind request that I be permitted to go on <b>{_.upperCase(this.state.leaveInfo.leaveType)}</b> from <b>{this.state.leaveInfo.start.substring(0,10)}</b> to <b>{this.state.leaveInfo.end.substring(0,10)}.</b>
                              <br/>
                              Reason: {this.state.leaveInfo.reason}
                            </p>
                           <br/>
                           <br/>
                           <h2>Leave Action Progression</h2>
                           <table className="table table-striped">
                             <th>Desk</th>
                             <th>Remarks</th>
                             <th>Action</th>
                        {this.state.remarkList && this.state.remarkList.map((comms, i) => (
                          <tr>
                            <td>{comms.roleName} </td>

                        <td>{comms.comments}</td>
                        <td>{comms.action == true ? "Approved" : null}</td>
                        </tr>
                      ))}
                      </table>
                      <br/>

                          </div>
                        </div>
                       

                      </div>

                     
                      {<div>

                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={(e) => {
                          this.leaveAction(e);
                        }}
                      >
                        Approve Request &nbsp; <i className="fa fa-check" />
                      </button>
                      <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-danger"
                        onClick={() => {this.setState({confirmCard:true})}}
                      >
                        Decline Request &nbsp; <i className="fa fa-ban" />
                      </button>
                    </div>}


                  </div>
                </div>
              </div>
              </div>
              <div
                className="modal fade delete-level-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header border-bottom">
                      <h2 className="mb-0" id="exampleModalScrollableTitle">
                        Delete Staff?
                      </h2>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div>
                        <div>
                          <p>
                            Are you sure you want to delete this record? All
                            items related to it will be affected
                          </p>
                          <button className="btn btn-outline-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        
        
{/* Untouched */}
        
          {/* <div className="container-fluid mt--6">
              <div
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-lg"
                  style={{ marginTop: "80px" }}
                >
                  <div className="modal-content">
                    <div className="modal-header border-bottom">
                      <h2 className="mb-0" id="exampleModalScrollableTitle">
                        Staff Name: &nbsp;{" "}
                        <b>{_.upperCase(this.state.leaveInfo.staffName)}</b>
                      </h2>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Staff Number
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="staffNumber"
                              disabled
                              value={_.upperCase(
                                this.state.leaveInfo.staffNumber
                              )}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Rank
                            </label>
                            <input
                              className="form-control"
                              disabled
                              type="text"
                              name="rank"
                            />
                          </div>
                        </div>


                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Leave Type
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="leave"
                              disabled
                              value={_.upperCase(
                                this.state.leaveInfo.leaveType
                              )}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Proposed Start Date
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              name="startDate"
                              disabled
                              value={this.state.leaveInfo.start.substring(
                                0,
                                10
                              )}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Proposed End Date
                            </label>
                            <input
                              className="form-control"
                              type="date"
                              name="endDate"
                              disabled
                              // value={this.state.leaveRequest.staff ? this.state.leaveRequest.endDate.substring(0,10) : ''} disabled
                              defaultValue={this.state.leaveInfo.end.substring(
                                0,
                                10
                              )}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Reason
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="reason"
                              disabled
                              value={_.upperCase(this.state.leaveInfo.reason)}

                              // value={this.state.leaveRequest.staff ? this.state.leaveRequest.reason : ''} disabled
                            />
                          </div>
                        </div>


                        
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Comments From Previous Desk of Action
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="reason"
                              disabled
                              value={_.upperCase(this.state.leaveInfo.comment)}

                              // value={this.state.leaveRequest.staff ? this.state.leaveRequest.reason : ''} disabled
                            />
                          </div>
                        </div>

                  

                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="form-control-label"
                            >
                              Remarks
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="remarks"
                       
                              onChange={(e) => {
                                this.setState({ comments: e.target.value });
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {<div>

                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={(e) => {
                          this.leaveAction(e);
                        }}
                      >
                        Approve Request &nbsp; <i className="fa fa-check" />
                      </button>
                      <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-danger"
                        onClick={() => {this.setState({confirmCard:true})}}
                      >
                        Decline Request &nbsp; <i className="fa fa-ban" />
                      </button>
                    </div>}


                  </div>
                </div>
              </div>
              </div>
              <div
                className="modal fade delete-level-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header border-bottom">
                      <h2 className="mb-0" id="exampleModalScrollableTitle">
                        Delete Staff?
                      </h2>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div>
                        <div>
                          <p>
                            Are you sure you want to delete this record? All
                            items related to it will be affected
                          </p>
                          <button className="btn btn-outline-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
         */}
        </Fade>
      </>
    );
  }
}

export default ViewLeaveRequest;
