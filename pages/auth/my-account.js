import { useEffect, useState } from 'react';
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from 'next/router';
import styles from '../../styles/Account.module.css';
import LayoutFocus from '../../components/LayoutFocus';

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error("Error fetching user:", error.message);
      } else if (data) {
        setUser(data.user);
      } else {
        router.push('/auth/login');
      }
    }
    
    fetchUser();
  }, []);

  return (
    <LayoutFocus>
    <div className={styles.container}>
        <h1>Mon compte</h1>
        {user && (
            <div>
                <p>Email: {user.email}</p>
            </div>
        )}
    </div>
    </LayoutFocus>
  );
}
