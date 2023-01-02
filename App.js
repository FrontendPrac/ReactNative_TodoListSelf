import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from "react-native";

import React, { useState, useEffect } from "react";

import uuid from "react-native-uuid";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Nav from "./components/Nav";
import Form from "./components/Form";
import Todo from "./components/Todo";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "./firebase";

const App = () => {
  // 2. state 생성하기
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [editText, setEditText] = useState("");

  // 1. 데이터 설계하기
  const newTodos = {
    // id: uuid.v4(),
    isDone: false,
    isEdit: false,
    text: text,
    category: category,
    createdAt: Date.now(),
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
  // const addTodo = () => {
  //   setTodos((prev) => [...todos, newTodos]);
  //   setText("");
  // };
  // console.log("todos: ", todos);

  // 3-3. category의 토글링 기능을 적용한다 : 버튼 색깔, 화면 출력
  // console.log("todos.category: ", category);

  // 3-4. doneTodo
  // 체크 버튼을 누르면 isDone을 토글한다 : 취소선
  // const doneTodo = (id) => {
  //   const newTodos = [...todos];
  //   const idx = newTodos.findIndex((todo) => todo.id === id);
  //   newTodos[idx].isDone = !newTodos[idx].isDone;
  //   // console.log("newTodos[idx].isDone: ", newTodos[idx].isDone);
  //   setTodos(newTodos);
  // };

  // 3-5. deleteTodo
  // 휴지통 버튼을 누르면 해당 Todo를 삭제한다
  // const deleteTodo = (id) => {
  //   Alert.alert("Todo 삭제", "정말로 삭제하시겠습니까?", [
  //     {
  //       text: "cancle",
  //       onPress: () => console.log("cancle"),
  //     },
  //     {
  //       text: "OK",
  //       onPress: () => {
  //         const newTodos = todos.filter((todo) => todo.id !== id);
  //         setTodos(newTodos);
  //       },
  //     },
  //   ]);
  // };

  // 3-6. changeEditInput
  // 편집 버튼을 누르면 isEdit을 토글링한다 : 해당 텍스트를 인풋으로 바꾼다
  // const changeEditInput = (id) => {
  //   const newTodos = [...todos];
  //   const idx = newTodos.findIndex((todo) => todo.id === id);
  //   newTodos[idx].isEdit = !newTodos[idx].isEdit;
  //   // console.log("newTodos[idx].isEdit: ", newTodos[idx].isEdit);
  //   setTodos(newTodos);
  // };

  // 3-7. saveEditInput
  // input 값을 받아 editText에 저장한다
  const saveEditInput = (enterdText) => {
    setEditText(enterdText);
  };
  // console.log("editText: ", editText);

  // 3-8. editTodo
  // editInput 값을 입력 받아 Todos를 수정한다
  // const editTodo = (id) => {
  //   const newTodos = [...todos];
  //   const idx = newTodos.findIndex((todo) => todo.id === id);
  //   newTodos[idx].text = editText;
  //   // console.log("newTodos[idx].text: ", newTodos[idx].text);
  //   newTodos[idx].isEdit = false;
  //   setTodos(newTodos);
  // };

  // 4. 데이터를 async-storage에 저장하고 불러온다
  // 4-1. saveTodos
  // useEffect(() => {
  //   try {
  //     const saveTodos = async () => {
  //       await AsyncStorage.setItem("todos", JSON.stringify(todos));
  //     };
  //     if (todos.length > 0) saveTodos();
  //   } catch {
  //     console.log("Error");
  //   }
  // }, [todos]);

  // 4-2. saveCategory
  // const saveCategory = async (cat) => {
  //   setCategory(cat);
  //   await AsyncStorage.setItem("category", cat);
  // };

  // 4-3. getTodos
  // useEffect(() => {
  //   try {
  //     const getTodos = async () => {
  //       const receive_todos = await AsyncStorage.getItem("todos");
  //       const receive_category = await AsyncStorage.getItem("category");
  //       setTodos(JSON.parse(receive_todos));
  //       setCategory(receive_category ?? "데이트");
  //     };
  //     getTodos();
  //   } catch {
  //     console.log("Error");
  //   }
  // }, []);

  // 5. firestore
  // 5-1. getCategory
  const getCategory = async () => {
    try {
      const receive_data = await getDoc(
        doc(dbService, "category", "currentcategory")
      );
      // console.log(receive_data.data().category);
      setCategory(receive_data.data().category);
    } catch {
      console.log("Error");
    }
  };

  // 5-2. saveCategory
  const saveCategory = (cat) => {
    updateDoc(doc(dbService, "category", "currentcategory"), {
      category: cat,
    });
    setCategory(cat);
  };

  // 5-3. addTodo
  const addTodo = () => {
    addDoc(collection(dbService, "todos"), newTodos);
    setText("");
  };

  // 5-4. getTodos
  const getTodos = () => {
    try {
      const q = query(
        collection(dbService, "todos"),
        orderBy("createdAt", "desc")
      );

      onSnapshot(q, (snapshot) => {
        const newTodos = snapshot.docs.map((doc) => {
          const newTodo = {
            id: doc.id,
            ...doc.data(),
          };
          return newTodo;
        });
        // console.log(newTodos);
        setTodos(newTodos);
      });
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    getCategory();
    getTodos();
  }, []);

  // 5-5. deleteTodo
  const deleteTodo = (id) => {
    Alert.alert("Todo 삭제", "정말로 삭제하시겠습니까?", [
      { text: "Cancel", onPress: () => console.log("cancel") },
      { text: "OK", onPress: () => deleteDoc(doc(dbService, "todos", id)) },
    ]);
  };

  // 5-6. doneTodo
  const doneTodo = (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    updateDoc(doc(dbService, "todos", id), { isDone: !todos[idx].isDone });
  };

  // 5-7. openEditInput
  const openEditInput = (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    updateDoc(doc(dbService, "todos", id), { isEdit: !todos[idx].isEdit });
  };

  // 5-8. editTodo
  const editTodo = (id) => {
    updateDoc(doc(dbService, "todos", id), { text: editText, isEdit: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Nav category={category} saveCategory={saveCategory} />

        <Form saveInput={saveInput} addTodo={addTodo} text={text} />

        <View className="TodoList">
          {todos.map((todo) => {
            if (todo.category === category) {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  editTodo={editTodo}
                  saveEditInput={saveEditInput}
                  editText={editText}
                  doneTodo={doneTodo}
                  deleteTodo={deleteTodo}
                  openEditInput={openEditInput}
                />
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
  },
});
