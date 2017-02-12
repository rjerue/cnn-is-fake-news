import React from 'react';
/*
  result: "real" / "fake" / "unknown",
  data: from twitterQuery

*/
export default class Result extends React.Component {

    render() {
        return (
            <div className="col-md-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Results
                    </div>
                    CNN IS FAKE NEWS!
                </div>
            </div>
        );
    }
}
