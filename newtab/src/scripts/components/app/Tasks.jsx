import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Task from './Task';

class App extends Component {
    constructor(props) {
        super(props);
        console.log("checking dispatch", this.props);
        this.state = {
            value: ''
        }
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.updateCheckbox = this.updateCheckbox.bind(this);
    }

    componentwillreceiveprops() {

    }

    changeValue(event) {
        this.value = event.target.value
    }

    deleteTask(t) {
        console.log("Tasks::deleteTask", t);
        this.props.dispatch({
            'actionType': 'removeFromList',
            'task': t,
            'type': 'removeFromList'
        });
        this.forceUpdate();
    }

    updateTask(t) {
        this.props.dispatch({
            'actionType': 'updateTask',
            'task': t,
            'type': 'updateTask'
        });
        this.forceUpdate();
    }

    updateCheckbox(t) {
        this.props.dispatch({
            'actionType': 'updateTask',
            'task': t,
            'type': 'updateTask'
        });
        this.forceUpdate();
    }

    addToList(e) {
        e.preventDefault();
        console.log("Task::addToList ", this.props);
        this.value = this.value && this.value.trim();
        if(!this.value){
            return
        }
        this.props.dispatch({
            'actionType': 'addToList',
            'text': this.value || "",
            'type': this.props.taskType
        });
        console.log("Task::addToList ", this.props);
        if (this.inputValue) {
            this.inputValue.value = '';
        }
        this.value = '';

        this.forceUpdate();
    }

    showCompletedTask(t) {
        console.log('called');
        this.props.taskStatus[t] = !this.props.taskStatus[t];
        this.props.dispatch({
            'actionType': 'updateStatus',
            'type': 'updateStatus',
            'taskStatus': this.props.taskStatus
        });
        this.forceUpdate();
    }

    render() {
        var currentList = (this.props.list || []).filter(l => this.props.taskType === l.type);
        var activeList = currentList.filter((l) => !l.isCompleted);
        var completedList = currentList.filter((l) => l.isCompleted);
        var loopList = [], cList = [];
        for (var i = 0; i < activeList.length; i++) {
            var task = activeList[i];
            loopList.push(<Task task={task} onDelete={this.deleteTask} updateTask={this.updateTask} key={task.id} updateCheckbox={this.updateCheckbox} />);
        }

        if (this.props.taskStatus[this.props.taskType]) {
            for (var i = 0; i < completedList.length; i++) {
                var task = completedList[i];
                cList.push(<Task task={task} key={task.id} onDelete={this.deleteTask} updateCheckbox={this.updateCheckbox} />);
            }
        }
        var showCompletedButton = "";
        if (completedList.length) {
            if (!this.props.taskStatus[this.props.taskType]) {
                showCompletedButton = (<span className={"button-show-task"} onClick={(e) => { this.showCompletedTask(this.props.taskType) }}>Show {completedList.length} done tasks</span>);
            } else {
                showCompletedButton = (<span className={"button-show-task"} onClick={(e) => { this.showCompletedTask(this.props.taskType) }}>Hide done tasks</span>);
            }
        } else {
            showCompletedButton = (<span className={"button-show-task"}>No Completed Tasks</span>);
        }


        console.log('Tasks::looplist', loopList, currentList, this.props.list);
        return (
            <div className={"col-sm-6 " + (this.props.customClass || "")}>
                <div className={"section-container border-" + (this.props.color || "default")}>
                    <div className={"section-header"}>
                        <span className={"section-header-head"}>{this.props.title || "Tasks"}</span> <span className={"badge"}>{activeList.length}/{currentList.length}</span>
                    </div>
                    <div className={"section-body clearfix"}>
                        <form onSubmit={(e) => { this.addToList(e) }}>
                            <input type="text" className={"create-input highlight-" + (this.props.color || 'default')} ref={(input) => this.inputValue = input} placeholder="Create new task" onChange={(e) => { this.changeValue(e) }} />
                        </form>
                        <ol>
                            {loopList}
                            {cList}
                        </ol>
                    </div>
                    <div className={"section-footer"}>
                        {showCompletedButton}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    state.tasks = state.tasks || {};
    return {
        list: state.tasks.list || [],
        search: state.tasks.search || "",
        type: state.tasks.type || null,
        taskStatus: state.tasks.taskStatus || {}
    };
};

export default connect(mapStateToProps)(App);
