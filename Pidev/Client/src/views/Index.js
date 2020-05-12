/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components



import LandingPage from "./examples/LandingPage";

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
  <>
    {/*<IndexNavbar />*/}
    {/*<IndexHeader />*/}
    {/*<div className="main">*/}
    {/*  <SectionButtons />*/}
    {/*  <SectionNavbars />*/}
    {/*  <SectionNavigation />*/}
    {/*  <SectionProgress />*/}
    {/*  <SectionNotifications />*/}
    {/*  <SectionTypography />*/}
    {/*  <SectionJavaScript />*/}
    {/*  <SectionCarousel />*/}
    {/*  <SectionNucleoIcons />*/}
    {/*  <SectionDark />*/}
    {/*  <SectionLogin />*/}
    {/*  <SectionExamples />*/}
    {/*  <SectionDownload />*/}
    {/*  <DemoFooter />*/}
    {/*</div>*/}
    <LandingPage/>
    </>
  );
}

export default Index;
