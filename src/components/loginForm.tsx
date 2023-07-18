import { useState } from "react";
import { loginFields } from "../constants/formFields";
import Input from "./input";

const fields = loginFields;
const fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function LoginForm() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  return (
    <form className="mt-8 space-y-6">
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
          onSubmit={() => {
            return;
          }}
        >
          Log in
        </button>
      </div>
    </form>
  );
}
