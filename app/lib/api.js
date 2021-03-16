import { useQuery } from "react-query";
import { graphql } from ".";
import { GET_WORKSHOPS } from "./queries";

const fetchWorkshops = () => graphql(GET_WORKSHOPS);

export const useWorkshops = () => {
  const { isLoading, data, error } = useQuery("workshops", fetchWorkshops, {
    cacheTime: 30000,
  });

  return {
    isLoading,
    data,
    error,
  };
};
