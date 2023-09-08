import { useEffect, useState } from 'react';
import { supabase } from "../../utils/supabaseClient";

export default function TestAccess() {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Check if there's an active session upon loading the component
        const checkSession = async () => {
            const session = supabase.auth.getSession();
            
            if (session) {
                setLoggedIn(true);
            }
            
            setLoading(false);
        };
        
        checkSession();

        // Listen for authentication state changes
        const authListener = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Event:", event);
            console.log("Session:", session);
            
            if (event === 'SIGNED_IN' || session) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
            setLoading(false);
        });
        
        // Cleanup: Unsubscribe from the auth changes when component is unmounted
        return () => {
            if (authListener && typeof authListener.unsubscribe === 'function') {
                authListener.unsubscribe();
            }
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {loggedIn ? "You are logged in" : "You need to log in"}
        </div>
    );
}
