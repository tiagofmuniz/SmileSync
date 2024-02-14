
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {baseUrl} from '../contexts/baseUrl';

export function Login() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function userLogin(data: any) {
    const { email, password } = data;

    try {
      // Requisição para login
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        const token = result.token;

        if (token) {
          try {
            // Requisição para rota autenticada
            const responseAuth = await fetch(`${baseUrl}/auth/rotaAutenticada`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });

            const resultAuth = await responseAuth.json();

            if (resultAuth.statusCode === 200) {
              Cookies.set("auth_token", token);
              Cookies.set("user_email", email);
              router.push(resultAuth.redirectTo);
            }
          } catch (error) {
            // Tratamento de erro
          }
        }

      } else {
        setMessage(result.message);
        
      }
    } catch (error) {
      setMessage("Erro no login. Tente novamente mais tarde!");
      console.log(error);

    }
  }
  return { userLogin, message };
}
