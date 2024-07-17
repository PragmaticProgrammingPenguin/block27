import { useState } from "react";

export default function SignUpForm( {setToken} ) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(event){
        event.preventDefault();
        try{
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup");
            const result = await response.json();
            setToken(result.token)
            console.log(result);
        } catch {
            setError(error.message);
        }
    }
    
    return (
        <>        
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button>Submit</button>
            </form>
        </>
    );
}