import React from 'react';
import { render } from '@testing-library/react';
import AdminSettings from 'main/pages/Admin/AdminSettings';

describe('Admin Settings tests', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<AdminSettings />);
    expect(
      getByText(
        'This page will be available to admins to select which quarters are available across the app for searching, statistics, and scheduling. It is currently in progress.'
      )
    ).toBeInTheDocument();
  });
});
