"use client";

import { Tabs } from "antd";
import { useRouter, usePathname } from "next/navigation";

export function RuntimeTabs() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine current active tab key from URL
  const activeKey = pathname === "/bun" ? "bun" : pathname === "/deno" ? "deno" : "node";

  const handleTabChange = (key: string) => {
    if (key === "node") {
      router.push("/");
    } else {
      router.push(`/${key}`);
    }
  };

  return (
    <div style={{ padding: "16px 32px 0 32px" }}>
      <Tabs
        activeKey={activeKey}
        onChange={handleTabChange}
        items={[
          { key: "node", label: "Node.js Runtime" },
          { key: "bun", label: "Bun Runtime" },
          { key: "deno", label: "Deno Runtime" },
        ]}
      />
    </div>
  );
}
