import React from "react";
import Register from "../Users/Register";

const Homepage = () => {
  return (
    // <div>
    //   <section
    //     className="relative bg-white overflow-hidden"
    //     style={{
    //       backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
    //       backgroundPosition: "center",
    //     }}
    //   >
    //     <div className="bg-transparent">
    //       <div className="navbar-menu hidden fixed top-0 left-0">
    //         <div className="fixed top-0 left-0 bottom-0">
    //           <a className="navbar-close absolute top-5 p-4 right-3" href="">
    //             <svg
    //               width={12}
    //               height={12}
    //               viewBox="0 0 12 12"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <path
    //                 d="M6.94004 6L11.14 1.80667C11.2656 1.68113 11.3"
    //                 fill="#556987"
    //               />
    //             </svg>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="relative py-20 xl:pt-16 xl:pb-24">
    //       <div className="container px-4 mx-auto">
    //         <div className="flex flex-wrap items-center">
    //           <div className="w-full lg:w-1/2 mb-20 lg:mb-0">
    //             <span className="inline-block py-px px-2 mb-4 text-xs ">
    //               Header
    //             </span>
    //             <h1 className="mb-6 text-3xl md-text-5xl lg:text-6xl">
    //               A small business is only as good as its tools.
    //             </h1>
    //             <p className="mb-8 text-lg md:text-xl leading-7">
    //               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
    //             </p>
    //             <ul>
    //               <li className="mb-6 flex items-center">
    //                 <img className="mr-3" src="flex-ui-assets/element" alt="" />
    //                 <p className="text-lg md:text-xl">
    //                   Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    //                   Distinctio illo quasi hic v
    //                 </p>
    //               </li>
    //               <li className="mb-6 flex items-center">
    //                 <img
    //                   className="mr-3"
    //                   src="flex-ui-assets/elements/checkbox-green.svg"
    //                   alt=""
    //                 />
    //                 <p className="text-lg md:text-xl leading-7">
    //                   Suspend mollis tincident
    //                 </p>
    //               </li>
    //               <li className="mb-6 flex items-center">
    //                 <img className="mr-3" src="flex-ui-assets/element" alt="" />
    //                 <p className="text-lg md:text-xl">Prasent various</p>
    //               </li>
    //             </ul>
    //           </div>
    //           <Register />
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <section className="relative bg-white overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          {/* LEFT SECTION */}
          <div className="w-full lg:w-1/2 mb-16 lg:mb-0">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold text-green-600 bg-green-100 rounded-full">
              HEADER
            </span>

            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              A small business is only as good as its tools.
            </h1>

            <p className="mb-8 text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start">
                <img
                  className="mr-4 mt-1 w-5 h-5"
                  src="/flex-ui-assets/elements/checkbox-green.svg"
                  alt="check"
                />
                <p className="text-lg text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </li>

              <li className="flex items-start">
                <img
                  className="mr-4 mt-1 w-5 h-5"
                  src="/flex-ui-assets/elements/checkbox-green.svg"
                  alt="check"
                />
                <p className="text-lg text-gray-700">
                  Suspendisse mollis tincidunt.
                </p>
              </li>

              <li className="flex items-start">
                <img
                  className="mr-4 mt-1 w-5 h-5"
                  src="/flex-ui-assets/elements/checkbox-green.svg"
                  alt="check"
                />
                <p className="text-lg text-gray-700">
                  Praesent varius justo vel justo pulvinar.
                </p>
              </li>
            </ul>
          </div>

          {/* RIGHT SECTION */}
          <Register />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
