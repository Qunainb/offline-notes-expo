import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateNote() {
  const [note, setNote] = useState("");
  const navigation = useNavigation();

  async function handleSaveNote() {
    const value = await AsyncStorage.getItem("NOTES");
    const notes = value ? JSON.parse(value) : [];
    notes.push(note);
    await AsyncStorage.setItem("NOTES", JSON.stringify(notes));
    setNote("");
    navigation.navigate("AllNotes");
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
