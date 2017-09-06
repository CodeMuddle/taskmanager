import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentwillreceiveprops() {

    }

    render() {
        return (
            <div className={"col-sm-6"}>
                <div className={"section-container border-" + (this.props.color || "default")}>
                    <div className={"section-header"}>
                        <span className={"section-header-head"}>{this.props.title || "Tasks"}</span> <span className={"badge"}>0</span>
                    </div>
                    <div className={"section-body clearfix"}>
                        <input type="text" className={"create-input"} value="" placeholder="Create new Task" />
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
