// src/components/App/index.js
import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import './style.css';
import Fwrapper from '../Faker/Fwrapper.js'

class App extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    // state = {}

    render() {
        const {
            className,
            ...props
        } = this.props;
        return (
            <div className={classnames('App', className)} {...props}>
                <div className="App-header">
                    <img src={'https://i.imgur.com/ShIBg1B.jpg?1'} className="App-logo" alt="logo"/>
                    <h2>CNN is Fake News?</h2>
                </div>
                <Fwrapper/>
            </div>
        );
    }
}

export default App;
