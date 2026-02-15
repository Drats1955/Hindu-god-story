import React, { useState } from 'react';

const App = () => {
    const [selectedGod, setSelectedGod] = useState('');
    const [userName, setUserName] = useState('');
    const [story, setStory] = useState('');

    const gods = ['Krishna', 'Ganesh', 'Shiva'];

    const handleGodSelect = (event) => {
        setSelectedGod(event.target.value);
        // You might fetch a story based on the selected god here
        setStory(`Here is the story of ${event.target.value}`);
    };

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can add functionality to store or utilize the user's name
        alert(`Hello, ${userName}!`);
    };

    return (
        <div>
            <h1>Select Your Favorite Hindu God</h1>
            <form onSubmit={handleSubmit}>
                <select value={selectedGod} onChange={handleGodSelect}>
                    <option value="">Select a God</option>
                    {gods.map((god) => (
                        <option key={god} value={god}>{god}</option>
                    ))}
                </select>
                <br />
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={userName} 
                    onChange={handleNameChange} 
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <h2>Selected God: {selectedGod}</h2>
            <p>{story}</p>
        </div>
    );
};

export default App;