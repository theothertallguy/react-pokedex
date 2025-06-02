import { useState } from "react";

export interface HeartCheckboxProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    id: string;
    label: string;
    setFavourite: (opened: boolean) => void;
}

function HeartCheckbox(props: HeartCheckboxProps) {

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        const checked = event.target.checked;
        props.setFavourite(checked as boolean);
    };
    return (
        <div className="w-full flex gap-2">
            <input
                id={props.id}
                className="peer relative appearance-none shrink-0 w-4 h-4 mt-1"
                type="checkbox"
                disabled={props.disabled}
                defaultChecked={props.defaultChecked}
                onChange={handleCheckboxChange}
            />
            <svg
                className="absolute pointer-events-none stroke-black fill-none peer-checked:!fill-red-500 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <label htmlFor={props.id}>
                <span className="text-2xl m-2">{props.label}</span>
            </label>
        </div>

    )
}

export default HeartCheckbox;