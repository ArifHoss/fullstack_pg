import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [showArchived, setShowArchived] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3001/tasks');
        setTasks(response.data);
    };

    const fetchArchived = async () => {
        const response = await axios.get(
            'http://localhost:3001/tasks/archived'
        );
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!title.trim()) return;
        try {
            await axios.post('http://localhost:3001/tasks', { title });
            setTitle('');
            fetchTasks();
        } catch (error) {
            console.error(error, 'COULD NOT CREATE TASK');
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/tasks/${id}`);
            fetchArchived();
        } catch (error) {
            console.error(error, 'COULD NOT DELETE TASK');
        }
    };

    // Edit Task

    const startEdit = (task: Task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
    };

    const saveEdit = async (id: number) => {
        try {
            await axios.put(`http://localhost:3001/tasks/edit/${id}`, {
                title: editTitle
            });
            setEditingId(null);
            setEditTitle('');
            fetchTasks();
        } catch (error) {
            console.error(error, 'COULD NOT ARCHIVE TASK');
        }
    };

    // Archive instead of Delete
    const archiveTask = async (id: number) => {
        try {
            await axios.put(`http://localhost:3001/tasks/archive/${id}`, {
                archived: true
            });
            if (showArchived) {
                fetchArchived();
            } else {
                fetchTasks();
            }
        } catch (error) {
            console.error(error, 'COULD NOT ARCHIVE TASK');
        }
    };

    const toggleTask = async (task: Task) => {
        try {
            await axios.put(
                `http://localhost:3001/tasks/completed/${task.id}`,
                {
                    title: task.title,
                    completed: !task.completed
                }
            );
            fetchTasks();
        } catch (error) {
            console.error(error, 'TOGGLE FAILED');
        }
    };

    return (
        <>
            <h1>My tasks</h1>
            {!showArchived && (
                <div className="task-form">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add new task..."
                        onKeyDown={(e) => e.key === 'Enter' && addTask()}
                        className='task-input'
                    />
                    <button onClick={addTask}>Add</button>
                </div>
            )}
            {tasks.length === 0 ? (
                <p>DU HAR INGA AKTIV TASK!</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task)}
                                disabled={showArchived}
                            />

                            {editingId === task.id ? (
                                <>
                                    <input
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(e.target.value)
                                        }
                                    />
                                    <button onClick={() => saveEdit(task.id)}>
                                        Save
                                    </button>
                                    <button onClick={() => setEditingId(null)}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>{task.title ?? '(no title)'}</span>
                                    {!showArchived && (
                                        <>
                                            <button
                                                disabled={task.completed}
                                                onClick={() => startEdit(task)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    archiveTask(task.id)
                                                }
                                                disabled={!task.completed}
                                            >
                                                Done
                                            </button>
                                        </>
                                    )}
                                </>
                            )}

                            {showArchived && (
                                <button onClick={() => deleteTask(task.id)}>
                                    Delete
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={() => {
                    setShowArchived(!showArchived);
                    if (showArchived) {
                        fetchTasks();
                    } else {
                        fetchArchived();
                    }
                }}
            >
                {showArchived ? 'TODOES' : 'COMPLETED TODOES'}
            </button>
        </>
    );
}

export default App;
