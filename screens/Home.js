import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text as KittenText } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Create Your Notes</Text>
        <Text style={styles.subtitleText}>Add note about anything</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={[styles.actionButton, styles.createButton]}
          onPress={() => navigation.navigate("HomeTabs", { screen: "Create" })}
        >
          <Text style={styles.actionButtonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => navigation.navigate("HomeTabs", { screen: "AllNotes" })}
        >
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222B45",
    padding: 20,
    justifyContent: "center",
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 60,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
  actionsSection: {
    marginBottom: 30,
  },
  actionButton: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 65,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  createButton: {
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#45a049",
  },
  viewButton: {
    backgroundColor: "#2196F3",
    borderWidth: 2,
    borderColor: "#1976d2",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },
}); 