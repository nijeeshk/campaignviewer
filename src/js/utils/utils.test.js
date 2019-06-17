import filterCampaigns from './filterCampaigns';
// import numberFormatter from './numberFormatter';
// import processCampaigns from './processCampaigns';

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
    name: 'campaign1',
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
      search: 'cam',
    })).toEqual(campaigns);
  });
});
