const processCampaigns = (campaigns) => {
  const results = {
    list: [],
    failed: [],
  };
  campaigns.map((campaign) => {
    if (Object.prototype.hasOwnProperty.call(campaign, 'id')
    && Object.prototype.hasOwnProperty.call(campaign, 'name')
    && Object.prototype.hasOwnProperty.call(campaign, 'startDate')
    && Object.prototype.hasOwnProperty.call(campaign, 'endDate')
    && Object.prototype.hasOwnProperty.call(campaign, 'Budget')) {
      return results.list.push(campaign);
    }
    return results.failed.push(campaign);
  });
  return results;
};

export default processCampaigns;
