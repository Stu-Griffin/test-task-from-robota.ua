import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import './App.css';

export const savedForMeStatus = "savedForme";
export const isnotInterestForMe = "disliked";
export const responseOnVacancy = "responsed";

function App() {
  return (
    <div>
      <Header/>
      <Main/>
    </div>
  );
}

export default App;