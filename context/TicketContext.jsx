import React, { useContext, createContext, useState } from "react";
import {
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [ticketContent, setTicketContent] = useState()
  const { contract } = useContract(
    "0xCe760e7D56398fEFB792809B7fB2bC875CA4752D"
  );
  const { mutateAsync: createToken, isLoading } = useContractWrite(
    contract,
    "createToken"
  );
  const { mutateAsync: executeSale } = useContractWrite(
    contract,
    "executeSale"
  );

  const call = async (tokenURI, price, _start, _end, _supply) => {
    try {
      const data = await createToken([
        tokenURI,
        price,
        _start,
        _end,
        _supply,
      ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

/**
 *   const fetchData = async (url) => {
    const storage = new ThirdwebStorage();
    const data = await storage.downloadJSON(url)
   return data;
  };}
 */

  const formatDateRange = (date) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const startDate = new Date(date).toLocaleDateString("en-US", options);
    return startDate;
  };

  const getAllTickets = async () => {
    const tickets = await contract.call("getAllTicket");
    console.log(tickets);
    const parsedTickets = tickets.map((ticket, i) => ({
      uri: ticket.tokenUri,
      id: ticket.tokenId?.toNumber(),
      start: formatDateRange(ticket._timeStart?.toNumber()),
      price: ethers.utils.formatEther(ticket.price?.toString()),
     // end: formatDateRange(ticket._timeEnd?.toNumber()),
      supply: ticket.initialSupply?.toString(),
    }));
    console.log(parsedTickets);
    return parsedTickets;
  }; 

  const buyTicket = async (pId, _quantity, amount) => {
    const data = await contract.call("executeSale", pId, _quantity, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const payTicketFee = async (tokenId, _quantity, price) => {
    try {
      const data = await executeSale([tokenId, _quantity]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        isLoading,
        createToken: call,
        executeSale: payTicketFee,
        buyTicket,
        contract,
        getAllTickets,
        setTicketContent,
        ticketContent
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
