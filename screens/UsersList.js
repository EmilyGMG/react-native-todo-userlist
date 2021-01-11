import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import CreateUserScreen from "./CreateUserScreen";
import UserDetailScreen from "./UserDetailScreen";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import firebase from "../database/firebase";
const Stack = createStackNavigator()

function MyStack() {
  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>

      <Stack.Screen
        name="UsersList"

        component={UsersList}
        options={{ title: "LISTA" }}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{ title: "create a new user" }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: "User Detail" }}
      />
    </Stack.Navigator>

  );
}

const UsersList = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection('users').onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data()
        users.push({
          id: doc.id,
          name,
          email,
          phone
        })
      });
      setUsers(users)
    })
  }, [])
  return (
    <ScrollView>
      <Button
        title="Criar Novo"
        onPress={() => navigation.navigate("CreateUserScreen")}
      />
      {
        users.map((user) => {
          return (
            <ListItem key={user.id} bottomDivider onPress={() => {
              navigation.navigate("UserDetailScreen", {
                userId: user.id
              });
            }}>
              <ListItem.Chevron />
              {/* <Avatar
                source={{
                  uri: 'https://static.wixstatic.com/media/71a6c2_bddf371813b546a7834c252183473600~mv2.png'
                }}
                rounded
              /> */}
              <ListItem.Content>
                <ListItem.Title>
                  {user.name}
                </ListItem.Title>
                <ListItem.Subtitle>
                  {user.email}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
    </ScrollView>

  )
}
export default function UsersListss() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    color: 'white',
    backgroundColor: "white",
    flex: 1
  },
})