/**
 * Created by Elf on 12.06.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ListView, Image, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';

import PropsConfig from './../config/PropsConfig';
import NavBar from './NavBar';
import DimensionUtils from './../utils/dimensionUtils';

export default class PhotosListView extends Component {
    static propTypes = {
        photos: React.PropTypes.array.isRequired,
        isPhotosPending: React.PropTypes.bool.isRequired,
        onEndPhotosReached: React.PropTypes.func.isRequired,
        onPickUpPhoto: React.PropTypes.func.isRequired,
        refresh: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(props.photos)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    style={styles.navBar}
                    title={'500px.com Most Popular'}
                    backBtnOn={false}
                    actionBtnOn={true}
                    onActionBtnPress={this.props.refresh}/>

                <View style={styles.listContainer}>
                    <ListView contentContainerStyle={styles.photosGrid}
                              dataSource={this.state.dataSource}
                              onEndReached={this.props.endPhotosReached}
                              onEndReachedThreshold={DimensionUtils.getHeightDimInPerc(18)} // Row height
                              showsVerticalScrollIndicator={false}
                              enableEmptySections={true}
                              renderRow={this.renderPhotoCell.bind(this)}
                              renderSeparator={this.renderSeparator.bind(this)}
                              renderFooter={this.renderFooter.bind(this)}
                              render
                              pageSize={PropsConfig.photosPerPage}/>
                </View>
            </View>
        );
    }

    renderPhotoCell(photo, sectionId, rowId) {
        // Render two pictures per row
        if (!(rowId % 2)) {
            const nextPhotoIndex = parseInt(rowId);
            const nextPhoto = this.props.photos.length >= nextPhotoIndex + 1 ?
                this.props.photos[nextPhotoIndex + 1] : null;

            // Calc photos ratio, width, height
            const firstPhotoRatio = photo.height / photo.width;
            const secondPhotoRatio = nextPhoto.height / nextPhoto.width;

            // Calc new width for both pictures making nice grid layout
            // even pairs and odd pairs slightly different
            let firstPhotoNewWidth = Math.floor((rowId / 2) % 2) ?
                DimensionUtils.getWidthDimInPerc(45) : DimensionUtils.getWidthDimInPerc(55);
            let firstPhotoNewHeight = firstPhotoNewWidth * firstPhotoRatio;

            // Test if new height less then row height and adjust it
            const rowHeight = DimensionUtils.getHeightDimInPerc(18);
            if (firstPhotoNewHeight < rowHeight) {
                firstPhotoNewHeight = rowHeight;
            }

            if (nextPhoto) {
                var secondPhotoRatio = nextPhoto.height / nextPhoto.width;
                var secondPhotoNewWidth = Math.floor((rowId / 2) % 2) ?
                    DimensionUtils.getWidthDimInPerc(55) : DimensionUtils.getWidthDimInPerc(45);
                var secondPhotoNewHeight = secondPhotoNewWidth * secondPhotoRatio;

                if (secondPhotoNewHeight < rowHeight) {
                    secondPhotoNewHeight = rowHeight;
                }
            }

            return (
                <View style={styles.listRow}>
                    <TouchableOpacity
                        style={[styles.photoButton, {flex: firstPhotoNewWidth}]}
                        activeOpacity={0.4}
                        onPress={this._handlePhotoClick.bind(this, photo)}>

                        <Animatable.Image
                            style={[styles.photo,{ width: firstPhotoNewWidth, height: firstPhotoNewHeight}]}
                            source={{uri: photo.image_url}}
                            resizeMode={'cover'}
                            animation={'zoomIn'}
                            duration={200}>

                            <View style={styles.photoInfoContainer}>
                                <View>
                                    <Text style={[styles.text2per, styles.whiteText]}>
                                        {photo.name}</Text>
                                    <Text style={[styles.text2per, styles.whiteText]}>
                                        {photo.user ? photo.user.fullname : 'Uncknown'}</Text>
                                </View>
                            </View>
                        </Animatable.Image>
                    </TouchableOpacity>

                    <View style={styles.verticalSeparator}/>

                    {nextPhoto &&
                    <TouchableOpacity
                        style={[styles.photoButton, {flex: secondPhotoNewWidth}]}
                        activeOpacity={0.4}
                        onPress={this._handlePhotoClick.bind(this, nextPhoto)}>

                        <Animatable.Image
                            style={[styles.photo,{ width: secondPhotoNewWidth, height: secondPhotoNewHeight}]}
                            source={{uri: nextPhoto.image_url}}
                            animation={'zoomIn'}
                            duration={200}
                            resizeMode={'cover'}>

                            <View style={styles.photoInfoContainer}>
                                <View>
                                    <Text style={[styles.text2per, styles.whiteText]}>
                                        {nextPhoto.name}</Text>
                                    <Text style={[styles.text2per, styles.whiteText]}>
                                        {nextPhoto.user ? nextPhoto.user.fullname : 'Uncknown'}</Text>
                                </View>
                            </View>
                        </Animatable.Image>
                    </TouchableOpacity>}
                </View>
            );
        }

        return null;
    }

    renderFooter() {
        if (this.props.isPhotosPending) {
            return (
                <View style={styles.transactionsFooter}>
                    <ActivityIndicator
                        animating={true}
                        color={'#03A9F4'}
                        size="large"/>
                </View>
            );
        }

        return null;
    }

    renderSeparator(sectionID, rowID) {
        return (
            <View key={rowID}
                  style={styles.separator}/>
        );
    }

    componentWillReceiveProps(newProps) {
        //Get new photo array update state
        this.setState({
            dataSource: this.ds.cloneWithRows(newProps.photos)
        });
    }

    _handlePhotoClick(photo) {
        this.props.onPickUpPhoto(photo);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navBar: {
        flex: 10,
    },

    listContainer: {
        paddingTop: 1,
        flex: 90,
    },

    listRow: {
        flexDirection: 'row',
        height: DimensionUtils.getHeightDimInPerc(18),
    },

    photoButton: {
        height: DimensionUtils.getHeightDimInPerc(18),
    },

    photo: {
        height: DimensionUtils.getHeightDimInPerc(18),
    },

    verticalSeparator: {
        flex: 2,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
    },

    separator: {
        backgroundColor: '#FFF',
        height: 1,
    },

    photoInfoContainer: {
        justifyContent: 'flex-end',
        height: DimensionUtils.getHeightDimInPerc(18),
        padding: 5,
    },

    whiteText: {
        color: '#FFF',
    },

    text2per: {
        fontSize: DimensionUtils.getHeightDimInPerc(2),
    },

    transactionsFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
});
