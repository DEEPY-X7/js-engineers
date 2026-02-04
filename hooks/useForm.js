"use client";

import { useState } from "react";

export default function useForm(initial = {}) {
  const [values, setValues] = useState(initial);
  const setField = (name, value) => setValues(v => ({ ...v, [name]: value }));
  const reset = () => setValues(initial);
  return { values, setValues, setField, reset };
}
