/**
 * Created by Elf on 25.08.2016.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BackAndroid, NavigationExperimental } from 'react-native';

import * as NavActions from './../actions/navActions';
import PhotosList from './PhotosList';
import PhotoDetail from './PhotoDetail';

const {
    CardStack: NavigationCardStack
    } = NavigationExperimental;

class NavRoot extends Component {
    constructor(props) {
        super(props)
        this._renderScene = this._renderScene.bind(this)
        this._handleBackAction = this._handleBackAction.bind(this)
    }

    render() {
        return (
            <NavigationCardStack
                navigationState={this.props.navigation}
                renderScene={this._renderScene}/>
        )
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
    }

    _renderScene(props) {
        const { route } = props.scene;

        if (route.key === 'photosList') {
            return <PhotosList />
        }
        if (route.key === 'photoDetailView') {
            return <PhotoDetail goBack={this._handleBackAction.bind(this)}/>
        }
    }

    _handleBackAction() {
        if (this.props.navigation.index === 0) {
            return false
        }
        this.props.pop();
        return true
    }
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(NavActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavRoot);
