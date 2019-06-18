import React from 'react';
import moment from 'moment';
import { shallow, mount } from 'enzyme';
import App from './index';

jest.useFakeTimers();

const TEST_CAMPAIGNS = [
  {
    id: 1,
    name: 'campaign 1',
    startDate: '05/20/2019',
    endDate: '07/01/2019',
    Budget: 14587,
  },
  {
    id: 2,
    name: '2nd campaign',
    startDate: '01/20/2019',
    endDate: '02/01/2019',
    Budget: 14587,
  },
];

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('accepts campaigns and lists them correctly', () => {
    const app = shallow(<App />);
    app.instance().addCampaigns(TEST_CAMPAIGNS);
    expect(app).toMatchSnapshot();
  });

  it('filters campaigns when searched for', () => {
    const app = mount(<App />);
    app.instance().addCampaigns(TEST_CAMPAIGNS);
    app.find('input#searchInput').simulate('change', {
      target: { value: '2n' },
    });
    jest.advanceTimersByTime(1000);
    expect(app.state().filteredCampaigns).toEqual([
      {
        id: 2,
        name: '2nd campaign',
        startDate: '01/20/2019',
        endDate: '02/01/2019',
        Budget: 14587,
      },
    ]);
    app.unmount();
  });

  it('filters campaigns when date range updated', () => {
    const app = mount(<App />);
    app.instance().addCampaigns(TEST_CAMPAIGNS);
    app.instance().onDatesChange({
      startDate: moment('06/20/2019', 'MM/DD/YYYY'),
      endDate: moment('06/25/2019', 'MM/DD/YYYY'),
    });
    jest.advanceTimersByTime(1000);
    expect(app.state().filteredCampaigns).toEqual([
      {
        id: 1,
        name: 'campaign 1',
        startDate: '05/20/2019',
        endDate: '07/01/2019',
        Budget: 14587,
      },
    ]);
    app.unmount();
  });
});
