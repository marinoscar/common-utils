module.exports = {
	checkAccess: function(){
		var req = arguments.callee.caller.arguments[0];
		var res = arguments.callee.caller.arguments[1];
		if(!(req.session.auth && req.session.auth.loggedIn)){
			req.session.error = 'Access denied!';
			res.redirect('/login');
			return false;
		}
		return true;	
	} 
};
