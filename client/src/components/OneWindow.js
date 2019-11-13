import React from 'react';
import ListProduct from './ListProduct';
import {NavigatorIOS, Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class OneWindow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
              <Button title="Add Product" onPress={()=>this.props.navigation.navigate('Add')} />
              <View>
                <ListProduct />
              </View>
            </View>
        );
    }
}
