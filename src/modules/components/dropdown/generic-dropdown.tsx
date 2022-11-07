import React, { useRef, useState } from "react";
import { useClickOutside } from "@modules/utils";

type GenericDropDownData = Map<any, string>;

type GenericDropdownProps = {
  selected: string;
  dataList: GenericDropDownData;
  onSelection: (value: string) => any;
};

export const GenericDropdown = ({
  selected,
  onSelection,
  dataList,
}: GenericDropdownProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef();

  useClickOutside(dropDownRef, () => setIsOpen(false));

  // @ts-ignore
  const keys = [...dataList.keys()];
  const defaultSelection = selected || keys[0];
  const [currentSelection, setCurrentSelection] =
    useState<string>(defaultSelection);

  const handleSelection = (key: string) => {
    setIsOpen(false);
    setCurrentSelection(key);
    onSelection(key);
  };

  return (
    <div className="sch-generic-dropdown" ref={dropDownRef}>
      <label className="sch-generic-dropdown__selection">
        {dataList.get(currentSelection)}
        <button onClick={() => setIsOpen(!isOpen)}>&#8595;</button>
      </label>
      {isOpen && (
        <ul className="sch-generic-dropdown__list">
          {keys.map((key) => (
            <li
              className="sch-generic-dropdown__list__item"
              onClick={() => handleSelection(key)}
            >
              dataList.get(key)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
