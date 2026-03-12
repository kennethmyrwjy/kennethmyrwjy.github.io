import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
          JD
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
