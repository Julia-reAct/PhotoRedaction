import React from "react"
import './SideBarItem.css'

export default function SidebarItem({ name, active, handleClick }) {
    return (
        <button
            className={`sidebar-item_${active ? "active" : ""}`}
            onClick={handleClick}
        >
            {name}
        </button>
    )
}