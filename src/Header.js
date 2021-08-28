import "./Header.css";

export default function Header(props) {
  return (
    <ul>
      <li>
        <a href="/home" className={props.homeActive ? "active" : ""}>
          Search
        </a>
      </li>
      <li>
        <a href="/favorites" className={props.favoritesActive ? "active" : ""}>
          Favorites
        </a>
      </li>
    </ul>
  );
}
