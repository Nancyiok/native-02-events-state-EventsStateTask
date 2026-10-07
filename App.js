import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";

const BACKGROUND_COLOR = "#ffffff";
const PRESSED_BACKGROUND_COLOR = "#ffcccc";
const NOTE_COLOR = "#ffffff";
const PRESSED_NOTE_COLOR = "#ffff00";

export default function App() {
  // your work with state

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Enter your note" />
        <Button title="Add note" />
      </View>
      <View>
        <Pressable testID="pressableElem">
          <Text testID="noteElem" style={styles.noteElem}>
            note_text
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 28,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  noteElem: {
    margin: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#008000",
    fontSize: 16,
    textAlign: "center",
  },
});
