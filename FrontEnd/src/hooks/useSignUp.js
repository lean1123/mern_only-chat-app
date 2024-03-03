import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const isPassed = checkInputs({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!isPassed) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;

function checkInputs({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields!");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must have 6 characters!");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password and ConfirmPassword doesn't match!");
    return false;
  }

  return true;
}
