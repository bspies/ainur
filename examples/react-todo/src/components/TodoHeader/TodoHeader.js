import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupButton } from 'reactstrap';
import './TodoHeader.css';

export default class TodoHeader extends Component {
    /**
     * @type {Object}
     * @property {function(todo:string)} addTodo - The callback function
     */
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }

    constructor(props) {
      super(props);
      this.state = {
        inputValue: ''
      }
    }

    updateInputValue = (evt) => {
      this.setState({
        inputValue: evt.target.value
      });
    }

    handleKey = (evt) => {
      if (evt.keyCode === 13) {
        this.handleEntry();
      }
    }

    handleEntry = () => {
        const {addTodo} = this.props;
        const {inputValue} = this.state;
        if (inputValue.length > 0) {
          addTodo(inputValue);
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
