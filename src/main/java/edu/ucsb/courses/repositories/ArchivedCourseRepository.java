package edu.ucsb.courses.repositories;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import edu.ucsb.courses.documents.Course;

import edu.ucsb.courses.documents.statistics.FullCourse;
import edu.ucsb.courses.documents.statistics.QuarterOccupancy;
import edu.ucsb.courses.documents.statistics.OpenCourse;

@Repository
public interface ArchivedCourseRepository extends MongoRepository<Course, ObjectId> {
    /**
     * Returns a {@link Course} identified by that quarter it is offered and its 13 character course id.
     * <br>
     * Note: the courseId must be a properly padded 13 character course id. If you have the course's subject code
     * (e.g. CMPSC) and course number (e.g. 190J), use the overloaded version of this method instead.
     * {@link #findOneByQuarterAndCourseId(String, String, String)}
     *
     * @param quarter  the quarter that the course is offered
     * @param courseId the course's 13 character course id
     * @return an optional {@link Course}, if a matching course was found
     * @see #findOneByQuarterAndCourseId(String, String, String)
     */
    Optional<Course> findOneByQuarterAndCourseId(String quarter, String courseId);

    /**
     * Returns a {@link Course} identified by the quarter that it is offered, its subject code, and its course
     * number.
     * <br>
     * This is a convenience method that calls {@link #findOneByQuarterAndCourseId(String, String)} with a properly
     * padded course id.
     *
     * @param quarter      the quarter that the course is offered
     * @param subjectCode  the course's subject code
     * @param courseNumber the course's course number
     * @return an optional {@link Course}, if a matching course was found
     * @see #findOneByQuarterAndCourseId(String, String)
     */
    default Optional<Course> findOneByQuarterAndCourseId(String quarter,
                                                                 String subjectCode,
                                                                 String courseNumber) {
        return findOneByQuarterAndCourseId(quarter, String.format("%-8s%-5s", subjectCode, courseNumber));
    }

    /**
     * Returns a list of {@link Course} where at least one of the course's lectures/sections takes place in the
     * specified building and room.
     *
     * @param quarter  the quarter that the course is offered
     * @param building the building that the lecture/section is held in
     * @param room     the room of the building that the lecture/section is held in
     * @return a list of matching {@link Course}
     */
    @Query("{'quarter': ?0, 'classSections': {'$elemMatch': {'timeLocations': {'$elemMatch': {'building': ?1, 'room': ?2}}}}}")
    List<Course> findByQuarterAndRoom(String quarter, String building, String room);

    /**
     * Returns a list of {@link Course} occurring between specified quarters
     * where at least one of the course's instructors matches the text.
     *
     * @param startQuarter   the first quarter to consider in the search formatted in YYYYQ
     * @param endQuarter     the final quarter to consider in the search formatted in YYYYQ
     * @param instructorText instructor name search query
     * @param functionCode function code search query
     * @return a list of matching {@link Course}
     */
    @Query("{'quarter': {$gte : ?0, $lte : ?1}, classSections: {'$elemMatch': {'instructors': {'$elemMatch': {'instructor': {$regex : ?2}, 'functionCode':  'Teaching and in charge' }}}}}")
    List<Course> findByQuarterIntervalAndInstructor(String startQuarter,
                                                            String endQuarter,
                                                            String instructorText);


    // GE
    @Query("{'quarter': {$gte : ?0, $lte : ?1}, 'generalEducation' :{'$elemMatch': {'geCode': ?2}} }")
    List<Course> findByQuarterIntervalAndGe(String startQuarter,
                                                            String endQuarter,
                                                            String geCode);
    /**
     * Returns a list of {@link Course} occurring between specified quarters
     * where the course was under the same name as the specified course name.
     *
     * @param startQuarter   the first quarter to consider in the search formatted in YYYYQ
     * @param endQuarter     the final quarter to consider in the search formatted in YYYYQ
     * @param formattedCourseName     course name search query
     * @return a list of matching {@link Course}
     */

     //deptCode
    @Query("{'quarter': {$gte : ?0, $lte : ?1}, 'courseId': ?2 }")
    List<Course> findByQuarterIntervalAndCourseName(String startQuarter,
                                                            String endQuarter,
                                                            String formattedCourseName);


    /**
     * Returns a list of {@link Course} from the requested
     * quarter and for the requested dept
     * 
     * @param quarter   quarter formatted as YYYYQ string
     * @param dept      the department code 
     * @return a list of matching {@link Course}
     */                                                       
     @Query("{'quarter': ?0, 'deptCode': ?1}")
     List<Course> findByQuarterAndDepartment(String quarter, String dept);

     /**
      * Returns a list of {@link FullCourse} from the requested
      * quarter interval and department
      * 
      * @param startQuarter quarter formatted as YYYYQ string
      * @param endQuarter quarter formatted as YYYYQ string
      * @param department the department code 
      * @return a list of {@link FullCourse}
      */
      @Aggregation(pipeline= {
        "{$match:{'quarter':{'$gte':?0,'$lte':?1},'deptCode':?2,'instructionType':'LEC',}}",
        "{$addFields:{'classSize':{'$size':'$classSections'}}}",
        "{$unwind:{'path':'$classSections','includeArrayIndex':'index','preserveNullAndEmptyArrays':false}}",
        "{$match:{'classSections.courseCancelled':{$eq:null},'$or':[{'index':{'$ne':0}},{'$and':[{'classSize':1},{'index':0}]}]}}",
        "{$group:{'_id':'$_id',quarter:{$first:'$quarter'},title:{$first:'$title'},courseId:{$first:'$courseId'},'enrolled':{$sum:'$classSections.enrolledTotal'},'maxEnrolled':{$sum:'$classSections.maxEnroll'}}}",
        "{$match:{'maxEnrolled':{'$gt':0}}}",
        "{$project:{_id:1,quarter:1,title:1,courseId:1,diff:{$subtract:['$maxEnrolled','$enrolled']}}}",
        "{$match:{'diff':{'$lte':0}}}",
        "{$sort:{_id:1}}"
    })
    List<FullCourse> findFullCoursesByQuarterIntervalAndDepartment(String startQuarter, String endQuarter, String department);

     /**
     * Returns a list of {@link QuarterOccupancy} from the requested
     * quarter interval and department
     * 
     * @param startQuarter quarter formatted as YYYYQ string
     * @param endQuarter quarter formatted as YYYYQ string
     * @param department the department code 
     * @return a list of {@link QuarterOccupancy}
     */
     @Aggregation(pipeline= {
       "{$match:{'quarter':{'$gte':?0,'$lte':?1},'deptCode':?2,'instructionType':'LEC',}}",
       "{$addFields:{'classSize':{'$size':'$classSections'}}}",
       "{$unwind:{'path':'$classSections','includeArrayIndex':'index','preserveNullAndEmptyArrays':false}}",
       "{$match:{'classSections.courseCancelled':{$eq:null},'$or':[{'index':{'$ne':0}},{'$and':[{'classSize':1},{'index':0}]}]}}",
       "{$group:{'_id':'$quarter','enrolled':{$sum:'$classSections.enrolledTotal'},'maxEnrolled':{$sum:'$classSections.maxEnroll'}}}",
       "{$sort:{_id:1}}"
    })
    List<QuarterOccupancy> findOccupancyByQuarterIntervalAndDepartment(String startQuarter, String endQuarter, String department);


     @Aggregation(pipeline= {
             "{ \"$match\" : { \"quarter\" : ?0, \"deptCode\" : \"CMPSC\"}}",
             "{ \"$unwind\" : { \"path\" : \"$classSections\", \"includeArrayIndex\" : \"index\", \"preserveNullAndEmptyArrays\" : false}}",
             " {\"$match\" : { \"index\" : 0}}",
             "{ \"$match\" : { \"classSections.enrolledTotal\" : { \"$ne\" : null}, \"classSections.maxEnroll\" : { \"$ne\" : 0}}}",

             "{\"$match\": { \"$expr\": { \"$lt\": [\"classSections.enrolled\", \"classSections.maxEnroll\"] } } }",

             "{ \"$group\" : { \"_id\" : { \"_id\" : \"$_id\", \"quarter\" : ?0, \"title\" : \"$title\", \"courseId\" : \"$courseId\"}, \"numOpenSeats\" : { \"$sum\" : \"$classSections.enrolledTotal\"}}}"
     })
     List<OpenCourse> findOpenCoursesByDepartment(String quarter, String department);
}

