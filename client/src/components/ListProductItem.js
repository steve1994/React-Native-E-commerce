import React from 'react';
// import StarRating from 'react-native-star-rating';
// import Stars from 'react-native-stars';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {NavigatorIOS, Platform, StyleSheet, Text, Image, FlatList, View, Button} from 'react-native';
import Slideshow from 'react-native-image-slider-show';

export default class ListProductItem extends React.Component {

    constructor(props) {
        super(props);
        this.clickDetailItem = this.clickDetailItem.bind(this);
    }

    averageRate(rateHistory) {
        let length = rateHistory.length;
        let sum = 0;
        for (let i=0;i<rateHistory.length;i++) {
            sum += parseInt(rateHistory[i]);
        }
        return sum / length;
    }

    clickDetailItem() {
        this.props.clickDetail(this.props.origin_id);
    }

    render() {
        // For calculating average rate
        let accumulativeRate = this.averageRate(this.props.rate);
        // For Image Slider displayed
        let listUrlImages = [];
        for (let i=0;i<this.props.imagePath.length;i++) {
            listUrlImages.push({url:`http://192.168.1.24:3002/images/uploaded_image/${this.props.imagePath[i]}`});
        }
        return (
          <View>
            <View>
                <Slideshow dataSource = {listUrlImages} />
            </View>
            <View>
              <View>
                <Text>Title</Text>
                <Text>{this.props.title}</Text>
              </View>
              <View>
                <Text>Price</Text>
                <Text>IDR {this.props.price}</Text>
              </View>
              <View>
                <Text>Rate</Text>
                <View>
                    <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={30}
                    readonly={true}
                    startingValue={parseFloat(`${accumulativeRate}`)} />
                </View>
              </View>
              <View>
                <Text>Description</Text>
                <Text>{this.props.description}</Text>
              </View>
              <View>
                <Button onPress={this.clickDetailItem} title='DETAIL ITEM' />
              </View>
            </View>
          </View>
        );
    }
}
