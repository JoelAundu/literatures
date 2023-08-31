"use client";
import { Alert, Box, Grid, IconButton, Typography } from "@mui/joy";
import React, { FormEvent, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormSchemaType, ValidationResult } from "./form-schema";
import { createOrder } from "./_actions";
import { styled } from "@mui/joy/styles";
import TextField from "@/components/TextField";
import TextArea from "@/components/TextArea";
import with_auth from "@/app/with_auth";
import { useSession } from "next-auth/react";
import { title } from "process";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

const NewOrder = () => {
  // const [data, setData] = useState<FormSchemaType>();
  const [result, setResult] = useState<ValidationResult>();
  const { data: session, status } = useSession();
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  // console.log(session);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    const result = await createOrder(data, session?.id);

    if (!result) {
      console.log("Something went wrong");
      return;
    }
    setShowSubmitButton(false);
    reset();
    setResult(result);
  };
  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto", // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <div>
        <Typography sx={{ textAlign: "center" }} level="h4" component="h1">
          <b>Submit an order</b>
        </Typography>
      </div>
      <form onSubmit={handleSubmit(processForm)}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          // columns={{ xs: "auto", sm: 2, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
          <Grid xs={12} sm={8} md={8} key={5}>
            <TextField
              label={"Literature details (title, year, edition, etc..)"}
              fieldName="literature"
              placeholder="Literature"
              register={register}
              fieldError={errors.literature}
              type="text"
            ></TextField>
          </Grid>
          <Grid xs={12} sm={4} md={4} key={4}>
            <TextField
              label={"Quantity"}
              fieldName="quantity"
              placeholder="Quantity"
              register={register}
              fieldError={errors.quantity}
              type="number"
            ></TextField>
          </Grid>
          <Grid xs={12} sm={12} md={12} key={3}>
            <TextArea
              register={register}
              fieldError={errors.notes}
              fieldName="notes"
              label="Notes"
              minRows={4}
              maxRows={20}
              maxLength={700}
            ></TextArea>
          </Grid>
        </Grid>
        {showSubmitButton && (
          <Button type="submit" sx={{ mt: 3 }}>
            Submit
          </Button>
        )}
        {!showSubmitButton && result?.success && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              flexDirection: "column",
              mt: 3,
            }}
          >
            <Alert
              key={"Success"}
              sx={{ alignItems: "flex-start" }}
              startDecorator={<CheckCircleIcon />}
              variant="soft"
              color={"success"}
              endDecorator={
                <IconButton
                  variant="soft"
                  color={"success"}
                  onClick={() => setShowSubmitButton(true)}
                >
                  <CloseRoundedIcon />
                </IconButton>
              }
            >
              <div>
                <div>{"Success"}</div>
                <Typography level="body-sm" color={"success"}>
                  Order has been submitted.
                </Typography>
              </div>
            </Alert>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default with_auth(NewOrder);
