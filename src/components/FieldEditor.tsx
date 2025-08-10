import React from 'react';
import { TextField, MenuItem, IconButton, Switch, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormField, FieldType } from '../types/form';
import { useDispatch } from 'react-redux';
import { updateField, deleteField } from '../store/formSlice';

interface Props {
  field: FormField;
}

const fieldTypes: FieldType[] = ['text', 'number', 'textarea', 'select', 'radio', 'checkbox', 'date'];

export default function FieldEditor({ field }: Props) {
  const dispatch = useDispatch();

  const handleChange = (key: keyof FormField, value: any) => {
    dispatch(updateField({ ...field, [key]: value }));
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <TextField
        select
        label="Type"
        value={field.type}
        onChange={(e) => handleChange('type', e.target.value)}
        size="small"
        sx={{ minWidth: 120 }}
      >
        {fieldTypes.map(ft => (
          <MenuItem key={ft} value={ft}>{ft}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Label"
        value={field.label}
        onChange={(e) => handleChange('label', e.target.value)}
        size="small"
      />

      <Switch
        checked={field.validations?.required || false}
        onChange={(e) =>
          handleChange('validations', { ...field.validations, required: e.target.checked })
        }
      />

      <IconButton color="error" onClick={() => dispatch(deleteField(field.id))}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
