import { useState } from 'react';
import { supabase } from "../../utils/supabaseClient";
import styles from '../../styles/Login.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAwaitingVerification, setIsAwaitingVerification] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      setIsAwaitingVerification(true);
    }
  };

  return (
    <div className={styles.container}>
      {isAwaitingVerification ? (
        <div className={styles.awaitingVerification}>
          En attente de vérification
        </div>
      ) : (
        <form onSubmit={handleSignUp} className={styles.form}>
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
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Créer mon compte</button>
          <div className={styles.registerPrompt}>
            Vous avez déjà un compte? 
            <span 
              className={styles.registerLink} 
              onClick={() => window.location.href="/auth/login"}>
              Connectez-vous ici
            </span>
          </div>
        </form>
      )}
    </div>
  );
}