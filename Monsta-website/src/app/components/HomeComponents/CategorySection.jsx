import React from 'react'

export default function CategorySection() {
  return (
    <div className="px-4">
  <div className="max-w-[1140px] mx-auto mt-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">

    {/* Card 1 */}
    <div className="category-block relative">
      <div className="shadow-lg overflow-hidden rounded">
        <img
          className="w-full h-auto object-cover"
          src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp"
          alt="Chair Collection"
        />
      </div>
      <div className="banner_content absolute top-5 left-5 text-white">
        <p className="font-bold text-sm">Design Creative</p>
        <h2 className="font-bold text-lg">Chair Collection</h2>
      </div>
    </div>

    {/* Card 2 */}
    <div className="category-block relative">
      <div className="shadow-lg overflow-hidden rounded">
        <img
          className="w-full h-auto object-cover"
          src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0d588bec-d9a0-4645-8e7a-b49ef67b34be-1670180400.webp"
          alt="Chair Collection"
        />
      </div>
      <div className="banner_content absolute top-5 left-5 text-white">
        <p className="font-bold text-sm">Design Creative</p>
        <h2 className="font-bold text-lg">Chair Collection</h2>
      </div>
    </div>

    {/* Card 3 */}
    <div className="category-block relative">
      <div className="shadow-lg overflow-hidden rounded">
        <img
          className="w-full h-auto object-cover"
          src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp"
          alt="Chair Collection"
        />
      </div>
      <div className="banner_content absolute top-5 left-5 text-white">
        <p className="font-bold text-sm">Design Creative</p>
        <h2 className="font-bold text-lg">Chair Collection</h2>
      </div>
    </div>

  </div>
</div>

  )
}
