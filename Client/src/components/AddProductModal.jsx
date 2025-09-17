import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import CustomModal from "./CustomModal";
import axios from "axios";
import { base_url } from "../config/base_url.js";
import { toast } from 'react-toastify';
const AddProductModal = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      subCategory: "",
      variants: [{ ram: "", price: "", quantity: "" }],
    },
  });

  const [subCategories, setSubCategories] = useState([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    axios
      .get(`${base_url}/api/products/get-subcategories`)
      .then((res) => {
        // console.log(res);
        if (res.data.success === true && res.status === 200) {
          setSubCategories(res.data.subCategories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (data) => {
    try {
      axios
        .post(`${base_url}/api/products/add-product`, data)
        .then((res) => {
          if(res.data.success === true){
              toast.success(res.data.message || "Product Added Successfully!");
              reset();
          }
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message ||
              "Failed to add product. Please try again."
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
        Add Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field, fieldState }) => (
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <div>
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-3 space-x-4 my-3">
              <div>
                <Controller
                  name={`variants.${index}.ram`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="RAM" fullWidth />
                  )}
                />
              </div>
              <div>
                <Controller
                  name={`variants.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Price"
                      type="number"
                      fullWidth
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name={`variants.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Quantity"
                      type="number"
                      fullWidth
                    />
                  )}
                />
              </div>
            </div>
          ))}
          <Button
            variant="outlined"
            onClick={() => append({ ram: "", price: "", quantity: "" })}
            sx={{ mt: 2 }}
          >
            + Add More Variants
          </Button>
        </div>

        <Controller
          rules={{ required: "SubCategory is required" }}
          name="subCategory"
          control={control}
          render={({ field , fieldState}) => (
            <FormControl fullWidth margin="normal" error={!!fieldState.error}>
              <InputLabel id="demo-simple-select-label">
                Sub Category
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="subCategory"
              >
                {subCategories &&
                  subCategories.length > 0 &&
                  subCategories.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Description"
              fullWidth
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

export default AddProductModal;
