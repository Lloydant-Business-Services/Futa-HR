import React from "react"
import { fetchData, postData, editData, deleteData } from "../../../utils/crud"
import UninvitedDataTable from "../DataTables/PrepNominalRoll"
import Spinner from "./Spinner"
import {Modal} from "reactstrap"
import Notification from "../../Reusables/NotificationCard"
// import ReactToPrint from "react-to-print"

export default class PrepareNominalRoll extends React.Component {
 

    state = {
      payloadDTO: JSON.parse(localStorage.getItem("DTOFULL")),

      spin:true,
      allStaff: [],
      selectedStaff: [],
      confirm: [],
      subject: "",
      message: "",
      checkedID: true,
     
    }

  handleGetMonth = (month) => {
    var ch = month == 1 ? "January" : month == 2 ? "February" : month == 3 ? "March" : month == 4 ? "April" : month == 5 ? "May" : month == 6 ? "June" : month == 7 ? "July" : month == 8 ? "August" : month == 9 ? "September" : month == 10 ? "October" : month == 11 ? "November" : month == 12 ? "December" : null;
    console.log(ch)

    return ch;
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({inviteModal:false, spin:true})

    const staffPayload = []
    const { selectedStaff } = this.state

    selectedStaff.forEach((staffId, index) => {
      const invite = {
        isCleared:true,
        staffId: parseInt(staffId),
      }

      staffPayload.push(invite)
    })
    console.log(staffPayload)

    postData("/StaffNominalRoll/PostStaffNominalList", staffPayload, data => {
      console.log({ data })
      const { confirm } = this.state
      confirm.push(data)
      this.setState({ ...this.state, confirm, name: "", active: true })
      if (data == 200) {
        this.setState({spin:false})
        // alert("Invitation Email Sent Successfully!")
        this.setState({confirmSuccess:true})

        this.componentDidMount();
        // if(typeof window !== "undefined"){
        //   window.location.reload(true)
        // }
      }
      console.log(confirm)
    })
  }
  confirmStaff = e => {
    e.preventDefault()
this.setState({inviteModal:true})
    let confirmArr = []
    const form = typeof window !== "undefined" ? document.querySelectorAll("input[name=staff]"): []

    for (let a of form) {
      if (a.checked) confirmArr.push(a.value)
    }

    setTimeout(() => {
      console.log(confirmArr, "Invited")
    }, 1000)
    this.setState({
      selectedStaff: confirmArr,
    })
    setTimeout(() => {
      console.log(this.state.selectedStaff, "Selected Staff")
    }, 1000)
  }

  componentDidMount() {
    // fetchData("/Staff", data => {
    //   this.setState({ allStaff: data })
    // })

    fetchData(`/Staff/MonthlyNominalRoll?departmentId=${this.state.payloadDTO?.department?.id}`, data => {
      this.setState({ nominalRoll: data, spin:false, monthDigit: data[0].month })

      setTimeout(() => {
        console.log(this.state.nominalRoll, "Roll")
        console.log(this.state.monthDigit, "mon dig")
        this.handleGetMonth(this.state.monthDigit)
      }, 4000)

      let mappedStaff = this.state.nominalRoll.map((d, index) => {
        this.setState({
          newID: d.personId,
        })

        return {
          sn: index + 1,
          username:d.userName,
          staffIdentityNumber: d.staffIdentityNumber,
          staffName: d.staffName,
          staffType: d.staffType,
          staffRank: d.staffRank,
          staffCategory: d.staffCategory,
          staffSalaryCategory: d.staffSalaryCategory,
          check: d.isCleared ? <span className="badge badge-success">Cleared</span> :
            <label class="container" > 
              <input name="staff" value={d.staffId} type="checkbox" />
              <span class="checkmark"></span>
            </label>
          ,
        }
      })
      this.setState({
        passedRollList: mappedStaff,
      })
      //   console.log(this.state.checkedID)
    })
  }

  closeInvite = () => {
    this.setState({confirmSuccess:false})
  }

  render() {
      var myMonth = new Date();
    return (
      <>
      {this.state.confirmSuccess ? <Notification
        okBtn={true}
        closeCard={this.closeInvite}
        message={"Selected Staff successfully Confirmed"}
      /> : null}
      {this.state.spin ? <Spinner/> : null}
      <div className="header-body">
          <div className="row align-items-center py-4">
              <div className="col-lg-12 col-7">
      <h6 className="h1 d-inline-block mb-0 pop-font">Nominal Roll List for {this.state.payloadDTO?.department?.name} Department</h6>
                      <span className="h3 text-muted">
                     / For the Month of <b>{this.handleGetMonth(this.state.monthDigit)}</b>
                      </span>
              </div>
              <div className="col-lg-6 col-5 text-right">
              </div>
          </div>

        {/* <div>
          <ReactToPrint
            trigger={() => <button>Print</button>}
            content={() => this.componentRef}
          />
          <div style={{ display: "none" }}>
            <UninvitedDataTable
              passedApplicant={this.state.passedRollList}
              ref={el => (this.componentRef = el)}
            />
          </div>
        </div> */}

        <UninvitedDataTable
          passedRoll={this.state.passedRollList}
          rawData={this.state.nominalRoll}
        />

        <button type="button" class="btn btn-outline-primary sofia"
          data-toggle="modal" data-target="#myModal"
          onClick={this.confirmStaff} >
          Confirm Selected Staff
        </button>

       <Modal isOpen={this.state.inviteModal}> 
        <form onSubmit={e => this.handleSubmit(e)}>
         
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" onClick={()=>{this.setState({inviteModal:false})}}>
                    &times;
                  </button>
                </div>

                <div class="modal-body text-center">
                    <b className="sofia">Understand that this action is irreversible.<br/>
                    Do you wish to proceed with confirmation of selected Staff?</b>
                  
                </div>

                <div class="modal-footer">
                  <button onClick={this.handleSubmit} class="btn btn-success sofia">
                    Confirm
                  </button>
                  <button type="button" onClick={()=>{this.setState({inviteModal:false})}} class="btn btn-danger sofia">
                    Cancel
                  </button>
                </div>
              </div>
        </form>
        </Modal>
      </div>
      </>
    )
  }
}
