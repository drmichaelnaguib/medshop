"use client";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { alertActions } from "@/app/redux/slices/alert-slice";
import { addDoc, collection } from "firebase/firestore";
import db from "@/app/firebase/database";
import { ref, uploadBytes } from "firebase/storage";
import storage from "@/app/firebase/storage";

export default function CreateProductPage() {
  // states
  const [submittingForm, setSubmittingForm] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  console.log(uploadedFile);

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
      title: "",
      image: "",
    },
  });
  // uploading file
  const addImageHandler = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  // Submit Form
  const formSubmitHandler = (data) => {
    const submitForm = async () => {
      try {
        // hena save product data to firebase database
        const response = await addDoc(collection(db, "supplies"), data);
        console.log(response);

        // after saving data firebase will return the created product(with a unique id)
        // we will use the id to create a folder using the product id as the folder name
        const extension = uploadedFile?.name.split(".").pop();
        const storageRef = ref(storage, `supplies/${response.id}.${extension}`);
        // 'file' comes from the Blob or File API
        const snapshot = await uploadBytes(storageRef, uploadedFile);
        console.log(snapshot);

        dispatch(
          alertActions.showAlert({
            type: "success",
            message: "valid input",
          })
        );
        router.push("/admin/products");
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
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Product Title</Form.Label>
          <Controller
            control={control}
            name="title"
            render={({ field }) => {
              return (
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter title"
                  // isInvalid={!!errors.title}
                  {...field}
                />
              );
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Product Image</Form.Label>
          <Controller
            control={control}
            name="image"
            render={({ field }) => {
              return (
                <Form.Control
                  controlId="formFile"
                  className="mb-3"
                  type="file"
                  onChange={addImageHandler}
                  // isInvalid={!!errors.image}
                  // {...field}
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
              "Add Product"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
