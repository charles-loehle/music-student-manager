import React, { useState, useContext, useEffect } from 'react';
import StudentContext from '../../context/student/studentContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StudentForm = () => {
  const studentContext = useContext(StudentContext);
  const { addStudent, current, clearCurrent, updateStudent } = studentContext;

  const [student, setStudent] = useState({
    name: '',
    parentName: '',
    email: '',
    alternateEmail: '',
    phone: '',
    lessonSlot: '',
    assignment: '',
    instrument: '',
    attendance: '',
  });

  // populate the form with student data on edit button click
  useEffect(() => {
    if (current !== null) {
      const newCurrent = {
        ...current,
        lessonSlot: new Date(current.lessonSlot),
      };
      setStudent(newCurrent);
    } else {
      setStudent({
        name: '',
        parentName: '',
        email: '',
        alternateEmail: '',
        phone: '',
        lessonSlot: '',
        assignment: '',
        instrument: '',
        attendance: '',
      });
    }
  }, [studentContext, current]);

  const clearAll = () => {
    clearCurrent();
  };

  const {
    name,
    parentName,
    email,
    alternateEmail,
    phone,
    lessonSlot,
    assignment,
    instrument,
    attendance,
  } = student;

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addStudent(student);
    } else {
      updateStudent(student);
    }
    // clear the form
    clearAll();
  };

  const onChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  // set lessonSlot state to date object from DatePicker
  const onChangeDate = (date) => {
    setStudent({ ...student, lessonSlot: date });
  };

  return (
    <div className='StudentForm'>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>
          {current ? 'Edit Student' : 'Add Student'}
        </h2>
        <input
          type='text'
          placeholder='Student name'
          name='name'
          value={name}
          onChange={onChange}
        />
        <DatePicker
          placeholderText='Click to select a date and time'
          selected={lessonSlot}
          onChange={onChangeDate}
          showTimeSelect
          dateFormat='MMMM d, yyyy h:mm aa'
        />
        <input
          type='text'
          placeholder='Assignment'
          name='assignment'
          value={assignment}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Parent name'
          name='parentName'
          value={parentName}
          onChange={onChange}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange}
        />
        <input
          type='email'
          placeholder='Alternate Email'
          name='alternateEmail'
          value={alternateEmail}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={onChange}
        />
        <h5>Instrument</h5>
        <input
          type='radio'
          name='instrument'
          value='violin'
          checked={instrument === 'violin'}
          onChange={onChange}
        />{' '}
        Violin{'  '}
        <input
          type='radio'
          name='instrument'
          value='guitar'
          checked={instrument === 'guitar'}
          onChange={onChange}
        />{' '}
        Guitar
        <h5>Attendance</h5>
        <input
          type='radio'
          name='attendance'
          value='present'
          checked={attendance === 'present'}
          onChange={onChange}
        />{' '}
        Present{'  '}
        <input
          type='radio'
          name='attendance'
          value='absent'
          checked={attendance === 'absent'}
          onChange={onChange}
        />{' '}
        Absent{' '}
        <input
          type='radio'
          name='attendance'
          value=''
          checked={attendance === ''}
          onChange={onChange}
        />{' '}
        None
        <div>
          <input
            type='submit'
            value={current ? 'Update Student' : 'Add Student'}
            className='btn btn-primary btn-block'
          />
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentForm;
