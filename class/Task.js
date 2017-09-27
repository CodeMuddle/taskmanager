
var task = function(type,isImport,list){
    
    this.contents = {};
    this._head = null;
    this._tail = null;
    this._type = type;
    if(isImport) {
        this._import(list);
    }
};

task.prototype = {
    _import:function(list){
        if(this._type) {
            var filteredList = list.filter(function(l) {
				return l.type === this._type;
            });
            if(filteredList.length) {
                this._head = filteredList[0].id;
                this._tail = filteredList[filteredList-1].id;
                for(var i = 0; i < filteredList.length; i++) {
					this.add(filteredList[i]);
                }
            }
            
        }
    },
    setContent(contents){
        if(Object.keys(this.contents || {}).length === 0) {
            this.contents = contents;
        }
    },
    getContent(){
        return this.contents;
    },
    forEach:function(callback) {
        if(this._head && typeof callback === 'function') {
			var current = this.get(this._head);
            do {
				callback(current);
                current = this._next(current);
				
            } while(current !== null);
        }
    },
    _next:function(current) {
		if('next' in current && current.next){
            return this.get(current.next);
        }
        return null;
    },
    get: function(id) {
		return this.contents[id] || null;
    },
    _getHead:function() {
        return this._head ? this.get(this._head) : null;
    },
    addAfter:function(content,afterId) {
        if(afterId) {
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
        } else {
			if(this._head) {
 				current = this.get(this._head);
                content.prev = null;
                content.next = this._head;
                this._head = content.id;
            } else {
				this._head = content.id;
                content.prev = null;
                content.next = null;
            }
        }
        this.contents[content.id] = content;
    },
    updateAfter:function(content,afterId) {
        this.remove(content);
        this.addAfter(content,afterId);
    },
    add:function(content) {
        if(this._tail) {
        	var tail = this.get(this._tail);
        	content.prev = this._tail;
            tail.next = content.id;
        }

        this._tail = content.id;

        if(!this._head) {
            this._head = content.id;
        }

        this.contents[content.id] = content;
        
    },
    remove:function(current) {
       var next = current.next ? this.get(current.next) : null;
       var prev = current.prev ? this.get(current.prev) : null;
	   if(prev) {
           prev.next = current.next;
       }
       if(next) {
           next.prev = current.prev;
       }
       if(current.id === this._tail && prev) {
           this._tail = current.prev;
       }
       if(current.id === this._head) {
			this._tail = null;
            this._head = null;
       }
       delete this.contents[current.id];
    },
    _destroy:function() {
       delete this;
    }
};

export default task;