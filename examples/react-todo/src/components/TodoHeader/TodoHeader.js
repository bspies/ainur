import React, { Component } from 'react';
import { Input, InputGroup, InputGroupButton } from 'reactstrap';
import EventBus from 'eventbusjs';
import events from '../../events';
import './TodoHeader.css';

/**
 * The To Do application header with input to create new
 * items.
 */
export default class TodoHeader extends Component {

    constructor(props) {
      super(props);
      this.state = {
        inputValue: ''
      }
    }

    /**
     * Callback to handle input change.
     */
    updateInputValue = (evt) => {
      this.setState({
        inputValue: evt.target.value
      });
    }

    /**
     * Handler to enter input on "Enter" key.
     */
    handleKey = (evt) => {
      if (evt.keyCode === 13) {
        this.handleEntry();
      }
    }

    /**
     * Handles input entry.
     */
    handleEntry = () => {
        const {inputValue} = this.state;
        if (inputValue.length > 0) {
          EventBus.dispatch(events.todoAdded, this, inputValue);
          // clear value
          this.setState({
            inputValue: ''
          });
        }
    }

    render() {
        return (
            <div className="header">
                <InputGroup>
                    <Input
                      placeholder="Add item..."
                      value={this.state.inputValue}
                      onChange={this.updateInputValue}
                      onKeyDown={this.handleKey}
                    />
                    <InputGroupButton color="primary" onClick={this.handleEntry}>Add</InputGroupButton>
                </InputGroup>
            </div>
        );
    }
}
