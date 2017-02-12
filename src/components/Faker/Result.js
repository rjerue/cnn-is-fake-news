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
                    {
                      (this.props.data.status === "unsure") ?
                      <div>
                        <span>We don't know what kind of news this is.</span>
                        <br/>
                        <span>Real</span>
                        <br/>
                        {
                          this.props.data.data.real.map(
                            (e) => {
                              return <a href={e.newUrl}>{e.newUrl}</a>
                            }
                          )
                        }
                        <br/>
                        <span>Fake</span>
                        <br/>
                        {
                            this.props.data.data.fake.map(
                              (e) => {
                                return <a href={e.newUrl}>{e.newUrl}</a>
                            }
                          )
                        }

                      </div>
                      : null
                    }
                    {
                      (this.props.data.status === "real") ?
                      <div>
                        <span>This is real news</span>
                        <br/>
                        <span>Real</span>
                        <br/>
                        {
                          this.props.data.data.map(
                            (e) => {
                              return <a href={e.newUrl}>{e.newUrl}</a>
                            }
                          )
                        }
                      </div>
                      : null
                    }
                    {
                      (this.props.data.status === "fake") ?
                      <div>
                        <span>This is fake news</span>
                        <br/>
                        <span>Fake</span>
                        <br/>
                        {
                          this.props.data.data.map(
                            (e) => {
                              return <a href={e.newUrl}>{e.newUrl}</a>
                            }
                          )
                        }
                      </div>
                      : null
                    }
                </div>
            </div>
        );
    }
}
