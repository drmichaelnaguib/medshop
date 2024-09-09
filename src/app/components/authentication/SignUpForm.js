import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { alertActions } from "@/app/redux/slices/alert-slice";
import app from "@/app/services/InitializeFirebase";
import Link from "next/link";

export default function SignUpForm() {
  // states
  const [submittingForm, setSubmittingForm] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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

  // const formSubmitHandler = (data) => {
  //   setSubmittingForm(true);
  //   const auth = getAuth(app);
  //   createUserWithEmailAndPassword(auth, data.email, data.password)
  //     .then((userCredential) => {
  //       // Signed up
  //       const user = userCredential.user;
  //       // ...
  //       console.log(user);
  //       user.getIdToken().then((token) => {
  //         localStorage.setItem("userToken", token);
  //         dispatch(
  //           alertActions.showAlert({
  //             type: "success",
  //             message: "Welcome to MedShop!",
  //           })
  //         );
  //         router.push("/");
  //       });
  //     })
  //     .catch((error) => {
  //       // const errorCode = error.code; -3shan a3raf no3 el error ex. 404 not found, 401 unAuthorized etc-
  //       const errorMessage = error.message;
  //       dispatch(
  //         alertActions.showAlert({
  //           type: "error",
  //           message: errorMessage,
  //         })
  //       );
  //       // ..
  //     })
  //     .finally(() => setSubmittingForm(false));
  // };
  const formSubmitHandler = (data) => {
    const submitForm = async () => {
      try {
        setSubmittingForm(true);
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(
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
            message: "Welcome to MedShop!",
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
      <h2
        style={{
          color: "#495057",
          textAlign: "center",
          fontFamily: "__Inter_36bd41",
          font: "500",
        }}
      >
        Sign Up
      </h2>

      <Form onSubmit={handleSubmit(formSubmitHandler)} className="w-50 ">
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex flex-column align-items-center justify-content-center ">
          <Button variant="primary" type="submit" disabled={submittingForm}>
            {submittingForm ? (
              <Spinner animation="border" variant="dark" size="sm" />
            ) : (
              "Submit"
            )}
          </Button>
          <Link href="/log-in">
            <Form.Text className="text-muted">
              Already a member? LogIn instead.
            </Form.Text>
          </Link>
        </div>
      </Form>
    </div>
  );
}
