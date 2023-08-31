"use client";
import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { Box, Avatar, Typography, Link, Button } from "@mui/joy";
import {
  ClientSafeProvider,
  getProviders,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/utils/constants";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <Sheet
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100%",
        height: "var(--Header-height)",
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "52px",
          },
        })}
      />
      {session?.user ? (
        <>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar variant="outlined" src={session?.user.image || ""} />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                {session?.user.name}
              </Typography>
              <Typography level="body-xs">{session?.user.email}</Typography>
            </Box>
            <IconButton variant="plain" color="neutral">
              <i data-feather="log-out" />
            </IconButton>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                type="button"
                variant="outlined"
                size="sm"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
        <Typography>{APP_NAME}</Typography>
        </>
      )}
      <ColorSchemeToggle id={undefined} />
    </Sheet>
  );
}
