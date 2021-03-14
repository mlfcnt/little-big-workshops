import { useMutation, useQuery, QueryClient } from "react-query";
import { graphql } from ".";
import { ADD_WORKSHOP, GET_WORKSHOPS } from "./queries";

const queryClient = new QueryClient();

const fetchWorkshops = () => graphql(GET_WORKSHOPS);

export const useWorkshops = () => {
  const { isLoading, data, error } = useQuery("workshops", fetchWorkshops);

  return {
    isLoading,
    data,
    error,
  };
};

export const useCreateWorkshop = (name) =>
  useMutation(() => graphql(ADD_WORKSHOP, { name }), {
    onSuccess: () => queryClient.refetchQueries("workshops"),
  });
