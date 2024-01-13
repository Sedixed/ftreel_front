import useApi from '@hook/api/useApi';
import APIEndpoint from '@api/endpoint/APIEndpoint';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useSnackbar from '@hook/snackbar/useSnackbar';
import useApiMutation from '@hook/api/useApiMutation';
import SetMailTemplateRequestDTO from '@api/dto/request/mail/SetMailTemplateRequestDTO';
import { useEffect, useState } from 'react';
import FileTreeActionBar from '@component/FileTree/FileTreeActionBar/FileTreeActionBar';

export default function Mail() {
 const { t } = useTranslation();
 const [subjectValue, setSubjectValue] = useState("");
 const [bodyValue, setBodyValue] = useState("");

 // Setup the error snackbar
 const { snackbar: errorSnackbar, show: showError } = useSnackbar(
  t("getRequestError"),
  "warning",
  { horizontal: 'right', vertical: 'bottom' },
  3000
 );

 // Setup the success delete snackbar
 const { snackbar: successSnackbar, show: showSuccess } = useSnackbar(
  t("getRequestSuccess"),
  "success",
  { horizontal: 'right', vertical: 'bottom' },
  1000
 );

 // Send an API request to get the mail template
 const {
  data: template,
  isLoading,
  refetch,
 } = useApi(APIEndpoint.GET_MAIL_TEMPLATE, undefined, {
  queryKey: "template",
  staleTime: 60000,
  onError: showError,
 });

 // API mutation to update the mail template
 const { 
  mutate: setMailTemplate,
  reset: resetSetMailTemplate,
  isSuccess: setMailTemplateSuccess
 } = useApiMutation(APIEndpoint.SET_MAIL_TEMPLATE, null, false, {
  invalidateQueries: ["template"],
  onError: showError,
  onSuccess: showSuccess,
 });
 if (setMailTemplateSuccess) {
  refetch();
  resetSetMailTemplate();
 }

 useEffect(() => {
  if (template) {
    setSubjectValue(template.subject || '');
    setBodyValue(template.body || '');
  }
 }, [template]);

 const handleSubjectChange = (event) => {
  setSubjectValue(event.target.value);
 };

 const handleBodyChange = (event) => {
  setBodyValue(event.target.value);
 };

 const handleRefreshButtonClick = () => {
  refetch();
 };

 return (
  <>
    <Box
      sx={{
        padding: "0 50px",
      }}
    >
      <h1>{t('mailTemplateTitle')}</h1>
      {
        template && !isLoading &&
        <>
        <FileTreeActionBar
          onRefresh={handleRefreshButtonClick}
          enableCreateFile={false}
          enableCreateDirectory={false}
          enableBackButton={false}
          enableFilterBar={false}
          enableInfos={true}
        />
        <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
          <TextField rows={5} label={t("mailSubject")} multiline fullWidth
            defaultValue={subjectValue} onChange={handleSubjectChange}></TextField>
          <TextField rows={10} label={t("mailBody")} name="body" multiline fullWidth
            defaultValue={bodyValue} onChange={handleBodyChange} ></TextField>
          <Button variant="contained" onClick={() => {
            setMailTemplate(new SetMailTemplateRequestDTO(
              subjectValue, 
              bodyValue,
            ));
          }}>
            {t('mailTemplateTitle')}
          </Button>
        </Box>
        </>
      }
    </Box>
    {errorSnackbar}
    {successSnackbar}
  </>
 )
}
