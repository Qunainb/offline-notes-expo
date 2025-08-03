import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";

import CreateNote from "./screens/CreateNote";
import AllNotes from "./screens/AllNotes";
import Note from "./screens/Note";

// Tab setup
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom tab bar UI
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Create" />
    <BottomNavigationTab title="All Notes" />
  </BottomNavigation>
);

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Tab.Screen name="Create" component={CreateNote} />
    <Tab.Screen name="AllNotes" component={AllNotes} />
  </Tab.Navigator>
);

// Stack Navigator (includes tabs + "Note" screen)
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeTabs" component={TabNavigator} />
          <Stack.Screen name="Note" component={Note} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
