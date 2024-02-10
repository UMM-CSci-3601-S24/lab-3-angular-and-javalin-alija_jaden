import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { TodoCardComponent } from './todo-card.component';

@Component({
    selector: 'app-todo-profile',
    templateUrl: './todo-profile.component.html',
    styleUrls: ['./todo-profile.component.scss'],
    standalone: true,
    imports: [NgIf, TodoCardComponent, MatCardModule]
})
export class TodoProfileComponent implements OnInit, OnDestroy {

  todo: Todo;
  error: { help: string, httpResponse: string, message: string }

  // This `Subject` will only ever emit one (empty) value when
  // `ngOnDestroy()` is called, i.e., when this component is
  // destroyed. That can be used to tell any subscriptions to
  // terminate, allowing the system to free up their resources
  // (like memory).
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService) {}

  ngOnInit(): void {
    // The `map`, `switchMap`, and `takeUntil` are all RXJS operators, and
    // The result from the map step is the `id` string for the requested
    // operator.
    // The map step takes the `ParamMap` from the `ActivatedRoute`, which
    // it into an Observable<Todo>, i.e., all the (zero or one) `Todo`s
    // each represents a step in the pipeline built using the RXJS `pipe`
    // is typically the URL in the browser bar.
    // `Todo`.
    // That ID string gets passed (by `pipe`) to `switchMap`, which transforms
    // that have that ID.
    // The `takeUntil` operator allows this pipeline to continue to emit values
    // down and clean up any associated resources (like memory).
    // until `this.ngUnsubscribe` emits a value, saying to shut the pipeline
    this.route.paramMap.pipe(
      // Map the paramMap into the id
      map((paramMap: ParamMap) => paramMap.get('id')),
      // Maps the `id` string into the Observable<Todo>,
      // which will emit zero or one values depending on whether there is a
      // `Todo` with that ID.
      switchMap((id: string) => this.todoService.getTodoById(id)),
      // Allow the pipeline to continue to emit values until `this.ngUnsubscribe`
      // returns a value, which only happens when this component is destroyed.
      // At that point we shut down the pipeline, allowed any
      // associated resources (like memory) are cleaned up.
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: todo => this.todo = todo,
      error: _err => {
        this.error = {
          help: 'There was a problem loading the todo – try again.',
          httpResponse: _err.message,
          message: _err.error?.title,
        };
      }
      /*
       * You can uncomment the line that starts with `complete` below to use that console message
       * as a way of verifying that this subscription is completing.
       * We removed it since we were not doing anything interesting on completion
       * and didn't want to clutter the console log
       */
      // complete: () => console.log('We got a new todo, and we are done!'),
    });
  }

  ngOnDestroy() {
    // When the component is destroyed, we'll emit an empty
    // value as a way of saying that any active subscriptions should
    // shut themselves down so the system can free up any associated
    // resources, like memory.
    this.ngUnsubscribe.next();
    // Calling `complete()` says that this `Subject` is done and will
    // never send any further values.
    this.ngUnsubscribe.complete();
  }
}
