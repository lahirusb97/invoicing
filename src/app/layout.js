import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Shop",
  description: "my Shop Invoice system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <ReduxProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
