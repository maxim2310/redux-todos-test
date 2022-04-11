import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTodosDelete, addTodosToApi, getTodos, patchTodosFetch, patchTodosTitle } from "../Api/todos";
import { AppDispatch } from "../store";

type TodosState = {
  todos: Todo[]
  status: 'Loading' | 'Done' | 'ERROR'
}


const initialState: TodosState = {
  todos: [],
  status: 'Loading'
}

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload
    },
    setFilterByCompleated(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload.filter(todo => todo.completed === true)
    },
    startLoading(state) {
      state.status = 'Loading'
    },
    finishLoading(state) {
      state.status = 'Done'
    },
    failLoading(state) {
      state.status = 'ERROR'
    },
  }
});

export const {setTodos, startLoading, finishLoading, failLoading, setFilterByCompleated} = slice.actions;
export default slice.reducer;

export const loadTodos = () => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());

    getTodos()
      .then(response => {
        dispatch(setTodos(response.sort((a, b) => a.completed.toString().localeCompare(b.completed.toString()))));
        dispatch(finishLoading());
      })
      .catch(() => dispatch(failLoading()));
  }
}

export const addTodos = (title: string) => {
  return (dispatch: AppDispatch) => {
    addTodosToApi(title).then(() => dispatch(loadTodos()))
  }
}

export const deleteTodos = (idTodos: number) => {
  return (dispatch: AppDispatch) => {
    addTodosDelete(idTodos).then(() => dispatch(loadTodos()))
  }
}

export const patchTodos = (idTodos: number, comleted: boolean) => {
  return (dispatch: AppDispatch) => {
    patchTodosFetch(idTodos, comleted).then(() => dispatch(loadTodos()))
  }
}

export const EditTodosTitle = (idTodos: number, title: string) => {
  return (dispatch: AppDispatch) => {
    patchTodosTitle(idTodos, title).then(() => dispatch(loadTodos()))
  }
}