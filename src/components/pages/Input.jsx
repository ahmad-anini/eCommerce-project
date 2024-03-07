import React from "react";
export default function Input({
  type = "text",
  id,
  name,
  title,
  value,
  onChange,
  errors,
  onBlur,
  touched,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        id={id}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={title}
      />
      {touched[name] && errors[name] && (
        <>
          <small className="form-text text-muted">{errors[name]}</small>
        </>
      )}
    </div>
  );
}
