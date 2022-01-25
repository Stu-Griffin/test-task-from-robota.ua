import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header/Header';
import Main from './Main/Main';
import './App.css';
import { openOrCloseModal } from "../reducer/reducer";

export const defaultstatus = "active";
export const savedForMeStatus = "savedForme";
export const isnotInterestForMe = "disliked";
export const responseOnVacancy = "responsed";
export const errorInUploadingFileSize = "errorInUploadingFileTooBig";
export const errorInUploadingFileType = "errorInUploadingFileWrongType";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
function App() {
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.modalStatus);
  const url = useSelector((state) => state.url);
  return (
    <div>
      <Modal isOpen={Boolean(modalStatus)} ariaHideApp={false} onRequestClose={() => {
        dispatch(openOrCloseModal(modalStatus))
      }} style={customStyles} contentLabel="Modal with URL">
        <button onClick={() => {
          dispatch(openOrCloseModal(modalStatus))
        }}>закрыть</button>
        <button onClick={() => {
          window.open(url)
        }}>Посмотреть мой файл</button>
      </Modal>
      <Header/>
      <Main/>
    </div>
  );
}
export default App;