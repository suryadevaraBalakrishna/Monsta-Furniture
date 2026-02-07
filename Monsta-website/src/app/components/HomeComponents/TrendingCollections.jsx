import React from 'react'

export default function TrendingCollections() {
    return (
        <section
            className="w-full bg-cover bg-center my-[100px]"
            style={{
                backgroundImage:
                    "url('https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg')",
            }}
        >
            <div className="container mx-auto px-4 py-20">
                <div className="flex items-center justify-center text-center">
                    <div className="text-black max-w-2xl">
                        {/* Optional subheading */}
                        {/* <p className="text-lg font-medium">Free Shipping</p> */}
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            New Trending Collection
                        </h2>
                        <span className="block text-lg md:text-xl mb-6">
                            We Believe That Good Design is Always in Season
                        </span>
                        <a
                            href="https://www.wscubetech.co/Assignments/furniture/trending-collections"
                            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
            </div>
        </section>

    )
}
