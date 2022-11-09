import React, { useRef, useState } from 'react';
import { useClickOutside } from '@modules/utils';
import './generic-dropdown.less';

type GenericDropDownData = Map<any, string>;

type GenericDropdownProps = {
  selected: any;
  dataList: GenericDropDownData;
  onSelection: (value: any) => any;
};

export const GenericDropdown = ({
  selected,
  onSelection,
  dataList,
}: GenericDropdownProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef();

  useClickOutside(dropDownRef, () => setIsOpen(false));

  const keys = Array.from(dataList.keys());
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
      <div
        className="sch-generic-dropdown__selection"
        onClick={() => setIsOpen(!isOpen)}
      >
        <label>{dataList.get(currentSelection)}</label>
        <button>{isOpen ? <span>&#8679;</span> : <span>&#8681;</span>}</button>
      </div>
      {isOpen && (
        <ul className="sch-generic-dropdown__list">
          {keys.map((key) => (
            <li
              key={key}
              className="sch-generic-dropdown__list__item"
              onClick={() => handleSelection(key)}
            >
              {dataList.get(key)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
