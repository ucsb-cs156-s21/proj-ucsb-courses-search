package com.ucsb.demonextjsspringtodoapp.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class TodoTests {
  @Test
  public void testTodo_notEqualNull() throws Exception {
    Todo todo = new Todo(1L, "todo 1", false, "123456");
    assertNotEquals(todo, null);
  }

  @Test
  public void testTodo_notEqualAnotherClass() throws Exception {
    Todo todo = new Todo(1L, "todo 1", false, "123456");
    assertNotEquals(todo, new Object());
  }

  @Test
  public void testTodo_equalsSelf() throws Exception {
    Todo todo = new Todo(1L, "todo 1", false, "123456");
    assertEquals(todo, todo);
  }

  @Test
  public void testTodo_toString() throws Exception {
    Todo todo = new Todo(1L, "todo 1", false, "123456");
    assertEquals(todo.toString(), "Todo[ id=1, value=todo 1, done=false, userId=123456 ]");
  }
}
