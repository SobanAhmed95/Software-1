import { Box, TextField } from "@mui/material";
import * as React from "react";

interface InputsProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
}

export const Inputs: React.FC<InputsProps> = ({ className, onChange, label, type }) => {
  return (
    <Box>
      <TextField
        style={{ width: '160%', marginLeft: '10%', marginRight: '10%' }}
        type={type}
        className={className}
        label={label}
        onChange={onChange}
      />
    </Box>
  );
};

export default Inputs;
