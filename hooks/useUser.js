// hooks/useUser.js
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function useUser() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      } else if (data) {
        setUser(data);
      } else {
        router.push('/auth/login');
      }
    }

    fetchUser();
  }, []);

  return { user };
}
