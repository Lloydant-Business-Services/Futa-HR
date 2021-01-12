import React from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
// import { columns, data } from './Data.js';

class TestData extends React.Component {
  state = {
    tablePayload: JSON.parse(localStorage.getItem("TableData")),

  }
 

  render(){

    const columns = [
        {
            name: "S/N",
            selector: "sn",
            sortable: true,
          },
  
  
          {
            name: "Username",
            selector: "username",
            sortable: true,
          },
          {
            name: "Staff ID",
            selector: "staffIdentityNumber",
            sortable: true,
          },
          {
            name: "Name",
            selector: "name",
            sortable: true,
          },
          {
            name: "Staff Type",
            selector: "staffType",
            sortable: true,
          },
          {
            name: "Staff Category",
            selector: "staffCategory",
            sortable: false,
          },
        
          {
            name: "Rank",
            selector: "rank",
            sortable: true,
          },
          {
            name: "Department",
            selector: "department",
            sortable: true,
          },
          // {
          //   name: "Action",
          //   selector: "action",
          //   sortable: true,
          // },
      ];
      
      const data = this.props.passedStaffData

    // const columns = [
    //     {
    //       name: 'Title',
    //       selector: 'title',
    //       sortable: true,
    //     },
    //     {
    //       name: 'Director',
    //       selector: 'director',
    //       sortable: true,
    //     },
    //     {
    //       name: 'Genres',
    //       selector: 'genres',
    //       sortable: true,
    //       cell: d => <span>{d.genres.join(', ')}</span>,
    //     },
    //     {
    //       name: 'Year',
    //       selector: 'year',
    //       sortable: true,
    //     },
    //   ];
      
    //   const data = [
    //     {
    //       title: 'Beetlejuice',
    //       year: '1988',
    //       genres: [
    //         'Comedy',
    //         'Fantasy',
    //       ],
    //       director: 'Tim Burton',
    //     },
    //     {
    //       id: 2,
    //       title: 'The Cotton Club',
    //       year: '1984',
    //       runtime: '127',
    //       genres: [
    //         'Crime',
    //         'Drama',
    //         'Music',
    //       ],
    //       director: 'Francis Ford Coppola',
    //     },
    //     {
    //         title: 'Beetlejuice',
    //         year: '1988',
    //         genres: [
    //           'Comedy',
    //           'Fantasy',
    //         ],
    //         director: 'Tim Burton',
    //       },
    //       {
    //         id: 2,
    //         title: 'The Cotton Club',
    //         year: '1984',
    //         runtime: '127',
    //         genres: [
    //           'Crime',
    //           'Drama',
    //           'Music',
    //         ],
    //         director: 'Francis Ford Coppola',
    //       },
    //       {
    //         title: 'Beetlejuice',
    //         year: '1988',
    //         genres: [
    //           'Comedy',
    //           'Fantasy',
    //         ],
    //         director: 'Tim Burton',
    //       },
    //       {
    //         id: 2,
    //         title: 'The Cotton Club',
    //         year: '1984',
    //         runtime: '127',
    //         genres: [
    //           'Crime',
    //           'Drama',
    //           'Music',
    //         ],
    //         director: 'Francis Ford Coppola',
    //       },
    //       {
    //         title: 'Beetlejuice',
    //         year: '1988',
    //         genres: [
    //           'Comedy',
    //           'Fantasy',
    //         ],
    //         director: 'Tim Burton',
    //       },
    //       {
    //         id: 2,
    //         title: 'The Cotton Club',
    //         year: '1984',
    //         runtime: '127',
    //         genres: [
    //           'Crime',
    //           'Drama',
    //           'Music',
    //         ],
    //         director: 'Francis Ford Coppola',
    //       },
    //       {
    //         title: 'Beetlejuice',
    //         year: '1988',
    //         genres: [
    //           'Comedy',
    //           'Fantasy',
    //         ],
    //         director: 'Tim Burton',
    //       },
    //       {
    //         id: 2,
    //         title: 'The Cotton Club',
    //         year: '1984',
    //         runtime: '127',
    //         genres: [
    //           'Crime',
    //           'Drama',
    //           'Music',
    //         ],
    //         director: 'Francis Ford Coppola',
    //       },
    //       {
    //         title: 'Beetlejuice',
    //         year: '1988',
    //         genres: [
    //           'Comedy',
    //           'Fantasy',
    //         ],
    //         director: 'Tim Burton',
    //       },
    //       {
    //         id: 2,
    //         title: 'The Cotton Club',
    //         year: '1984',
    //         runtime: '127',
    //         genres: [
    //           'Crime',
    //           'Drama',
    //           'Music',
    //         ],
    //         director: 'Francis Ford Coppola',
    //       },
    //       {
    //         title: 'Beetlejuice',
    //         year: '1988',
    //         genres: [
    //           'Comedy',
    //           'Fantasy',
    //         ],
    //         director: 'Tim Burton',
    //       },
    //       {
    //         id: 2,
    //         title: 'The Cotton Club',
    //         year: '1984',
    //         runtime: '127',
    //         genres: [
    //           'Crime',
    //           'Drama',
    //           'Music',
    //         ],
    //         director: 'Francis Ford Coppola',
    //       }
    
    
    
    
    // ];


    const tableData = {
        columns,
        data,
      };
  return (
    <DataTableExtensions
      {...tableData}
      
      
    >
      <DataTable
        noHeader
        defaultSortField="id"
        defaultSortAsc={true}
        pagination
        highlightOnHover
        expandOnRowClicked={true}
        
        
        
        
        
      />
    </DataTableExtensions>
  );
}
}

export default TestData;