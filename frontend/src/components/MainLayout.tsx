import Container from "react-bootstrap/Container";
import { FC, ReactNode } from "react";
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ height: "85vh", background: "#F0754C" }}
    >
      {children}
    </Container>
  );
};

export default MainLayout;
