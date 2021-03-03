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
      !<br />
      This is not an official source of UCSB course information. The official
      source for UCSB course information can be found at{" "}
      <a
        href="https://my.sa.ucsb.edu/public/curriculum/coursesearch.aspx"
        target="_blank"
        rel="noopener noreferrer"
      >
        Official UCSB Course Search
      </a>
      .
    </footer>
  );
};

export default AppFooter;
