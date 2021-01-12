import React from "react";
import { Link } from "react-router-dom";
import { fetchData, editData, URL } from "../../../utils/crud";
import logo from "../../../images/ziklogosm.png";
import Loadable from "react-loadable";
import Layout from "../../layout";
import Spinner from "../../pages/admin/Spinner";
import { Fade, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
// import {Animated} from "react-animated-css";
import Animate from "animate.css-react";
import "animate.css/animate.css";
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import checkIcon from "../../../images/confirmIcon.png"


export default class Biodata extends React.Component {
  state = {
    saveStaffProfile:false,
    
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
    appointments: [],
    units: [],
    departments: [],
    ranks: [],
    states: [],
    lgas: [],
    maritalStatus: [],
    genders: [],
    staffTypes: [],
    staffCategories: [],
    passport: null,
    showCV: false,
    
  };
  hidePreview = () => {
    this.setState({ showCV: false });
  };
  showPreview = () => {
    this.setState({
      showCV: true,
    });
    console.log("clicked");
    fetchData("/ApplicationForms/GetApplicantCV?personId=2", (data) => {
      this.setState({ appInfo: data });
      console.log(this.state.appInfo, "myPersonalInfo");
    });
  };
  downloadCV = () => {
    const filename = "CV.pdf";
    if (typeof window !== "undefined") {
      html2canvas(document.querySelector("#curri")).then((canvas) => {
        let pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", -10, 0, 210, 190);
        pdf.save(filename);
      });
    }
  };

  updatePersonItem = (index, value) => {
    const { staff } = this.state;
    staff.person[index] = value;
    this.setState({ ...this.state, staff });
  };

  updateStaffItem = (index, value) => {
    const { staff } = this.state;
    staff[index] = value;
    this.setState({ ...this.state, staff });
  };

  loadStaff = () => {
    const id = this.state.payLoad.staffId;
    fetchData(`/Staff/${this.state.payLoad.staffId}`, (data) => {
      console.log(data, "Yess!!!")
      const { staff } = this.state;
      staff.staffNumber = data.staffNumber;
      staff.person.surname = data.person.surname;
      staff.person.firstname = data.person.firstname;
      staff.person.othername = data.person.othername;
      staff.person.birthDay = data.person.birthDay.substring(0, 10);
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
      this.setState({ ...this.state, staff });
      console.log("StaffffF", this.state.staff);
    });
  };

  loadStates = () => {
    fetchData("/States", (data) => {
      this.setState({ states: data });
    });
  };

  loadLgas = () => {
    fetchData("/Lgas", (data) => {
      this.setState({ lgas: data });
    });
  };

  loadMaritalStatus = () => {
    fetchData("/MaritalStatus", (data) => {
      this.setState({ maritalStatus: data });
    });
  };

  loadGender = () => {
    fetchData("/Genders", (data) => {
      this.setState({ genders: data });
    });
  };

  loadRank = () => {
    fetchData("/InstitutionRanks", (data) => {
      this.setState({ ranks: data });
    });
  };

  loadDepartment = () => {
    fetchData("/InstitutionDepartments", (data) => {
      this.setState({ departments: data });
    });
  };

  loadAppointment = () => {
    fetchData("/InstitutionAppointments", (data) => {
      this.setState({ appointments: data });
    });
  };

  loadUnit = () => {
    fetchData("/InstitutionUnits", (data) => {
      this.setState({ units: data });
    });
  };

  loadStaffType = () => {
    fetchData("/InstitutionStaffTypes", (data) => {
      this.setState({ staffTypes: data });
    });
  };

  loadStaffCategory = () => {
    fetchData("/InstitutionStaffCategories", (data) => {
      this.setState({ staffCategories: data });
    });
  };

  postProfileUpdate = () => {
    let currentState = this;
    this.setState({
      showSpin:true,
      saveStaffProfile:false
    })
    var formData = new FormData();
    formData.append(
      "Passport",
      this.state.file || this.state.staff.person.imageUrl
    );
    formData.append(
      "ContactAddress",
      this.state.address || this.state.staff.person.address
    );
    formData.append(
      "Phone",
      this.state.phoneNumber || this.state.staff.person.phoneNumber
    );
    formData.append(
      "EmailAddress",
      this.state.email || this.state.staff.person.email
    );
    formData.append("BiometricNo", "null");
    formData.append("StaffId", this.state.payLoad.staffId);

    axios({
      method: "post",
      url: URL + "/Staff/StaffProfileUpdate",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if (response.status == 200) {
          currentState.setState({
            showSpin:false,
            updateSuccess: true
          })
          console.log(response);
          console.log(formData);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        console.log(formData);
      });
  };

  componentDidMount() {
    if (!localStorage.getItem("userData")) {
      this.setState({
        userRedirect: true,
      });
    }
    this.loadStaff();
    this.loadStaffCategory();
    this.loadStaffType();
    this.loadUnit();
    this.loadAppointment();
    this.loadDepartment();
    this.loadRank();
    this.loadGender();
    this.loadLgas();
    this.loadStates();
    this.loadMaritalStatus();
    console.log(this.state.staff, "checking!!");
    console.log(this.state.payLoad, "payload!!");
  }

  isValidInputs = () => {
    var phoneno = /^\d{11}$/;
    if (!this.state.staff.person.phoneNumber.match(phoneno)) {
      alert("Enter a valid Phone Number");
      return false;
    }

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.staff.person.email.match(mailformat)) {
      alert("Enter a valid Phone Number");
      return false;
    }

    return true;
  };

  updateForm = () => {
    if (this.isValidInputs()) {
      editData(`/Staff/${this.state.staff.id}`, this.state.staff, (data) => {
        if (data) {
          alert("Saved!");
        }
      });
    }
  };

  handleFileUpload = (e) => {
    e.preventDefault();
    let pHold = document.getElementById("progressHold");
    pHold.style.display = "block";
    let pBar = document.getElementById("pb");
    pBar.style.width = "0%";

    pBar.innerHTML = "Uploading.....";

    setTimeout(() => {
      pBar.style.width = "100%";
      pBar.innerHTML = "Attached Successfully !";
    }, 2000);

    // setTimeout(()=>{
    //   pHold.style.display = "none"
    //   pBar.style.width = "0%";

    // },6000)

    let reader = new FileReader();
    let file = e.target.files[0];
    const { staff } = this.state;

    reader.onloadend = () => {
      staff.person.imageUrl = reader.result;
      this.setState({
        ...this.state,
        file: file,
        passport: reader.result,
        staff,
      });
    };
    setTimeout(() => {
      console.log(this.state.file, "File");
      reader.readAsDataURL(file);
    }, 2000);
  };

  myToggle = () => {
    if(!this.state.saveStaffProfile){
      this.setState({
        saveStaffProfile:true
      })
    }else{
      this.setState({
        saveStaffProfile:false
      })
    }
  }

  closeUpdatedModal = () => {
    this.setState({
      updateSuccess: false
    })
  }

  render() {
    let newData = this.state.staff;
    return (
      <>
     {this.state.showSpin ? <Spinner msg={"Saving..."}/> : null}
        <Modal isOpen={this.state.saveStaffProfile}>
          <ModalBody><b className="sofia">Confirm update?</b></ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-primary" onClick={()=>this.postProfileUpdate()}>Confirm &nbsp; <i className="fa fa-check"/></button>
            <button className="btn btn-outline-danger" onClick={this.myToggle}>Cancel &nbsp; <i className="fa fa-arrow-left"/></button>
          
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.updateSuccess}>
          <ModalHeader>&nbsp;</ModalHeader>
        <div className="row justify-content-center">
              <img src={checkIcon} style={{width:"50px"}}/>
              </div>
          <ModalBody><b className="sofia">Profile update was successful!</b></ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-primary" onClick={this.closeUpdatedModal}>OK</button>
          
          </ModalFooter>
        </Modal>
        <Fade>
          <div className="header-body">
            <div className="row align-items-center py-4">
              <div className="col-lg-6 col-7">
                <h6 className="h1 d-inline-block mb-0 pop-font">
                  Dashboard{" "}
                  <span className="h3 text-muted">/Staff Biodata</span>
                </h6>
                <span className="text-sm d-block">Update Biodata.</span>
              </div>
              <div className="col-lg-6 col-5 text-right"></div>
            </div>

            {/* Card stats */}
            <div className="row justify-content-md-center">
              <hr className="mx-0" />
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        {/* <div>
                          <button
                            className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                            type="button"
                            onClick={this.showPreview}
                          >
                            <span className="btn-inner--icon">
                              <i className="fa fa-download" />
                            </span>
                            <span className="btn-inner--text">Download CV</span>
                          </button>
                          <Link
                            to={{
                                pathname:"/IdentityCard",
                                state:{newData}
                            }}
                            
                            className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                          >
                            <span className="btn-inner--icon">
                              <i className="fa fa-credit-card" />
                            </span>
                            <span className="btn-inner--text">ID Card</span>
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Passport
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="passport"
                            onChange={(e) => this.handleFileUpload(e)}
                          />
                          <div
                            class="progress"
                            id="progressHold"
                            style={{ height: "15px", display: "none" }}
                          >
                            <div
                              class="progress-bar bg-success"
                              id="pb"
                              style={{ width: "0%", height: "15px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          <span className="avatar avatar-xl">
                            <img src={this.state.staff.person?.imageUrl} />
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            Last Name
                          </label>
                          <input
                            className="form-control"
                            disabled
                            type="text"
                            name="surname"
                            value={this.state.staff.person.surname}
                            onChange={(e) => {
                              this.updatePersonItem("surname", e.target.value);
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
                            First Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            disabled
                            name="firstname"
                            value={this.state.staff.person.firstname}
                            onChange={(e) => {
                              this.updatePersonItem(
                                "firstname",
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
                            Other Name
                          </label>
                          <input
                            className="form-control"
                            disabled
                            type="text"
                            name="othername"
                            value={this.state.staff.person.othername}
                            onChange={(e) => {
                              this.updatePersonItem(
                                "othername",
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
                            Date of birth
                          </label>
                          <input
                            className="form-control"
                            disabled
                            type="date"
                            name="birthDay"
                            value={this.state.staff.person.birthDay}
                            onChange={(e) => {
                              this.updatePersonItem("birthDay", e.target.value);
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
                            Email Address
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            defaultValue={this.state.staff.person.email}
                            onChange={(e) => {
                              this.setState({ email: e.target.value });
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
                            Phone
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                            defaultValue={this.state.staff.person.phoneNumber}
                            onChange={(e) => {
                              this.setState({ phoneNumber: e.target.value });
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
                            Contact Address
                          </label>
                          <textarea
                            className="form-control"
                            type="text"
                            name="address"
                            defaultValue={this.state.staff.person.address}
                            onChange={(e) => {
                              this.setState({ address: e.target.value });
                            }}
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="example-text-input"
                            className="form-control-label"
                          >
                            State of Origin
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="state"
                            onChange={(e) => {
                              this.updatePersonItem(
                                "stateId",
                                parseInt(e.target.value)
                              );
                            }}
                            required
                          >
                            <option>Select a state</option>
                            {this.state.states && this.state.states.length > 0
                              ? this.state.states.map((state) => {
                                  return (
                                    <option
                                      key={state.id}
                                      selected={
                                        state.id ==
                                        this.state.staff.person.stateId
                                      }
                                      value={state.id}
                                    >
                                      {state.name}
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
                            Local Government Area
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="lgaId"
                            onChange={(e) => {
                              this.updatePersonItem(
                                "lgaId",
                                parseInt(e.target.value)
                              );
                            }}
                            required
                          >
                            <option>Select a Local Government</option>
                            {this.state.lgas && this.state.lgas.length > 0
                              ? this.state.lgas.map((lga) => {
                                  return (
                                    <option
                                      key={lga.id}
                                      selected={
                                        lga.id == this.state.staff.person.lgaId
                                      }
                                      value={lga.id}
                                    >
                                      {lga.name}
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
                            Gender
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="gender"
                            onChange={(e) => {
                              this.updatePersonItem(
                                "genderId",
                                parseInt(e.target.value)
                              );
                            }}
                          >
                            <option>Select a Gender</option>
                            {this.state.genders && this.state.genders.length > 0
                              ? this.state.genders.map((gender) => {
                                  return (
                                    <option
                                      key={gender.id}
                                      selected={
                                        gender.id ==
                                        this.state.staff.person.genderId
                                      }
                                      value={gender.id}
                                    >
                                      {gender.name}
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
                            Relationship Status
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="maritalStatusId"
                            onChange={(e) => {
                              this.updatePersonItem(
                                "maritalStatusId",
                                parseInt(e.target.value)
                              );
                            }}
                          >
                            <option>Select a Relationship Status</option>
                            {this.state.maritalStatus &&
                            this.state.maritalStatus.length > 0
                              ? this.state.maritalStatus.map((status) => {
                                  return (
                                    <option
                                      key={status.id}
                                      selected={
                                        status.id ==
                                        this.state.staff.person.maritalStatusId
                                      }
                                      value={status.id}
                                    >
                                      {status.name}
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
                            Staff Type
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="staffTypeId"
                            onChange={(e) => {
                              this.updateStaffItem(
                                "staffTypeId",
                                parseInt(e.target.value)
                              );
                            }}
                          >
                            <option>Select Staff Type</option>
                            {this.state.staffTypes &&
                            this.state.staffTypes.length > 0
                              ? this.state.staffTypes.map((types) => {
                                  return (
                                    <option
                                      key={types.id}
                                      selected={
                                        types.id == this.state.staff.staffTypeId
                                      }
                                      value={types.id}
                                    >
                                      {types.name}
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
                            Staff Category
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="categoryId"
                            onChange={(e) => {
                              this.updateStaffItem(
                                "categoryId",
                                parseInt(e.target.value)
                              );
                            }}
                          >
                            <option>Select a Staff Category</option>
                            {this.state.staffCategories &&
                            this.state.staffCategories.length > 0
                              ? this.state.staffCategories.map((category) => {
                                  return (
                                    <option
                                      key={category.id}
                                      selected={
                                        category.id ==
                                        this.state.staff.categoryId
                                      }
                                      value={category.id}
                                    >
                                      {category.name}
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
                            Unit
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="unitId"
                            onChange={(e) => {
                              this.updateStaffItem(
                                "unitId",
                                parseInt(e.target.value)
                              );
                            }}
                          >
                            <option>Select a unit</option>
                            {this.state.units && this.state.units.length > 0
                              ? this.state.units.map((unit) => {
                                  return (
                                    <option
                                      key={unit.id}
                                      selected={
                                        unit.id == this.state.staff.unitId
                                      }
                                      value={unit.id}
                                    >
                                      {unit.name}
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
                            Department
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="departmentId"
                            onChange={(e) => {
                              this.updateStaffItem(
                                "departmentId",
                                parseInt(e.target.value)
                              );
                            }}
                          >
                            <option>Select a Department</option>
                            {this.state.departments &&
                            this.state.departments.length > 0
                              ? this.state.departments.map((department) => {
                                  return (
                                    <option
                                      key={department.id}
                                      selected={
                                        department.id ==
                                        this.state.staff.departmentId
                                      }
                                      value={department.id}
                                    >
                                      {department.name}
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
                            Rank
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="rankId"
                            onChange={(e) => {
                              this.updateStaffItem(
                                "rankId",
                                parseInt(e.target.value)
                              );
                            }}
                          >
                            <option>Select an Rank</option>
                            {this.state.ranks && this.state.ranks.length > 0
                              ? this.state.ranks.map((rank) => {
                                  return (
                                    <option
                                      key={rank.id}
                                      selected={
                                        rank.id == this.state.staff.rankId
                                      }
                                      value={rank.id}
                                    >
                                      {rank.name}
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
                            Appointment
                          </label>
                          <select
                            className="form-control"
                            disabled
                            name="appointmentId"
                            onChange={(e) => {
                              this.updateStaffItem(
                                "appointmentId",
                                parseInt(e.target.value)
                              );
                            }}
                          >
                            <option>Select an Appointment</option>
                            {this.state.appointments &&
                            this.state.appointments.length > 0
                              ? this.state.appointments.map((appointment) => {
                                  return (
                                    <option
                                      key={appointment.id}
                                      selected={
                                        appointment.id ==
                                        this.state.staff.appointmentId
                                      }
                                      value={appointment.id}
                                    >
                                      {appointment.name}
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
                            Staff Number
                          </label>
                          <input
                            className="form-control"
                            disabled
                            type="text"
                            name="staffNumber"
                            value={this.state.staff.staffNumber}
                            onChange={(e) => {
                              this.updateStaffItem(
                                "staffNumber",
                                e.target.value
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => this.myToggle()}
                      data-dismiss="modal"
                      className="btn btn-outline-primary"
                    >
                      Save &nbsp;<i className="fa fa-floppy-o"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.state.showCV == true ? (
            <div className="jumbo-back">
              <div className="container marg-top">
                <div className="text-right" id="m-bot">
                  <button
                    id="cvx"
                    className="btn btn-info"
                    id="cv-download"
                    onClick={this.downloadCV}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-download" />
                    </span>{" "}
                    Download CV{" "}
                  </button>
                  <button
                    id="cvx"
                    className="btn btn-danger"
                    onClick={this.hidePreview}
                    id="cv-download"
                  >
                    {" "}
                    &times; Cancel{" "}
                  </button>
                </div>

                <div className="container mt5-pct mb-5" id="curri">
                  <div className="card shadow">
                    <div className="card-body primary-bg">
                      <div className="row">
                        <div className="offset-md-2 col-md-8">
                          <div
                            style={{
                              marginLeft: "auto",
                              marginRight: "auto",
                              width: "50px",
                            }}
                          >
                            <img
                              src={logo}
                              alt="school logo"
                              style={{
                                width: "50px",
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            />
                          </div>
                          <form className="mt-5">
                            <b>BIODATA</b>
                            <hr />

                            <div className="form-group row">
                              <label className="col-sm-3">
                                Full Name: <br />
                                <p>
                                  <b>
                                    <i>
                                      {this.state.staff.person.surname}{" "}
                                      {this.state.staff.person.firstname}{" "}
                                      {this.state.staff.person.othername}
                                    </i>
                                  </b>
                                </p>
                              </label>

                              <label className="col-sm-3">
                                Date of Birth :
                                <br />
                                <p>
                                  <b>
                                    <i>{this.state.staff.person.birthDay}</i>
                                  </b>
                                </p>
                              </label>

                              <label className="col-sm-3">
                                Gender:
                                <br />
                                <p></p>
                              </label>

                              <div
                                className="col-sm-3"
                                style={{ backgroundColor: "grey" }}
                              >
                                <img />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-3">
                                Address:
                                <br />
                                <p> </p>
                              </label>

                              <label className="col-sm-3">
                                Phone Number:
                                <br />
                                <p></p>
                              </label>

                              <label className="col-sm-3">
                                Email Address:
                                <br />
                                <p></p>
                              </label>
                              <label className="col-sm-3">
                                Marital Status:
                                <br />
                                <p></p>
                              </label>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-3">
                                Religion:
                                <br />
                                <p></p>
                              </label>

                              <label className="col-sm-3">
                                State of Origin:
                                <br />
                                <p></p>
                              </label>

                              <label className="col-sm-3">
                                LGA:
                                <br />
                                <p></p>
                              </label>
                            </div>

                            <hr />
                            <b>EDUCATION & QUALIFICATIONS</b>
                            <hr />

                            <div className="form-group row">
                              <label className="col-sm-3">
                                Institution Attended:
                                <br />
                                <p> </p>
                              </label>

                              <label className="col-sm-3">
                                Course:
                                <br />
                                <p> </p>
                              </label>

                              <label className="col-sm-3">
                                Graduation Year:
                                <br />
                                <p></p>
                              </label>

                              <label className="col-sm-3">
                                Qualification Obtained:
                                <br />
                                <p> </p>
                              </label>
                            </div>

                            <hr />

                            <hr />
                            <b>WORK EXPERIENCE</b>
                            <hr />

                            <div className="form-group row">
                              <label className="col-sm-3">
                                Organisation:
                                <br />
                                <p></p>
                              </label>
                              <label className="col-sm-3">
                                Position Held:
                                <br />
                                <p></p>
                              </label>
                              <label className="col-sm-3">
                                Start Year:
                                <br />
                                <p></p>
                              </label>
                              <label className="col-sm-3">
                                End Year:
                                <br />
                                <p></p>
                              </label>
                            </div>

                            <hr />

                            <hr />
                            <b>REFEREES</b>
                            <hr />

                            <div className="form-group row">
                              <label className="col-sm-3">
                                Name of Referee 1:
                                <br />
                              </label>
                              <label className="col-sm-3">
                                Organisation:
                                <br />
                              </label>{" "}
                              <label className="col-sm-3">
                                Designation:
                                <br />
                              </label>
                              <label className="col-sm-3">
                                Email:
                                <br />
                              </label>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-3">
                                Name of Referee 2:
                                <br />
                                <p></p>
                              </label>
                              <label className="col-sm-3">
                                Organisation:
                                <br />
                                <p></p>
                              </label>{" "}
                              <label className="col-sm-3">
                                Designation:
                                <br />
                                <p></p>
                              </label>
                              <label className="col-sm-3">
                                Email:
                                <br />
                                <p></p>
                              </label>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-3">
                                Name of Referee 3:
                                <br />
                                <p></p>
                              </label>
                              <label className="col-sm-3">
                                Organisation:
                                <br />
                                <p></p>
                              </label>{" "}
                              <label className="col-sm-3">
                                Designation:
                                <br />
                                <p></p>
                              </label>
                              <label className="col-sm-3">
                                Email:
                                <br />
                                <p></p>
                              </label>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Fade>
      </>
    );
  }
}
