import React from "react";
import { render } from "@testing-library/react";
import RoleBadge from "main/components/Profile/RoleBadge";


describe("AppNavbar tests", () => {
  
  test("should render 'Loading role...' when no role available", () => {
    const { getByText } = render(
      <RoleBadge />
    );
    const loadingText = getByText(/Loading role.../);
    expect(loadingText).toBeInTheDocument();
  });
  
});
