import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Test_eval from './evaluator/Test_eval'
// import Async_test  from './async/Async_test'


const host = "http://localhost:8080/"

const getNewList=()=>{
  return axios.get(host+"getallperson")
     
}

const getSchemInfo=(viewId)=>{

  

  let data = import(`./test/${viewId}.js`).then(({default:res})=>{
    return res
  });

  // import(`./test/${viewId}.js`).then(({default:res})=>{
  //   data = res
  //   return res
  // })
  // data  = require(`./test/${viewId}.js`)
  return data;
}

function getAllInfo(viewID) {
 
  console.log("======>",  require(`./test/${viewID}.js`));
  
  }

class App extends Component {

  state  = {
    tableData:[{}],
    tag:0
  }

  
  
  componentWillMount(){
    // let data
    let viewId = "amodule"
    const a = getSchemInfo(viewId)
    // console.log("a",a)
    // getAllInfo(viewId)

    // data=require("./testmodules/amodule.js")
    // console.log("data",data.a)
    this.getJsonData();
  }

  getJsonData = () => {
    const _this=this;
    getNewList().then(res =>{
      console.log("data",res.data)  
      this.a = res.data
      this.setState({
        tag:1,
        tableData:[{"id":1}]
      })
    });
  }
 
 


  
  render() {
    
    return (
      <div className="App">
           {/* {this.state.tableData} */}
           {/* {console.log("tableData",this.state.tableData)} */}
          <Test_eval/>
          {/* <Async_test/> */}
      </div>
    );
  }
}

export default App;
