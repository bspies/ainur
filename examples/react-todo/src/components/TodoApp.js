import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import EventBus from 'eventbusjs';
import find from 'lodash.find';
import last from 'lodash.last';
import remove from 'lodash.remove';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import events from '../events';
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
    this.listenEvents();
  }

  /**
   * Callback to add a To Do item.
   * @param {Object} evt - The event object
   * @param {string} todo - The text of the To Do item
   */
  addTodo = (evt, todo) => {
    console.log('add todo: ', evt, 'text', todo);
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
   * @param {Object} evt - The event object
   * @param {number} id - The To Do id
   */
  removeTodo = (evt, id) => {
    const newTodos = this.state.todos.concat();
    remove(newTodos, (val) => val.id === id);
    this.setState({
      todos: newTodos
    });
  }

  /*
   * Callback to toggle the "done" state for a To Do item.
   * @param {Object} evt - The event object
   * @param {number} id - The To Do id
   */
  toggleDone = (evt, id) => {
    const newTodos = this.state.todos.concat();
    const todoItem = find(newTodos, td => td.id === id);
    todoItem.done = !todoItem.done;
    this.setState({
      todos: newTodos
    });
  }

  /**
   * Register listener for child events.
   */
  listenEvents() {
    EventBus.addEventListener(events.todoAdded, this.addTodo);
    EventBus.addEventListener(events.todoRemoved, this.removeTodo);
    EventBus.addEventListener(events.todoToggleDone, this.toggleDone);
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
            <TodoList todos={this.state.todos}/>
          </Col>
        </Row>
      </Container>
    );
  }
}
