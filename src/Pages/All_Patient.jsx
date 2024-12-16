import React from 'react'
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Input, TextField } from '@mui/material';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import SelectBox from '../Components/SelectBox';

function All_Patient() {

    const filterOption = [
        {
            label : "All",
            value : "All"
        },
        {
            label : "Good",
            value : "Good"
        },
        {
            label : "Very Good",
            value : "Very Good"
        },
        {
            label : "Excellent",
            value : "Excellent"
        },
    ]

    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        getAllPatient()
    }, [])

    const getAllPatient = async () => {
        await axios.get("https://hospital-backend-d1vb.onrender.com/api/get/all/patient")
            .then(res => {
                console.log(res.data.get_All_Patient);
                setData(res.data.get_All_Patient)
                setFilterData(res.data.get_All_Patient)
            }).catch(err => {
                console.log(err);
            })
    }

    const deletePatient = async (id) => {
        await axios.delete(`https://hospital-backend-d1vb.onrender.com/api/delete/patient/${id}`)
            .then(res => {
                console.log(res);
                getAllPatient()
                toast.success("deleted successfully")
            }).catch(err => {
                console.log(err);
            })
    }

    const searchPatient = (e) => {
        const key = e.target.value
        if(key?.length<=0){
            getAllPatient()
            return
        }else{
            axios.get(`https://hospital-backend-d1vb.onrender.com/api/search/patient/${key}`)
            .then(res=>{
                console.log(res);
                setData(res?.data?.search_Patient)
            })
        }
    }

    const sendToUpdatePatient = (id) => {
        navigate(`/dashboard/update/patient/${id}`)
    }

    // const itemData = [
    //     {
    //       img: '../alarm.png',
    //       title: 'Breakfast',
    //     },
    //     {
    //       img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    //       title: 'Bike',
    //     },
    //   ];

    const handleFilter = (e) => {
        console.log(e.target.value);

        const filtered = data.filter((items)=>{

            if(e.target.value === "Good"){
                return items.remark == "Good"
            }
            else if(e.target.value === "Very Good"){
                return items.remark == "Very Good"
            }
            else if(e.target.value === "Excellent"){
                return items.remark == "Excellent"
            }
            else{
                return items
            }


            
        })

        setFilterData(filtered)
    }


    return (


        <>
        <div style={{width:"1300px",margin:"auto"}}>
            <div className='heading'>
                <h1>All Patient</h1>
                <span className='total'>Total Patient: {data.length}</span>
            </div>

            <div className='search_and_filter'>
                <SelectBox data={filterOption} onChange={handleFilter}/>
                {/* <div>
                <TextField onChange={searchPatient} id="outlined-basic input_field" style={{ display: "block", justifyContent: "center", marginBottom: "10px" }} label="Search Patient" variant="outlined" />
                </div> */}
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Created Time</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Disease</TableCell>
                            <TableCell align="right">Phone No</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Emergency</TableCell>
                            <TableCell align="right">Remark</TableCell>
                            <TableCell align="right">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterData.map((patient) => (
                            <TableRow
                                key={data.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{new Date(patient?.createdAt).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</TableCell>
                                <TableCell align="right">
                                    {patient.name}
                                </TableCell>
                                <TableCell align="right">{patient.disease}</TableCell>
                                <TableCell align="right">{patient.phoneno}</TableCell>
                                <TableCell align="right">{patient.address}</TableCell>
                                <TableCell align="right">{patient.gender}</TableCell>
                                <TableCell style={{ width: "50px" }} align="right">{patient.emergency === true ? <img style={{ width: "50px" }} src="https://cdn-icons-png.flaticon.com/512/4325/4325930.png" /> : <img style={{ width: "50px" }} src='https://cdn-icons-png.flaticon.com/512/2804/2804959.png' />}</TableCell>
                                {/* <TableCell align="right">{patient.emergency===true ? <p>yes</p>:<p>no</p>}</TableCell> */}
                                <TableCell style={{ width: "50px" }} align="right">{patient.remark === "Good" ? <p>good</p> : patient.remark === "Very Good" ? <p>very good</p> : <p>Excellent</p>}</TableCell>
                                <TableCell style={{ width: "220px" }} align="right">
                                    <Button onClick={() => sendToUpdatePatient(patient._id)} variant="outlined" style={{ marginRight: "10px" }} startIcon={<CreateIcon />}>
                                        Edit
                                    </Button>
                                    <Button onClick={() => deletePatient(patient._id)} variant="outlined" style={{ color: "red", border: "1px solid #ff4545" }} startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>

        </>
    )
}

export default All_Patient