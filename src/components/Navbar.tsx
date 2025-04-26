import { useEffect, useRef } from "react";

// NavItem:  the structure of each navigation link.
interface NavItem {
  label: string;
  link: string;
  className: string;
  ref?: React.RefObject<HTMLAnchorElement>;
}

// NavbarProps: Specifies that the component accepts a navOpen boolean prop.
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
    initActiveBox(); // Position the box on first render
    window.addEventListener("resize", initActiveBox); // Adjust on window resize

    return () => {
      window.removeEventListener("resize", initActiveBox);
    };
  }, []);

  const activeCurrentLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLAnchorElement; // The clicked link

    // Remove 'active' class from the previous link
    lastActiveLink.current?.classList.remove("active");

    // Add 'active' class to the new link
    target.classList.add("active");
    // Update ref to the new active link
    lastActiveLink.current = target;

    // Move the activeBox to the new link
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
          // Only "Home" gets the ref initially
          ref={ref}
          className={className}
          onClick={activeCurrentLink}
        >
          {label}
        </a>
      ))}

      {/* The floating highlight */}
      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

export default Navbar;
