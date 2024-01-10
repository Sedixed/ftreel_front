import { Class } from "@type/Class";
import AuthenticationRequestDTO from "@api/dto/request/authentication/AuthenticationRequestDTO";
import RegistrationRequestDTO from "@api/dto/request/authentication/RegistrationRequestDTO";
import GetUserResponseDTO from "@api/dto/response/authentication/GetUserResponseDTO";
import DocumentResponseDTO from "@api/dto/response/document/DocumentResponseDTO";
import UploadDocumentRequestDTO from "@api/dto/request/document/UploadDocumentRequestDTO";
import UpdateDocumentRequestDTO from "@api/dto/request/document/UpdateDocumentRequestDTO";
import CategoryResponseDTO from "@api/dto/response/category/CategoryResponseDTO";
import CreateCategoryRequestDTO from "@api/dto/request/category/CreateCategoryRequestDTO";
import UpdateCategoryRequestDTO from "@api/dto/request/category/UpdateCategoryRequestDTO";
import GetCategoryWithPathRequestDTO from "@api/dto/request/category/GetCategoryWithPathRequestDTO";

/**
 * Class containing the API endpoints metadata (URI, request type...). This class also contains all the existing API 
 * endpoints.
 * 
 * @param T The request type.
 * @param S The response type.
 */
export default class APIEndpoint<T, U> {

  public static readonly LOGIN = new APIEndpoint("/Authentication/Login", "POST", AuthenticationRequestDTO, null);
  public static readonly REGISTER = new APIEndpoint("/Authentication/Register", "POST", RegistrationRequestDTO, null);
  public static readonly GET_USER = new APIEndpoint("/Authentication/GetUser", "GET", null, GetUserResponseDTO);

  public static readonly GET_CATEGORY = new APIEndpoint("/Category/GetCategory/{id}", "GET", null, CategoryResponseDTO);
  public static readonly GET_CATEGORY_WITH_PATH = new APIEndpoint("/Category/GetCategoryWithPath", "GET", GetCategoryWithPathRequestDTO, CategoryResponseDTO);
  public static readonly GET_ALL_CATEGORIES = new APIEndpoint("/Category/GetAllCategories", "GET", null, Array<CategoryResponseDTO>);
  public static readonly CREATE_CATEGORY = new APIEndpoint("/Category/CreateCategory", "POST", CreateCategoryRequestDTO, CategoryResponseDTO);
  public static readonly UPDATE_CATEGORY = new APIEndpoint("/Category/UpdateCategory", "PATCH", UpdateCategoryRequestDTO, CategoryResponseDTO);
  public static readonly DELETE_CATEGORY = new APIEndpoint("/Category/DeleteCategory/{id}", "DELETE", null, null);

  public static readonly GET_DOCUMENT = new APIEndpoint("/Document/GetDocument/{id}", "GET", null, DocumentResponseDTO);
  public static readonly GET_ALL_DOCUMENTS = new APIEndpoint("/Document/GetAllDocuments", "GET", null, Array<DocumentResponseDTO>);
  public static readonly UPLOAD_DOCUMENT = new APIEndpoint("/Document/UploadDocument", "POST", UploadDocumentRequestDTO, DocumentResponseDTO);
  public static readonly UPDATE_DOCUMENT = new APIEndpoint("/Document/UpdateDocument", "PATCH", UpdateDocumentRequestDTO, DocumentResponseDTO);
  public static readonly DELETE_DOCUMENT = new APIEndpoint("/Document/DeleteDocument/{id}", "DELETE", null, null);

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
