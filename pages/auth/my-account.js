import { useEffect, useState } from 'react';
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from 'next/router';
import styles from '../../styles/Account.module.css';
import LayoutFocus from '../../components/LayoutFocus';

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const [profileName, setProfileName] = useState("");
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

  async function fetchProfile() {
    if (user) {
      let { data, error } = await supabase
        .from('dataposition')
        .select('profile')
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .limit(1);
  
      if (error) {
        console.error("Error fetching profile:", error.message);
      } else if (data && data.length > 0) {
        setProfileName(data[0].profile);
      }
    }
  }
  

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <LayoutFocus>
      <div className={styles.container}>
        <h1>Mon compte</h1>
        {user && (
            <div>
                <p>Email: {user.email}</p>
                {profileName && (
                  <p>Profil: {profileName}</p>
                )}
            </div>
        )}
      </div>
    </LayoutFocus>
  );
}
