import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {CountryPicker} from 'react-native-country-codes-picker';

export default LoginScreen = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  const SendIntentAndroid = require('react-native-send-intent');

  const InitiateCall = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      SendIntentAndroid.sendPhoneCall(countryCode + phoneNumber, true);
    } else {
      console.log('No permission');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.headingText}>Task Management App</Text>
        <Text style={styles.messageComponent}>
          Please enter your Country & Phone Number
        </Text>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={styles.countryCode}>
            <Text style={styles.countryCodeTxt}>{countryCode}</Text>
            <Image
              source={require('../assets/images/down-arrow.png')}
              style={styles.countryCodeImage}
            />
          </TouchableOpacity>

          <View style={styles.phoneComponent}>
            <TextInput
              style={styles.phoneInputFeild}
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={value => setPhoneNumber(value)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={
            phoneNumber && phoneNumber.length >= 3
              ? () => InitiateCall()
              : () => setWarningModalVisible(true)
            // : alert('Pl nmease enter mobile number')
          }>
          <Image
            source={require('../assets/images/phonecall.png')}
            style={styles.callAcceptIcon}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <CountryPicker
        onBackdropPress={() => setShow(false)}
        show={show}
        style={styles.countryCodePickerModal}
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />

      <Modal
        visible={warningModalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalMainContainer}>
          <View style={styles.modalViewMainContainer}>
            <Text style={styles.modaltitle}>
              Please enter valid country code and mobile number
            </Text>
            <TouchableOpacity
              style={styles.modalButtonContainer}
              onPress={() => setWarningModalVisible(false)}>
              <Text style={styles.modalButtonTxtStyle}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeTxt: {fontSize: 17, color: 'black'},
  countryCodeImage: {marginLeft: 10, height: 15, width: 15},
  headingText: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: '5%',
    color: 'black',
    fontWeight: '700',
    elevation: 2,
  },
  messageComponent: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: '10%',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
  },

  countryCode: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: '#e8f6e9',
    marginLeft: '2%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 10,
  },

  phoneComponent: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '2%',
    borderRadius: 10,
    backgroundColor: '#e8f6e9',
  },
  phoneInputFeild: {
    fontSize: 16,
  },

  countryCodePickerModal: {
    modal: {
      flex: 1,
      margin: '20%',
      borderRadius: 20,
      backgroundColor: 'white',
      alignSelf: 'center',
    },
  },
  callAcceptIcon: {height: 50, width: 50, marginTop: 20},
  modalMainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewMainContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '90%',
    borderRadius: 10,
    paddingVertical: 20,
  },
  modaltitle: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    fontWeight: '900',
  },
  modalButtonContainer: {
    backgroundColor: '#FFBF2B',
    marginTop: 30,
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalButtonTxtStyle: {fontSize: 18, color: 'white', fontWeight: '900'},
});
