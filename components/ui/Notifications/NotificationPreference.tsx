import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

interface NotificationPreferenceProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  options?: {
    label: string;
    isEnabled: boolean;
    onToggle: () => void;
  }[];
}

export const NotificationPreference: React.FC<NotificationPreferenceProps> = ({
  title,
  description,
  isEnabled,
  onToggle,
  options = []
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        
        <Switch
          value={isEnabled}
          onValueChange={onToggle}
          trackColor={{ false: '#D1D5DB', true: '#005A9C' }}
          thumbColor="#FFFFFF"
        />
      </View>
      
      {options.length > 0 && (
        <TouchableOpacity 
          style={styles.expandButton} 
          onPress={toggleExpanded}
          activeOpacity={0.7}
        >
          <Text style={styles.expandText}>
            {expanded ? 'Hide Options' : 'Show Options'}
          </Text>
          {expanded ? (
            <ChevronUp size={16} color="#005A9C" />
          ) : (
            <ChevronDown size={16} color="#005A9C" />
          )}
        </TouchableOpacity>
      )}
      
      {expanded && options.length > 0 && (
        <Animated.View 
          entering={SlideInDown.springify()}
          exiting={SlideOutDown.springify()}
          style={styles.optionsContainer}
        >
          {options.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Switch
                value={option.isEnabled}
                onValueChange={option.onToggle}
                trackColor={{ false: '#D1D5DB', true: '#005A9C' }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  expandText: {
    fontSize: 14,
    color: '#005A9C',
    fontWeight: '500',
    marginRight: 4,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  optionLabel: {
    fontSize: 14,
    color: '#333',
  },
});

export default NotificationPreference;