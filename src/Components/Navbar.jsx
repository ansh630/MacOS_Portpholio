import dayjs from "dayjs"
import { navIcons, navLinks } from "#constants"

const Navbar = () => {
  const safeNavLinks = Array.isArray(navLinks) ? navLinks : []
  const safeNavIcons = Array.isArray(navIcons) ? navIcons : []

  return <nav>
    <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Anshuman's Portfolio </p>
        <ul>
            {safeNavLinks.map(({ id, name }) => (
                <li key={id}>
                   <p>{name ?? "Untitled"}</p>
                </li>
            ))}
        </ul>
    </div>

    <div>
        <ul>
            {safeNavIcons.map(({ id, img }) => (
                <li key={id}>
                    <img src={img || "/icons/file.svg"} className="icon-hover" alt={`icon-${id}`} />
                </li>
            ))}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>

    </div>
 </nav>
  
}

export default Navbar
