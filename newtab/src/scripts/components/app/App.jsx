import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Tasks from './Tasks';
import PriorityTasks from './PriorityTasks';
import Notes from './Notes';

const Pages = {
  TODAY_TASK:1,
  PRIORITY_TASK:2,
  NOTES:3
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:props.page || Pages.NOTES
    }
  }

  changePage = (page) => {
    this.setState({
      page: page || Pages.NOTES
    });
  }

  componentwillreceiveprops() {

  }

  render() {
    let page = this.state.page;
    return (
      <div className="bg-dark fade-in">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="mainNav">
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
              {/* <li className={"nav-item "+ (page === Pages.TODAY_TASK ? ' active': '')} data-placement="right" title="Today's Tasks" onClick={()=>{this.changePage(Pages.TODAY_TASK)}}><a className="nav-link"><span className="glyphicon glyphicon-ok"></span></a></li> */}
              <li className={"nav-item "+ (page === Pages.PRIORITY_TASK ? ' active': '')} data-placement="right" title="Priority Based Tasks" onClick={()=>{this.changePage(Pages.PRIORITY_TASK)}}><a className="nav-link"><span className="glyphicon glyphicon-tasks"></span></a></li>
              <li className={"nav-item "+ (page === Pages.NOTES ? ' active': '')} data-placement="right" title="Notes"><a className="nav-link" onClick={()=>{this.changePage(Pages.NOTES)}}><span className="glyphicon glyphicon-edit"></span></a></li>
            </ul>
          </div>
        </nav>
        <div className={"container-fluid"}>
          <div className={"menu menu-bar"}>
            {/* <button className={"btn btn-status btn-all"}>All</button> */} {/* Add class .active */}
            {/* <button className={"btn btn-status btn-active"}>Active</button> */} {/* Add class .active */}
            {/* <button className={"btn btn-status btn-completed"}>Completed</button> */} {/* Add class .active */}            
          </div>
        </div>
        <div className="content-wrapper">
          <div className="container-fluid">
            {page === Pages.PRIORITY_TASK ? <PriorityTasks />: ''}
            {page === Pages.TODAY_TASK ? <PriorityTasks />: ''}
            {page === Pages.NOTES ? <Notes />: ''}
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
