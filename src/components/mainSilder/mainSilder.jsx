import Slider from "react-slick";
import Style from "./mainSilder.module.css"
import img1 from "../../assets/images/grocery-banner.png"
import img2 from "../../assets/images/grocery-banner-2.jpeg"
import img3 from "../../assets/images/slider-2.jpeg"
import img4 from "../../assets/images/slider-image-1.jpeg"

export default function MainSilder() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return <>
    <div className="grid grid-cols-[2fr_1fr] my-10">


      <Slider {...settings} className="overflow-hidden">
        <div>
          <img src={img3} className="w-full h-[400px] object-cover" alt="" />
        </div>
        <div>
          <img src={img4} className="w-full h-[400px] object-cover" alt="" />
        </div>

      </Slider>

      <div>
        <img src={img1} className="w-100 h-[200px] object-cover" alt="" />
        <img src={img2} className="w-100 h-[200px] object-cover" alt="" />
      </div>
    </div>
  </>
}
