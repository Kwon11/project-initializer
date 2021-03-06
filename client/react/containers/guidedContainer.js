import React from 'react';
import GuidedCartContainer from './guidedCartContainer';
import { Grid, Row, Col } from 'react-bootstrap';

class GuidedContainer extends React.Component {

  render() {
    return (
      <Grid className='container-wrapper'>
        <Row>
          {this.props.children}
          <GuidedCartContainer />
        </Row>
      </Grid>
    )
  }
}

export default GuidedContainer;