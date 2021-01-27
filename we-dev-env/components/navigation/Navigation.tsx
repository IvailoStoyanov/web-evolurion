import React, { createRef } from "react";
import Link from "next/link";
import ActiveLink from "../ActiveLink";
import Image from "next/image";
import styles from "./Navigation.module.scss";
class MainNavigation extends React.Component<
  {},
  { isScrolled: boolean; mobileViewport: boolean; isMobileNavVisible: boolean }
> {
  private hamburgerIcon = createRef<HTMLAnchorElement>();

  constructor(props: {}) {
    super(props);
    this.state = {
      isScrolled: false,
      mobileViewport: true,
      isMobileNavVisible: false,
    };
    this.hamburgerIcon = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.checkViewport = this.checkViewport.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleMenuCloseClick = this.handleMenuCloseClick.bind(this);
  }

  private breakToDesktop = 768;
  private yellow = "#F7E05F";
  private black = "#17161A";

  checkViewport() {
    if (window.innerWidth >= this.breakToDesktop) {
      this.setState(() => ({
        mobileViewport: false,
      }));
    } else {
      this.setState(() => ({
        mobileViewport: true,
      }));
    }
  }

  handleScroll() {
    if (window.pageYOffset > 200) {
      this.setState(() => ({
        isScrolled: true,
      }));
    } else {
      this.setState(() => ({
        isScrolled: false,
      }));
    }
  }

  handleHamburgerClick() {
    this.setState(() => ({
      isMobileNavVisible: true,
    }));
  }

  handleMenuCloseClick() {
    this.setState(() => ({
      isMobileNavVisible: false,
    }));
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, false);
    window.addEventListener("resize", this.checkViewport);

    if (window.innerWidth >= this.breakToDesktop) {
      this.hamburgerIcon;
      console.log(
        this.hamburgerIcon.current.classList.add("Hamburger___invisible")
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }

  render() {
    return (
      <>
        <style jsx>{`
          ul {
            transform: ${this.state.isMobileNavVisible
              ? "translateX(0)"
              : "translateX(-100%)"};
            opacity: ${this.state.isMobileNavVisible ? "1" : "0"};
          }
          .overlay {
            visibility: ${this.state.isMobileNavVisible ? "visible" : "hidden"};
            opacity: ${this.state.isMobileNavVisible ? "0.7" : "0"};
          }
          .closeButtonEffect {
            ${this.state.isMobileNavVisible ? "" : "transform: scale(4)"};
            ${this.state.isMobileNavVisible ? "" : "opacity: 0"};
          }
          .closeButtonWrapper {
            ${this.state.isMobileNavVisible ? "" : "visibility: hidden"};
          }
          .Hamburger {
            margin: auto 0;
          }
          .Hamburger___invisible {
            display: none;
          }

          a.active {
            color: ${this.yellow};
            border-bottom: 4px solid ${this.yellow};
          }

          @media screen and (min-width: ${this.breakToDesktop}px) {
            a.active {
              color: ${this.black};
              padding-bottom: 27px;
              border-bottom: 12px solid ${this.yellow};
            }
            a.active:hover {
              padding-bottom: 32px;
            }
          }
        `}</style>

        <nav
          id="navigation"
          className={`${styles.Navigation} ${
            this.state.isScrolled ? styles.Navigation___scrolled : ""
          }`}
        >
          <Link href="/">
            <a className={styles.Logo}>
              <Image
                src="/logo/we-logo.svg"
                alt="Web Evolution Logo"
                width={100}
                height={50}
              />
            </a>
          </Link>
          <ul>
            <div
              className={`${styles.Navigation_mobileCloseWrapper} closeButtonWrapper`}
            >
              <div
                className={`${styles.Navigation_mobileCloseEffect} closeButtonEffect`}
              />
              <Image
                src="/icons/close-mobile-nav.svg"
                alt="hamburger menu close icon"
                width={50}
                height={50}
                onClick={this.handleMenuCloseClick}
                id="closeButton"
              />
            </div>
            <li onClick={this.handleMenuCloseClick}>
              <ActiveLink href="/our-work" activeClassName="active">
                <a>Work</a>
              </ActiveLink>
            </li>
            <li onClick={this.handleMenuCloseClick}>
              <ActiveLink href="/our-services" activeClassName="active">
                <a>Services</a>
              </ActiveLink>
            </li>
            <li onClick={this.handleMenuCloseClick}>
              <ActiveLink href="/about" activeClassName="active">
                <a>About</a>
              </ActiveLink>
            </li>
            <li onClick={this.handleMenuCloseClick}>
              <ActiveLink href="/contact" activeClassName="active">
                <a>Contact</a>
              </ActiveLink>
            </li>
          </ul>
          <a
            className={
              this.state.mobileViewport ? "Hamburger" : "Hamburger___invisible"
            }
            ref={this.hamburgerIcon}
            onClick={this.handleHamburgerClick}
          >
            <Image
              src="/icons/hamburger.svg"
              alt="hamburger icon"
              width={40}
              height={40}
            />
          </a>
          <div
            className={`${styles.Navigation_overlay} overlay`}
            onClick={this.handleMenuCloseClick}
          ></div>
        </nav>
        <div className={styles.NavigationCap}></div>
      </>
    );
  }
}

export default MainNavigation;
