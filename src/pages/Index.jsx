import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = { id: Date.now(), text: input, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5} maxW="480px" m="auto" mt="20vh" bg="white" boxShadow="md">
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <Button onClick={handleAddTask} colorScheme="blue" mt={2}>Add Task</Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            <Box as={task.isCompleted ? 's' : 'span'}>{task.text}</Box>
            <Box>
              <IconButton
                icon={<FaCheckCircle />}
                onClick={() => handleToggleComplete(task.id)}
                aria-label="Complete task"
                colorScheme={task.isCompleted ? "green" : "gray"}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => handleDeleteTask(task.id)}
                aria-label="Delete task"
                colorScheme="red"
                ml={2}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;