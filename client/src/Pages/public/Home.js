import React,{memo, useEffect, useState} from "react";
import { Sidebar, Banner, BestSeller ,DealDaily, FeatuteProducts, SettingSlider} from "../../Component";
import { apiGetProducts } from "../../Api/product";
import { useSelector } from "react-redux";

const Home = () => {
  const [newProducts, setNewProducts] = useState(null);
  const {isLoggedIn , current} = useSelector(state => state.user)
  console.log({isLoggedIn , current});
  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[1]?.success) setNewProducts(response[1].products);
  };
  useEffect(() => {
    fetchProducts(); 
  }, []);
  return (
    <div>
    <div className="w-main flex">
      <div className="flex flex-col w-[25%] gap-5 flex-auto">
        <Sidebar />
        <DealDaily />
      </div>
      <div className="flex flex-col w-[75%] gap-5 mx-2 p-4 flex-auto">
        <Banner />
        <BestSeller />
      </div>
    </div>
    <div className="my-8">
       <FeatuteProducts />
    </div>
   <div className="my-8">
        <h3 className=' text-[20px font-semibold py-[15px] border-b-4 border-main uppercase' > New arrivals </h3>
        <SettingSlider bestSeller={newProducts} />
    </div>
    </div>
  );
};

export default memo(Home);
