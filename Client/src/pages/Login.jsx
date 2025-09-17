import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { base_url } from "../config/base_url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    try {
      axios
        .post(`${base_url}/api/users/login`, data)
        .then((response) => {
          if (response.status === 200 && response.data.success === true) {
            toast.success(response.data.message || "Login successful");
            navigate("/");
          }
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message || "Login failed. Please try again."
          );
        });
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-100">
      <div className="p-5">
        <Typography variant="h6" mb={2}>
          Login Page
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "email is required" }}
            render={({ field, fieldState }) => (
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="text"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "password is required" }}
            render={({ field, fieldState }) => (
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#ffc400" }}
          >
            ADD
          </Button>
        </form>
        <div>
          <p>Don't have an account?</p>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
