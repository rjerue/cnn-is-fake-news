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
	<body id="paddeddiv">
		<div id="top">
			<img className={classnames('HeaderImg', className)} {...props} src="http://static3.businessinsider.com/image/58972cb06e09a8f2208b5189-480/alec-baldwin-donald-trump-2-5-nbc-snl.jpg" alt="Alec Baldwin as Donald Trump"/>
			<img className={classnames('HeaderImg', className)} {...props} src="http://www.redstate.com/uploads/2013/11/mcconnell-thumb.jpg" alt="Mitch McConnell"/>
			<img className={classnames('HeaderImg', className)} {...props} src="http://i.imgur.com/iNOwdeW.jpg?1" alt="Obama Bans Dabbing"/>
			<img className={classnames('HeaderImg', className)} {...props} src="http://www.daveandchad.com/wp-content/uploads/2015/10/bilde-685x342.jpg" alt="Shame on Fake News!"/>
		</div>
		<div className={classnames('About', className)} {...props}>
        		<h1>About:</h1>
			<p id = "abouttxt"> The time has come, America, to fight back against the fake news sites of the world, 
			such as the <b>notorious</b> CNN. This platform is designed to bring you the real news. The best news. 
			And we think that it will change the media <em><b>BIGLY</b></em>. We think people are tired of the 
			lying media; we hear everyday that "something needs to be done" and "you all are the best for the job." 
			After all, they did elect us. They know we have great information, the best information, perfect, like it's 
			crazy. They love us. And they will <em>love</em> this too.
		        </p>
      		</div>
      </body>
    );
  }
}
