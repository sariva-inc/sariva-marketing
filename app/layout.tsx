import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sariva — AI operations layer for Kafka and Flink",
  description:
    "Sariva helps platform teams observe, diagnose, and safely operate Kafka, Flink, Confluent Cloud, MSK, and cloud-native streaming infrastructure through Slack, CLI, REST, and MCP.",
  metadataBase: new URL("https://sariva.ai"),
  openGraph: {
    title: "Sariva — AI operations layer for Kafka and Flink",
    description:
      "A self-hosted AI operations layer for streaming infrastructure: live diagnosis, runbooks, GitOps changes, RBAC, and audit control.",
    url: "https://sariva.ai",
    siteName: "Sariva",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sariva — AI operations layer for Kafka and Flink",
    description:
      "Observe, diagnose, and safely operate streaming infrastructure with GitOps-first AI automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
