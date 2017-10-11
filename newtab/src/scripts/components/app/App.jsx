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
        <div className={"container-fluid"}>
          <div className={"menu menu-bar"}>
            {/* <button className={"btn btn-status btn-all"}>All</button> */} {/* Add class .active */}
            {/* <button className={"btn btn-status btn-active"}>Active</button> */} {/* Add class .active */}
            {/* <button className={"btn btn-status btn-completed"}>Completed</button> */} {/* Add class .active */}            
          </div>
        </div>
        <div>
          <div>
            <Tasks
              color="green"
              title="Do First"
              taskType="1"
              customClass=""
            />
            <Tasks
              color="blue"
              title="Schedule"
              taskType="2"
              customClass="pl-0"
            />
            <Tasks
              color="orange"
              title="Delegate"
              taskType="3"
              customClass=""
            />
            <Tasks
              color="red"
              title="Don't Do"
              taskType="4"
              customClass="pl-0"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps",state);
  state.tasks = state.tasks || {};
  return {
    list: state.tasks.list || [],
    search: state.tasks.search || "",
    type: state.tasks.type || null
  };
};

export default connect(mapStateToProps)(App);
