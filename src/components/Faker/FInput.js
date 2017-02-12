import React from 'react';
import classnames from 'classnames';


class FInput extends React.Component {

    render() {
        return (
          <div className="form-group">
            <label>Please Enter a URL</label>
            <input type="text" className="form-control" placeholder="http://cnn.com/"/>
          </div>
        );
    }
}
export default FInput;
