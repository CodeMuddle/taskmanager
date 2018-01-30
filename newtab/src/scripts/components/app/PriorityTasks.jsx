import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tasks from './Tasks';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="row">
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
    );
  }
}

const mapStateToProps = (state) => {
  state.tasks = state.tasks || {};
  return {
    list: state.tasks.list || [],
    search: state.tasks.search || "",
    type: state.tasks.type || null
  };
};

export default connect(mapStateToProps)(App);
