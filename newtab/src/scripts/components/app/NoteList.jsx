import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotesClass from '../../../utils/notes'
import Moment from 'react-moment';

let Notes = (new NotesClass());
class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(props){
    this.setState({
        deleteSure:null
    });
  }

  deleteNote = (note) => {
    this.props.dispatch({
        'actionType': 'removeNotes',
        'type': 'removeNotes',
        'id': note.id
    });
    this.setState({
        deleteSure: null
    })
  }

  clearNotes = () =>{
    //   this.props.dispatch({
    //     'actionType': 'clearNotes',
    //     'type': 'clearNotes'
    //   });
    //   this.props.showNewNotePage(true);
  }

  deleteCancel = () => {
    this.setState({
        deleteSure: null
    })
  }

  deleteSure = (note) => {
    this.setState({
        deleteSure: note.id
    })
  }

  render() {
      Notes._import(this.props.list);
      let state = this.state;
      let noteList = Notes._head && Notes.map((note)=>{
          let activeClass = "", isDelete = '';
          if(this.props.selectedNoteId === note.id){
            activeClass = "active";
          }
          if(this.state.deleteSure === note.id) {
              isDelete = (<span className="">Are you Sure <i className="fa fa-check" onClick={(e)=>{e.stopPropagation();this.deleteNote(note);}}></i>&nbsp;<i className="fa fa-close" onClick={(e)=>{e.stopPropagation();this.deleteCancel()}}></i></span>)
          } else {
              isDelete = (<span className=""><i className="fa fa-trash-o" onClick={(e)=>{e.stopPropagation();this.deleteSure(note);}}></i></span>)
          }
          
        return (
            <a className={activeClass+" list-group-item list-group-item-action"} onClick={()=>{this.props.showNotePage(note)}} key={note.id}>                        
                <div className="media">
                    <div className="media-body">
                        {note.title}
                        <div className="text-muted smaller"><Moment format="DD-MM-YYYY HH:MM">{note.createdDate}</Moment></div>
                        {isDelete}
                    </div>
                </div>
            </a>
        );
      });
      if(!Notes._head && !Notes._tail) {
        noteList = (
            <li className={" list-group-item"} key={"noteList 1"}>                        
                <div className="media">
                    <div className="media-body">
                        Please add new Notes
                    </div>
                </div>
            </li>
        )
      }
    return (
            <div className="col-md-3">
                <br/>
                <div className="card mb-3">
                    <div className="card-header">
                        <i className="glyphicon glyphicon-edit" onClick={()=>{this.clearNotes()}}></i>Notes
                        <button className="btn btn-sm btn-primary pull-right" onClick={()=>{this.props.showNewNotePage(true)}}>Add New Note</button>
                    </div>
                    <div className="list-group list-group-flush small">
                        {noteList}
                    </div>
                    {/* <div className="card-footer small text-muted">
                        Last Updated at
                    </div> */}
                </div>
            </div>
    );
  }
}

const mapStateToProps = (state) => {
  state.tasks = state.tasks || {};
  return {
    list: state.notes || {contents:{},_head:null,_tail:null},
    search: state.tasks.search || "",
    type: state.tasks.type || null
  };
};

export default connect(mapStateToProps)(NoteList);
