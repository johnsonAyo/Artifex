import React, { useContext, createContext, useState, useEffect } from "react";
import CyberConnect, {
  Env
} from '@cyberlab/cyberconnect-v2';
import { ethers } from "ethers";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";



const PodcastContext = createContext();

export const PodcastProvider = ({ children }) => {

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const [content, setContent] = useState([])

      const cyberConnect = new CyberConnect({
        namespace: 'FilMedia Content',
        env: Env.STAGING,
        provider: provider,
        signingMessageEntity: 'FilMedia Content',
      });
      const createAPost = async(content) => {
        try {
          const postPodcast = await cyberConnect.createPost(content);
          console.log(postPodcast);
          return postPodcast
        } catch (error) {
          console.log(error)
        }
      }
      const getPodcast = async () => {
        const q = query(
          collection(db, "content"), 
        );

        const querySnapshot = await getDocs(q);
        let account = [];
        querySnapshot.forEach((doc) => {
          account.push({ ...doc.data(), id: doc.id });
        });
        setContent(account);
      };

      useEffect(() => {
        getPodcast()
      }, [])

      // like a video with cyberConnect
      const likeAPost = async(id) => {
        try {
          const likePodcast = await cyberConnect.like(id);
          console.log(likePodcast);
          return likePodcast
        } catch (error) {
          console.log("like error",error)
        }
      }

      // dislike a video with cyberConnect
      const dislikeAPost = async(id) => {
          try {
            const dislikePodcast = await cyberConnect.dislike(id);
            console.log(dislikePodcast);
            return dislikePodcast
          } catch (error) {
            console.log("dislike error",error)
          }
      }

      // cancel a reaction with cyberConnect
      const cancelReaction = async(id) => {
          try {
            const cancelreactionPodcast = await cyberConnect.cancelReaction(id);
            console.log(cancelreactionPodcast);
            return cancelreactionPodcast
          } catch (error) {
            console.log("cancel reaction error",error)
          }
      }


  return (
    <PodcastContext.Provider
      value={{
        createAPost,
        likeAPost,
        dislikeAPost,
        cancelReaction,
        content
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};

export const usePodcastContext = () => useContext(PodcastContext);
