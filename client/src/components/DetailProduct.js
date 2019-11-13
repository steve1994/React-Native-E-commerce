import React from 'react';
import {connect} from 'react-redux'
import {viewProduct,voteProduct} from '../actions';
import {
    NavigatorIOS,
    Platform,
    StyleSheet,
    Text,
    Image,
    Picker,
    FlatList,
    View,
    Button
} from 'react-native';


class DetailProduct extends React.Component {

    constructor(props) {
        super(props)
        this.state = {vote:"1"};
        this.submitVote = this.submitVote.bind(this);
    }

    componentDidMount() {
        this.props.viewProduct(this.props.navigation.getParam('idProduct'));
    }

    submitVote(e) {
        e.preventDefault();
        this.props.voteProduct(this.props.navigation.getParam('idProduct'),this.state.vote);
        this.setState({vote:"1"});
    }

    render() {
        return (
          <View>
            	<View>
                   <View>
                        <Image source={{uri:'https://ak1.ostkcdn.com/images/products/8818677/Samsung-Galaxy-S4-I337-16GB-AT-T-Unlocked-GSM-Android-Cell-Phone-85e3430e-6981-4252-a984-245862302c78_600.jpg'}} />
                    </View>
                    <View>
                        <Text>{this.props.detailProduct.title}</Text>
                        <Text>{this.props.detailProduct.brand}</Text>
                        <Text>IDR {this.props.detailProduct.price}</Text>
                        <View>
                            <Text>VOTE</Text>
                            <View>
                                <Picker selectedValue={this.state.vote}
                                        style={{height:50, width:100}}
                                        onValueChange={(itemValue,itemIndex)=>this.setState({vote:itemValue})}>
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                    <Picker.Item label="5" value="5" />
                                </Picker>
                            </View>
                        </View>

                        <View>
                            <Button onPress={this.submitVote} title="VOTE" />
                        </View>
                    </View>

                    <View>
                        <Text>Detail Product</Text>
                        <View>
                            <Text>{this.props.detailProduct.detailProduct}</Text>
                        </View>
                    </View>

                    <View>
                        <Button onPress={()=>{this.props.navigation.navigate('Home')}} title='BACK' />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    detailProduct : state.detailProduct
})

const mapDispatchToProps = (dispatch) => ({
    viewProduct: (idProduct) => dispatch(viewProduct(idProduct)),
    voteProduct: (idProduct,vote) => dispatch(voteProduct(idProduct,vote))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (DetailProduct)
