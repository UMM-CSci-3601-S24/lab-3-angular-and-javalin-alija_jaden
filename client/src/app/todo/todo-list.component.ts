import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo, TodoRole } from './todo';
import { TodoService } from './todo.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatNavList, MatListSubheaderCssMatStyler, MatListItem, MatListItemAvatar, MatListItemTitle, MatListItemLine } from '@angular/material/list';
import { TodoCardComponent } from './todo-card.component';

import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';

/**
 * A component that displays a list of todos, either as a grid
 * of cards or as a vertical list.
 *
 * The component supports local filtering by name and/or company,
 * and remote filtering (i.e., filtering by the server) by
 * role and/or age. These choices are fairly arbitrary here,
 * but in "real" projects you want to think about where it
 * makes the most sense to do the filtering.
 */
@Component({
    selector: 'app-todo-list-component',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    providers: [],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, FormsModule, MatHint, MatSelect, MatOption, MatRadioGroup, MatRadioButton, TodoCardComponent, MatNavList, MatListSubheaderCssMatStyler, MatListItem, RouterLink, MatListItemAvatar, MatListItemTitle, MatListItemLine, MatError]
})
export class TodoListComponent implements OnInit, OnDestroy {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public todoName: string;
  public todoAge: number;
  public todoRole: TodoRole;
  public todoCompany: string;
  public viewType: 'card' | 'list' = 'card';

  errMsg = '';
  private ngUnsubscribe = new Subject<void>();

  /**
   * This constructor injects both an instance of `TodoService`
   * and an instance of `MatSnackBar` into this component.
   *
   * @param todoService the `TodoService` used to get todos from the server
   * @param snackBar the `MatSnackBar` used to display feedback
   */
  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {
    // Nothing here – everything is in the injection parameters.
  }

  /**
   * Get the todos from the server, filtered by the role and age specified
   * in the GUI.
   */
  getTodosFromServer() {
    // A todo-list-component is paying attention to todoService.getTodos()
    // (which is an Observable<Todo[]>).
    // (For more on Observable, see: https://reactivex.io/documentation/observable.html)
    this.todoService.getTodos({
      // Filter the todos by the role and age specified in the GUI
      role: this.todoRole,
      age: this.todoAge
    }).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      // Next time we see a change in the Observable<Todo[]>,
      // refer to that Todo[] as returnedTodos here and do the steps in the {}
      next: (returnedTodos) => {
        // First, update the array of serverFilteredTodos to be the Todo[] in the observable
        this.serverFilteredTodos = returnedTodos;
        // Then update the filters for our client-side filtering as described in this method
        this.updateFilter();
      },
      // If we observe an error in that Observable, put that message in a snackbar so we can learn more
      error: (err) => {
        if (err.error instanceof ErrorEvent) {
          this.errMsg = `Problem in the client – Error: ${err.error.message}`;
        } else {
          this.errMsg = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`;
        }
      },
    })
  }

  /**
   * Called when the filtering information is changed in the GUI so we can
   * get an updated list of `filteredTodos`.
   */
  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { name: this.todoName, company: this.todoCompany }
    );
  }

  /**
   * Starts an asynchronous operation to update the todos list
   */
  ngOnInit(): void {
    this.getTodosFromServer();
  }

  /**
   * When this component is destroyed, we should unsubscribe to any
   * outstanding requests.
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
