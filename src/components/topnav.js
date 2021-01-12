import React, { Component } from "react";
import team1 from "../images/theme/team-1.jpg";
import team2 from "../images/theme/team-2.jpg";
import team3 from "../images/theme/team-3.jpg";
import team4 from "../images/uss.png";
import team5 from "../images/theme/team-5.jpg";
import logosm from "../images/ziklogosm.png";
import logobg from "../images/ziklogo.png";
import { logout } from "../utils/auth";
import {Redirect, Link} from "react-router-dom"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Topnav extends Component {
  state = {
    payLoad: JSON.parse(localStorage.getItem("userData")),
  };

  logout = () => {
    localStorage.clear()
    this.setState({
      logUserOut: true
    })
  }

  toggleSideNav = () => {
      if (document.body.classList.contains('g-sidenav-pinned')) {
          document.body.classList.remove('g-sidenav-pinned')
          document.body.classList.add('g-sidenav-hidden')
      } else {
          document.body.classList.remove('g-sidenav-hidden')
          document.body.classList.add('g-sidenav-pinned')
      }
  }

  componentDidMount(){
      
    if(!localStorage.getItem("userData")){
        this.setState({
            userRedirect:true
        })
  
       
     
    }
  }
  render() {

    if(this.state.logUserOut){
      return(
        <Redirect
          to={{pathname:"/Home"}}
        />
      )
      
    }


    return (
      <>
        <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary-light border-bottom" id="topnav-main">
          <div className="container-fluid" >
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* Navbar links */}
              <ul className="navbar-nav align-items-center ml-md-auto">

                {/* <li>
                <span
                  className="avatar avatar-sm"
                  style={{ backgroundColor: "white", width:"40px", height:"50px", padding:"20px" }}
                >
                  <img alt="Image placeholder" src={logosm} style={{width:"40px"}} />
                </span>
                </li> */}

                
                <li className="nav-item d-sm-none">
                  <span
                    className="nav-link"
                    to="/app/dashboard"
                    data-action="search-show"
                    data-target="#navbar-search-main"
                  >
                    <i className="ni ni-zoom-split-in" />
                  </span>
                </li>

               
             
              
              </ul>
              <ul className="navbar-nav align-items-center ml-auto ml-md-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link pr-0"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="media align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src={team4} />
                      </span>


                      <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret style={{fontSize:"14px"}} className="sofia">
                    {this.state.payLoad?.username}
                    
                
                    </DropdownToggle>
                    
                    <DropdownMenu right>
                        <DropdownItem>
                          <Link style={{color:"black"}} to={{pathname:"/Biodata"}}>
                          My Profile
                          </Link>
                          
                        </DropdownItem>

                        <DropdownItem>
                          <Link style={{color:"black"}} to={{pathname:"/ChangePassword"}}>
                          Change Password
                          </Link>
                          
                        </DropdownItem>
{/* 
                        <DropdownItem href="#">
                          News
                        </DropdownItem> */}

                        <DropdownItem onClick={this.logout} style={{color:"black"}}>
                         <b style={{color:"black"}}>Logout</b>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>






                   
                    </div>
                  </a>
                
                </li>
                
                <li className="nav-item d-xl-none">
                  {/* Sidenav toggler */}
                  <div className="pr-3 sidenav-toggler sidenav-toggler-dark"
                    data-action="sidenav-pin" data-target="#sidenav-main" >
                      <div className="sidenav-toggler-inner" onClick={() => this.toggleSideNav()}> 
                          <i className="sidenav-toggler-line" /> 
                          <i className="sidenav-toggler-line" /> 
                          <i className="sidenav-toggler-line" /> 
                      </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Topnav;
