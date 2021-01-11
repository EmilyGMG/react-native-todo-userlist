import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import { Ionicons } from '@expo/vector-icons';
import UsersList from './screens/UsersList';
import Todo from './screens/Todo';

const Header = ({ name, openDrawer }) => (

  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{ width: 50 }}></Text>
  </View>
)

const Home = ({ navigation }) => (
  <>
    <View style={styles.Home}>
      <Header name="Home" openDrawer={navigation.openDrawer} />
    </View>
  </>
)

const UsersLists = ({ navigation }) => (
  <>
    <View style={styles.headers}>
      <Header name="LISTA" openDrawer={navigation.openDrawer} />
      <UsersList />
    </View>
  </>
)

const Todos = ({ navigation }) => (
  <>
    <View style={styles.headers}>
      <Header name="LISTA A FAZER" openDrawer={navigation.openDrawer} />
      <Todo />
    </View>
  </>
)


function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => navigate(item.name)}>
      <Ionicons name={item.icon} size={32} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  state = {
    routes: [
      {
        name: "Home",
        icon: "ios-home"
      },
      {
        name: "UsersList",
        icon: "ios-list"
      },
      {
        name: "Todo",
        icon: "ios-list"
      },
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>EM_GROSS</Text>
        <Text style={{ color: "gray", marginBottom: 10 }}>em_gross@doe.com</Text>
        <View style={styles.sidebarDivider}></View>
        <FlatList
          style={{ width: "100%", marginLeft: 30 }}
          data={this.state.routes}
          renderItem={({ item }) => <Item item={item} navigate={this.props.navigation.navigate} />}
          keyExtractor={item => item.name}
        />
      </View>
    )
  }
}

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    UsersList: { screen: UsersLists },
    Todo: { screen: Todos },
  },
  {
    initialRouteName: "Home",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <Sidebar {...props} />
  },
)

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none",
    unmountInactiveRoutes: true
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({

  Home: {
    paddingTop: 40,
    color: 'white',
    backgroundColor: "white",
    flex: 1
  },
  headers: {
    paddingTop: 40,
    color: 'white',
    backgroundColor: "white",
    flex: 1
  },
  container: {
    color: 'white',
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
    flex: 1
  },
  listItem: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    marginLeft: 20
  },
  header: {
    color: 'white',
    backgroundColor: 'white',
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  sidebarDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "lightgray",
    marginVertical: 10
  }
});