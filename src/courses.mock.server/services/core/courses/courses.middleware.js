const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			//sort = query.sort,
			//queryStr = query.query,
			search = query.filter,
			courses = server.db.getState().courses.filter((course) =>
			search ? course.name.toLowerCase().includes(search.toLowerCase()) : true);
		//console.log(sort);
		//console.log(queryStr);
		console.dir(query);
		if (courses.length < to) {
			to = courses.length;
		}
		courses = courses.slice(from, to);
		
		res.json(courses);
	});
	
	return router;
};
