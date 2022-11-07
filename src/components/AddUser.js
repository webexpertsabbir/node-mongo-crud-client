import React, { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({});
    const handelUser = (event) =>{
        event.preventDefault();
        console.log(user)
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                alert('User Added Successfully')
                event.target.reset()
            }
        })


    }

    const handelInputBlur = event =>{
        const value = event.target.value;
        const field = event.target.name;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser)
    }

    return (
        <div>
            <h2>Please Add New User</h2>
            <form onSubmit={handelUser}>
                <input onChange={handelInputBlur} type="text" name='name' placeholder='Name' required />
                <br />
                <input onChange={handelInputBlur} type="text" name='addres' placeholder='Address' required />
                <br />
                <input onChange={handelInputBlur} type="email" name="email" id="" placeholder='Email' required />
                <br />
                <button type='submit'>Add User</button>
            </form>
        </div>
    );
};

export default AddUser;