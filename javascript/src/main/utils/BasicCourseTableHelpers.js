import React from "react";

export function reformatJSON(classes) {
  const sections = [];
  var numSections = 0;

  classes.slice().reverse().forEach(
    (course) => {
      course.classSections.slice().reverse().forEach(
        (section) => {
          if (section.section % 100 != 0){
            numSections++;
          }
          if(course.classSections.length <= 1 || (section.section % 100 == 0 && numSections == 0)) {
            section.course =
            {
              courseId: course.courseId,
              title: course.title,
              unitsFixed: course.unitsFixed,
              noSections: "true"
            };
          } else {
            section.course =
            {
              courseId: course.courseId,
              title: course.title,
              unitsFixed: course.unitsFixed,
              noSections: "false"
            };
          }
          if (section.section % 100 == 0){
            numSections = 0;
          }
         sections.push(section);
       }
      )
    }
  );
  sections.reverse();
  return sections
}
