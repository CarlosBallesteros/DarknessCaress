import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import injecTapEventPlugin from 'react-tap-event-plugin';

import EquipmentContainer from './EquipmentContainer';
import FriendsContainer from './FriendsContainer';
import UnitsContainer from './UnitsContainer';

injecTapEventPlugin();

export default class MenuContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0 //doesn't work if you change it to 1 or 2, but should work (?)
    };
  }

  handleChangeIndex(index) {
    this.setState({
      slideIndex: index
    });
  }

  handleChangeTabs(value) {
    this.setState({
      slideIndex: parseInt(value, 10)
    });
  }

  render() {
    const style = {
      slide: {
        padding: 10
      }
    };
    
    return (
      <div>
      <Tabs onChange={this.handleChangeTabs.bind(this)} value={this.state.slideIndex + ''}>
        <Tab label="Equipment" value="0" />
        <Tab label="Characters" value="1" />
        <Tab label="Friends" value="2" />
      </Tabs>
      <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChangeIndex.bind(this)}>
        <div style={style.slide}>
          <EquipmentContainer />
        </div>
        <div style={style.slide}>
          <UnitsContainer />
        </div>
        <div style={style.slide}>
          <FriendsContainer />
        </div>
      </SwipeableViews>
      </div>
    );
  }
}
