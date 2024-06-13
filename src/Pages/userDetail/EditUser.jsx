import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { generatePassword } from "../../hooks/generatePassword";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { useDispatch, useSelector } from "react-redux";
import {  editOwner } from "../../store/actions/users-action";
import { useIsMobile } from "../../hooks/useScreenType";
import CloseIcon from "@mui/icons-material/Close";
import { themePallete } from "../..";

const EditUser = ({ open, handleClose, countries, data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const signupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string().required("Required"),
    variant: Yup.string().required("Required"),
    countryId: Yup.number().integer("Invalid country ID").required("Required"),
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
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    countryId: data.countryId,
    variant: data.variant,
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
          Edit Owner
        </Typography>

        <div className="mobile-modal-close-btn" onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </div>
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={(values) => {
              dispatch(editOwner({ ...values, id: data.id }));
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
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="variant"
                      label="Payment "
                      variant="outlined"
                      fullWidth
                      error={touched.variant && Boolean(errors.variant)}
                      helperText={touched.variant && errors.variant}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      mt={3}
                      mb={3}
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        setFieldValue("password", generatePassword(8));
                      }}
                    >
                      Genarate Password
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="phoneNumber"
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        countryId
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.countryId}
                        onChange={handleChange}
                        name="countryId"
                        label={t("countryId")}
                        error={touched.countryId && Boolean(errors.countryId)}
                        helperText={touched.countryId && errors.countryId}
                      >
                        {countries?.map((i) => {
                          return (
                            <MenuItem value={i.id} key={i.id}>
                              {i.name.toUpperCase()}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
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

export default EditUser;
