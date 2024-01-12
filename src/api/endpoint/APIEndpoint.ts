import { Class } from "@type/Class";
import AuthenticationRequestDTO from "@api/dto/request/authentication/AuthenticationRequestDTO";
import RegistrationRequestDTO from "@api/dto/request/authentication/RegistrationRequestDTO";
import UserResponseDTO from "@api/dto/response/authentication/UserResponseDTO";
import DocumentResponseDTO from "@api/dto/response/document/DocumentResponseDTO";
import UploadDocumentRequestDTO from "@api/dto/request/document/UploadDocumentRequestDTO";
import UpdateDocumentRequestDTO from "@api/dto/request/document/UpdateDocumentRequestDTO";
import CategoryResponseDTO from "@api/dto/response/category/CategoryResponseDTO";
import CreateCategoryRequestDTO from "@api/dto/request/category/CreateCategoryRequestDTO";
import UpdateCategoryRequestDTO from "@api/dto/request/category/UpdateCategoryRequestDTO";
import GetCategoryWithPathRequestDTO from "@api/dto/request/category/GetCategoryWithPathRequestDTO";
import FollowedCategoryResponseDTO from "@api/dto/response/category/FollowedCategoryResponseDTO";
import CreateUserRequestDTO from "@api/dto/request/user/CreateUserRequestDTO";
import UpdateUserRequestDTO from "@api/dto/request/user/UpdateUserRequestDTO";

/**
 * Class containing the API endpoints metadata (URI, request type...). This class also contains all the existing API 
 * endpoints.
 * 
 * @param T The request type.
 * @param S The response type.
 */
export default class APIEndpoint<T, U> {

  public static readonly LOGIN = new APIEndpoint("/Authentication/Login", "POST", AuthenticationRequestDTO, UserResponseDTO);
  public static readonly REGISTER = new APIEndpoint("/Authentication/Register", "POST", RegistrationRequestDTO, UserResponseDTO);
  public static readonly LOGOUT = new APIEndpoint("/Authentication/Logout", "POST", null, null);
  public static readonly GET_CURRENT_USER = new APIEndpoint("/Authentication/GetUser", "GET", null, UserResponseDTO);

  public static readonly GET_CATEGORY = new APIEndpoint("/Category/GetCategory/{id}", "GET", null, CategoryResponseDTO);
  public static readonly GET_CATEGORY_WITH_PATH = new APIEndpoint("/Category/GetCategoryWithPath", "GET", GetCategoryWithPathRequestDTO, CategoryResponseDTO);
  public static readonly GET_ALL_CATEGORIES = new APIEndpoint("/Category/GetAllCategories", "GET", null, Array<CategoryResponseDTO>);
  public static readonly CREATE_CATEGORY = new APIEndpoint("/Category/CreateCategory", "POST", CreateCategoryRequestDTO, CategoryResponseDTO);
  public static readonly UPDATE_CATEGORY = new APIEndpoint("/Category/UpdateCategory", "PATCH", UpdateCategoryRequestDTO, CategoryResponseDTO);
  public static readonly DELETE_CATEGORY = new APIEndpoint("/Category/DeleteCategory/{id}", "DELETE", null, null);
  public static readonly GET_FOLLOWED_CATEGORIES = new APIEndpoint("/Category/GetFollowedCategories", "GET", null, FollowedCategoryResponseDTO);
  public static readonly SUBSCRIBE_CATEGORY = new APIEndpoint("/Category/SubscribeCategory/{id}", "POST", null, null);
  public static readonly UNSUBSCRIBE_CATEGORY = new APIEndpoint("/Category/UnsubscribeCategory/{id}", "POST", null, null);


  public static readonly GET_DOCUMENT = new APIEndpoint("/Document/GetDocument/{id}", "GET", null, DocumentResponseDTO);
  public static readonly GET_ALL_DOCUMENTS = new APIEndpoint("/Document/GetAllDocuments", "GET", null, Array<DocumentResponseDTO>);
  public static readonly UPLOAD_DOCUMENT = new APIEndpoint("/Document/UploadDocument", "POST", UploadDocumentRequestDTO, DocumentResponseDTO);
  public static readonly UPDATE_DOCUMENT = new APIEndpoint("/Document/UpdateDocument", "PATCH", UpdateDocumentRequestDTO, DocumentResponseDTO);
  public static readonly DELETE_DOCUMENT = new APIEndpoint("/Document/DeleteDocument/{id}", "DELETE", null, null);
  public static readonly GET_NOT_VALIDATED_DOCUMENTS = new APIEndpoint("/Document/GetNotValidatedDocuments", "GET", null, Array<DocumentResponseDTO>);
  public static readonly VALIDATE_DOCUMENT = new APIEndpoint("/Document/ValidateDocument/{id}", "POST", null, null);
  public static readonly LIKE_DOCUMENT = new APIEndpoint("/Document/Like/{id}", "POST", null, null);
  public static readonly UNLIKE_DOCUMENT = new APIEndpoint("/Document/Unlike/{id}", "POST", null, null);

  public static readonly GET_USER = new APIEndpoint("/User/GetUser/{id}", "POST", AuthenticationRequestDTO, UserResponseDTO);
  public static readonly GET_ALL_USERS = new APIEndpoint("/User/GetAllUsers", "GET", null, Array<UserResponseDTO>);
  public static readonly CREATE_USER = new APIEndpoint("/User/CreateUser", "POST", CreateUserRequestDTO, UserResponseDTO);
  public static readonly UPDATE_USER = new APIEndpoint("/User/UpdateUser", "PATCH", UpdateUserRequestDTO, UserResponseDTO);
  public static readonly DELETE_USER = new APIEndpoint("/User/DeleteUser/{id}", "DELETE", null, null);

  /**
   * @param uri          The endpoint's URI.
   * @param method       The request's method.
   * @param requestType  The request type.
   * @param responseType The response type.
   */
  constructor(
    public readonly uri: string,
    public readonly method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    public readonly requestType: Class<T> | null,
    public readonly responseType: Class<U> | null,
  ) {}

  public toApiUrl(): string {
    return import.meta.env.VITE_API_HOST + this.uri;
  }

}
