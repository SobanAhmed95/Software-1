import { Box, Input } from "@mui/material";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export const Inputs = ({ place, chlidren, onchange, label, type }: any) => {
  return (
    <Box>
      <TextField
        type={type}
        className="input"
        placeholder={place}
        label={label}
        onChange={onchange}
      />
      <Stack spacing={2} sx={{ width: 300 }}></Stack>
    </Box>
  );
};
