import React from "react";
// import Test from "./components/Test";
import "./App.css";
import EspaniconSDKWeb from "@espanicon/espanicon-sdk";

const lib = new EspaniconSDKWeb();
console.log("EspaniconSDKWeb");
console.log(lib);

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-main">
          <h1>
            Web Interface for testing the Espanicon SDK (web based library)
          </h1>
        </div>
      </header>
    </div>
  );
}
