import React, { Component } from 'react';
import Cards from '../Card';
import Button from '@material-ui/core/Button';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import Tabse from '../Tabs';

class Third extends Component {
    state = {  }
    render() { 
        return ( 
            <div className = 'container' style = {{height:600}}>
                <div className = 'd-flex justify-content-center align-items-center m-3'>
                    <div className = 'card' style = {{width:"60%"}}>
                        <div className="card-body">
                            <Tabse/>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Third;