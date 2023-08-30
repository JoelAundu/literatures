"use client";
import * as React from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import NextLink from "next/link";
import Grid from "@mui/joy/Grid";
import { Box, Button, Typography } from "@mui/joy";

export default function ResponsiveGrid() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ flexGrow: 1 }}
    >
      <Grid xs={2} sm={4} md={6}>
        <Typography level="h2">Orders</Typography>
      </Grid>
      <Grid xs={2} sm={4} md={6}>
        <NextLink href="/create-order">
          <Button size="sm">Make an order</Button>
        </NextLink>
      </Grid>
    </Grid>
  );
}
