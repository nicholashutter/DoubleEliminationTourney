import "@/app/styles/globals.css"
import {ThemeProvider} from "@material-tailwind/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
    <html lang="en">
      <body >
        <>
          children
        </>
      </body>
    </html>
    </ThemeProvider>
  );
}
