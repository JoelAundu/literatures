"use client";
import { FormHelperText, Textarea } from "@mui/joy";
import React, { TextareaHTMLAttributes } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { FieldError } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: any;
  fieldError: FieldError | undefined;
  fieldName: string;
  label: string;
}

export default function ({
  register,
  label,
  fieldError,
  fieldName,
  ...rest
}: TextareaProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea
        {...register(fieldName)}
        error={Boolean(fieldError?.message)}
        {...rest}
      />
      {fieldError?.message && (
        <FormHelperText>
          <InfoOutlined />
          {fieldError.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
