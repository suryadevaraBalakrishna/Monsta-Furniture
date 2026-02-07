import React from 'react'

export default function Features() {
  return (
    <div className="py-[100px] bg-gray-100">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Free Shipping */}
      <div className="flex items-center bg-white p-6 rounded shadow-md">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          {/* Icon Placeholder */}
          <span className="text-2xl font-bold text-blue-500">🚚</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Free Shipping</h3>
          <p className="text-sm text-gray-600">Free shipping on all order</p>
        </div>
      </div>

      {/* Money Return */}
      <div className="flex items-center bg-white p-6 rounded shadow-md">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
          {/* Icon Placeholder */}
          <span className="text-2xl font-bold text-green-500">💰</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Money Return</h3>
          <p className="text-sm text-gray-600">Back guarantee under 7 days</p>
        </div>
      </div>

      {/* Online Support */}
      <div className="flex items-center bg-white p-6 rounded shadow-md">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
          {/* Icon Placeholder */}
          <span className="text-2xl font-bold text-yellow-500">💬</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Online Support</h3>
          <p className="text-sm text-gray-600">Support online 24 hours a day</p>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
