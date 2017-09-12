import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDelete:false,
            isChecked:props.task.isCompleted,
            value:props.task.text
        }
        console.log("Task::constructor => props",props);
    }

    changeValue(e) {
        var t = this.props.task;
        t.isCompleted = this.checkbox.checked
        this.props.dispatch({
            'actionType':'updateTask',
            'task':t,
            'type':'updateTask'
        });
    }

    changeInputValue(event) {
        var _this = this;
        var value = event.target.value;
        console.log("Task:changeInputValue => target value",value);
        if(this.state.debounce) {
            clearTimeout(this.state.debounce);
        }
        var debounce = setTimeout(function() {
            var t = _this.props.task;
            t.text = value;
            _this.setState({'debounce':null});
            _this.props.dispatch({
                'actionType':'updateTask',
                'task':t,
                'type':'updateTask'
            });
        },1000);
        this.setState({'value':value,"debounce":debounce});
    }

    deleteTask(t){
        console.log("Task::deleteTask",t);
        this.props.dispatch({
            'actionType':'removeFromList',
            'task':t,
            'type':'removeFromList'
        });
    }

    render() {
        var l = this.props.task;
        return (
            <li>
                <label className={"checkboxLabel"}>
                    <input ref={(checkbox)=>{ this.checkbox = checkbox; }} type="checkbox" onChange={(e)=>{ this.changeValue(e) }} />
                    <span className={"glyphicon glyphicon-ok"}></span>
                </label>
                <input ref={(input)=>{ this.input = input; }} className={"create-input w80"} type="text" value={this.state.value} onChange={(e)=>{ this.changeInputValue(e) }} /><span className={"pull-right hover"} onClick={(e)=>{this.deleteTask(l);}}>Delete</span></li>
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
