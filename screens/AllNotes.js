import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Divider, List, ListItem, Text } from "@ui-kitten/components";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function AllNotes() {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  // Load notes when screen is focused
  useFocusEffect(
    useCallback(() => {
      getNotes();
    }, [])
  );

  const getNotes = async () => {
    const value = await AsyncStorage.getItem("NOTES");
    const parsedNotes = value ? JSON.parse(value) : [];
    setNotes(parsedNotes);
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={<Text category="h5">{item}</Text>}
      onPress={() =>
        navigation.navigate("Note", {
          singleNote: item,
        })
      }
    />
  );

  return (
    <View style={{ backgroundColor: "#222b45", flex: 1 }}>
      <List
        style={styles.container}
        data={[...notes].reverse()} // Avoid mutating original satate
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
  },
});
