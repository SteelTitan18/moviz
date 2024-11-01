import { List, ListItemButton, Menu, MenuItem } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FiltersContext } from "../App";
import { BiSolidCategory } from "react-icons/bi";
import genres from "../utils/types";
import { routes } from "../utils/routes";
import types from "../utils/types";

export default function SearchBar() {
  const { type, year, filterByType, filterByYear } = useContext(FiltersContext);
  // variables for mui Select Liist for types
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState();
  const open = Boolean(anchorEl);
  const [query, setQuery] = useState();

  // ref for the year filter input
  const year_ref = useRef();

  const navigate = useNavigate();

  // type list click logic
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // type list item click logic ; when clicked, the selected value is set as a filter
  const handleMenuItemClick = (event, index, option) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    filterByType(option.value);
  };

  // list close logic
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-5 items-center">
        <input
          className="h-10 w-80 text-black p-4 rounded-md"
          placeholder="Rechercher ..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          className="bg-black p-2 rounded-md"
          onClick={() => {
            if (query) {
              navigate(routes.search.navigation_path(query), {
                replace: true,
              });
              window.location.reload();
            }
          }}
        >
          <TbDeviceDesktopSearch size={28} />
        </button>
      </div>
      <div className="flex items-center">
        <div className="h-1 self-center">
          <List component="nav">
            <ListItemButton
              className="gap-2"
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
            >
              <BiSolidCategory />
              {/* Display right name depending on the value */}
              {type
                ? types.find((type_option) => type_option.value === type)?.name
                : "Types"}
            </ListItemButton>
          </List>
          <Menu
            id="lock-menu"
            className="text-black"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {genres.map((option, index) => (
              <MenuItem
                key={option.id}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index, option)}
              >
                <span className="text-black">{option.name}</span>
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className="h-1 self-center mt-6">
          Année :
          <input
            ref={year_ref}
            className="p-2 text-black h-8 w-16"
            type="text"
            placeholder="Année"
          />
          {/* Button which is pressed to apply the year as a filter */}
          <button
            value={year}
            className="p-1 bg-blue-800 rounded-md ml-5"
            onClick={() => {
              const year = year_ref.current?.value;
              if (Number(year) > 1500 && Number(year) < 2100)
                filterByYear(year_ref.current?.value);
            }}
          >
            Appliquer
          </button>
          {/* Button which is pressed to cancel the filter of year */}
          <button
            className="p-1 bg-red-700 rounded-md ml-5"
            onClick={() => {
              filterByYear("");
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
