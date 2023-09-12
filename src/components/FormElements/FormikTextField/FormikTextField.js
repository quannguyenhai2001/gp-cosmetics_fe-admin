import React, { memo } from "react";

import { TextField } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { get } from "lodash";

const FormikTextField = ({
    label,
    id,
    name,
    variant = "filled",
    disabled,
    ...props
}) => {
    const { errors, touched, values, handleBlur, handleChange } =
        useFormikContext();

    const error = get(errors, name) && get(touched, name);
    const errorText = get(errors, name);

    return (
        <Field
            disabled={disabled}
            component={TextField}
            onChange={handleChange}
            onBlur={handleBlur}
            id={id || name}
            name={name}
            variant={variant}
            error={!!error}
            helperText={error && errorText}
            value={get(values, name) || ""}
            autoComplete="off"
            label={label}
            {...props}
        />
    );
};

export default memo(FormikTextField);