// package edu.ucsb.courses.controllers;

// import com.auth0.jwt.JWT;
// import com.auth0.jwt.interfaces.DecodedJWT;
// import edu.ucsb.courses.advice.AuthControllerAdvice;
// import edu.ucsb.courses.documents.Course;
// import edu.ucsb.courses.documents.Section;
// import edu.ucsb.courses.documents.TimeLocation;
// import edu.ucsb.courses.entities.AppUser;
// import edu.ucsb.courses.entities.Schedule;
// import edu.ucsb.courses.entities.ScheduleItem;
// import edu.ucsb.courses.repositories.ScheduleItemRepository;
// import edu.ucsb.courses.repositories.ArchivedCourseRepository;
// import edu.ucsb.courses.repositories.ScheduleRepository;
// import org.codehaus.jackson.map.ObjectMapper;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.HttpHeaders;
// import org.springframework.security.test.context.support.WithMockUser;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.MvcResult;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertTrue;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.mock;
// import static org.mockito.Mockito.when;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
// import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;


// @WebMvcTest(value = ScheduleItemController.class)
// @WithMockUser
// public class ScheduleItemControllerTests {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private ScheduleItemRepository scheduleItemRepository;

//     @MockBean
//     ScheduleRepository scheduleRepository;

//     @MockBean
//     private ArchivedCourseRepository courseRepo;

//     @MockBean
//     AuthControllerAdvice authController;

//     private String userToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";

//     private ObjectMapper objectMapper = new ObjectMapper();

//     @Test
//     public void test_getScheduleItemSuccess() throws Exception {

//         String expectedResult = "{id=123 courseId='CS       130A ', lectureCode='07492', discussionCode='07493', schedule='Schedule[ id = null, name = null, description = null, quarter = null, userId = null]' }";
//         String urlTemplate = "/api/member/scheduleItems/get?id=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser appUser = new AppUser();
//         appUser.setId(123456L);

//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(appUser);

//         ScheduleItem scheduleItem = new ScheduleItem(123L, "CS       130A ", "07492", "07493", new AppUser(), new Schedule());

//         Optional<ScheduleItem> opt = Optional.of(scheduleItem);

//         when(scheduleItemRepository.findById(any(Schedule.class)))
//                 .thenReturn(opt);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();
//         ScheduleItem returnVal = objectMapper.readValue(responseString,ScheduleItem.class);

//         assertEquals(scheduleItem, returnVal);
//     }


//     @Test
//     public void test_getScheduleFailureNoScheduleItem() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/get?id=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         Optional<ScheduleItem> opt = Optional.empty();

//         when(scheduleItemRepository.findById(any(Schedule.class)))
//                 .thenReturn(opt);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isBadRequest())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);
//     }

//     @Test
//     public void test_getScheduleFailureNoAuth() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/get?id=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem scheduleItem = new ScheduleItem(123L, "CS       130A ", "07492", "07493", new AppUser(), new Schedule());

//         Optional<ScheduleItem> opt = Optional.of(scheduleItem);

//         when(scheduleItemRepository.findById(any(Schedule.class)))
//                 .thenReturn(opt);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isBadRequest())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);

//     }

//     @Test
//     public void test_getScheduleFailureNotMember() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/get?id=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(false);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem scheduleItem = new ScheduleItem(123L, "CS       130A ", "07492", "07493", new AppUser(), new Schedule());

//         Optional<ScheduleItem> opt = Optional.of(scheduleItem);

//         when(scheduleItemRepository.findById(any(Schedule.class)))
//                 .thenReturn(opt);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isUnauthorized())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);

//     }

//     @Test
//     public void test_addScheduleItemSuccess() throws Exception {
//         String expectedResult = "{id=123 courseId='CS       130A ', lectureCode='07492', discussionCode='07493', schedule='Schedule[ id = null, name = null, description = null, quarter = null, userId = null]' }";
//         String urlTemplate = "/api/member/scheduleItems/new?scheduleId=%s&enrollCode=%s&courseId=%s";
//         String url = String.format(urlTemplate, "123", "07492", "07493","CS       130A");
//         AppUser user = new AppUser();
//         user.setId(123456L);

//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem schedule = new ScheduleItem(123L, "CS       130A ", "07492", "07493", new AppUser(), new Schedule());

//         when(scheduleItemRepository.save(any(ScheduleItem.class)))
//                 .thenReturn(schedule);


//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isOk())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();
//         ScheduleItem returnVal = objectMapper.readValue(responseString, ScheduleItem.class);

//         assertEquals(returnVal, schedule);
//     }

//     @Test
//     public void test_addScheduleItemFailureNoAuth() throws Exception {
//         String expectedResult = "{id=123 courseId='CS 156', lectureCode='07492', discussionCode='07493', schedule='Schedule[ id = null, name = null, description = null, quarter = null, userId = null]' }";
//         String urlTemplate = "/api/member/scheduleItems/new?scheduleId=%s&enrollCode=%s&courseId=%s";
//         String url = String.format(urlTemplate, "1", "Adv App Programming", "CS 156", "07492", "07493");

//         DecodedJWT jwt = JWT.decode(userToken.substring(7));

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());

//         ScheduleItem schedule = new ScheduleItem(123L,"CS 156", "07492", "07493", new AppUser(), new Schedule());

//         when(scheduleItemRepository.save(any(ScheduleItem.class)))
//                 .thenReturn(schedule);
//         when(authController.getIsMember(any(String.class))).thenReturn(false);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isUnauthorized())
//                 .andReturn();
//     }

//     @Test
//     public void test_deleteScheduleItemSuccess() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/delete?id=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         DecodedJWT jwt = JWT.decode(userToken.substring(7));
//         ScheduleItem scheduleItem = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         Optional<ScheduleItem> opt = Optional.of(scheduleItem);

//         when(scheduleItemRepository.findById(any(Schedule.class)))
//                 .thenReturn(opt);

//         MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);
//     }

//     @Test
//     public void test_removeScheduleFailureNoAuth() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/delete?id=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(false);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem scheduleItem = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());

//         Optional<ScheduleItem> opt = Optional.of(scheduleItem);

//         when(scheduleItemRepository.findById(any(Schedule.class)))
//                 .thenReturn(opt);

//         MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isUnauthorized())
//                 .andReturn();
//     }

//     @Test
//     public void test_removeScheduleFailureWrongUser() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/delete?id=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem scheduleItem = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());

//         Optional<ScheduleItem> opt = Optional.of(scheduleItem);

//         when(scheduleItemRepository.findById(any(Schedule.class)))
//                 .thenReturn(opt);

//         MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isBadRequest())
//                 .andReturn();
//     }

//     @Test
//     public void test_removeScheduleFailureNotFound() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/delete?id=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         Optional<ScheduleItem> opt = Optional.empty();

//         when(scheduleItemRepository.findById(any(Schedule.class)))
//                 .thenReturn(opt);

//         MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isNotFound())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);
//     }

//     @Test
//     public void test_getScheduleItemsByScheduleIdSuccess() throws Exception {
//         String expectedResult = "{courseId= 'CS 156', title= 'Adv App Programming', days= 'MW', beginTime= '8', endTime= '9'}!{courseId= 'CS 156', title= 'Adv App Programming', days= 'MW', beginTime= '8', endTime= '9'}";
//         String urlTemplate = "/api/member/scheduleItems/getByScheduleId?scheduleId=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         List<ScheduleItem> scheduleItem = new ArrayList<>();
//         scheduleItem.add(s1);
//         scheduleItem.add(s2);

//         Schedule s = new Schedule(1L, "Blah","blah","W20",userId);

//         Optional<Schedule> parent = Optional.of(s);

//         when(scheduleItemRepository.findByScheduleId(any(Schedule.class)))
//                 .thenReturn(scheduleItem);

//         TimeLocation tL = new TimeLocation();
//         tL.setDays("MW");
//         tL.setBeginTime("8");
//         tL.setEndTime("9");
//         List<TimeLocation> tLs = new ArrayList<>();
//         tLs.add(tL);

//         Section sec = new Section();
//         sec.setEnrollCode("a");
//         sec.setTimeLocations(tLs);
//         Section sec1 = new Section();
//         sec1.setEnrollCode("b");
//         sec1.setTimeLocations(tLs);
//         List<Section> secs = new ArrayList<>();
//         secs.add(sec);
//         secs.add(sec1);



//         Course c = new Course();
//         c.setQuarter("W20");
//         c.setCourseId("CS 156");
//         c.setTitle("Adv App Programming");
//         c.setClassSections(secs);
//         Optional<Course> oC = Optional.of(c);


//         when(scheduleRepository.findById(any(Long.class))).thenReturn(parent);
//         when(courseRepo.findOneByQuarterAndCourseId(any(String.class),any(String.class))).thenReturn(oC);


//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
//                 .andReturn();


//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(responseString, expectedResult);
//     }

//     @Test
//     public void test_getScheduleItemsByScheduleIdSuccessNoItems() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/getByScheduleId?scheduleId=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);
//         ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         List<ScheduleItem> scheduleItem = new ArrayList<>();

//         when(scheduleItemRepository.findByScheduleId(any(Schedule.class)))
//                 .thenReturn(scheduleItem);

//         Schedule s = new Schedule(1L, "Blah","blah","W20",userId);

//         Optional<Schedule> parent = Optional.of(s);

//         when(scheduleRepository.findById(any(Long.class)))
//                 .thenReturn(parent);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isNoContent())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);
//     }

//     @Test
//     public void test_getScheduleItemsByScheduleIdSuccessNoSchedule() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/getByScheduleId?scheduleId=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         List<ScheduleItem> scheduleItem = new ArrayList<>();

//         when(scheduleItemRepository.findByScheduleId(any(Schedule.class)))
//                 .thenReturn(scheduleItem);


//         Optional<Schedule> parent = Optional.empty();

//         when(scheduleRepository.findById(any(Long.class)))
//                 .thenReturn(parent);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isBadRequest())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);
//     }

//     @Test
//     public void test_getScheduleItemsByScheduleIdSuccessNoCourse() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/getByScheduleId?scheduleId=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         List<ScheduleItem> scheduleItem = new ArrayList<>();
//         scheduleItem.add(s1);
//         scheduleItem.add(s2);

//         Schedule s = new Schedule(1L, "Blah","blah","W20","");

//         Optional<Schedule> parent = Optional.of(s);

//         when(scheduleItemRepository.findByScheduleId(any(Schedule.class)))
//                 .thenReturn(scheduleItem);

//         Optional<Course> oC = Optional.empty();


//         when(scheduleRepository.findById(any(Long.class))).thenReturn(parent);
//         when(courseRepo.findOneByQuarterAndCourseId(any(String.class),any(String.class))).thenReturn(oC);

//         when(scheduleRepository.findById(any(Long.class)))
//                 .thenReturn(parent);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isNoContent())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);
//     }


//     @Test
//     public void test_getScheduleItemsByScheduleIdSuccessNoAuth() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/getByScheduleId?scheduleId=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         List<ScheduleItem> scheduleItem = new ArrayList<>();
//         scheduleItem.add(s1);
//         scheduleItem.add(s2);

//         Schedule s = new Schedule(1L, "Blah","blah","W20","");

//         Optional<Schedule> parent = Optional.of(s);

//         when(scheduleItemRepository.findByScheduleId(any(Schedule.class)))
//                 .thenReturn(scheduleItem);

//         TimeLocation tL = new TimeLocation();
//         tL.setDays("MW");
//         tL.setBeginTime("8");
//         tL.setEndTime("9");
//         List<TimeLocation> tLs = new ArrayList<>();
//         tLs.add(tL);

//         Section sec = new Section();
//         sec.setEnrollCode("a");
//         sec.setTimeLocations(tLs);
//         List<Section> secs = new ArrayList<>();
//         secs.add(sec);

//         Course c = new Course();
//         c.setQuarter("W20");
//         c.setCourseId("CS 156");
//         c.setTitle("Adv App Programming");
//         c.setClassSections(secs);
//         Optional<Course> oC = Optional.of(c);


//         when(scheduleRepository.findById(any(Long.class))).thenReturn(parent);
//         when(courseRepo.findOneByQuarterAndCourseId(any(String.class),any(String.class))).thenReturn(oC);

//         when(scheduleRepository.findById(any(Long.class)))
//                 .thenReturn(parent);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isBadRequest())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);
//     }

//     @Test
//     public void test_getScheduleItemsByScheduleIdSuccessNotMember() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/getByScheduleId?scheduleId=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         when(authController.getIsMember(any(String.class))).thenReturn(false);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         List<ScheduleItem> scheduleItem = new ArrayList<>();
//         scheduleItem.add(s1);
//         scheduleItem.add(s2);

//         Schedule s = new Schedule(1L, "Blah","blah","W20","");

//         Optional<Schedule> parent = Optional.of(s);

//         when(scheduleItemRepository.findByScheduleId(any(Schedule.class)))
//                 .thenReturn(scheduleItem);

//         TimeLocation tL = new TimeLocation();
//         tL.setDays("MW");
//         tL.setBeginTime("8");
//         tL.setEndTime("9");
//         List<TimeLocation> tLs = new ArrayList<>();
//         tLs.add(tL);

//         Section sec = new Section();
//         sec.setEnrollCode("a");
//         sec.setTimeLocations(tLs);
//         List<Section> secs = new ArrayList<>();
//         secs.add(sec);

//         Course c = new Course();
//         c.setQuarter("W20");
//         c.setCourseId("CS 156");
//         c.setTitle("Adv App Programming");
//         c.setClassSections(secs);
//         Optional<Course> oC = Optional.of(c);


//         when(scheduleRepository.findById(any(Long.class))).thenReturn(parent);
//         when(courseRepo.findOneByQuarterAndCourseId(any(String.class),any(String.class))).thenReturn(oC);

//         when(scheduleRepository.findById(any(Long.class)))
//                 .thenReturn(parent);

//         MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isUnauthorized())
//                 .andReturn();
//     }

//     @Test
//     public void test_deleteScheduleItemByScheduleIdSuccess() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/deleteByScheduleId?scheduleId=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         List<ScheduleItem> scheduleItem = new ArrayList<>();
//         scheduleItem.add(s1);
//         scheduleItem.add(s2);

//         when(scheduleItemRepository.findByScheduleId(any(Schedule.class)))
//                 .thenReturn(scheduleItem);

//         MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);
//     }

//     @Test
//     public void test_deleteScheduleItemByScheduleIdNoAuth() throws Exception {
//         String expectedResult = "";
//         String urlTemplate = "/api/member/scheduleItems/deleteByScheduleId?scheduleId=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(true);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         List<ScheduleItem> scheduleItem = new ArrayList<>();
//         scheduleItem.add(s1);
//         scheduleItem.add(s2);

//         when(scheduleItemRepository.findByScheduleId(any(Schedule.class)))
//                 .thenReturn(scheduleItem);



//         MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isBadRequest())
//                 .andReturn();

//         String responseString = response.getResponse().getContentAsString();

//         assertEquals(expectedResult, responseString);
//     }

//     @Test
//     public void test_deleteScheduleItemByScheduleIdNotMember() throws Exception {
//         String urlTemplate = "/api/member/scheduleItems/deleteByScheduleId?scheduleId=%s";
//         String url = String.format(urlTemplate, "1");

//         AppUser user = new AppUser();
//         user.setId(123456L);
//         String userId = String.valueOf(user.getId());
//         when(authController.getIsMember(any(String.class))).thenReturn(false);
//         when(authController.getUser(any(String.class))).thenReturn(user);

//         ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "07492", "07493", new AppUser(), new Schedule());
//         List<ScheduleItem> scheduleItem = new ArrayList<>();
//         scheduleItem.add(s1);
//         scheduleItem.add(s2);

//         when(scheduleItemRepository.findByScheduleId(any(Schedule.class)))
//                 .thenReturn(scheduleItem);

//         MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isUnauthorized())
//                 .andReturn();
//     }
// }