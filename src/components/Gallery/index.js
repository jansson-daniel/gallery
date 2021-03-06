import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Video from './Video';
import Image from './Image';
import {
    loadImages,
    loadVideos,
    resetMedia,
    setStatus,
    activateLoader,
    setSearch,
} from '../../actions/gallery';

import styles from './styles.css';

export class Gallery extends Component {
    constructor (props) {
        super(props);

        this.state = {
            mediaType: 'image',
            image: 'active',
            placeHolder: 'Search for images or videos',
            video: '',
            isLoading: '',
            search: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setMediaType = this.setMediaType.bind(this);
    }

    componentDidMount () {
        const html = document.getElementsByTagName('html')[0];
        const starWrapper = html.querySelector('.star-wrapper');

        if (starWrapper) {
            html.querySelector('.star-wrapper').remove();
            html.style.overflow = 'auto';
        }

        if (this.props.imageIsActive) {
            this.setState({mediaType: 'image', image: 'active', video: '', search: this.props.search });
            if (this.props.images.length) {
                this.setState({ placeHolder: ''});
            }
            if (this.state.search.length) {
                this.setState({ placeHolder: ''});
                this.props.dispatch(loadImages(this.state.search));
            }
        } else {
            this.setState({mediaType: 'video', video: 'active', image: '', search: this.props.search });
            if (this.props.videos.length) {
                this.setState({ placeHolder: ''});
            }
            if (this.state.search.length) {
                this.setState({ placeHolder: ''});
                this.props.dispatch(loadVideos(this.state.search));
            }
        }
    }

    componentWillReceiveProps (nextProps) {
        nextProps.imageIsActive
            ? this.setState({ image: 'active', video: '' })
            : this.setState({ video: 'active', image: '' });

        this.setState({ isLoading: nextProps.isLoading });
    }

    setMediaType (event) {
        if (event.currentTarget.id === 'image-icon') {
            this.props.dispatch(setStatus('image'));
            if (!this.props.images.length && this.state.search.length) {
                this.props.dispatch(activateLoader());
                this.props.dispatch(loadImages(this.state.search));
            } else {
                this.setState({ placeHolder: 'Search for images or videos'});
            }
        } else {
            this.props.dispatch(setStatus('video'));
            if (!this.props.videos.length && this.state.search.length) {
                this.props.dispatch(activateLoader());
                this.props.dispatch(loadVideos(this.state.search));
            } else {
                this.setState({ placeHolder: 'Search for images or videos'});
            }
        }
    }

    handleClick () {
        if (this.state.search.length) {
            this.setState({ placeHolder: ''});
            this.props.dispatch(resetMedia());
            this.props.dispatch(activateLoader());
            this.state.image === 'active'
                ? this.props.dispatch(loadImages(this.state.search))
                : this.props.dispatch(loadVideos(this.state.search));
        }
    }

    handleChange (event) {
        this.setState({ search: event.target.value });
        this.props.dispatch(setSearch(event.target.value));

        if (event.target.value.length === 0) {
            this.props.dispatch(resetMedia());
            this.setState({ placeHolder: 'Search for images or videos'});
        }

        if (this.props.videos.length === 0 && this.props.images.length === 0) {
            this.setState({ placeHolder: 'Search for images or videos'});
        }
    }

    render () {
        const placeHolder = this.state.placeHolder.length ? 'place-holder': '';

        return (
            <div className="gallery">
                <div className="top-bar">
                    <a className="logo-link" href="/" alt="logo"><img className='logo' src="/images/logo.png" /></a>
                    <div className="search">
                        <span onClick={this.handleClick} className="icon"><i className="fa fa-search" /></span>
                        <input onChange={this.handleChange} type="text" id="search" placeholder="Search gallery" value={this.state.search} />
                    </div>
                </div>
                <div className="media">
                    <div className="media-type">
                        <span id="image-icon" className={this.state.image} onClick={this.setMediaType}>Images</span>
                        <span id="video-icon" className={this.state.video} onClick={this.setMediaType}>Videos</span>
                    </div>
                    <div className={this.state.isLoading} />
                    { this.state.image === 'active' ? (<Image images={this.props.images} />) : (<Video videos={this.props.videos} />) }
                </div>
                <p className={placeHolder}>{this.state.placeHolder}</p>
            </div>
        )
    }
}

Gallery.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    images: state.image.list,
    videos: state.video.list,
    videoIsActive: state.video.active,
    imageIsActive: state.image.active,
    isLoading: state.image.isLoading,
    search: state.image.search
});

export default connect(mapStateToProps)(Gallery)
