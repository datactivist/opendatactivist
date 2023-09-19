import { useEffect, useState } from 'react';
import { supabase } from "../../utils/supabaseClient";
import styles from '../../styles/Account.module.css';
import LayoutFocus from '../../components/LayoutFocus';
import AccountPannel from '../../components/nav/AccountPannel';
import DataPosition from '../../components/account/challenges/DataPosition';

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const [hasData, setHasData] = useState(false); // Add this state

  const [isMenuVisible, setIsMenuVisible] = useState(true); 
  const toggleMenuVisibility = () => {
    setIsMenuVisible(prev => !prev);
  }

  useEffect(() => {
    async function fetchUser() {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
            console.error("Error fetching user:", error.message);
        } else if (data) {
            setUser(data.user);
        }
    }
    
    fetchUser();
}, []);

  return (
    <LayoutFocus>
      <div className={styles.container}>
        <AccountPannel isVisible={isMenuVisible} toggleVisibility={toggleMenuVisibility} />
        <div className={styles.mainContent}>
          <h1>Mes challenges</h1>
          <div className={styles.gallery}>
          {user && 
            <div className={styles.card}>
                {hasData ? 
                <img src="/icons/task-done.svg" alt="Done Icon" className={styles.todoIcon} /> 
                : 
                <img src="/icons/task-todo.svg" alt="To Do Icon" className={styles.todoIcon} />
                }
                <DataPosition user={user} reportHasData={setHasData} />
            </div>
            }
          </div>
        </div>
      </div>
    </LayoutFocus>
  );
}
