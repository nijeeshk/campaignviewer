import processCampaigns from './processCampaigns';

describe('processCampaigns', () => {
  // accept campaigns with keys id, name, startDate, endDate and Budget
  it('should accept all campaigns with correct format', () => {
    expect(processCampaigns([
      {
        id: 1,
        name: 'campaign 1',
        startDate: '05/20/2019',
        endDate: '07/01/2019',
        Budget: 14587,
      },
    ])).toEqual({
      list: [
        {
          id: 1,
          name: 'campaign 1',
          startDate: '05/20/2019',
          endDate: '07/01/2019',
          Budget: 14587,
        },
      ],
      failed: [],
    });
  });

  it('should reject all campaigns with incorrect format', () => {
    expect(processCampaigns([
      { x: '1' },
    ])).toEqual({
      list: [],
      failed: [{ x: '1' }],
    });
  });

  it('should reject all campaigns with endDate before startDate', () => {
    expect(processCampaigns([
      {
        id: 1,
        name: 'campaign 1',
        startDate: '07/01/2019',
        endDate: '05/20/2019',
        Budget: 14587,
      },
    ])).toEqual({
      list: [],
      failed: [
        {
          id: 1,
          name: 'campaign 1',
          startDate: '07/01/2019',
          endDate: '05/20/2019',
          Budget: 14587,
        },
      ],
    });
  });
});
