const express = require('express');
const Lesson = require('../models/Lesson');
const Student = require('../models/Student');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

// @desc     Get all user's lessons
// @route    GET /api/lessons
// @desc     Get all user's lessons associated with a single student
// @route    GET /api/students/:studentId/lessons
// @access   Private
// router.get('/', auth, async (req, res) => {
// 	try {
// 		let query;

// 		// api/students/:studentId/lessons
// 		if (req.params.studentId) {
// 			query = Lesson.find({ student: req.params.studentId });
// 		} else {
// 			// api/lessons
// 			query = Lesson.find({ user: req.user.id }).populate({
// 				path: 'student',
// 				select: 'name instrument',
// 			});
// 		}

// 		const lessons = await query.sort({ lessonSlot: 'desc' });

// 		// res.status(200).json({
// 		//   success: true,
// 		//   count: lessons.length,
// 		//   data: lessons,
// 		// });

// 		//console.log(typeof lessons[0].lessonSlot);
// 		res.json(lessons);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server error');
// 	}
// });
// No Auth
router.get('/', async (req, res) => {
	try {
		let query;

		// api/students/:studentId/lessons
		if (req.params.studentId) {
			query = Lesson.find({ student: req.params.studentId });
		} else {
			// api/lessons
			query = Lesson.find().populate({
				path: 'student',
				select: 'name instrument',
			});
		}

		const lessons = await query.sort({ lessonSlot: 'desc' });

		res.json(lessons);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @desc     Get single lesson by its id
// @route    GET /api/lessons/:id
// @access   Private
// router.get('/:id', auth, async (req, res) => {
// 	try {
// 		const lesson = await Lesson.findById(req.params.id).populate('student');

// 		res.json(lesson);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(404).send(`No lesson with the id of ${req.params.id}`);
// 	}
// });
// No Auth
router.get('/:id', async (req, res) => {
	try {
		const lesson = await Lesson.findById(req.params.id).populate('student');

		res.json(lesson);
	} catch (err) {
		console.error(err.message);
		res.status(404).send(`No lesson with the id of ${req.params.id}`);
	}
});

// @desc     Add lesson
// @route    POST /api/students/:studentId/lessons
// @access   Private
// router.post('/', auth, async (req, res) => {
// 	req.body.student = req.params.studentId;
// 	req.body.user = req.user.id;

// 	try {
// 		const student = await Student.findById(req.params.studentId);

// 		const lesson = await Lesson.create(req.body);

// 		res.json(lesson);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(404).send(`No student with the id of ${req.params.studentId}`);
// 	}
// });
// No Auth
router.post('/', async (req, res) => {
	req.body.student = req.params.studentId;

	try {
		const student = await Student.findById(req.params.studentId);

		const lesson = await Lesson.create(req.body);

		res.json(lesson);
	} catch (err) {
		console.error(err.message);
		res.status(404).send(`No student with the id of ${req.params.studentId}`);
	}
});

// @desc     Update lesson
// @route    PUT /api/lessons/:id
// @access   Private
// router.put('/:id', auth, async (req, res) => {
// 	try {
// 		let lesson = await Lesson.findById(req.params.id);

// 		// 404: Not found
// 		if (!lesson)
// 			return res
// 				.status(404)
// 				.json({ msg: `Lesson not found with id of ${req.params.id}` });

// 		// verify if user owns the lesson by comparing user's MongoDB user _id: ObjectId with the lesson's MongoDB user: ObjectId
// 		if (lesson.user.toString() !== req.user.id) {
// 			return res.status(401).json({ msg: 'Unauthorized' });
// 		}

// 		lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
// 			new: true,
// 			runValidators: true,
// 		});

// 		res.json(lesson);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server error');
// 	}
// });
// No Auth
router.put('/:id', async (req, res) => {
	try {
		let lesson = await Lesson.findById(req.params.id);

		// 404: Not found
		if (!lesson)
			return res
				.status(404)
				.json({ msg: `Lesson not found with id of ${req.params.id}` });

		lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.json(lesson);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @desc     Delete lesson
// @route    DELETE /api/lessons/:id
// @access   Private
// router.delete('/:id', auth, async (req, res) => {
// 	try {
// 		let lesson = await Lesson.findById(req.params.id);

// 		// 404: Not found
// 		if (!lesson)
// 			return res
// 				.status(404)
// 				.json({ msg: `Lesson not found with id of ${req.params.id}` });

// 		// verify if user owns the lesson by comparing user's MongoDB user _id: ObjectId with the lesson's MongoDB user: ObjectId
// 		if (lesson.user.toString() !== req.user.id) {
// 			return res.status(401).json({ msg: 'Unauthorized' });
// 		}

// 		// trigger any future pre remove middleware in Lesson model. findByIdAndRemove won't work
// 		await lesson.remove();

// 		res.status(200).json({
// 			success: true,
// 			data: {},
// 			msg: 'Lesson removed',
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server error');
// 	}
// });
// No Auth
router.delete('/:id', async (req, res) => {
	try {
		let lesson = await Lesson.findById(req.params.id);

		// 404: Not found
		if (!lesson)
			return res
				.status(404)
				.json({ msg: `Lesson not found with id of ${req.params.id}` });

		// trigger any future pre remove middleware in Lesson model. findByIdAndRemove won't work
		await lesson.remove();

		res.status(200).json({
			success: true,
			data: {},
			msg: 'Lesson removed',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
