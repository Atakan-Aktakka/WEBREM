import React from "react";
import poster from "../../img/poster.png";
const HomePage = () => {
  return (
    <>
      <section className="pb-40 bg-gray-800">
        <div className="relative container px-4   mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
                WEBREM
              </h2>
              <span className="text-2xl font-bold text-white">
                a Remembrances Web Service
              </span>
              <br />
              <br />
              <span className="text-lg font-bold text-yellow-400">
                Create an Account
              </span>
              <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
                Create a Post{" "}
                <span className="text-yellow-500">For Your Memories</span>
              </h2>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-100">
                Your memories must be free from racism and unhealthy words
              </p>
            </div>
            <div className="w-full h-278px lg:w-1/2 px-64">
  <img src="https://media.giphy.com/media/eJEvETAuEly6H7jGaR/giphy.gif" style={{ transform: "scale(1.75)" }} />
  {/* https://media.giphy.com/media/B1sFH8JRFU21hIQoiS/giphy.gif */}
</div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;