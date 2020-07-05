const courses = require('../mocks/courses');

// Setting resolvers
module.exports = {
  Query: {
    getCourses() {
      return courses;
    },
    getCourse(root, args) {
      const courseById = courses.filter((course) => course.id === args.id);
      return courseById.pop();
    },
  },
};
