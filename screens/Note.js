import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button, Text } from "@ui-kitten/components";
import React, { useCallback, useState } from "react";
import { StyleSheet, View, TextInput, Alert } from "react-native";

export default function Note({ route }) {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState("");
  const { singleNote } = route.params;
  const navigation = useNavigation();

  // Fetch notes when this screen is focused
  useFocusEffect(
    useCallback(() => {
      getNotes();
      setEditedNote(singleNote);
    }, [singleNote])
  );

  const getNotes = async () => {
    const value = await AsyncStorage.getItem("NOTES");
    const parsedNotes = value ? JSON.parse(value) : [];
    setNotes(parsedNotes);
  };

  const deleteNote = async () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const newNotes = notes.filter((note) => note !== singleNote);
            await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes));
            navigation.navigate("HomeTabs", { screen: "AllNotes" });
          }
        }
      ]
    );
  };

  const saveEdit = async () => {
    if (editedNote.trim() === "") {
      Alert.alert("Error", "Note cannot be empty");
      return;
    }

    const updatedNotes = notes.map((note) => 
      note === singleNote ? editedNote : note
    );
    await AsyncStorage.setItem("NOTES", JSON.stringify(updatedNotes));
    setIsEditing(false);
    setEditedNote(editedNote);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedNote(singleNote);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          value={editedNote}
          onChangeText={setEditedNote}
          style={styles.editInput}
          multiline
          autoFocus
          selectionColor="#fff"
        />
      ) : (
        <Text style={styles.noteText}>{singleNote}</Text>
      )}
      
      <View style={styles.bottom}>
        {isEditing ? (
          <View style={styles.buttonRow}>
            <Button onPress={saveEdit} style={[styles.button, styles.saveButton]}>
              Save
            </Button>
            <Button onPress={cancelEdit} style={[styles.button, styles.cancelButton]}>
              Cancel
            </Button>
          </View>
        ) : (
          <View style={styles.buttonRow}>
            <Button onPress={() => setIsEditing(true)} style={[styles.button, styles.editButton]}>
              Edit
            </Button>
            <Button onPress={deleteNote} style={[styles.button, styles.deleteButton]}>
              Delete
            </Button>
          </View>
        )}
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
  noteText: {
    fontSize: 22,
    marginVertical: 20,
    color: "#fff",
  },
  editInput: {
    fontSize: 22,
    marginVertical: 20,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  saveButton: {
    backgroundColor: "#2196F3",
  },
  cancelButton: {
    backgroundColor: "#9E9E9E",
  },
});
