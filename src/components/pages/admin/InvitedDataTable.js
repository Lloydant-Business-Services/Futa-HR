import React, { Component } from "react"
import { MDBDataTableV5 } from "mdbreact"

class InvitedDataTable extends Component {
  state = {
    myData: { name: "Okoro", rank: "Accountant" },
  }

  componentDidMount() {}
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
          label: "Surname",
          field: "surname",
          sort: "asc",
          width: 150,
        },
        {
          label: "Firstname",
          field: "firstname",
          sort: "asc",
          width: 270,
        },
        {
          label: "Othername",
          field: "othername",
          sort: "asc",
          width: 200,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 150,
        },
        {
          label: "Position Applied For",
          field: "position",
          sort: "asc",
          width: 100,
        },

        // {
        //   label: "Application Score",
        //   field: "applicationScore",
        //   sort: "asc",
        //   width: 100,
        // },
      ],
      rows: this.props.passedApplicant,
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
        <MDBDataTableV5 striped bordered hover data={data} className="sofia" searchTop searchBottom={false} />
        </div>
        </div>
      </div>
    )
  }
}

export default InvitedDataTable
