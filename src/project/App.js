import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import './App.css';

export const defaultstatus = "active";
export const savedForMeStatus = "savedForme";
export const isnotInterestForMe = "disliked";
export const responseOnVacancy = "responsed";
export const errorInUploadingFileSize = "errorInUploadingFileTooBig";
export const errorInUploadingFileType = "errorInUploadingFileWrongType";

function App() {
  return (
    <div>
      <Header/>
      <Main/>
    </div>
  );
}

export default App;