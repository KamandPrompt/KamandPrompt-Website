import React from "react";

export const LinkList = ({ props }) => {
    return (
        <>
            <a className="text-gray-400 hover:text-teal-400 duration-300 text-lg cursor-pointer leading-6" href={props.link}>
                {props.name}
            </a>
        </>
    )
}

export const LogoLinkList = ({ props }) => {
    return (
        <>
            <p className="text-gray-400 text-lg"><span
                className="p-2 inline-flex items-center rounded-full bg-cyan-500 mx-1.5 text-xl text-gray-100"
            >
                <ion-icon name={props.logo}></ion-icon>
            </span> {props.name} </p>
        </>
    )
}