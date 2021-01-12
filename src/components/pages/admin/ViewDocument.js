
import React, { Component } from "react";
import logosm from "../../../images/yy.jpg"
import ImgsViewer from 'react-images-viewer'
import Viewer from 'react-viewer';
 import Dept from "../../store"
 import { PDFReader } from 'reactjs-pdf-reader';
 import {Container} from "reactstrap"
 import Printer, { print } from 'react-pdf-print'
 import axios from "axios"
 import html2canvas from "html2canvas"
import jsPDF from "jspdf"




import { PDFDownloadLink, Document, Page, Text, View, PDFViewer, Image, Font} from '@react-pdf/renderer'
import MyDocument from "./MyDocument"
import { QRCode } from "react-qr-svg";
import { fetchData, editData, URL, imageURL, fetchImageData } from "../../../utils/crud";
// import { Document, Page } from 'react-pdf';
// import { PDFViewer } from 'react-view-pdf';
import eee from "../../eee.pdf"
import ReactToPrint from 'react-to-print';
import { data } from "jquery";
import Storee from "../../store"


//  class Docc extends Component{
 
//   render(){
//     return(
//       <>
// <PDFReader data={logosm}/>


//       </>
//     )
//   }
// }


export default class App extends Component {
    state = { 
      staffDocx: this.props.location.state.data,
      imageTrans: this.props.location.state.docImg
    }
  
   
    componentDidMount() {
     
      
      
       
   
      console.log(this.state.staffDocx, "StaffDoxx")
      setTimeout(()=>{
        this.setState({
            text:true,
        })
    },3000)
      setTimeout(()=>{
          this.setState({
              imageLink: this.state.staffDocx?.imageUrl
          })
      },6000)
    }

   
  printIdCard = () => {
		const filename  = 'StaffID Card.pdf';

    if(typeof window !== "undefined"){
      html2canvas(document.querySelector('#IDcard')).then(canvas => {
        let pdf = new jsPDF('p', 'mm', 'a4');
       
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', -10, 0, 210, 190);
        pdf.save(filename);
      });
    }
	}
  
    render() {
      let dee = this.state.imageTrans;
      return (
          <>




     
   

        <div className="App">

<PDFViewer width={1000} height={800}>
  <Document>
    {this.state.text ?  <Page>
      <Image src={{uri:"http://localhost/LiteHr/Resources/Document/Document_15_619_619.jpeg", method: 'GET', headers:{'Access-Control-Allow-Origin': '*'}}}/>
    </Page> : null}
  </Document>
</PDFViewer>





        {/* <div className="row justify-content-md-center" >
            <hr className="mx-0" />
            <div className="col-md-6">
              <div className="card px-3">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <div>
                        <button
                      
                          className="btn btn-outline-primary btn-icon btn-sm float-right mr-3"
                          type="button"
                          onClick={this.printIdCard}
                        >
                          <span className="btn-inner--icon">
                            <i className="fa fa-download" />
                          </span>
                          <span className="btn-inner--text">Download Card</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-lighter3 id-card" id="IDcard">
                 
                  <div
                    className="bg-accent"
                    style={{ backgroundColor: "#FF6000", minHeight: "5px" }}
                  ></div>

                  <div className="card-body">
                   <h3 style={{position:"absolute"}}>Nnamdi Azikiwe University</h3>

                   <img src={dee}/>
                  
                  </div>

                 
                </div>
              </div>
            </div>
          </div> */}
       
       
       
          </div>
     
     
   
        </>
      )
    }
  }










