import React from 'react';
import {connect} from 'react-redux'
import {postProduct} from '../actions';
import {
  NavigatorIOS,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Picker,
  FlatList,
  View,
  Button,
  FormLabel,
  FormInput
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

class AddProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title:'',rate:'1',description:'',price:'',brand:'',detailProduct:'',imagePaths:''};
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleBrand = this.handleBrand.bind(this);
        this.handleDetailProduct = this.handleDetailProduct.bind(this);
        this.handleImageProduct = this.handleImageProduct.bind(this);
        this.cancelButtonAction = this.cancelButtonAction.bind(this);
        this.addButtonAction = this.addButtonAction.bind(this);
        this.pickSingleWithCamera = this.pickSingleWithCamera.bind(this);
    }

    handleTitle(value) {
        this.setState({title:value});
    }

    handleDescription(value) {
        this.setState({description:value});
    }

    handlePrice(value) {
        this.setState({price:value});
    }

    handleBrand(value) {
        this.setState({brand:value});
    }

    handleDetailProduct(value) {
        this.setState({detailProduct:value});
    }

    handleImageProduct(e) {
        this.setState({imageProduct:e.target.files[0]});
    }

    cancelButtonAction() {
        this.setState({title:'',rate:'1',description:'',price:'',brand:'',detailProduct:''})
        this.props.navigation.navigate('Home');
    }

    addButtonAction() {
        let arrayImages = [];
        arrayImages.push(this.state.imagePaths);
        this.props.postProduct(this.state.title
                              ,this.state.rate
                              ,this.state.description
                              ,this.state.price
                              ,this.state.brand
                              ,this.state.detailProduct
                              ,arrayImages);
        this.setState({title:'',rate:'1',description:'',price:'',brand:'',detailProduct:'',imagePaths:''})
        this.props.navigation.navigate('Home');
    }

    pickSingleWithCamera() {
        ImagePicker.openCamera({
            cropping: true,
            width: 500,
            height: 500,
            mediaType:'photo'
        }).then(image => {
            this.setState({imagePaths:image});
        }).catch(e => alert(e));
    }

    render() {
        return (
          <View>
              <View>
                  { /*<Image source={{uri:this.state.imagePaths}} style={{width:200,height:200}} /> */ }
                  <Button title='Choose Image' onPress={this.pickSingleWithCamera} />
              </View>
              <View>
                  <Text>Title</Text>
                  <View>
                      <TextInput placeholder="Enter title here" onChangeText={this.handleTitle} />
                  </View>
              </View>
              <View>
                  <Text>Rate</Text>
                  <View>
                      <Picker selectedValue={this.state.rate}
                              style={{height:50, width:100}}
                              onValueChange={(itemValue,itemIndex)=>this.setState({rate:itemValue})}>
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                          <Picker.Item label="4" value="4" />
                          <Picker.Item label="5" value="5" />
                      </Picker>
                  </View>
              </View>
              <View>
                  <Text>Description</Text>
                  <View>
                      <TextInput placeholder="Enter description here" onChangeText={this.handleDescription} />
                  </View>
              </View>
              <View>
                  <Text>Price</Text>
                  <View>
                      <TextInput placeholder="Enter price here" onChangeText={this.handlePrice} />
                  </View>
              </View>
              <View>
                  <Text>Brand</Text>
                  <View>
                      <TextInput placeholder="Enter brand here" onChangeText={this.handleBrand} />
                  </View>
              </View>
              <View>
                  <Text>Detail Product</Text>
                  <View>
                      <TextInput placeholder="Enter detail product here" onChangeText={this.handleDetailProduct} />
                  </View>
              </View>
              <View>
                  <View>
                      <Button onPress={this.addButtonAction} title="Add" />
                      <Button onPress={this.cancelButtonAction} title="Cancel" />
                  </View>
              </View>
          </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    postProduct: (title,rate,description,price,brand,detailProduct,fileImages) => dispatch(postProduct(title,rate,description,price,brand,detailProduct,fileImages))
});

export default connect(
    null,
    mapDispatchToProps
) (AddProduct)
