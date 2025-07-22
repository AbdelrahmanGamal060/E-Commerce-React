import Style from "./Home.module.css"
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import CategorySlider from "../categorySlider/categorySlider"
import MainSilder from "../mainSilder/mainSilder"

export default function Home() {

  return <>
    <MainSilder />
    <CategorySlider />
    <DisplayProducts />
  </>
}
