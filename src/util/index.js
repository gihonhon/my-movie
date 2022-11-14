import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(3).required("Required"),
});

export const registerScheme = yup.object().shape({
    firstName: yup.string("Please Input valid name").required("Required"),
    lastName: yup.string("Please input valid name").required("Required"),
    email: yup.string().email("Please input valid email").required("Required"),
    password: yup.string().min(3).required("Required"),
    passConf: yup.string().oneOf([yup.ref("password"), null], "Please check your password again").required("Required"),
});
