import React from "react";

import hero from "../images/group-banner.svg";
import logosm from "../images/FUTA-Logo1.png";
// import logobg from "../images/ziklogo.png"
import "../styles/global.css";
import { Link, Redirect } from "react-router-dom";
import about1 from "../../src/images/about1.png";
import about2 from "../../src/images/about21.png";
import hiring from "../../src/images/hiring.svg";
import interview from "../../src/images/interview.svg";
import onboarding from "../../src/images/onboarding.svg";
import compensation from "../../src/images/compensation.svg";
import lloydant from "../../src/images/llan.png";
import team4 from "../images/use.png";
import manualGuide from "../components/Reusables/HRStaffManual.pdf";
import TextTransition, { presets } from "react-text-transition";
import { Slide } from "react-awesome-reveal";
import {Fade, AttentionSeeker } from "react-awesome-reveal";


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

// import { navigate } from "@reach/router"

export default class Home extends React.Component {
  state = {
    jobVacancy: [],
    navigate: false,
    payLoad: JSON.parse(localStorage.getItem("userData")),
  };

  myHooks = () => {
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
      const intervalId = setInterval(
        () => setIndex((index) => index + 1),
        3000 // every 3 seconds
      );
    });
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      logUserOut: true,
    });
  };

  customAnimation() {
    var elem = document.getElementById("welcome");
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.top = pos + "px";
        elem.style.left = pos + "px";
      }
    }
  }

  componentDidMount() {
    this.customAnimation();
  }

  render() {
    if (this.state.logUserOut) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    var dateYear = new Date();

    console.log(this.state.jobVacancy.map((id) => console.log(id.id)));
    return (
      <>
        <nav
          className="navbar navbar-top navbar-expand navbar-light m-0 p-0"
          style={{ backgroundColor: "darkmagenta" }}
        >
          <div className="container">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* Navbar links */}
              <a
                className="navbar-brand"
                href="#"
                style={{ display: "inline-block" }}
              >
                {/* <img src="assets/img/brand/blue.png" class="navbar-brand-img" alt="..."> */}
                {/* <h2 className="mb-0 text-white pop-font">HRM</h2>  */}
                <span
                  className="avatar avatar-lg"
                  style={{ backgroundColor: "transparent" }}
                >
                  <img src={logosm} className="pt-5"/>
                </span>
              </a>

              <ul className="navbar-nav align-items-center ml-md-auto">
                <li className="nav-item d-xl-none">
                  {/* Sidenav toggler */}
                  <div
                    className="pr-3 sidenav-toggler sidenav-toggler-light"
                    data-action="sidenav-pin"
                    data-target="#sidenav-main"
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  {/* <Link className="nav-link" to="/login"> */}
                  {/* <button className="btn btn-outline-primary" to="/admin/user-profile" tag={Link}>Sign In</button> */}
                  {
                    !localStorage.getItem("userData") ? (
                      <>
                        <Button
                          className="btn btn-outline-primary"
                          to="/Login"
                          color={"primary"}
                          tag={Link}
                        >
                          Sign In
                        </Button>{" "}
                      </>
                    ) : (
                      <span
                        className="btn btn-secondary"
                        style={{ zIndex: "9999" }}
                      >
                        <div className="media align-items-center">
                          {/* Loggend in as &nbsp;  */}
                          <span className="avatar avatar-sm rounded-circle">
                            <img alt="Image placeholder" src={team4} />
                          </span>

                          <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle
                              nav
                              caret
                              style={{ fontSize: "14px" }}
                            >
                              {this.state.payLoad?.username}
                            </DropdownToggle>

                            <DropdownMenu right>
                              <DropdownItem>
                                <Link
                                  style={{ color: "black" }}
                                  to={{ pathname: "/Dashboard" }}
                                >
                                  Proceed to Dashboard
                                </Link>
                              </DropdownItem>
                              {/* 
						  <DropdownItem href="#">
							News
						  </DropdownItem> */}

                              <DropdownItem
                                onClick={this.logout}
                                style={{ color: "black" }}
                              >
                                <b style={{ color: "black" }}>Logout</b>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </span>
                    )

                    // <Button className="btn btn-outline-primary" color={"primary"} onClick={this.logout}>
                    // 	Sign Out
                    // </Button>
                  }

                  <a href={manualGuide} download className="text-light sofia">
                    <b>Download User Guide <i className="fa fa-download"/></b>
                  </a>

                  {/* </Link> */}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section
          className="pb-5 pr-2 pl-2 overflow-hidden shadow-sm hero"
          style={{ backgroundColor: "rgb(247 241 243)", padding:"1px" }}
        >
          <div className="container" id="welcome">
          <a
                // className="navbar-brand"
                href="#"
                style={{ display: "inline-block", width:'300px' }}
              >

                <span
                  className="col-sm-3"
                  style={{ backgroundColor: "transparent" }}
                >
                  <img src={logosm} className="pt-5 col-md-6" style={{width:'200px'}}/>
                </span>
              </a>
            <div className="row">
              <div className="col-12 col-md-6 align-self-center mt-3 mb-3">
                <div className="display-3 font-weight-700">
                  <h3 className="display-4 font-weight-700 sofia">
                    <TextTransition
                      text={"Welcome to the"}
                      springConfig={presets.molasses}
                      delay={200}
                    />
                  </h3>
				  <h2 className="display-4 font-weight-700 sofia">
                    <TextTransition
                      text={"Federal University of Technology Akure"}
                      springConfig={presets.molasses}
                      delay={200}
                    />
                  </h2>
				  <h2 className="display-4 font-weight-700 sofia">
                    <TextTransition
                      text={"Staff Portal"}
                      springConfig={presets.molasses}
                      delay={200}
                    />
                  </h2>
				  
                  {/* Welcome to the <br /> */}
                  {/* Nnamdi Azikiwe University <br /> */}
                  
                </div>
                <p className="mb-4 mt-2 sofia">
				<TextTransition
                      text={"This portal is a personalized application providing staff with easy access to many of the online services provided by the University such as staff recruitment, payroll, leave management, performance reviews/promotions, employee self-service etc."}
                      springConfig={presets.molasses}
                      delay={200}
                    />
                  {/* This portal is a personalized application providing staff with
                  easy access to many of the online services provided by the
                  University such as staff recruitment, payroll, leave
                  management, performance reviews/promotions, employee
                  self-service etc. <br /> */}
                  {/* with Human Resource Management System from Lloydant.{" "} */}
                </p>

                <Button
                  className="btn btn-primary mb-2 col-12 col-sm-auto"
                  to="/JobPositions"
                  color={"primary"}
                  tag={Link}
                >
                  View Jobs
                </Button>

                <Link
                  to={{ pathname: "Login" }}
                  className="btn btn-outline-accent mb-2 col-12 col-sm-auto "
                >
                  Get Started
                </Link>
              </div>
              <div class="col-12 col-md-6">
			  <AttentionSeeker effect={"rubberBand"} duration={400} delay={1000} triggerOnce={false}>

                <img src={hero} className="img-fluid" alt="" />
				</AttentionSeeker>

              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container mt-5">
            {this.state.jobVacancy && this.state.jobVacancy.length > 0 ? (
              <div className="row mb-2 pr-2 pl-2">
                <div className="col-12">
                  <h2>Open Positions</h2>
                </div>
              </div>
            ) : null}

            {this.state.jobVacancy && this.state.jobVacancy.length > 0
              ? this.state.jobVacancy.map((vacancy) => {
                  return (
                    <div class="card mb-2 border">
                      <div class="card-body d-md-flex align-items-center">
                        <div class="d-flex flex-fill align-items-center">
                          <div class="d-flex flex-fill flex-column flex-md-row align-items-md-center">
                            <div>
                              <h3 class="d-inline-block align-middle font-weight-bold mb-0 mr-2">
                                <span class="companyname">{vacancy.name}</span>
                              </h3>
                              <p class="card-text text-muted small mb-0">
                                {vacancy.jobType.name}
                              </p>
                            </div>
                            <div class="ml-auto p-0 col-12 col-md-4 d-flex text-align-right justify-content-md-end align-items-center">
                              <span class="card-text text-muted small ml-auto">
                                <span class="font-weight-bold"> Open: </span>
                                {vacancy.dateCreated}
                              </span>
                              {/* <Link to={`/form`} state={vacancy}> */}
                              <span class="ml-auto btn btn-outline-primary ">
                                Apply
                              </span>
                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          <div className="container">
            <div className="row my-4">
              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 sofia">
				<TextTransition
                      text={"Central Messaging"}
                      springConfig={presets.wobbly}
                      delay={1000}
                    />
					
					</h2>
                <p className="sofia">
                  With the Staff portal, heads of units or department and can
                  communicate with other staff members within the unit. For
                  example, department heads can notify the staff of training
                  plans.
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>

              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 sofia">
				<TextTransition
                      text={"Store Management"}
                      springConfig={presets.wobbly}
                      delay={1500}
                    />
					
					</h2>
                <p className="sofia">
                  The portal simplifies management of store, procurement and
                  staff inventory thereby providing a direct link between the
                  property and the staff at work.
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>

              <div className="col-lg-6 mb-4 text-center">
                <img src={about1} alt="" height="300px" />
              </div>

              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 sofia">
				<TextTransition
                      text={"Staff Directory"}
                      springConfig={presets.wobbly}
                      delay={1700}
                    />
					
					</h2>
                <p className="sofia">
                  Nnamdi Azikiwe University Staff portal provides staff who are
                  or authorized or head of Units, Departments, Directorates can
                  get contact information of staff, get in touch with them
                  through instant chats, and search staff through designation
                  and view staff requests.
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>

              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 sofia">Document Management</h2>
                <p className="sofia">
                  Effective management of document both private and shared
                  documents. Staff document are effectively managed and
                  minimizes duplicate efforts by individual units.
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>

              <div className="col-lg-6 mb-4 mt-lg-5">
                <h2 className="display-4 sofia">Staff Management</h2>
                <p className="sofia">
                  The portal provides staff the responsibility of planning,
                  directing, and coordinating the administrative functions of
                  the University. It is designed also to help deploy and track
                  employees in the University effectively
                </p>
                {/* <p>If you are a certified staff with  Staff Number assigned, hit the button below</p> */}

                {/* <Link to={{pathname:"GetLoginDetails"}}><button className="btn btn-warning"><i className="fa fa-key"/> &nbsp; Get my Login Credentials</button></Link> */}
              </div>
            </div>
          </div>

          <div className="bg-lighter">
            <div className="container ">
              <div className="row my-4">
                <div className="col-lg-6 mb-4 mt-lg-5 text-center">
                  <img src={about2} alt="" height="300px" />
                </div>

                <div className="col-lg-6 mb-4 mt-lg-6">
                  <h2 className="display-4 sofia">News and Announcement</h2>
                  <p className="sofia">
                    The portal provides a concise platform for institution-wide
                    announcements, external news and feed import through RSS
                    Institutions news
                  </p>
                  {/* <Link to={{pathname:"Login"}} className="btn btn-outline-primary">Sign In</Link> */}
                </div>

                <div className="col-lg-6 mb-4 mt-lg-6">
                  <h2 className="display-4 sofia">Time Management</h2>
                  <p className="sofia">
                    Features Staff time and Attendance management e.g. Clock
                    in/clock out, breaks, and attendance reports.
                  </p>
                  {/* <Link to={{pathname:"Login"}} className="btn btn-outline-primary">Sign In</Link> */}
                </div>

                <div className="col-lg-6 mb-4 mt-lg-6">
                  <h2 className="display-4 sofia">Employee Self Service</h2>
                  <p className="sofia">
                    Staff members are able to update their personal information
                    employee/staff such as an address, contact information, and
                    banking information, & also to view scheduling and payroll
                    information.
                  </p>
                  {/* <Link to={{pathname:"Login"}} className="btn btn-outline-primary">Sign In</Link> */}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row my-7">
              <div className="col-lg-3">
                <img src={hiring} alt="" height="50px" />
                <h2 className="mt-3">Hiring</h2>
                <p>
                  Modern applicant selection process to help find, evaluate, and
                  hire the right people as quickly as possible.
                </p>
                <a href="#" className="font-weight-600">
                  Learn More <i className="fa fa-chevron-right"></i>
                </a>
              </div>

              <div className="col-lg-3">
                <img src={interview} alt="" height="50px" />
                <h2 className="mt-3">Interview</h2>
                <p>
                  Platform streamlines interview process by pre-ordering
                  selected applicants according to preset criteria.
                </p>
                <a href="#" className="font-weight-600">
                  Learn More <i className="fa fa-chevron-right"></i>
                </a>
              </div>

              <div className="col-lg-3">
                <img src={onboarding} alt="" height="50px" />
                <h2 className="mt-3">Onboarding</h2>
                <p>
                  Complete suite of onboarding resources to take away all
                  redundancy from the orientation process.
                </p>
                <a href="#" className="font-weight-600">
                  Learn More <i className="fa fa-chevron-right"></i>
                </a>
              </div>

              <div className="col-lg-3">
                <img src={compensation} alt="" height="50px" />
                <h2 className="mt-3">Compensation</h2>
                <p>
                  Simple and effective payroll management solution to handle and
                  track all payments and benefits.
                </p>
                <a href="#" className="font-weight-600">
                  Learn More <i className="fa fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="container-fluid mt-5 min-vh-20 bg-lighter">
          {/* Footer */}
          <footer className="footer py-auto bg-lighter">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-lg-12">
                <div className="copyright text-center text-muted">
                  Copyright © {dateYear.getFullYear()}{" "}
                  <a
                    href="https://www.lloydant.com/"
                    className="font-weight-bold ml-1"
                    target="_blank"
                  >
                    <br />
                    <br />
                    <img src={lloydant} style={{ width: "50px" }} />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </>
    );
  }
}
