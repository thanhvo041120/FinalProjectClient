import "./style.css";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
const FooterComponent = () => {
  return (
    <Box className="footer-container">
      <Box component="footer" className="footer-row-above">
        <Container className="footer-about-container">
          <Typography variant="h2">Introduction</Typography>
          <Typography variant="body1" className="text-about">
            Smart library is an application what is used to simplify the process
            of borrowing books from library. A library fitted with ‘Smart
            Library’ technology is able to be open to library users without
            being staffed
          </Typography>
        </Container>
        <Container className="footer-contact-container">
          <Typography variant="h2">Contact</Typography>
          <div className="textwidget">
            Address: DANANG, VIETNAM
            <br />
            <Link href="mailto:smartlib@gmail.com">smartlib@gmail.com</Link>
            <br />
            Work on 24/7
            <br />
            555555555
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default FooterComponent;
