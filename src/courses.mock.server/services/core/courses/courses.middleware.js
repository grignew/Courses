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
	
	router.delete('/deletecourse', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			courseId = url_parts.query.courseid,
			courses = server.db.getState().courses;
			console.log('delete course server', server.db.getState().courses.findIndex((course) => course.id === courseId));
			server.db.getState().courses.splice(
				server.db.getState().courses.findIndex((course) => course.id === courseId), 1);
		res.json('Deleted');
	});
	return router;
};
