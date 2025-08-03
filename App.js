import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Text,
} from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";

import Home from "./screens/Home";
import CreateNote from "./screens/CreateNote";
import AllNotes from "./screens/AllNotes";
import Note from "./screens/Note";

// Tab setup
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom Header Component
const CustomHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerText} category="h5">
      {title}
    </Text>
  </View>
);

// Bottom tab bar UI
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" />
    <BottomNavigationTab title="Create" />
    <BottomNavigationTab title="All Notes" />
  </BottomNavigation>
);

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator 
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={{
      header: ({ route }) => <CustomHeader title={route.name} />,
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Create" component={CreateNote} />
    <Tab.Screen name="AllNotes" component={AllNotes} />
  </Tab.Navigator>
);

// Stack Navigator (includes tabs + "Note" screen)
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            header: ({ route }) => (
              route.name === "Note" ? (
                <CustomHeader title="Note" />
              ) : null
            ),
          }}
        >
          <Stack.Screen name="HomeTabs" component={TabNavigator} />
          <Stack.Screen name="Note" component={Note} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2A3441",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#3B4B5B",
  },
  headerText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
