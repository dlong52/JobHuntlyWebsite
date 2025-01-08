import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";

const CustomFieldArray = ({ handleSubmit, Component }) => (
  <div>
    <h1>Friend List</h1>
    <Formik
      initialValues={{ friends: ["jared", "ian", "brent"] }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {(arrayHelpers) => (
              <div>
                {values.friends && values.friends.length > 0 ? (
                  values.friends.map((friend, index) => (
                    <div key={index}>
                      <Field name={`friends.${index}`} component={Component} />
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    Add a friend
                  </button>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  </div>
);

export default CustomFieldArray;
