import React, { useEffect, useState,memo } from "react";
import { apiGetProducts } from "../../Api/product";
import SettingSlider from "../search/SettingSlider";

const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new arrivals" },
];


  const listBanners = [
    {
      id: 1,
      img: 'https://cdn-v2.didongviet.vn/files/banners/2024/3/14/1/1713051311355_mac_air_m3_1240x104.jpg'
    },
    {
      id: 2,
      img: 'https://cdn-v2.didongviet.vn/files/banners/2024/3/8/1/1712554595412_galaxy_ai_1204_x_104.jpeg'
    },
  ]

    ///
const BestSeller = () => {
  // luu data
  const [bestSeller, setBestSeller] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
//   console.log(activedTab);
//   console.log(bestSeller);
  console.log(products);
  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    // console.log({ bestSeller, newProducts });
    if (response[0]?.success){
        setBestSeller(response[0].products);
        setProducts(response[0].products);  
    } 
    if (response[1]?.success) setNewProducts(response[1].products);
  };
  useEffect(() => {
    fetchProducts(); 
  }, []);
  useEffect(() => {
    if(activedTab === 1) setProducts(bestSeller)
  if(activedTab === 2) setProducts(newProducts)
  }, [activedTab,bestSeller,newProducts])
  return (
    <div>
      <div className=" flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((el) => (
            <span
                    key={el.id}
                    className={` font-semibold cursor-pointer capitalize border-r 
                    text-gray-400 ${activedTab === el.id ? ' text-red-700' : ''}`}
                    onClick={() => setActivedTab(el.id)}
                >
                    {el.name}
            </span>
        ))}
      </div>
      <div className=" mt-4">
          <SettingSlider bestSeller={bestSeller} activedTab={activedTab} />
      </div>
      {
        listBanners.map((el) => (
          <div className="flex gap-3 w-full mt-8">
          <img src={el.img} alt="banner" className="flex object-contain" key={el}/>
        </div>
        ))
      }
    </div>
  );
};

export default memo(BestSeller);
