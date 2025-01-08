import { FastField, Field } from "formik";
import React from "react";

class FormikField extends React.PureComponent {
  render() {
    const WrapperComponent = this.props.isFastField ? FastField : Field;
    const { name, component, label, labelTop, ...props } = this.props;
    return (
      <WrapperComponent
        name={name}
        component={component}
        label={label}
        labelTop={labelTop}
        {...props}
      />
    );
  }
}

export default FormikField;
