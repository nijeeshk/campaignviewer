import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.active}</td>
                <td>{item.Budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
