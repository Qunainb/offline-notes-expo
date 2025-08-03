import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button, Text } from "@ui-kitten/components";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Note({ route }) {
  const [notes, setNotes] = useState([]);
  const { singleNote } = route.params;
  const navigation = useNavigation();

  // Fetch notes when this screen is focused
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

  const deleteNote = async () => {
    const newNotes = notes.filter((note) => note !== singleNote);
    await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes));
    navigation.navigate("AllNotes");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} category="h1">
        Note
      </Text>
      <Text style={styles.noteText}>{singleNote}</Text>
      <View style={styles.bottom}>
        <Button onPress={deleteNote} style={styles.button}>
          Delete
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222B45",
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginTop: 50,
    color: "#fff",
  },
  noteText: {
    fontSize: 22,
    marginVertical: 20,
    color: "#fff",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  button: {
    marginHorizontal: 20,
  },
});
