const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a student name'],
			trim: true,
		},
		parentName: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email',
			],
		},
		alternateEmail: {
			type: String,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email',
			],
		},
		phone: {
			type: String,
		},
		instrument: {
			type: String,
			required: true,
			default: 'violin',
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			// reference the User model
			ref: 'User',
			// required: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Cascade delete lessons when a student is deleted
StudentSchema.pre('remove', async function (next) {
	console.log(`Lessons being removed from student ${this._id}`);
	await this.model('Lesson').deleteMany({ student: this._id });
	next();
});

// Reverse populate with virtuals
StudentSchema.virtual('lessons', {
	ref: 'Lesson',
	localField: '_id',
	foreignField: 'student',
	justOne: false,
});

module.exports = mongoose.model('Student', StudentSchema);
