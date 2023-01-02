import React from "react";
import { TextInput, Text } from "react-native";
import styled from "@emotion/native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Todo = ({
  todo,
  editTodo,
  saveEditInput,
  editText,
  doneTodo,
  deleteTodo,
  openEditInput,
}) => {
  return (
    <StTodo key={todo.id}>
      {todo.isEdit === true ? (
        <TextInput
          onSubmitEditing={() => editTodo(todo.id)}
          onChangeText={saveEditInput}
          defaultValue={todo.text}
          style={{ backgroundColor: "white", flex: 1 }}
        ></TextInput>
      ) : (
        <Text
          style={{
            textDecorationLine: todo.isDone === true ? "line-through" : "none",
          }}
        >
          {todo.text}
        </Text>
      )}
      <StTodoButtons>
        <StTodoButton onPress={() => doneTodo(todo.id)}>
          <AntDesign name="checksquareo" size={24} color="black" />
        </StTodoButton>
        <StTodoButton onPress={() => openEditInput(todo.id)}>
          <Feather name="edit" size={24} color="black" />
        </StTodoButton>
        <StTodoButton onPress={() => deleteTodo(todo.id)}>
          <AntDesign name="delete" size={24} color="black" />
        </StTodoButton>
      </StTodoButtons>
    </StTodo>
  );
};

export default Todo;

const StTodo = styled.View`
  background-color: #b8b7c9;
  margin-bottom: 10px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const StTodoButtons = styled.View`
  flex-direction: row;
`;

const StTodoButton = styled.TouchableOpacity`
  margin-left: 10px;
`;
