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
    })).isRequired,
    removeItem: PropTypes.func,
    toggleDone: PropTypes.func
  }

  renderItems() {
    const {removeItem, toggleDone, todos} = this.props;
    return todos.map(todo => {
      const closeItem = () => removeItem(todo.id);
      const selectItem = () => toggleDone(todo.id);
      return (
        <TodoItem
          key={`item_${todo.id}`}
          text={todo.text}
          done={todo.done}
          onClose={closeItem}
          onSelect={selectItem}
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
