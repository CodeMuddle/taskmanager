import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoteList from './NoteList';
import Note from './NoteEditor';
import NotesClass from '../../../utils/notes'
let Notes = (new NotesClass());
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateNote : null,
      isNew:true
    }
  }

  showNewNotePage = () =>{
    this.setState({
      isNew:true,
      updateNote: null,
      isEdit:false
    });
    this.props.dispatch({
      type:'CLEAR_NOTE',
      actionType:'CLEAR_NOTE',
    })
  }

  showNotePage = (note) => {
    this.setState({
      isNew: false,
      updateNote: note.id,
      isEdit: false
    });
    this.props.dispatch({
      type:'SELECT_NOTE',
      actionType:'SELECT_NOTE',
      updateNote:note.id
    })
  }

  refreshNote = () => {
    // Notes._import(this.props.list);
    // let updateNote = Notes.get(this.state.updateNote.id)
    // this.setState({
    //   updateNote:updateNote
    // })
  }

  showTailNote = () =>{
    Notes._import(this.props.list);
    let tail = this.props.list._tail;
    tail && this.showNotePage(Notes.get(tail));
  }
  
  editNote = (value) => {
    this.setState({
      isEdit:value||false
    });
  }

  render() {
    Notes._import(this.props.list);
    let updateNote = Notes.get(this.state.updateNote);
    return (
        <div className="row">
            <NoteList showNotePage={this.showNotePage} showNewNotePage={this.showNewNotePage} selectedNoteId={this.state.updateNote}/>
            {this.state.isNew ?
              <Note isNew={this.state.isNew} showTailNote={this.showTailNote} note={this.state.updateNote}/>
              :
              <Note note={updateNote} isEdit={this.state.isEdit} refreshNote={this.refreshNote} />
            }
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  state.tasks = state.tasks || {};
  return {
    list: state.notes || {contents:{},_head:null,_tail:null},
    search: state.tasks.search || "",
    type: state.tasks.type || null,
    updateNote: state.view && state.view.updateNote,
  };
};

export default connect(mapStateToProps)(App);
