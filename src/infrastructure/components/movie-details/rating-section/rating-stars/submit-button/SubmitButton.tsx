import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SubmitButtonProps {
  isModified: boolean;
  submitted: boolean;
  isLoading: boolean;
  onPress: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isModified,
  submitted,
  isLoading,
  onPress,
}) => {
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
      testID="submit-button"
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" testID="activity-indicator" />
      ) : submitted ? (
        <Icon name="check" size={18} color="#FFFFFF" testID="check-icon" />
      ) : (
        <Icon name="send" size={18} color="#FFFFFF" testID="send-icon" />
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
