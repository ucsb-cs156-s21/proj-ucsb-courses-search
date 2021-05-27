import React from "react";
import "main/App.css";
import Loading from "main/components/Loading/Loading";
import AppNavbar from "main/components/Nav/AppNavbar";
import AuthorizedRoute from "main/components/Nav/AuthorizedRoute";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import AppFooter from "main/components/Footer/AppFooter";
import About from "main/pages/About/About";
import Statistics from "main/pages/Statistics/Statistics";
import NumFullCoursesByDept from "main/pages/Statistics/NumFullCoursesByDept";
import NumOpenCoursesByDept from "main/pages/Statistics/NumOpenCoursesByDept";
import DivisionOccupancy from "main/pages/Statistics/DivisionOccupancy";
import ClassSize from "main/pages/Statistics/ClassSize";
import TotalCourses from "main/pages/Statistics/TotalCourses";
import AggregateStatistics from "main/pages/Statistics/AggregateStatistics";
import Schedule from "main/pages/Schedule/Schedule";
import EditSchedule from "main/pages/Schedule/EditSchedule";
import NewSchedule from "main/pages/Schedule/NewSchedule";
import PersonalSchedule from "main/pages/Schedule/PersonalSchedule";
import CourseOccupancy from "main/pages/Statistics/CourseOccupancy";
import Home from "main/pages/Home/Home";
import Basic from "main/pages/History/Basic";
import Ge from "main/pages/History/Ge";
import Instructor from "main/pages/History/Instructor";
import Profile from "main/pages/Profile/Profile";
import PrivateRoute from "main/components/Auth/PrivateRoute";
import Admin from "main/pages/Admin/Admin";
import AdminSettings from "main/pages/Admin/AdminSettings";
import useSWR from "swr";
import { fetchWithToken } from "main/utils/fetch";
import CourseName from "./pages/History/CourseName";
import AddToSchedule from "main/pages/Schedule/AddToSchedule";

function App() {
  const { isLoading, getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(["/api/myRole", getToken], fetchWithToken);
  const _isAdmin = roleInfo && roleInfo.role.toLowerCase() === "admin";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <AppNavbar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/history/basic" exact component={Basic} />
          <Route path="/history/courseNumber" exact component={CourseName} />
          <Route path="/statistics" exact component={Statistics} />
          <Route
            path="/statistics/numFullCoursesByDept"
            exact
            component={NumFullCoursesByDept}
          />
          <Route
            path="/statistics/numOpenCoursesByDept"
            exact
            component={NumOpenCoursesByDept}
          />
          <Route path="/statistics/classSize" exact component={ClassSize} />
          <Route path="/statistics/aggregateStatistics" exact component={AggregateStatistics} />
          <Route
            path="/statistics/totalCourses"
            exact
            component={TotalCourses}
          />
          <Route
            path="/statistics/courseOccupancy"
            exact
            component={CourseOccupancy}
          />
          <Route path="/history/ge" exact component={Ge} />
          <Route path="/history/instructor" exact component={Instructor} />
          <Route
            path="/statistics/courseOccupancyByDivision"
            exact
            component={DivisionOccupancy}
          />
          <PrivateRoute path="/profile" component={Profile} />
          <AuthorizedRoute
            path="/admin/panel"
            component={Admin}
            authorizedRoles={["admin"]}
          />
          <AuthorizedRoute
            path="/admin/settings"
            component={AdminSettings}
            authorizedRoles={["admin"]}
          />
          <Route path="/about" component={About} />
          <AuthorizedRoute
            path="/schedule"
            component={Schedule}
            exact
            authorizedRoles={["admin", "member"]}
          />
          <AuthorizedRoute
            path="/schedule/new"
            component={NewSchedule}
            exact
            authorizedRoles={["admin", "member"]}
          />
          <AuthorizedRoute
            path="/schedule/update/:scheduleId"
            component={EditSchedule}
            exact
            authorizedRoles={["admin", "member"]}
          />
          <AuthorizedRoute path="/schedule/:scheduleId"
           component={PersonalSchedule}
           exact
           authorizedRoles={["admin", "member"]}
          />
          <AuthorizedRoute
            path="/addToSchedule"
            component={AddToSchedule}
            exact
            authorizedRoles={["admin", "member"]}
          />
        </Switch>
      </Container>
      <AppFooter />
    </div>
  );
}

export default App;
