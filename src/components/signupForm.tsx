import { FormEvent, useContext, useEffect, useState } from "react";
import { signupFields } from "../constants/formFields";
import Input from "./input";
import { AxiosData, request } from "../api/request";
import { useQuery } from "react-query";
import { UserContext, UserContextType } from "../context/UserContext";
import { ModalContext, ModalContextType } from "../context/LoginModalContext";

type FieldsState = {
  name: string;
  email_address: string;
  password: string;
  confirm_password: string;
};

type UserData = {
  name: string;
  email: string;
};

const fields = signupFields;
const fieldsState = {} as FieldsState;
fields.forEach((field) => (fieldsState[field.id as keyof FieldsState] = ""));

export default function SignupForm() {
  const [loginState, setLoginState] = useState(fieldsState);
  const { setUser } = useContext(UserContext) as UserContextType;
  const { setIsLoginModalOpen } = useContext(ModalContext) as ModalContextType;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      [(e.target as HTMLInputElement).id]: (e.target as HTMLInputElement).value,
    });
  };

  const postUser = async () => {
    console.log(loginState);
    const { data } = await request<AxiosData<UserData>>({
      url: "/admin/register",
      method: "post",
      data: {
        name: loginState.name,
        email: loginState.email_address,
        password: loginState.password,
      },
    });

    return data;
  };

  const { isLoading, error, data, refetch } = useQuery<UserData>(
    "postUser",
    postUser,
    {
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginState.password !== loginState.confirm_password)
      return console.log(loginState);
    void refetch();
  };

  useEffect(() => {
    if (!data || error) return;
    console.log(data);
    setUser(data);
    setIsLoginModalOpen(false);
  }, [data]);

  if (isLoading) {
    return <div className="text-center">Signing up</div>;
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={(e) => onSubmit(e)}>
      {error instanceof Error && (
        <div className="text-red-600 text-center">Something went wrong</div>
      )}
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id as keyof FieldsState]}
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
          Sign up
        </button>
      </div>
    </form>
  );
}
