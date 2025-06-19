import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import login from "../../api/auth";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);


    try {
      const response = await login(phoneNumber, password);
      const token = response.access_token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setError("Невірний номер телефону або пароль");
      console.error(err);
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["login-container"]}>
        <h2 className="text-2xl mb-4">Вхід</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            className={styles["input"]}
            placeholder="+380 67 123 45 67"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="password"
            className={styles["input"]}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className={styles["btn"]}>
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
