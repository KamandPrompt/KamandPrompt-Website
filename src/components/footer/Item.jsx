import React from "react";
import { LinkList, LogoLinkList } from "./CustomList";

const Item = ({ Links, title, mode }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold text-2xl">{title}</h1>
      {Links.map((link) => (
        <li key={link.name} className="mt-[10px] list-none">
          {mode === 'link-list' ? <LinkList props={link}/> : mode == 'logo-link-list' ? <LogoLinkList props={link}/> : <></>}
        </li>
      ))}
    </ul>
  );
};

export default Item;
