import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import List from './List';
import styles from './styles.css';

export class Image extends Component {
    constructor (props) {
        super(props);

        this.state = {
            images: {}
        };
    }

    componentWillReceiveProps (nextProps) {
        this.setState({ images: nextProps.images })
    }

    render () {
        return (
            <div>
                <List images={this.state.images} />
            </div>
        )
    }
}

Image.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    images: state.image.list
});

export default connect(mapStateToProps)(Image)