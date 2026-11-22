"use client";

import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";

export function ProjectTabs() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div style={{ padding: "16px 32px 0" }}>
      <Tabs
        activeKey={pathname === "/complex" ? "complex" : "simple"}
        onChange={(key) => router.push(key === "complex" ? "/complex" : "/")}
        items={[
          { key: "simple", label: "Simple project" },
          { key: "complex", label: "Complex project" },
        ]}
      />
    </div>
  );
}
