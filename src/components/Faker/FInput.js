import React from 'react';
import classnames from 'classnames';
import {Button} from 'react-bootstrap';

class FInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3 inputs">
                <div>
                    <label>Please Enter a URL</label>
                    <input type="text" className="form-control" placeholder="http://cnn.com/" value={this.props.url} onChange={(e) => this.props.handleChange(e)}/>
                    <Button className="the-button" onClick={(e) => this.props.handleClick(e)}>Go</Button>
                </div>
            </div>
        );
    }
}
export default FInput;
