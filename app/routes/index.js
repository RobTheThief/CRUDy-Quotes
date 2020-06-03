const quotesRoutes = require('./quotes_routes');

module.exports = function(app, db, quotesCollection) {
	quotesRoutes(app,db, quotesCollection);
}
