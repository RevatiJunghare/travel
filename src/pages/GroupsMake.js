import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PostGroup, deleteGroup, gettodo } from '../redux/group/group.action';

function GroupsMake() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [error, setError] = useState('');
    const Groups = useSelector((state) => state.todos.groups);
    const LOADING = useSelector((state) => state.todos.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        Groups.forEach((group) => {
            if (!group.statuses.length) {
                const range = [];
                for (let i = group.from; i <= group.to; i++) {
                    range.push(i);
                }
                dispatch(gettodo(range, group));
            }
        });
    }, [dispatch, Groups]);

    const handleAddGroup = () => {
        const fromRange = parseInt(from);
        const toRange = parseInt(to);

        if (toRange < fromRange) {
            setError('Invalid range: "To" should be greater than or equal to "From".');
            return;
        }

        const startId = Groups.length === 0 ? 11 : Groups[Groups.length - 1].to + 1;
        const newFrom = startId + (fromRange - 1);
        const newTo = startId + (toRange - 1);

        if (newFrom === 11 && newTo === 14) {
            setError('Invalid range: The range 1 to 4 is not allowed.');
            return;
        }

        dispatch(PostGroup(newFrom, newTo));
        setFrom('');
        setTo('');
        setError('');
    };

    const handleDelete = (index) => {
        dispatch(deleteGroup(index));
    };

    const handleShow = () => {
        Groups.forEach((group) => {
            if (!group.statuses.length) {
                const range = [];
                for (let i = group.from; i <= group.to; i++) {
                    range.push(i);
                }
                dispatch(gettodo(range, group));
            }
        });
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="number"
                    placeholder="From"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="To"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <button onClick={handleAddGroup}>Add Group</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <button onClick={handleShow}>Show Status</button>
            {LOADING && <p>Loading...</p>}
            {Groups.map((group, index) => (
                <div key={index}>
                    <h2>
                        Group {index + 1}: {group.from} - {group.to}
                        <button onClick={() => handleDelete(index)}>🗑️</button>
                    </h2>
                    <ul>
                        {group.statuses.length > 0 ? (
                            group.statuses.map((status) => (
                                <li key={status.id}>
                                    {status.id} - {status.completed ? 'Done' : 'Not Done'}
                                </li>
                            ))
                        ) : (
                            <li>No status available</li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default GroupsMake;
