import React from "react";

import { handleLogin, isLoggedIn } from "../utils/auth";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { LoginRequest, fetchData, fetchDataWithoutToken } from "../utils/crud";
import {MetroSpinner, RotateSpinner} from "react-spinners-kit";
import logosm from "../images/ziklogosm.png"
import logornd from "../images/FUTA-Logo1.png";
import login from "../images/login2.jpg";
import {Fade} from "reactstrap"
import ClockLoader from "react-spinners/ClockLoader";



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
} from "reactstrap";

var HeroStyle = {
  width: "100%",
  height: "60vh",
  backgroundImage: "url(" + login + ")",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
};

var Overlay = {
  backgroundColor: "rgb(84 77 79 / 66%)",
  position: "relative",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  textAlign: "center",
}

export default class LoginPage extends React.Component {
  state = {
    username: ``,
    password: ``,
    spin: false,
    newRedirect: false,
    // logging: true,
  };

  proceed = () => {
    this.setState({
      navigate: true,
    });
  };

  logOut = () => {
    localStorage.clear();
    this.setState({
      loggedIn: false,
    });
  };

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    this.setState({
      logging:true
    })
    let currentState = this;
   
    event.preventDefault();
let loginLoad = {
  password: this.state.password,
  username: this.state.username
}



LoginRequest("/Users/authenticate", loginLoad, data => {
  console.log(data, "Login Load")
  if(data.errorFeed == 400){
    this.setState({
      logging: false
    })
    alert("Invalid Login Credentials")
    return false
  }
  if (data.loginStatus == 200) {
    
    fetchDataWithoutToken(`/Staff/${data.staffId}`, (data) => {
        console.log(data, "Reload");
        localStorage.setItem("DTOFULL", JSON.stringify(data))
      });
    
      setTimeout(()=>{
          localStorage.setItem("userData", JSON.stringify(data));
          console.log(data, "User Data");
          window.location.href = "Dashboard"
            currentState.setState({
              // newRedirect: true,
              // logging:false
            });

          },3000)
      
        }
})
    

    // axios({
    //   method: "POST",
    //   url: URL + "/Users/authenticate",
    //   data: loginLoad,
    //   config: {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   },
    // })
    //   .then((res) => {
    //     if (res.status == 200) {

    //       localStorage.setItem("userData", JSON.stringify(res.data));
    //       console.log(res.data, "User Data");
    //       currentState.setState({
    //         newRedirect: true,
    //         logging:false
    //       });
    //     }
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     currentState.setState({
    //       logging: false,
    //     });
    //     alert("Invalid Login Credentials");
    //     return false;
    //   });
  }



  componentDidMount() {
    if (localStorage.getItem("userData")) {
      // alert("You are already Logged In")
      
      this.setState({
        loggedIn: true,
      });
    }
  }

  render() {
    // if (this.state.loggedIn) {
    //   return <Redirect to={{ pathname: "/Dashboard" }} />;
    // }

    if (this.state.newRedirect) {
      return <Redirect to={{ pathname: "/Dashboard" }} />;
    }
    return (
      <React.Fragment>
        <Fade>
        <div>
          {this.state.logging ? (
            <div className="jumbo-back">
              <div className="container sp">
                <div className="jumbotron jumbo">
                  <div className="metro-spin">
                    <MetroSpinner
                      size={100}
                      color={"#9a2387"}
                      loading={this.state.loading}
                    />
                  </div>
                  <p>
                    <b>{this.props.msg}</b>
                  </p>
                </div>
              </div>
            </div>
          ) : null}

         

          <div className="main-content">
            {/* Header */}
            {/* bg-gradient-primary */}
            <div style={HeroStyle}>
                <div style={Overlay}>

                    <div className="header py-7 py-lg-8"> 
                      <div className="container">
                        <div className="header-body text-center mb-5">
                          <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-8 col-md-8 px-3">
                            <span 
                          className=""
                          style={{ backgroundColor: "transparent",}}
                        >
                          <img style={{width:"120px"}} src={logornd} />
                        </span>
                              <h1 className="text-white">Federal University of Technology, Akure</h1>
                              {/* <h4 className="text-white">LiteHR</h4> */}
                              <p className="text-lead text-white">
                                Human Resource Manager
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                    
                </div>
            </div>
{/* Page content */}
            <div className="container mt--8 pb-5">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7">
                  <div
                    className="card bg-secondary border-0 mb-0"
                    id="anything"
                  >
                    <div className="card-body px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <h2>Sign In</h2>
                      </div>
                      <form
                        method="post"
                        onSubmit={(event) => {
                          this.handleSubmit(event);
                          // navigate(`/app/profile`)
                        }}
                      >
                        <div className="form-group mb-3">
                          <div className="input-group input-group-merge input-group-alternative">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="ni ni-email-83 text-light" />
                              </span>
                            </div>
                            <input
                              required
                              className="form-control"
                              placeholder="Username"
                              type="text"
                              value={this.state.username}
                              onChange={(e) =>
                                this.setState({ username: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group input-group-merge input-group-alternative">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="ni ni-lock-circle-open text-light" />
                              </span>
                            </div>
                            <input
                              required
                              className="form-control"
                              placeholder="Password"
                              type="password"
                              value={this.state.password}
                              onChange={(e) =>
                                this.setState({ password: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="custom-control custom-control-alternative">
                        
                          <label
                           
                            htmlFor=" customCheckLogin"
                          >
                              {/* <i
                          className="fa fa-hand-o-right text-warning"
                          /> */}
                          
                          &nbsp;<a href="GetLoginDetails" className="text-warning">
                            {/* <small className="text-warning">I have not been assigned a Login Credential</small> */}
                            </a>
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn my-4"
                            style={{backgroundColor:"#a82ca8", color:"ghostwhite"}}
                          >
                            Sign in <i className="fa fa-sign-in"/>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      {/* <a href="#" className="text-light"><small>Forgot password?</small></a> */}
                    </div>
                    <div className="col-6 text-right">
                      {/* <a href="#" className="text-light"><small>Create new account</small></a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Fade>
      </React.Fragment>
    );
  }
}
