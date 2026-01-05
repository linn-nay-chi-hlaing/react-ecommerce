import { useEffect, useState } from "react";
import {
  type AdminStaffProps,
  type AdminUserProps,
} from "./components/admin/AdminData";

export function useLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<
    AdminStaffProps | AdminUserProps | null
  >(null);

  useEffect(() => {
    const savedStaff = localStorage.getItem("loggedInStaff");
    if (savedStaff) {
      setIsLoggedIn(JSON.parse(savedStaff));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("loggedInStaff", JSON.stringify(isLoggedIn));
    } else {
      localStorage.removeItem("loggedInStaff");
    }
  }, [isLoggedIn]);

  return { isLoggedIn, setIsLoggedIn };
}
