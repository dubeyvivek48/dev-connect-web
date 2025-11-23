import useApiCall from "../hook/useApiCall";
import { useToast } from "../hook/useToast";
import SchemaForm from "./common/SchemaForm/SchemaForm";
import Toast from "./common/Toast";

const loginSchema = ({ signup }) => [
  ...((signup && [
    {
      name: "firstName",
      label: "first Name",
      required: true,
      type: "text",
      defaultValue: "vivek",
    },
    {
      name: "lastName",
      label: "Last Name",
      required: true,
      type: "text",
      defaultValue: "dubey",
    },
  ]) ||
    []),
  {
    name: "email",
    label: "Email",
    required: true,
    type: "email",
    validatorKey: "email",
    defaultValue: "dubeyvivek48@gmail.com",
  },
  {
    name: "password",
    label: "Password",
    required: true,
    type: "password",
    defaultValue: "Vivek@2024",
    validatorKey: "passwordStrong",
  },
];

export default function LoginPage({ signup = false }) {
  const [isSubmitting, makeApiCall] = useApiCall();
  const { toast, showToast } = useToast();
  console.log({ isSubmitting, makeApiCall });
  console.log(toast);
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="card p-6 w-full max-w-md">
        <div className="card card-border bg-base-100 w-96 shadow-lg rounded-box  border">
          <h6 className="text-2xl flex justify-center mt-3 mb-4 ">
            {signup ? "Sign in" : "Login"}
          </h6>

          <SchemaForm
            schema={loginSchema({ signup })}
            onSubmit={(values) => {
              // call API

              console.log("Login submit:", values);
              makeApiCall({
                ApiKey: signup ? "signup" : "login",
                method: "POST",
                payload: { ...values, emailId: values?.email },
                onSuccess: (msg) => {
                  showToast(msg?.data, "success");
                },
                onFailure: (msg) => {
                  showToast(msg?.ERROR, "error");
                },
              });
            }}
          />
          {toast?.message && <Toast {...toast} />}
        </div>
      </div>
    </div>
  );
}
