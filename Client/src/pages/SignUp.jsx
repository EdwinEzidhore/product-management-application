import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { base_url } from "../config/base_url";
import { toast } from "react-toastify";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {


  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    try {
      axios
        .post(`${base_url}/api/users/register`, data)
        .then((response) => {
          if (response.status === 201 && response.data.success === true) {
            toast.success(response.data.message || "Registration successful!");
          }
          if (response.data.success == true) {
            navigate('/login')
            reset();
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data.message);
          console.error("There was an error!", error);
        });
    } catch (error) {
      toast.error("Internal server erro occured!");
      console.error("catch error", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-100">
      <div className="p-5">
        <Typography variant="h6" mb={2}>
          Sign Up Page
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            rules={{ required: "Username is required" }}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="username"
                fullWidth
                margin="normal"
                type="text"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="email"
            rules={{ required: "email is required" }}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="password"
            rules={{ required: "password is required" }}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#ffc400" }}
          >
            Sign Up
          </Button>
        </form>
        <div>
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
