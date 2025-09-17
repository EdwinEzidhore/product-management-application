import { Typography, TextField, Button } from "@mui/material";
import CustomModal from "./CustomModal";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../config/base_url.js";

const AddCategoryModal = ({ open, onClose }) => {


  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      categoryName: "",
    },
  });

  const onsubmit = (data) => {
    if (data.categoryName.trim() === "") {
      return;
    }
    try {
      axios
        .post(`${base_url}/api/products/create-category`, data)
        .then((res) => {
          if (res.status === 200 && res.data.success === true) {
            toast.success(res.data.message || "Category added successfully");
            reset();
            
          }
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message ||
              "Failed to add category. Please try again."
          );
        });
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Failed to add category:", error);
    }
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <Typography variant="h6" mb={2}>
        Add Category
      </Typography>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Controller
          name="categoryName"
          control={control}
          render={({ field }) => (
            <TextField
              label="Category Name"
              fullWidth
              required
              margin="normal"
              {...field}
            />    
          )}
        />

        <div className="flex gap-x-3 justify-center mt-4">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#ffc400" }}
          >
            ADD
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{ backgroundColor: "gray" }}
          >
            DISCARD
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddCategoryModal;
