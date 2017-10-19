import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroupItem} from 'reactstrap';
import './TodoItem.css';

const CHECK = '\u2713';
const CLOSE = '\u00D7';

/**
 * Component to display an individual To Do item.
 */
export default class TodoItem extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        done: PropTypes.bool,
        onClose: PropTypes.func,
        onSelect: PropTypes.func
    };

    static defaultProps = {
        done: false
    }

    /**
     * Event handler for clicking the close button.
     */
    closeHandler = (evt) => {
      evt.stopPropagation();
      const {onClose} = this.props;
      if (onClose) {
        onClose();
      }
    }

    /**
     * Event handler for selecting the To Do item.
     */
    clickHandler = (evt) => {
      const {onSelect} = this.props;
      if (onSelect) {
        onSelect();
      }
    }

    /**
     * Renders the check mark if the item has
     * been marked as "done".
     * @returns {ReactElement} - The rendered check mark
     */
    renderCheckMark() {
        const {done} = this.props;
        return (
            <span className="check">{done ? CHECK : ''}</span>
        );
    }

    /**
     * Renders the close button on the To Do item.
     * @returns {ReactElement} - The rendered close button
     */
    renderCloseButton() {
        return (
            <span className="close" onClick={this.closeHandler}>{CLOSE}</span>
        )
    }

    render() {
        const {done, text} = this.props;
        const classes = done ? 'done' : undefined;
        return (
            <ListGroupItem className={classes} onClick={this.clickHandler}>
                {this.renderCheckMark()}
                {text}
                {this.renderCloseButton()}
            </ListGroupItem>
        );
    }
}
