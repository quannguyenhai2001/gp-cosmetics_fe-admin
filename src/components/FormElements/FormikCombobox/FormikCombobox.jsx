import React, { memo } from "react";

import {
    FormControl,
    FormHelperText,
    Typography,
    Autocomplete,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Field, useFormikContext } from "formik";
import { get } from "lodash";

const FormikCombobox = ({
    fullWidth,
    label,
    id,
    name,
    variant = "outlined",
    options,
    placeholder,
    field,
    minWidth = "120px",
    sxPropsLabel,
    disableField = false,
    ...props
}) => {
    const { errors, touched, values, handleBlur, setFieldValue } =
        useFormikContext();
    const error = get(errors, name) && get(touched, name);
    const errorText = get(errors, name);

    const getOptionLabel = type => {
        const optionValue = options.find(option => option.value * 1 == type);
        return optionValue?.label;
    };
    return (
        <FormControl sx={{ minWidth: { minWidth } }} fullWidth={fullWidth}>
            {label && (
                <Typography mb={1} fontWeight="fontWeightMedium" sx={sxPropsLabel}>
                    <label htmlFor={`label-${id || name}`}>{label}</label>
                </Typography>
            )}
            <Field
                label=""
                disabled={disableField}
                component={Autocomplete}
                label_id={`label-${id || name}`}
                id={id || name}
                name={name}
                options={options}
                getOptionLabel={option =>
                    option.label || getOptionLabel(get(values, name)) || option.name || ""
                }
                isOptionEqualToValue={(option, value) => option?.id == value?.id}
                onBlur={handleBlur}
                onChange={(e, value) => {
                    setFieldValue(name, value?.value, false);
                    setTimeout(() => {
                        document.activeElement.blur();
                    }, 0);
                }}
                ListboxProps={{
                    style: {
                        maxHeight: "370px",
                    },
                }}
                value={get(values, name)}
                renderInput={params => (
                    <TextField
                        error={error}
                        {...params}
                        variant={variant}
                        label={placeholder}
                    />
                )}
                {...props}
            />

            {error && (
                <FormHelperText
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        transform: "translateY(100%)",
                        margin: 0,
                    }}
                    error
                >
                    {errorText}
                </FormHelperText>
            )}
        </FormControl>
    );
};
export default memo(FormikCombobox);