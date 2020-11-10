import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";

const Admin = () => {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: users } = useSWR(["/api/users", getToken], fetchWithToken);
  const { data: admins, mutate: mutateAdmins } = useSWR(["/api/admins", getToken], fetchWithToken);

  const getAdminForUser = (user, allAdmins) => {
    if (allAdmins) {
      return allAdmins.find(admin => {
        return admin.email === user.email;
      });
    }
    return null;
  }

  const promoteToAdmin = async (email) => {
    await fetchWithToken("/api/admins", getToken, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    });
    mutateAdmins();
  }

  const demoteAdmin = async (id) => {
    await fetchWithToken(`/api/admins/${id}`, getToken, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });
    mutateAdmins();
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
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => {
              const admin = getAdminForUser(user, admins);
              const role = admin ? "Admin" : "User";
              const buttonText = admin ? "Demote" : "Promote"
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{role}</td>
                  <td>
                    { admin && admin.isPermanentAdmin ?
                      <Badge>Permanent Admin</Badge> :
                      <Button onClick={ admin ?
                        async () => {
                          await demoteAdmin(admin.id);
                        } :
                        () => {
                          promoteToAdmin(user.email);
                        }
                      }>{buttonText}</Button>
                    }
                  </td>
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