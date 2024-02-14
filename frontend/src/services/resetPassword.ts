import { resetFormData } from "@/hooks/types/resetFormData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {baseUrl} from '../../../baseUrl';
console.log(baseUrl)


export function UseResetPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function resetPassword(data: resetFormData) {
    try {
      const { email, confirmPassword } = data;

      // Request reset token
      const requestResetResponse = await fetch(`${baseUrl}/password/request-reset`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!requestResetResponse.ok) {
        const result = await requestResetResponse.json();
        setErrorMessage(result.error);
        return;
      }

      // Reset password using the received token
      const result = await requestResetResponse.json();
      const resetResponse = await fetch(`${baseUrl}/password/reset/${result.resetToken}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, confirmPassword }),
      });

      if (resetResponse.ok) {
        const resultReset = await resetResponse.json();
        setSuccess(resultReset.message);
        router.push("/login");
      } else {
        const resultReset = await resetResponse.json();
        setErrorMessage(resultReset.error);
      }
    } catch (error) {
      setErrorMessage("Erro no servidor. Tente novamente mais tarde!");
    }
  }
  return { resetPassword, errorMessage, success };
}
