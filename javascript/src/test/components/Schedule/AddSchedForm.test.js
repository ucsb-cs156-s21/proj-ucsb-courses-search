import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddSchedForm from 'main/components/Schedule/AddSchedForm';
jest.mock('isomorphic-unfetch');

describe('AddSchedForm tests', () => {
  test('renders without crashing', () => {
    render(<AddSchedForm />);
  });

  test('when I type a name, the state for name changes', () => {
    const { getByTestId } = render(<AddSchedForm />);
    const schedName = getByTestId('schedule-name');
    userEvent.type(schedName, 'My First Schedule');
    expect(schedName.value).toBe('My First Schedule');
  });

  test('when I type a description, the state for description changes', () => {
    const { getByTestId } = render(<AddSchedForm />);
    const schedDescription = getByTestId('schedule-description');
    userEvent.type(schedDescription, 'Classes I want');
    expect(schedDescription.value).toBe('Classes I want');
  });

  test('when I choose a quarter, the state for quarter changes', () => {
    const { getByLabelText } = render(<AddSchedForm />);
    const schedQuarter = getByLabelText('Quarter');
    userEvent.selectOptions(schedQuarter, '20211');
    expect(schedQuarter.value).toBe('20211');
  });

  test('when I click submit, the right stuff happens', async () => {
    const sampleReturnValue = {
      sampleKey: 'sampleValue',
    };

    // Create spy functions (aka jest function, magic function)
    // The function doesn't have any implementation unless
    // we specify one.  But it does keep track of whether
    // it was called, how many times it was called,
    // and what it was passed.

    const fetchJSONSpy = jest.fn();
    const tokenSpy = 'token';
    const successSpy = 'success';
    const errorSpy = 'error';

    fetchJSONSpy.mockResolvedValue(sampleReturnValue);

    const { getByTestId, getByLabelText } = render(
      <AddSchedForm
        createSchedule={fetchJSONSpy}
        getToken={tokenSpy}
        onSuccess={successSpy}
        onError={errorSpy}
      />
    );

    const expectedFields = {
      name: 'MySchedule',
      description: 'Classes',
      quarter: '20211',
      userId: '',
    };

    const schedName = getByTestId('schedule-name');
    userEvent.type(schedName, 'MySchedule');
    const schedDescription = getByTestId('schedule-description');
    userEvent.type(schedDescription, 'Classes');
    const schedQuarter = getByLabelText('Quarter');
    userEvent.selectOptions(schedQuarter, '20211');

    const submitButton = getByTestId('schedule-submit');
    userEvent.click(submitButton);

    // we need to be careful not to assert this expectation
    // until all of the async promises are resolved
    await waitFor(() => expect(fetchJSONSpy).toHaveBeenCalledTimes(1));

    // assert that ourSpy was called with the right value
    expect(fetchJSONSpy).toHaveBeenCalledWith(expectedFields);
  });
});
