import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { auth } from './configuration/Config'; // Ensure this file is properly configured
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isNewUser, setIsNewUser] = React.useState(false);

  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const { email, password } = values;

    if (isNewUser) {
      // Register the new user
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsNewUser(false); // Toggle back to login mode after registration
        })
        .catch((err) => setErrors({ form: err.message }))
        .finally(() => setSubmitting(false));
    } else {
      // Login existing user
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.replace('Home'); // Navigate to HomeScreen
        })
        .catch((err) => setErrors({ form: err.message }))
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>{isNewUser ? 'Register' : 'Login'}</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

          {errors.form && <Text style={styles.error}>{errors.form}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>{isNewUser ? 'Register' : 'Login'}</Text>
          </TouchableOpacity>

          <Text
            style={styles.toggleText}
            onPress={() => setIsNewUser(!isNewUser)}
          >
            {isNewUser ? "Already have an account? Login" : "Don't have an account? Register"}
          </Text>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'left',
    width: '90%',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    marginTop: 15,
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
