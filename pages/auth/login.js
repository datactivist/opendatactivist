import { useState } from 'react';
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from 'next/router'; // Import the useRouter hook

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Instantiate the useRouter hook

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Error logging in:", error.message);
    } else {
      // Redirect to /access/test upon successful login
      router.push('/docs');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password" 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
