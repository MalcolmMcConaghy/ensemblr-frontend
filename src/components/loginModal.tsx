import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { ModalContext, ModalContextType } from "../context/LoginModalContext";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";

export default function LoginModal() {
  const { setIsLoginModalOpen } = useContext(ModalContext) as ModalContextType;

  const [heading, setHeading] = useState("Login to your account");
  const [paragraph, setParagraph] = useState("Don't have an account yet?");
  const [linkName, setLinkName] = useState("Sign up");

  const changeFormType = () => {
    if (linkName === "Sign up") {
      setHeading("Sign up for an account");
      setParagraph("Already have an account?");
      setLinkName("Sign in");
    } else {
      setHeading("Login to your account");
      setParagraph("Don't have an account yet?");
      setLinkName("Sign up");
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px]">
        <div className="bg-white p-4 rounded flex flex-col">
          <button
            className="text-black text-size-xl place-self-end"
            onClick={() => setIsLoginModalOpen(false)}
          >
            X
          </button>
          <div className="mb-10">
            <div className="flex justify-center">
              <img
                alt=""
                className="h-14 w-14"
                src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
              {paragraph}{" "}
              <button
                className="font-medium text-primary"
                onClick={changeFormType}
              >
                {linkName}
              </button>
            </p>
          </div>
          {linkName === "Sign up" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>,
    document.querySelector("#modal-root")!
  );
}
