import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuidV4 from 'uuid/v4';
import { DateRangePicker } from 'react-dates';

import {
  Panel,
  PanelHeader,
  PanelBody,
} from '../../widgets/Panel';
import Input from '../../widgets/Input';
import Toast from '../../widgets/Toast';
import Table from '../../widgets/Table';
import processCampaigns from '../../utils/processCampaigns';
import filterCampaigns from '../../utils/filterCampaigns';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import styles from './App.module.scss';

class App extends Component {
  static defaultProps = {
    campaigns: [],
    filteredCampaigns: [],
    startDate: null,
    endDate: null,
    focusedInput: null,
    pageWidth: 0,
    toast: {
      id: '',
      text: '',
    },
    search: '',
  };

  static propTypes = {
    campaigns: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        Budget: PropTypes.number.isRequired,
      }),
    ).isRequired,
    filteredCampaigns: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        Budget: PropTypes.number.isRequired,
      }),
    ).isRequired,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    focusedInput: PropTypes.string,
    pageWidth: PropTypes.number,
    toast: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }),
    search: PropTypes.string,
  };

  state = {
    campaigns: this.props.campaigns,
    filteredCampaigns: this.props.filteredCampaigns,
    startDate: this.props.startDate,
    endDate: this.props.endDate,
    focusedInput: this.props.focusedInput,
    pageWidth: this.props.pageWidth,
    toast: this.props.toast,
    search: this.props.search,
  };

  resizeHandle = null;

  searchHandle = null;

  componentDidMount() {
    window.AddCampaigns = this.addCampaigns;
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (this.resizeHandle) {
      clearTimeout(this.resizeHandle);
    }
    this.resizeHandle = setTimeout(() => {
      this.setState({
        pageWidth: document.documentElement.offsetWidth,
      });
    }, 500);
  }

  addCampaigns = (campaigns) => {
    const { list, failed } = processCampaigns(campaigns);
    const toastText = `Add Campaigns: ${list.length} success. ${failed.length} failed`;
    this.setState({
      ...App.defaultProps,
      campaigns: [
        ...list,
        ...this.state.campaigns,
      ],
      filteredCampaigns: [
        ...list,
        ...this.state.campaigns,
      ],
      toast: {
        id: uuidV4(),
        text: toastText,
      },
    });
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate,
    }, () => {
      this.handleSearch();
    });
  }

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  }

  isOutsideRange = (date) => {
    const { startDate, endDate } = this.state;
    if (moment(startDate).isValid()
      && moment(endDate).isValid()) {
      return false;
    }
    if (moment(startDate).isValid()
      && moment(date).isBefore(moment(startDate))) {
      return true;
    }
    if (moment(endDate).isValid()
      && moment(date).isAfter(moment(endDate))) {
      return true;
    }
    return false;
  }

  onSearchTextChange = (evt) => {
    this.setState({
      search: evt.target.value,
    }, () => {
      this.handleSearch();
    });
  }

  handleSearch = () => {
    const {
      search,
      campaigns,
      startDate,
      endDate,
    } = this.state;
    if (this.searchHandle) {
      clearTimeout(this.searchHandle);
    }
    this.searchHandle = setTimeout(() => {
      const filteredCampaigns = filterCampaigns({
        campaigns,
        search,
        startDate: moment(startDate).isValid()
          ? moment(startDate).format('MM/DD/YYYY') : '',
        endDate: moment(endDate).isValid()
          ? moment(endDate).format('MM/DD/YYYY') : '',
      });
      this.setState({
        filteredCampaigns,
      });
    }, 500);
  }

  render() {
    const {
      filteredCampaigns,
      startDate,
      endDate,
      focusedInput,
      pageWidth,
      toast,
      search,
    } = this.state;
    const showFullscreenCalendar = pageWidth < 768;
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <h1>Campaign Viewer</h1>
          <Panel>
            <PanelHeader className={styles.panelHeader}>
              <div className={styles.left}>
                <DateRangePicker
                  startDate={startDate}
                  startDateId="dateStart"
                  endDate={endDate}
                  endDateId="dateEnd"
                  focusedInput={focusedInput}
                  onDatesChange={this.onDatesChange}
                  onFocusChange={this.onFocusChange}
                  enableOutsideDays={false}
                  displayFormat="MM/DD/YYYY"
                  isOutsideRange={this.isOutsideRange}
                  numberOfMonths={showFullscreenCalendar ? 1 : 2}
                  withFullScreenPortal={showFullscreenCalendar}
                  showDefaultInputIcon={!showFullscreenCalendar}
                  block
                  readOnly
                  hideKeyboardShortcutsPanel
                  showClearDates
                  small
                />
              </div>
              <div className={styles.right}>
                <Input
                  id="searchInput"
                  placeholder="Search by Name"
                  value={search}
                  onChange={this.onSearchTextChange}
                />
              </div>
            </PanelHeader>
            <PanelBody>
              <div id="results">
                <Table data={filteredCampaigns} />
              </div>
            </PanelBody>
          </Panel>
        </div>
          <Toast
            {...toast}
          />
      </div>
    );
  }
}

export default App;
