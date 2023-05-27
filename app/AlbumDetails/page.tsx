"use client"
import React from "react"
import { useLocation } from "react-router-dom"
import Image from "next/image"
import { useStateContext } from "../../context"

function AlbumDetails() {
  const { state } = useLocation()

  const { setOpenPlayer, openPlayer } = useStateContext()
  const handleCLick = () => {
    if (!openPlayer) {
      setOpenPlayer(true)
    } else {
      setOpenPlayer(false)
    }
  }

  return (
    <div className="h-screen">
      <div className="h-screen w-[100%]">
        <div className="col-span-5 row-span-6 mt-20 flex h-full flex-col bg-gradient-to-b from-gray-500 via-purple-500 to-indigo-900 text-white md:col-span-12 lg:col-span-9 xl:col-span-9">
          <div className="relative m-5 -mt-10 grid h-1/2 w-auto grid-cols-3 px-5">
            <div className="">
              <span className="h-full w-48">
                <Image
                  alt="Photo by aldi sigun on Unsplash"
                  src={state.imgSrc}
                  className="mx-auto h-full w-auto rounded-xl object-cover"
                />
              </span>
            </div>

            <div className="m-5">
              <div className="absolute bottom-0">
                <h1 className="m-2 font-bold">{state.name}</h1>
                <h1 className="m-2 text-4xl font-bold">ALBUM NAME</h1>
                <div className="m-2 flex font-bold">
                  <h1>Album</h1>
                  <button
                    disabled
                    className="ml-2 mr-2 mt-[1%] h-2 w-2 rounded-full bg-white"
                    aria-label="Album"
                  />
                  <h1>{state.name}</h1>
                  <button
                    disabled
                    className="ml-2 mr-2 mt-[1%] h-2 w-2 rounded-full bg-white"
                    aria-label="Album"
                  />
                  <h1>2022</h1>
                  <button
                    disabled
                    className="ml-2 mr-2 mt-[1%] h-2 w-2 rounded-full bg-white"
                    aria-label="Album"
                  />
                  <h1>19 Songs</h1>
                  <button
                    disabled
                    className="ml-2 mr-2 mt-[1%] h-2 w-2 rounded-full bg-white"
                    aria-label="Album"
                  />
                  <h1>1 Hour</h1>
                </div>
                <h1 className="m-2 overflow-ellipsis text-xs">
                  ALBUM NAME is the sixth studio album by Nigerian singer{" "}
                  {state.name}. It was released on 8 July 2022 through Atlantic
                  Records.
                </h1>
                <div className="m-2 flex gap-2 space-x-4">
                  <button className="text-white-700 border-white-500 rounded border bg-transparent px-4 py-2 font-semibold hover:border-transparent hover:bg-white hover:text-gray-500">
                    View As NFT
                  </button>
                  <button
                    onClick={() => handleCLick()}
                    className="text-white-700 h-10 w-10 rounded-full font-semibold hover:border-transparent hover:bg-white hover:text-gray-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                      <polygon
                        className="play-btn__svg"
                        points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"
                      />
                      <path
                        className="play-btn__svg"
                        d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"
                      />
                    </svg>
                  </button>
                  <button>
                    <svg
                      className="text-white-400 h-auto w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                    </svg>
                  </button>
                  <button>MONEY</button>
                  <button>...</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="m-5 mt-10 w-full">
              <div className="overflow-auto lg:overflow-visible ">
                <table className="text-white-400 table w-full border-separate border-spacing-y-3 space-y-6 text-sm">
                  <thead className="rounded-lg text-white">
                    <tr>
                      <th className="border-white-100 border-b-2 p-3 text-left">
                        #
                      </th>
                      <th className="border-white-100 border-b-2 p-3 text-left">
                        Name
                      </th>
                      <th className="border-white-100 border-b-2 p-3 text-left">
                        Featured Artist
                      </th>
                      <th className="border-white-100 border-b-2 p-3 text-left">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="cursor-pointer hover:bg-black/40">
                      <td className="rounded-l-xl p-3">
                        <Image
                          className="h-12 w-12 rounded-full  object-cover"
                          src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/play-icon-18-256.png"
                          alt="unsplash image"
                        />
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="">Song Name</div>
                          <div className="text-gray-500">mail@rgmail.com</div>
                        </div>
                      </td>
                      <td className="p-3">{state.name}</td>
                      <td className="rounded-r-xl p-3">3:15</td>
                    </tr>

                    <tr className="cursor-pointer hover:bg-black/40">
                      <td className="rounded-l-xl p-3">
                        <Image
                          className="h-12 w-12 rounded-full  object-cover"
                          src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/play-icon-18-256.png"
                          alt="unsplash image"
                        />
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="">Song Name</div>
                          <div className="text-gray-500">mail@rgmail.com</div>
                        </div>
                      </td>
                      <td className="p-3">{state.name}</td>
                      <td className="rounded-r-xl p-3">3:15</td>
                    </tr>

                    <tr className="cursor-pointer hover:bg-black/40">
                      <td className="rounded-l-xl p-3">
                        <Image
                          className="h-12 w-12 rounded-full  object-cover"
                          src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/play-icon-18-256.png"
                          alt="unsplash image"
                        />
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="">Song Name</div>
                          <div className="text-gray-500">mail@rgmail.com</div>
                        </div>
                      </td>
                      <td className="p-3">{state.name}</td>
                      <td className="rounded-r-xl p-3">3:15</td>
                    </tr>

                    <tr className="cursor-pointer hover:bg-black/40">
                      <td className="rounded-l-xl p-3">
                        <Image
                          className="h-12 w-12 rounded-full  object-cover"
                          src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/play-icon-18-256.png"
                          alt="unsplash image"
                        />
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="">Song Name</div>
                          <div className="text-gray-500">mail@rgmail.com</div>
                        </div>
                      </td>
                      <td className="p-3">{state.name}</td>
                      <td className="rounded-r-xl p-3">3:15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlbumDetails
