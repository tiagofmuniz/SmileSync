import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import {baseUrl} from '../../../baseUrl';

export function RegisterAndLogin() {
  const router = useRouter();
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(3);

  const createUser = async (data: any) => {
    const { name, email, password } = data;

    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        setOutput(JSON.stringify(result.message));

        const userLogin = async () => {
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

            if (response.ok) {
              const result = await response.json();
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
                    let intervalId: NodeJS.Timeout;
                    intervalId = setInterval(() => {
                      setCountdown((prevCountdown) => {
                        if (prevCountdown > 1) {
                          setMessage(`Redirecionando para o sistema em ${prevCountdown} segundos...`);
                          return prevCountdown - 1;
                        } else {
                          clearInterval(intervalId);
                          setMessage("");
                          router.push(resultAuth.redirectTo);
                          return 0;
                        }
                      });
                    }, 1000);
                  }
                } catch (error) {
                  // Tratamento de erro
                }
              }
            } else {
              setOutput("Dados de acesso incorretos");
            }
          } catch (error) {
            setOutput("Dados de acesso incorretos");
            console.log(error);
          }
        };
        userLogin();
      } else {
        setOutput("Email já cadastrado");
      }
    } catch (error) {
      setOutput("Email já cadastrado");
      // console.log(error);
    }
  };
  return { createUser, output, message };
}
