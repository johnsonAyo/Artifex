/* eslint-disable no-bitwise */
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useContext,
  useReducer,
  useState,
} from "react"
import PlayerReducer from "./PlayerReducer"
import playerContext from "./PlayerContext"

import {
  SET_CURRENT_SONG,
  TOGGLE_RANDOM,
  TOGGLE_REPEAT,
  TOGGLE_PLAYING,
  SET_SONGS_ARRAY,
} from "./types"

export function PlayerState(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined
}) {
  const [currentSongs, setCurrentSongs] = useState<any | null>({})
  const initialState = {
    currentSong: currentSongs.pid,
    songslist: currentSongs,
    repeat: false,
    random: false,
    playing: false,
    audio: null,
  }

  const [state, dispatch] = useReducer(PlayerReducer, initialState)

  const setCurrent = (id: number) =>
    dispatch({ type: "SET_CURRENT_SONG", data: id })

  // Set songs array
  const songsSet = (songArr: any) =>
    dispatch({ type: SET_SONGS_ARRAY, data: songArr })

  const togglePlaying = () =>
    dispatch({ type: "TOGGLE_PLAYING", data: !state.playing })

  // Prev song
  const prevSong = () => {
    if (state.random) {
      // eslint-disable-next-line no-bitwise
      return setCurrentSongs(~~(Math.random() * state.currentSongs.length))
    }

    if (state.currentSongs === 0) {
      return setCurrentSongs(state.currentSongs.pid - 1)
    }
    return setCurrentSongs(state.currentSongs.pid - 1)
  }

  // Next song
  const nextSong = () => {
    if (state.random) {
      return setCurrentSongs(~~(Math.random() * state.songslist.length))
    }
    if (state.currentSong === state.songslist.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(state.currentSong + 1)
    }
  }

  // Repeat and Random
  const toggleRepeat = (id: any) =>
    dispatch({ type: TOGGLE_REPEAT, data: !state.repeat })
  const toggleRandom = (id: any) =>
    dispatch({ type: TOGGLE_RANDOM, data: !state.random })

  // End of Song
  const handleEnd = () => {
    // Check for random and repeat options
    if (state.random) {
      return setCurrent(~~(Math.random() * state.songslist.length))
    }
    if (state.repeat) {
      nextSong()
    } else if (state.currentSong === state.songslist.length - 1) {
    } else {
      nextSong()
    }
  }

  return (
    <playerContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentSong: state.currentSong,
        // songs: state.songs,
        songslist: state.songslist,
        repeat: state.repeat,
        random: state.random,
        playing: state.playing,
        audio: state.audio,
        currentSongs,
        setCurrentSongs,
        setCurrent,
        nextSong,
        prevSong,
        toggleRandom,
        toggleRepeat,
        togglePlaying,
        handleEnd,
        songsSet,
      }}
    >
      {props.children}
    </playerContext.Provider>
  )
}

export const usePlayerContext = () => useContext(playerContext)
