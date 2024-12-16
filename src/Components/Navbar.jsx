import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <div style={{width:"1300px",margin:"auto"}}>
        <div className="navbar">
        <h2>Patient Management</h2>
        <ul>
            <li><Link to="/dashboard/allpatient">All Patient</Link></li>
            <li><Link to="/dashboard/addpatient">Add Patient</Link></li>
        </ul>
        </div>
        </div>
    </>
  )
}

export default Navbar