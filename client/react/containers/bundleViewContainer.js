import React from 'react';
import { Grid, Row, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import FileDirectory from '../components/projectview/fileDirectory.js';
import FileContentDisplay from '../components/projectview/fileContentDisplay.js';

class BundleViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bundleContents: [],
      currentFile: {},
      contents: ''
    }
  }
  componentDidMount() {
    axios.get(`/bundle/contents/stack-bull-3f382c7f`)
      .then(function(response) {
        this.setState({
          bundleContents: response.data
        });
      }.bind(this))
      .catch(function(error) {
        console.log('err', error);
      });
  }
  setCurrentFile(currentFile) {
    this.setState({
      currentFile: currentFile,
      contents: currentFile.contents
    }, function() {
      console.log(this.state.contents);
    });
  }
  render() {
    return(
      <Grid fluid>
        <Row>
          <Col xs={3}>
            <FileDirectory setCurrentFile={this.setCurrentFile.bind(this)} directoryItems={this.state.bundleContents.children}/>
          </Col>
          <Col xs={9}>
            <FileContentDisplay currentFile={this.state.currentFile} contents={this.state.contents}/>
          </Col>
        </Row>
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

export default connect(mapStateToProps)(BundleViewContainer);