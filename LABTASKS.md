# Lab Tasks <!-- omit in toc -->

- [Notations](#notations)
- [Exploring the client](#exploring-the-client)
- [Todo API: Redux](#todo-api-redux)
- [Writing (and testing) a beautiful client side application](#writing-and-testing-a-beautiful-client-side-application)
- [Remember to test](#remember-to-test)
- [Questions](#questions)

## Notations

- Questions that you need to answer (as a team!) are indicated with question
  mark symbols (:question:)
- Tasks that specify work to do without a written response will be bulleted
- Remember to set up GitHub Projects with your stories and estimates

Write up your answers to these questions in a Google Doc and turn that in via
Canvas on the assignment for this lab.

- **Make sure that everyone in your group has edit privileges on the document.**
- **Make sure that the link you turn in gives the TA(s) and professor(s) at least comment privileges.**
- **Include the URL of the GitHub repository for your group at the top of the GDoc. This will make it easier for us to figure out which team is "Snoozing Llamas".**

Definitely ask if you're ever confused about what you need to do for a given task, or
what the answer to a question is, etc.

## Exploring the client

The client side of our project has changed since lab #2. The directory structure is
mostly the same, but the client-side interface uses Angular to handle most of the creation
of the elements of the user interface. Angular's template syntax extends HTML and JavaScript.
The testing is handled in two new places:

- Angular spec files (e.g., `user-list.component.spec.ts`) for unit
  testing in Angular. These use Jasmine and Karma.
- E2E (end-to-end) tests in `client/e2e`. These use Cypress. (Note: the picture shows the Cypress spec files in a folder called "integration", but the default and what we will use is now "e2e".)

![Location of testing code](https://user-images.githubusercontent.com/302297/108024936-25605500-6feb-11eb-87e5-829d4e9de44a.png)

The starting code includes several
ways of using Angular components to display user data.
It includes two ways of organizing the `user-list` information:
a grid-like arrangement of cards and a list.
The grid approach to organizing the `user-list` information
leverages a `user-card` component.
The `user-card` component is also used (in a slightly different way) in the `user-profile` component.
Karma tests for each component are named
almost the same as the component but include `.spec` before the `.ts`,
and Cypress E2E tests for user-list
are located in `client/cypress/e2e`. There are supporting files for the E2E tests (called 
page objects) in `client/cypress/support`. The page objects are named similarly to the Cypress E2E tests, but also have `.po` before the `.ts`. The purpose of the page objects files is to help separate aspects of accessing elements on a page (like exactly what kind of component you are using) separate from the tests. That way, when you decide to use a simple button with a custom button (for example), your test will still just find the button. Specific information goes in the page object.

:question: Answer questions 1 through 4 in [QUESTIONS](#questions) below.

## Todo API: Redux

In Lab 2, you worked with your partner to implement an API for requesting
'to-dos' from a server. In this lab, you'll be using a to-do API that we provide
for you with the lab. The API meets the specifications of lab 2 and
can be found at `localhost:4567/api/todos` when you are running your server
(go into the server directory of your project in a terminal window and execute `./gradlew run`).

## Writing (and testing) a beautiful client side application

Now that we have a reliable way to request todo data from our server,
we should write a nice client-side application to help us request and view
this data.

- Use Angular to build a nice client-side interface which allows the user to:
  - filter search results by status, owner,
    body text, and category
  - see returned todo items in a useful, meaningful way including:
    - choosing to limit the number of todos displayed
    - sorting the todos by various fields
    - combinations of sorting, filtering, and limiting
- Your new functionality should be contained in a 'todos' view,
  with a 'todo-list' component and probably a service.
  > Note: You do NOT need to have multiple views of your todos like we provided you for users, and you should feel free to try out a different kind of component that you think would work well to display todos. Think about what information you would want to actually _see_ about the todo to help you manage your tasks.
- You should make some decisions about when to request data from the API,
  and when to simply use Angular's filtering tools to change how
  the data is displayed.
  - You have to use Angular's filtering at least once
  - You have to use the server's filtering at least once
  - You have to be able to use combinations of filters (implement and test this)
  - :question: Make note of why you choose to do each of those two things the way you did

:question: Answer Question 5 about your filtering in [QUESTIONS](#questions)

## Remember to test

Your project should have tests
that help you meaningfully practice using continuous integration. You should expand on these tests as
appropriate so that your GitHub Actions checks are telling you valuable things
about the health of your project.

- As you work, create a branch for a new feature,
  move the story from the `icebox` (or `backlog` or `new`) to `in-progress` in GitHub Projects, write unit tests (Karma) for the new Angular components and services you are adding and using,
  write new end-to-end tests (Cypress) for the new views,
  and address failing tests.
- Use pull requests to review code and
  merge things into `main` when a feature is working
  and is tested (with passing tests and decent coverage). Move your story to `done`.

In general you'll want to write unit tests (using Karma) for small, focused
bits of logic, often in an Angular service, but sometimes in a component.

E2E tests, on the other hand, are typically used to capture the desired
_functional_ behavior of specific features or stories.

:question: Answer Questions 6 and 7 about your Karma and E2E tests in [QUESTIONS](#questions)

## Questions

1. :question: How does the navigation menu (with Home and Users) work in this project? Compare `server/src/main/java/umm3601/Server.java`
   and `client/src/app/app-routing.module.ts`. Both do a kind of routing that maps
   a "path" to something that "handles" that path.
   - What are the "paths" in each case? (Be specific.)
   - Trace through an example of a path being handled by both Angular and Javalin.
     - Where does the "path" come from? As a user, how might I enter or trigger a particular path?
     - What kinds of things do Angular and Javalin map their paths _to_? (Be specific.)
     - What do those targets "do" with that path?
2. :question: What does the `user.service.ts` do? Why is it not just done in
   the `user-list.component.ts`?
3. Look over the the test for calling `getUsers()` with an `age` parameters in `client/src/app/users/user.service.spec.ts`.
   1. :question: Where do we tell the service that we want only users with age 25?
   1. :question: Where do we tell the mock HTTP system how many requests to expect and what
     parameters those requests should have?
   1. :question: Where do we specify the expected HTTP request type (PUT or GET or DELETE or whatever)?
   1. :question: Where do we specify what value the mock HTTP system should return in response
     to the expected request.
4. Look over the E2E test for testing the age filtering in `client/cypress/e2e/user-list.spec.ts`.
   1. :question: What is the `page` object? Where is that defined?
   1. :question: Where do we enter the value 27 in the age field?
      1. :question: How does Cypress find the age field?
      1. :question: How does Cypress update the value in the age field?
   1. :question: How does Cypress get all the cards on this page? (Hint: Look at the definition of `getUserCards()` in `client/cypress/support/user-list.po.ts`.)
   1. How does Cypress extract the user's names from the cards?
5. You need to use filtering in Angular and filtering on the server each at least one time. Our example filters users by _company_ on the client side in Angular and filters users by _role_ on the server side in Java. There is not just one right answer here, so think about the _why_.
   1. :question: What is one thing you filtered in Angular and why did that approach make sense for that filter?
   2. :question: What is one thing you filtered using the server and why did that approach make sense for that filter?
6. :question: What's _one_ piece of "internal" functionality that you chose to
   write a unit test (with Karma) for?
   1. :question: Why did you choose to test that piece of functionality?
   2. :question: What is the "it" for that test, i.e., what Angular tool/method are you testing?
7. :question: List the behaviors you tested via your E2E tests. For each behavior:
   1. :question: Why did you test that particular behavior?
   2. :question: What is the "it" for that test, i.e., what part of the web app are you
      testing? (You don't need to tell us how the test _works_ since your code will do that.)
