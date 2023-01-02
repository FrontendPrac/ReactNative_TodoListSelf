import React from "react";
import styled from "@emotion/native";

const Nav = ({ category, saveCategory }) => {
  return (
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
  );
};

export default Nav;

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
`;

const StNavText = styled.Text`
  text-align: center;
  font-weight: bold;
`;
