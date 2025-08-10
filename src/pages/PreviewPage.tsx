import React, { useEffect, useMemo, useState } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadFormsFromLocalStorage } from '../store/formSlice';
import { RootState } from '../store/store';
import { FormSchema } from '../types/form';

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { formsList } = useSelector((state: RootState) => state.form);
  const [values, setValues] = useState<Record<string, any>>({});

  // Load saved forms when this page mounts
  useEffect(() => {
    dispatch(loadFormsFromLocalStorage());
  }, [dispatch]);

  // Find the correct form
  const form: FormSchema | undefined = useMemo(() => {
    return formsList.find(f => f.id === id);
  }, [formsList, id]);

  // Initialize form values
  useEffect(() => {
    if (form) {
      const initVals: Record<string, any> = {};
      form.fields.forEach(f => (initVals[f.id] = ''));
      setValues(initVals);
    }
  }, [form]);

  if (!form) {
    return (
      <Container>
        <Typography variant="h5">Form not found</Typography>
      </Container>
    );
  }

  const handleChange = (id: string, val: any) => {
    setValues(prev => ({ ...prev, [id]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted values:", values);
    alert("Form submitted successfully!");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{form.name}</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {form.fields.map(field => (
          <Box key={field.id} mb={2}>
            <TextField
              label={field.label}
              type={field.type || 'text'}
              value={values[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              fullWidth
              required={!!field.required}
            />
          </Box>
        ))}
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </Container>
  );
}
