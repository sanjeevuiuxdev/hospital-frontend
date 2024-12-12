import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <div className="navbar">
        <ul>
            <li><Link to="/dashboard/allpatient">All Patient</Link></li>
            <li><Link to="/dashboard/addpatient">Add Patient</Link></li>

        </ul>
        </div>
    </>
  )
}

export default Navbar