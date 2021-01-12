import React from "react";
import { fetchData, postData, editData, URL } from "../../../utils/crud";
import _ from "lodash";
import Spinner from "./Spinner";
import { Link, Redirect } from "react-router-dom";
import HrDataTable from "./HrDataTable";
import CreateStaffForm from "./CreateStaffForm";
import NotificationCard from "../../Reusables/NotificationCard";
import Spinner2 from "../admin/Spinner"
import {Roles} from "../../Barn"
import NewDataTable from "./NewDataTable";
// import MUIDataTable from "./MuiDatatable"


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
  Fade,
} from "reactstrap";
import { StatusCodes } from "../../Barn";

export default class StaffTest extends React.Component {
  state = {
    // spinn:true,\
    warningCard:false,
    spin: false,
    createStaff: false,
    staffPayLoad: JSON.parse(localStorage.getItem("DTOFULL")),

    staffAdd: false,
    lastname: "",
    firstname: "",
    othername: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
    departmentId: 0,
    unitId: 0,
    genderId: 0,
    appointmentTypeId: 0,
    contactAddress: "",
    appointmentId: 0,
    staffCategoryId: 0,
    stateOfOriginId: 0,
    lgaId: 0,
    rankId: 0,
    staffCadreId: 0,
    staffNum: "",
    religionId: 0,
    relationshipId: 0,
    newID: "",
    spinner: true,
    editStaff: "",
    staffTypeId: 0,
    allStaff: [],
    allStaffSearch: [],

    staff: {
      staffNumber: "",
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
        relationshipId: 0,
        religionId: 0,
        genderId: 0,
        id: 0,
        staffTypeId: 0,
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
    searchText: "",
    
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

  setSelectedData = (data) => {
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

    this.setState({ ...this.state, staff });
  };

  isValidInputs = () => {
    var phoneno = /^\d{11}$/;
    if (!this.state.staff.person.phoneNumber.match(phoneno)) {
      alert("Enter a valid Phone Number");
      return false;
    }

    return true;
  };

  submitForm = () => {
    postData("/Staff/AddSingleStaff", this.state.staff, (data) => {
      this.loadStaff();

      //Re-mount the component to force a reload
      this.componentDidMount();
    });
  };

  updateForm = () => {
    if (this.isValidInputs()) {
      editData(`/Staff/${this.state.staff.id}`, this.state.staff, (data) => {
        this.loadStaff();
      });
      this.loadStaff();

      //Force a reload of the current component
      this.componentDidMount();
    }
  };

  uploadStaffList = () => {
    // navigate("/app/admin/UploadStaffList")
  };

  createStaffToggle = () => {
    this.setState({
      createStaff: true,
    });
  };

  closeToggle = () => {
    this.setState({
      createStaff: false,
    });
  };

  filterStaff = () => {
    this.setState({
      spinn: true,
      queryCard:false,
      staffTypeCard:false,
      staffRank:false,
      combined:false
    });
    fetchData(
      `/Staff/GetStaffBy?departmentId=${this.state.departmentId}&staffTypeId=${this.state.staffTypeId}&rankId=${this.state.rankId}`,
      (data) => {
        setTimeout(() => {
          console.log(data);
        }, 2000);

        let mappedStaff = data.map((d, i) => {
          this.setState({
            newID: d.personId,
          });

          return {
            sn: i + 1,
            username: d.userName,
            name: d.surname + " " + d.firstName + " " + d.otherName,
            staffIdentityNumber: d.staffIdentityNumber,
            email: d.email,
            staffType:d.staffType,
            staffCategory: d.staffCategory,
            salaryCategory:d.salaryCategory,

            // dob: d.staffDOB.substring(0,10),
            rank:d.staffRank,
            department:d.staffDepartment,
            staffId: d.staffId,
            action: (
              <Link
                to={{
                  pathname: "/Edit_Staff_Profile",
                  state: { data: d.staffId, compoTitle: "Staff" },
                }}
                className="btn btn-warning btn-sm myLinks"
              >
                <i className="fa fa-edit"></i>
              </Link>
            ),
          };
        });
        setTimeout(() => {
          console.log(mappedStaff, "mapp!!!");
        }, 2000);
        this.setState({
          newStaffList: mappedStaff,
          spinn: false,
          showDataTable: true,
          staffTypeId:0,
          rankId:0,
          departmentId:0
        });
      }
    );
  };

  componentDidMount() {
  

    let verification = JSON.parse(localStorage.getItem("userData"));
    if (verification == null) {
      this.setState({
        userRedirect: true,
      });

    
    }
    // else if (verification.roleId != Roles.SuperAdmin && verification.roleId != Roles.Personnel && verification.roleId != Roles.Regularization && verification.roleId != Roles.PersonnelDocumentation) {
    //   alert("Unauthorized Access")
    //   localStorage.clear();
    //   this.setState({
    //     userRedirect: true,
    //   });
    // }
  
   

    console.log(verification, "Localll")
    

    this.setState({warningCard:false})

    fetchData("/InstitutionDepartments", (data) => {
      this.setState({
        institutionDepts: data,
      });

      console.log(this.state.institutionDepts, "Depts!!");
    });

    fetchData("/InstitutionRanks", (data) => {
      this.setState({
        institutionRank: data,
      });

      console.log(this.state.institutionCadre, "Cadres!!");
    });

    fetchData("/InstitutionStaffTypes", (data) => {
      this.setState({
        institutionStaffType: data,
      });

      console.log(this.state.institutionStaffType, "Satff Type!!");
    });
    this.setState({
      spinn: true,
    });

    fetchData('/Staff/NewStaffDto', data => {
      // localStorage.clear("TableData")
      this.setState({spinn:false})
      console.log(data, "real")
     let defState = this;
        let newMapped = data.map((i,t) => {

            return{
                sn: t + 1,
                username: i.userName,
                name: i.surname + " " + i.firstName + " " + i.otherName,
                        
                staffType: i.staffType,
                staffCategory: i.staffCategory,
                staffIdentityNumber: i.staffIdentityNumber,
                // email: i.email || "-",
                // dob: i.staffDOB.substring(0,10),
                salaryCategory:i.salaryCategory,
                rank:i.staffRank,
                department:i.staffDepartment || "-",
                staffId: i.staffId,
                action: (
                  <>
                  <Link
                    to={{
                      pathname: "/Edit_Staff_Profile",
                      state: { data: i.staffId, compoTitle: "Staff" },
                    }}
                    className="btn btn-outline-primary btn-sm myLinks"
                  >
                    <i className="fa fa-edit"></i>
                  </Link> 
                  <Link to={{pathname:"/StaffProfileTest", state:{data: i.staffId} }} className="btn btn-outline-primary btn-sm myLinks"> 
                    <i className="fa fa-user"></i>
                  </Link> 
                  <button className="btn btn-outline-warning btn-sm" onClick={() => {defState.toggleDisengageCard(i)}}>Disengage</button>
                  </>

                ),
                
            }
        })
        this.setState({newStaffList:newMapped})
        console.log(this.state.newStaffList, "NewstaffList")
        // localStorage.setItem("TableData", JSON.stringify(this.state.newStaffList));


    })

   

    setTimeout(() => {
      console.log(this.state.allStaff);
    }, 4000);
  }




  filterDisengaedRetired = () => {
    this.setState({
      spinn: true,
      queryCard:false,
      retiredDisengagedCard:false,
      staffRank:false,
      combined:false
    });
    fetchData(
      `/Staff/DisengagedRetired?serviceStatus=${this.state.serviceStatus}`,
      (data) => {
        setTimeout(() => {
          console.log(data);
        }, 2000);
        let disState = this;

        let mappedStaff = data.map((d, i) => {
          this.setState({
            newID: d.personId,
          });

          return {
            sn: i + 1,
            username: d.userName,
            name:<Link to={{pathname:"/StaffProfileTest", state:{data: d.staffId} }} className="sofia"> 
            {<i className="fa fa-user"></i>} &nbsp;
                    {d.surname + " " + d.firstName + " " + d.otherName}
                    </Link>,
            staffIdentityNumber: d.staffIdentityNumber,
            email: d.email,
            // dob: d.staffDOB.substring(0,10),
            rank:d.staffRank,
            department:d.staffDepartment,
            staffId: d.staffId,
            action: (d.isRetired ? null : d.isDisengaged ?
              <button className="btn btn-success btn-sm" onClick={() => {disState.toggleReinstateCard(d)}}>Reinstate</button>
              : null
            ),
          };
        });
        setTimeout(() => {
          console.log(mappedStaff, "mapp!!!");
        }, 2000);
        this.setState({
          newStaffList: mappedStaff,
          spinn: false,
          showDataTable: true,
          staffTypeId:0,
          rankId:0,
          departmentId:0
        });
      }
    );
  };

  
  handleDepartment = (e) => {
    this.setState({
      departmentId: parseInt(e.target.value),
    });
  };


  handleStaffType = (e) => {
    this.setState({
      staffTypeId: parseInt(e.target.value),
    });
  };

  handleStaffStatus = (e) => {
    this.setState({
      serviceStatus: parseInt(e.target.value),
    });
  };


  handleRank = (e) => {
    this.setState({
      rankId: parseInt(e.target.value),
    });
  };

  closeAdd = () => {
    this.setState({
      closeRegCard: false,
    });
  };

  toggleCloseCard = () => {
    if(!this.state.queryCard){
      this.setState({
        queryCard:true,
      })
    }else{
      this.setState({
        queryCard:false,

      })
    }
  }


  toggleStaffTypeCard = () => {
    if(!this.state.staffTypeCard){
      this.setState({
        staffTypeCard:true,
      })
    }else{
      this.setState({
        staffTypeCard:false

      })
    }
  }

  toggleRankCard = () => {
    if(!this.state.staffRank){
      this.setState({
        staffRank:true,
      })
    }else{
      this.setState({
        staffRank:false

      })
    }
  }


  toggleCombinedCard = () => {
    if(!this.state.combined){
      this.setState({
        combined:true,
      })
    }else{
      this.setState({
        combined:false

      })
    }
  }

  toggleDisengageCard = (data) => {
    this.setState({
      warningCard:true,
      staffFullName: data.surname + " " + data.firstName + " " + data.otherName,
      staffLoadId:data.staffId
    })
    console.log(data, "data")
  }

  toggleReinstateCard = (data) => {
    this.setState({
      reinstateCard:true,
      staffFullName: data.surname + " " + data.firstName + " " + data.otherName,
      staffLoadId:data.staffId
    })
    console.log(data, "data")
  }

  handleDisengage = () => {
    this.setState({warningCard:false})

    editData(`/Staff/DisengageAction?staffId=${this.state.staffLoadId}`, "", data => {
      if(data == StatusCodes.Created){
        this.componentDidMount();
        this.setState({successCard:true})
      }
    })
  }

  handleReinstatement = () => {
    this.setState({reinstateCard:false})

    editData(`/Staff/ReinstateStaff?staffId=${this.state.staffLoadId}`, "", data => {
      if(data == StatusCodes.Created){
        this.componentDidMount();
        this.setState({successCard2:true})
      }
    })
  }
  closeNoticeCard = () => {
    this.setState({
      successCard:false,
      successCard2:false
    })
  }
  render() {
    if (this.state.userRedirect) {
      return <Redirect to={{ pathname: "/Login" }} />;
    }
    return (
      <>

{this.state.spin ? <Spinner2/> : null}

{this.state.successCard ? <NotificationCard
  message="Staff Disengagement Action was successful!"
  closeCard={this.closeNoticeCard}
  okBtn={true}

/> : null}

{this.state.successCard2 ? <NotificationCard
  message="Staff Reinstatement Action was successful!"
  closeCard={this.closeNoticeCard}
  okBtn={true}

/> : null}


<Modal isOpen={this.state.warningCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"><span className="badge badge-danger">Warning!!!</span></ModalHeader>

            <h3 className="text-center">
             Proceed with the Disengagement of <br /> <b>{this.state.staffFullName}</b> ?
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"success"}
              onClick={this.handleDisengage}
             
            >
              Confirm
            </Button>
            <Button
              className="ok-btn"
              color={"danger"}
              onClick={(e) => {this.setState({warningCard:false})}}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.reinstateCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary"><span className="badge badge-danger">Warning!!!</span></ModalHeader>

            <h3 className="text-center">
             Are You Sure You wish to Reinstate <br /> <b>{this.state.staffFullName}</b> ?
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ok-btn"
              color={"success"}
              onClick={this.handleReinstatement}
             
            >
              Confirm
            </Button>
            <Button
              className="ok-btn"
              color={"danger"}
              onClick={(e) => {this.setState({reinstateCard:false})}}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {this.state.spinn ? (
          <Spinner msg={"Loading Staff List, please wait..."} />
        ) : null}

        {/* <SideBar/>       */}

        {this.state.createStaff ? <CreateStaffForm
          closeToggle={this.closeToggle}
          // trigger={this.state.createStaff}
        /> : null}
       
       
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







        <Modal isOpen={this.state.queryCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary">Select Department</ModalHeader>
            <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Department:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleDepartment}
                        required
                      >
                        <option>Select Department</option>
                        {this.state.institutionDepts &&
                          this.state.institutionDepts.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
           
          </ModalBody>
          <ModalFooter>
            <Button
              // className="ok-btn"
              color={"info"}
              onClick={this.filterStaff}
            >
              Load Staff List
            </Button>

            <Button
              // className="ok-btn"
              color={"danger"}
              onClick={this.toggleCloseCard}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Retired and Disengaged */}

        <Modal isOpen={this.state.retiredDisengagedCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary">Select Staff Status</ModalHeader>
            <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Staff Status:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleStaffStatus}
                        required
                      >
                        <option>Select Staff status type</option>
                        <option value="1">Disengaged</option>
                        <option value="2">Retired</option>
                        
                      </select>
                    </div>
                  </div>
           
          </ModalBody>
          <ModalFooter>
            <Button
              // className="ok-btn"
              color={"info"}
              onClick={this.filterDisengaedRetired}
            >
              Load Staff List
            </Button>

            <Button
              // className="ok-btn"
              color={"danger"}
              onClick={()=>{this.setState({retiredDisengagedCard:false})}}
                    
                    >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>


        
        <Modal isOpen={this.state.staffTypeCard} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary">Select Staff Type</ModalHeader>
            <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Staff Type:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleStaffType}
                        required
                      >
                        <option>Select Staff type</option>
                        {this.state.institutionStaffType &&
                          this.state.institutionStaffType.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
           
          </ModalBody>
          <ModalFooter>
            <Button
              // className="ok-btn"
              color={"info"}
              onClick={this.filterStaff}
            >
              Load Staff List
            </Button>

            <Button
              // className="ok-btn"
              color={"danger"}
              onClick={this.toggleStaffTypeCard}
                    
                    >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>











        <Modal isOpen={this.state.staffRank} className="mdal">
          <ModalBody>
            <ModalHeader className="text-secondary">Select Staff Rank</ModalHeader>
            <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Cadre:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleRank}
                        required
                      >
                        <option>Select Rank</option>
                        {this.state.institutionRank &&
                          this.state.institutionRank.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
           
          </ModalBody>
          <ModalFooter>
            <Button
              // className="ok-btn"
              color={"info"}
              onClick={this.filterStaff}
            >
              Load Staff List
            </Button>

            <Button
              // className="ok-btn"
              color={"danger"}
              onClick={this.toggleRankCard}
                    
                    >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.combined} className="myModal">
          <ModalHeader></ModalHeader>
          <ModalBody>
                <div className="row card-body" >
                

                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Department:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleDepartment}
                        required
                      >
                        <option>Select Department</option>
                        {this.state.institutionDepts &&
                          this.state.institutionDepts.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Staff Type:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleStaffType}
                        required
                      >
                        <option>Select Staff type</option>
                        {this.state.institutionStaffType &&
                          this.state.institutionStaffType.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Rank:
                      </label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={this.handleRank}
                        required
                      >
                        <option>Select Rank</option>
                        {this.state.institutionRank &&
                          this.state.institutionRank.map((a, i) => {
                            return <option value={a.id}>{a.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                 
              
                </div>
           
           
           
          </ModalBody>
          <ModalFooter>
          <button
                      className="btn btn-info"
                      onClick={() => this.filterStaff()}
                    >
                      Load Staff List
                    </button>
                  
              

                  <button
                      className="btn btn-danger"
                      onClick={this.toggleCombinedCard}
                    >
                      Cancel
                    </button>
          </ModalFooter>
        </Modal>

        
        <div className="">
          <div className="py-4">
            <div className="row mb-4">
              <div className="col">
                <h1 className="d-inline-block mb-0 pop-font">
                  Staff Management{" "}
                  <span className="h3 text-muted">/Staff Profiles</span>
                </h1>

                <span className="text-sm d-block">
                  Create and manage Staff Profiles
                </span>
              </div>

              <div className="col">
                <div>
                  <button
                    className="btn btn-outline-primary btn-icon btn-sm float-right mr-3 mt-2"
                    type="button"
                    data-toggle="modal"
                    data-target=".new-level-modal"
                    onClick={this.createStaffToggle}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-plus" />
                    </span>
                    <span className="btn-inner--text">Create Staff</span>
                  </button>
                </div>
                <div>
                  
                  <button
                    className="btn btn-danger btn-icon btn-sm float-right mr-3 mt-2"
                    type="button"
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-file" />
                    </span>
                    <Link to={{ pathname: "/UploadStaffList" }} style={{color:"white"}}>
                      <span className="btn-inner--text"> Upload Staff List</span>
                    </Link>
                  </button>
                 
                </div>
              </div>
           
           
            </div>

            
            <div className="row col-md-12 staff-list-func">
              <div className="card col-md-7" style={{borderLeft:"4px solid orange"}}>
                <div className="row card-body">

                {/* <div className="col-md-6 text-center"> */}
                    <h3>Load Staff List By:</h3>
                    <br />
                    <br />
                  {/* </div> */}
                  <div className="container">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={this.toggleCloseCard}

                      
                    >
                      Department
                    </button>

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={this.toggleStaffTypeCard}


                    >
                      Staff Type
                    </button>

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={this.toggleRankCard}
                    >
                      Rank
                    </button>

                   

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={this.toggleCombinedCard}

                    >
                      Department/Staff Type/Rank
                    </button>

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => {this.setState({retiredDisengagedCard:true})}}

                    >
                      Retired/Disengaged
                    </button>
                  </div>
                </div>
              </div>

{/* {this.state.createStaff ? <CreateStaffForm closeRegCard={this.state.closeRegCard}/> : null} */}


              {/* <div className="card col-md-3" style={{borderLeft:"4px solid gray", marginLeft:"30px", paddingTop:"20px"}}>

                  <div className="col-md-12">
                  <small><i className="fa fa-user text-success"> </i> &nbsp; In Active Service</small><br/>
                  <small><i className="fa fa-user text-danger"> </i> &nbsp; Disengaged</small><br/>
                  <small><i className="fa fa-user" style={{color:"gray"}}> </i> &nbsp; Retired</small>
                  </div>

            
              </div> */}
              </div>
             
           
            
              <Fade>
                <HrDataTable
                  passedStaffData={this.state.newStaffList}
                  take={this.state.staff.staffNumber}
                  
                />{" "}


                {/* <NewDataTable passedStaffData={this.state.newStaffList}/> */}
                {/* <MUIDataTable/> */}


              </Fade>
              
          </div>
          {/* Card stats */}
        </div>

       

      </>
    );
  }
}
