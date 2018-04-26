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
  }

  state = {};

  changePage = (page) => {
    this.setState({
      page: page || Pages.NOTES
    });
    this.props.dispatch({
      type:'PAGE',
      actionType:'PAGE',
      page: page || Pages.NOTES
    })
  }

  componentwillreceiveprops() {

  }

  render() {
    if(this.props.loading) {
      return <div className="loader-page">
                <div className="row">
                    <span className="col-sm-6 t t-green">Do First</span>
                    <span className="col-sm-6 t t-blue">Schedule</span>
                    <span className="col-sm-6 t t-orange">Delegate</span>
                    <span className="col-sm-6 t t-red">Don't Do</span>
                </div>
                <div className="loader-text">Productivity Matrix</div>
            </div>;
    }
    let page = this.state.page || this.props.page;
    return (
      <div className="bg-dark fade-in" style={{height:"100%"}}>
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
        <div className="content-wrapper" style={{height:"100%"}}>
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
  console.log("mapStateToProps ***",state,state.view);
  let loading = false;
  if(!state.view) {
    loading = true;
  }
  state.tasks = state.tasks || {};
  state.view = state.view || {};
  return {
    list: state.tasks.list || [],
    search: state.tasks.search || "",
    type: state.tasks.type || null,
    page: state.view && state.view.page || null,
    loading: loading,
    updateNote: state.view && state.view.updateNote,
  };
};

export default connect(mapStateToProps)(App);
