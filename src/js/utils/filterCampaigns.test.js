import filterCampaigns from './filterCampaigns';

const campaigns = [
  {
    id: 1,
    name: 'campaign1',
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

describe('filterCampaigns', () => {
  it('should filter by date range correctly', () => {
    expect(filterCampaigns({
      campaigns,
      startDate: '06/25/2019',
      endDate: '06/28/2019',
    })).toEqual(campaigns);
  });

  it('should filter by search string correctly', () => {
    expect(filterCampaigns({
      campaigns,
      search: '2n',
    })).toEqual([
      {
        id: 2,
        name: '2nd campaign',
        startDate: '05/20/2019',
        endDate: '07/01/2019',
        Budget: 14587,
      },
    ]);
  });
});
