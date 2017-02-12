import React from 'react';
import classnames from 'classnames';
import FInput from './FInput';
import Result from './Result';
import Suggest from './Suggest';

class Fwrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            text: "He's the greatest dancer"
        };
    }

    handleChange(event) {
        this.setState({url: event.target.value});
    }

    handleClick(event) {
        console.log('clicked');
        let me = this;
        var myHeaders = new Headers();

        var myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        fetch('/url/' + me.state.url.replace(/\//g, '_').replace(/-/g, '_'))
        .then(function(response){
          return response.json();
        })
        .then(function(myJSON){
          console.log(myJSON);
          //me.setState({text: myJSON.text});
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <FInput className="row" handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} url={this.state.url}/>
                <div className="row">
                    <Result text={this.state.text}/>
                    <Suggest/>
                </div>
            </div>
        );
    }
}
export default Fwrapper;
