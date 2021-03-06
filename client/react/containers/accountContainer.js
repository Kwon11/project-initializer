import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import AccountRow from '../components/account/accountRow.js';

class AccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBundles: []
    }
  }
  componentWillMount() {
    this.getUserBundles();
  }

  deleteBundleHandler(bundleName) {
    axios.post(`/bundle/delete`, {
      userName: this.props.options.user.userName,
      bundleName: bundleName
      })
      .then(function(response) {
        console.log(response);
        this.getUserBundles();
      }.bind(this))
      .catch(function(error) {
        console.log(response);
      })
  }

  viewBundleHandler(bundleName) {
    browserHistory.push(`/view/${this.props.options.user.userName}/${bundleName}`);
  }

  downloadBundleHandler(bundleName) {
    window.location.assign(`/bundle/${this.props.options.user.userName}/${bundleName}`)
  }

  getUserBundles() {
    axios.get(`/bundle/${this.props.options.user.userName}`)
      .then(function(response) {
        var rows = [];
        for (var i = 0; i < response.data.length; i+=4) {
          rows.push([response.data[i], response.data[i+1], response.data[i+2], response.data[i+3]])
        }
        this.setState({
          userBundles: rows
        });
      }.bind(this))
      .catch(function(error) {
        console.log('err', error)
      });
  }

  render() {
    return(
      <Grid>
        {this.state.userBundles.map(function(bundleRow, index) {
          return (
            <AccountRow
              key={index}
              downloadBundleHandler={this.downloadBundleHandler.bind(this)}
              deleteBundleHandler={this.deleteBundleHandler.bind(this)}
              viewBundleHandler={this.viewBundleHandler.bind(this)}
              bundleRow={bundleRow}/>
          )
        }.bind(this))}
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

export default connect(mapStateToProps)(AccountContainer);