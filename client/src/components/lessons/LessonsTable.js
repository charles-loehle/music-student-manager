import React, { useContext, useEffect } from 'react';
import LessonContext from '../../context/lesson/lessonContext';
import LessonTableData from './LessonTableData';
import Spinner from '../layout/Spinner';

const LessonsTable = () => {
  const lessonContext = useContext(LessonContext);
  const { lessons, filtered, getLessons, loading } = lessonContext;

  // populate the page with list of lessons
  useEffect(() => {
    getLessons();
    // eslint-disable-next-line
  }, []);

  if (lessons !== null && lessons.length === 0 && !loading) {
    return <h4>Please add a lesson</h4>;
  }

  return (
    <div className='LessonsTable'>
      <h2>
        <i class='fas fa-music'></i> Lessons
      </h2>
      <div class='table-responsive'>
        <table class='table table-striped table-sm'>
          <thead>
            <tr>
              <th>Lesson Slot</th>
              <th>Student Name</th>
              <th>Assignment</th>
              <th>Attendance</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {lessons !== null && !loading ? (
              // map through live search results
              filtered !== null ? (
                filtered.map((lesson) => (
                  <LessonTableData key={lesson._id} lesson={lesson} />
                ))
              ) : (
                lessons.map((lesson) => (
                  <LessonTableData key={lesson._id} lesson={lesson} />
                ))
              )
            ) : (
              <Spinner />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonsTable;
