import * as Yup from "yup";

export const validatorsUtils = {
  email: (field = {}) => {
    let v = Yup.string().email("Invalid email address");
    if (field.required)
      v = v.required(`${field.label || field.name} is required`);
    return v;
  },

  passwordStrong: (field = {}) => {
    const minLen = field.min || 8;
    let v = Yup.string()
      .min(minLen, `Password must be at least ${minLen} characters`)
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[^A-Za-z0-9]/, "Must contain at least one special character");

    if (field.required)
      v = v.required(field.messageRequired || "Password is required");
    return v;
  },
};

// export presets (optional)
