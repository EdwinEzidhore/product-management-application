import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { base_url } from "../config/base_url.js";
import axios from "axios";

const SideBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${base_url}/api/products/get-categories`).then((res) => {
        if (res.data.success === true) {
          setCategories(res.data.categories);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(categories);

  const handleChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="sidebar  bg-gray-100">
      <div className="sidebar-inner overflow-y-scroll">
        <div className="flex flex-col justify-center pt-5 pb-5 px-5  divide-y divide-gray-300">
          <div className="w-50 ">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <h2 className="text-lg mb-3"> Home {">"}</h2>
          </div>
          <div className="mt-5 pt-4">
            <ul className="sidebar-list space-y-4 text-lg">
              <li className="sidebar-item"></li>
              <li className="sidebar-item">
                <a className="sidebar-item-link" href="">
                  All Categories
                </a>
              </li>
              <li>
                {categories &&
                  categories.length > 0 &&
                  categories.map((item,index) => {
                    return (
                      <Accordion key={index} defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>{item.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup>
                            {item.subCategories &&
                              item.subCategories.length > 0 &&
                              item.subCategories.map((sub_item, index) => (
                                <FormControlLabel
                                  key={index}
                                  control={
                                    <Checkbox
                                      //   checked={checked[sub_item] || false}
                                      onChange={handleChange}
                                      name={sub_item.name}
                                    />
                                  }
                                  label={sub_item.name}
                                />
                              ))}
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
