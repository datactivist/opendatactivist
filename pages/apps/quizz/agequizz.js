import { useEffect, useState } from 'react';
import { supabase } from "../../../utils/supabaseClient";
import { useRouter } from 'next/router';
import styles from '../../../styles/Account.module.css';
import LayoutFocus from '../../../components/LayoutFocus';

export default function Quizz() {
    const [user, setUser] = useState(null);
    const [age, setAge] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const { data, error } = await supabase.auth.getUser();
    
            if (error) {
                console.error("Error fetching user:", error.message);
                if (data) {
                    console.log("User data:", data);
                }
            } else if (data) {
                setUser(data.user); // Adjusted this line
            } else {
                router.push('/auth/login');
            }
        }
    
        fetchUser();
    }, []);    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(!age || !user?.email) return;
    
        const { data, error } = await supabase
            .from('quizz')
            .insert([
                { email: user.email, age: parseInt(age) }
            ]);
         
         if (error) {
             console.error("Error inserting data:", error.message, error.details);
         } else {
             console.log("Data saved:", data);
         }
         
    }

    return (
        <LayoutFocus>
            <div className={styles.container}>
                <h1>Quizz</h1>
                {user && (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <p>Email: {user.email}</p>
                            <label htmlFor="age">How old are you?</label>
                            <input 
                                id="age" 
                                type="number" 
                                value={age} 
                                onChange={e => setAge(e.target.value)} 
                                required 
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                )}
            </div>
        </LayoutFocus>
    );
}
