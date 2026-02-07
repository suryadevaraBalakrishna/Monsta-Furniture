"use client"
import React, { useState } from 'react'

export default function Accordion() {
    let [faq, setFaq] = useState(null);

    let toggleFaq = (id) => {
        setFaq(faq == id ? null : id)
    }
    const faqData = [
        {
            id: '1',
            question: "Mauris congue euismod purus at semper. Morbi et vulputate massa?",
            answer:
                "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis.",
        },
        {
            id: '2',
            question: "Donec mattis finibus elit ut tristique?",
            answer:
                "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis.",
        },
    ];


    return (
        <div className="accordion_area p-6 max-w-[80%] mx-auto">
            <div className="space-y-4">
                {/* FAQ Item 1 */}
                {faqData.map((items) => {
                    return (
                        <div className="border rounded shadow" key={items.id}>
                            <button
                                className="w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none">
                                <span className="font-semibold text-lg" onClick={() => toggleFaq(items.id)}>
                                    {items.question}
                                </span>
                                {faq != items.id ? <svg
                                    className="w-5 h-5 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    ></path>
                                </svg> : '-'}

                            </button>
                            {faq == items.id && (
                                <div
                                    className='px-4 py-3 text-gray-700'
                                >
                                    <p>
                                        {items.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
