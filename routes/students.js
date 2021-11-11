const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Student = require('../models/Student');

// @route    GET api/students
// @desc     Get all user's students and their lessons
// @access   Private
// router.get('/', auth, async (req, res) => {
// 	try {
// 		const students = await Student.find({ user: req.user.id })
// 			.sort({ createdAt: 'desc' })
// 			.populate('lessons');
// 		res.json(students);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server error');
// 	}
// });

// No Auth route
router.get('/', async (req, res) => {
	try {
		const students = await Student.find()
			.sort({ createdAt: 'desc' })
			.populate('lessons');
		res.json(students);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @desc     Get single student and their lessons
// @route    GET /api/students/:id
// @access   Private
// router.get('/:id', auth, async (req, res) => {
// 	try {
// 		const student = await Student.findById(req.params.id).populate('lessons');

// 		// 404: Not found
// 		if (!student)
// 			return res
// 				.status(404)
// 				.json({ msg: `Student not found with id of ${req.params.id}` });

// 		res.json(student);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server error');
// 	}
// });
// No Auth
router.get('/:id', async (req, res) => {
	try {
		const student = await Student.findById(req.params.id).populate('lessons');

		// 404: Not found
		if (!student)
			return res
				.status(404)
				.json({ msg: `Student not found with id of ${req.params.id}` });

		res.json(student);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route    POST api/students
// @desc     Add new student
// @access   Private
// router.post(
// 	'/',
// 	[auth, [check('name', 'Name is required').not().isEmpty()]],
// 	async (req, res) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res.status(400).json({ errors: errors.array() });
// 		}

// 		// get front end form input values
// 		const { name, parentName, email, alternateEmail, phone, instrument } =
// 			req.body;

// 		try {
// 			const newStudent = new Student({
// 				name,
// 				parentName,
// 				email,
// 				alternateEmail,
// 				phone,
// 				instrument,
// 				user: req.user.id,
// 			});

// 			const student = await newStudent.save();

// 			// send the new student data to the front end
// 			res.json(student);
// 		} catch (err) {
// 			console.error(err.message);
// 			res.status(500).send('Server error');
// 		}
// 	}
// );

//No Auth
router.post(
	'/',
	[check('name', 'Name is required').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// get front end form input values
		const { name, parentName, email, phone, instrument } = req.body;

		try {
			const newStudent = new Student({
				name,
				parentName,
				email,
				phone,
				instrument,
			});

			const student = await newStudent.save();

			// send the new student data to the front end
			res.json(student);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route    PUT api/students/:id
// @desc     Update student
// @access   Private
// router.put('/:id', auth, async (req, res) => {
// 	// const { name, parentName, email, phone, lessonSlot, instrument } = req.body;

// 	// const studentFields = {};
// 	// if (name) studentFields.name = name;
// 	// if (parentName) studentFields.parentName = parentName;
// 	// if (email) studentFields.email = email;
// 	// if (phone) studentFields.phone = phone;
// 	// if (lessonSlot) studentFields.lessonSlot = lessonSlot;
// 	// if (instrument) studentFields.instrument = instrument;

// 	const studentFields = req.body;
// 	try {
// 		let student = await Student.findById(req.params.id);

// 		// 404: Not found
// 		if (!student) return res.status(404).json({ msg: 'Student not found' });

// 		// verify if user owns the student by comparing user's MongoDB user _id: ObjectId with the student's MongoDB user: ObjectId
// 		if (student.user.toString() !== req.user.id) {
// 			return res.status(401).json({ msg: 'Unauthorized' });
// 		}

// 		student = await Student.findByIdAndUpdate(
// 			req.params.id,
// 			{ $set: studentFields },
// 			{ new: true }
// 		);

// 		res.json(student);
// 	} catch (err) {
// 		console.error(error.message);
// 		res.status(500).send('Server error');
// 	}
// });

// No Auth
router.put('/:id', async (req, res) => {
	const studentFields = req.body;
	try {
		let student = await Student.findById(req.params.id);

		// 404: Not found
		if (!student) return res.status(404).json({ msg: 'Student not found' });

		student = await Student.findByIdAndUpdate(
			req.params.id,
			{ $set: studentFields },
			{ new: true }
		);

		res.json(student);
	} catch (err) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

// @route    DELETE api/students/:id
// @desc     Delete student and its lessons
// @access   Private
// router.delete('/:id', auth, async (req, res) => {
// 	try {
// 		let student = await Student.findById(req.params.id);

// 		// 404: Not found
// 		if (!student) return res.status(404).json({ msg: 'Student not found' });

// 		// verify if user owns the student by comparing user's MongoDB user _id: ObjectId with the student's MongoDB user: ObjectId
// 		if (student.user.toString() !== req.user.id) {
// 			return res.status(401).json({ msg: 'Unauthorized' });
// 		}

// 		//await Student.findByIdAndRemove(req.params.id);

// 		// trigger pre remove middleware in Bootcamp model. findByIdAndRemove won't work
// 		await student.remove();

// 		res.json({ success: true, data: {}, msg: 'Student removed' });
// 	} catch (err) {
// 		console.error(error.message);
// 		res.status(500).send('Server error');
// 	}
// });

// No Auth
// @route    DELETE api/students/:id
router.delete('/:id', async (req, res) => {
	try {
		let student = await Student.findById(req.params.id);

		// 404: Not found
		if (!student) return res.status(404).json({ msg: 'Student not found' });

		// trigger pre remove middleware in Student model. findByIdAndRemove won't work
		await student.remove();

		res.json({ success: true, data: {}, msg: 'Student removed' });
	} catch (err) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
