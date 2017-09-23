import React, { PropTypes } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const propTypes = {
  size: PropTypes.string,
};

const defaultProps = {
  size: 'large',
};

export const Spinner = ({ size }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size} />
  </View>
);

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#304FFE',
  },
});

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;