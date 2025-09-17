import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <div className="relative">
        <CardMedia
          component="img"
          sx={{ aspectRatio: "16/9" }}
          image="pd-1.png"
        />
        <Button sx={{ position: "absolute", top: 8, right: 8 }}>
          <FavoriteIcon className=" text-gray-400 hover:text-red-600 " />
        </Button>
      </div>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
        >
          <AttachMoneyIcon />
          {product.price}
        </Typography>
        <Typography>
          RAM : {product.ram}
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default ProductCard;
