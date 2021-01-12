import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import FacultyDataTable from "../DataTables/FacultyNominalRoll"
import Spinner from "./Spinner"
import Notification from "../../Reusables/NotificationCard"
import {Link} from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// import ReactToPrint from "react-to-print"

export default class PullNominalRoll extends React.Component {
 

    state = {
      payloadDTO: JSON.parse(localStorage.getItem("DTOFULL")),

    //   spin:true,
      allStaff: [],
      selectedStaff: [],
      confirm: [],
      subject: "",
      message: "",
      checkedID: true,
    newNominalInfo : this.props.location.state.nominalInfo,
    monthExtract : this.props.location.state.monthExtract,
    yearExtract : this.props.location.state.yearExtract,
    facultyId:0,
    departmentId:0

     
    }

  handleGetMonth = (month) => {
    var ch = month == 1 ? "January" : month == 2 ? "February" : month == 3 ? "March" : month == 4 ? "April" : month == 5 ? "May" : month == 6 ? "June" : month == 7 ? "July" : month == 8 ? "August" : month == 9 ? "September" : month == 10 ? "October" : month == 11 ? "November" : month == 12 ? "December" : null;
    console.log(ch)

    return ch;
  }

  filterStaff = () => {
    this.setState({
      spinn: true,
      queryCard:false,
      departmentCard:false,
      staffRank:false,
      combined:false
    });
    fetchData(
      `/StaffNominalRoll/GetNominalRollBy?facultyId=${this.state.facultyId}&departmentId=${this.state.departmentId}`,
      (data) => {
        setTimeout(() => {
          console.log(data);
        }, 2000);

        
     
        this.setState({
          newNominalInfo: data,
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
    fetchData("/InstitutionDepartments", (data) => {
      this.setState({
        institutionDepts: data,
      });

      console.log(this.state.institutionDepts, "Depts!!");
    });

  }



  render() {
      var myMonth = new Date();
    return (
      <>


<Modal isOpen={this.state.departmentCard} className="mdal">
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
                        onChange={(e) => {this.setState({departmentId: e.target.value})}}
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
              onClick={()=> {this.setState({departmentCard:false})}}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>



      {this.state.confirmSuccess ? <Notification
        okBtn={true}
        closeCard={this.closeInvite}
        message={"Selected Staff successfully Confirmed"}
      /> : null}
      {this.state.spin ? <Spinner/> : null}
      <div className="header-body">
          <div className="row align-items-center py-4">
              <div className="col-lg-12 col-7">
      <h6 className="h1 d-inline-block mb-0 pop-font">Cleared Staff Nominal Roll List </h6> &nbsp;
                      <span className="h3 text-muted">
       / For the Month of <b>{this.state.monthExtract}, {this.state.yearExtract}</b>
                      </span><br/>
                      <Link
                  to={{ pathname: "/NominalRollRequest" }}
                  className="btn btn-info"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Back"
                >
                  <i className="fa fa-arrow-circle-left fa-2x" />
                </Link>
              </div>
              <div className="col-lg-6 col-5 text-right">
              </div>
          </div>

           
          <div className="row col-md-12 staff-list-func">
              <div className="card col-md-3" style={{borderLeft:"4px solid orange"}}>
                <div className="row card-body">

                {/* <div className="col-md-6 text-center"> */}
                    {/* <h3>Load List By:</h3> */}
                    <br />
                    <br />
                  {/* </div> */}
                  <div className="container">
                  Load List By : &nbsp;
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {this.setState({departmentCard:true})}}

                      
                    >
                      <i className="fa fa-sort"/> 
                        &nbsp; Department
                    </button>


                   

                  
                  </div>
                </div>
              </div>




              {/* <div className="card col-md-3" style={{borderLeft:"4px solid gray", marginLeft:"30px", paddingTop:"20px"}}>

                  <div className="col-md-12">
                  <small><i className="fa fa-user text-success"> </i> &nbsp; In Active Service</small><br/>
                  <small><i className="fa fa-user text-danger"> </i> &nbsp; Disengaged</small><br/>
                  <small><i className="fa fa-user" style={{color:"gray"}}> </i> &nbsp; Retired</small>
                  </div>

            
              </div> */}
              </div>
             
           <div className="card">

        <FacultyDataTable
          
          rawData={this.state.newNominalInfo}
        />
        </div>

      

      
      </div>
      </>
    )
  }
}
