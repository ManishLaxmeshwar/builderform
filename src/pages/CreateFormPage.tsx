// src/pages/CreateFormPage.tsx
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addField, saveFormToLocalStorage, setFormName } from '../store/formSlice';
import FieldEditor from '../components/FieldEditor';

export default function CreateFormPage() {
  const { currentForm } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const handleAddField = () => {
    dispatch(addField({
        id: uuidv4(), type: 'text', label: '', validations: {},
        required: undefined
    }));
  };

  const handleSaveForm = () => {
    if (!currentForm.name) {
      alert('Please enter a form name before saving.');
      return;
    }
    if (currentForm.fields.length === 0) {
      alert('Please add at least one field before saving.');
      return;
    }
    dispatch(saveFormToLocalStorage());
    alert('Form saved successfully!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Form</Typography>

      {/* Form name input */}
      <input
        placeholder="Form Name"
        value={currentForm.name}
        onChange={(e) => dispatch(setFormName(e.target.value))}
        style={{
          padding: '8px',
          marginBottom: '16px',
          width: '100%',
          fontSize: '16px',
        }}
      />

      {/* Field list */}
      {currentForm.fields.map((field) => (
        <FieldEditor key={field.id} field={field} />
      ))}

      {/* Buttons */}
      <Button variant="contained" onClick={handleAddField}>Add Field</Button>
      <Button
        variant="outlined"
        color="success"
        onClick={handleSaveForm}
        sx={{ ml: 2 }}
      >
        Save Form
      </Button>
    </Container>
  );
}
