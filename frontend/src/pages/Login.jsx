import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState("Логин");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    //   try {
    //     if (currentState === "Sign Up") {
    //       const response = await axios.post(backendUrl + "/api/user/register", {
    //         name,
    //         email,
    //         password,
    //       });
    //       if (response.data.succes) {
    //         setToken(response.data.token);
    //         localStorage.setItem("token", response.data.token);
    //       } else {
    //         toast.error(response.data.message);
    //       }
    //     } else {
    //       const response = await axios.post(backendUrl + "/api/user/login", {
    //         email,
    //         password,
    //       });
    //       if (response.data.succes) {
    //         setToken(response.data.token);
    //         localStorage.setItem("token", response.data.token);
    //       } else {
    //         toast.error(response.data.message);
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     toast.error(error.message);
    //   }
  };

  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Логин" ? (
        ""
      ) : (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Имя"
          required
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="your@email.com"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Пароль"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Забыли пароль?</p>
        {currentState === "Логин" ? (
          <p
            onClick={() => setCurrentState("Регистрация")}
            className="cursor-pointer"
          >
            Создать аккаунт
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Логин")}
            className="cursor-pointer"
          >
            Логин
          </p>
        )}
      </div>

      <button className="bg-accent text-white font-light px-8 py-2 mt-4">
        {currentState === "Логин" ? "Войти" : "Зарегистрироваться"}
      </button>
    </form>
  );
};

export default Login;
