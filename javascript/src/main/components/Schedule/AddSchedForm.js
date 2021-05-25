import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SelectQuarter from 'main/components/BasicCourseSearch/SelectQuarter';
import { quarterRange } from 'main/utils/quarterUtilities';

const AddSchedForm = ({ createSchedule, updateSchedule, existingSchedule }) => {
  const emptySchedule = {
    name: '',
    description: '',
    quarter: '',
    userId: '',
  };

  const [schedule, setSchedule] = useState(existingSchedule || emptySchedule);
  const quarters = quarterRange('20084', '20214');
  const localQuarter = localStorage.getItem('PersonalSchedule.Quarter');
  const [quarter, setQuarter] = useState(
    (existingSchedule ? existingSchedule.quarter : null) ||
      localQuarter ||
      quarters[0].yyyyq
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (createSchedule) {
      createSchedule(schedule);
    } else {
      updateSchedule(schedule, schedule.id);
    }
  };

  const handleNameOnChange = (event) => {
    setSchedule({
      ...schedule,
      name: event.target.value,
    });
  };

  const handleDescriptionOnChange = (event) => {
    setSchedule({
      ...schedule,
      description: event.target.value,
    });
  };

  const handleQuarterOnChange = (quarter) => {
    localStorage.setItem('PersonalSchedule.Quarter', quarter);
    setQuarter(quarter);
    setSchedule({
      ...schedule,
      quarter: quarter,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formsSchedName">
        <Form.Label>Schedule Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Schedule Name"
          value={schedule.name}
          onChange={handleNameOnChange}
          data-testid="schedule-name"
        />
      </Form.Group>

      <Form.Group controlId="formSchedDes">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Schedule Description"
          value={schedule.description}
          onChange={handleDescriptionOnChange}
          data-testid="schedule-description"
        />
      </Form.Group>
      <SelectQuarter
        quarters={quarters}
        quarter={quarter}
        setQuarter={handleQuarterOnChange}
        controlId={'PersonalSchedule.Quarter'}
        label={'PersonalScheduleQuarter'}
      />

      <Button variant="primary" type="submit" data-testid="schedule-submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddSchedForm;
