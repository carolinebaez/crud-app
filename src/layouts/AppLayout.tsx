import React from "react";

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="brand-wrap">
          <h1 className="app-title">StayBooking</h1>
          <p className="app-subtitle">Find your perfect stay</p>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
};
