import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Task from './Task';

class App extends Component {
    constructor(props) {
        super(props);
        console.log("checking dispatch",this.props);
        this.state = {
            value:''
        }
    }

    componentwillreceiveprops() {
        
    }

    changeValue(event){
        this.value = event.target.value
    }

    deleteTask(e){
        alert("called");
    }

    addToList(e) {
        e.preventDefault();
        console.log("Task::addToList ",this.props);
        this.props.dispatch({
            'actionType':'addToList',
            'text':this.value || "",
            'type':this.props.taskType
        });
        console.log("Task::addToList ",this.props);
        if(this.inputValue) {
            this.inputValue.value = '';
        }
        
        this.forceUpdate();
    }

    render() {
        var currentList = (this.props.list || []).filter(l=> this.props.taskType === l.type);
        var loopList = [];
        for(var i=0;i<currentList.length;i++) {
            var task = currentList[i];
            loopList.push(<Task task ={task}/>);
        }
        console.log('Tasks::looplist',loopList,currentList,this.props.list);
        return (
            <div className={"col-sm-6"}>
                <div className={"section-container border-" + (this.props.color || "default")}>
                    <div className={"section-header"}>
                        <span className={"section-header-head"}>{this.props.title || "Tasks"}</span> <span className={"badge"}>{currentList.length}</span>
                    </div>
                    <div className={"section-body clearfix"}>
                        <form onSubmit={(e)=> {this.addToList(e)} }>
                        <input type="text" className={"create-input"} ref={(input) => this.inputValue = input } placeholder="Create new Task" onChange={(e)=>{ this.changeValue(e) }}/>
                        </form>
                        <ol>
                            {loopList}    
                        </ol>
                    </div>
                    <div className={"section-footer"}>
                        <span className={"button-show-task"}>Show 1 done tasks</span>
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
        type: state.tasks.type || null
    };
};

export default connect(mapStateToProps)(App);
