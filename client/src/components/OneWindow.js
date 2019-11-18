import React from 'react';
import ListProduct from './ListProduct';
import {
  NavigatorIOS,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';

export default class OneWindow extends React.Component {

    constructor(props) {
        super(props);
        this.clickDetailItem = this.clickDetailItem.bind(this);
    }

    clickDetailItem(idProduct) {
        this.props.navigation.navigate('Detail',{idProduct});
    }

    render() {
        return (
            <View>
              <View>
                <ListProduct clickDetailItem={this.clickDetailItem} />
              </View>
              <TouchableOpacity style={styles.fab} onPress={()=>this.props.navigation.navigate('Add')}>
                  <Text style={styles.text}>+</Text>
              </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  fab:{
    height: 50,
    width: 50,
    borderRadius: 200,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#686cc3',
  },
  text:{
    fontSize:30,
    color:'white'
  },
});
