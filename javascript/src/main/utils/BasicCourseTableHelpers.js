export function reformatJSON(classes,checks) {
  const sections = [];
  const [cancelled,closed,full] = checks;
  console.log("In filterClasses");
  console.log(cancelled);
  console.log(closed);
  console.log(full);
  classes.forEach(
    (course) => {
      if( course.classSections[0].section.endsWith("0") && 
      (((!cancelled) || (cancelled&&course.classSections[0].courseCancelled===null)) &&
      ((!closed) || (closed&&course.classSections[0].classClosed===null)) &&
      ((!full) || (full&&course.classSections[0].maxEnroll>=course.classSections[0].enrolledTotal)))) {
        course.classSections.forEach(
          (section) => {
            if(((!cancelled) || (cancelled&&section.courseCancelled===null)) &&
            ((!closed) || (closed&&section.classClosed===null)) &&
            ((!full) || (full&&section.maxEnroll>=section.enrolledTotal))){
              section.course =
              {
              courseId: course.courseId,
              title: course.title,
              unitsFixed: course.unitsFixed
              };
              sections.push(section);
            } 
          }
        )
      }
      
    }
  );
  return sections
}

