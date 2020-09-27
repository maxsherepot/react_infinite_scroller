import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css"




function App() {

    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        
        if (scrollHeight - Math.floor(scrollTop) === clientHeight) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        const getUsers = page => {
            const data =
                fetch(`https://jsonplaceholder.typicode.com/posts/?_page=${page}&_limit=20`)
                    .then(response => response.json())
            return data;
        };

        const loadUsers = async () => {
            setLoading(true);
            const newUsers = await getUsers(page);

            setUsers((prev) => [...prev, ...newUsers]);
            setLoading(false);
        };

        loadUsers();
    }, [page]);


    return (
        <div className="container" >
            <div className="main" onScroll={handleScroll}>
                {
                    users.map((item) => {
                        return (
                            <li className="my-2 border list-group-item list-group-item-primary"
                                key={item.id}>{item.id} {item.title}</li>
                        )
                    })
                }
            </div>
            {loading && <h1>Loading ...</h1>}
        </div>
    )
};


export default App;




// function App() {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//         .then(response => response.json())
//         .then(json => console.log(json.map((item) => {return item.id})
//         ))
//     return <h1>sm</h1>
// }

// export default App;


