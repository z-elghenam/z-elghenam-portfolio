/**
 * @copyright 2024 de-horst
 * @licence Apache-2.0
 */

/**
 * NODE MODULES
 */
import { useEffect, useRef } from "react";

interface NavItem {
  label: string;
  link: string;
  className: string;
  ref?: React.RefObject<HTMLAnchorElement>;
}

interface NavbarProps {
  navOpen: boolean;
}

const Navbar = ({ navOpen }: NavbarProps) => {
  const lastActiveLink = useRef<HTMLAnchorElement>(null);
  const activeBox = useRef<HTMLDivElement>(null);

  const initActiveBox = () => {
    if (lastActiveLink.current && activeBox.current) {
      activeBox.current.style.top = lastActiveLink.current.offsetTop + "px";
      activeBox.current.style.left = lastActiveLink.current.offsetLeft + "px";
      activeBox.current.style.width = lastActiveLink.current.offsetWidth + "px";
      activeBox.current.style.height =
        lastActiveLink.current.offsetHeight + "px";
    }
  };

  useEffect(() => {
    initActiveBox();
    window.addEventListener("resize", initActiveBox);

    return () => {
      window.removeEventListener("resize", initActiveBox);
    };
  }, []);

  const activeCurrentLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLAnchorElement;
    lastActiveLink.current?.classList.remove("active");
    target.classList.add("active");
    lastActiveLink.current = target;

    if (activeBox.current) {
      activeBox.current.style.top = target.offsetTop + "px";
      activeBox.current.style.left = target.offsetLeft + "px";
      activeBox.current.style.width = target.offsetWidth + "px";
      activeBox.current.style.height = target.offsetHeight + "px";
    }
  };

  const navItems: NavItem[] = [
    {
      label: "Home",
      link: "#home",
      className: "nav-link active",
      ref: lastActiveLink as React.RefObject<HTMLAnchorElement>,
    },
    {
      label: "About",
      link: "#about",
      className: "nav-link",
    },
    {
      label: "Work",
      link: "#work",
      className: "nav-link",
    },
    {
      label: "Reviews",
      link: "#reviews",
      className: "nav-link",
    },
    {
      label: "Contact",
      link: "#contact",
      className: "nav-link md:hidden",
    },
  ];

  return (
    <nav className={"navbar " + (navOpen ? "active" : "")}>
      {navItems.map(({ label, link, className, ref }, key) => (
        <a
          href={link}
          key={key}
          ref={ref}
          className={className}
          onClick={activeCurrentLink}
        >
          {label}
        </a>
      ))}

      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

export default Navbar;
