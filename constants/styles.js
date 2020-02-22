import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#cccc',
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
    color: '#000000',
  },
  btnTextSubmit: {
    marginTop: 10,
    color: 'darkblue',
    fontSize: 26,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'darkblue',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  btnTextUpdate: {
    marginTop: 10,
    color: 'green',
    fontSize: 20,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  btnTextLogout: {
    marginTop: 30,
    color: 'red',
    fontSize: 20,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#00A398',
  },
});

export default styles;
