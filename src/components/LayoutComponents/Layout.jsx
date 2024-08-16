import Navbar from "../Dashboard/Navbar/Navbar";
import InfoHeader from "../Dashboard/InfoHeader";
import { useSelector } from "react-redux";

const Layout = ({ children, title }) => {
  const { sidebarCollapse } = useSelector((state) => state.userChange);

  return (
    <section className={`wrapper ${sidebarCollapse ? "mini" : ""}`}>
      <aside className="mainSide">
        <Navbar />
      </aside>
      <main>
        <InfoHeader title={title} />
        {children}
      </main>
    </section>
  );
};

export default Layout;
