import { FormEvent, useContext, useEffect, useState } from "react";
import { loginFields } from "../../constants/formFields";
import Input from "../atom/input";
import { useQuery, useQueryClient } from "react-query";
import { UserContext, UserContextType } from "../../context/UserContext";
import {
  ModalContext,
  ModalContextType,
} from "../../context/LoginModalContext";
import { AxiosData, request } from "../../api/request";

type FieldsState = {
  email_address: string;
  password: string;
};

type UserData = {
  name: string;
  email: string;
};

const fields = loginFields;
const fieldsState = {} as FieldsState;
fields.forEach((field) => (fieldsState[field.id as keyof FieldsState] = ""));

export default function LoginForm() {
  const queryClient = useQueryClient();
  const [loginState, setLoginState] = useState(fieldsState);
  const { setUser } = useContext(UserContext) as UserContextType;
  const { setIsLoginModalOpen } = useContext(ModalContext) as ModalContextType;

  const invalidateLoginQuery = () => {
    queryClient.removeQueries({ queryKey: ["postLogin"] });
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      [(e.target as HTMLInputElement).id]: (e.target as HTMLInputElement).value,
    });
  };

  const postLogin = async () => {
    const { data } = await request<AxiosData<UserData>>({
      url: "/admin/login",
      method: "post",
      data: {
        email: loginState.email_address,
        password: loginState.password,
      },
    });

    return data;
  };

  const { isLoading, error, data, refetch } = useQuery<UserData>(
    "postLogin",
    postLogin,
    {
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void refetch();
  };

  useEffect(() => {
    if (!data || error) return;
    setUser(data);
    setIsLoginModalOpen(false);
    void invalidateLoginQuery();
  }, [data]);

  if (isLoading) {
    return <div className="text-center">Logging in</div>;
  }

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
          Log in
        </button>
      </div>
    </form>
  );
}
