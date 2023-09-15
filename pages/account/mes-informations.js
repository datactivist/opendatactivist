import { useEffect, useState } from 'react';
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from 'next/router';
import styles from '../../styles/Account.module.css';
import LayoutFocus from '../../components/LayoutFocus';
import AccountPannel from '../../components/nav/AccountPannel'
export default function MyAccount() {
const [user, setUser] = useState(null);
const router = useRouter();
const [isMenuVisible, setIsMenuVisible] = useState(true);
const toggleMenuVisibility = () => {
setIsMenuVisible(prev => !prev);
}
useEffect(() => {
async function fetchUser() {
const { data, error } = await supabase.auth.getUser();
console.log('Fetched user data:', data);
console.log('Fetched user error:', error);
if (error) {
console.error("Error fetching user:", error.message);
router.push('/auth/login');
} else if (data && data.user && data.user.email) {
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
<AccountPannel isVisible={isMenuVisible} toggleVisibility={toggleMenuVisibility} />
<div className={styles.mainContent}>
<h1>Mes informations</h1>
{user && (
<div className={styles.userDetails}>
<span className={styles.fieldName}>✉️ Adresse e-mail:</span>
<span className={styles.emailBox}>{user.email}</span>
</div>
)}
</div>
</div>
</LayoutFocus>
);
}
