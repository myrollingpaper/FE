import React from "react";
import styled from "styled-components";

export default function RollCard({ rollings, locationHandler }) {
  const { id, title, content } = rollings; // eslint-disable-line no-unused-vars

  return (
    <div onClick={() => locationHandler(id)}>
      <div>
        <span>{title}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}
