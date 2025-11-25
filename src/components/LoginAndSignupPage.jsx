import { useDispatch } from "react-redux";
import useApiCall from "../hook/useApiCall";
import SchemaForm from "./common/SchemaForm/SchemaForm";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContainer";

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
  const [Loader, makeApiCall] = useApiCall();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="card p-6 w-full max-w-md">
        <div className="card card-border bg-base-100 w-96 shadow-lg rounded-box  border p-5">
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
                  console.log({ msg });
                  dispatch(addUser(msg.data?.data));
                  navigate("/");
                  showToast(msg?.data.message, "success");
                },
                onFailure: (msg) => {
                  console.log({ msg, ERROR: msg?.data.ERROR });
                  showToast(msg?.data.ERROR, "error");
                },
              });
            }}
            submitLoader={Loader}
          />
          {signup ? (
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          ) : (
            <p>
              New here?{" "}
              <Link to="/signup" className="text-primary font-semibold">
                Create an account
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
