import type { Metadata } from "next";
import "./globals.css";
import { App } from 'antd';

export const metadata: Metadata = {
  description: "Detailed analysis of webpack, rspack, esbuild, snowpack, rollup and rolldown. Analysis and benchmarks",
	title: "Comparison of JavaScript Bundlers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
				<App>
				 <a
						href="https://github.com/FallenAngel97/bundlers-comparison"
						className="github-ribbon"
						target="_blank"
						rel="noopener noreferrer"
					>
						Fork me on GitHub
					</a>
					{children}

					Part of <a href="https://decodeapps.pp.ua/">DeCODE</a> projects
				</App>
			</body>
    </html>
  );
}
