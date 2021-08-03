import React from "react";
import Main from "./Main";
import "./App.css";

window.getFromStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
};

window.setInStorage = (key, valueObj) => {  
  localStorage.setItem(key, JSON.stringify(valueObj));
};

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
