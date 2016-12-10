/**
 * Created by Elf on 12.06.2016.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PhotosListView from './../components/PhotosListView'
import * as PhotosListActions from './../actions/photosListActions';
import { push } from './../actions/navActions';

class PhotosList extends Component {
    render() {
        return (
            <PhotosListView
                photos={this.props.photos}
                isPhotosPending={this.props.isPhotosPending}
                isError={this.props.isError}
                onPickUpPhoto={this._handlePickUpPhoto.bind(this)}
                refresh={this._handleRefresh.bind(this)}
                onEndPhotosReached={this._handleOnEndPhotosReached.bind(this)}/>
        )
    }

    componentWillMount() {
        this.props.fetchPhotos(1);
    }

    _handlePickUpPhoto(photo) {
        this.props.setSelectedPhoto(photo);

        this.props.push({
            key: 'photoDetailView',
            title: 'Photo Detail',
        })
    }

    _handleOnEndPhotosReached() {
        // Test if no all photos fetched and fetch another page
        if (this.props.currentPage < this.props.totalPages) {
            this.props.fetchPhotos(this.props.currentPage + 1);
        }
    }

    _handleRefresh() {
        this.props.clearPhotos();
        this.props.fetchPhotos(1);
    }
}

const mapStateToProps = (state) => {
    return ({
        photos: state.photosList.photos,
        currentPage: state.photosList.currentPage,
        totalPages: state.photosList.totalPages,
        isPhotosPending: state.photosList.isPhotosPending,
        isError: state.photosList.isError,
    });
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...PhotosListActions,
        push,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);