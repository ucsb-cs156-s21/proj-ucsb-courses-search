package edu.ucsb.courses.services;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
 


import edu.ucsb.courses.documents.Course;



public class DownloadCsvService {
    // Converts JSON string to a list of Java objects
    public List<Course> stringToList(String jsonString) {
        List<Course> courses = null;

        try {
            courses = new ObjectMapper().readValue(jsonString, new TypeReference<List<Course>>(){});
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return courses;
    }

    // Converts list of Java objects to a CSV file
    public void listToCSV(List<Course> courses, String fileName) {
        final String[] CSV_HEADER = {"quarter", "courseID", "title", "description"};

        FileWriter fileWriter = null;
        CSVPrinter csvPrinter = null;

        try {
            fileWriter = new FileWriter(fileName);
            csvPrinter = new CSVPrinter(fileWriter, CSVFormat.DEFAULT.withHeader(CSV_HEADER));
       
            for (Course course : courses) {
                List<String> data = Arrays.asList(
                course.getQuarter(),
                course.getCourseId(),
                course.getTitle(),
                course.getDescription());
                
                csvPrinter.printRecord(data);
            }
        } catch (Exception e) {
            System.out.println("Writing CSV error!");
            e.printStackTrace();
        } finally {
            try {
                fileWriter.flush();
                fileWriter.close();
                csvPrinter.close();
            } catch (IOException e) {
                System.out.println("Flushing/closing error!");
                e.printStackTrace();
            }
        }
    }
}
