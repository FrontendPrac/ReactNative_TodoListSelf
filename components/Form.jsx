import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import styled from "@emotion/native";

const Form = ({ saveInput, addTodo, text }) => {
  return (
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
  );
};

export default Form;

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
});

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
