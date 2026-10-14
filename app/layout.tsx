import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu, Outfit } from "next/font/google";
import "./globals.css";
import "./medico.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-urdu",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Medico | Connected care",
  description:
    "Medico connects Urdu and English clinical interviews, medical history, structured reports, and clinician review.",
  icons: {
    icon: "/medico/icon.png",
    apple: "/medico/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoUrdu.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
