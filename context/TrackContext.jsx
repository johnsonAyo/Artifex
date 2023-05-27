import React, { useContext, createContext, useState, useEffect } from "react";
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useStateContext } from ".";

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
  const { contract } = useContract("0x8466779BD0dd462e6530d5d042C1699b22fF16a7");
  const { mutateAsync: uploadMusic, isLoading } = useContractWrite(contract, "uploadMusic");
  const { mutateAsync: purchaseMusic } = useContractWrite(contract, "purchaseMusic");
  const address = useAddress()

  const call = async ( _musicHash, _videoHash, _imageHash, _title, _price) => {
    try {
      const data = await uploadMusic([ _musicHash, _videoHash, _imageHash, _title, _price ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const donate = async (pId, _owner, amount) => {
    const data = await contract.call('purchaseMusic', pId, _owner, { value: ethers.utils.parseEther(amount)});
    return data;
  }

  const getTracks = async (owner) => {
    const allTracks = await contract.call("getMyContent", owner);
 console.log(allTracks)
    const parsedTracks = allTracks.map((content, i) => ({
      audio: content.musicFile,
      video: content.videoFile,
      image: content.image,
      title: content.title,
      cost: ethers.utils.formatEther(content.price.toString()),
      artist: content.owner, 
      pid: i
    }));
    return parsedTracks;
  }

  const purchaseTrack = async (_id, _owner) => {
    try {
      const data = await purchaseMusic([ _id, _owner ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  return <TrackContext.Provider value={{
    isLoading,
    uploadMusic: call,
    contract,
    address,
    getTracks,
    purchaseTrack,
    donate
  }}>{children}</TrackContext.Provider>;
};

export const useTrackContext = () => useContext(TrackContext);
