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
            text: "He's the greatest dancer",
            data: ""
        };
    }

    handleChange(event) {
        this.setState({url: event.target.value});
    }

    handleClick(event) {
        console.log('clicked');
        let me = this;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //myHeaders.append("Content-Length", JSON.stringify({url: theUrl}).length.toString());
        myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
        console.log(myHeaders);
        var theUrl = this.state.url
        console.log('LOOK ', theUrl)
        fetch('/url/' + me.state.url.replace(/\//g, '_').replace(/-/g, '_'), {
            headers: myHeaders,
            method: 'POST',
            body: JSON.stringify({url: theUrl})
        }).then(function(response) {
            return response.json();
        }).then(function(myJSON) {
            console.log(myJSON);
            me.setState({data: myJSON});
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <FInput className="row" handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} url={this.state.url}/>
                <div className="row">
                    <Result data={this.state.data}/>
                    <Suggest data={this.state.data.sug}/>
                </div>
            </div>
        );
    }
}
export default Fwrapper;
