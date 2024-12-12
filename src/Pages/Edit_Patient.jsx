import React, { useEffect, useState } from 'react'
import { Input, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

function Edit_Patient() {

    const params = useParams()

    const navigate = useNavigate()

    const [name,setName] = useState("")
    const [disease,setDisease] = useState("")
    const [phoneno,setPhoneno] = useState("")
    const [address,setAddress] = useState("")
    const [gender,setGender] = useState("")
    const [emergency,setEmergency] = useState("")
    const [remark,setRemark] = useState("")



    const getSinglePatientData = async () => {
        // const id = req?.params?.id
        await axios.get(`https://hospital-backend-d1vb.onrender.com/api/patient/${params.id}`)
        .then(res=>{
            console.log(res);
            setName(res.data.singlePatient.name)
            setDisease(res.data.singlePatient.disease)
            setPhoneno(res.data.singlePatient.phoneno)
            setAddress(res.data.singlePatient.address)
            setGender(res.data.singlePatient.gender)
            setEmergency(res.data.singlePatient.emergency)
            setRemark(res.data.singlePatient.remark)
        })
    }

    useEffect(()=>{
        getSinglePatientData()
    },[])

    const updatePatientData = async (e) => {
        e.preventDefault()
        await axios.patch(`https://hospital-backend-d1vb.onrender.com/api/update/patient/${params.id}`,{name,disease,address,phoneno,gender,emergency,remark})
         .then(res=>{
            
            console.log(res);
            if(res.data.success){
                navigate(-1)
            }else{
                console.log("something went wrong");
            }
         }).catch(err=>{
            console.log(err);
         })
    }

    const handleChange = (e) => {
        setGender(e.target.value)
    }
    const emergencyHandle = (e) => {
        setEmergency(e.target.value)
    }

    const remarKHandle = (e) => {
        setRemark(e.target.value)
    }

  return (
    <>
        <div className='form'>
                <div className='heading'>
                    <h1>Edit Patient</h1>
                </div>
                <form onSubmit={updatePatientData}>
                    <TextField onChange={(e)=>setName(e.target.value)} value={name}  id="outlined-basic input_field" style={{ display: "block", justifyContent: "center", marginBottom: "10px" }} label="Enter Patient Name" variant="outlined" />
                    <TextField onChange={(e)=>setDisease(e.target.value)} value={disease}  id="outlined-basic input_field" style={{ display: "block", justifyContent: "center", marginBottom: "10px" }} label="Enter Disease" variant="outlined" />
                    <TextField onChange={(e)=>setPhoneno(e.target.value)} value={phoneno} id="outlined-basic input_field" style={{ display: "block", justifyContent: "center", marginBottom: "10px" }} label="Enter Phone No" variant="outlined" />
                    <TextField onChange={(e)=>setAddress(e.target.value)} value={address} id="outlined-basic input_field" style={{ display: "block", justifyContent: "center", marginBottom: "10px" }} label="Enter Address" variant="outlined" />
                    
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select style={{ width: "100%", marginBottom: "10px" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={handleChange}
                            >
                                <MenuItem value="select">Select Gender</MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="others">Others</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Emergency</InputLabel>
                            <Select style={{ width: "100%", marginBottom: "10px" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={emergency}
                                label="Emergency"
                                onChange={emergencyHandle}
                            >
                                <MenuItem value="true">Emergency</MenuItem>
                                <MenuItem value="false">Normal</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Remark</InputLabel>
                            <Select style={{ width: "100%", marginBottom: "10px" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={remark}
                                label="Remark"
                                onChange={remarKHandle}
                            >
                                <MenuItem value="Good">Good</MenuItem>
                                <MenuItem value="Very Good">Very Good</MenuItem>
                                <MenuItem value="Excellent">Excellent</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    <Button  type='submit' variant="contained">Submit</Button>
                </form>
            </div>
    </>
  )
}

export default Edit_Patient