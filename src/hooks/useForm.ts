import { useState, ChangeEvent } from "react";

const useForm = (formData: Record<string, any>) => {
  const [form, setForm] = useState(formData);

  const updateForm = (event: ChangeEvent) => {
    const inputElement = event.target as HTMLInputElement;
    const field = inputElement.name;
    const value = inputElement.value;
    setForm({...form, [field]: value});
  };

  return {
    form,
    setForm,
    updateForm
  }
};

export default useForm;
