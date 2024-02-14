import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {baseUrl} from '../contexts/baseUrl';

export function useEmailSender() {
  const router = useRouter();
  const [recoverCode, setRecoverCode] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const [message, setEmailMessage] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(true); // Estado para verificar se o código é válido
  const [enteredCode, setEnteredCode] = useState(""); // Novo estado para armazenar o código digitado

  async function sendEmail(data: any) {
    const { email } = data;
    Cookies.set("resetEmail", email, { expires: 0.5 });

    async function getUsers() {
      const response = await fetch(`${baseUrl}/users`);
      const result = await response.json();
      return result;
    }

    const users = await getUsers();
    const emailExists = users.find((item: any) => item.email === data.email);

    if (emailExists) {
      const confirmationCode = (() =>
        Math.floor(Math.random() * 1e6)
          .toString()
          .padStart(6, "0"))();

      setRecoverCode(confirmationCode);

      try {
        const response = await fetch(`${baseUrl}/password/sendEmail`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, confirmationCode }),
        });

        const result = await response.json();
        setEmailSend(true);
        setEmailMessage(result);
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  }
  const verifyCode = () => {
    if (enteredCode === recoverCode) {
      setIsCodeValid(true);

      router.push("/reset-password");
    } else {
      setIsCodeValid(false);
      console.log("CÓDIGO INVÁLIDO");
    }
  };

  return { sendEmail, recoverCode, emailSend, message, isCodeValid, enteredCode, setEnteredCode, verifyCode };
}
