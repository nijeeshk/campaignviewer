import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Toast.module.scss';

class Toast extends PureComponent {
  static defaultProps = {
    text: '',
    id: '',
  }

  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
  }

  state = {
    show: false,
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (prevProps.id !== id) {
      // console.log('hereee');
      this.setState({ show: false }, () => {
        setTimeout(() => {
          this.setState({
            show: true,
          }, () => {
            setTimeout(() => {
              this.setState({
                show: false,
              });
            }, 3000);
          });
        });
      });
    }
  }

  render() {
    const { text } = this.props;
    const { show } = this.state;
    return (
      <div className={`${styles.toast} ${show ? styles.show : ''}`}>
        {text}
      </div>
    );
  }
}

export default Toast;
