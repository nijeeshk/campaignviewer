import React from 'react';
import { shallow, mount } from 'enzyme';
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
    startDate: '05/20/2019',
    endDate: '07/01/2019',
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

  it('filters campaigns when searched for', () => {
    const app = mount(<App />);
    app.instance().addCampaigns(TEST_CAMPAIGNS);
    const input = app.find('input#searchInput');
    input.simulate('change', {
      target: { value: '2n' },
    });
    expect(app.state().search).toEqual('2n');
    app.instance().handleSearch();
    expect(app.state().filteredCampaigns).toEqual([
      {
        id: 2,
        name: '2nd campaign',
        startDate: '05/20/2019',
        endDate: '07/01/2019',
        Budget: 14587,
      },
    ]);
    app.unmount();
  });
});
