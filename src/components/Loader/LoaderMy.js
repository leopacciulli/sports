import React, { Component } from 'react'
import Loader from 'react-loader-spinner';

export default class LoaderMy extends Component {
    
    render() {
        return (
            <div className={this.props.className}>
                <Loader 
                    type="Oval"
                    color="#424242"
                    height="50"	
                    width="50"
                />
            </div>   
        )
    }
}