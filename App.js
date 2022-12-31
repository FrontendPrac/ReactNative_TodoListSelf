import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import styled from "@emotion/native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import React, { useState, useEffect } from "react";

import uuid from "react-native-uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  // 0. 테스트용 리스트
  const testList = ["실행컨텍스트 공부", "ES6 공부"];

  // 2. state 생성하기
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [editText, setEditText] = useState("");

  // 1. 데이터 설계하기
  const newTodos = {
    id: uuid.v4(),
    isDone: false,
    isEdit: false,
    text: text,
    category: category,
  };

  // 3. 함수 작성하기

  // 3-1. saveInput
  // input 값을 받아 text에 저장한다
  const saveInput = (enteredText) => {
    setText(enteredText);
  };
  // console.log("text: ", text);

  // 3-2. addTodo
  // text를 받아 만든 newTodo를 Todos에 추가한다
  const addTodo = () => {
    setTodos((prev) => [...todos, newTodos]);
    setText("");
  };
  // console.log("todos: ", todos);

  // 3-3. category의 토글링 기능을 적용한다 : 버튼 색깔, 화면 출력
  // console.log("todos.category: ", category);

  // 3-4. doneTodo
  // 체크 버튼을 누르면 isDone을 토글한다 : 취소선
  const doneTodo = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isDone = !newTodos[idx].isDone;
    // console.log("newTodos[idx].isDone: ", newTodos[idx].isDone);
    setTodos(newTodos);
  };

  // 3-5. deleteTodo
  // 휴지통 버튼을 누르면 해당 Todo를 삭제한다
  const deleteTodo = (id) => {
    Alert.alert("Todo 삭제", "정말로 삭제하시겠습니까?", [
      {
        text: "cancle",
        onPress: () => console.log("cancle"),
      },
      {
        text: "OK",
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
        },
      },
    ]);
  };

  // 3-6. changeEditInput
  // 편집 버튼을 누르면 isEdit을 토글링한다 : 해당 텍스트를 인풋으로 바꾼다
  const changeEditInput = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    // console.log("newTodos[idx].isEdit: ", newTodos[idx].isEdit);
    setTodos(newTodos);
  };

  // 3-7. saveEditInput
  // input 값을 받아 editText에 저장한다
  const saveEditInput = (enterdText) => {
    setEditText(enterdText);
  };
  // console.log("editText: ", editText);

  // 3-8. editTodo
  // editInput 값을 입력 받아 Todos를 수정한다
  const editTodo = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = editText;
    // console.log("newTodos[idx].text: ", newTodos[idx].text);
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  // 4. 데이터를 async-storage에 저장하고 불러온다
  // 4-1. saveTodos
  useEffect(() => {
    try {
      const saveTodos = async () => {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      };
      if (todos.length > 0) saveTodos();
    } catch {
      console.log("Error");
    }
  }, [todos]);

  // 4-2. saveCategory
  const saveCategory = async (cat) => {
    setCategory(cat);
    await AsyncStorage.setItem("category", cat);
  };

  // 4-3. getTodos
  useEffect(() => {
    try {
      const getTodos = async () => {
        const receive_todos = await AsyncStorage.getItem("todos");
        const receive_category = await AsyncStorage.getItem("category");
        setTodos(JSON.parse(receive_todos));
        setCategory(receive_category ?? "데이트");
      };
      getTodos();
    } catch {
      console.log("Error");
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StNav className="Nav">
          <StNavButton
            onPress={() => saveCategory("date")}
            style={{
              backgroundColor: category === "date" ? "#ffb3ff" : "#96e4eb",
            }}
          >
            <StNavText>데이트</StNavText>
          </StNavButton>
          <StNavButton
            onPress={() => saveCategory("minji")}
            style={{
              backgroundColor: category === "minji" ? "#ffb3ff" : "#96e4eb",
            }}
          >
            <StNavText>민짜이</StNavText>
          </StNavButton>
          <StNavButton
            onPress={() => saveCategory("kidongg")}
            style={{
              backgroundColor: category === "kidongg" ? "#ffb3ff" : "#96e4eb",
            }}
          >
            <StNavText>동동이</StNavText>
          </StNavButton>
        </StNav>

        <View className="Form">
          <StInputContainer>
            <StInput>
              <TextInput
                onChangeText={saveInput}
                onSubmitEditing={addTodo}
                value={text}
                placeholder="Enter your task"
                style={styles.input}
              />
            </StInput>
          </StInputContainer>
        </View>

        <View className="TodoList">
          {todos.map((todo) => {
            if (todo.category === category) {
              return (
                <StTodo key={todo.id}>
                  {todo.isEdit === true ? (
                    <TextInput
                      onSubmitEditing={() => editTodo(todo.id)}
                      onChangeText={saveEditInput}
                      value={editText}
                      style={{ backgroundColor: "white", flex: 1 }}
                    ></TextInput>
                  ) : (
                    <Text
                      style={{
                        textDecorationLine:
                          todo.isDone === true ? "line-through" : "none",
                      }}
                    >
                      {todo.text}
                    </Text>
                  )}
                  <StTodoButtons>
                    <StTodoButton onPress={() => doneTodo(todo.id)}>
                      <AntDesign name="checksquareo" size={24} color="black" />
                    </StTodoButton>
                    <StTodoButton onPress={() => changeEditInput(todo.id)}>
                      <Feather name="edit" size={24} color="black" />
                    </StTodoButton>
                    <StTodoButton onPress={() => deleteTodo(todo.id)}>
                      <AntDesign name="delete" size={24} color="black" />
                    </StTodoButton>
                  </StTodoButtons>
                </StTodo>
              );
            }
          })}
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    // flex: 1,
  },
  input: {
    height: 40,
  },
});

const StNav = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const StNavButton = styled.TouchableOpacity`
  flex-basis: 30%;
  height: 50px;
  border: 1px solid black;
  justify-content: center;
  /* background-color: #96e4eb; */
`;

const StNavText = styled.Text`
  text-align: center;
  font-weight: bold;
`;

const StInputContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin: 0 0 20px 0;
`;

const StInput = styled.View`
  border: 1px solid black;
  margin: 0 0 20px 0;
  padding-left: 10px;
`;

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
