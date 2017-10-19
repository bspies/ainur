import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import find from 'lodash.find';
import last from 'lodash.last';
import remove from 'lodash.remove';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import './TodoApp.css';

/**
 * Generates the next id.
 */
function getNextId(todos) {
  return !todos || todos.length === 0 ? 0 : last(todos).id + 1;
}

/**
 * A To Do List application. User can 1) create new To Do items, 2) delete
 * them, and 3) mark (or unmark) them as being completed.
 */
export default class TodoApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  /**
   * Callback to add a To Do item.
   * @param {string} todo - The text of the To Do item
   */
  addTodo = (todo) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.concat({
        id: getNextId(todos),
        text: todo,
        done: false
      })
    });
  }

  /**
   * Callback to remove a To Do item.
   */
  removeTodo = (id) => {
    const newTodos = this.state.todos.concat();
    remove(newTodos, (val) => val.id === id);
    this.setState({
      todos: newTodos
    });
  }

  /*
   * Toggles the "done" state for a To Do item.
   */
  toggleDone = (id) => {
    const newTodos = this.state.todos.concat();
    const todoItem = find(newTodos, td => td.id === id);
    todoItem.done = !todoItem.done;
    this.setState({
      todos: newTodos
    });
  }

  render() {
    return (
      <Container className="appContainer">
        <Row>
          <Col>
          <h2>My To Do List</h2>
          <p>All the things I need to get done.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoHeader addTodo={this.addTodo}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoList todos={this.state.todos} removeItem={this.removeTodo} toggleDone={this.toggleDone}/>
          </Col>
        </Row>
      </Container>
    );
  }
}
