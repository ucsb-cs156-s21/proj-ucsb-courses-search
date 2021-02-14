
export function reformatJSON(classes) {
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
