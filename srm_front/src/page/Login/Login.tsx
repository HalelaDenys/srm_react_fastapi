import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Простий приклад перевірки (тут буде API)
    if (email === "test@example.com" && password === "123456") {
      localStorage.setItem("token", "your_jwt_token");
      navigate("/");
    } else {
      setError("Невірний email або пароль");
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["login-container"]}>
        <h2 className="text-2xl mb-4">Вхід</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            className={styles["input"]}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
