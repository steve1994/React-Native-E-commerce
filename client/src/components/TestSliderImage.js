'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
// import { SliderBox } from 'react-native-image-slider-box';
// import ImageSlider from 'react-native-image-slider';
import Slideshow from 'react-native-image-slider-show';

export default class TestSliderImage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Slideshow
        dataSource = {[
          { url:'http://192.168.1.24:3002/images/uploaded_image/1574089705678_photo.jpg' },
          { url:'http://192.168.1.24:3002/images/uploaded_image/1574084867198_photo.jpg' }
      ]} />
    );
  }
}
