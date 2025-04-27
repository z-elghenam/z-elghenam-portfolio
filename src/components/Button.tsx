import { ReactElement } from "react";

interface ButtonCommonProps {
  label: string;
  icon?: ReactElement;
  classes?: string;
}

interface ButtonLinkProps extends ButtonCommonProps {
  href: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
}

interface ButtonButtonProps extends ButtonCommonProps {
  href?: never;
  target?: never;
}

type ButtonProps = ButtonLinkProps | ButtonButtonProps;

const ButtonBase = ({
  href,
  target = "_self",
  label,
  icon,
  classes = "",
  variant,
}: ButtonProps & { variant: "primary" | "outline" }) => {
  const baseClass = `btn btn-${variant} ${classes}`.trim();

  const content = (
    <>
      {label}
      {icon && (
        <span className="material-symbols-rounded" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  return href ? (
    <a href={href} target={target} className={baseClass}>
      {content}
    </a>
  ) : (
    <button className={baseClass}>{content}</button>
  );
};

const ButtonPrimary = (props: ButtonProps) => (
  <ButtonBase {...props} variant="primary" />
);

const ButtonOutline = (props: ButtonProps) => (
  <ButtonBase {...props} variant="outline" />
);

export { ButtonPrimary, ButtonOutline };
