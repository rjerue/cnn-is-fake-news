import React from 'react';
import classnames from 'classnames';
import FInput from './FInput';
import Result from './Result';
import Suggest from './Suggest';

class Fwrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        };
    }

    handleChange(event) {

        this.setState({url: event.target.value});
    }

    handleClick(event) {
      console.log('clicked');
    }

    render() {
        return (
            <div className="container-fluid">
                <FInput className="row" handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} url={this.state.url}/>
                <div className="row">
                    <Result/>
                    <Suggest/>
                </div>
            </div>
        );
    }
}
export default Fwrapper;
