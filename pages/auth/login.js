import { useState } from 'react';
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Error logging in:", error.message);
      // Consider showing an error message to the user
    } else if (data && data.user) {
      router.push('/auth/my-account');
    }
  };

  const handleRegistrationRedirect = () => {
    router.push('/auth/register'); // Change this to your registration/sign-up page
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
          <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
          />
          <input 
              type="password" 
              placeholder="Mot de passe" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className={styles.input}
          />
          <button type="submit" className={styles.button}>Me connecter</button>
          <div className={styles.registerPrompt}>
              Vous n‘avez pas de compte?
              <span className={styles.registerLink} onClick={handleRegistrationRedirect}>Inscrivez-vous</span>
          </div>
      </form>
    </div>
  );
}