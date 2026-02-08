import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Mainlayout from "./Mainlayout";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Monsta - Home",
  icons: {
    icon: "/monsta-favicon.png",
  },
  description: "Monsta is a leading provider of innovative solutions for businesses. We specialize in delivering cutting-edge technology and exceptional service to help our clients achieve their goals. With a team of experienced professionals and a commitment to excellence, we are dedicated to providing the best possible experience for our customers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Mainlayout>
        <Header/>
        <ToastContainer/>
        {children}
        <Footer/>
        </Mainlayout>
      </body>
    </html>
  );
}
