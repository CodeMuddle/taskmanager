import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tasks from './Tasks';

import {
  Editor,
  createEditorState
} from 'medium-draft';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
// import css from 'medium-draft/lib/index.css';


class App extends Component {
  constructor(props) {
    super(props);
    let text = props.note && props.note.content;
    let editorState = text && EditorState.createWithContent(convertFromRaw(JSON.parse(text)));
    console.log("editorState",editorState);
    console.log("title",props,this.props);
    let isEdit = props.note && true;
    this.state = {
      editorState: editorState || createEditorState(), // for empty content
      title: props.note && props.note.title || '',
      isEdit:!!isEdit
    };
  }

  componentWillReceiveProps(props){
    let text = props.note && props.note.content;
    let editorState = text && EditorState.createWithContent(convertFromRaw(JSON.parse(text)));
    console.log("receive editorState",editorState);
    console.log("receive title",props,this.props);
    let isEdit = props.note && true;
    this.state = {
      editorState: editorState || createEditorState(), // for empty content
      title: props.note && props.note.title || '',
      isEdit:!!isEdit
    };
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  };

  changeTitle = (event)=>{
    this.setState({title:event.target.value})
  }
  componentDidMount(){
    this.input.focus();
  }

  updatePost = () => {
    let {editorState,title} = this.state;
    let contentText = editorState.getCurrentContent().getPlainText();
    console.log("conetnt",contentText);
    if(!contentText || !contentText.trim() || !title || !title.trim()) {
      this.setState({isSaving:false});
    } else {
      let text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      if(this.props.note && this.props.note.id) {
        this.props.dispatch({
          'actionType': 'updateNotes',
          'type': 'updateNotes',
          'text': text,
          'title':this.state.title,
          'id':this.props.note.id
        })
        setTimeout(()=>{
          this.props.refreshNote();
          this.setState({isSaving:false});
        },130);
      } else {
        this.props.dispatch({
          'actionType': 'addNewNotes',
          'type': 'addNewNotes',
          'text': text,
          'title':this.state.title
        });
        setTimeout(()=>{
          this.setState({
            editorState: createEditorState(), // for empty content
            title: '',
          });
          this.props.showTailNote()
          this.setState({isSaving:false});
        },130);
      }
    }
    
  }

  saveUpdate = () => {
    if(!this.state.isSaving) {
      this.setState({isSaving:true});
      this.updatePost();
      // this.setState({isSaving:false});
    }
  }

  render() {
    let saveButton, cancelButton, savingState;
    if(!this.state.isEdit){
      if(this.state.isSaving) {
        saveButton = (<button className="btn btn-primary btn-sm">Saving</button>);
      } else {
        saveButton = (<button className="btn btn-primary btn-sm" onClick={this.saveUpdate}>Save</button>);
        cancelButton = (<button className="btn btn-default btn-sm">Cancel</button>);
      }
    } else {
      if(this.state.isSaving) {
        savingState = (<div className="saving">
                          Saving...
                        </div>);
      } else {
        savingState = (<div className="saving">
                          Saved
                      </div>);
      }
    }
    return (
        <div className="col-md-9">
            
              {
                !this.state.isSaving ? '': 
                <div className="saving">
                  Saving...
                </div>
              }

            <br/>
            <input ref={(input)=>{this.input = input}} value={this.state.title} onChange={this.changeTitle} placeholder="Title" className="form-control form-control-lg" /> <br /> 
            <Editor 
              ref="editor"
              editorState={this.state.editorState}
              onChange={this.onChange}
              disableContentEditableWarning 
              sideButtons={[]}
            />
            <div className="text-right button-group">
              {!this.state.isSaving ? 
                <button className="btn btn-primary btn-sm" onClick={this.saveUpdate}>Save</button>: 
                <button className="btn btn-primary btn-sm">Saving</button>
              }&nbsp;&nbsp;
              {
                this.state.isSaving ? '':
                <button className="btn btn-default btn-sm">Cancel</button>
              }
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
