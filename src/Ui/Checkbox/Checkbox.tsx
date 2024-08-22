import style from "./Checkbox.module.scss";

interface CheckboxProps {
  onToggle: () => void;
  label: string;
  defaultChecked?: boolean;
}

export default function Checkbox({
  onToggle,
  label,
  defaultChecked = false,
}: CheckboxProps) {
  return (
    <div className={style.checkbox}>
      <label>
        <input
          type="checkbox"
          onChange={onToggle}
          className={style.checkbox__inputCheckBox}
          defaultChecked={defaultChecked}
        />
        <span className={style.checkbox__label}>{label}</span>
      </label>
    </div>
  );
}
