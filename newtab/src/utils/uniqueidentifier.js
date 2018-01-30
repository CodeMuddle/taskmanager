
export default {
	identifiers:[],
	uniqueIdentifier:function(){
		// return 16 digit identifier
		return buildTimestampIdentifier()+buildUniqueIdentifier()+buildUniqueIdentifier();
	},
	getUniqueIdentifier:function(){
		var identifier;
		do {
			identifier = this.uniqueIdentifier();
		} while(this.identifiers.indexOf(identifier)!=-1);
		return identifier;
	},
	getIdentifiers:function(){
		return this.identifiers;
	}
};

function buildUniqueIdentifier(){
	return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
}


/*
*	Returns 8letter hexdecimal value
*/
function buildTimestampIdentifier(){
	var newDate =  new Date().getTime()
				.toString(16);
	var length = newDate.length;
	return newDate.substring(length-8,length);
}