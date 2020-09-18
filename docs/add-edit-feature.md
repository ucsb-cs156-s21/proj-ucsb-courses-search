# Adding Edit to Todos

We start with creating the issue on the GitHub and adding the card for it to the GitHub project board.

- Make sure to take ownership of the card/issue!

# The backend

## Scoping out the backend

In order to support editing a Todo in our application, we first need to make sure the backend can support it. In order to determine how our backend is currently working, let's examine the current `updateTodo` method on the [TodoController](../src/main/java/com/ucsb/demonextjsspringtodoapp/controllers/TodoController.java).

```java
// TodoController.java#updateTodo
1 @PostMapping(value = "/api/todos/{id}", produces = "application/json")
2 public ResponseEntity<String> updateTodo(@RequestHeader("Authorization") String authorization,
      @PathVariable("id") Long id) {
3   DecodedJWT jwt = JWT.decode(authorization.substring(7));
4   Optional<Todo> todo = todoRepository.findById(id);
5   if (!todo.isPresent() || !todo.get().getUserId().equals(jwt.getSubject())) {
6     return ResponseEntity.notFound().build();
7   }
8   todo.get().setDone(!todo.get().getDone());
9   todoRepository.save(todo.get());
10  return ResponseEntity.noContent().build();
11}
```

Let's break down this API endpoint line by line:

- (1): This endpoint is currently mapped to `POST` requests at the `/api/todos/{id}` endpoint, where `{id}` is the id of the Todo. It should also produce a body with the type of `application/json`.
- (2): This endpoint is being resolved the this method. It expects the header of the request to have an `Authorization` field, and for the url to contain the path variable `id`.
  - Note: the `Authorization` header takes the form of `Bearer thisismytoken`
- (3): We decode the token without the `Bearer ` prefix into a JSON Web Token (JWT, pronounced "jot").
- (4): We attempt to retrieve the Todo with the `id` value in the path variable.
  - Note that the the type of the left-hand side is `Optional<Todo>`; this means the Todo may or may not be null.
- (5-7): If the Todo is either null or the Todo is not owned by the user making the request, then we reject the request with a `404 NOT FOUND` error.
  - If you're curious how we assign ownership to each Todo, you can look at the `saveTodo` method; you'll notice the `userId` is set to the JWT's subject field.
- (8): Now assuming the Todo exists and it is owned by the user making the request, we update the `done` field of the Todo.
- (9): We save the updated Todo
- (10): We return a `204 NO CONTENT` response to indicate that the update was successful.

Now that we understand the endpoint we're working with, we can notice a few behaviors that we might want to change.

- It would be helpful if the endpoint instead took in a Todo and used that Todo to update the values in the database. Otherwise, we would need to write an update endpoint per field of the Todo.
- If we're accepting general updates to the Todo, we should return a copy of the saved Todo in the response.
- If we're accepting an entire Todo to _update_ the object located at the url endpoint, it should be a `PUT` request instead of a `POST` request.

Now that we understand what changes we want to make, we can-

## Update the tests

Wait, what?

Well, if we're following Test Driven Development (TDD), tests are indeed the first place we should start. Jumping into [`TodoControllerTests`](../src/test/java/com/ucsb/demonextjsspringtodoapp/controllers/TodoControllerTests.java), we notice that there are 4 tests with the prefix `testUpdateTodo_`. We're going to replace those tests with the following tests:

```java
// TodoControllerTests.java
  @Test
  public void testUpdateTodo_todoExists_updateValues() throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1", false, "123456");
    Todo savedTodo = new Todo(1L, "old todo 1", true, "123456");
    String body = objectMapper.writeValueAsString(inputTodo);

    when(mockTodoRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTodo));
    when(mockTodoRepository.save(inputTodo)).thenReturn(inputTodo);
    MvcResult response =
        mockMvc
            .perform(put("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
            .andExpect(status().isOk()).andReturn();

    verify(mockTodoRepository, times(1)).findById(inputTodo.getId());
    verify(mockTodoRepository, times(1)).save(inputTodo);

    String responseString = response.getResponse().getContentAsString();

    assertEquals(body, responseString);
  }

  @Test
  public void testUpdateTodo_todoNotFound() throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1", false, "123456");
    String body = objectMapper.writeValueAsString(inputTodo);

    when(mockTodoRepository.findById(1L)).thenReturn(Optional.empty());
    mockMvc.perform(put("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isNotFound()).andReturn();
    verify(mockTodoRepository, times(1)).findById(1L);
    verify(mockTodoRepository, times(0)).save(any(Todo.class));
  }

  @Test
  public void testUpdateTodo_todoAtPathNotOwned() throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1", false, "123456");
    Todo savedTodo = new Todo(2L, "new todo 1", false, "NOT YOURS");
    String body = objectMapper.writeValueAsString(inputTodo);
    when(mockTodoRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTodo));
    mockMvc.perform(put("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isNotFound()).andReturn();
    verify(mockTodoRepository, times(1)).findById(1L);
    verify(mockTodoRepository, times(0)).save(any(Todo.class));
  }

  @Test
  public void testUpdateTodo_todoAtPathOwned_butTryingToOverwriteAnotherTodo() throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1 trying to overwrite at id 1", false, "123456");
    Todo savedTodo = new Todo(2L, "new todo 1", false, "123456");
    String body = objectMapper.writeValueAsString(inputTodo);
    when(mockTodoRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTodo));
    mockMvc.perform(put("/api/todos/2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isBadRequest()).andReturn();
    verify(mockTodoRepository, times(1)).findById(2L);
    verify(mockTodoRepository, times(0)).save(any(Todo.class));
  }
```

While the names of the tests are somewhat self-explanatory, I'll explain their goals here:

- `testUpdateTodo_todoExists_updateValues`: This is a "happy path" test where we give a good request and expect a good response.
- `testUpdateTodo_todoNotFound`: This is the first error case, where we're making a request to update a Todo that doesn't exist. We expect a 404 response.
- `testUpdateTodo_todoAtPathNotOwned`: This is similar to the previous case, but this time the todo at the path is not owned by the user making the request. We still want to return a 404 response, as a user should not be aware of the existence of any Todo that isn't owned by them.
- `testUpdateTodo_todoAtPathOwned_butTryingToOverwriteAnotherTodo`: This is a more malicious error case, where the user owns the Todo at the path they're requesting (i.e. `/api/todos/2`) but the payload contains a Todo with an `id` that is not theirs. We would like for this to result in a `400 Bad Request` response.

All of these tests also handle the following:

- Changing the request type to `PUT`.
- Adding an entire Todo to the body of the request.

We'll now run the tests with `mvn test`, and scroll up to see that the 4 new tests are failing:

```
[ERROR] Failures:
[ERROR]   TodoControllerTests.testUpdateTodo_todoAtPathNotOwned:146 Status expected:<404> but was:<405>
[ERROR]   TodoControllerTests.testUpdateTodo_todoAtPathOwned_butTryingToOverwriteAnotherTodo:133 Status expected:<400> but was:<405>
[ERROR]   TodoControllerTests.testUpdateTodo_todoExists_updateValues:102 Status expected:<200> but was:<405>
[ERROR]   TodoControllerTests.testUpdateTodo_todoNotFound:120 Status expected:<404> but was:<405>
```

That's fine, even good; it means that our tests are detecting a difference between the current behavior of our endpoint and the new behavior described by these tests.

With that, it is finally time to start

## Updating the controller

The first thing we're going to do is make the endpoint map to incoming `PUT` requests by changing `@PostMapping` to `@PutMapping` as shown below:

```java
// TodoController.java#updateTodo
  // OLD
  @PostMapping(value = "/api/todos/{id}", produces = "application/json")
  // NEW
  @PutMapping(value = "/api/todos/{id}", produces = "application/json")
```

Also note that you'll need a new import at the top for the `PutMapping` annotation:

```java
import org.springframework.web.bind.annotation.PutMapping;
```

Running `mvn test` shows us that 2 of the 4 broken tests are now passing! The two that should be failing are shown below:

```
[ERROR] Failures:
[ERROR]   TodoControllerTests.testUpdateTodo_todoAtPathOwned_butTryingToOverwriteAnotherTodo:134 Status expected:<400> but was:<204>
[ERROR]   TodoControllerTests.testUpdateTodo_todoExists_updateValues:102 Status expected:<200> but was:<204>
```

Looking at the current behavior of `updateTodo`, it's clear that we still have behavior we need to update. The primary missing behavior is updating the entire Todo with the value of the incoming Todo.

We'll add this behavior with three changes:

- Update the method signature of `updateTodo` to accept the incoming Todo from the body of the request.
- Save the incoming Todo with the repository.
- Return the updated Todo in the body of the response. We'll also need to acknowledge that it _could_ throw a `JsonProcessingException`, but we'll set aside that error handling for another day.

The first change should look something like this:

```java
// TodoController.java#updateTodo
  // OLD
    public ResponseEntity<String> updateTodo(@RequestHeader("Authorization") String authorization,
      @PathVariable("id") Long id)
  // NEW
  public ResponseEntity<String> updateTodo(@RequestHeader("Authorization") String authorization,
      @PathVariable("id") Long id, @RequestBody @Valid Todo incomingTodo)
      throws JsonProcessingException
```

The second change should look something like this:

```java
// TodoController.java#updateTodo
  // OLD
  ...
  todo.get().setDone(!todo.get().getDone());
  todoRepository.save(todo);
  ...
  // NEW
  ...
  todoRepository.save(incomingTodo);
  ...
```

The third change should look something like this:

```java
// TodoController.java#updateTodo
  //OLD
  ...
  return ResponseEntity.noContent().build();
  // NEW
  String body = mapper.writeValueAsString(incomingTodo);
  return ResponseEntity.ok().body(body);
```

With those changes and a `mvn test`, we should be down to one failing test case:

```
[ERROR] Failures:
[ERROR]   TodoControllerTests.testUpdateTodo_todoAtPathOwned_butTryingToOverwriteAnotherTodo:133 Status expected:<400> but was:<200>
```

If you look closely at the code we have so far in `updateTodo`, you might notice why this test is failing. The problem is that we don't verify whether the Todo in the body actually shares the same `id` as the path of the url. We don't even check if the `userId` field of this Todo matches that of the user making the request!

In order to resolve this, we should add a pair of checks to verify that the `id` and `userId` of the `incomingTodo` matches that of the Todo in the body of the request. A possible solution is listed below:

- Note: if you're coming up with your own solution, don't forget to use `.equals` to compare things!

```java
// TodoController.java#updateTodo
  if (!todo.isPresent() || !todo.get().getUserId().equals(jwt.getSubject())) {
    return ResponseEntity.notFound().build();
  }
  // NEW CODE START
  if (!incomingTodo.getId().equals(id) || !incomingTodo.getUserId().equals(jwt.getSubject())) {
    return ResponseEntity.badRequest().build();
  }
  // NEW CODE END
  todoRepository.save(incomingTodo);
```

If we go ahead and run `mvn test`, we should see that all tests now pass. With that, we're all done-

## Check the coverage report

Oh, right. That thing.

You can get a coverage report by running `mvn test jacoco:report` and open it in your browser by running `open target/site/jacoco/index.html`. You should see something like this:

![Backend coverage report 1](./images/add-edit-feature-backend-coverage-1.png)

So it turns out we missed something. If we follow the missing coverage via `com.ucsb.demonextjsspringtodoapp.controllers > TodoController > updateTodo(String, Long, Todo)`, we'll be greeted by a coverage report of the `TodoController` file. If we hover over the yellow line in `updateTodo(String, Long, Todo)`, we should see the following:

![Missing coverage](./images/add-edit-feature-backend-coverage-missing-coverage.png)

It turns out that in our hurry to secure this endpoint against malicious requests, we forgot to add a test that fails when the `incomingTodo` has the correct `id` but incorrect `userId`.

Head back to the `TodoControllerTests.java` file and add a final test to cover the missing branch. An example test is shown below.

```java
  @Test
  public void testUpdateTodo_todoAtPathOwned_butTryingToInjectTodoForAnotherUser()
      throws Exception {
    Todo inputTodo = new Todo(1L, "new todo 1 trying to inject to user id 654321", false, "654321");
    Todo savedTodo = new Todo(2L, "new todo 1", false, "123456");
    String body = objectMapper.writeValueAsString(inputTodo);
    when(mockTodoRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTodo));
    mockMvc.perform(put("/api/todos/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
        .content(body)).andExpect(status().isBadRequest()).andReturn();
    verify(mockTodoRepository, times(1)).findById(1L);
    verify(mockTodoRepository, times(0)).save(any(Todo.class));
  }
```

Run `mvn test jacoco:report` to regenerate the coverage report and refresh the page (or open again with `open target/site/jacoco/index.html`) to see that the coverage report is now reporting 100% coverage.

And with that, we've finished updating the backend!

If you haven't already, commit your changes.

# The frontend

## Scoping out the frontend

So now that backend is updated, let's check in on the frontend. In order to do this, we're going to run `mvn spring-boot:run`, and then visit `localhost:8080` in our browser.
