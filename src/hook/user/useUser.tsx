import { useQueryClient } from "react-query";

export default function useUser() {
  return useQueryClient().getQueryData("user");
}