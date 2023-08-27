// Save a user to database 

export const saveUser = user => {
    const currentUser = {
        email: user.email
    }

    fetch(`https://assignment-10-chef-server.vercel.app/users/${user?.email}`, {
        method: "PUT",
        header: {
            "content-type": 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err.message);
        })
}