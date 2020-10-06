import React from "react";
import { render } from "@testing-library/react";
import Profile from "main/pages/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");

describe("Profile tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      user: {
        name: "test user",
        email: "test@test.com",
        picture: "https://picsum.photos/200",
      },
    });
  });
  test("renders without crashing", () => {
    render(<Profile />);
  });
});
