import UniqueIdentifier from './uniqueidentifier';

let { getUniqueIdentifier } = UniqueIdentifier;

class Notes {

    constructor(){
        this.contents = {};
        this._head = null;
        this._tail = null;
        this._type = null;    
    }

    _import(importObject){
        importObject = importObject || {}
        this.contents = importObject.contents || {};
        this._head = importObject._head || null;
        this._tail = importObject._tail || null;
    }

    _export(){
        let exportObject = {
            contents:this.contents,
            _head:this._head,
            _tail:this._tail
        };
        return exportObject;
    }

    _next(current) {
        if('next' in current && current.next){
            return this.get(current.next);
        }
        return null;
    }

    _getHead(){
        return this._head ? this.get(this._head) : null;
    }

    _destroy(){
        this.contents = [];
        this._head = null;
        this._tail = null;
    }

    forEach(callBack) {
        if(this._head){
            let next = this.get(this._head);
            while(next && next.id !== null) {
                callBack(next);
                next = next.next && this.get(next.next);
            }
        }
    }

    map(callBack) {
        let arr = [];
        if(this._head){
            let next = this.get(this._head);
            while(next && next.id !== null) {
                arr.push(callBack(next));
                next = next.next && this.get(next.next);
            }
        }
        return arr;
    }
    
    get(id) {
		return this.contents[id] || null;
    }

    add({text, title}, id) {
        let content = this._createContent({text, title}, id || getUniqueIdentifier())
        if(this._tail) {
            var tail = this.get(this._tail);
        	content.prev = this._tail;
            tail.next = content.id;
        }
        this.contents[id] = content;
        this._tail = content.id;
        
        if(!this._head) {
            this._head = content.id;
        }
        
    }

    _createContent({text,title}, id){
        return {
            id:id,
            next: null,
            prev:null,
            content: text,
            title:title,
            createdDate: +new Date()
        };
    }

    addAfter({text, title}, afterId, id) {
        let content = this._createContent({text, title}, id || getUniqueIdentifier());
        var current = this.get(afterId);
        var currentNext = current.next && this.get(current.next) || null;
        current.next = content.id;
        content.prev = current.id;
        if(currentNext) {
           currentNext.prev = content.id;
           content.next = currentNext.id;
        } else {
           content.next = null;
           this._tail = content.id;
        }
        this.contents[id] = content;
    }

    update({text,title},id){
        let current = this.get(id);
        current.title = title;
        current.content = text;
    }

    remove(id) {
        var current = this.get(id);
        var currentNext = current.next && this.get(current.next) || null;
        var currentPrev = current.prev && this.get(current.prev) || null;
        if(this._head === current.id) {
            this._head = current.next || null;
        }
        if(this._tail === current.id) {
            this._tail = current.prev || null;
        }
        if(currentPrev && "next" in currentPrev){
            currentPrev.next = current.next;
        }

        if(currentNext && "next" in currentNext){
            currentNext.prev = current.prev;
        }

        delete this.contents[id];
    }
}

export default Notes;