import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { addTodos, deleteTodos, EditTodosTitle, loadTodos, patchTodos, setFilterByCompleated } from "../redux/todosReduser";
import './TodosPages.scss'

export const TodosPage = () => {
  const [titleTodo, setTitleTodo] = useState('');
  const [edit, setEdit] = useState(false);
  const [editForm, setEditForm] = useState('')
   
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos)

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch])

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTodos(titleTodo));
    setTitleTodo('');
  };

  const onFilteEvent = () => {
    dispatch(setFilterByCompleated(todos))
  }
  
  return (
    <div className="App">
      <div className="App__sidebar" >
        <h1>TodosPage</h1>
        <div>
          <form onSubmit={onSubmitForm}>
            <input 
              className="input is-primary App__input" 
              type="text" 
              placeholder="Set todo"
              value={edit ? '' : titleTodo} 
              onChange={e => setTitleTodo(e.target.value)}
            />
          </form>
          <button className="button App__button" onClick={() => dispatch(loadTodos())}>
            all todo
          </button>
          <button className="button App__button" onClick={() => onFilteEvent()} >
            done
          </button>
        </div>
        <div className="TodoList">

          <div className="TodoList__list-container">
            <ul className="TodoList__list">
              {todos.map(todo => (

                <li
                  className={classNames(
                    'TodoList__item',
                    { 'TodoList__item--unchecked': !todo.completed },
                    { 'TodoList__item--checked': todo.completed },
                  )}
                  key={todo.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(patchTodos(todo.id, todo.completed))}
                    />
                    {todo.completed ? (
                      <p><s>{todo.title}</s></p>
                    ) : (
                      <p>{todo.title}</p>
                    )}
                  </label>

                  
                  <div className="App__container__form">
                    <form 
                      className="App__form__edit"
                      onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(EditTodosTitle(todo.id, editForm));
                        setEdit(!edit);
                        setTitleTodo('');
                      }}>
                      {edit && todo.title === titleTodo && (
                        <>
                          <input 
                            className="input is-primary App__input" 
                            type="text" 
                            placeholder="Set todo"
                            value={editForm} 
                            onChange={e => setEditForm(e.target.value)}
                          />
                          <button 
                            className="button is-rounded"
                            type="submit"
                          >
                              save
                          </button>
                        </>
                      )}
                    </form>
                    {!edit && (
                      <button 
                        className="button is-rounded"
                        onClick={() => {
                          setEdit(!edit)
                          setEditForm(todo.title)
                          setTitleTodo(todo.title)
                        }}
                      >
                          Edit
                      </button>
                    )}

                    <button
                      className="delete is-large"
                      type="button"
                      onClick={() => {
                        dispatch(deleteTodos(todo.id))
                      }}
                    >
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
