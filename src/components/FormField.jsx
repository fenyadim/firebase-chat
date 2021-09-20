import React from 'react';
import { Field } from "formik";
import { Input } from "reactstrap";

const FormField = ({name}) => {
  return (
    <Field name={name}>
      {({
          field,
        }) => (
        <div>
          <Input type="text" {...field} />
        </div>
      )}
    </Field>
  );
};

export default FormField;
