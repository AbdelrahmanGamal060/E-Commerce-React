import Slider from "react-slick";
import Style from "./categorySlider.module.css"
import axios from "axios";
import { useEffect, useState } from "react";

export default function CategorySlider() {

  const [categories, setcategories] = useState(null)

  async function GetCategories() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    console.log(data.data);
    setcategories(data.data)
  }

  useEffect(() => {
    GetCategories()
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2 ,
    autoplay:true,
  };
  return <>
    <Slider {...settings} className="my-8">
      {categories?.map((category) => 
        <div>
          <img src={category.image} className="w-100 h-[200px] object-cover " alt="" />
        </div>
      )}

    </Slider>
  </>
}
