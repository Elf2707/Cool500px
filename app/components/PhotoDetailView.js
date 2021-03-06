/**
 * Created by Elf on 08.07.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView, ActivityIndicator } from 'react-native';

import ApiConfig from './../config/ApiConfig';
import NavBar from './NavBar';

export default class PhotoView extends Component {
    static propTypes = {
        photo: React.PropTypes.object.isRequired,
        goBack: React.PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    style={styles.navBar}
                    title={'Photo Details'}
                    backBtnOn={true}
                    onBackBtnPress={this.props.goBack}
                    actionBtnOn={false}/>

                <View style={styles.webViewContainer}
                    animation={'fadeIn'}>
                    <WebView
                        style={styles.webView}
                        loadingProgressBar={styles.webViewSpinner}
                        source={{uri: `${ApiConfig.site500pxPrefixUrl}${this.props.photo.url}`}}
                        startInLoadingState={true}
                        renderLoading={this.renderSpinner.bind(this)}/>
                </View>
            </View>
        );
    }

    renderSpinner() {
        return (
            <View style={styles.spinnerContainer}>
                <ActivityIndicator
                    animating={true}
                    color={'#03A9F4'}
                    size="large"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navBar: {
        flex: 10,
    },

    webViewContainer: {
        flex: 90,
    },

    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});