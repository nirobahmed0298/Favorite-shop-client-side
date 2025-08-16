import React from 'react';

const UseRole = () => {
    let [userRole, setData] = useState('')
    useEffect(() => {
        fetch('http://localhost:5001/users') // Replace with actual API URL
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);
    return (
        <div>

        </div>
    );
};

export default UseRole;