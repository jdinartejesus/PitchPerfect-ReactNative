import React from 'react'
import { Modal, Text, View, StyleSheet, TouchableHighlight } from 'react-native'

const modalWarning = (props) => {
  const { message, visible } = props
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      style={styles.Modal}
      visible={visible}
    >
      <View style={styles.modalContent}>
        <Text>{message}</Text>
        <TouchableHighlight><Text>OK</Text></TouchableHighlight>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  Modal: {
    flex: 1
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    maxWidth: 200,
    maxHeight: 200,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default modalWarning
