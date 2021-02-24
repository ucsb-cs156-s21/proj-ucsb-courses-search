import React from "react";

const AppFooter = () => {
  return (
    <footer className="bg-light p-3 text-center">
      This app is a class project of{" "}
      <a
        href="https://ucsb-cs156.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        CMPSC 156
      </a>{" "}
      at{" "}
      <a href="https://ucsb.edu" target="_blank" rel="noopener noreferrer">
        UCSB
      </a>
      . Check out the source code on{" "}
      <a
        href="https://github.com/ucsb-cs156-w21/proj-ucsb-courses-search"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      !
    </footer>
  );
};

export default AppFooter;
