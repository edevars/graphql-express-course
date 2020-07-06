const { ObjectID } = require('mongodb');
const connectDB = require('./db');

// Setting resolvers
module.exports = {
  Query: {
    getCourses: async () => {
      let courses = [];
      try {
        const db = await connectDB();
        courses = await db.collection('courses').find().toArray();
      } catch (error) {
        console.error(error);
      }
      return courses;
    },
    getCourse: async (root, { id }) => {
      let course;
      try {
        const db = await connectDB();
        course = await db.collection('courses').findOne({ _id: ObjectID(id) });
      } catch (error) {
        console.error(error);
      }
      return course;
    },
  },
};
