import React, { useState } from 'react'
import { Input, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

function AddPatient() {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [disease, setDisease] = useState("")
    const [phoneno, setPhoneno] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("select")
    const [emergency,setEmergency] = useState("false")
    const [remark,setRemark] = useState("Good")


    const createPatientData = async (e) => {
        e.preventDefault()
        await axios.post("https://hospital-backend-d1vb.onrender.com/api/create", { name, disease, phoneno, address, gender , emergency,remark})
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    toast.success("created")
                    navigate(-1)
                } else {
                    console.log("something went wrong");
                }

            }).catch(err => {
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
                    <h1>Add Patient</h1>
                </div>
                <form onSubmit={createPatientData}>
                    <TextField onChange={(e) => setName(e.target.value)} value={name} id="outlined-basic input_field" style={{ display: "block", justifyContent: "center", marginBottom: "10px" }} label="Enter Patient Name" variant="outlined" />
                    <TextField onChange={(e) => setDisease(e.target.value)} value={disease} id="outlined-basic input_field" style={{ display: "block", justifyContent: "center", marginBottom: "10px" }} label="Enter Disease" variant="outlined" />
                    <TextField onChange={(e) => setPhoneno(e.target.value)} value={phoneno} id="outlined-basic input_field" style={{ display: "block", justifyContent: "center", marginBottom: "10px" }} label="Enter Phone No" variant="outlined" />
                    <TextField onChange={(e) => setAddress(e.target.value)} value={address} id="outlined-basic input_field" style={{ display: "block", justifyContent: "center", marginBottom: "10px" }} label="Enter Address" variant="outlined" />
                    {/* <select onChange={(e) => setGender(e.target.value)} value={gender}>
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select> */}
                    {/* <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select style={{ width: "100%", marginBottom: "10px" }} labelId="demo-simple-select-label" id="demo-simple-select" label="Gender"
                        onChange={(e) => setGender(e.target.value)} value={gender} >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select> */}
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

                    {/* <Button onClick={createPatientData} type='submit' variant="contained">Submit</Button> */}
                    <Button type='submit' variant="contained">Submit</Button>

                </form>
            </div>

        </>
    )
}

export default AddPatient