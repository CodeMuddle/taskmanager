import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Tasks from './Tasks';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentwillreceiveprops() {

  }

  render() {
    return (
      <div>
        {/* <div>Filters By:
          <label htmlFor="">Date
            <DatePicker
              dateFormat="YYYY/MM/DD"
              selected={this.props.date}
            />
          </label>
          <div className={"btn-group filter-task"} data-toggle="buttons">
            <label className={"btn btn-primary active"}>
              <input type="radio" name="options" id="option1" autocomplete="off" checked /> All
            </label>
            <label className={"btn btn-primary"}>
              <input type="radio" name="options" id="option2" autocomplete="off" /> Active
            </label>
            <label className={"btn btn-primary"}>
              <input type="radio" name="options" id="option3" autocomplete="off" /> Completed
            </label>
          </div>
        </div> */}
        <div>
          <div>
            <Tasks
              color="green"
              title="Do First"
            />
            <Tasks
              color="blue"
              title="Schedule"
            />
            <Tasks
              color="orange"
              title="Delegate"
            />
            <Tasks
              color="red"
              title="Don't Do"
            />
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
    type: state.type || null
  };
};

export default connect(mapStateToProps)(App);
