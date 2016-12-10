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
                onPickUpPhoto={this._handlePickUpPhoto.bind(this)}
                refresh={this._handleRefresh.bind(this)}
                onEndPhotosReached={this._handleOnPhotosEndReached.bind(this)}/>
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

    _handleOnPhotosEndReached() {
        //this.props.fetchPhotos(this.props.lastFetchedPhoto);
    }

    _handleRefresh() {
        this.props.clearPhotos();
        this.props.fetchPhotos(1);
    }
}

const mapStateToProps = (state) => {
    return ({
        photos: state.photosList.photos,
        current_page: state.photosList.current_page,
        total_pages: state.photosList.total_pages,
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