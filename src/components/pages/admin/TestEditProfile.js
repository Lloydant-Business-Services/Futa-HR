import React, { Component } from "react";
import { render } from "react-dom";
import { fetchData, postData, editData, deleteData, URL, editDataWithPatch } from "../../../utils/crud";
// import { navigate } from "gatsby"
import axios from "axios";
// import Spinner from "./Spinner"
import { Link, Redirect } from "react-router-dom";
import Layout from "../../layout";
import SideBar from "../../NewSideBar";
import AdminFooter from "../admin/AdminFooter";
import { PushSpinner, ClassicSpinner, MetroSpinner } from "react-spinners-kit";
import Spinner from "./Spinner";
import checkIcon2 from "../../../images/confirmIcon.png"



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
  Alert,
} from "reactstrap";

class EditApplicantProfile extends Component {
  state = {
      importedId: this.props.location.state.data,
      editStaff: {
        newStaff: {
          personId: "",
          staffNumber: "",
          generatedStaffNumber: "",
          person: {
            imageUrl: null,
            surname: "",
            firstname: "",
            othername: "",
            birthDay: "",
            email: "",
            address: "",
            phoneNumber: "",
            stateId: "",
            lgaId: "",
            maritalStatusId: "",
            religionId: "",
            genderId: "",
            state: "",
            lga: "",
            maritalStatus: null,
            religion: null,
            gender: null,
            personEducations: null,
            personProfessionalBodies: null,
            personJournals: null,
            personExperiences: null,
            personResearchGrants: null,
            personCertifications: null,
            personReferees: null,
            id: 0,
          },
          rankId: "",
          departmentId: "",
          appointmentId: "",
          rank: {
            name: "",
            active: true,
            institutionUnitId: 0,
            institutionUnit: {
              name: "",
              active: true,
              id: 0,
            },
            gradeLevel: "",
            id: 0,
          },
          department: {
            name: "",
            active: true,
            id: 2,
          },
          appointment: null,
          staffTypeId: "",
          staffType: {
            name: "",
            active: true,
            id: 0,
          },
          categoryId: "" || 0,
          category: {
            name: "",
            active: false,
            id: 0,
          },
          active: true,
          retirementReason: null,
          appointmentIsConfirmed: true,
          appointmentDate: "2020-06-17T00:00:00",
          dateOfRegularization: null,
          dateOfConfirmation: "2020-06-08T00:00:00",
          appointmentTypeId: 0,
          appointmentType: {
            name: "",
            active: true,
            id: 0,
          },
          id: 0,
        },
        personEducations: [
    
        ],
      },
    // staff: this.props.location.state?.data,
    // staffId: this.props.location.state?.data.id,
    compoTitle: this.props.location.state.compoTitle,
    // msg: this.props.location.msg,
    loading: false,
    staffDto: "",
    // educationState:""
    // errorCard:true
  };

  educationMapper = () => {};

  isValidInputs = () => {
    var phoneno = /\d{11}$/;
    if (this.state.staff.person.phoneNumber === null) {
      this.setState({
        confirmRegularization: false,
      });
      alert("Enter a valid Phone Number");
      return false;
    }

    // return true
  };

  updatePersonItem = (index, value) => {
    const { staff } = this.state;
    staff.staffDto[index] = value;
    this.setState({ ...this.state, staff });
  };

  // updatePersonItem = (index, value) => {
  //   const { staff } = this.state
  //   staff.editStaff[index] = value
  //   this.setState({ ...this.state, staff })
  // }

  updateStaff = (property, value) => {
    let state = this.state.editStaff.newStaff.person;
    this.setState({
      ...this.state,
      ...(state[property] = value),
    });
  };

  updateStaffDetails = (property, value) => {
    let state = this.state.editStaff.newStaff;
    this.setState({
      ...this.state,
      ...(state[property] = value),
    });
  };

  loadStates = () => {
    fetchData("/States", (data) => {
      this.setState({ states: data });
    });
  };

  handleStateOfOrigin = (e) => {
    this.setState({
      stateOfOriginId: parseInt(e.target.value),
    });

    setTimeout(() => {
      fetchData(`/Lgas/byStateId?id=${this.state.stateOfOriginId}`, (data) => {
        this.setState({
          filteredLGA: data,
        });
      });
      console.log(this.state.filteredLGA, "Filtered!!");
    }, 2000);
  };
  handleLGA = (e) => {
    this.setState({
      selectedLGA: parseInt(e.target.value),
    });
  };
  handleReligion = (e) => {
    this.setState({
      religionId: parseInt(e.target.value),
    });
  };
  handleMaritalStatus = (e) => {
    this.setState({
      maritalStatusId: parseInt(e.target.value),
    });
  };
  handleGender = (e) => {
    this.setState({
      genderId: parseInt(e.target.value),
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
  loadeducationalQualifications = () => {
    fetchData("/EducationalQualifications", (data) => {
      this.setState({ educationalQualifications: data });
    });
  };
  loadStaffCategory = () => {
    fetchData("/InstitutionStaffCategories", (data) => {
      this.setState({ staffCategories: data });
    });
  };

  loadStaff = () => {
    fetchData(`/Staff/GetStaffUpdate?id=${this.state.importedId}`, (data) => {
      let mappedEducation = data.personEducations.map((s, index) => {
        return {
          id: s.id,
          institutionName: s.institutionName,
          courseOfStudy: s.courseOfStudy,
          year: s.year,
          qualificationId: s.qualificationId,
        };
      });
      var mee = JSON.stringify(mappedEducation);

      console.log(mappedEducation, "Educations");
      console.log(mee, "MEEEEE");

      this.setState({
        educationState: mappedEducation,
        educationStateId: mappedEducation[0].id,
        mappedQualificationId: mappedEducation[0].qualificationId,
        main: data,
      });

    
      setTimeout(() => {
        // console.log(this.state.editStaff.personEducations, "pushed")

        console.log(this.state.educationState, "Educations State");
        console.log(this.state.educationStateId, "Educations State ID!!!");
        console.log(this.state.mappedQualificationId, "Qualification ID!!!");

      
      }, 3000);

      setTimeout(() => {
        console.log(this.state.educationState, "New fetch Staff!!!!!!!!!");
        console.log(data, " StaffoooO!!!!");
      }, 5000);
    });
  };

  updateForm = () => {
    let newState = this;
    this.setState({
      loading: true,
      confirmRegularization: false,
      confirmRegularization2: false,
    });
    let updateState = this.state.editStaff.newStaff.person;
    let updateState1 = this.state.editStaff.newStaff;

    let updatedStaff = {
      staff: {
        personId: this.state.staff.personId,
        staffNumber: updateState1.staffNumber,
        generatedStaffNumber: this.state.staff.generatedStaffNumber,
        person: {
          imageUrl: null,
          surname: updateState.surname,
          firstname: updateState.firstname,
          othername: updateState.othername,
          birthDay: updateState.birthDay,
          email: updateState.email,
          address: updateState.address,
          phoneNumber: updateState.phoneNumber,
          stateId: null,
          lgaId: parseInt(updateState.lgaId),
          maritalStatusId: parseInt(updateState.maritalStatusId),
          religionId: parseInt(updateState.religionId),
          genderId: parseInt(updateState.genderId),
          state: null,
          lga: null,
          maritalStatus: null,
          religion: null,
          gender: null,
          personEducations: null,
          personProfessionalBodies: null,
          personJournals: null,
          personExperiences: null,
          personResearchGrants: null,
          personCertifications: null,
          personReferees: null,
          id: parseInt(this.state.importedId),
        },
        rankId: parseInt(updateState1.rankId),
        departmentId: parseInt(updateState1.departmentId),
        appointmentId: parseInt(updateState1.appointmentId),
        rank: {
          name: "null",
          active: true,
          institutionUnitId: parseInt(updateState1.rank.institutionUnitId),
          institutionUnit: {
            name: "",
            active: true,
            id: parseInt(updateState1.rank.institutionUnitId),
          },
          gradeLevel: "",
          id: 0,
        },
        department: {
          name: "",
          active: true,
          id: 0,
        },
        appointment: null,
        staffTypeId: parseInt(updateState1.staffTypeId) || 2,
        staffType: {
          name: "",
          active: true,
          id: parseInt(updateState1.staffTypeId) || 2,
        },
        categoryId: parseInt(updateState1.categoryId) || 1,
        category: {
          name: "",
          active: true,
          id: parseInt(updateState1.categoryId) || 1,
        },
        active: true,
        retirementReason: null,
        appointmentIsConfirmed: true,
        appointmentDate: "2020-06-17T00:00:00",
        dateOfRegularization: null,
        dateOfConfirmation: "2020-06-08T00:00:00",
        appointmentTypeId: 1,
        appointmentType: {
          name: "Regular",
          active: true,
          id: 1,
        },
        id: this.state.importedId,
      },
      personEducations: [
        {
          id: parseInt(this.state.educationStateId) || 0,
          personId: parseInt(this.state.importedId),
          qualificationId: parseInt(this.state.qualiId) || this.state.mappedQualificationId,
          institutionName: "null",
          courseOfStudy: "null",
          year: 0,
        },
      ],
    };

    axios({
      method: "PATCH",
      url: URL + `/Staff/PostStaffUpdate?id=${this.state.importedId}`,
      data: updatedStaff,
      config: {
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-credentials": "true",
          // "access-control-allow-origin": "http://97.74.6.243",
        },
      },
    })
      .then((res) => {
        newState.setState({
          upd: true,
          loading: false,
        });
        // newState.componentDidMount();
        console.log(res, "Response");
      })
      .catch((err) => {
        newState.setState({
          loading: false,
          errorCard: true,
        });
        // alert("Error Submitting Form")

        console.log(err);
      });
  };

  updateStaffItem = (index, value) => {
    const { staff } = this.state;
    staff[index] = value;
    this.setState({ ...this.state, staff });
  };

  handleRegularization2 = (e) => {
    e.preventDefault();
    this.setState({
      spin: true,
      confirmRegularization: false,
    });

  



    const newState = this;

    // const regStaff = {
    //   staffId: parseInt(this.state.staff.id),
    //   appointmentTypeId: 1,
    // };

    let updateState = this.state.editStaff.newStaff.person;
    let updateState1 = this.state.editStaff.newStaff;

    
    let updatedStaff = {
      staff: {
        personId: this.state.staffId,
        staffNumber: updateState1.staffNumber,
        generatedStaffNumber: this.state.staff.generatedStaffNumber,
        person: {
          imageUrl: null,
          surname: updateState.surname,
          firstname: updateState.firstname,
          othername: updateState.othername,
          birthDay: updateState.birthDay,
          email: updateState.email,
          address: updateState.address,
          phoneNumber: updateState.phoneNumber,
          stateId: null,
          lgaId: parseInt(updateState.lgaId),
          maritalStatusId: parseInt(updateState.maritalStatusId),
          religionId: parseInt(updateState.religionId),
          genderId: parseInt(updateState.genderId),
          state: null,
          lga: null,
          maritalStatus: null,
          religion: null,
          gender: null,
          personEducations: null,
          personProfessionalBodies: null,
          personJournals: null,
          personExperiences: null,
          personResearchGrants: null,
          personCertifications: null,
          personReferees: null,
          id: parseInt(this.state.staffId),
        },
        rankId: parseInt(updateState1.rankId),
        departmentId: parseInt(updateState1.departmentId),
        appointmentId: parseInt(updateState1.appointmentId),
        rank: {
          name: "null",
          active: true,
          institutionUnitId: parseInt(updateState1.rank.institutionUnitId),
          institutionUnit: {
            name: "",
            active: true,
            id: parseInt(updateState1.rank.institutionUnitId),
          },
          gradeLevel: "",
          id: 0,
        },
        department: {
          name: "",
          active: true,
          id: 0,
        },
        appointment: null,
        staffTypeId: parseInt(updateState1.staffTypeId) || 2,
        staffType: {
          name: "",
          active: true,
          id: parseInt(updateState1.staffTypeId) || 2,
        },
        categoryId: parseInt(updateState1.categoryId) || 3,
        category: {
          name: "",
          active: true,
          id: parseInt(updateState1.categoryId) || 3,
        },
        active: true,
        retirementReason: null,
        appointmentIsConfirmed: true,
        appointmentDate: "2020-06-17T00:00:00",
        dateOfRegularization: null,
        dateOfConfirmation: "2020-06-08T00:00:00",
        appointmentTypeId: 1,
        appointmentType: {
          name: "Regular",
          active: true,
          id: 1,
        },
        id: this.state.staffId,
      },
      personEducations: [
        {
          id: parseInt(this.state.educationStateId) || 0,
          personId: parseInt(this.state.staffId),
          qualificationId: parseInt(this.state.qualiId) || this.state.mappedQualificationId,
          institutionName: "null",
          courseOfStudy: "null",
          year: 0,
        },
      ],
    };

    editDataWithPatch(`/Staff/PostStaffUpdate?id=${this.state.importedId}`, updatedStaff, data => {
          console.log(data, "Patch!!")
      const regStaff = {
        staffId: parseInt(this.state.staff.id),
        appointmentTypeId: 1,
      };
  
  
      editData("/Staff/RegularizeStaff", regStaff, data => {
        if(data == 200){
          newState.setState({
            staffRegu: true,
            spinn: false,
          });
        }else{
          newState.setState({
            spinn: false,
          });
          // alert("Error Submitting Form")
          newState.setState({
            errorCard: true,
          });

        }
      })
  
      // axios({
      //   method: "PUT",
      //   url: URL + "/Staff/RegularizeStaff",
      //   data: regStaff,
      //   config: {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   },
  
        
      // })
      //   .then((res) => {
      //     newState.componentDidMount();
         
  
      //     newState.setState({
      //       staffRegu: true,
      //       spinn: false,
      //     });
      //     console.log(res, "Response");
      //   })
      //   .catch((err) => {
      //     newState.setState({
      //       spinn: false,
      //     });
      //     newState.setState({
      //       errorCard: true,
      //     });
      //     console.log(err);
      //   });

    })

    
   
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
  showConfirmCard = () => {
    this.setState({
      confirmRegularization: true,
    });
  };
  closeExistToggle = () => {
    this.setState({
      confirmRegularization: false,
    });
  };
  closeReg = () => {
    this.setState({
      staffRegu: false,
      confirmRegularization: false,
      upd: false,
    });
  };

  pushMethod = () => {
    this.state.editStaff.personEducations.push({
      id: 0,
      personId: 0,
      qualificationId: this.state.qualiId,
      institutionName: this.state.institutionOfQualification,
      courseOfStudy: this.state.courseOfStudyPick,
      year: this.state.yearNew,
    });

    alert("Added");
    var dis = document.getElementById("boot");
    dis.setAttribute("disabled", true);
    setTimeout(() => {
      console.log(this.state.editStaff.personEducations, "EditStaff");
    }, 3000);

    let mapEdu = this.state.editStaff.personEducations.map((a, i) => {
      return {
        instName: a.institutionName,
        courseOfStudy: a.courseOfStudy,
        year: a.year,
        qualificationId: a.qualificationId,
      };
    });

    console.log(mapEdu, "MEEEEEE!!!!!");
    this.setState({
      mappedEdu: mapEdu,
    });
  };

  handleQualificationId = (e) => {
    this.setState({
      qualiId: parseInt(e.target.value),
      realId: this.state.educationState,
    });
    setTimeout(() => {
      console.log(this.state.realId, "Real!!!!sss");
    }, 2000);
  };

  handleYear = (e) => {
    this.setState({
      yearNew: parseInt(e.target.value),
    });
  };

  showConfirmCard2 = () => {
    this.setState({
      confirmRegularization2: true,
    });
  };

  componentDidMount() {
    if (!localStorage.getItem("userData")) {
      this.setState({
        userRedirect: true,
      });
    }else{
        this.setState({spin:true})
      setTimeout(() => {
        console.log(this.state.staff, "Transfered Staff!!!");
        console.log(this.state.staffId, "StaffIDDDD!!!");
        this.getSalaryCategory();
        this.getSalaryLevel();
        this.getSalaryStep();

fetchData(`/StaffSalaryCategoryReference/ByStaffId?staffId=${this.state.importedId}`, data => {
  console.log(data, "Salry")
  this.setState({
    staffSalary:data
  })
})
        fetchData(`/Staff/${this.state.importedId}`, data => {
            console.log(data, "Operational Data")
            this.setState({
                staff: data,
                editStaff: {
                    newStaff: {
                      personId: data.personId,
                      staffNumber: data.staffNumber,
                      generatedStaffNumber: "",
                      person: {
                        imageUrl: null,
                        surname: data.person.surname,
                        firstname: data.person.firstname,
                        othername: data.person.othername,
                        birthDay: data.person.birthDay,
                        email: data.person.email,
                        address: data.person.address,
                        phoneNumber: data.person.phoneNumber,
                        stateId: null,
                        lgaId: data.person.lgaId,
                        maritalStatusId: data.person.maritalStatusId,
                        religionId: "",
                        genderId: data.person.genderId,
                        state: "",
                        lga: "",
                        maritalStatus: data.person.maritalStatusId,
                        religion: data.person.religionId,
                        gender: data.person.genderId,
                        personEducations: null,
                        personProfessionalBodies: null,
                        personJournals: null,
                        personExperiences: null,
                        personResearchGrants: null,
                        personCertifications: null,
                        personReferees: null,
                        id: 0,
                      },
                      rankId: data.rankId,
                      departmentId: data.departmentId,
                      appointmentId: data.appointmentId,
                      rank: {
                        name: "",
                        active: true,
                        institutionUnitId: 0,
                        institutionUnit: {
                          name: "",
                          active: true,
                          id: 0,
                        },
                        gradeLevel: "",
                        id: 0,
                      },
                      department: {
                        name: "",
                        active: true,
                        id: 2,
                      },
                      appointment: null,
                      staffTypeId: data.staffTypeId,
                      staffType: {
                        name: "",
                        active: true,
                        id: 0,
                      },
                      categoryId: data.categoryId || 0,
                      category: {
                        name: "",
                        active: false,
                        id: 0,
                      },
                      active: true,
                      retirementReason: null,
                      appointmentIsConfirmed: true,
                      appointmentDate: "2020-06-17T00:00:00",
                      dateOfRegularization: null,
                      dateOfConfirmation: "2020-06-08T00:00:00",
                      appointmentTypeId: 0,
                      appointmentType: {
                        name: "",
                        active: true,
                        id: 0,
                      },
                      id: 0,
                    },
                    personEducations: [
                
                    ],
                  },

            })
            this.setState({spin:false})

            console.log(this.state.editStaff, "Editoooo")  


        



            fetchData(
                `/InstitutionRanks/GetInstitutionRankBy?unitId=${data.rank.institutionUnitId}`,
                (data) => {
                  console.log(data, "ranko!!");
        
                  this.setState({
                    tiedRank: data,
                  });
                }
              );
            
        
            
                fetchData(
                  `/Lgas/byStateId?id=${data.person.lga.stateId}`,
                  (data) => {
                    console.log(data, "statooo!!");
          
                    this.setState({
                      filteredLGA: data,
                    });
                  }
                );

           
              
            //   fetchData(
            //     `/Lgas/byStateId?id=${data.person.lga.stateId}`,
            //     (data) => {
            //       console.log(data, "filtered!!");
        
            //       this.setState({
            //         filteredLGA: data,
            //       });
            //     }
            //   );
        })
  
        fetchData(
          `/EducationalQualifications/${this.state.mappedQualificationId}`,
          (data) => {
            console.log(data, "Qualification Query");
          }
        );
      }, 3000);
  
      this.loadStaff();
  
   
       
  
   
        // fetchData(
        //   `/Lgas/byStateId?id=${this.state.staff.person.lga.stateId}`,
        //   (data) => {
        //     console.log(data, "filtered!!");
  
        //     this.setState({
        //       filteredLGA: data,
        //     });
        //   }
        // );
      
  
      console.log(this.state.staff, "WWWW!!");
      console.log(this.state.compoTitle, "Compo!!");
      this.loadStates();
      this.loadLgas();
      this.loadMaritalStatus();
      this.loadGender();
      this.loadRank();
      this.loadDepartment();
      this.loadAppointment();
      this.loadUnit();
      this.loadStaffType();
      this.loadStaffCategory();
      this.loadeducationalQualifications();
     
    }

    
  }

  closeErrorCard = () => {
    this.setState({
      errorCard: false,
    });
  };
  closeExistToggle = () => {
    this.setState({
      confirmRegularization2: false,
      confirmRegularization: false,
    });
  };
  addNewRow = () => {
    this.setState({
      addEducation: true,
    });
  };

  loadeducationalQualifications = () => {
    fetchData("/EducationalQualifications", (data) => {
      this.setState({ qualifications: data });
    });
  };

  handleRegularization = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      confirmRegularization2: false,
    });
    const newState = this;

    const regStaff = {
      staffId: parseInt(this.state.staff.id),
      appointmentTypeId: 1,
    };

    editData("/Staff/RegularizeStaff", regStaff, data => {
      if(data == 200){
        newState.updateForm();

        newState.setState({
          staffRegu: true,
          spinn: false,
        });
      }else{
        newState.setState({
          spinn: false,
        });
        // alert("Error Submitting Form")
        newState.setState({
          errorCard: true,
        });

      }
    })

  };

  saveSalaryDetails = () => {

    var getBtn = document.getElementById("sub-btn");
    getBtn.setAttribute("disabled", true)
    this.setState({savingStatus:true})
    let salaryPayload = {
      staffId: this.state.importedId,
      salaryCategoryId: this.state.selectedSalaryCategory,
      salaryLevelId: this.state.selectedSalaryLevel,
      salaryStepId: this.state.selectedSalaryStep,
    }
    postData(`/StaffSalaryCategoryReference?staffId=${this.state.importedId}`, salaryPayload, data => {
      console.log(data, "response")
      if(data == 200){
        this.componentDidMount();
    this.setState({savingStatus:false, salaryCard:false})

        alert("Saved")
      }else{
        alert("oops! Not saved")
      }
    })
  }

  getSalaryCategory = () => {
    fetchData(`/SalaryGradeCategory`, data => {
      this.setState({salaryCategoryLoad:data})
      console.log(this.state.salaryCategoryLoad, "Cat Load")
    })
  }

  getSalaryLevel = () => {
    fetchData(`/SalaryLevel`, data => {
      this.setState({salaryLevelLoad:data})
    })
  }

  getSalaryStep = () => {
    fetchData(`/SalaryStep`, data => {
      this.setState({salaryStepLoad:data})
    })
  }

  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <div>
          {this.state.spin ? <Spinner/> : null}
        <Modal isOpen={this.state.errorCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">
              There was an error submitting form. <br /> This could have been
              caused by an unstable network. Kindly Refresh page and try again
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"info"}
              onClick={this.closeErrorCard}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        {/* {this.state.spinn ? <Spinner/> : null} */}
        <Modal isOpen={this.state.staffRegu} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>
            <div className="row justify-content-center">
              <img src={checkIcon2} style={{width:"50px"}}/>
              </div>
            <h3 className="text-center sofia">
              Staff Regularization was Successful!
            </h3>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-primary" onClick={this.closeReg}>
              OK
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.upd} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>
            <div className="row justify-content-center">
              <img src={checkIcon2} style={{width:"50px"}}/>
              </div>
            <h3 className="text-center sofia">Staff Update was Successful!</h3>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-primary" onClick={this.closeReg}>
              OK
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.confirmRegularization2} className="mdal">
          <ModalBody>
            <ModalHeader id="clBtn" className="text-secondary">
              <Button onClick={this.closeExistToggle}>X</Button>
            </ModalHeader>

            <form>
              <b className="sofia">How do you wish to proceed?</b>
            </form>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-outline-primary sofia"
              onClick={() => this.updateForm()}
            >
              Save Update <i className="fa fa-save"/>
            </button>
            <button
              className="btn btn-outline-warning sofia"
              onClick={(e) => this.handleRegularization(e)}
            >
              Save and Regularize <i className="fa fa-check"/>
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.errorCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <h3 className="text-center">
              There was an error submitting form. <br /> This could have been
              caused by an unstable network. Kindly Refresh page and try again
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"info"}
              onClick={this.closeErrorCard}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

        {/* {this.state.spinn ? <Spinner /> : null} */}
        <Modal isOpen={this.state.upd} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>
            <div className="row justify-content-center">
              <img src={checkIcon2} style={{width:"50px"}}/>
              </div>
            <h3 className="text-center sofia">Staff Update was Successful!</h3>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-primary" onClick={this.closeReg}>
              OK
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.confirmRegularization} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"></ModalHeader>

            <form>
              <b className="sofia">Are you sure?</b>
            </form>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-outline-primary"
              onClick={() => this.updateForm()}
            >
              Confirm
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={this.closeExistToggle}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        {/* <SideBar/> */}

        {/* <div id="dashboard">
        



        <div class="dashboard-content"> */}
        <h1>Edit Staff Profile</h1>

        {/* edit here */}
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-bottom">
              <div className="modal-body">
                <div className="row">
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
                        type="text"
                        name="surname"
                        defaultValue={this.state.staff?.person?.surname}
                        // onChange={e => {
                        //   this.updatePersonItem("surname", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("surname", el.target.value)
                        }

                        // onChange={e => {
                        //   this.updatePersonItem("surname", e.target.value)
                        // }}

                        // onChange={(e) => {
                        //   this.setState({ surname: e.target.value });
                        // }}
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
                        name="firstname"
                        defaultValue={this.state.staff?.person?.firstname}
                        // onChange={e => {
                        //   this.updatePersonItem("firstname", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("firstname", el.target.value)
                        }
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
                        type="text"
                        name="othername"
                        defaultValue={this.state.staff?.person?.othername}
                        // onChange={e => {
                        //   this.updatePersonItem("othername", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("othername", el.target.value)
                        }
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
                        type="date"
                        name="birthDay"
                        defaultValue={
                          this.state.staff?.person.birthDay
                            ? this.state.staff?.person?.birthDay.substring(0, 10)
                            : ""
                        }
                        // onChange={e => {
                        //   this.updatePersonItem("birthDay", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("birthDay", el.target.value)
                        }
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
                        required
                        name="email"
                        defaultValue={this.state.staff?.person?.email}
                        // onChange={e => {
                        //   this.updatePersonItem("email", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("email", el.target.value)
                        }
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
                        required
                        name="phoneNumber"
                        defaultValue={this.state.staff?.person?.phoneNumber}
                        onChange={(e) => {
                          this.updateStaff("phoneNumber", e.target.value);
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
                        defaultValue={this.state.staff?.person?.address}
                        onChange={(el) =>
                          this.updateStaff("address", el.target.value)
                        }
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
                                <option
                                  key={state.id}
                                  selected={state.id == this.state.staff?.person?.lga?.stateId}
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
                        name="lgaId"
                        // onChange={e => {
                        //   this.updatePersonItem(
                        //     "lgaId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        // onChange={this.handleLGA}
                        onChange={(el) =>
                          this.updateStaff("lgaId", el.target.value)
                        }
                        required
                      >
                        <option>Select a Local Government</option>
                        {this.state.filteredLGA &&
                        this.state.filteredLGA.length > 0
                          ? this.state.filteredLGA.map((lga) => {
                              return (
                                <option
                                  key={lga.id}
                                  selected={
                                    lga.id == this.state.staff?.person?.lgaId
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
                        name="gender"
                        // onChange={e => {
                        //   this.updatePersonItem(
                        //     "genderId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        onChange={(el) =>
                          this.updateStaff("genderId", el.target.value)
                        }
                      >
                        <option>Select a Gender</option>
                        {this.state.genders && this.state.genders.length > 0
                          ? this.state.genders.map((gender) => {
                              return (
                                <option
                                  key={gender.id}
                                  selected={
                                    gender.id ==
                                    this.state.staff?.person?.genderId
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
                        name="maritalStatusId"
                        // onChange={e => {
                        //   this.updatePersonItem(
                        //     "maritalStatusId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        onChange={(el) =>
                          this.updateStaff("maritalStatusId", el.target.value)
                        }
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
                                    this.state.staff?.person?.maritalStatusId
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

                  {/* <div className="col-md-12">
                  <div className="form-group">
                    <h2>Educational Qualification</h2>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <table className="table table-striped" >
                      <th>Institution Name</th>
                      <th>Course of Study</th>
                      <th>Year Obtained</th>
                   {this.state.educationState && this.state.educationState.map((i,s) =>{
                     return(
                       <tr >
                     <td><h4>{i.institutionName}</h4></td>
                     <td><h4>{i.courseOfStudy}</h4></td>
                     <td><h4>{i.year}</h4></td>

                     </tr>
                     )
                   })}
                   </table>
                  </div>
                  <table className="table table-striped" >
                  {this.state.mappedEdu && this.state.mappedEdu.map((w, p)=>{
                    return(
                      <tr>
                    <td>-</td>
                    <td>{w.instName} </td>
                   <td>{w.courseOfStudy}</td>
                   <td>{w.year}</td>
                     </tr>

                    )
                  })}
                  </table>
                  <div className="col-md-6">
            <button
              className="btn btn-icon btn-3 btn-primary btn-sm"
              type="button"
              onClick={this.addNewRow}
            >
              <span className="btn-inner--icon">
                <i className="fa fa-plus" />
              </span>
              <span className="btn-inner--text">Add qualification</span>
            </button>
          </div>
                </div> */}

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
                      required
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
                        {this.state.qualifications &&
                        this.state.qualifications.length > 0
                          ? this.state.qualifications.map((types) => {
                              return (
                                <option
                                  key={types.id}
                                  value={types.id}
                                  selected={
                                    types.id == this.state.mappedQualificationId
                                  }
                                >
                                  {types.name}
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
                      Course of Study
                    </label>
                    <input

                    required
                      className="form-control"
                      type="text"
                      name="Course of Study"
                      onChange={(e) => {
                        this.setState({ courseOfStudy: e.target.value });
                      }}
                    />
                  </div>
                </div> */}

                  {/* <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Year Obtained
                    </label>
                    <input
                    required
                      className="form-control"
                      type="text"
                      name="Course of Study"
                      onChange={(e) => {
                        this.setState({ yearNew: e.target.value });
                      }}
                    />
                  </div>
                </div> */}

                  {/* <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Year Obtained
                    </label>
                    <select
                      className="form-control"
                      name="Year"
                      onChange={
                     this.handleYear}
                    >
                      <option>Select Year</option>
                      <option value="2015">2015</option>
                      <option>2016</option>
                      <option>2017</option>
                      <option>2018</option>
                      <option>2019</option>
                      <option>2020</option>
                    
                      
                    </select>
                  </div>
                </div> */}
                  {/* <button className="btn btn-success" id="boot" onClick={this.pushMethod}>Add</button> */}

                  {/* <button className="btn btn-primary-sm">Add Educational Qualification</button> */}

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
                        // onChange={e => {
                        //   this.updateStaffItem(
                        //     "staffTypeId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        onChange={(el) =>
                          this.updateStaffDetails(
                            "staffTypeId",
                            el.target.value
                          )
                        }
                      >
                        <option>Select Staff Type</option>
                        {this.state.staffTypes &&
                        this.state.staffTypes.length > 0
                          ? this.state.staffTypes.map((types) => {
                              return (
                                <option
                                  key={types.id}
                                  selected={
                                    types.id == this.state.staff?.staffTypeId
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
                        name="categoryId"
                        // onChange={e => {
                        //   this.updateStaffItem(
                        //     "categoryId",
                        //     parseInt(e.target.value)
                        //   )
                        // }}
                        onChange={(el) =>
                          this.updateStaffDetails("categoryId", el.target.value)
                        }
                      >
                        <option>Select a Staff Category</option>
                        {this.state.staffCategories &&
                        this.state.staffCategories.length > 0
                          ? this.state.staffCategories.map((category) => {
                              return (
                                <option
                                  key={category.id}
                                  selected={
                                    category.id == this.state.staff?.categoryId
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
                                <option
                                  key={unit.id}
                                  selected={
                                    unit.id == this.state.staff?.rank?.institutionUnitId
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
                        name="departmentId"
                        onChange={(el) =>
                          this.updateStaffDetails(
                            "departmentId",
                            el.target.value
                          )
                        }
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
                                    this.state.staff?.departmentId
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
                        name="rankId"
                        onChange={(el) =>
                          this.updateStaffDetails("rankId", el.target.value)
                        }
                      >
                        <option>Select an Rank</option>
                        {this.state.tiedRank && this.state.tiedRank.length > 0
                          ? this.state.tiedRank.map((rank) => {
                              return (
                                <option
                                  key={rank.id}
                                  selected={rank.id == this.state.staff?.rankId}
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
                        name="appointmentId"
                        onChange={(el) =>
                          this.updateStaffDetails(
                            "appointmentId",
                            el.target.value
                          )
                        }
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
                                    this.state.staff?.appointmentId
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
                        Salary Grade Level
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        required
                        name="email"
                        disabled
                        value={this.state.staffSalary ? (this.state.staffSalary?.salaryCategory + " " + this.state.staffSalary?.salaryLevel + ", " + this.state.staffSalary?.salaryStep) : "-"}
                        // onChange={e => {
                        //   this.updatePersonItem("email", e.target.value)
                        // }}
                        onChange={(el) =>
                          this.updateStaff("email", el.target.value)
                        }
                      />
                       <button className="btn btn-warning btn-sm" onClick={() => {this.setState({salaryCard:true})}}>
                        <i className="fa fa-edit"/>
                      </button>
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
                        defaultValue={this.state.staff?.staffNumber}
                        onChange={(e) => {
                          this.updateStaffDetails(
                            "staffNumber",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <MetroSpinner
                  size={40}
                  color={"blue"}
                  loading={this.state.loading}
                />

                {!this.state.loading && this.state.compoTitle == "Staff" ? (
                  <div>
                    {" "}
                    <button
                      type="button"
                      onClick={this.showConfirmCard}
                      data-dismiss="modal"
                      className="btn btn-outline-primary"
                    >
                      Submit
                    </button>
                    <Link to={"/Staff"} className="btn btn-outline-danger">

                      Back
                    </Link>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <button
                      type="button"
                      onClick={this.showConfirmCard2}
                      data-dismiss="modal"
                      className="btn btn-outline-primary"

                    >
                      Submit
                    </button>
                    <Link to={"/Staff"} className="btn btn-outline-danger">

                      Back
                    </Link>
                  </div>
                )}
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>

        {/* </div>
      </div> */}
        <div>
          {/* {this.state.educationState && this.state.educationState.map((t,p)=>{
          return(
                   <input id="eduId" hidden type="text" value={t.id}/>

          )
        })} */}

          {/* <input id="eduId" type="text" value={0}/> */}
        </div>
        {/* <AdminFooter/> */}

        <Modal isOpen={this.state.salaryCard}>
          <ModalBody>
            <div className="modal-header border-bottom">
              <h4 className="mb-0" id="exampleModalScrollableTitle">
              Staff Salary Category
              </h4>
              <button
                type="button"
                className="close"
                onClick={() => {
                  this.setState({ salaryCard: false });
                }}
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
                   Salary Category
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedSalaryCategory: parseInt(e.target.value) });
                    }}
                  >
                    <option
                    >Select Salary Category</option>

                    {this.state.salaryCategoryLoad &&
                      this.state.salaryCategoryLoad.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selectedSalaryCategory}
                        
                        >{type.name}</option>
                      ))}
                  </select>
                  </div>

                  <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   Salary Level
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedSalaryLevel: parseInt(e.target.value) });
                    }}
                  >
                    <option
                    >Select Salary Level</option>

                    {this.state.salaryLevelLoad &&
                      this.state.salaryLevelLoad.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selectedSalaryLevel}
                        
                        >{type.name}</option>
                      ))}
                  </select>
                  </div>

                  <div className="form-group">
                  <label
                    htmlFor="example-text-input"
                    className="form-control-label"
                  >
                   Salary Step
                  </label>

                  <select
                    className="form-control col-12"
                    onChange={(e) => {
                      this.setState({ selectedSalaryStep: parseInt(e.target.value) });
                    }}
                  >
                    <option
                    >Select Salary Step</option>

                    {this.state.salaryStepLoad &&
                      this.state.salaryStepLoad.map((type, i) => (
                        <option value={type.id}
                    selected={type.id == this.state.selectedSalaryStep}
                        
                        >{type.name}</option>
                      ))}
                  </select>
                  </div>






                  <button
                    className="btn btn-primary"
                    onClick={() => this.saveSalaryDetails()}
                    data-dismiss="modal"
                    id="sub-btn"

                  >
                    {this.state.savingStatus ? "Saving..." : "Save"}
                  </button> 
                </div>
              </div>
            </div>
            
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EditApplicantProfile;
