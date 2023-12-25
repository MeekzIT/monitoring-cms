import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { generatePassword } from "../../hooks/generatePassword";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { useDispatch, useSelector } from "react-redux";
import { addOwner } from "../../store/actions/users-action";
import { getCountries } from "../../store/actions/statistics-action";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../hooks/useScreenType";

const AddOwner = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const countries = useSelector((state) => state.statistics.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

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
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    phoneNumber: Yup.string().required("Required"),
    deviceOwner: Yup.string().required("Required"),
    countryId: Yup.number().integer("Invalid country ID").required("Required"),
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    bgcolor: "background.paper",
    border: "3px solid #008491",
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    countryId: "",
    deviceOwner: "",
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
          Add New Owner
        </Typography>
        <div className="mobile-modal-close-btn" onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </div>
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={(values) => {
              dispatch(addOwner({ ...values, userId: id }));
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
              <Form>
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
                      name="password"
                      label="Password"
                      type="text"
                      variant="outlined"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {values.password.length > 7 && (
                              <IconButton
                                onClick={() => {
                                  copyToClipboard(values.password);
                                }}
                              >
                                <ContentCopyIcon />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      as={TextField}
                      name="deviceOwner"
                      label="Owner device ID"
                      variant="outlined"
                      fullWidth
                      error={touched.deviceOwner && Boolean(errors.deviceOwner)}
                      helperText={touched.deviceOwner && errors.deviceOwner}
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

export default AddOwner;
