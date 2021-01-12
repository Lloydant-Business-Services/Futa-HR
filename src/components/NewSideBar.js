import React from "react";
import Sidebar from "react-sidebar";
import { Link, Redirect } from "react-router-dom";
import NewDash from "./pages/admin/NewDashBoard"
import logosm from "../images/ziklogosm.png";
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





const mql = window.matchMedia(`(min-width: 800px)`);
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      sidebarDocked: mql.matches,
    payLoad: JSON.parse(localStorage.getItem("userData")),
    newState: this.state,
    hu : <ul className="menuss">
            <li><i className="fa fa-tachometer"> </i><Link to={{pathname:"/NewDashboard"}}> &nbsp; &nbsp; Dashboard</Link></li>
            <li><i className="fa fa-id-card"> </i><Link to={{pathname:"/Staff"}}> &nbsp; &nbsp; Staff Management</Link></li>
            <li><i className="fas fa-user-check"> </i><Link to={{pathname:"/TemporalStaff"}}> &nbsp; &nbsp; Staff Regularization</Link></li>
            <li><br/></li>
            <li onClick={this.logout}><i className="fa fa-power-off"> </i><Link> &nbsp; &nbsp; Log Out</Link></li>
        </ul>,
        staffMenu: <ul className="menuss">
        <li><i className="fa fa-tachometer"> </i><Link to={{pathname:"/NewDashboard"}}> &nbsp; &nbsp; Dashboard</Link></li>
        {/* <li><i className="fa fa-id-card"> </i><Link to={{pathname:"/Staff"}}> &nbsp; &nbsp; Staff Management</Link></li>
        <li><i className="fas fa-user-check"> </i><Link to={{pathname:"/TemporalStaff"}}> &nbsp; &nbsp; Staff Regularization</Link></li> */}
        <li><br/></li>
        <li onClick={this.logout}><i className="fa fa-power-off"> </i><Link> &nbsp; &nbsp; Log Out</Link></li>
    </ul>,
            
        

    };
    
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }
  logout = () => {
    localStorage.clear()
    this.setState({
      logUserOut: true
    })
  }
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentDidUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
    if(!localStorage.getItem("userData")){
        this.setState({
            userRedirect:true
        })
  
       
     
    }
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
  render() {
    if(this.state.logUserOut){
        return(
          <Redirect
            to={{pathname:"/Login"}}
          />
        )
        
      }

    
    return (
        <>

<Sidebar
        sidebar={this.state.payLoad.roleId ==1 ? this.state.hu : this.state.staffMenu}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        docked={this.state.sidebarDocked}
        sidebarClassName="cust-side"
      
        
       
      >
          
        {/* <button onClick={() => this.onSetSidebarOpen(true)} style={{marginLeft:"20px", color:"black", zIndex:"1200"}}>
          <i className="fa fa-bars"> </i>
         
        </button> */}
</Sidebar>

<div id="container-wrapper">
        
        <div id="dashboard">
        {/* <span 
                  className="avatar avatar-sm"
                  style={{ backgroundColor: "white", width:"90px", height:"100px" }}
                >
                  <img style={{width:"70px"}} src={logosm} />
                </span> */}

         
            <a onClick={() => this.onSetSidebarOpen(true)} class="dashboard-responsive-nav-trigger"><i class="fa fa-reorder"></i> Dashboard Navigation</a>  

            <div class="dashboard-sticky-nav">
                <div class="content-left pull-left">
                    <a >
            <span 
                  className=""
                  style={{width:"50px", height:"100%" }}
                >
                  <img style={{width:"inherit"}} src={logosm} />
                </span>

                    </a>
                </div>
                <div className="content-center pull-left" style={{marginLeft:"80px", paddingTop:"40px"}}><h3>Nnamdi Azikiwe University HR Management Solution</h3></div>
                <div class="content-right pull-right">
                    
                    <div class="search-bar">
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control" id="search" placeholder="Search Now"/>
                                <a href="#"><span class="search_btn"><i class="fa fa-search" aria-hidden="true"></i></span></a>
                            </div>
                        </form>
                    </div>
                    <div class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <div class="profile-sec">
                                <div class="dash-image">
                                    <img src="images/comment.jpg" alt=""/>
                                </div>
                                <div class="dash-content">

                                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    <h4>{this.state.payLoad?.username}</h4>
                                    <span>Administrator</span>
                    </DropdownToggle>
                    
                    <DropdownMenu right style={{zIndex:"9999"}}>
                        <DropdownItem href="#">
                          My Profile
                        </DropdownItem>

                        <DropdownItem href="#">
                          News
                        </DropdownItem>

                        <DropdownItem onClick={this.logout} style={{cursor:"pointer"}}>
                        <Link style={{cursor:"pointer"}}>Logout</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>




                                    
                                </div>
                            </div>
                        </a>
                      
                    </div>
               
               
                    <div class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <div class="dropdown-item">
                                <i class="fa fa-power-off" id="log-o" onClick={this.logout}></i>
                                {/* <span class="notify">3</span> */}
                            </div>
                        </a>
                        <div class="dropdown-menu notification-menu">
                            <h4> 599 Notifications</h4>
                            <ul>
                                <li>
                                    <a href="#">
                                        <div class="notification-item">
                                            <div class="notification-image">
                                                <img src="images/comment.jpg" alt=""/>
                                            </div>
                                            <div class="notification-content">
                                                <p>You have a notification.</p><span class="notification-time">2 hours ago</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="notification-item">
                                            <div class="notification-image">
                                                <img src="images/comment.jpg" alt=""/>
                                            </div>
                                            <div class="notification-content">
                                                <p>You have a notification.</p><span class="notification-time">2 hours ago</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="notification-item">
                                            <div class="notification-image">
                                                <img src="images/comment.jpg" alt=""/>
                                            </div>
                                            <div class="notification-content">
                                                <p>You have a notification.</p><span class="notification-time">2 hours ago</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <p class="all-noti"><a href="#">See all notifications</a></p>
                        </div>
                    </div>
                </div>
            </div>
           
           
           
           
            
                    {/* <ul>
                        <li class="active"><a href="dashboard.html"><i class="sl sl-icon-settings"></i> Dashboard</a></li>
                        <li><a href="dashboard-my-profile.html"><i class="sl sl-icon-user"></i> Edit Profile</a></li>
                        <li><a href="dashboard-addtour.html"><i class="sl sl-icon-plus"></i> Add Tour</a></li>
                        <li>
                            <a><i class="sl sl-icon-layers"></i> Tour Listing</a>
                            <ul>
                                <li><a href="dashboard-list.html">Active <span class="nav-tag green">6</span></a></li>
                                <li><a href="dashboard-list.html">Pending <span class="nav-tag yellow">1</span></a></li>
                                <li><a href="dashboard-list.html">Expired <span class="nav-tag red">2</span></a></li>
                            </ul>   
                        </li>
                        <li><a href="dashboard-booking.html"><i class="sl sl-icon-list"></i> Booking List</a></li>
                        <li><a href="dashboard-history.html"><i class="sl sl-icon-folder"></i> History</a></li>
                        <li><a href="dashboard-reviews.html"><i class="sl sl-icon-star"></i> Reviews</a></li>
                        <li><a href="index.html"><i class="sl sl-icon-power"></i> Logout</a></li>
                    </ul> */}
                    {/* <SideBar/> */}
          
           
            
            
            
            
            
            
        </div>

    </div>




      
    


      
      


    
      </>
    );
  }
}
 
export default App;