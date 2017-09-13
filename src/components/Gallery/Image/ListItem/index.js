import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import styles from './styles.css';

export class ListItem extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    componentDidMount () {
        setTimeout(() => {
            this.listItem.classList.add('slide');
        }, 1000 * this.props.index);
    }

    render () {
        return (
            <li ref={(listItem) => { this.listItem = listItem; }} className="list-item">
                <img src={this.props.item.links[0].href} />
            </li>
        )
    }
}

ListItem.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(ListItem)
