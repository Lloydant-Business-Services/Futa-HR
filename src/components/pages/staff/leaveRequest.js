import React from "react";
// import { Link, navigateTo, navigate } from "gatsby"
import { fetchData, editData, postData } from "../../../utils/crud";
import {Wave_Three, codeGreen, statusDeclined, notClosed} from "../../Barn"
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner from "../admin/Spinner"


import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Fade,
  Button,
} from "reactstrap";

export default class LeaveRequest extends React.Component {
  state = {
    personDTO: JSON.parse(localStorage.getItem("DTOFULL")),
    payLoad: JSON.parse(localStorage.getItem("userData")),
    payLoad2: JSON.parse(localStorage.getItem("userData")),


    staff: {
      staffNumber: "NAU/",
      person: {
        surname: "",
        firstname: "",
        othername: "",
        birthDay: "",
        email: "",
        address: "",
        phoneNumber: "",
        stateId: 0,
        lgaId: 0,
        maritalStatusId: 0,
        religionId: 1,
        genderId: 0,
        imageUrl: "",
        id: 0,
      },
      rankId: 0,
      departmentId: 0,
      appointmentId: 0,
      unitId: 0,
      staffTypeId: 0,
      categoryId: 0,
      id: 0,
    },
    leaveTypes: [],
    leaveRequests: [],
    leaveRequest: {
      leaveId: 0,
      staffId: 0,
      startDate: null,
      endDate: null,
      reason: "",
      attachmentUrl: "",
      remarks: "",
      id: 0,
    },
  };

  updatePersonItem = (index, value) => {
    const { leaveRequest } = this.state;
    leaveRequest[index] = value;
    this.setState({ ...this.state, leaveRequest });
  };

  loadStaff = () => {
    const id = this.props.user.userId;
    fetchData(`/Staff/${id}`, (data) => {
      const { staff, leaveRequest } = this.state;
      staff.staffNumber = data.staffNumber;
      staff.person.surname = data.person.surname;
      staff.person.firstname = data.person.firstname;
      staff.person.othername = data.person.othername;
      staff.person.birthDay = data.person.birthDay;
      staff.person.email = data.person.email;
      staff.person.address = data.person.address;
      staff.person.phoneNumber = data.person.phoneNumber;
      staff.person.stateId = data.person.stateId;
      staff.person.lgaId = data.person.lgaId;
      staff.person.maritalStatusId = data.person.maritalStatusId;
      staff.person.religionId = data.person.religionId;
      staff.person.genderId = data.person.genderId;
      staff.person.id = data.person.id;
      staff.rankId = data.rankId;
      staff.departmentId = data.departmentId;
      staff.appointmentId = data.appointmentId;
      staff.unitId = data.unitId;
      staff.staffTypeId = data.staffTypeId;
      staff.categoryId = data.categoryId;
      staff.id = data.id;
      if (data.person.imageUrl == "") {
        staff.person.imageUrl = null;
      } else {
        staff.person.imageUrl = data.person.imageUrl;
      }

      leaveRequest.staffId = staff.id;
      this.setState({ ...this.state, staff, leaveRequest });
    });
  };

  loadLeaves = () => {
    fetchData("/LeaveAssignments", (data) => {
      this.setState({ leaveTypes: data });
    });
  };

  loadRequests = () => {
    const id = this.props.user.userId;
    fetchData(`/LeaveRequest/LeaveRequestByStaff/${id}`, (data) => {
      this.setState({ leaveRequests: data });
    });
  };

  getLeavebyRank = () => {
    fetchData(
      `/LeaveType/LeaveTypeRankByRank?RankId=${this.state.personDTO?.rankId}`,
      (data) => {
        this.setState({ uniqueLeaveType: data });
        console.log(data, "Exclusive Leave Type");
      }
    );
  };

  componentDidMount() {
    // this.loadStaff()
    // this.loadLeaves()
    // this.loadRequests()
    this.getLeavebyRank();
    this.staffLeaveRequestHistory();
  }

  addForm = (e) => {
    e.preventDefault();

    let newLeaveRequest = {
      comment: this.state.comment,
      supportDocument: "null",
      staffId: this.state.personDTO.id,
      start: this.state.startDate,
      end: this.state.endDate,
      leaveTypeRankId: this.state.selectedLeave

      
    };

    if(this.state.selectedLeave == null){
      alert("Select Leave Type")
      return false
    }

    postData(
      `/LeaveRequestManagement/MakeLeaveRequests`,
      newLeaveRequest,
      (data) => {
        console.log(data)
        if (data == codeGreen) {
          this.setState({successCard:true})
          this.componentDidMount();
        }else if(data == statusDeclined){
          this.setState({requestDenied:true})

        }else if(data == notClosed){
          this.setState({notClosedCard:true})

        }
          else{
                alert("Error")
              }
      }
    );
  };

  updateForm = () => {
    postData(`/LeaveRequest`, this.state.leaveRequest, (data) => {
      if (data) {
        this.loadRequests();
      }
    });
  };

  makeRequestHandler = () => {
    if (this.state.personDTO.rankId == null || this.state.personDTO.departmentId == null) {
      this.setState({
        noRankCard: true,
      });
    } else {
      this.setState({
        makeRequest: true,
      });
    }
  };

  staffLeaveRequestHistory = () => {
    fetchData(`/LeaveRequestManagement/GetLeaveRequestByStaffId?staffId=${this.state.payLoad?.staffId}`, data => {
      console.log(data, "History")
      this.setState({
        staffLeaveRecord: data
      })
    })
  }

  closeMakeRequest = () => {
    // alert("fefiuhkjh")
    this.setState({
      makeRequest: false,
    });
  };
  handleFileUpload = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    const { leaveRequest } = this.state;

    reader.onloadend = () => {
      leaveRequest.attachmentUrl = reader.result;
      this.setState({
        ...this.state,
        file: file,
        leaveRequest,
      });
    };
    reader.readAsDataURL(file);
  };

  handleSelectedLeave = (e) => {
    this.setState({ selectedLeave: parseInt(e.target.value) });
  };

  closeNoticeCard = () => {
    this.setState({
      successCard:false
    })
  }

  render() {
    return (
      <>
      {this.state.successCard ? <NotificationCard
        message="Leave Application has been submitted for due Action!"
        closeCard={this.closeNoticeCard}
        okBtn={true}
      
      /> : null}


      {this.state.notClosedCard ? <NotificationCard
      
              message="This Request Was Denied, as you had initially made a request with the same Leave Type, which  is still being processed and yet to be closed. Kindly exercise some patience while your
              previous request awaits appropriate action. Thank you!"
              closeCard={()=>{this.setState({notClosedCard:false})}}
              okBtnDanger={true}
              systemNotice={true}
            
            /> : null}

<Modal isOpen={this.state.requestDenied}>
          <ModalBody>
            <ModalHeader className="text-secondary">
              <h2 class="badge badge-danger">Important Notice!</h2>
              <br />
              <br />
            </ModalHeader>

            <h3 className="text-center">
              <b>
                {" "}
                  Your request was denied, as you are not allowed to apply for an Annual Leave twice in a period of year. <br/> <br/> ANNUAL LEAVE only allows for subsequent requests if the period between your previous request and the 
                present day reaches or exceeds a year
              </b>
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"danger"}
              onClick={() => {
                this.setState({ requestDenied: false });
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.noRankCard}>
          <ModalBody>
            <ModalHeader className="text-secondary">
              <h2 class="badge badge-danger">Important Notice!</h2>
              <br />
              <br />
            </ModalHeader>

            <h3 className="text-center">
              <b>
                {" "}
                The System has detected that you have not been assigned a RANK/Department,
                thereby making you ineligible to make any Leave Request at this
                time. <br /> <br />
                Please contact the HR Administrator to have your RANK/Department duly
                updated. Thank you!
              </b>
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"info"}
              onClick={() => {
                this.setState({ noRankCard: false });
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Leave Requests{" "}
                  <span className="h3 text-muted">/Leave Request Records</span>
                </h6>
              </div>
              <div className="col-lg-6 col-5 text-right"></div>
            </div>
            {/* Card stats */}
            <div className="row">
              <hr className="mx-0" />
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="card-title mb-0 float-left mr-3">
                          My Leave Request History
                        </h3>
                      </div>
                      <div className="col">
                        <div>
                          <button
                            className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                            onClick={this.makeRequestHandler}
                          >
                            <span className="btn-inner--icon">
                              {/* <i className="fa fa-plus text-primary" /> */}
                            </span>
                            <span className="btn-inner--text">
                              Make a new Leave request
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>S/No</th>
                            <th>Leave Type</th>
                            <th>Date of Request</th>
                            <th>Status</th>
                            <th>Proposed Start Date</th>
                            {/* <th>Remarks</th> */}
                            
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.staffLeaveRecord && this.state.staffLeaveRecord.map((i, a) => (

                                      <tr>
                                      <td>{a + 1}</td>
                                      <td>{i.leaveName}</td>
                                
                                      <td>{i.dateEntered.substring(0, 10)}</td>
                                      <td>

                                      {i.progressInPercentage == Wave_Three ? <span class="badge badge-success">
                                    Approved
                                  
                                  </span> : i.progressInPercentage > 0 ? <div
                            class="progress badge-warning"
                            id="progressHold"
                            style={{ height: "20px",}}
                          >
                            <div
                              class="progress-bar bg-warning"
                              id="pb"
                              style={{ width: i.progressInPercentage + "%", height: "15px",  padding:"10px", color:"white" }}
                            >Processing...</div>
                          </div> : <span class="badge badge-warning">
                                    Waiting to be Acted Upon
                                  
                                  </span>}
                                        {/* <span class="badge badge-success">Approved</span> */}
                                      </td>
                                      <td>{i.start.substring(0, 10)}</td>
                                      {/* <td>Leave Request is viable</td> */}
                                    
                                      </tr>
                          ))
                          }

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid mt--6">
            <div></div>

            <Modal isOpen={this.state.makeRequest}>
            
                <div className="modal-header border-bottom">
                  <h2 className="mb-0" id="exampleModalScrollableTitle">
                    Leave Request Form
                  </h2>
                  {/* <button
                 
                    className="close"
                  >
                    <span
                    
                    >×</span>
                  </button> */}
                  <button className="close" onClick={this.closeMakeRequest}>
                    <span>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Leave Type
                        </label>
                        <select
                          className="form-control"
                          onChange={this.handleSelectedLeave}
                          required
                        >
                          <option>Select a Leave Type</option>
                          {this.state.uniqueLeaveType &&
                          this.state.uniqueLeaveType.length > 0
                            ? this.state.uniqueLeaveType.map((leave) => {
                                return (
                                  <option key={leave.id} value={leave.id}>
                                    {leave.name}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Start Date
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          onChange={(e) => {
                            this.setState({ startDate: e.target.value });
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          End Date
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          value={this.state.leaveRequest.endDate}
                          onChange={(e) => {
                            this.setState({ endDate: e.target.value });
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Reason/Comments
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => {
                            this.setState({ comment: e.target.value });
                          }}
                        />
                      </div>
                    </div>
{/* 
                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Attachments
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => this.handleFileUpload(e)}
                        />
                      </div>
                    </div> */}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => this.addForm(e)}
                    data-dismiss="modal"
                    className="btn btn-outline-primary"
                  >
                    Make Request <i className="fa fa-send"/>
                  </button>
                </div>
         
            </Modal>

            <div
              className="modal fade edit-level-modal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header border-bottom">
                    <h2 className="mb-0" id="exampleModalScrollableTitle">
                      Edit Profile
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
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Leave Type
                          </label>
                          <select
                            className="form-control"
                            name="state"
                            onChange={(e) => {
                              this.updatePersonItem(
                                "leaveId",
                                parseInt(e.target.value)
                              );
                            }}
                            required
                          >
                            <option>Select a Leave Type</option>
                            {this.state.leaveTypes &&
                            this.state.leaveTypes.length > 0
                              ? this.state.leaveTypes.map((leave) => {
                                  return (
                                    <option
                                      key={leave.id}
                                      value={leave.leave.id}
                                    >
                                      {leave.leave.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Start Date
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            name="surname"
                            value={this.state.leaveRequest.startDate}
                            onChange={(e) => {
                              this.updatePersonItem(
                                "startDate",
                                e.target.value
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            End Date
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            name="firstname"
                            value={this.state.leaveRequest.endDate}
                            onChange={(e) => {
                              this.updatePersonItem("endDate", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Reason/Comments
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="firstname"
                            value={this.state.leaveRequest.reason}
                            onChange={(e) => {
                              this.updatePersonItem("reason", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Attachments
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="passport"
                            onChange={(e) => this.handleFileUpload(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => this.updateForm()}
                      data-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
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
                          Are you sure you want to delete this record? All items
                          related to it will be affected
                        </p>
                        <button className="btn btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick-={this.closeMakeRequest}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </>
    );
  }
}
