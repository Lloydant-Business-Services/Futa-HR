import React from "react"
import Header from "./header"
import Sidenav from "./sidenav"
import Topnav from "./topnav"
import Footer from "./footer"
import "./layout.css"
import { getUser } from "../utils/auth"


const Layout = ({ children }) => {

    return (
        <>
            <Header />
            <Sidenav/>
            <div className="main-content" id="panel">
                <Topnav/>
                <div className="header pb-6">
                    <div className="container-fluid">{children}</div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout
