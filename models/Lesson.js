const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
	assignment: {
		type: String,
	},
	attendance: {
		type: String,
	},
	lessonSlot: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	student: {
		type: mongoose.Schema.ObjectId,
		// reference the Student model
		ref: 'Student',
		required: true,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		// reference the User model
		ref: 'User',
		// required: true,
	},
});

module.exports = mongoose.model('Lesson', LessonSchema);
