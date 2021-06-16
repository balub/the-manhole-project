import React from "react";
import "./App.css";
import Maps from "./Components/Mapps";
const axios = require("axios")

function App() {
  function exec(){
    axios({
      url: 'https://prometheus-graphql-api.herokuapp.com/graphql',
      method: 'post',
      data: {
        query: `
        {
          ideas(amt:5){
              id
              title
              description
              tech
              difficulty
              resources{
                  source
                  desc
              }
          }
      }
          `
      }
    }).then((result) => {
      console.log(result.data)
    });
  }
  return (
    <div>
      {exec()}
      <Maps />
    </div>
  );
}

export default App;
