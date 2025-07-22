import axios, { Axios } from "axios"
import Style from "./DisplayProducts.module.css"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../context/CartContextProvider";
import toast from "react-hot-toast";
import { WishListContext } from "../../context/WishListContextProvider";

export default function DisplayProducts() {

  let { addTocart } = useContext(CartContext)
  let { Addtowishlist, products: wishlistProducts, GetLoggedUser } = useContext(WishListContext);

  useEffect(() => {
    GetLoggedUser(); // ضروري علشان نجيب الـ wishlist
  }, []);

  const [addedToWishlist, setAddedToWishlist] = useState([]);

  // تحديث الحالة لو اتغيرت قائمة الـ wishlist
  useEffect(() => {
    if (wishlistProducts) {
      const wishlistIds = wishlistProducts.map((product) => product._id);
      setAddedToWishlist(wishlistIds);
    }
  }, [wishlistProducts]);

  async function GetAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: GetAllProducts,
    // refetchInterval: 5000, // علشان لو حصل اب ديت للداتا يعمل فيتش الي الداتا الجديده
    // refetchIntervalInBackground:true, // يعني لما اخر من الموقع او التابه بتاعتي استمر في عمل الفيتشينج
    // refetchOnWindowFocus:true, // لما اخر وادخل تاني جوه الويندو اعمل فيتشيج
    // staleTime:5000 // يعني الداتا هتبقي قديمه بعد وقت اد كده
    retry: 3, // علشان لو فيه مشكله ايا كانت اي هيا يحاول 3 مرات قبل ما يعرض الايرور
    retryDelay: 2000,
    gcTime: 2000, // يعني امسح الداتا المتكيشه في الميموري بعد 2000 مثلا

    select: (data) => {
      return data.data.data
    }
  })


  async function addToCartProduct(id) {
    let flag = await addTocart(id)
    if (flag) {
      toast.success('Successfully added !');
      setAddedToWishlist((prev) => [...prev, id]);
    } else {
      toast.error('This is an error!');

    }
  }

  async function addToWishlistProduct(id) {
    let flag = await Addtowishlist(id)
    if (flag) {
      toast.success('Successfully added to Wishlist!');

    } else {
      toast.error('This is an error!');

    }
  }

  // const [isLoading, setIsLoading] = useState(false)
  // const [Products, setProducts] = useState(null)

  // async function GetAllProducts() {
  //   setIsLoading(true)
  //   let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //   console.log(data);

  //   setProducts(data.data)

  //   setIsLoading(false)


  // }

  // useEffect(() => {
  //   GetAllProducts()
  // }, [])

  if (isLoading) {
    return <>


      <div role="status" className="flex justify-center items-center  h-screen">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span class="sr-only">Loading...</span>
      </div>
    </>
  }

  if (isError) {
    return <div>Faild products is Not found</div>
  }

  return <>

    <div className=" grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {data?.map((Product) => <div className={`cursor-pointer  group overflow-hidden relative shadow-xl p-2 ${Style.greenShadowHover}`} key={Product._id}>

        <Link to={`/ProductDetails/${Product._id}/${Product.category.name}`} >
          <img src={Product.imageCover} alt={Product.title} />

          <h3 className="text-sm text-green-400">{Product.category.name}</h3>
          <h2>{Product.title.split(" ", 2).join(" ")}</h2>

          <div className="flex justify-between">
            {Product.priceAfterDiscount ? <>
              <h3 className="text-red-500 line-through">{Product.price} EGP</h3>
              <h3>{Product.priceAfterDiscount} EGP</h3>

            </> : <h3>{Product.price} EGP</h3>}
            <span> <i className="fas fa-star text-yellow-400"></i>  {Product.ratingsAverage} </span>
          </div>

          {Product.priceAfterDiscount ? <span class="absolute top-0 bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">sale</span> : null}
        </Link>
        <i
          onClick={() => addToWishlistProduct(Product._id)}
          className={`fa-solid fa-heart float-end mt-2 text-2xl cursor-pointer transition-colors duration-200 ${addedToWishlist.includes(Product._id) ? "text-red-500" : "text-gray-400"
            }`}
        ></i>        <button onClick={() => { addToCartProduct(Product._id) }} className="group-hover:translate-y-0  translate-y-[310%]   hover:bg-green-500 hover:text-white  border border-green-400 rounded-md w-full py-1.2 my-5 cursor-pointer transition-all duration-200">add To cart</button>

      </div>)}


    </div>

  </>
}
