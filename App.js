import React, { useState } from 'react';
import { NativeBaseProvider, Box, Text, Button, VStack, HStack, Switch, Input, useAccessibleColors, useContrastText, useTheme, useColorMode, useColorModeValue, useClipboard, useDisclose, Modal } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Hook useAccessibleColors para alternar colores accesibles
  const [, , toggleAccessibleColors] = useAccessibleColors();

  // Hook useColorMode para alternar entre modos claro y oscuro
  const { colorMode, toggleColorMode } = useColorMode();

  // Hook useColorModeValue para establecer valores según el modo de color actual
  const bgColor = useColorModeValue('warmGray.50', 'coolGray.800');
  const textColor = useColorModeValue('black', 'white');
  const placeholderColor = useColorModeValue('gray.500', 'gray.400');
  const buttonBgColor = useColorModeValue('primary.500', 'primary.300');

  // Hook useContrastText para obtener el color de texto de contraste
  const buttonTextColor = useContrastText(buttonBgColor);

  // Hook useClipboard para copiar y pegar texto
  const { value, onCopy } = useClipboard();

  // Hook useDisclose para manejar la visibilidad del modal
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    onOpen();
  };

  return (
    <SafeAreaView style={styles.container}>
      <VStack space={4} alignItems="center" p={9} bg={bgColor} flex={1}>
        {/* Sección para alternar colores accesibles */}
        <HStack space={3} alignItems="center" mt={10}>
          <Text fontSize="lg" color={textColor}>Toggle Accessible Colors</Text>
          <Switch onValueChange={toggleAccessibleColors} colorScheme="coolGray" />
        </HStack>
        {/* Sección para alternar el modo de color */}
        <HStack space={3} alignItems="center">
          <Text fontSize="lg" color={textColor}>Toggle Color Mode</Text>
          <Switch onValueChange={toggleColorMode} colorScheme="coolGray" />
        </HStack>
        <Text fontSize="lg" color={textColor}>Current Color Mode: {colorMode}</Text>
        <VStack space={4} w="70%" mt={10}>
          {/* Campo de entrada para el email */}
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            bg="white"
            _dark={{ bg: 'coolGray.700' }}
            color={textColor}
            placeholderTextColor={placeholderColor}
            fontSize="lg"
          />
          <HStack space={3} alignItems="center">
            {/* Campo de entrada para la contraseña */}
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              type={showPassword ? "text" : "password"}
              bg="white"
              _dark={{ bg: 'coolGray.700' }}
              color={textColor}
              placeholderTextColor={placeholderColor}
              fontSize="lg"
              flex={1}
            />
            <Button onPress={() => setShowPassword(!showPassword)} bg={buttonBgColor} _text={{ color: buttonTextColor }}>
              {showPassword ? "Hide" : "Show"}
            </Button>
            {/* Botón para copiar la contraseña */}
            <Button onPress={() => onCopy(password)} bg={buttonBgColor} _text={{ color: buttonTextColor }}>
              Copy
            </Button>
          </HStack>
          <HStack space={3} alignItems="center">
            {/* Campo de entrada para confirmar la contraseña */}
            <Input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              type={showPassword ? "text" : "password"}
              bg="white"
              _dark={{ bg: 'coolGray.700' }}
              color={textColor}
              placeholderTextColor={placeholderColor}
              fontSize="lg"
              flex={1}
            />
            {/* Botón para pegar la contraseña */}
            <Button onPress={() => setConfirmPassword(value)} bg={buttonBgColor} _text={{ color: buttonTextColor }}>
              Paste
            </Button>
          </HStack>
          {/* Botón para iniciar sesión */}
          <Button
            onPress={handleLogin}
            bg={buttonBgColor}
            _text={{ color: buttonTextColor }}
            fontSize="lg"
          >
            Login
          </Button>
        </VStack>
      </VStack>
      {/* Modal para mostrar el éxito del inicio de sesión */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header fontSize="lg">Login Successful</Modal.Header>
          <Modal.Body>
            <Text fontSize="lg">Welcome back!</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={onClose} fontSize="lg">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <LoginScreen />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
