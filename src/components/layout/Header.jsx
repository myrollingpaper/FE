import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export function Header() {
  return (
    <div>
      <Link to="/">
        <img src="/images/logo.png" alt="logo" />
      </Link>
    </div>
  );
}
