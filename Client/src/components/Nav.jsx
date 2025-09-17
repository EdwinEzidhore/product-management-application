import { MdOutlineShoppingCart } from "react-icons/md";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom"
const Nav = () => {
 
  const navigate = useNavigate();

  return (
    <nav className="bg-sky-900 ">
      <div className="container px-4  mx-auto py-3">
        <div className="grid  grid-cols-12 items-center">
          <div className="col-span-7 ">
            <div className="flex justify-center  items-center">
              <div className="relative w-full max-w-md">
                <input
                  className="input_filter relative w-100  rounded-tl-2xl rounded-bl-2xl"
                  type="text"
                  name="search"
                  placeholder="Search any things"
                />
                <button
                  className="butn butn_primary absolute right-2 top-1/2 -translate-y-1/2 font-bold"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-5  ">
            <div className="flex items-center gap-4">
              <div>
                <button className="flex items-center justify-center text-white">
                  <span className=" text-2xl">
                    <MdOutlineShoppingCart />
                  </span>
                  <span className="badge mr-2 flex items-center justify-center">0</span>
                  <span>Cart</span>
                </button>
              </div>
              <div>
                <button onClick={()=>navigate('/register')} className="flex items-center justify-center text-white">
                  <span className="text-2xl text-white mr-2" >
                    <AccountCircleIcon/>
                  </span>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
