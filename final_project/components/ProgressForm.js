import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function ProgressForm({ initialProgress, onSubmit }) {
  const [progress, setProgress] = useState(String(initialProgress || 0));

  return (
    <View style={{ margin: 20 }}>
      <TextInput
        keyboardType="numeric"
        value={progress}
        onChangeText={setProgress}
        placeholder="Enter current page number"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Save Progress" onPress={() => onSubmit(Number(progress))} />
    </View>
  );
}
