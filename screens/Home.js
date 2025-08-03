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
      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <View style={styles.actionButtons}>
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
  actionsSection: {
    marginBottom: 30,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  createButton: {
    backgroundColor: "#4CAF50",
  },
  viewButton: {
    backgroundColor: "#2196F3",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
}); 