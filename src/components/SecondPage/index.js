import React, { Component } from 'react';
import Cards from '../Card';
class SecondPage extends Component {
    state = {  }
    render() { 
        return ( 
            <div className = 'container' style = {{color:'black'}}>
                <div className = 'd-flex justify-content-center align-items-center flex-column'>
                <div className = 'row m-3'>
                    <div className = 'col-4'>
                        <Cards 
                            heading = {'Current RAM Price'}
                            secondText = {'Coming Soon'}
                        />
                    </div>
                    <div className = 'col-4'>
                    <Cards 
                            heading = {'Target RAM Price'}
                            secondText = {'Coming Soon'}
                        />
                    </div>
                    <div className = 'col-4'>
                    <Cards 
                            heading = {'Crypto Market Cap'}
                            secondText = {'Coming Soon'}
                        />
                    </div>
                </div>
                <div className = 'row m-3'>
                    <div className = 'col-4'>
                         <Cards 
                            heading = {'Rebase Factor'}
                            secondText = {'Coming Soon'}
                            bottomText = {'tokens'}
                        />
                    </div>
                    <div className = 'col-4'>
                    <Cards 
                            heading = {'Current Supply'}
                            secondText = {'Coming Soon'}
                            bottomText = {'tokens'}
                        />
                    </div>
                    <div className = 'col-4'>
                    <Cards 
                            heading = {'Current Supply'}
                            secondText = {'Coming Soon'}
                            bottomText = {'tokens'}
                        />
                    </div>
                </div>
                {/* <div className = 'row m-3 text-white'>
                    <div className = 'col-12'>
                        <h5>Rebase will start in</h5>
                    </div>
                </div> */}
                <div className = 'row m-3'>
                    <div className = 'col-12'>
                    <Cards 
                            secondText = {'23:30:01'}
                        />
                        {/* <h5>23:30:01</h5> */}
                    </div>
                </div>
                <div className = 'row m-3 w-25'>
                    <div className = 'col-12'>
                        <button className = 'btn btn-primary btn-lg btn-block'>Rebase</button>
                    </div>
                </div>
                </div>
                
            </div>
         );
    }
}
 
export default SecondPage;