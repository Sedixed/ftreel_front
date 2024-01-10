import GetUserResponseDTO from "@api/dto/response/authentication/GetUserResponseDTO";
import { useQueryClient } from "react-query";

export default function useUser(): GetUserResponseDTO {
  return useQueryClient().getQueryData("user") as GetUserResponseDTO;
}