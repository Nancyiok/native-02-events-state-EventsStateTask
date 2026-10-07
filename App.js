import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";

const BACKGROUND_COLOR = "#ffffff";
const PRESSED_BACKGROUND_COLOR = "#ffcccc";
const NOTE_COLOR = "#ffffff";
const PRESSED_NOTE_COLOR = "#ffff00";

export default function App() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]);

  const addNewNote = () => {
    if (!input.trim()) return;
    setInput("");
    setNotes((prev) => [...prev, input]);
  };

  const onLongPressHandler = () => {
    Alert.alert("The note is pressed with a delay of 1 sec!");
  };

  const noteBgBasedOnStateStyles = ({ pressed }) => ({
    backgroundColor: pressed ? PRESSED_BACKGROUND_COLOR : BACKGROUND_COLOR,
  });

  const noteColorBasedOnStateStyles = ({ pressed }) => ({
    color: pressed ? PRESSED_NOTE_COLOR : NOTE_COLOR,
  });

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          style={styles.textInput}
          placeholder="Enter your note"
          onChangeText={setInput}
        />
        <Button title="Add note" onPress={addNewNote} />
      </View>
      <View>
        {notes.map((el, i) => (
          <Pressable
            testID="pressableElem"
            key={`element-${i}`}
            delayLongPress={1000}
            onLongPress={onLongPressHandler}
            style={noteBgBasedOnStateStyles}
          >
            {({ pressed }) => (
              <Text
                testID="noteElem"
                style={[
                  styles.noteElem,
                  noteColorBasedOnStateStyles(pressed),
                ]}
              >
                {el}
              </Text>
            )}
          </Pressable>
        ))}
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
