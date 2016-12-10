/**
 * Created by Elf on 12.06.2016.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PhotoDetailView from './../components/PhotoDetailView'

class PhotoDetail extends Component {
    render() {
        return (
            <PhotoDetailView
                photo={this.props.photo}
                goBack={this.props.goBack}/>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        photo: state.photosList.selectedPhoto,
    });
};

export default connect(mapStateToProps, null)(PhotoDetail);