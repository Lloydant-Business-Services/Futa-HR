import React, { Component } from "react"



export default class Training extends Component {

    render(){
        return(
            <>
              <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h1 d-inline-block mb-0 pop-font">
                Staff Training Programmes{" "}
                <span className="h3 text-muted">
                
                </span>
              </h6>
              <span className="text-sm d-block">
                List of Available Training Programmes
              </span>
            </div>
            <div className="col-lg-6 col-5 text-right"></div>
          </div>


          {/* Card stats */}
          <div className="row justify-content-center">
            <hr className="mx-0" />
         <h2>There are no Training Programmes to be displayed at this time...</h2>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div></div>
    

         
     
      
        </div>
            </>
        )
    }
}