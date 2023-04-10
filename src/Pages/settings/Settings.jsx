import { Box, Button, Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import ill from "../../utils/assets/settings.png";
import ill2 from "../../utils/assets/settings2.jpg";
import "./settings.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import { getMe } from "../../store/actions/auth-action";
import {
  changeCredentials,
  changePassword,
} from "../../store/actions/users-action";

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.admin);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t("required")),
    lastName: Yup.string().required(t("required")),
    email: Yup.string().email(t("invalid-email")).required(t("required")),
  });
  const validationPassword = Yup.object().shape({
    password: Yup.string()
      .min(8, t("too-short"))
      .max(50, t("too-long"))
      .required(t("required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("passwords-much"))
      .required(t("required")),
  });
  const initialPassword = {
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(changeCredentials(values));
    },
  });
  return (
    <Box m={3}>
      <Box>
        <h2>{t("change-credentials")}</h2>
      </Box>
      <div className="settings-box">
        <div className="settings">
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label={t("name")}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label={t("surname")}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label={t("email")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  {t("submit")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <div className="ill-box">
          <img src={ill} alt="ill" />
        </div>
      </div>
      <hr />
      <div className="settings-box">
        <div className="ill-box">
          <img src={ill2} alt="ill2" />
        </div>
        <div className="settings">
          <Formik
            initialValues={initialPassword}
            validationSchema={validationPassword}
            onSubmit={(values) =>
              dispatch(changePassword({ password: values.password }))
            }
          >
            {({ errors, touched }) => (
              <Form>
                <div className="services-title">
                  <h2>{t("change-password")}</h2>
                </div>
                <Field
                  as={TextField}
                  name="password"
                  label={t("password")}
                  type="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />

                <Field
                  as={TextField}
                  name="confirmPassword"
                  label={t("confirm-password")}
                  type="password"
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />

                <Button variant="contained" type="submit">
                  {t("submit")}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Box>
  );
};

export default Settings;
