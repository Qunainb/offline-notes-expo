import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateNote() {
  const [note, setNote] = useState("");
  const navigation = useNavigation();

  async function handleSaveNote() {
    // Check if note is empty or only contains whitespace
    if (!note.trim()) {
      Alert.alert(
        "Empty Note",
        "Please enter some content before creating a note.",
        [
          {
            text: "OK",
            style: "default"
          }
        ]
      );
      return;
    }

    const value = await AsyncStorage.getItem("NOTES");
    const notes = value ? JSON.parse(value) : [];
    notes.push(note.trim()); // Trim whitespace before saving
    await AsyncStorage.setItem("NOTES", JSON.stringify(notes));
    setNote("");
    navigation.navigate("HomeTabs", { screen: "AllNotes" });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <TextInput
          value={note}
          onChangeText={setNote}
          style={{ color: "#fff", fontSize: 22 }}
          multiline
          autoFocus
          selectionColor="#fff"
        />
        <View style={styles.bottom}>
          <Button
            style={styles.button}
            appearance="filled"
            onPress={handleSaveNote}
          >
            Create Note
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222B45",
    padding: 30,
    width: Dimensions.get("window").width,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  button: {
    marginBottom: 30,
  },
});
