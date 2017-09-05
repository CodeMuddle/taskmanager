import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';

class App extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(){

  }

  componentwillreceiveprops(){
      $('[type="date"]').datepicker();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.submitForm}>
        <label htmlFor=""> Task
          <input type="text" className={"form-control input-sm"} value={this.props.taskDescription} />
        </label>
        <label htmlFor="">
          Priority
          <select name="" className={"form-control input-sm"} id="">
            <option value="1">Do First</option>
            <option value="2">Schedule</option>
            <option value="3">Delegate</option>
            <option value="4">Really ?</option>
          </select>
        </label>
        <label htmlFor="">Date time
        <DatePicker
dateFormat="YYYY/MM/DD"
selected={this.props.date} />
        </label>
        <button type="submit"  className={"btn btn-primary pull-right"}>Save</button>
      </form>
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
