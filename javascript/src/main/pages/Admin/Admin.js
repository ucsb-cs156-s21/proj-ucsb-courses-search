import React from "react";
import { Table } from "react-bootstrap";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";

const Admin = () => {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: users } = useSWR(["/api/users", getToken], fetchWithToken);
  const { data: admins } = useSWR(["/api/admins", getToken], fetchWithToken);

  const getRole = (user) => {
    if (admins && admins.find(admin => {
      return admin.email === user.email;
    })) {
      return "Admin";
    }
    return "User";
  }

  return (
    <>
      <h1>Admin Panel</h1>
      <h2 style={{ display: 'flex', justifyContent: 'left' }}>All Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{getRole(user)}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </>
  );
}

export default Admin;