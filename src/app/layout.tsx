import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter"; 
import type { Metadata } from "next";
import localFont from "next/font/local";
import {ThemeProvider} from "@mui/material/styles";
import theme from "@/app/theme";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <ThemeProvider theme={theme}>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
