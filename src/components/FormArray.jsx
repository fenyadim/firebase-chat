import React from 'react';
import { FieldArray } from "formik";
import { Button } from "reactstrap";
import { FormField } from "./index";

const FormArray = ({values, nameArr, title}) => {
  return (
    <div className='mb-3'>
      <label>{title}:</label>
      <FieldArray
        name={nameArr}
        render={({remove, push}) => (
          <div>
            {values[nameArr] && values[nameArr].length > 0 && values[nameArr].map((item, index) => (
              <div className='d-flex mt-2' key={index}>
                <FormField name={`${nameArr}.${index}`}/>
                <Button
                  className='ms-3'
                  type='button'
                  onClick={() => remove(index)}>
                  -
                </Button>
              </div>
            ))}
            <Button
              className='mt-2'
              type='button'
              onClick={() => push('')}
            >
              Добавить ещё
            </Button>
          </div>
        )}
      />
    </div>
  );
};

export default FormArray;
