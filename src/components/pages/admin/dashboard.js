import React from "react";
import {
  fetchData,
  postData,
  editData,
  deleteData,
  URL,
  fetchDataWithoutToken,
} from "../../../utils/crud";
// import { Link } from "gatsby"
import _ from "lodash";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Fade } from "reactstrap";
import { Roles } from "../../Barn";
import Spinner from "./Spinner";

export default class Dashboard extends React.Component {
  state = {
    allStaff: [],
    attendance: [],
    broadcasts: [],
    leaveRequests: [],
    trainingRequest: [],
    events: [],
    allVacancy: [],
    payLoad: JSON.parse(localStorage.getItem("userData")),
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),
    departmentName: "...",
    // spin:true
  };

  getInstDept = () => {
    fetchDataWithoutToken(
      `/InstitutionDepartments/${this.state.staffPayLoad?.departmentId}`,
      (data) => {
        console.log(data, "Dept!!");
        this.setState({
          departmentName: data.name,
        });
      }
    );
  };

  loadStats = () => {
    //fetch staff
    // this.loadStaff()
    // this.loadNews()
    // this.loadLeaveRequest()
    // this.loadTrainingRequests()
    // this.loadEvents()
    // this.loadJobOpening()
  };

  reloadStaff = () => {
    fetchDataWithoutToken(`/Staff/${this.state.payLoad.staffId}`, (data) => {
      console.log(data, "Reload");
      localStorage.setItem("DTO", JSON.stringify(data.id));
      localStorage.setItem("DTOFULL", JSON.stringify(data));
    });
  };

  loadEvents = () => {
    fetchDataWithoutToken("/Events", (data) => {
      console.log(data, "Events");
      this.setState({ events: data });
    });
  };

  loadTrainingRequests = () => {
    fetchDataWithoutToken(`/TrainingRequest`, (data) => {
      this.setState({ trainingRequest: data });
    });
  };

  loadLeaveRequest = () => {
    fetchDataWithoutToken("/LeaveRequest", (data) => {
      this.setState({ leaveRequests: _.reverse(data) });
    });
  };

  loadStaff = () => {
    fetchDataWithoutToken("/Staff", (data) => {
      this.setState({ allStaff: data });
    });
  };
  loadJobOpening = () => {
    fetchDataWithoutToken("/JobVacancy", (data) => {
      this.setState({ allVacancy: data });
    });
  };

  loadAttendance = () => {
    fetchDataWithoutToken("/Attendance/AttendanceByMonth", (data) => {
      this.setState({ attendance: data });
    });
  };
  loadNews = () => {
    const currentState = this;
    const AuthStr = "Bearer ".concat(this.state.payLoad.token);

    axios
      .get(URL + "/Broadcasts", {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then((response) => {
        console.log(response.data, "Broad!!!!!!");
        currentState.setState({
          broadcasts: response.data,
        });
      });
  };
  deleteo = () => {
    delete this.state.Test.key2;
    this.componentDidMount();
    setTimeout(() => {
      console.log(this.state.Test, "After!!");
    }, 3000);
  };

  countStaff = () => {
    this.setState({ spin: true });
    fetchDataWithoutToken("/Staff/StaffCounter", (data) => {
      this.setState({ totalStaff: data });
      console.log(data, "Count!!");
      this.loadStaff();
      this.newNotificationFetch();

      this.loadNews();
      this.loadLeaveRequest();
      this.loadTrainingRequests();
      this.loadEvents();
      this.loadJobOpening();
      this.setState({ spin: false });
    });
  };


  newNotificationFetch = () => {
    fetchDataWithoutToken("/Notification/NewChangeOfNameRequest", (data) => {
      this.setState({
        newNotification:data
      })
    })
  }

  componentDidMount() {
    if (!localStorage.getItem("userData")) {
      this.setState({
        userRedirect: true,
      });
    } else {
      this.countStaff();

      fetchDataWithoutToken("/LeaveRequestManagement/RequestCount", (data) => {
        this.setState({
          leaveRequestCount: data,
        });
      });

      if (
        this.state.payLoad.roleId == 7 &&
        this.state.staffPayLoad?.departmentId != null
      ) {
        this.getInstDept();
      }

      // this.reloadStaff();

      var sampleObject = {
        key1: "value1",
        key2: "value2",
        key3: "value3",
        key4: "value4",
      };
      this.setState({
        Test: sampleObject,
      });
      setTimeout(() => {
        // console.log(this.state.Test, "Sample State")
      }, 2000);
      // console.log(sampleObject, "Sample")
      // console.log(this.state.payLoad, "Callback!!!")

      // this.loadStats()
    }
  }
  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <>
        {this.state.spin ? (
          <Spinner msg={"Setting up, Please wait..."} />
        ) : null}

        <Fade>
          {/* <button onClick={this.deleteo}>Test</button> */}
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0">Dashboard</h6>
              </div>
              <div className="col-lg-6 col-5 text-right">
                <h4 className="sofia">
                  {this.state.payLoad?.roleId == Roles.Regularization
                    ? "Logged in as Regularization Officer"
                    : this.state.payLoad?.roleId == Roles.SuperAdmin
                    ? "Logged in as an Administrator"
                    : this.state.payLoad?.roleId == Roles.HOD
                    ? `Logged in as Head of Department ${_.upperCase(
                        this.state.departmentName
                      )}`
                    : null}
                </h4>
              </div>
            </div>
            {/* Card stats */}
            {this.state.payLoad?.roleId == Roles.SuperAdmin ||
            this.state.payLoad?.roleId == Roles.Regularization ||
            this.state.payLoad?.roleId == Roles.Dean ||
            this.state.payLoad?.roleId == Roles.Personnel ||
            this.state.payLoad?.roleId == Roles.VC ||
            this.state.payLoad?.roleId == Roles.HRAdmin ||
            (this.state.payLoad?.roleId == Roles.PersonnelDocumentation &&
              this.state.staffPayLoad?.departmentId == 133) ||
            (this.state.payLoad?.roleId == Roles.PersonnelSaps &&
              this.state.staffPayLoad?.departmentId == 133) ? (
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col pop-font">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Total Staff
                          </h5>
                          <span className="h1 font-weight-bold mb-0 sofia">
                            {this.state.totalStaff > 0
                              ? this.state.totalStaff
                              : "0"}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                            <i className="ni ni-single-02" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col pop-font">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Leave Request(s)
                          </h5>
                          <span className="h1 font-weight-bold mb-0 sofia">
                            {this.state.leaveRequestCount > 0
                              ? this.state.leaveRequestCount
                              : "0"}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                            <i className="ni ni-chart-pie-35" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col pop-font">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Training Request(s)
                          </h5>
                          <span className="h1 font-weight-bold mb-0 sofia">
                            {this.state.trainingRequest.length > 0
                              ? this.state.trainingRequest.length
                              : "0"}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                            <i className="ni ni-badge" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col pop-font">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Open Postion(s)
                          </h5>

                          <span className="h1 font-weight-bold mb-0 sofia">
                            {this.state.allVacancy.length > 0
                              ? this.state.allVacancy.length
                              : "0"}
                          </span>
                          {/* <span className="h1 font-weight-bold mb-0">0</span> */}
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                            <i className="ni ni-briefcase-24" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="row">
              <div className="col-md-6">
                <div className=" card">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "rgb(129 166 199)",
                      color: "white",
                    }}
                  >
                    <h2 className="mb-0 sofia" style={{ color: "white" }}>
                      Upcoming Events
                    </h2>
                  </div>
                  <div className="card-body">
                    <div
                      className="timeline timeline-one-side"
                      data-timeline-content="axis"
                      data-timeline-axis-style="dashed"
                    >
                      {this.state.events != null && this.state.events.length > 0
                        ? this.state.events.map((event, key) => {
                            return (
                              <div key={key} className="timeline-block">
                                <span
                                  className="timeline-step badge-success"
                                  style={{ zIndex: "0" }}
                                >
                                  <i className="ni ni-briefcase-24" />
                                </span>
                                <div className="timeline-content">
                                  <div className="d-flex justify-content-between pt-1 sofia">
                                    <div>
                                      <span className="text-muted text-sm font-weight-bold">
                                        {event.name}
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />
                                        {event.date.substring(0, 10)}
                                      </small>
                                      <button
                                        // onClick={() =>
                                        //   this.setSelectedData(event)
                                        // }
                                        type="button"
                                        disabled
                                        rel="tooltip"
                                        className="ml-5 btn btn-outline-warning btn-icon btn-sm "
                                        data-toggle="modal"
                                        data-target=".edit-level-modal"
                                      >
                                        <i className="fa fa-eye pt-1" />
                                      </button>
                                      {/* <button
                                      onClick={() =>
                                        this.setSelectedData(event)
                                      }
                                      type="button"
                                      rel="tooltip"
                                      className="ml-1 btn btn-danger btn-icon btn-sm "
                                      data-toggle="modal"
                                      data-target=".delete-level-modal"
                                    >
                                      <i className="fa fa-trash pt-1" />
                                    </button> */}
                                    </div>
                                  </div>
                                  <h6 className="text-sm mt-1 mb-0 sofia">
                                    Venue : &nbsp; {event.venue}
                                  </h6>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
             
             
             
             
                {/* <div className="col-md-6"> */}
                <div className="card">
                  {/* Card header */}
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "rgb(129 166 199)",
                      color: "white",
                    }}
                  >
                    {/* Title */}
                    <h2 className="mb-0 sofia" style={{ color: "white" }}>
                      Latest News
                    </h2>
                  </div>
                  {/* Card body */}
                  <div className="card-body sofia">
                    <div
                      className="timeline timeline-one-side"
                      data-timeline-content="axis"
                      data-timeline-axis-style="dashed"
                    >
                      {this.state.broadcasts != null &&
                      this.state.broadcasts.length > 0
                        ? this.state.broadcasts.map((news, key) => {
                            return (
                              <div key={key} className="timeline-block">
                                <span className="timeline-step badge-success">
                                  <i className="ni ni-bell-55" />
                                </span>
                                <div className="timeline-content">
                                  <div className="d-flex justify-content-between pt-1">
                                    <div>
                                      <span className="h5 text-muted text-sm font-weight-bold">
                                        {news.subject}
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />
                                        {news.date.substring(0, 10)}
                                      </small>
                                    </div>
                                  </div>
                                  <h6 className="text-sm mt-1 mb-0">
                                    {news.details}
                                  </h6>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              {/* </div> */}
            
             
             
             
              </div>

              <div className="col-md-6">
                <div className="card">
                  {/* Card header */}
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "rgb(129 166 199)"
                    }}
                  >
                    {/* Title */}
                    <h2 className="mb-0 sofia" style={{ color: "white" }}>
                      Notifications
                    </h2>
                  </div>
                  {/* Card body */}
                  <div className="card-body">
                    <div
                      className="timeline timeline-one-side"
                      data-timeline-content="axis"
                      data-timeline-axis-style="dashed"
                    >
                      {this.state.newNotification > 0 ?
                      <div className="timeline-block">
                        <span className="timeline-step badge-danger">
                          <i className="ni ni-bell-55" />
                        </span>
                        <div className="timeline-content">
                          <div className="d-flex justify-content-between pt-1">
                          <div>
                              <span className="btn btn-danger btn-sm sofia">
                                New
                              </span>
                            </div>
                            <div className="text-right">
                              <small className="text-muted sofia">
                                {/* <i className="fas fa-clock mr-1" /> */}
                              </small>
                            </div>
                          </div>
                          <h6 className="text-sm mt-1 mb-0 sofia">
                            You have  <span className="badge badge-danger sofia" style={{fontSize:"13px"}}>
                                {this.state.newNotification}
                              </span> new Change of name request
                          </h6>
                        </div>
                      </div>
                      : null}



                      <div className="timeline-block">
                        <span className="timeline-step badge-danger">
                          <i className="ni ni-bell-55" />
                        </span>
                        <div className="timeline-content">
                          <div className="d-flex justify-content-between pt-1">
                            <div>
                              <span className="btn btn-danger btn-sm sofia">
                                New
                              </span>
                            </div>
                            <div className="text-right">
                              <small className="text-muted sofia">
                                {/* <i className="fas fa-clock mr-1" /> */}
                              </small>
                            </div>
                          </div>
                          <h6 className="text-sm mt-1 mb-0 sofia">
                            You have <span className="badge badge-danger sofia" style={{fontSize:"13px"}}>
                                12
                              </span> new Department transfer requests
                          </h6>
                        </div>
                      </div>

                      {this.state.broadcasts != null &&
                      this.state.broadcasts.length > 0
                        ? this.state.broadcasts.map((news, key) => {
                            return (
                              <div key={key} className="timeline-block">
                                <span className="timeline-step badge-success">
                                  <i className="ni ni-bell-55" />
                                </span>
                                <div className="timeline-content">
                                  <div className="d-flex justify-content-between pt-1">
                                    <div>
                                      <span className="h5 text-muted text-sm font-weight-bold">
                                        {news.subject}
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />
                                        {news.date.substring(0, 10)}
                                      </small>
                                    </div>
                                  </div>
                                  <h6 className="text-sm mt-1 mb-0">
                                    {news.details}
                                  </h6>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
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
