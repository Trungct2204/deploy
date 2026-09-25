import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

export default function CustomerLayout({ children }) {
  return <><Header/><main>{children}</main><Footer/><Toast/></>;
}