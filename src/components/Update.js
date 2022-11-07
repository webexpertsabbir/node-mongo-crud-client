import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    // console.log(storedUser)
    const [user, setUser] = useState(storedUser);
    const handelUser = (event) =>{
        event.preventDefault();
        // console.log(user)
        fetch(`http://localhost:5000/users/${storedUser._id}`, {

            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('user updated')
            }
            console.log(data);
        })
    }



    const handelInputChange = event =>{
        const value = event.target.value;
        const field = event.target.name;
        const newUser = {...storedUser};
        newUser[field] = value;
        setUser(newUser)
    }
    return (

        <div>
            <h2>Please Update: {storedUser.name}</h2>
            <div>
            <form onSubmit={handelUser}>
                <input onChange={handelInputChange} defaultValue={storedUser.name} type="text" name='name' placeholder='Name' required />
                <br />
                <input onChange={handelInputChange} defaultValue={storedUser.addres} type="text" name='addres' placeholder='Address' required />
                <br />
                <input onChange={handelInputChange} defaultValue={storedUser.email} type="email" name="email" id="" placeholder='Email' required />
                <br />
                <button type='submit'>Update User</button>
            </form>
            </div>
        </div>
    );
};

export default Update;