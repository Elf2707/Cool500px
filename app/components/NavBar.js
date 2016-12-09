/**
 * Created by Elf on 15.10.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, Platform } from 'react-native';

import DimensionUtils from './../utils/dimensionUtils';

export default class NavBar extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        backBtnOn: React.PropTypes.bool.isRequired,
    };

    render() {
        return (
            <View style={[styles.container, this.props.style, this.props.backBtnOn ?
                    null : {justifyContent: 'center'}]}>
                {this.props.backBtnOn &&
                <TouchableHighlight
                    style={styles.backBtn}
                    onPress={() => {}}
                    underlayColor={'rgba(0, 0, 0, 0.2)'}>

                    <Image
                        style={styles.backBtnIcon}
                        source={require('Cool500px/app/assets/icons/ic_chevron_left.png')}
                        resizeMode={'contain'}/>
                </TouchableHighlight>}

                <View style={styles.titleCont}>
                    <Text style={[styles.text3d5per, styles.lightBlueText, styles.ballparkFont]}>
                        {this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#000',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                paddingTop: DimensionUtils.getHeightDimInPerc(3),
            },
        }),
    },

    backBtn: {
        padding: DimensionUtils.getWidthDimInPerc(1.5),
        paddingLeft: DimensionUtils.getWidthDimInPerc(0.5),
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },

    backBtnIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: DimensionUtils.getHeightDimInPerc(7),
        width: DimensionUtils.getWidthDimInPerc(10),
    },

    titleCont: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    text3d5per: {
        fontSize: DimensionUtils.getHeightDimInPerc(3.5),
    },

    lightBlueText: {
        color: '#03A9F4',
    },

    ballparkFont: {
        ...Platform.select({
            ios: {
                fontFamily: 'ballpark_weiner',
            },

            android: {
                fontFamily: 'ballpark_weiner',
            }
        }),
    }
});
