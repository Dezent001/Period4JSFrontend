import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Vi nåede desværre ikke at blive så færdige vi gerne ville men appen virker ok,

          Jonas {"&"} Poul
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
