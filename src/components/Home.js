import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);
    const handelDelete = user => {
        const agree = window.confirm(`Are You sure want to delete: ${user.name}`);
        console.log(agree)
        if (agree) {
            // console.log('deleting user with id', user._id);
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.deletedCount > 0) {
                        alert('use deleted successfully');
                        const remainingUser = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remainingUser);
                    }
                })

        }

    }
    return (
        <div>
            <h2>Users: {displayUsers.length}</h2>
            <div>
                {
                    displayUsers.map(user => <p key={user._id}>
                        {user.name} {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>
                                Update
                            </button>
                        </Link>
                        <button onClick={() => handelDelete(user)}
                        >X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;