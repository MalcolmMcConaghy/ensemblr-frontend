import { FormEvent, useContext, useEffect, useState } from "react";
import { loginFields } from "../constants/formFields";
import Input from "./input";
import { useQuery } from "react-query";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/LoginModalContext";

const fields = loginFields;
const fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function LoginForm() {
  const [loginState, setLoginState] = useState(fieldsState);
  const { setUser } = useContext(UserContext);
  const { setIsLoginModalOpen } = useContext(ModalContext);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      [(e.target as HTMLInputElement).id]: (e.target as HTMLInputElement).value,
    });
  };

  const postLogin = async () => {
    const res = await fetch("http://localhost:3000/api/v1/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: loginState.email_address,
        password: loginState.password,
      }),
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error();
    }
  };

  const { isLoading, error, data, refetch } = useQuery<{
    data: [{ name: string; email: string }];
  }>("postLogin", postLogin, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void refetch();
  };

  useEffect(() => {
    if (!data || error) return;
    console.log(data);
    setUser({ ...data.data });
    setIsLoginModalOpen(false);
  }, [data]);

  if (isLoading) return "Loading...";

  return (
    <form className="mt-8 space-y-6" onSubmit={(e) => onSubmit(e)}>
      {error instanceof Error && (
        <div className="text-red-600 text-center">Invalid credentials</div>
      )}
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Log in
        </button>
      </div>
    </form>
  );
}
