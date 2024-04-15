import React from "react";
import { Sidebar, Banner, BestSeller ,DealDaily, FeatuteProducts} from "../../Component";

const Home = () => {
  return (
    <>
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
    <div className=" w-full h-[500px]">
    <div className="my-8">
      <h3 className=' text-[20px font-semibold py-[15px] border-b-4 border-main uppercase' > new arrivals </h3>
    </div>
    </div>
    </>
  );
};

export default Home;
