import spriteUrl from "../../assets/icons/sprite.svg?url";

/**
 * Universal SVG Sprite Icon
 * Usage:
 *   <Icon name="icon-map" size={20} />
 *   <Icon name="icon-star" size={16} />
 *   <Icon name="icon-heart" size={16} />
 */
export function Icon({ name, size = 24, className, title, ...props }) {
  const iconId = String(name).toLowerCase();

  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : "presentation"}
      fill="currentColor"
      {...props}
    >
      {title ? <title>{title}</title> : null}

      <use
        href={`${spriteUrl}#${iconId}`}
        xlinkHref={`${spriteUrl}#${iconId}`}
      />
    </svg>
  );
}
