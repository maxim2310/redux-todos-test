
export const getTodos = (): Promise<Todo[]> => {
  return fetch(`https://mate.academy/students-api/todos?userId=2450`)
    .then(response => {
      if (!response.ok) {
        return new Error(`ERROR 404`);
      }

      return response.json();
    })
};

export const addTodosToApi = (comment: string) => {
  return fetch(`https://mate.academy/students-api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      "title": comment,
      "userId": 2450,
      "completed": false
    }),
  })
}

export const addTodosDelete = (idTodos: number) => {
  return fetch(`https://mate.academy/students-api/todos/${idTodos}`, {
    method: 'DELETE',
  })
}

export const patchTodosFetch = (idTodos: number, comleted: boolean) => {
  return fetch(`https://mate.academy/students-api/todos/${idTodos}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      "completed": !comleted
    }),
  })
}

export const patchTodosTitle = (idTodos: number, title: string) => {
  return fetch(`https://mate.academy/students-api/todos/${idTodos}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      "title": title
    }),
  })
}