import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import styled from "@emotion/native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import React, { useState } from "react";

const App = () => {
  // 테스트용 리스트
  const testList = ["실행컨텍스트 공부", "ES6 공부"];

  // 입력값 state
  const [text, setText] = useState("");

  // 투두리스트 state
  const [todoList, setTodoList] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StNav className="Nav">
          <StNavButton>
            <StNavText>JavaScript</StNavText>
          </StNavButton>
          <StNavButton>
            <StNavText>React</StNavText>
          </StNavButton>
          <StNavButton>
            <StNavText>ReactNative</StNavText>
          </StNavButton>
        </StNav>

        <View className="Form">
          <StInputContainer>
            <StInput>
              <TextInput placeholder="Enter your task" style={styles.input} />
            </StInput>
          </StInputContainer>
        </View>

        <View className="TodoList">
          {testList.map((item) => {
            return (
              <StTodo>
                <Text>{item}</Text>
                <StTodoButtons>
                  <StTodoButton>
                    <AntDesign name="checksquareo" size={24} color="black" />
                  </StTodoButton>
                  <StTodoButton>
                    <Feather name="edit" size={24} color="black" />
                  </StTodoButton>
                  <StTodoButton>
                    <AntDesign name="delete" size={24} color="black" />
                  </StTodoButton>
                </StTodoButtons>
              </StTodo>
            );
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
  input: {
    height: 40,
  },
});

const StNav = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom-width: 1;
  border-bottom-color: black;
`;

const StNavButton = styled.TouchableOpacity`
  flex-basis: 30%;
  height: 50px;
  border: 1px solid black;
  justify-content: center;
  background-color: #96e4eb;
  /* hover {
    background-color: #f7d528;
  } */
`;

const StNavText = styled.Text`
  text-align: center;
  font-weight: bold;
`;

const StInputContainer = styled.View`
  border-bottom-width: 1;
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
