import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

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
    expect(app.state().filteredCampaigns).toEqual(TEST_CAMPAIGNS);
  });
});
