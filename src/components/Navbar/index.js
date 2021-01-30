import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import { connect, getTokenBalance, getEthBalance } from '../Utils/utils';
const wethAbi = require('../Utils/abis/Weth.json');
const maskAbi = require('../Utils/abis/MASK.json');

function NavBar() {

    const [value, setValue] = useState("Connect");
      
  const connectWeb3 = async () => {
    const address = await connect();
    if(address == false)
    {
        setValue("Connect");
return;
    } 
           setValue("Connected");
  };

   
        return (  
            <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="#">
                    <img src = {logo} className = 'logo'/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link mr-2 btn btn-primary text-white btn-sm" to="/dashboard">Dashboard</Link>
                            </li>
                        <li className="nav-item">
                            <Link className="nav-link btn btn-primary text-white btn-sm" onClick={connectWeb3}>{value}</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
}
export default NavBar;