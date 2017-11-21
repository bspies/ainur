import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroup} from 'reactstrap';
import TodoItem from '../TodoItem';
import './TodoList.css';

export default class TodoList extends Component {

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      done: PropTypes.bool
    })).isRequired
  }

  renderItems() {
    const {todos} = this.props;
    return todos.map(todo => {
      return (
        <TodoItem
          id={todo.id}
          key={`item_${todo.id}`}
          text={todo.text}
          done={todo.done}
        />
      );
    });
  }

  render() {
    return (
      <ListGroup>
        {this.renderItems()}
      </ListGroup>
    );
  }
}
