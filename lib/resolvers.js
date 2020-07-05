const courses = require('../mocks/courses');

// Setting resolvers
module.exports = {
  getCourses() {
    return courses;
  },
};
