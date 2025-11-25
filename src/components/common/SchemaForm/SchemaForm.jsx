import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { validatorsUtils } from "./utils";

const getDefaultForType = (type) => {
  if (type === "checkbox") return false;
  if (type === "number") return 0;
  return ""; // text/email/password/textarea/select
};

const generateYupSchema = (schema) => {
  const shape = {};

  schema.forEach((field) => {
    // allow custom validator from field.validate (a Yup schema)
    if (field.validate && Yup.isSchema(field.validate)) {
      shape[field.name] = field.validate;
      return;
    }

    if (validatorsUtils?.[field.validatorKey]) {
      shape[field.name] = validatorsUtils?.[field.validatorKey](field);
      return;
    }

    let validator;
    // choose base validator by type
    if (field.type === "number") validator = Yup.number();
    else if (field.type === "checkbox") validator = Yup.boolean();
    else validator = Yup.string();

    // required
    if (field.required) {
      validator = validator.required(
        `${field.label || field.name} is required`
      );
    } else {
      // allow null/undefined for optional numeric/boolean fields
      if (field.type === "number") validator = validator.nullable();
      if (field.type === "checkbox") validator = validator.nullable();
    }

    // password min length example (you can extend via field.min)
    if (field.type === "password" && field.min) {
      validator = validator.min(field.min, `Minimum ${field.min} characters`);
    }

    shape[field.name] = validator;
  });

  return Yup.object().shape(shape);
};

export default function SchemaForm({
  schema = [],
  onSubmit = (v) => console.log("submit", v),
  initialValuesOverride = null,
  submitLabel = "Submit",
  submitLoader = false,
}) {
  // Build initialValues from schema.defaultValue (or fallback)
  const initialValues = schema.reduce((acc, field) => {
    const key = field.name;
    if (
      initialValuesOverride &&
      Object.prototype.hasOwnProperty.call(initialValuesOverride, key)
    ) {
      acc[key] = initialValuesOverride[key];
      return acc;
    }

    if (Object.prototype.hasOwnProperty.call(field, "defaultValue")) {
      acc[key] = field.defaultValue;
      return acc;
    }

    acc[key] = getDefaultForType(field.type);
    return acc;
  }, {});

  const validationSchema = generateYupSchema(schema);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, helpers) => {
        try {
          helpers.setSubmitting(true);
          await onSubmit(values, helpers);
          helpers.setSubmitting(false);
        } catch (err) {
          // optionally set form-level error: helpers.setStatus({ error: '...' })
          console.error(err);
        } finally {
          helpers.setSubmitting(false);
        }
      }}
      enableReinitialize={true} // picks up new defaults when schema/initialValuesOverride changes
    >
      {({ isSubmitting, values }) => (
        <Form className="space-y-4">
          {console.log({ submitLoader })}
          <fieldset className="fieldset  py-4">
            {/* <legend className="fieldset-legend">Login</legend> */}
            {schema.map((field) => {
              const key = field.name;
              const commonClass = "input input-bordered w-full mt-2 mb-1";

              // render by type
              if (field.type === "textarea") {
                return (
                  <div key={key}>
                    <label className="label">
                      <span className="label-text">{field.label}</span>
                    </label>
                    <Field
                      as="textarea"
                      name={key}
                      placeholder={field.label}
                      className={commonClass}
                    />
                    <ErrorMessage name={key}>
                      {(msg) => (
                        <p className="text-xs text-error mt-1">{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>
                );
              }

              if (field.type === "select") {
                return (
                  <div key={key}>
                    <label className="label">
                      <span className="label-text">{field.label}</span>
                    </label>
                    <Field as="select" name={key} className={commonClass}>
                      <option value="">
                        {field.placeholder || `Select ${field.label}`}
                      </option>
                      {(field.options || []).map((opt) => (
                        <option key={opt.value ?? opt} value={opt.value ?? opt}>
                          {opt.label ?? opt}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name={key}>
                      {(msg) => (
                        <p className="text-xs text-error mt-1">{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>
                );
              }

              if (field.type === "checkbox") {
                return (
                  <div key={key} className="flex items-center gap-2">
                    <Field type="checkbox" name={key} className="checkbox" />
                    <label className="label-text">{field.label}</label>
                    <ErrorMessage name={key}>
                      {(msg) => (
                        <p className="text-xs text-error mt-1">{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>
                );
              }

              // default: input (text/email/password/number)
              return (
                <div key={key}>
                  <label className="label">{field.label}</label>
                  <Field
                    name={key}
                    type={field.type || "text"}
                    placeholder={field.placeholder || field.label}
                    className={commonClass}
                  />
                  <ErrorMessage name={key}>
                    {(msg) => <p className="text-xs text-error mt-1">{msg}</p>}
                  </ErrorMessage>
                </div>
              );
            })}

            <button
              type="submit"
              className={`btn btn-primary w-full ${
                submitLoader ? "btn-disabled" : ""
              }`}
              disabled={submitLoader}
            >
              {submitLoader ? "Submitting..." : submitLabel}
            </button>
            <pre className=" absolute top-120  text-xs mt-2">
              {JSON.stringify(values, null)}
            </pre>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
}
