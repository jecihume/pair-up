import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Header />
      <div>{props.children}</div>
      <Footer className="footer" />
    </>
  );
}
