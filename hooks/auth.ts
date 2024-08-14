import { useEffect, useState } from "react";
import { onAuthStateChanged,User } from "firebase/auth";
import { auth } from "@/firebase";

const useAuth = () => {
  const [user, setUser] = useState <User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;