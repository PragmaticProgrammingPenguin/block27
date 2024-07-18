import { useState } from "react";

export default function SignUpForm( {setToken} ) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(event){
        event.preventDefault();
        if (!username || !password){
            alert("Please enter a valid username / password");
            return;
        }
        try{
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method:"POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if(result.success){
                setError(null);
                setUsername('');
                setPassword('');
                alert("Successfully signed up");
                setToken(result.token)
                console.log(result)
            }
        } catch (error){
            setError(error.message);
        }
    }
    
    return (
        <>        
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button onClick={(e) => {
                    if(username.length < 7 || username.length > 10){
                        e.preventDefault();
                        alert("Please enter username greater than 7 but less than 10.");
                    }
                }}>Submit</button>
            </form>
        </>
    );
}