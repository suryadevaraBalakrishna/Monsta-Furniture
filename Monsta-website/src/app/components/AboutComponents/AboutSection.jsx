import React from 'react'

export default function AboutSection() {
  return (
       <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-full max-w-4xl">
            <div className="mb-8">
              <img
                src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg"
                alt="About Monsta"
                className="w-full h-auto rounded shadow"
              />
            </div>
            <div className="text-gray-700">
              <h1 className="text-3xl font-bold mb-4">Welcome to Monsta!</h1>
              <p className="mb-4">
                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
                molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
                eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
                zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber
                tempor cum soluta nobis eleifend option congue nihil imperdiet doming id
                quod mazim placerat facer possim assum. Typi non habent claritatem insitam,
                est usus legentis in iis qui facit eorum claritatem.
              </p>
              <span className="italic text-gray-500">
                “There are many variations of passages of Lorem Ipsum available, but the
                majority have suffered alteration in some form.”
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
