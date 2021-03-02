function filterClasses(classes,checks) {
  const [cancelled,closed,full] = checks;
  console.log("In filterClasses");
  console.log(cancelled);
  console.log(closed);
  console.log(full);
  var newClass = [];
  classes.forEach(
    (course) => {
      if(((!cancelled) || (cancelled&&course.classSections[0].courseCancelled===null)) &&
        ((!closed) || (closed&&course.classSections[0].classClosed===null)) &&
        ((!full) || (full&&course.classSections[0].maxEnroll>=course.classSections[0].enrolledTotal))) {
          newClass.push(course);
        }
    }
  );
  return newClass;
}


function reformatJSON(classes) {
  const sections = [];
  classes.forEach(
    (course) => {
      course.classSections.forEach(
        (section) => {
          section.course =
          {
          courseId: course.courseId,
          title: course.title,
          unitsFixed: course.unitsFixed
          };
          sections.push(section);
        }
      )
    }
      
  );
  return sections
}

export {reformatJSON,filterClasses};