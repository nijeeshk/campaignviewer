import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import nFormatter from '../../utils/numberFormatter';
import styles from './Table.module.scss';

class Table extends Component {
  static defaultProps = {
    data: [],
  };

  static propTypes = {
    data: PropTypes.array,
  };

  render() {
    const { data } = this.props;
    if (!data.length) {
      return (
        <div className={styles.noData}>
          <h3>No Campaigns!</h3>
          <p>
            Add new campaigns using <span>AddCampaigns</span> global function.
          </p>
        </div>
      );
    }
    return (
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Active</th>
              <th>Budget</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const now = moment().format('MM/DD/YYYY');
              const campaignActive = now >= item.startDate && now <= item.endDate;
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>
                    <span className={campaignActive ? styles.active : ''}>
                      {campaignActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{`${nFormatter(item.Budget, 1)} USD`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
