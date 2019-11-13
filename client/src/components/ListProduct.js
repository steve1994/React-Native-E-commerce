import React from 'react';
import ListProductItem from './ListProductItem';
import {connect} from 'react-redux'
import {loadProduct,loadNextPage} from '../actions'
import {NavigatorIOS, Platform, StyleSheet, Text, FlatList, View, Button} from 'react-native';

class ListProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {pageNum:2};
    }

    componentDidMount() {
        let limit = 7;
        let numPage = 1;
        this.props.loadProduct(limit,numPage);
    }

    loadMore() {
        let limit = 7;
        this.props.loadNextPage(limit,this.state.pageNum);
        this.setState({pageNum: this.state.pageNum+1});
    }

    render() {
        // let listItem = this.props.products.map((item,index) => {
        //     return (<ListProductItem key={index} imagePath={item.imageProduct} origin_id={item._id} rate={item.rate} title={item.title} price={item.price} description={item.description} />);
        // });
        return (
            <View>
                <FlatList data={this.props.products} renderItem={({item,index}) => <ListProductItem  key={index} imagePath={item.imageProduct} origin_id={item._id} rate={item.rate} title={item.title} price={item.price} description={item.description} />} />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = (dispatch) => ({
    loadProduct: (limit,numPage) => (dispatch(loadProduct(limit,numPage))),
    loadNextPage: (limit,numPage) => (dispatch(loadNextPage(limit,numPage)))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (ListProduct)
