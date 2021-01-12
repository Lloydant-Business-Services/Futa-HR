import React, { Component } from "react";
import { fetchData, postData, editData, URL } from "../../../utils/crud";
import SaveSpinner from "./SaveSpinner";
import {PushSpinner, ClassicSpinner, MetroSpinner} from "react-spinners-kit"
import {Link, Redirect} from "react-router-dom"


import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import axios from "axios";

class CreateStaffForm extends Component {
  state = {
    // errorCard:true,
    spin: false,
    trig: this.props.trigger,
    staffAdd:false,
    regCard:true,
    stateId: 0,
    lgaId: 0,
    genderId: 0,
    religionId: 0,
    maritalStatusId: 0,
    departmentId: 0,
    appointmentTypeId: 0,
    dateOfConfirmation: "",
    dateOfAppointment: "",
    doB: "",
    surname: "",
    firstName: "",
    otherName: "",
    emailAddress: "",
    courseOfStudy: "",
    phoneNo: "",
    address: "",
    staffNumber: "",
    rankId: 0,
    categoryId: 0,
    appointmentId: 0,
    staffTypeId: 0,
    isConfirmed: true,
    institutionOfQualification: "",
    year: 0,
    qualificationId: 0,
    qualifications: '',
    educationalQualification: [
      {
        id: Math.random(),
        institutionAttended: "",
        course: "",
        graduationYear: 0,
        qualificationObtained: 0,
      },
    ],
  };

  pushMethod = () => {
 
    this.state.editStaff.personEducations.push({
      id: 0,
      personId: 0,
      qualificationId: this.state.qualiId,
      institutionName: this.state.institutionOfQualification,
      courseOfStudy: this.state.courseOfStudy,
      year: this.state.year
    })
   

setTimeout(()=>{
  console.log(this.state.editStaff.personEducations, "EditStaff")

},3000)

let mapEdu = this.state.editStaff.personEducations.map((a,i)=>{
  return{
    instName: a.institutionName,
    courseOfStudy: a.courseOfStudy,
    year: a.year,
    qualificationId: a.qualificationId
  }
})

console.log(mapEdu, "MEEEEEE!!!!!")
this.setState({
  mappedEdu:mapEdu
})

    
  }

  loadStaff = () => {
    fetchData("/Staff", (data) => {
      this.setState({ allStaff: data, allStaffSearch: data });
    });

    setTimeout(() => {
      console.log(this.state.allStaff);
    }, 2000);
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

  loadReligion = () => {
    fetchData("/Religions", (data) => {
      this.setState({ Religions: data });
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
  loadAppointmentType = () => {
    fetchData("/AppointmentType", (data) => {
      this.setState({ appointmentType: data });
    });
    setTimeout(() => {
      console.log(this.state.appointmentType, "Appointment Type!!!!");
    }, 2000);
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


    setTimeout(()=>{
        console.log(this.state.appointments, "Appointments!!")
    },4000)
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
  loadStaffCadre = () => {
    fetchData("/StaffCadre", (data) => {
      this.setState({ staffCadre: data });
    });
  };

  loadStaffCategory = () => {
    fetchData("/InstitutionStaffCategories", (data) => {
      this.setState({ staffCategories: data });
    });
  };
  loadeducationalQualifications = () => {
    fetchData("/EducationalQualifications", data => {
      this.setState({ qualifications: data })
    })
    
  }
  handleAppointment = (e) => {
    this.setState({
      appointmentId: parseInt(e.target.value),
    });
  };

  handleReligion = (e) => {
    this.setState({
      religionId: parseInt(e.target.value),
    });
  };

  //DropDown Handlers

  handleAppointmentType = (e) => {
      let app = document.getElementById("appType")
    app.style.border = "1px solid #8080803b"

    this.setState({
      appointmentTypeId: parseInt(e.target.value),
    });
  };

  handleDepartment = (e) => {
    this.setState({
      departmentId: parseInt(e.target.value),
    });
  };

  handleGender = (e) => {
    this.setState({
      genderId: parseInt(e.target.value),
    });
  };

  handleLGA = (e) => {
    this.setState({
      lgaId: parseInt(e.target.value),
    });
  };

  handleRelationship = (e) => {
    this.setState({
      maritalStatusId: parseInt(e.target.value),
    });
  };

  handleStaffCategory = (e) => {
    this.setState({
      categoryId: parseInt(e.target.value),
    });
  };

  handleStaffType = (e) => {
    this.setState({
      staffTypeId: parseInt(e.target.value),
    });
  };

  handleStateOfOrigin = (e) => {
    this.setState({
      stateId: parseInt(e.target.value),
    });

    setTimeout(() => {
      fetchData(`/Lgas/byStateId?id=${this.state.stateId}`, (data) => {
        this.setState({
          filteredLGA: data,
        });
      });
      console.log(this.state.filteredLGA, "Filtered!!");
    }, 2000);
  };

  handleRank = (e) => {
    this.setState({
      rankId: parseInt(e.target.value),
    });
  };

  handleUnit = (e) => {
    this.setState({
      unitId: parseInt(e.target.value),
    });
    setTimeout(() => {
      fetchData(
        `/InstitutionRanks/GetInstitutionRankBy?unitId=${this.state.unitId}`,
        (data) => {
          this.setState({ tiedRank: data });

          console.log(this.state.tiedRank, "Tied Rank!!");
        }
      );
    }, 2000);
  };
  handleStaffCadre = (e) => {
    this.setState({
      staffCadreId: parseInt(e.target.value),
    });
  };
handleQualificationYear = (e) => {
    this.setState({
        year: parseInt(e.target.value)
    })
}

handleQualificationId = (e) => {
    this.setState({
    qualificationId: parseInt(e.target.value)

    })
}
  handleCreateStaff = (e) => {
    e.preventDefault();
    let surname = document.forms["staffForm"]["surname"].value;
    let firstname = document.forms["staffForm"]["firstname"].value;
    let othername = document.forms["staffForm"]["othername"].value;
    let phoneNo = document.forms["staffForm"]["phoneNumber"].value;
    let emailAdd = document.forms["staffForm"]["email"].value;
    let salCat = document.forms["staffForm"]["salCat"].value;
    let salLvl = document.forms["staffForm"]["salLvl"].value;
    let salStp = document.forms["staffForm"]["salStp"].value;
    if (
      surname == "" ||
      firstname == "" ||
      othername == "" ||
      phoneNo == "" ||
      emailAdd == ""||
      salCat == "" ||
      salLvl == "" ||
      salStp == "" 
    ) {
      alert("Required Fields should not be left empty");
      return false;
    }else if(this.state.appointmentTypeId == 0){
        let app = document.getElementById("appType");
        app.style.border = "2px solid red"
        alert("Please Select Staff Appointment Type")

        return false
    }


    

    // let bto = document.getElementById("btt");
    // bto.setAttribute("disabled", true)
    this.setState({
      spin: true,
      trig: false,
    });
    let currentState = this;
    const newStaff = {
      stateId: this.state.stateId,
      lgaId: this.state.lgaId,
      genderId: this.state.genderId,
      religionId: this.state.religionId,
      maritalStatusId: this.state.maritalStatusId,
      departmentId: this.state.departmentId,
      appointmentTypeId: this.state.appointmentTypeId,
      dateOfConfirmation: this.state.dateOfConfirmation,
      dateOfAppointment: this.state.dateOfAppointment,
      doB: this.state.doB,
      surname: this.state.surname,
      firstName: this.state.firstName,
      otherName: this.state.otherName,
      emailAddress: this.state.emailAddress,
      courseOfStudy: this.state.courseOfStudy || "",
      phoneNo: this.state.phoneNo,
      address: this.state.address,
      staffNumber: this.state.staffNumber,
      rankId: this.state.rankId,
      categoryId: this.state.categoryId,
      appointmentId: this.state.appointmentId,
      staffTypeId: this.state.staffTypeId,
      isConfirmed: true,
      institutionOfQualification: this.state.institutionOfQualification || "",
      year: this.state.year || 0,
      qualificationId: this.state.qualificationId,
      salaryCategoryId: this.state.selectedSalaryCategory,
      salaryLevelId: this.state.selectedSalaryLevel,
      salaryStepId: this.state.selectedSalaryStep
    };

    postData("/Staff/CreateSingleStaff", newStaff, data => {
      console.log(data, "Sent Object")

      if(data > 0){
        currentState.setState({
          spin: false,
          staffAdd: true,
          crearedStaffId: data,
          
          
        });
        // this.props.closeToggle()

      }else{
        currentState.setState({
          spin: false,
          errorCard:true
        });
      }
    })

  };
  closeAdd = () => {
    this.setState({
      staffAdd: false,
    });
  };

  getSalaryCategory = () => {
    fetchData("/SalaryGradeCategory", data => {
      this.setState({salaryCategory:data})
    })
  }

  getSalaryLevel= () => {
    fetchData("/SalaryLevel", data => {
      this.setState({salaryLevel:data})
    })
  }

  getSalaryStep= () => {
    fetchData("/SalaryStep", data => {
      this.setState({salaryStep:data})
    })
  }

  componentDidMount() {
    this.getSalaryCategory();
    this.getSalaryLevel();
    this.getSalaryStep();
    this.loadStaffCategory();
    this.loadStaffCadre();
    this.loadStaffType();
    this.loadUnit();
    this.loadReligion();
    this.loadAppointment();
    this.loadDepartment();
    this.loadRank();
    this.loadGender();
    this.loadLgas();
    this.loadStates();
    this.loadAppointmentType();
    this.loadMaritalStatus();
    this.loadeducationalQualifications();
  }
  closeErrorCard = () =>{
    this.setState({
      errorCard:false
    })
  }

  handleChange = e => {
    if (
      [
        "institutionAttended",
        "course",
        "graduationYear",
        "qualificationObtained",
      ].includes(e.target.name)
    ) {
      let educationalQualification = [...this.state.educationalQualification]
      educationalQualification[e.target.dataset.id][e.target.name] =
        e.target.value
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }

  addNewRow = e => {
    this.setState(prevState => ({
      educationalQualification: [
        ...prevState.educationalQualification,
        {
          id: Math.random(),
          institutionAttended: "",
          graduationYear: "",
          qualificationObtained: "",
          course: "",
        },
      ],
    }))
  }

  closeAddCard = () => {
    this.setState({
      regCard:false
    })
  }


  render() {
    // if(this.state.redirect){
    //   return(
    //     <Redirect to={{
    //       pathname:"/CreatedProfilePreview",
    //       state:{
    //         passedId: this.state.crearedStaffId
    //       }
    //     }}/>
    //   )
    // }

  
    return (
      <>



<Modal isOpen={this.state.errorCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">
             There was an error submitting form. <br/> This could have been caused by an unstable network. Kindly Refresh page and try again
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button className="ok-btn" color={"info"} onClick={this.closeErrorCard}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

        {/* {this.state.spin ? <SaveSpinner msg={"Saving..."} /> : null} */}

        <Modal isOpen={this.state.staffAdd}>
            <ModalBody>
              <ModalHeader className="text-secondary"></ModalHeader>

              <h3 className="text-center">Staff Account was created successfully!</h3>
            </ModalBody>
            <ModalFooter>
              <Button className="ok-btn" color={"info"} onClick={this.closeAdd}>
                OK
              </Button>
            </ModalFooter>
          </Modal>
         
         <Modal isOpen style={{maxWidth:"700px"}}>


          <form name="staffForm" onSubmit={(e) => this.handleCreateStaff(e)} >
            {/* <div className="modal-content mdal2"> */}
            <span style={{float:"right", marginRight:"30px", marginTop:"10px", cursor:"pointer"}} onClick={this.props.closeToggle}>
              X
            </span>
             

              <ModalHeader className="text-secondary">
                Create New Staff
              </ModalHeader>
           
                
              <div className="row card-body">
              <div className="col-md-12">
                  <div className="form-group">
                  <h2>Personal Information</h2>
                  <p className="text-warning"><b>Fields marked with (*) are required fields</b></p>

                  </div>
                </div>
             
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="surname"
                      onChange={(e) => {
                        this.setState({ surname: e.target.value });
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
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstname"
                      onChange={(e) => {
                        this.setState({ firstName: e.target.value });
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
                      Other Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="othername"
                      onChange={(e) => {
                        this.setState({ otherName: e.target.value });
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
                      Date of birth <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="birthDay"
                      onChange={(e) => {
                        this.setState({ doB: e.target.value });
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
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      onChange={(e) => {
                        this.setState({ emailAddress: e.target.value });
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
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="phoneNumber"
                      onChange={(e) => {
                        this.setState({ phoneNo: e.target.value });
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
                      name="state"
                      onChange={this.handleStateOfOrigin}
                      required
                    >
                      <option>Select a state</option>
                      {this.state.states && this.state.states.length > 0
                        ? this.state.states.map((state) => {
                            return (
                              <option key={state.id} value={state.id}>
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
                      name="lgaId"
                      onChange={this.handleLGA}
                      required
                    >
                      <option>Select a Local Government</option>
                      {this.state.filteredLGA &&
                      this.state.filteredLGA.length > 0
                        ? this.state.filteredLGA.map((lga) => {
                            return (
                              <option key={lga.id} value={lga.id}>
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
                      name="gender"
                      onChange={this.handleGender}
                    >
                      <option>Select a Gender</option>
                      {this.state.genders && this.state.genders.length > 0
                        ? this.state.genders.map((gender) => {
                            return (
                              <option key={gender.id} value={gender.id}>
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
                      name="maritalStatusId"
                      onChange={this.handleRelationship}
                    >
                      <option>Select a Relationship Status</option>
                      {this.state.maritalStatus &&
                      this.state.maritalStatus.length > 0
                        ? this.state.maritalStatus.map((status) => {
                            return (
                              <option key={status.id} value={status.id}>
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
                      Religion
                    </label>
                    <select
                      className="form-control"
                      name="maritalStatusId"
                      onChange={this.handleReligion}
                    >
                      <option>Select Religion</option>
                      {this.state.Religions && this.state.Religions.length > 0
                        ? this.state.Religions.map((religion) => {
                            return (
                              <option key={religion.id} value={religion.id}>
                                {religion.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                </div>
              
              
              
              
              
              

            
                {/* <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Institution Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="institutioName"
                      onChange={(e) => {
                        this.setState({ institutionOfQualification: e.target.value });
                      }}
                    />
                  </div>
                </div> */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Highest Qualification Obtained
                    </label>
                    <select
                      className="form-control"
                      name="staffTypeId"
                      onChange={this.handleQualificationId}
                    >
                      <option>Select Qualification</option>
                      {this.state.qualifications && this.state.qualifications.length > 0
                        ? this.state.qualifications.map((types) => {
                            return (
                              <option key={types.id} value={types.id}>
                                {types.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                </div>
               





                <div className="col-md-12">
                  <div className="form-group">
                  <h2>Staff Information</h2>
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
                      name="staffTypeId"
                      onChange={this.handleStaffType}
                    >
                      <option>Select Staff Type</option>
                      {this.state.staffTypes && this.state.staffTypes.length > 0
                        ? this.state.staffTypes.map((types) => {
                            return (
                              <option key={types.id} value={types.id}>
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
                      name="categoryId"
                      onChange={this.handleStaffCategory}
                    >
                      <option>Select a Staff Category</option>
                      {this.state.staffCategories &&
                      this.state.staffCategories.length > 0
                        ? this.state.staffCategories.map((category) => {
                            return (
                              <option key={category.id} value={category.id}>
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
                      Cadre
                    </label>
                    <select
                      className="form-control"
                      name="unitId"
                      onChange={this.handleUnit}
                    >
                      <option>Select Staff Cadre</option>
                      {this.state.units && this.state.units.length > 0
                        ? this.state.units.map((unit) => {
                            return (
                              <option key={unit.id} value={unit.id}>
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
                      name="departmentId"
                      onChange={this.handleDepartment}
                    >
                      <option>Select a Department</option>
                      {this.state.departments &&
                      this.state.departments.length > 0
                        ? this.state.departments.map((department) => {
                            return (
                              <option key={department.id} value={department.id}>
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
                      name="rankId"
                      onChange={this.handleRank}
                    >
                      <option>Select an Rank</option>
                      {this.state.tiedRank && this.state.tiedRank.length > 0
                        ? this.state.tiedRank.map((rank) => {
                            return (
                              <option key={rank.id} value={rank.id}>
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
                      name="appointmentId"
                      onChange={this.handleAppointment}
                    >
                      <option>Select an Appointment</option>
                      {this.state.appointments &&
                      this.state.appointments.length > 0
                        ? this.state.appointments.map((appointment) => {
                            return (
                              <option
                                key={appointment.id}
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
                      Salary Category <span className="text-danger">**</span>
                    </label>
                    <select
                    name="salCat"
                      className="form-control"
                      onChange={(e)=>{this.setState({selectedSalaryCategory: parseInt(e.target.value)})}}
                    >
                      <option>Select Salary Category</option>
                      {this.state.salaryCategory &&
                      this.state.salaryCategory.length > 0
                        ? this.state.salaryCategory.map((salCat) => {
                            return (
                              <option
                                key={salCat.id}
                                value={salCat.id}
                              >
                                {salCat.name}
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
                      Salary Level <span className="text-danger">**</span>
                    </label>
                    <select
                    name="salLvl"
                      className="form-control"
                      onChange={(e)=>{this.setState({selectedSalaryLevel: parseInt(e.target.value)})}}

                    >
                      <option>Select Salary level</option>
                      {this.state.salaryLevel &&
                      this.state.salaryLevel.length > 0
                        ? this.state.salaryLevel.map((salLvl) => {
                            return (
                              <option
                                key={salLvl.id}
                                value={salLvl.id}
                              >
                                {salLvl.name}
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
                      Salary Step <span className="text-danger">**</span>
                    </label>
                    <select
                      name="salStp"

                      className="form-control"
                      onChange={(e)=>{this.setState({selectedSalaryStep: parseInt(e.target.value)})}}

                    >
                      <option>Select Salary Step</option>
                      {this.state.salaryStep &&
                      this.state.salaryStep.length > 0
                        ? this.state.salaryStep.map((step) => {
                            return (
                              <option
                                key={step.id}
                                value={step.id}
                              >
                                {step.name}
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
                      Appointment Type <span className="text-danger">**</span>
                    </label>
                    <select
                    id="appType"
                      className="form-control"
                      name="appointmentTypeId"
                      onChange={this.handleAppointmentType}
                    >
                      <option>Select Appointmen Type</option>
                      {this.state.appointmentType &&
                      this.state.appointmentType.length > 0
                        ? this.state.appointmentType.map((appType) => {
                            return (
                              <option key={appType.id} value={appType.id}>
                                {appType.name}
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
                      Date of Assumption <span className="text-danger">**</span>
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="confirmation"
                      onChange={(e) => {
                        this.setState({ dateOfConfirmation: e.target.value });
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
                      Date of Appointment <span className="text-danger">**</span>
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="birthDay"
                      onChange={(e) => {
                        this.setState({ dateOfAppointment: e.target.value });
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
                      Staff Number
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="staffNumber"
                    //   value={this.state.staffNum}
                      onChange={(e) =>
                        this.setState({ staffNumber: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                <button
                id="btt"
                  type="submit"
                  //   onClick={this.props.closeToggle}
                  data-dismiss="modal"
                  className="btn btn-primary"
                >
          {this.state.spin ? 
          <MetroSpinner
          size={40}
          color={"white"}
          loading={this.state.loading}
          
          
        />  
        : "Submit"}
                  
                </button>
              </div>
              </div>
              </div>
              
            {/* </div> */}
          </form>
          </Modal>
      </>
    );
  }
}
export default CreateStaffForm;
