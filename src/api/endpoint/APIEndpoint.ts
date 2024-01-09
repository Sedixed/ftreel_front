import { Class } from "@type/Class";
import AuthenticationRequestDTO from "@dto/request/authentication/AuthenticationRequestDTO";
import RegistrationRequestDTO from "@api/dto/request/authentication/RegistrationRequestDTO";
import RegistrationResponseDTO from "@api/dto/response/authentication/RegistrationResponseDTO";
import FileResponseDTO from "@api/dto/response/files/FileResponseDTO";

/**
 * Class containing the API endpoints metadata (URI, request type...). This class also contains all the existing API 
 * endpoints.
 * 
 * @param T The request type.
 * @param S The response type.
 */
export default class APIEndpoint<T, U> {

  public static readonly LOGIN = new APIEndpoint("/Authentication/Login", "POST", AuthenticationRequestDTO, null);
  public static readonly REGISTER = new APIEndpoint("/Authentication/Register", "POST", RegistrationRequestDTO, RegistrationResponseDTO);
  public static readonly FILES = new APIEndpoint("/files", "GET", null, Array<FileResponseDTO>);

  /**
   * @param uri          The endpoint's URI.
   * @param method       The request's method.
   * @param requestType  The request type.
   * @param responseType The response type.
   */
  constructor(
    public readonly uri: string,
    public readonly method: "GET" | "POST" | "PUT" | "DELETE",
    public readonly requestType: Class<T> | null,
    public readonly responseType: Class<U> | null,
  ) {}

  public toApiUrl(): string {
    return import.meta.env.VITE_API_HOST + this.uri;
  }

}
