const { ObjectID } = require('mongodb');
const connectDB = require('../db');

const getCourses = async () => {
  let courses = [];
  try {
    const db = await connectDB();
    courses = await db.collection('courses').find().toArray();
  } catch (error) {
    throw new Error('Something bad ocurred: ', error);
  }
  return courses;
};

const getCourse = async (root, { id }) => {
  let course;
  try {
    const db = await connectDB();
    course = await db.collection('courses').findOne({ _id: ObjectID(id) });
  } catch (error) {
    throw new Error('Something bad ocurred: ', error);
  }
  return course;
};

module.exports = {
  getCourses,
  getCourse,
};
