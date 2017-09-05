import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentwillreceiveprops(){
    
  }

  render() {
    return (
      <div>
      <div>Filters By:
        <label htmlFor="">Date
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.props.date} 
        />
        </label>
      </div>
      <div>
        <div>
          <div className={"col-sm-6"}>
            <div className={"section-container green"}>
                <div className={"section-header text-center"}>
                    <span className={"section-header-head"}>Do First</span>
                    <span className={"pull-right glyphicon glyphicon-plus"}></span>
                </div>
                <div className={"section-body clearfix"}>
                    <ol>
                      <li>
                        <span className={""}> <span className={"glyphicon glyphicon-ok"}></span> </span>
                        some text
                      </li>
                      <li>
                        <span className={""}> <span className={"glyphicon glyphicon-ok"}></span> </span>
                        some text
                      </li>
                    </ol>
                </div>
            </div>
          </div>
          <div className={"col-sm-6"}>
            <div className={"section-container blue"}>
                <div className={"section-header text-center"}>
                    <span className={"section-header-head"}>Schedule</span>
                    <span className={"pull-right glyphicon glyphicon-plus"}></span>
                </div>
                <div className={"section-body clearfix"}>
                    <ol>
                      <li>
                        <span className={""}> <span className={"glyphicon glyphicon-ok"}></span> </span>
                        some text
                      </li>
                      <li>
                        <span className={""}> <span className={"glyphicon glyphicon-ok"}></span> </span>
                        some text
                      </li>
                    </ol>
                </div>
            </div>
          </div>
          <div className={"col-sm-6"}>
            <div className={"section-container orange"}>
                <div className={"section-header text-center"}>
                    <span className={"section-header-head"}>Delegate</span>
                    <span className={"pull-right glyphicon glyphicon-plus"}></span>
                </div>
                <div className={"section-body clearfix"}>
                    <ol>
                      <li>
                        <span className={""}> <span className={"glyphicon glyphicon-ok"}></span> </span>
                        some text
                      </li>
                      <li>
                        <span className={""}> <span className={"glyphicon glyphicon-ok"}></span> </span>
                        some text
                      </li>
                    </ol>
                </div>
            </div>
          </div>
          <div className={"col-sm-6"}>
            <div className={"section-container red"}>
                <div className={"section-header text-center"}>
                    <span className={"section-header-head"}>Really?</span>
                    <span className={"pull-right glyphicon glyphicon-plus"}></span>
                </div>
                <div className={"section-body clearfix"}>
                    <ol>
                      <li>
                        <span className={""}> <span className={"glyphicon glyphicon-ok"}></span> </span>
                        some text
                      </li>
                      <li>
                        <span className={""}> <span className={"glyphicon glyphicon-ok"}></span> </span>
                        some text
                      </li>
                    </ol>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count || 0,
    tabs: state.tabs || {},
    currentTab: state.currentTab || {},
    search: state.search || "",
    type:state.type || null
  };
};

export default connect(mapStateToProps)(App);
