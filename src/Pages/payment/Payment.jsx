import { Box, Button, TextField } from "@mui/material";
import Cards from "react-credit-cards-2";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./payment.css";
import { useDispatch } from "react-redux";
import { useIsMobile } from "../../hooks/useScreenType";
import { useParams } from "react-router-dom";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const Payment = () => {
  const { mdOrder } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const validationSchema = Yup.object().shape({
    number: Yup.string()
      .required("Необходим номер кредитной карты")
      .matches(/^[0-9]{16}$/, "Недопустимый номер кредитной карты")
      .min(16, "Номер кредитной карты должен содержать 16 цифр")
      .max(16, "Номер кредитной карты должен содержать 16 цифр"),

    name: Yup.string().required("Необходимо указать имя владельца карты"),

    expiry: Yup.string()
      .required("Необходим срок действия карты")
      .min(4, "Cрок действия карты должен содержать 4 цифр")
      .max(4, "Cрок действия карты должен содержать 4 цифр"),

    cvc: Yup.string()
      .required("Необходим код CVC")
      .matches(/^[0-9]{3,4}$/, "Недопустимый код CVC")
      .min(3, "Код CVC должен содержать не менее 3 цифр")
      .max(4, "Код CVC должен содержать не более 4 цифр"),
  });
  const formik = useFormik({
    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(formik.errors);
  return (
    <Container maxWidth="md" component="main" className="payment">
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box>
            <Cards {...formik.values} onChange={formik.handleChange} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="number"
                label="Номер карты"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
                autoComplete="cc-number"
              />
            </Grid>
            <Grid item xs={12}>
              {" "}
              <TextField
                id="name"
                label="Имя владельца карты"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoComplete="cc-name"
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                id="expiry"
                label="Срок действия"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expiry}
                error={formik.touched.expiry && Boolean(formik.errors.expiry)}
                helperText={formik.touched.expiry && formik.errors.expiry}
                autoComplete="cc-exp"
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                id="cvc"
                label="CVC"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cvc}
                error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                helperText={formik.touched.cvc && formik.errors.cvc}
                autoComplete="cc-csc"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                onClick={formik.handleSubmit}
                sx={{ marginTop: 2 }}
              >
                {t("submit")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default Payment;
