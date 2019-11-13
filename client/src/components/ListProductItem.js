import React from 'react';
// import Star from './Star'
import {NavigatorIOS, Platform, StyleSheet, Text, Image, FlatList, View, Button} from 'react-native';

export default class ListProductItem extends React.Component {

    constructor(props) {
        super(props);
        this.clickDetailItem = this.clickDetailItem.bind(this);
    }

    // averageRate(rateHistory) {
    //     let length = rateHistory.length;
    //     let sum = 0;
    //     for (let i=0;i<rateHistory.length;i++) {
    //         sum += parseInt(rateHistory[i]);
    //     }
    //     return sum / length;
    // }

    clickDetailItem() {
        // this.props.navigation.navigate('Detail', {idProduct : this.props.origin_id});
        this.props.clickDetail(this.props.origin_id);
    }

    render() {
        // let accumulativeRate = this.averageRate(this.props.rate);

        return (
          <View>
            <View>
                <Image source={{uri:'https://bit.ly/1myplK1'}} />
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
