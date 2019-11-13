import React from 'react';
import ListProduct from './ListProduct';
import {
  NavigatorIOS,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

export default class OneWindow extends React.Component {

    constructor(props) {
        super(props);
        this.clickDetailItem = this.clickDetailItem.bind(this);
    }

    clickDetailItem(idProduct) {
        console.log(this.props.navigation);
        this.props.navigation.navigate('Detail',{idProduct});
    }

    render() {
        return (
            <View>
              <Button title="Add Product" onPress={()=>this.props.navigation.navigate('Add')} />
              <View>
                <ListProduct clickDetailItem={this.clickDetailItem} />
              </View>
            </View>
        );
    }
}
