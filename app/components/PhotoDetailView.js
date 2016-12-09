/**
 * Created by Elf on 08.07.2016.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NavBar from './NavBar';

export default class PhotoView extends Component {
    static propTypes = {
        photo: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    style={styles.navBar}
                    title={'Photo Detail'}
                    backBtnOn={true}/>
                
                <View>
                    {this.props.photo &&
                        <Text>{this.props.photo.url}</Text>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});