import React from "react";

const AnnouncementBar = () => {
  return (
    <div>
      <div className="h-[45px]">
        <div className="fixed top-0 left-0 w-full z-[299] overflow-hidden">
          <div className="py-2.5 px-0  bg-blue-600 text-lg">
            <div className="text-center inline-block w-full">
              "LOWEST PRICE GUARANTEED" compare to all other Marketplace - All
              prices are inclusive of GST{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-rose-50 text-gray-900 text-sm z-[401] relative"></div>
    </div>
  );
};

export default AnnouncementBar;
