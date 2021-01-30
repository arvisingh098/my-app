import React, { Component } from 'react';
class Cards extends Component {
    state = {  }
    render() { 
        const {heading,secondText,bottomText} = this.props;
        return ( 
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <p className="card-text">{heading}</p>
                    <h5 className="card-title">{secondText}</h5>
                    <small className="card-text">{bottomText}</small>
                </div>
            </div>
         );
    }
}
 
export default Cards;