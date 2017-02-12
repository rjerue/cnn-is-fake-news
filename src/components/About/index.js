// src/components/About/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
//import fwrapper from './fwrapper.js'
import './style.css';

export default class About extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>
        <h1>
          About:
          The time has come, America, to fight back against the fake news sites of the world, such as the <b>notorious</b> CNN. This platform is designed to bring you the real news. The best news. And we think that it will affect the media <em><b>BIGLY</b></em>. We think people are tired of the lying media; I hear everyday that "something needs to be done" and "you all are the best for the job." After all, they did elect us. They know we have great information, the best information, perfect, like it's crazy. They love us. And they will <em>love</em> this too.
        </h1>
      </div>
    );
  }
}
