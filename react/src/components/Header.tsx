/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, useTheme } from "@mui/material";

type variable = {
  title: any;
  subTitle: any;
};

const Header = ({ title, subTitle }: variable, isDashboard = false) => {
  const theme = useTheme();
  return (
    <Box mb={isDashboard ? 2 : 4}>
      <Typography
        sx={{
          color: theme.palette.info.light,
          fontWeight: "bold",
        }}
        variant="h5"
      >
        {title}
      </Typography>
      <Typography variant="body1" sx={{fontWeight: "bold",}}>{subTitle}</Typography>
    </Box>
  );
};

export default Header;
