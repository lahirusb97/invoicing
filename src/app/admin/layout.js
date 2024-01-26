import Nav from "@/component/Nav";

import RefreshHandler from "@/component/Auth/RefreshHandler";
import PrintInvoice from "@/component/PrintInvoice";
export default function RootLayout({ children }) {
  return (
    <div className="flex" lang="en">
      <Nav />
      <RefreshHandler>{children}</RefreshHandler>
      <PrintInvoice />
    </div>
  );
}
