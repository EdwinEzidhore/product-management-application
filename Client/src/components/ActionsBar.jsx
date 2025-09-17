import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import AddSubCategoryModal from "./AddSubCategoryModal";
import AddProductModal from "./AddProductModal";


const ActionsBar = () => {

  const [openModal, setOpenModal] = useState(null);

  return (
    <div>
      <div className="container">
        <div className="flex justify-end">
          <div className="space-x-3">            
              <button onClick={()=>setOpenModal("category")} className="butn butn_primary font-bold">Add Category</button>
              <button onClick={()=>setOpenModal("subCategory")} className="butn butn_primary font-bold">Add Sub Category</button>
              <button onClick={()=> setOpenModal("addProduct")} className="butn butn_primary font-bold">Add Product</button>
          </div>
        </div>

        
        <AddCategoryModal
          open={openModal === "category"}
          onClose={() => setOpenModal(null)}
        />

        <AddSubCategoryModal
          open={openModal === "subCategory"}
          onClose={() => setOpenModal(null)}
        />

        <AddProductModal
          open={openModal === "addProduct"}
          onClose={() => setOpenModal(null)}
        />
        

      </div>
    </div>
  );
};

export default ActionsBar;
