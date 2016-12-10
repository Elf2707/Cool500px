/**
 * Created by Elf on 08.07.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';

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
                        source={{uri: `${ApiConfig.site500pxPrefixUrl}${this.props.photo.url}`}}
                        startInLoadingState={true}/>
                </View>
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
    }
});