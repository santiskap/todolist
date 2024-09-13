"use client";
import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  quantityOrWeight: string;
  image: string | null;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: 1,
    title: '',
    quantityOrWeight: '',
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewTask({
          ...newTask,
          image: reader.result as string,
        });
      };
    }
  };

  const addTask = () => {
    if (newTask.title.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask({
        id: newTask.id + 1,
        title: '',
        quantityOrWeight: '',
        image: null,
      });
    }
  };

  const removeTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
      <div className="container mx-auto w-96">
        <div className="bg-gray-100 px-4 pt-0.5 pb-0.5 mt-4 rounded-md">
          <ul>
            {tasks.map((task) => (
                <li key={task.id} className="relative hover:bg-gray-200 p-4 rounded-md bg-gray-50 shadow-sm flex my-2 border-b-2 border-solid border-gray-200 pb-4">
                  <div>
                    {task.image && <img className="object-cover h-16 w-16 rounded-full mr-4 border-solid border-2 border-gray-100" src={task.image} alt={task.title} />}
                  </div>
                  <div>
                    <h3 className="text-2xl text-pink-400">{task.title}</h3>
                    <p className="text-sm text-gray-600">Cantidad: {task.quantityOrWeight}</p>
                    <button onClick={() => removeTask(task.id)} className="text-sm text-pink-600 mt-2 absolute top-0 right-2 bg-gray-200 px-2 rounded-full hover:bg-gray-800">x</button>
                  </div>
                </li>
            ))}
          </ul>
        </div>
        <button className="w-full bg-yellow-500 mb-2 rounded-b-md px-2 text-white text-2xl hover:bg-gray-800 hover:text-pink-400" onClick={toggleVisibility}>+</button>
        {isVisible &&
            <div className="p-4 pt-6 text-center w-11/12 bg-gray-100 border-gray-200 border-solid border-2 h-60 rounded-lg mx-4">
              <div>
                <input
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="text"
                    name="title"
                    placeholder="Nuevo producto"
                    value={newTask.title}
                    onChange={handleInputChange}
                />
                <br />
                <input
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    type="text"
                    name="quantityOrWeight"
                    placeholder="Cantidad o Peso"
                    value={newTask.quantityOrWeight}
                    onChange={handleInputChange}
                />
                <br />
                <input
                    className="cursor-pointer ml-3 mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} />
                <br />
                <button onClick={addTask}
                        className="bg-yellow-500 hover:bg-gray-900 text-white hover:text-pink-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-pink-500">
                  Agregar
                </button>
              </div>
            </div>
        }
      </div>
  );
};

export default TodoList;