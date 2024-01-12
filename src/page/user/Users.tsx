import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import useSnackbar from "@hook/snackbar/useSnackbar";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import {
  GridColDef
} from "@mui/x-data-grid/models/";
// import ServerSideTable from "@component/ServerSideTable/ServerSideTable";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import CenteredModal from "@component/CenteredModal/CenteredModal";
import useApiMutation from "@hook/api/useApiMutation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateUserRequestDTO from "@api/dto/request/user/CreateUserRequestDTO";
import UserResponseDTO from "@api/dto/response/authentication/UserResponseDTO";
import CreateUserForm from "@component/CreateUserForm/CreateUserForm";
import UpdateUserAdminForm from "@component/UpdateUserForm/UpdateUserForm";
import UpdateUserRequestDTO from "@api/dto/request/user/UpdateUserRequestDTO";
import { useTranslation } from "react-i18next";

export default function Users() {
  const { t } = useTranslation();
  // Setup the fetch error snackbar
  const { snackbar: fetchErrorSnackbar, show: showFetchError } = useSnackbar(
    "Impossible de récupérer les utilisateurs.",
    "warning"
  );

  // Server side table configuration
  const [selectedUser, setSelectedUser] =
    useState<UserResponseDTO>({
      id: 0,
      mail: "",
      roles: [],
    });

  const tableColumns: GridColDef[] = [
    {
      field: "id",
      headerName: t("usersId"),
      flex: 1,
      type: "number",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "mail",
      headerName: t("usersMail"),
      flex: 1,
      type: "string",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "roles",
      headerName: t("usersRoles"),
      flex: 1,
      type: "string",
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      valueGetter: (params) => {
        const roles: string[] = params.row.roles || [];
        return roles.join(', ');
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      sortable: false,
      filterable: false,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Modifier"
          onClick={() => {
            setSelectedUser({ id: params.id as number, ...params.row });
            setOpenUserUpdate(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => deleteUser(params.id as number)}
        />,
      ],
    },
  ];

  // Send an API request to get the users
  const {
    data: users,
    isLoading,
    refetch,
  } = useApi(APIEndpoint.GET_ALL_USERS, undefined, {
    queryKey: "users",
    staleTime: -1,
    onError: showFetchError
  });

  // User creation handling
  const [openUserCreate, setOpenUserCreate] = useState(false);
  const { snackbar: creationErrorSnackbar, show: showCreationError } =
    useSnackbar("Impossible de créer l'utilisateur.", "error");
  const {
    mutate: mutateCreation,
    isError: isCreationError,
    isSuccess: isCreationSuccess,
    reset: resetCreationData,
  } = useApiMutation(APIEndpoint.CREATE_USER, null, false, {
    invalidateQueries: ["users"],
  });
  const createUser = (user: CreateUserRequestDTO) => {
    const { mail, password, roles } = user;
    mutateCreation({ mail, password, roles });
    setOpenUserCreate(false);
  };
  if (isCreationError) {
    showCreationError();
    resetCreationData();
  } else if (isCreationSuccess) {
    resetCreationData();
    refetch();
  }

  // User update handling
  const [openUserUpdate, setOpenUserUpdate] = useState(false);
  const { snackbar: updateErrorSnackbar, show: showUpdateError } = useSnackbar(
    "Impossible de modifier l'utilisateur.",
    "error"
  );
  const {
    mutate: mutateUpdate,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
    reset: resetUpdateData,
  } = useApiMutation(APIEndpoint.UPDATE_USER, null, false, {
    invalidateQueries: ["users"],
  });
  const updateUserAdmin = (user: UpdateUserRequestDTO) => {
    const { id, mail, password, roles } = user;
    mutateUpdate({ id, mail, password, roles });
    setOpenUserUpdate(false);
  };
  if (isUpdateError) {
    showUpdateError();
    resetUpdateData();
  } else if (isUpdateSuccess) {
    resetUpdateData();
    refetch();
  }

  // Delete handling
  const { mutate: mutateDelete } = useApiMutation(
    APIEndpoint.DELETE_USER,
    null,
    false, {
      invalidateQueries: ["users"],
    });
  const deleteUser = (id: number) => {
    mutateDelete({
        id: id,
    });
  };

  return (
    <>
      <Box sx={{ paddingLeft: "5%" }}>
        <h1>{t("usersLabel")}</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          margin: "auto",
        }}
      >
        <Button
          variant="contained"
          sx={{ margin: "10px 0" }}
          onClick={() => setOpenUserCreate(true)}
        >
          {t("createUserLabel")}
        </Button>
      </Box>
      <CenterDiv
        direction="column"
        sx={{ width: "90%", minHeight: "250px", margin: "auto" }}
      >
      <DataGrid
        sx={{ width: "100%", marginBottom: "100px" }}
        columns={tableColumns}
        rows={users ?? []}
        pageSizeOptions={[5, 10, 25, 50]}
        getRowId={(row) => row.id as string}
        loading={isLoading}
        paginationMode="client"
        filterMode="client"
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
      </CenterDiv>
      {/* Creation modal */}
      <CenteredModal
        open={openUserCreate}
        handleClose={() => setOpenUserCreate(false)}
        sx={{ padding: "0 10px 10px 10px", width: "clamp(200px, 50%, 500px)" }}
      >
        <CreateUserForm onSubmit={createUser} />
      </CenteredModal>
      {/* Edit user modal */}
      <CenteredModal
        open={openUserUpdate}
        handleClose={() => setOpenUserUpdate(false)}
        sx={{ padding: "0 10px 10px 10px", width: "clamp(200px, 50%, 500px)",
       }}
      >
        <UpdateUserAdminForm currentUser={selectedUser} onSubmit={updateUserAdmin} />
      </CenteredModal>
      {creationErrorSnackbar}
      {updateErrorSnackbar}
      {fetchErrorSnackbar}
    </>
  );
}
