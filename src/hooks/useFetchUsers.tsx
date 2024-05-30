import { useState, useEffect } from "react";
import { User } from "../utils/types";

const useFetchUsers = (trigger: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        setError("Error fetching data: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trigger]);

  return { users, loading, error };
};

export default useFetchUsers;
