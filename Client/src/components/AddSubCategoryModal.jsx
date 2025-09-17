import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomModal from "./CustomModal";
import { useState } from "react";
import { base_url } from "../config/base_url.js";
import { useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const AddSubCategoryModal = ({ open, onClose }) => {
  const [categories, setCategories] = useState([]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      categoryId: "",
      sub_categoryName: "",
    },
  });

  useEffect(() => {
    axios
      .get(`${base_url}/api/products/get-categories`)
      .then((res) => {
        if (res.data.success === true && res.status === 200) {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (data) => {
    if (data.sub_categoryName.trim() === "" || data.categoryId.trim() === "") {
      return;
    }
    axios
      .post(`${base_url}/api/products/create-subcategory`, data)
      .then((res) => {
        toast.success(res.data.message);
        if (res.data.success === true) {
          reset();
        }
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ||
            "An unexpected error occurred. Please try again."
        );
        console.error("Failed to add category:", error);
      });
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <Typography variant="h6" mb={2}>
        Add Sub Category
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="categoryId"
          rules={{ required: "Category is required" }}
          control={control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth margin="normal" error={!!fieldState.error}>
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="category"
                
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="sub_categoryName"
          rules={{ required: "Sub Category is required" }}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label="Sub Category Name"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
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

export default AddSubCategoryModal;
