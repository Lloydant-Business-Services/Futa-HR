import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Loadable from "react-loadable";
import jsPDF from "jspdf"
import "jspdf-autotable"

class HrDataTable extends Component {
  state = {
    myData: { name: "Okoro", rank: "Accountant" },
  }


  exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "landscape" // portrait or landscape

    const marginLeft = 20

    if(typeof window !== "undefined"){
      const doc = new jsPDF(orientation, unit, size)

      doc.setFontSize(15)

      const nau = "FEDERAL UNIVERSITY OF TECHNOLOGY AKURE";
      // const logg = logobg;
      const title = "Uinvited"
      const headers = [
        [
          "SN",
          "USERNAME",

          "STAFF NUMBER",
          "STAFF NAME",
          "STAFF TYPE",
          "STAFF CATEGORY",
          "RANK",

          "DEPARTMENT",
          // "application score",
        ],
      ]

      const data = this.props.passedStaffData.map(d => [
        d.sn,
        d.username,
        d.staffIdentityNumber,
        d.name,
        d.staffType,
        d.staffCategory,
        d.rank,
        d.department,
        // d.applicationScore,
      ])

      let content = {
        startY: 70,
        head: headers,
        body: data,
      }

      doc.text(nau, marginLeft, 30)
      doc.text(title, marginLeft, 50)
      doc.autoTable(content)
      doc.save("report.pdf")
    }
  }

  componentDidMount() {
    // ajax
    //   .get("http://97.74.6.243/portal_dev/api/Country")
    //   .end((error, response) => {
    //     if (!error && response) {
    //       this.setState({
    //         Country: response.body,
    //       })
    //     } else {
    //       console.log("There was an error fetching from list", error)
    //     }
    //     console.log(this.state.Country)
    //     console.log("i have no idea")
    // //   })
    // setTimeout(() => {
    //   console.log(this.props.passedStaffData)
    //   console.table(this.props.passedStaffData)
    //   console.log(...this.props.passedStaffData)
    // }, 6000)
  }
  render() {
    const data = {
      columns: [
        {
          label: "S/N",
          field: "sn",
          sort: "asc",
          width: 150,
        },


        {
          label: "Username",
          field: "username",
          sort: "asc",
          width: 150,
        },
        {
          label: "Staff ID",
          field: "staffIdentityNumber",
          sort: "asc",
          width: 150,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Staff Type",
          field: "staffType",
          sort: "asc",
          width: 270,
        },
        {
          label: "Staff Category",
          field: "staffCategory",
          sort: "asc",
          width: 270,
        },
        // {
        //   label: "D.O.B",
        //   field: "dob",
        //   sort: "asc",
        //   width: 200,
        // },
        {
          label: "Salary Category",
          field: "salaryCategory",
          sort: "asc",
          width: 150,
        },
        {
          label: "Rank",
          field: "rank",
          sort: "asc",
          width: 150,
        },
        {
          label: "Department",
          field: "department",
          sort: "asc",
          width: 100,
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 100,
        },
      ],
      rows: this.props.passedStaffData,
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
          {/* <span className="text-sm">Export as: </span>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-sm btn-outline-primary"
              table={"tblCustomers"}
              // data={data}
              filename="tablexls"
              sheet="tablexls"
              buttonText="excel"
            />
            <button className="btn btn-sm btn-primary" onClick={() => this.exportPDF()}>pdf</button> */}
            <hr className="my-3" />
            <MDBDataTableV5 striped hover data={data} searchTop searchBottom={false} id="tblCustomers" className="sofia"/>
          </div>
        </div>
      </div>
    )
  }
}

export default HrDataTable
