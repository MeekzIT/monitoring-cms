import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { editOwnerSystem } from "../../store/actions/users-action";
import { useIsMobile } from "../../hooks/useScreenType";
import CloseIcon from "@mui/icons-material/Close";
import { themePallete } from "../..";

const OwnerSystemModal = ({ open, handleClose, data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const signupSchema = Yup.object().shape({
    api: Yup.string().required("Required"),
    login: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    currencyCode: Yup.string().required("Required"),
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    bgcolor: "background.paper",
    border: `3px solid ${themePallete}`,
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    minHeight: isMobile ? "100vh" : null,
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
  };

  const initialValues = {
    api: data.api,
    login: data.login,
    password: data.password,
    currencyCode: data.currencyCode,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Owner System
        </Typography>

        <div className="mobile-modal-close-btn" onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </div>
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={(values) => {
              dispatch(editOwnerSystem({ ...values, id: data.ownerId }));
              handleClose();
            }}
          >
            {({
              formik,
              errors,
              touched,
              values,
              handleChange,
              setFieldValue,
            }) => (
              <Form style={{ padding: "10px" }}>
                <Grid container spacing={2}>
                  {console.log(errors)}

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="api"
                      label="api"
                      variant="outlined"
                      fullWidth
                      error={touched.api && Boolean(errors.api)}
                      helperText={touched.api && errors.api}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="login"
                      label="login"
                      variant="outlined"
                      fullWidth
                      error={touched.login && Boolean(errors.login)}
                      helperText={touched.login && errors.login}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="password"
                      label="password"
                      variant="outlined"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="currencyCode"
                      label="currencyCode"
                      variant="outlined"
                      fullWidth
                      error={
                        touched.currencyCode && Boolean(errors.currencyCode)
                      }
                      helperText={touched.currencyCode && errors.currencyCode}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {t("edit")}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
};

export default OwnerSystemModal;
