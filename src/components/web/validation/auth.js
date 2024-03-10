import * as yup from "yup";

export const registerSchema = yup.object({
  userName: yup
    .string()
    .required("username is required")
    .min(3, "must be at least 3 characters")
    .max(15, "must be at most 15 characters"),
  email: yup.string().required("email is required").email(),
  password: yup
    .string()
    .required("password is required")
    .min(3, "must be at least 3 characters")
    .max(15, "must be at most 15 characters"),
});

export const loginSchema = yup.object({
  email: yup.string().required("email is required").email(),
  password: yup
    .string()
    .required("password is required")
    .min(3, "must be at least 3 characters")
    .max(15, "must be at most 15 characters"),
});

export const sendCodeSchema = yup.object({
  email: yup.string().required("email is required").email(),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().required("email is required").email(),
  password: yup
    .string()
    .required("password is required")
    .min(3, "must be at least 3 characters")
    .max(15, "must be at most 15 characters"),
  code: yup
    .string()
    .required("code is required")
    .length(4, "must be at least 4 characters"),
});

export const installOrderSchema = yup.object({
  couponName: yup.string(),
  address: yup
    .string()
    .required("address is required")
    .min(3, "must be at least 3 characters")
    .max(15, "must be at most 15 characters"),
  phone: yup.number().integer().required("phone is required"),
});

export const createReviewSchema = yup.object({
  comment: yup
    .string()
    .required("comment is required")
    .min(3, "must be at least 1 character")
    .max(15, "must be at most 15 characters"),
  rating: yup.number().required("review is required"),
});
