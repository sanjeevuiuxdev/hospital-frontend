import logo from './logo.svg';
import './App.css';
import { Route , Routes } from 'react-router-dom';
import AddPatient from './Pages/AddPatient';
import All_Patient from './Pages/All_Patient';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import Edit_Patient from './Pages/Edit_Patient';

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/dashboard/addpatient' element={<AddPatient />}/>
        <Route path='/dashboard/allpatient' element={<All_Patient />}/>
        <Route path='/dashboard/update/patient/:id' element={<Edit_Patient />}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
