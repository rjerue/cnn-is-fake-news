import React from 'react'
/*
  keywords: []
  tweets: []
*/
export default class Suggest extends React.Component{

  render() {
    return(
      <div className="col-md-6">
          <div className="panel panel-default">
              <div className="panel-heading">
                  Suggestions based on given URL that are from trusted sources.
              </div>
              {(typeof this.props.data !== 'undefined') ?
                this.props.data.map( (e) =>{
                  return  <a href={e.newUrl}>{e.newUrl}</a>
                }
              ) :null
              }
          </div>
      </div>
    );
  }
}
