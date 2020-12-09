// package edu.ucsb.courses.services;

// import java.io.FileWriter;
// import java.io.IOException;
// import java.io.PrintWriter;
// import java.util.Arrays;
// import java.util.List;

// import com.fasterxml.jackson.core.JsonParseException;
// import com.fasterxml.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.databind.JsonMappingException;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import org.apache.commons.csv.CSVFormat;
// import org.apache.commons.csv.CSVPrinter;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.stereotype.Service;

// import edu.ucsb.courses.documents.Course;
// import edu.ucsb.courses.documents.CoursePage;


// @Service
// public class DownloadCsvService {

//     private Logger logger = LoggerFactory.getLogger(DownloadCsvService.class);

//     // Converts list of Java objects to a CSV file
//     public void listToCSV(String coursePageJson, PrintWriter writer) {
//         final String[] CSV_HEADER = {"quarter", "courseID", "title", "description"};
//         logger.info("coursePageJson={}", coursePageJson);
    
//         CoursePage cp = CoursePage.fromJSON(coursePageJson);


//         CSVPrinter csvPrinter = null;

//         try {
//             //fileWriter = new FileWriter(fileName);
//             csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader(CSV_HEADER));
       
//             for (Course course : cp.getClasses()) {
//                 List<String> data = Arrays.asList(
//                 course.getQuarter(),
//                 course.getCourseId(),
//                 course.getTitle(),
//                 course.getDescription());
//                 logger.info("data = {}", data);
//                 csvPrinter.printRecord(data);
//             }
//         } catch (Exception e) {
//             logger.error("Writing CSV error!{}", e);
    
//         } finally {
//             try {
//                 //fileWriter.flush();
//                 //fileWriter.close();
//                 csvPrinter.close();
//             } catch (IOException e) {
//                 logger.error("Flushing/closing error!{}", e);
//             }
//         }
//     }
// }
