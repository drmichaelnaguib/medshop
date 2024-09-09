"use client";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { alertActions } from "@/app/redux/slices/alert-slice";
import app from "@/app/firebase/app";

// initializing Firebase

export default function LogInForm() {
  // states
  const [submittingForm, setSubmittingForm] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // react hook form
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit Form
  const formSubmitHandler = (data) => {
    const submitForm = async () => {
      try {
        setSubmittingForm(true);
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem("userToken", token);

        dispatch(
          alertActions.showAlert({
            type: "success",
            message: "Welcome " + data.email,
          })
        );
        router.push("/");
      } catch (error) {
        const errorMessage = error.message;
        dispatch(
          alertActions.showAlert({
            type: "error",
            message: errorMessage,
          })
        );
      }
      setSubmittingForm(false);
    };
    submitForm();
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <Form onSubmit={handleSubmit(formSubmitHandler)} className="w-50 ">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Enter email"
                  isInvalid={!!errors.email}
                  {...field}
                />
              );
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Controller
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <Form.Control
                  size="lg"
                  type="Password"
                  placeholder="Enter Password"
                  isInvalid={!!errors.password}
                  {...field}
                />
              );
            }}
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" disabled={submittingForm}>
            {submittingForm ? (
              <Spinner animation="border" variant="dark" size="sm" />
            ) : (
              "Log In"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
