import React, { Component } from 'react';
class Privacy extends Component {
  render() {
    return (
        <div className="row">
            This app uses chrome storage. All data is are synced with your own browser data storage for extensions. Google sync this data to its server and across your devices.
        </div>
    );
  }
}

export default Privacy;
