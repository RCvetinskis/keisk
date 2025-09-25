import { getCurrentInternalUser } from "@/lib/services/user-services";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

const useCurrentInternalUser = () => {
  const [currentIternalUser, setCurrentIternalUser] = useState<User | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentInternalUser();
      setCurrentIternalUser(userData);
    };

    fetchUser();
  }, []);

  return currentIternalUser;
};

export default useCurrentInternalUser;
