import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo, TodoCategory } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';

/**
 * A "mock" version of the `TodoService` that can be used to test components
 * without having to create an actual service. It needs to be `Injectable` since
 * that's how services are typically provided to components.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      "_id": "chris_id",
      "owner": "Chris",
      "status": true,
      "body": "The description of Chris",
      "category": "groceries"
    },
    {
      "_id": "kyle_id",
      "owner": "Kyle",
      "status": true,
      "body": "The description of Kyle",
      "category": "homework"
    },
    {
      "_id": "bob_id",
      "owner": "Bob",
      "status": true,
      "body": "The description of Bob",
      "category": "software design"
    },
    {
      "_id": "steve_id",
      "owner": "Steve",
      "status": true,
      "body": "The description of Bob",
      "category": "video games"
    }

  ];

  constructor() {
    super(null);
  }

  // It's OK that the `_filters` argument isn't used here, so we'll disable
  // this warning for just his function.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTodos(_filters: { category?: TodoCategory; status?: boolean; owner?: string }): Observable<Todo[]> {
    // Our goal here isn't to test (and thus rewrite) the service, so we'll
    // keep it simple and just return the test todos regardless of what
    // filters are passed in.
    //
    // The `of()` function converts a regular object or value into an
    // `Observable` of that object or value.
    return of(MockTodoService.testTodos);
  }

  getTodoById(id: string): Observable<Todo> {
    // If the specified ID is for one of the test todos,
    // return that todo, otherwise return `null` so
    // we can test illegal todo requests.
    if (id === MockTodoService.testTodos[0]._id) {
      return of(MockTodoService.testTodos[0]);
    } else if (id === MockTodoService.testTodos[1]._id) {
      return of(MockTodoService.testTodos[1]);
    } else if (id === MockTodoService.testTodos[2]._id) {
      return of(MockTodoService.testTodos[2]);
    } else {
      return of(null);
    }
  }

}
