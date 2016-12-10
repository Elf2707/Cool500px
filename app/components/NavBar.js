/**
 * Created by Elf on 15.10.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, Platform } from 'react-native';

import DimensionUtils from './../utils/dimensionUtils';

const androidBackIcon = require('Cool500px/app/assets/icons/ic_arrow_back.png');
const iosBackIcon = require('Cool500px/app/assets/icons/ic_chevron_left.png');

export default class NavBar extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        backBtnOn: React.PropTypes.bool.isRequired,
        actionBtnOn: React.PropTypes.bool.isRequired,
        onBackBtnPress: React.PropTypes.func,
        onActionBtnPress: React.PropTypes.func,
    };

    render() {
        return (
            <View style={[styles.container, this.props.style]}>

                <View style={styles.buttonContainer}>
                    {this.renderBackButton()}
                </View>

                <View style={styles.titleCont}>
                    <Text style={[styles.text3d5per, styles.lightBlueText, styles.ballparkFont]}>
                        {this.props.title}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    {this.renderActionButton()}
                </View>
            </View>
        );
    }

    renderBackButton() {
        if (this.props.backBtnOn) {
            return (
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.props.onBackBtnPress}
                    activeOpacity={0.5}>

                    <Image
                        style={styles.btnIcon}
                        source={Platform.OS === 'android' ? androidBackIcon: iosBackIcon}
                        resizeMode={'contain'}/>
                </TouchableHighlight>
            );
        }

        return null;
    }

    renderActionButton() {
        if (this.props.actionBtnOn) {
            return (
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.props.onActionBtnPress}
                    activeOpacity={0.5}>

                    <Image
                        style={styles.btnIcon}
                        source={require('Cool500px/app/assets/icons/ic_refresh.png')}
                        resizeMode={'contain'}/>
                </TouchableHighlight>
            );
        }

        return null;
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

    buttonContainer: {
        flex: 15,
    },

    button: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: DimensionUtils.getHeightDimInPerc(5),
        width: DimensionUtils.getHeightDimInPerc(5),
    },

    titleCont: {
        flex: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
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
                fontFamily: 'Ballpark',
            },

            android: {
                fontFamily: 'ballpark_weiner',
            }
        }),
    }
});
