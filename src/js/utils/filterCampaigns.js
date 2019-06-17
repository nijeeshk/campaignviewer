const filterCampaigns = ({
  campaigns,
  search,
  startDate,
  endDate,
}) => {
  if (!(startDate
    || endDate
    || (search && search.trim()))) {
    return campaigns;
  }
  const filtered = campaigns.filter((item) => {
    if (startDate && item.startDate > startDate) {
      return false;
    }
    if (endDate && item.endDate < endDate) {
      return false;
    }
    if (search && search.trim()) {
      const match = item.name.match(new RegExp(`(?:^|\\W)${search}(\\w+)(?!\\w)`, 'gi'));
      if (!match) {
        return false;
      }
    }
    return true;
  });
  return filtered;
};

export default filterCampaigns;
