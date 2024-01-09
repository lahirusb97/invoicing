import Nav from "@/component/Nav";
import { Box } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <div className="flex" lang="en">
      <Nav />
      <Box component="main" sx={{ flexGrow: 1, mt: 8, ml: 1 }}>
        {children}
      </Box>
    </div>
  );
}
