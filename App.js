import React, { useState } from 'react';
import { NativeBaseProvider, Box, Text, Button, VStack, HStack, Switch, Input, useContrastText, useTheme, useColorMode, extendTheme, Center } from 'native-base';

// Definición de un tema personalizado con colores accesibles y no accesibles
const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#e3f2f9',
      100: '#c5e4f3',
      200: '#a2d4ec',
      300: '#7ac1e4',
      400: '#47a9da',
      500: '#0088cc', // Color menos accesible
      600: '#007ab8',
      700: '#006ba1',
      800: '#005885',
      900: '#003f5e',
    },
    accessible: {
      50: '#f0f4c3',
      100: '#e6ee9c',
      200: '#dce775',
      300: '#d4e157',
      400: '#cddc39',
      500: '#c0ca33', // Color accesible
      600: '#afb42b',
      700: '#9e9d24',
      800: '#827717',
      900: '#6d4c41',
    },
  },
});

// Componente para mostrar una tarea
const TaskItem = ({ task, onDelete }) => {
  // Hook useContrastText para obtener el color de contraste adecuado para el texto
  const colorContrast = useContrastText('primary.500');
  return (
    <HStack space={3} alignItems="center" bg="primary.500" p={3} borderRadius="md" mb={2}>
      <Text color={colorContrast} fontSize="lg">{task}</Text>
      <Button colorScheme="danger" onPress={onDelete}>Delete</Button>
    </HStack>
  );
};

const ToDoList = () => {
  // Hook useState para manejar el estado de las tareas y la tarea actual
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [accessibleColors, setAccessibleColors] = useState(false);

  // Hook useColorMode para manejar el modo de color (claro/oscuro)
  const { colorMode, toggleColorMode } = useColorMode();

  const addTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Función para alternar los colores accesibles
  const toggleAccessibleColors = () => {
    setAccessibleColors(!accessibleColors);
  };

  return (
    // Center para centrar el contenido en la pantalla
    <Center flex={1} bg={accessibleColors ? 'accessible.500' : 'primary.500'}>
      <VStack space={4} alignItems="center" p={5}>
        <HStack space={3} alignItems="center">
          <Text fontSize="lg">Toggle Accessible Colors</Text>
          <Switch onValueChange={toggleAccessibleColors} colorScheme="coolGray" />
        </HStack>
        <HStack space={3} alignItems="center">
          <Text fontSize="lg">Toggle Color Mode</Text>
          <Switch onValueChange={toggleColorMode} colorScheme="coolGray" />
        </HStack>
        <HStack space={3} alignItems="center" w="100%">
          <Input flex={1} placeholder="Add a new task" value={task} onChangeText={setTask} fontSize="lg" />
          <Button onPress={addTask}>Add</Button>
        </HStack>
        <VStack space={2} w="100%">
          {tasks.map((task, index) => (
            <TaskItem key={index} task={task} onDelete={() => deleteTask(index)} />
          ))}
        </VStack>
        <Text fontSize="lg">Current Color Mode: {colorMode}</Text>
      </VStack>
    </Center>
  );
};

const App = () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <ToDoList />
    </NativeBaseProvider>
  );
};

export default App;
