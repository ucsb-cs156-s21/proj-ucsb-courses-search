export function reformatJSON(classes,checks) {
  const sections = [];
  var [cancelled,closed,full] = [false,false,false];
  if(checks!==undefined) {
    [cancelled,closed,full] = checks;
  }
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
      //For section tests
      if(!course.classSections[0].section.endsWith("0")) {
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

