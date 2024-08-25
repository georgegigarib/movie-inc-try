// SubmitButton.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SubmitButtonProps {
  isModified: boolean;
  submitted: boolean;
  isLoading: boolean;
  onPress: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isModified, submitted, isLoading, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          opacity: isModified || submitted ? 1 : 0,
          backgroundColor: submitted ? '#28a745' : '#007BFF',
        },
      ]}
      onPress={onPress}
      disabled={!isModified || submitted || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : submitted ? (
        <MaterialCommunityIcons name="check" size={18} color="#FFFFFF" />
      ) : (
        <MaterialCommunityIcons name="send" size={18} color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: -35,
    bottom: 21,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SubmitButton;
