import { StatCard } from "./StatCard";
export const Header=({ totalStudents, totalDepts })=> {
  return (
    <>
    <header className="header">
      <div className="header__brand">
        <div className="header__logo">S</div>
        <div>
          <h1 className="header__title">StudentHub</h1>
          <p className="header__sub">Management System</p>
        </div>
      </div>
      <div className="header__stats">
        <StatCard value={totalStudents} label="Total" />
        <StatCard value={totalDepts} label="Depts" />
      </div>
    </header>
    </>
  );
}