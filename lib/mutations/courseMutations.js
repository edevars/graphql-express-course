const { ObjectID } = require('mongodb');
const connectDb = require('../db');

const createCourse = async (root, { input }) => {
  const defaults = {
    teacher: '',
    topic: '',
  };
  const newCourse = Object.assign(defaults, input);
  try {
    const db = await connectDb();
    const course = await db.collection('courses').insertOne(newCourse);
    newCourse._id = course.insertedId;
  } catch (error) {
    throw new Error(`Something bad ocurred: ${error}`);
  }
  return newCourse;
};

const deleteCourseById = async (root, { id }) => {
  try {
    const db = await connectDb();
    const deletedCourse = await db.collection('courses').deleteOne({
      _id: ObjectID(id),
    });

    if (deletedCourse.deletedCount === 0) {
      return `The course with the id ${id} doesn't exist`;
    }

    if (deletedCourse.result.ok) {
      return `Course deleted succesfully: ${id}`;
    }
    throw new Error('The course couldn\'t be deleted');
  } catch (error) {
    throw new Error(`Something bad ocurred: ${error}`);
  }
};

module.exports = {
  createCourse,
  deleteCourseById,
};
