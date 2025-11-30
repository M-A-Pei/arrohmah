'use client'; // 👈 This is crucial

import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { message } from "antd";
import AOS from "aos";
import "aos/dist/aos.css"; // Keep AOS css here or in layout, both work

// We move the messageApi export here because it depends on the hook
export let messageApi: ReturnType<typeof message.useMessage>[0];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [msg, contextHolder] = message.useMessage();

  // Assign the hook result to the exported variable
  messageApi = msg;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      <Navbar />
      {contextHolder}
      {children}
      <Footer />
    </>
  );
}