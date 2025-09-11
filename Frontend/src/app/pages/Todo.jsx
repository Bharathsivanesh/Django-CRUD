"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = async () => {
    if (!task.trim()) return;
    if (editIndex !== null) {
      await Updatedata();
      await Getdata();
      setEditIndex(null);
    } else {
      await Addtodo();
      await Getdata();
    }
    setTask("");
  };

  const handleDelete = async (index) => {
    await Deletedata(index);
    await Getdata();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    Geteditdata(index);
  };

  async function Addtodo() {
    try {
      const response = await axios.post("http://127.0.0.1:8000/myapp/", {
        content: task,
      });
      console.log("The response is", response.data);
    } catch (e) {
      console.log("The Error is ", e);
    }
  }

  async function Getdata() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/myapp/view/");
      console.log("The response from get is ", response.data);
      setTodos(
        response.data.map((item, idx) => ({
          data: item.content,
          index: item.id,
        }))
      );
    } catch (e) {
      console.log("Ther erris is ", e);
    }
  }

  async function Deletedata(id) {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/myapp/delete/${id}/`
      );
      console.log("The response from get is ", response.data);
    } catch (e) {
      console.log("Ther erris is ", e);
    }
  }

  async function Geteditdata(id) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/myapp/view/${id}/`
      );
      setTask(response?.data?.content);
      console.log("The response from get is ", response.data);
    } catch (e) {
      console.log("Ther error is ", e);
    }
  }

  async function Updatedata() {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/myapp/edit/${editIndex}/`,
        { content: task }
      );
      console.log("The response from get is ", response.data);
    } catch (e) {
      console.log("Ther erris is ", e);
    }
  }

  useEffect(() => {
    Getdata();
  }, [setTodos]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">✅ TODO App</h1>

      <div className="flex w-full max-w-md mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="w-full max-w-md">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white shadow-md p-3 rounded-lg mb-3"
          >
            <span>{todo.data}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(todo.index)}
                className="px-2 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.index)}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
