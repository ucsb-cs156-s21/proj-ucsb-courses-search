import React from "react";

const AppFooter = () => {
  return (
    <footer className="bg-light p-3 text-center">
      This app is a class project of{" "}
      <a href="https://ucsb-cs156.github.io" target="_blank">
        CMPSC 156
      </a>{" "}
      at{" "}
      <a href="https://ucsb.edu" target="_blank">
        UCSB
      </a>
      . Check out the source code on{" "}
      <a
        href="https://github.com/ucsb-cs156-w21/proj-ucsb-courses-search"
        target="_blank"
      >
        GitHub
      </a>
      !
    </footer>
  );
};

export default AppFooter;
